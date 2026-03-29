import { initDeckSimulatorGirlCount } from "@/features/decksim/hooks/useDeckSimulatorData";

import { DeckSimulatorData } from "@/features/decksim/type-definitions/DeckSimulatorData";
import { DeckSimulatorGirlCount } from "@/features/decksim/type-definitions/DeckSimulatorGirlCount";

export const aggregateGirlCount = ({
  inputData,
}: {
  inputData: DeckSimulatorData;
}): DeckSimulatorGirlCount => {
  const nextGirlCount = structuredClone(initDeckSimulatorGirlCount);

  // ここに集計処理を書く。

  return nextGirlCount;
};
