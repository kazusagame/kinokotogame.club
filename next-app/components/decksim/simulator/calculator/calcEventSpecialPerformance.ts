import {
  DeckSimulatorData,
  DeckSimulatorCommonData,
} from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { IntermediateResults } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorIntermediateResults";

import { calcEventSpecialRaidwar } from "@/components/decksim/simulator/calculator/eventSpecial/raidwar";
import { calcEventSpecialClubcup } from "@/components/decksim/simulator/calculator/eventSpecial/clubcup";
import { calcEventSpecialNormalBattle } from "@/components/decksim/simulator/calculator/eventSpecial/normal-battle";
import { calcEventSpecialChampionship } from "@/components/decksim/simulator/calculator/eventSpecial/championship";

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
  } else if (eventId === "championship") {
    calcEventSpecialChampionship({ inputData, intermediateResults });
  } else if (eventId === "normal-battle") {
    calcEventSpecialNormalBattle({ inputData, intermediateResults });
  }
};
