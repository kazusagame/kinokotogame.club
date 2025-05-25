import { DeckSimulatorEventId } from "@/components/decksim/data/eventData";

export interface DeckSimulatorResult {
  dataType: DeckSimulatorEventId;
  initCondition: boolean;
  summaries: {
    totalPerformance: {
      attack?: {
        minPower?: number;
        expPower?: number;
        maxPower?: number;
        skillEffect?: number;
      };
      defense?: {
        minPower?: number;
        expPower?: number;
        maxPower?: number;
        skillEffect?: number;
      };
      isConvertPoint?: boolean;
    };
    mainScenes: {
      attack: {
        [K: number]: {
          estimatedPower?: number;
          estimatedPowerAscOrder?: number;
          skillEffect?: number;
          eventGimmickTotalPower?: number;
          eventGimmickTotalAscOrder?: number;
        };
      };
      defense: {
        [K: number]: {
          estimatedPower?: number;
          estimatedPowerAscOrder?: number;
          skillEffect?: number;
          eventGimmickTotalPower?: number;
          eventGimmickTotalAscOrder?: number;
        };
      };
    };
    mainSkills: {
      attack: {
        [K: number]: {
          estimatedPower?: number;
          estimatedEffect?: number;
          estimatedRate?: number;
          skillEffect?: number;
        };
      };
      defense: {
        [K: number]: {
          estimatedPower?: number;
          estimatedEffect?: number;
          estimatedRate?: number;
          skillEffect?: number;
        };
      };
    };
    subScenes: {
      attack: {
        [K: number]: {
          estimatedPower?: number;
          estimatedPowerAscOrder?: number;
          skillEffect?: number;
          eventGimmickTotalPower?: number;
          eventGimmickTotalAscOrder?: number;
        };
      };
      defense: {
        [K: number]: {
          estimatedPower?: number;
          estimatedPowerAscOrder?: number;
          skillEffect?: number;
          eventGimmickTotalPower?: number;
          eventGimmickTotalAscOrder?: number;
        };
      };
    };
    subSwitches: {
      attack: {
        [K: number]: {
          estimatedPower?: number;
          estimatedEffect?: number;
          estimatedRate?: number;
          skillEffect?: number;
        };
      };
      defense: {
        [K: number]: {
          estimatedPower?: number;
          estimatedEffect?: number;
          estimatedRate?: number;
          skillEffect?: number;
        };
      };
    };
    preciousScenes: {
      attack: {
        [K: number]: {
          estimatedPower?: number;
          estimatedCount?: number;
        };
      };
      defense: {
        [K: number]: {
          estimatedPower?: number;
          estimatedCount?: number;
        };
      };
    };
  };
}
