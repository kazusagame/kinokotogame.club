import {
  DeckSimulatorData,
  DeckSimulatorCommonData,
} from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { IntermediateResults } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorIntermediateResults";

import { calcEventSpecialRaidwar } from "@/components/decksim/simulator/calculator/eventSpecial/raidwar";
import { calcEventSpecialClubcup } from "@/components/decksim/simulator/calculator/eventSpecial/clubcup";

export const calcEventSpecialPerformance = ({
  inputData,
  commonData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  commonData: DeckSimulatorCommonData;
  intermediateResults: IntermediateResults;
}) => {
  const eventId = inputData.dataType;

  if (eventId === "raidwar") {
    calcEventSpecialRaidwar({ inputData, commonData, intermediateResults });
  } else if (eventId === "clubcup") {
    calcEventSpecialClubcup({ inputData, commonData, intermediateResults });
  }
};
