import { DeckSimulatorData } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import {
  IntermediateResults,
  BasePowerArray,
} from "@/components/decksim/simulator/typeDefinition/DeckSimulatorIntermediateResults";

import { BONUS_DATA_PER_EVENT } from "@/components/decksim/data/bonusData";
import {
  SKILL_DATA_PER_EVENT,
  SKILL_RATE_DATA,
} from "@/components/decksim/data/skillData";
import { MAX_MAIN_GIRLS_NUM } from "@/components/decksim/simulator/globalConfig";

import { setDeepValue } from "@/lib/setDeepValue";
import { returnNumber } from "@/lib/returnNumber";

export const calcSkillEffects = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  // 声援計算用に各タイプごとのベース値配列を作成する
  createBasePowerArray({ inputData, intermediateResults });

  // 各声援の効果値を算出する
  calcSkillEffectValues({ inputData, intermediateResults });

  // 各声援の発揮値を算出する
  calcSkillPerformanceValues({ inputData, intermediateResults });

  // 確率を設定する (主にレイド後半用の処理)
  setSkillRate({ inputData, intermediateResults });

  // 声援効果を設定する（対抗戦用の処理）
  setSkillEffect({ inputData, intermediateResults });
};

const createBasePowerArray = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  (["mainScenes", "subScenes"] as const).forEach((mainOrSub) => {
    (["attack", "defense"] as const).forEach((attackOrDefense) => {
      const newData: BasePowerArray = {
        全タイプ: [],
        SWEETタイプ: [],
        COOLタイプ: [],
        POPタイプ: [],
      };
      const scenesData = inputData[mainOrSub][attackOrDefense] ?? {};

      Object.entries(scenesData).forEach(([key, sceneData]) => {
        const sceneType = sceneData.type;
        const scenePower = returnNumber(sceneData.basePower ?? 0);
        const strapEffect = returnNumber(sceneData.strap ?? 0);
        const preciousEffect =
          intermediateResults[mainOrSub]?.[attackOrDefense]?.[Number(key)]
            ?.preciousSceneEffect?.total ?? 0;
        const powerDict = {
          scenePower,
          strapEffect,
          preciousEffect,
        };

        // TBD:
        // レイド、メモストではここにタイプ有利不利バフ、有利ガール補正バフの加算処理が必要。
        // 声援の受け手によって声援にバフが乗る乗らないが発生するためここに入れた方が楽そう

        newData["全タイプ"].push(powerDict);
        newData[sceneType].push(powerDict);
      });

      setDeepValue(
        intermediateResults,
        `${mainOrSub}.${attackOrDefense}.basePowerArray`,
        newData
      );
    });
  });
};

const calcSkillEffectValues = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  (["mainSkills", "subSwitches"] as const).forEach((mainOrSub) => {
    (["attack", "defense"] as const).forEach((attackOrDefense) => {
      const skillsData = inputData[mainOrSub][attackOrDefense] ?? {};

      Object.entries(skillsData).forEach(([key, skillData]) => {
        const target =
          skillData.target !== "全タイプ" ? "単タイプ" : "全タイプ";
        const range = skillData.range ?? "主＋副";
        const subRange =
          range === "主のみ"
            ? "副人数0"
            : Number(skillData.subRange) === 0
            ? "副人数0"
            : Number(skillData.subRange) === 1
            ? "副人数1"
            : "副人数2";
        const baseValue =
          SKILL_RATE_DATA[target]?.[range]?.[subRange]?.[skillData.type]?.[
            skillData.strength
          ]?.value;
        const effectValue = baseValue
          ? baseValue + Number(skillData.skillLv) - 1
          : 0;

        setDeepValue(
          intermediateResults,
          `${mainOrSub}.${attackOrDefense}.${key}.estimatedEffect`,
          effectValue
        );
      });
    });
  });
};

