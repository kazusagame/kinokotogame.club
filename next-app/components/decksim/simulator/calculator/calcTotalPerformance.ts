import { DeckSimulatorData } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { IntermediateResults } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorIntermediateResults";

import { BONUS_DATA_PER_EVENT } from "@/components/decksim/data/bonusData";
import { SKILL_DATA_PER_EVENT } from "@/components/decksim/data/skillData";

import { returnNumber } from "@/lib/returnNumber";

export const calcTotalPerformance = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  const eventId = inputData.dataType;

  // 攻援/守援 ごとに すべてのシーン、声援、ぷちセンバツの効果を合算してtotalPerformanceを算出する
  (["attack", "defense"] as const).forEach((attackOrDefense) => {
    const totalPerformance: IntermediateResults["totalPerformance"][
      | "attack"
      | "defense"] = {
      minPower: 0,
      expPower: 0,
      maxPower: 0,
      skillEffect: 0,
    };

    // 主センバツ、副センバツの各シーンの効果値を加算
    (["mainScenes", "subScenes"] as const).forEach((mainOrSub) => {
      // シーンごとの補正後効果値を保管する
      const keyPowerArray: number[][] = [];

      const scenesData = intermediateResults[mainOrSub][attackOrDefense] ?? {};
      const keys = Object.keys(scenesData).filter(
        (key) => key !== "basePowerArray"
      );
      keys.forEach((key) => {
        const effectTotal = scenesData[Number(key)]?.effectTotal;

        // effectMatrixがない場合はreturn (通常ありえない)
        if (!effectTotal) return;

        totalPerformance.minPower! += effectTotal.min;
        totalPerformance.expPower! += effectTotal.min + effectTotal.expDif;
        totalPerformance.maxPower! += effectTotal.min + effectTotal.maxDif;

        // TBD:
        // レイドやメモストではここで有利不利タイプ補正や有利ガール補正の加算が必要になる。

        // 表示用と並べ替え用に補正後効果値の保管
        keyPowerArray.push([Number(key), effectTotal.min + effectTotal.expDif]);

        // 対抗戦ではついでに声援効果も合算しておく
        if (eventId === "clubcup") {
          totalPerformance.skillEffect! +=
            scenesData[Number(key)]?.skillEffect ?? 0;
        }
      });

      // 効果値を昇順で並べ替えてEstimatedPowerとその順番を設定する
      const sortedArray = keyPowerArray.sort(([_, a], [__, b]) => a - b);
      sortedArray.forEach(([key, power], index) => {
        intermediateResults[mainOrSub][attackOrDefense][
          Number(key)
        ].estimatedPower = power;
        intermediateResults[mainOrSub][attackOrDefense][
          Number(key)
        ].estimatedPowerAscOrder = index + 1;
      });
    });

    // 主センバツ、副センバツの声援の効果値を加算
    (["mainSkills", "subSwitches"] as const).forEach((mainOrSub) => {
      const skillsData = intermediateResults[mainOrSub][attackOrDefense] ?? {};

      // 各声援の効果値と発動確率を格納する
      const powerRateArray: number[][] = [];

      Object.values(skillsData).forEach(
        ({ estimatedPower, estimatedRate, skillEffect }) => {
          powerRateArray.push([estimatedPower ?? 0, estimatedRate ?? 0]);

          // 対抗戦ではついでに声援効果も合算しておく
          if (eventId === "clubcup") {
            totalPerformance.skillEffect! += skillEffect ?? 0;
          }
        }
      );

      // イベントごとの声援の最大発動数
      let skillMaxNum =
        mainOrSub === "mainSkills"
          ? SKILL_DATA_PER_EVENT[eventId].skillMaxNumMain
          : SKILL_DATA_PER_EVENT[eventId].skillMaxNumSubSwitchOff;

      // 確率 100 % のときは min/exp/maxすべてに加算。
      // それ以外のときは 確率を掛けてまずはexpのみに加算。
      powerRateArray.forEach(([power, rate]) => {
        if (rate === 100) {
          totalPerformance.minPower! += power;
          totalPerformance.expPower! += power;
          totalPerformance.maxPower! += power;
          skillMaxNum -= 1;
        } else {
          totalPerformance.expPower! += Math.ceil((power * rate) / 100);
        }
      });

      // powerRateArrayから確率100%を消し、かつ効果値順にする。
      const filteredArray = powerRateArray
        .filter(([_, rate]) => rate !== 100)
        .sort(([a], [b]) => b - a);

      // skillMaxNum が残っている限り、効果値順でmaxに加算する。
      for (let i = 0; i < filteredArray.length; i++) {
        if (skillMaxNum <= 0) break;
        totalPerformance.maxPower! += filteredArray[i][0];
        skillMaxNum -= 1;
      }
    });

    // ぷちガールちゃんの総攻援、総守援を加算。有効率も考慮。
    const petitGirlsTotalPower = Math.ceil(
      returnNumber(inputData.petitGirls.totalPower[attackOrDefense]) *
        BONUS_DATA_PER_EVENT[eventId].petitGirls.base / 100
    );
    totalPerformance.minPower! += petitGirlsTotalPower;
    totalPerformance.expPower! += petitGirlsTotalPower;
    totalPerformance.maxPower! += petitGirlsTotalPower;

    // 合算後のtotalPerformanceを反映する
    intermediateResults.totalPerformance[attackOrDefense] = totalPerformance;
  });
};
