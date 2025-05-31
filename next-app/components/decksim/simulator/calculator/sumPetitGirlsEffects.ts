import { DeckSimulatorData } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { IntermediateResults } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorIntermediateResults";

import { PETIT_GIRLS_EFFECTS_DATA } from "@/components/decksim/data/petitGirlsEffectData";

type EffectConditionKey =
  | "type"
  | "grade"
  | "bestFriend"
  | "date"
  | "touch"
  | "birthday"
  | "clubItem";
type ConditionDetailKey =
  | "all"
  | "sweet"
  | "cool"
  | "pop"
  | "1年生"
  | "2年生"
  | "3年生";
type EffectTypeKey = "attack" | "defense" | "both";

const effectConditionMap: Record<string, EffectConditionKey> = {
  タイプ: "type",
  学年: "grade",
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
  "1年生": "1年生",
  "2年生": "2年生",
  "3年生": "3年生",
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
    grade: {
      "1年生": {
        attack: 0,
        defense: 0,
        both: 0,
      },
      "2年生": {
        attack: 0,
        defense: 0,
        both: 0,
      },
      "3年生": {
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

      if (effectConditionKey && conditionDetailKey && effectTypeKey) {
        if (effectConditionKey !== "grade") {
          if (
            newData[effectConditionKey]?.[
              conditionDetailKey as "all" | "sweet" | "cool" | "pop"
            ]?.[effectTypeKey] !== undefined
          ) {
            newData[effectConditionKey][
              conditionDetailKey as "all" | "sweet" | "cool" | "pop"
            ]![effectTypeKey]! += value;
          }
        } else {
          if (
            newData[effectConditionKey]?.[
              conditionDetailKey as "1年生" | "2年生" | "3年生"
            ]?.[effectTypeKey] !== undefined
          ) {
            newData[effectConditionKey][
              conditionDetailKey as "1年生" | "2年生" | "3年生"
            ]![effectTypeKey]! += value;
          }
        }
      }
    });
  });

  // intermediateResultsに反映
  if (!intermediateResults.petitGirls) intermediateResults.petitGirls = {};
  intermediateResults.petitGirls.effects = newData;
};
