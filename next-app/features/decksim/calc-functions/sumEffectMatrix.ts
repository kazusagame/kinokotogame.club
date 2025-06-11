import {
  IntermediateResults,
  PowerDict,
} from "@/features/decksim/type-definitions/DeckSimulatorIntermediateResults";

import { BONUS_DATA_COMMON } from "@/features/decksim/data/bonusData";

import { setDeepValue } from "@/lib/setDeepValue";

export const sumEffectMatrix = ({
  intermediateResults,
}: {
  intermediateResults: IntermediateResults;
}) => {
  // 主セン/副セン、攻援/守援 のシーンごとに各ボーナス効果値を合計する
  (["mainScenes", "subScenes"] as const).forEach((mainOrSub) => {
    (["attack", "defense"] as const).forEach((attackOrDefense) => {
      const scenesData = intermediateResults[mainOrSub][attackOrDefense] ?? {};
      const keys = Object.keys(scenesData).filter(
        (key) => key !== "basePowerArray"
      );

      keys.forEach((key) => {
        const effectMatrix = scenesData[Number(key)]?.effectMatrix;

        // effectMatrixがない場合はreturn (通常ありえない)
        if (!effectMatrix) return;

        const effectTotal = {
          min: 0,
          expDif: 0,
          maxDif: 0,
        };

        Object.entries(effectMatrix).forEach(
          ([outerKey, outerObject]: [string, PowerDict]) => {
            Object.values(outerObject).forEach((value: number) => {
              if (outerKey !== "limitBreak") {
                effectTotal.min += Math.ceil(value);
              } else {
                effectTotal.expDif += Math.ceil(
                  (value * BONUS_DATA_COMMON.limitBreak.probability) / 100
                );
                effectTotal.maxDif += Math.ceil(value);
              }
            });
          }
        );

        setDeepValue(
          intermediateResults,
          `${mainOrSub}.${attackOrDefense}.${key}.effectTotal`,
          effectTotal
        );
      });
    });
  });
};
