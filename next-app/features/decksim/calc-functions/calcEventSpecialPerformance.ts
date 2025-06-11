import {
  DeckSimulatorData,
  DeckSimulatorCommonData,
} from "@/features/decksim/type-definitions/DeckSimulatorData";
import { IntermediateResults } from "@/features/decksim/type-definitions/DeckSimulatorIntermediateResults";

import { calcEventSpecialRaidFirst } from "@/features/decksim/calc-functions/eventSpecial/raid-first";
import { calcEventSpecialRaidSecond } from "@/features/decksim/calc-functions/eventSpecial/raid-second";
import { calcEventSpecialRaidMega } from "@/features/decksim/calc-functions/eventSpecial/raid-mega";
import { calcEventSpecialRaidwar } from "@/features/decksim/calc-functions/eventSpecial/raidwar";
import { calcEventSpecialClubcup } from "@/features/decksim/calc-functions/eventSpecial/clubcup";
import { calcEventSpecialNormalBattle } from "@/features/decksim/calc-functions/eventSpecial/normal-battle";
import { calcEventSpecialChampionship } from "@/features/decksim/calc-functions/eventSpecial/championship";
import { calcEventSpecialDivrace } from "@/features/decksim/calc-functions/eventSpecial/divrace";
import { calcEventSpecialBoard } from "@/features/decksim/calc-functions/eventSpecial/board";

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
