import { BONUS_DATA_COMMON } from "@/components/decksim/data/bonusData";
import { DeckSimulatorEventId } from "@/components/decksim/data/eventData";
import {
  DeckSimulatorData,
  SceneParameters,
} from "@/components/decksim/simulator/useDeckSimulatorData";
import {
  IntermediateResults,
  SelectPreciousSceneParameters,
} from "@/components/decksim/simulator/calculator/IntermediateResults";

import { setDeepValue } from "@/lib/setDeepValue";
import { returnNumber } from "@/lib/returnNumber";

export const calcPreciousSceneEffects = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  // 攻援/守援センバツごと x プレシャスシーンごとに、実際の効果値を算出する
  (["attack", "defense"] as const).forEach((attackOrDefense) => {
    const data = intermediateResults["preciousScenes"]?.[attackOrDefense] ?? {};
    const scenesKeys = Object.keys(data).filter(
      (key) => key !== "limitBreakCount"
    );
    const limitBreakCount = data.limitBreakCount!;

    scenesKeys.forEach((key) => {
      const preciousParameters = data[Number(key)];
      calcEachPreciousSceneEffect({
        inputData,
        intermediateResults,
        attackOrDefense,
        preciousNum: Number(key),
        preciousParameters,
        limitBreakCount,
      });
    });
  });

  // 各シーンごとにプレシャスシーンの合計効果値を算出する
  (["mainScenes", "subScenes"] as const).forEach((mainOrSub) => {
    (["attack", "defense"] as const).forEach((attackOrDefense) => {
      const scenesData =
        intermediateResults[mainOrSub]?.[attackOrDefense] ?? {};

      Object.values(scenesData).forEach((value) => {
        if (value.preciousSceneEffect) {
          const keys = Object.keys(value.preciousSceneEffect).filter(
            (key) => key !== "total"
          );

          let sum = 0;
          keys.forEach((key) => {
            sum += value.preciousSceneEffect![Number(key)];
          });
          value.preciousSceneEffect.total = sum;
        }
      });
    });
  });
};

const calcEachPreciousSceneEffect = ({
  inputData,
  intermediateResults,
  attackOrDefense,
  preciousNum,
  preciousParameters,
  limitBreakCount,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
  attackOrDefense: "attack" | "defense";
  preciousNum: number;
  preciousParameters: SelectPreciousSceneParameters;
  limitBreakCount: { main: number; sub: number };
}) => {
  let sum = 0;
  (["mainScenes", "subScenes"] as const).forEach((mainOrSub) => {
    Object.entries(inputData[mainOrSub][attackOrDefense] ?? {}).forEach(
      ([key, sceneParameters]) => {
        const effectValue = calcEachScene({
          eventId: inputData.dataType,
          attackOrDefense,
          mainOrSub,
          sceneParameters,
          preciousParameters,
          limitBreakCount,
        });
        setDeepValue(
          intermediateResults,
          `${mainOrSub}.${attackOrDefense}.${key}.preciousSceneEffect.${preciousNum}`,
          effectValue
        );
        sum += effectValue;

        // シーンがデート中の場合は そのボーナス値分も加算する
        if (sceneParameters.isDate === true) {
          const bonusValue =
            BONUS_DATA_COMMON.date[attackOrDefense][sceneParameters.rarity];
          sum += Math.ceil((effectValue * bonusValue) / 100);
        }
      }
    );
  });

  // 合計値 を intermediate に反映する
  intermediateResults.preciousScenes![attackOrDefense]![
    preciousNum
  ].estimatedPower = sum;
};

const calcEachScene = ({
  eventId,
  attackOrDefense,
  mainOrSub,
  sceneParameters,
  preciousParameters,
  limitBreakCount,
}: {
  eventId: DeckSimulatorEventId;
  attackOrDefense: "attack" | "defense";
  mainOrSub: "mainScenes" | "subScenes";
  sceneParameters: SceneParameters;
  preciousParameters: SelectPreciousSceneParameters;
  limitBreakCount: { main: number; sub: number };
}): number => {
  const { basePower, strap, type, rarity, cost, skillLv } = sceneParameters;
  const totalPower = returnNumber(basePower) + returnNumber(strap);
  const rarityNum =
    rarity === "Luv" ? 7 : rarity === "UR" ? 7 : rarity === "SSR" ? 6 : 5;
  const costNum = Number(cost);
  const skillLvNum = Number(skillLv);

  if (
    Number.isNaN(totalPower) ||
    Number.isNaN(costNum) ||
    Number.isNaN(skillLvNum)
  )
    return 0;

  const {
    effectCondition,
    conditionThreshold,
    additionalCondition,
    effectTarget,
    effectType,
    effectRange,
    valueFormat,
    value,
    factor,
    headcount,
  } = preciousParameters;
  let headcountNum: number | null = Number(headcount);
  if (Number.isNaN(headcountNum) || headcountNum <= 0) headcountNum = null;

  // effectTarget に合致しない場合は 0
  if (effectTarget !== "全タイプ" && effectTarget !== type) {
    return 0;
  }

  // effectType に合致しない場合は 0
  if (effectType === "攻援UP" && attackOrDefense === "defense") return 0;
  if (effectType === "守援UP" && attackOrDefense === "attack") return 0;

  // effectRange に合致しない場合は 0
  if (effectRange === "主のみ" && mainOrSub === "subScenes") return 0;
  if (effectRange === "副のみ" && mainOrSub === "mainScenes") return 0;

  // additionalCondition が存在する場合、その条件に合致しない場合は 0
  if (additionalCondition) {
    if (additionalCondition === "たすけて！マイヒーロー限定") {
      if (
        eventId !== "raid-first" &&
        eventId !== "raid-second" &&
        eventId !== "raid-mega"
      ) {
        return 0;
      }
    }
  }

  let result = 0;
  let top = 1,
    bottom = 1;
  switch (effectCondition) {
    case "コストが高いほど":
      top = costNum < 1 ? 1 : costNum;
      bottom = conditionThreshold as number;
      break;

    case "レアリティが高いほど":
      top = rarityNum < 1 ? 1 : rarityNum;
      bottom =
        conditionThreshold === "UR"
          ? 7
          : conditionThreshold === "SSR"
          ? 6
          : conditionThreshold === "SR"
          ? 5
          : conditionThreshold === "HR"
          ? 4
          : conditionThreshold === "R"
          ? 3
          : conditionThreshold === "HN"
          ? 2
          : 1;
      break;

    case "声援Lvが高いほど":
      top = skillLvNum < 1 ? 1 : skillLvNum;
      bottom = conditionThreshold as number;
      break;

    case "Ex進展ガールが多いほど":
      top =
        effectRange === "主のみ"
          ? limitBreakCount.main
          : effectRange === "副のみ"
          ? limitBreakCount.sub
          : limitBreakCount.main + limitBreakCount.sub;
      bottom = conditionThreshold as number;

      // estimatedCount に 自動カウント数を反映しておく
      preciousParameters.estimatedCount = top;
      break;

    case "特定のガールで編成するほど":
      top = conditionThreshold as number;
      bottom = headcountNum ?? top;
      break;

    case "様々なガールで編成するほど":
      bottom = conditionThreshold as number;
      top = headcountNum ?? bottom;
      break;

    case "---":
      top = 1;
      bottom = 1;
      break;
  }

  // 条件超過の場合は1/1とみなす。
  if (top > bottom) top = bottom;

  if (valueFormat === "固定値") {
    result = Math.ceil(value * (top / bottom) ** factor);
  } else {
    result = Math.ceil(((totalPower * value) / 100) * (top / bottom) ** factor);
  }

  return result;
};
