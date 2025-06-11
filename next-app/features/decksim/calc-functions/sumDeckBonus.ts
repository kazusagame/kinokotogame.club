import { DeckSimulatorData } from "@/features/decksim/type-definitions/DeckSimulatorData";
import { IntermediateResults } from "@/features/decksim/type-definitions/DeckSimulatorIntermediateResults";

import { BONUS_DATA_COMMON } from "@/features/decksim/data/bonusData";

export const sumDeckBonus = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  const newData: NonNullable<IntermediateResults["deckBonus"]> = {
    attack: 0,
    defense: 0,
    both: 0,
  };

  // 通常センバツボーナス
  Object.values(inputData.deckBonus.normal).forEach(
    ({ level = "0", type = "攻守" }) => {
      const typeKey =
        type === "攻守" ? "both" : type === "攻援" ? "attack" : "defense";
      const levelKey = ("lv" + level) as
        | "lv0"
        | "lv1"
        | "lv2"
        | "lv3"
        | "lv4"
        | "lv5"
        | "lv6"
        | "lv7"
        | "lv8";
      const value = BONUS_DATA_COMMON.deck.normal[typeKey]?.[levelKey] ?? 0;

      // 非nullアサーションで警告を回避（安全）
      newData[typeKey]! += value;
    }
  );

  // キラガール
  {
    const { level = "0", type = "攻守" } = inputData.deckBonus.shine;
    const typeKey = type === "攻守" ? "both" : "both";
    const levelKey = ("lv" + level) as
      | "lv0"
      | "lv1"
      | "lv2"
      | "lv3"
      | "lv4"
      | "lv5";
    const value = BONUS_DATA_COMMON.deck.shine[typeKey]?.[levelKey] ?? 0;
    newData[typeKey]! += value;
  }

  // フレンドぷちガールSSR
  {
    const { level = "0", type = "攻守" } = inputData.deckBonus.precious;
    const typeKey = type === "攻守" ? "both" : "both";
    const levelKey = ("lv" + level) as
      | "lv0"
      | "lv1"
      | "lv2"
      | "lv3"
    const value = BONUS_DATA_COMMON.deck.precious[typeKey]?.[levelKey] ?? 0;
    newData[typeKey]! += value;
  }

  // フレンドぷちガールUR
  {
    const { level = "0", type = "攻守" } = inputData.deckBonus.preciousPlus;
    const typeKey = type === "攻守" ? "both" : "both";
    const levelKey = ("lv" + level) as
      | "lv0"
      | "lv1"
      | "lv2"
      | "lv3"
    const value = BONUS_DATA_COMMON.deck.preciousPlus[typeKey]?.[levelKey] ?? 0;
    newData[typeKey]! += value;
  }

  // intermediateResultsに反映
  intermediateResults.deckBonus = newData;
};
