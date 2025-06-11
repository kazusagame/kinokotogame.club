import { DeckSimulatorData } from "@/features/decksim/type-definitions/DeckSimulatorData";
import {
  IntermediateResults,
  PowerDict,
} from "@/features/decksim/type-definitions/DeckSimulatorIntermediateResults";

import {
  BONUS_DATA_COMMON,
  BONUS_DATA_PER_EVENT,
  RaidTypeAdvantageSuperRareBonusMap,
  RaidTypeAdvantageMegaBonusMap,
  TowerSpecialGirls,
} from "@/features/decksim/data/bonusData";
import {
  SKILL_DATA_PER_EVENT,
  MAX_SKILL_LEVEL,
} from "@/features/decksim/data/skillData";

import { returnNumber } from "@/lib/returnNumber";

export const calcTotalPerformance = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  const eventId = inputData.dataType;

  // 課外活動コンテスト、聖櫻ワールド用に声援の合計加算値をまとめておく
  const skillPerformance: IntermediateResults["skillPerformance"] = {
    attack: {
      minPower: 0,
      expPower: 0,
      maxPower: 0,
    },
    defense: {
      minPower: 0,
      expPower: 0,
      maxPower: 0,
    },
  };

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

        // effectTotalがない場合はreturn (通常ありえない)
        if (!effectTotal) return;

        // レイドやメモストではここで有利不利タイプ補正や有利ガール補正の加算が必要になる。
        if (eventId === "raid-first" || eventId === "raid-second") {
          const sceneData = inputData[mainOrSub][attackOrDefense]![Number(key)];
          const sceneType = sceneData.type;
          const sceneTypeKey =
            sceneType === "SWEETタイプ"
              ? "sweet"
              : sceneType === "COOLタイプ"
              ? "cool"
              : sceneType === "POPタイプ"
              ? "pop"
              : "sweet";
          const enemyType =
            inputData.eventSpecial[eventId]?.enemyType ?? "通常タイプ";
          const enemyTypeKey =
            enemyType === "通常タイプ"
              ? "normal"
              : enemyType === "SWEETタイプ"
              ? "sweet"
              : enemyType === "COOLタイプ"
              ? "cool"
              : enemyType === "POPタイプ"
              ? "pop"
              : "normal";
          const effectMap = BONUS_DATA_PER_EVENT[eventId].eventUniqueBonus!
            .typeAdvantage.value as RaidTypeAdvantageSuperRareBonusMap;
          const effectValue = effectMap[enemyTypeKey][sceneTypeKey] ?? 0;

          effectTotal.min = Math.ceil(
            effectTotal.min * (1 + effectValue / 100)
          );
          effectTotal.expDif = Math.ceil(
            effectTotal.expDif * (1 + effectValue / 100)
          );
          effectTotal.maxDif = Math.ceil(
            effectTotal.maxDif * (1 + effectValue / 100)
          );
        } else if (eventId === "raid-mega") {
          const sceneData = inputData[mainOrSub][attackOrDefense]![Number(key)];
          const sceneType = sceneData.type;
          const sceneTypeKey =
            sceneType === "SWEETタイプ"
              ? "sweet"
              : sceneType === "COOLタイプ"
              ? "cool"
              : sceneType === "POPタイプ"
              ? "pop"
              : "sweet";
          const enemyType =
            inputData.eventSpecial[eventId]?.enemyType ?? "通常タイプ";
          const enemyTypeKey =
            enemyType === "通常タイプ"
              ? "normal"
              : enemyType === "SWEETタイプ"
              ? "sweet"
              : enemyType === "COOLタイプ"
              ? "cool"
              : enemyType === "POPタイプ"
              ? "pop"
              : "normal";
          const effectMap = BONUS_DATA_PER_EVENT[eventId].eventUniqueBonus!
            .typeAdvantage.value as RaidTypeAdvantageMegaBonusMap;
          const effectValue = effectMap[enemyTypeKey][sceneTypeKey] ?? 0;

          // 攻援力UPバフはシーンとストラップ効果分にのみ掛かり、
          // プレシャスシーン効果分には掛からないためここで加算する。
          let attackUpBuff = returnNumber(
            inputData.eventSpecial["raid-mega"]?.attackUpBuff ?? 100
          );
          if (attackUpBuff < -100) attackUpBuff = -100;
          if (attackUpBuff > 100) attackUpBuff = 100;

          // ボーナス込みで再計算するため一旦初期化する
          effectTotal.min = 0;
          effectTotal.expDif = 0;
          effectTotal.maxDif = 0;

          const effectMatrix = scenesData[Number(key)].effectMatrix!;

          Object.entries(effectMatrix).forEach(
            ([outerKey, outerObject]: [string, PowerDict]) => {
              Object.entries(outerObject).forEach(
                ([innerKey, value]: [string, number]) => {
                  if (innerKey === "scenePower") {
                    if (outerKey !== "limitBreak") {
                      effectTotal.min += Math.ceil(
                        value *
                          (1 + effectValue.scenes / 100) *
                          (1 + attackUpBuff / 100)
                      );
                    } else {
                      effectTotal.expDif += Math.ceil(
                        value *
                          (BONUS_DATA_COMMON.limitBreak.probability / 100) *
                          (1 + effectValue.scenes / 100) *
                          (1 + attackUpBuff / 100)
                      );
                      effectTotal.maxDif += Math.ceil(
                        value *
                          (1 + effectValue.scenes / 100) *
                          (1 + attackUpBuff / 100)
                      );
                    }
                  } else if (innerKey === "strapEffect") {
                    if (outerKey !== "limitBreak") {
                      effectTotal.min += Math.ceil(
                        value *
                          (1 + effectValue.strap / 100) *
                          (1 + attackUpBuff / 100)
                      );
                    } else {
                      effectTotal.expDif += Math.ceil(
                        value *
                          (BONUS_DATA_COMMON.limitBreak.probability / 100) *
                          (1 + effectValue.strap / 100) *
                          (1 + attackUpBuff / 100)
                      );
                      effectTotal.maxDif += Math.ceil(
                        value *
                          (1 + effectValue.strap / 100) *
                          (1 + attackUpBuff / 100)
                      );
                    }
                  } else if (innerKey === "preciousEffect") {
                    // 基礎とデートボーナス分には有利/不利タイプ補正を加算しない。
                    if (outerKey === "base" || outerKey === "date") {
                      effectTotal.min += value;
                    } else if (outerKey !== "limitBreak") {
                      effectTotal.min += Math.ceil(
                        value * (1 + effectValue.precious / 100)
                      );
                    } else {
                      effectTotal.expDif += Math.ceil(
                        value *
                          (BONUS_DATA_COMMON.limitBreak.probability / 100) *
                          (1 + effectValue.precious / 100)
                      );
                      effectTotal.maxDif += Math.ceil(
                        value * (1 + effectValue.precious / 100)
                      );
                    }
                  }
                }
              );
            }
          );
        } else if (eventId === "tower") {
          // 声援の受け手が有利なガールの場合はボーナスを加算する
          const sceneData = inputData[mainOrSub][attackOrDefense]![Number(key)];
          if (sceneData?.isSpecial === true) {
            const sceneRarity = sceneData.rarity;
            let sceneSkillLv = returnNumber(sceneData.skillLv);
            if (sceneSkillLv < 10) sceneSkillLv = 10;
            if (sceneSkillLv > MAX_SKILL_LEVEL) sceneSkillLv = MAX_SKILL_LEVEL;
            const effectMap = BONUS_DATA_PER_EVENT.tower.eventUniqueBonus!
              .specialGirls.value as TowerSpecialGirls;
            const effectValue =
              effectMap[sceneRarity][`lv${sceneSkillLv}`] ?? 0;

            effectTotal.min = Math.ceil(
              effectTotal.min * (1 + effectValue / 100)
            );
            effectTotal.expDif = Math.ceil(
              effectTotal.expDif * (1 + effectValue / 100)
            );
            effectTotal.maxDif = Math.ceil(
              effectTotal.maxDif * (1 + effectValue / 100)
            );
          }
        }

        totalPerformance.minPower! += effectTotal.min;
        totalPerformance.expPower! += effectTotal.min + effectTotal.expDif;
        totalPerformance.maxPower! += effectTotal.min + effectTotal.maxDif;

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
          skillPerformance[attackOrDefense].minPower += power;
          skillPerformance[attackOrDefense].expPower += power;
          skillPerformance[attackOrDefense].maxPower += power;
          skillMaxNum -= 1;
        } else {
          skillPerformance[attackOrDefense].expPower += Math.ceil(
            (power * rate) / 100
          );
        }
      });

      // powerRateArrayから確率100%を消し、かつ効果値順にする。
      const filteredArray = powerRateArray
        .filter(([_, rate]) => rate !== 100)
        .sort(([a], [b]) => b - a);

      // skillMaxNum が残っている限り、効果値順でmaxに加算する。
      for (let i = 0; i < filteredArray.length; i++) {
        if (skillMaxNum <= 0) break;
        skillPerformance[attackOrDefense].maxPower += filteredArray[i][0];
        skillMaxNum -= 1;
      }
    });
    totalPerformance.minPower! += skillPerformance[attackOrDefense].minPower;
    totalPerformance.expPower! += skillPerformance[attackOrDefense].expPower;
    totalPerformance.maxPower! += skillPerformance[attackOrDefense].maxPower;

    // ぷちガールちゃんの総攻援、総守援を加算。有効率も考慮。
    const petitGirlsTotalPower = Math.ceil(
      (returnNumber(inputData.petitGirls.totalPower[attackOrDefense]) *
        BONUS_DATA_PER_EVENT[eventId].petitGirls.base) /
        100
    );
    totalPerformance.minPower! += petitGirlsTotalPower;
    totalPerformance.expPower! += petitGirlsTotalPower;
    totalPerformance.maxPower! += petitGirlsTotalPower;

    // 合算後のtotalPerformanceを反映する
    intermediateResults.totalPerformance[attackOrDefense] = totalPerformance;
  });

  // 課外活動コンテスト、聖櫻ワールド用に声援の合計加算値を保存
  intermediateResults.skillPerformance = skillPerformance;
};
