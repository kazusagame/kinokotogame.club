import { DeckSimulatorData } from "@/components/decksim/simulator/useDeckSimulatorData";
import { IntermediateResults } from "@/components/decksim/simulator/calculator/IntermediateResults";

import { PETIT_GIRLS_EFFECTS_DATA } from "@/components/decksim/data/petitGirlsEffectData";

type EffectConditionKey =
  | "type"
  | "bestFriend"
  | "date"
  | "touch"
  | "birthday"
  | "clubItem";
type ConditionDetailKey = "all" | "sweet" | "cool" | "pop";
type EffectTypeKey = "attack" | "defense" | "both";

const effectConditionMap: Record<string, EffectConditionKey> = {
  タイプ: "type",
  本命ガール: "bestFriend",
  デート中: "date",
  タッチ: "touch",
  誕生日: "birthday",
  部活設備: "clubItem",
};

const conditionDetailMap: Record<string, ConditionDetailKey> = {
  全タイプ: "all",
  SWEETタイプ: "sweet",
  COOLタイプ: "cool",
  POPタイプ: "pop",
};

const effectTypeMap: Record<string, EffectTypeKey> = {
  攻援UP: "attack",
  守援UP: "defense",
  攻守UP: "both",
};

export const sumPetitGirlsEffects = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  const newData: NonNullable<IntermediateResults["petitGirls"]>["effects"] = {
    type: {
      all: {
        attack: 0,
        defense: 0,
        both: 0,
      },
      sweet: {
        attack: 0,
        defense: 0,
        both: 0,
      },
      cool: {
        attack: 0,
        defense: 0,
        both: 0,
      },
      pop: {
        attack: 0,
        defense: 0,
        both: 0,
      },
    },
    bestFriend: {
      all: {
        both: 0,
      },
    },
    date: {
      all: {
        both: 0,
      },
    },
    touch: {
      all: {
        both: 0,
      },
    },
    birthday: {
      all: {
        both: 0,
      },
    },
    clubItem: {
      sweet: {
        both: 0,
      },
      cool: {
        both: 0,
      },
      pop: {
        both: 0,
      },
    },
  };

  Object.values(inputData.petitGirls.effects).forEach((outerValue) => {
    const isRarityUr = outerValue.isRarityUr ?? false;
    const keys = Object.keys(outerValue).filter((key) => key !== "isRarityUr");
    keys.forEach((key) => {
      const id = outerValue[Number(key)].id;
      if (id === undefined) return;
      const {
        effectCondition,
        conditionDetail,
        effectType,
        levelMaxValue,
        levelMaxValueUr,
      } = PETIT_GIRLS_EFFECTS_DATA[Number(id)];

      const effectConditionKey = effectConditionMap[effectCondition] ?? null;
      const conditionDetailKey = conditionDetailMap[conditionDetail] ?? null;
      const effectTypeKey = effectTypeMap[effectType] ?? null;
      const value = isRarityUr === true ? levelMaxValueUr : levelMaxValue;

      if (
        effectConditionKey &&
        conditionDetailKey &&
        effectTypeKey &&
        newData[effectConditionKey]?.[conditionDetailKey]?.[effectTypeKey] !==
          undefined
      ) {
        newData[effectConditionKey][conditionDetailKey][effectTypeKey] += value;
      }
    });
  });

  // intermediateResultsに反映
  if (!intermediateResults.petitGirls) intermediateResults.petitGirls = {};
  intermediateResults.petitGirls.effects = newData;
};
