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
  (["attack", "defense"] as const).forEach((attackOrDefense) => {
    const data = intermediateResults["mainScenes"]?.[attackOrDefense] ?? {};
    const scenesKeys = Object.keys(data).filter(
      (key) => key !== "basePowerArray"
    );
    scenesKeys.forEach((key) => {
      const from = data[Number(key)];
      summary.summaries.mainScenes[attackOrDefense][Number(key)] = {};
      const destination =
        summary.summaries.mainScenes[attackOrDefense][Number(key)];
      (
        [
          "estimatedPower",
          "estimatedPowerAscOrder",
          "skillEffect",
          "eventGimmickTotalPower",
          "eventGimmickTotalAscOrder",
        ] as const
      ).forEach((prop) => {
        if (from.hasOwnProperty(prop)) destination[prop] = from[prop];
      });
    });
  });

  // mainSkills
  (["attack", "defense"] as const).forEach((attackOrDefense) => {
    const data = intermediateResults["mainSkills"]?.[attackOrDefense] ?? {};
    const skillsKeys = Object.keys(data);
    skillsKeys.forEach((key) => {
      const from = data[Number(key)];
      summary.summaries.mainSkills[attackOrDefense][Number(key)] = {};
      const destination =
        summary.summaries.mainSkills[attackOrDefense][Number(key)];
      (
        [
          "estimatedPower",
          "estimatedEffect",
          "estimatedRate",
          "skillEffect",
        ] as const
      ).forEach((prop) => {
        if (from.hasOwnProperty(prop)) destination[prop] = from[prop];
      });
    });
  });

  // subScenes
  (["attack", "defense"] as const).forEach((attackOrDefense) => {
    const data = intermediateResults["subScenes"]?.[attackOrDefense] ?? {};
    const scenesKeys = Object.keys(data).filter(
      (key) => key !== "basePowerArray"
    );
    scenesKeys.forEach((key) => {
      const from = data[Number(key)];
      summary.summaries.subScenes[attackOrDefense][Number(key)] = {};
      const destination =
        summary.summaries.subScenes[attackOrDefense][Number(key)];
      (
        [
          "estimatedPower",
          "estimatedPowerAscOrder",
          "skillEffect",
          "eventGimmickTotalPower",
          "eventGimmickTotalAscOrder",
        ] as const
      ).forEach((prop) => {
        if (from.hasOwnProperty(prop)) destination[prop] = from[prop];
      });
    });
  });

  // subSwitches
  (["attack", "defense"] as const).forEach((attackOrDefense) => {
    const data = intermediateResults["subSwitches"]?.[attackOrDefense] ?? {};
    const skillsKeys = Object.keys(data);
    skillsKeys.forEach((key) => {
      const from = data[Number(key)];
      summary.summaries.subSwitches[attackOrDefense][Number(key)] = {};
      const destination =
        summary.summaries.subSwitches[attackOrDefense][Number(key)];
      (
        [
          "estimatedPower",
          "estimatedEffect",
          "estimatedRate",
          "skillEffect",
        ] as const
      ).forEach((prop) => {
        if (from.hasOwnProperty(prop)) destination[prop] = from[prop];
      });
    });
  });

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
};