const calcSkillPerformanceValues = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  const eventId = inputData.dataType;
  const bonusData = BONUS_DATA_PER_EVENT[eventId];
  (["mainSkills", "subSwitches"] as const).forEach((mainOrSub) => {
    (["attack", "defense"] as const).forEach((attackOrDefense) => {
      const skillsData = inputData[mainOrSub][attackOrDefense] ?? {};
      Object.entries(skillsData).forEach(([key, skillData]) => {
        const { target, range, subRange, type } = skillData;
        const skillEffectValue =
          intermediateResults[mainOrSub]![attackOrDefense]![Number(key)]!
            .estimatedEffect ?? 0;

        // センバツタイプと声援タイプが不一致なら発揮値は 0 なので早期終了
        if (
          (attackOrDefense === "attack" && type === "守援") ||
          (attackOrDefense === "defense" && type === "攻援")
        ) {
          setDeepValue(
            intermediateResults,
            `${mainOrSub}.${attackOrDefense}.${key}.estimatedPower`,
            0
          );
          return;
        }

        // 効果値が 0 ならどう計算しても発揮値も 0 なので早期終了
        if (skillEffectValue === 0) {
          setDeepValue(
            intermediateResults,
            `${mainOrSub}.${attackOrDefense}.${key}.estimatedPower`,
            0
          );
          return;
        }

        let sum = 0;

        if (range === "主のみ" || range === "主＋副") {
          // 声援を主センバツが受けた時の数値を計算する
          sum += sumSkillArrayMultiplication({
            powerArray:
              intermediateResults["mainScenes"]?.[attackOrDefense]
                ?.basePowerArray?.[target] ?? [],
            limitNum: MAX_MAIN_GIRLS_NUM,
            skillEffectValue: skillEffectValue,
            skillEffectiveRate: {
              scene: bonusData.mainScenes.skill,
              strap: bonusData.mainStrap.skill,
              precious: bonusData.mainPrecious.skill,
            },
          });
        }

        if (range === "副のみ" || range === "主＋副") {
          // 声援を副センバツが受けた時の数値を計算する
          sum += sumSkillArrayMultiplication({
            powerArray:
              intermediateResults["subScenes"]?.[attackOrDefense]
                ?.basePowerArray?.[target] ?? [],
            limitNum: returnNumber(subRange),
            skillEffectValue: skillEffectValue,
            skillEffectiveRate: {
              scene: bonusData.subScenes.skill,
              strap: 0,
              precious: bonusData.subPrecious.skill,
            },
          });
        }

        setDeepValue(
          intermediateResults,
          `${mainOrSub}.${attackOrDefense}.${key}.estimatedPower`,
          sum
        );
      });
    });
  });
};

// 渡されたpowerArrayと効果値と有効率でsumした数値を返す関数
const sumSkillArrayMultiplication = ({
  powerArray,
  limitNum,
  skillEffectValue,
  skillEffectiveRate,
}: {
  powerArray: {
    scenePower: number;
    strapEffect: number;
    preciousEffect: number;
  }[];
  limitNum: number;
  skillEffectValue: number;
  skillEffectiveRate: {
    scene: number;
    strap: number;
    precious: number;
  };
}): number => {
  let sum = 0;

  for (let index = 0; index < powerArray.length; index++) {
    // 設定した人数に到達した場合は break
    if (index >= limitNum) break;

    const { scenePower, strapEffect, preciousEffect } = powerArray[index];
    sum += Math.ceil(
      (((scenePower * skillEffectValue) / 100) * skillEffectiveRate.scene) / 100
    );
    sum += Math.ceil(
      (((strapEffect * skillEffectValue) / 100) * skillEffectiveRate.strap) /
        100
    );
    sum += Math.ceil(
      (((preciousEffect * skillEffectValue) / 100) *
        skillEffectiveRate.precious) /
        100
    );
  }

  return sum;
};

const setSkillRate = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  const eventId = inputData.dataType;
  (["mainSkills", "subSwitches"] as const).forEach((mainOrSub) => {
    const skillProbabilityArray =
      mainOrSub === "mainSkills"
        ? SKILL_DATA_PER_EVENT[eventId].skillProbabilityMain
        : SKILL_DATA_PER_EVENT[eventId].skillProbabilitySubSwitchOff;

    (["attack", "defense"] as const).forEach((attackOrDefense) => {
      const skillsData =
        intermediateResults?.[mainOrSub]?.[attackOrDefense] ?? {};
      const skillEstimatedPowerArray: number[] = [];
      Object.entries(skillsData).forEach(([key, skillData]) => {
        if (!(mainOrSub === "mainSkills" && eventId === "raid-second")) {
          skillData.estimatedRate =
            skillProbabilityArray?.[Number(key) - 1] ?? 0;
        } else {
          // レイド後半の主センバツ声援はまずソート用に発揮値を取得。
          skillEstimatedPowerArray.push(skillData.estimatedPower ?? 0);
        }
      });

      // レイド後半の主センバツ声援は次にソート順に3つまで 100%、他は 0% にする。
      if (mainOrSub === "mainSkills" && eventId === "raid-second") {
        // 降順ソート
        skillEstimatedPowerArray.sort((a, b) => b - a);
        const limitNum = SKILL_DATA_PER_EVENT[eventId].skillMaxNumMain;

        Object.values(skillsData).forEach((skillData) => {
          const index = skillEstimatedPowerArray.indexOf(
            skillData.estimatedPower ?? 0
          );
          // 一度使ったindexは除外
          skillEstimatedPowerArray[index] = -1;

          if (index >= 0 && index <= limitNum - 1) {
            skillData.estimatedRate = 100;
          } else {
            skillData.estimatedRate = 0;
          }
        });
      }
    });
  });
};

const setSkillEffect = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  const eventId = inputData.dataType;
  // 対抗戦以外では不要
  if (eventId !== "clubcup") return;

  (["mainSkills", "subSwitches"] as const).forEach((mainOrSub) => {
    const skillsData = intermediateResults[mainOrSub]?.["attack"] ?? {};
    Object.values(skillsData).forEach((skillData) => {
      // 発揮値を5000で割った数値をここでは丸め込みをせずに加算。
      const value = (skillData?.estimatedPower ?? 0) / 5000;
      skillData.skillEffect = value;
    });
  });
};
