import { DeckSimulatorData } from "@/components/decksim/simulator/useDeckSimulatorData";
import { IntermediateResults } from "@/components/decksim/simulator/calculator/IntermediateResults";

import { PRECIOUS_SCENES_DATA } from "@/components/decksim/data/preciousScenesData";
import { SelectPreciousSceneParameters } from "@/components/decksim/simulator/calculator/IntermediateResults";

export const setPreciousSceneParameter = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  const newData: NonNullable<IntermediateResults["preciousScenes"]> = {
    attack: {},
    defense: {},
  };

  // センバツ内のEx進展数をカウント 攻/守 * 主/副
  (["attack", "defense"] as const).forEach((value) => {
    newData[value]!.limitBreakCount = calcLimitBreakCount({
      inputData,
      type: value,
    });
  });

  // プレシャスシーンの効果値や条件などを確定する
  (["attack", "defense"] as const).forEach((value) => {
    if (inputData.preciousScenes[value]) {
      Object.entries(inputData.preciousScenes[value]).forEach(
        ([key, { id, rarity, headcount }]) => {
          newData[value]![Number(key)] = selectPreciousScenesParameter({
            id,
            rarity,
            headcount,
          });
        }
      );
    }
  });

  // intermediateResultsに反映
  intermediateResults.preciousScenes = newData;
};

const calcLimitBreakCount = ({
  inputData,
  type,
}: {
  inputData: DeckSimulatorData;
  type:
    | keyof DeckSimulatorData["mainScenes"]
    | keyof DeckSimulatorData["subScenes"];
}): {
  main: number;
  sub: number;
} => {
  const newCount = {
    main: 0,
    sub: 0,
  };

  // 主センバツのカウント
  if (inputData.mainScenes[type] !== undefined) {
    Object.values(inputData.mainScenes[type]).forEach((value) => {
      const { rarity, isLimitBreak } = value;
      if (rarity === "Luv" || isLimitBreak === true) newCount.main += 1;
    });
  }

  // 副センバツのカウント
  if (inputData.subScenes[type] !== undefined) {
    Object.values(inputData.subScenes[type]).forEach((value) => {
      const { rarity, isLimitBreak } = value;
      if (rarity === "Luv" || isLimitBreak === true) newCount.sub += 1;
    });
  }

  return newCount;
};

const selectPreciousScenesParameter = ({
  id,
  rarity,
  headcount,
}: {
  id: string;
  rarity: string;
  headcount?: number | string;
}) => {
  const parameters: SelectPreciousSceneParameters = {
    effectCondition: "---",
    conditionThreshold: 0,
    additionalCondition: undefined,
    effectTarget: "全タイプ",
    effectType: "攻援UP",
    effectRange: "主＋副",
    valueFormat: "割合(%)",
    value: 0,
    factor: 0,
    headcount: headcount,
  };

  // IDからプレシャスシーンのプロフィールを取得
  const profile = PRECIOUS_SCENES_DATA?.[Number(id)];
  if (!profile) return parameters;

  const valueKey = `value${rarity}` as
    | "value1"
    | "value2"
    | "value3"
    | "value4"
    | "value5"
    | "value6";

  // effectCondition, effectTarget, effectRange, valueFormat を確定して転記
  parameters.effectCondition = profile.effectCondition;
  parameters.effectTarget = profile.effectTarget;
  parameters.effectRange = profile.effectRange;
  parameters.valueFormat = profile.valueFormat;

  if (Number(rarity) <= 5) {
    parameters.conditionThreshold = profile.conditionThreshold;
    parameters.additionalCondition = undefined;
    parameters.effectType = profile.effectType;
    parameters.value = profile[valueKey] ?? 0;
    parameters.factor = profile.factor ?? 0;
  } else if (Number(rarity) === 6) {
    parameters.conditionThreshold =
      profile.conditionThreshold6 ?? profile.conditionThreshold;
    parameters.additionalCondition = profile.additionalCondition6;
    parameters.effectType = profile.effectType6 ?? profile.effectType;
    parameters.value = profile.value6 ?? profile.value5;
    parameters.factor = profile.factor6 ?? profile.factor ?? 0;
  }

  return parameters;
};
