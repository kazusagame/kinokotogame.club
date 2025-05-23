import { IntermediateResults } from "@/components/decksim/simulator/calculator/IntermediateResults";
import { DeckSimulatorResult } from "@/components/decksim/simulator/useDeckSimulatorData";

export const transferIntermediateToSummary = ({
  intermediateResults,
  summary,
}: {
  intermediateResults: IntermediateResults;
  summary: DeckSimulatorResult;
}) => {
  // totalPerformance
  summary.summaries.totalPerformance =
    intermediateResults.totalPerformance ?? {};

  // mainScenes

  // mainSkills

  // subScenes

  // SwitchOff

  // preciousScenes
  (["attack", "defense"] as const).forEach((attackOrDefense) => {
    const data = intermediateResults["preciousScenes"]?.[attackOrDefense] ?? {};
    const scenesKeys = Object.keys(data).filter(
      (key) => key !== "limitBreakCount"
    );
    scenesKeys.forEach((key) => {
      const from = data[Number(key)];
      summary.summaries.preciousScenes[attackOrDefense][Number(key)] = {};
      const destination =
        summary.summaries.preciousScenes[attackOrDefense][Number(key)];
      (["estimatedPower", "estimatedCount"] as const).forEach((prop) => {
        if (from.hasOwnProperty(prop)) destination[prop] = from[prop];
      });
    });
  });

  // petitGirls
};
