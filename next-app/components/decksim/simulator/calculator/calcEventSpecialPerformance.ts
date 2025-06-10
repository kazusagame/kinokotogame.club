import {
  DeckSimulatorData,
  DeckSimulatorCommonData,
} from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { IntermediateResults } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorIntermediateResults";

import { calcEventSpecialRaidFirst } from "@/components/decksim/simulator/calculator/eventSpecial/raid-first";
import { calcEventSpecialRaidSecond } from "@/components/decksim/simulator/calculator/eventSpecial/raid-second";
import { calcEventSpecialRaidMega } from "@/components/decksim/simulator/calculator/eventSpecial/raid-mega";
import { calcEventSpecialRaidwar } from "@/components/decksim/simulator/calculator/eventSpecial/raidwar";
import { calcEventSpecialClubcup } from "@/components/decksim/simulator/calculator/eventSpecial/clubcup";
import { calcEventSpecialNormalBattle } from "@/components/decksim/simulator/calculator/eventSpecial/normal-battle";
import { calcEventSpecialChampionship } from "@/components/decksim/simulator/calculator/eventSpecial/championship";
import { calcEventSpecialDivrace } from "@/components/decksim/simulator/calculator/eventSpecial/divrace";
import { calcEventSpecialBoard } from "@/components/decksim/simulator/calculator/eventSpecial/board";

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

  if (eventId === "raid-first") {
    calcEventSpecialRaidFirst({ inputData, commonData, intermediateResults });
  } else if (eventId === "raid-second") {
    calcEventSpecialRaidSecond({ inputData, commonData, intermediateResults });
  } else if (eventId === "raid-mega") {
    calcEventSpecialRaidMega({ inputData, commonData, intermediateResults });
  } else if (eventId === "raidwar") {
    calcEventSpecialRaidwar({ inputData, commonData, intermediateResults });
  } else if (eventId === "clubcup") {
    calcEventSpecialClubcup({ inputData, commonData, intermediateResults });
  } else if (eventId === "championship") {
    calcEventSpecialChampionship({ inputData, intermediateResults });
  } else if (eventId === "divrace") {
    calcEventSpecialDivrace({ inputData, intermediateResults });
  } else if (eventId === "board") {
    calcEventSpecialBoard({ inputData, intermediateResults });
  } else if (eventId === "normal-battle") {
    calcEventSpecialNormalBattle({ inputData, intermediateResults });
  }
};
