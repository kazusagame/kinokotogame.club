import { DeckSimulatorEventId } from "@/components/decksim/data/eventData";

export interface DeckSimulatorResult {
  dataType: DeckSimulatorEventId;
  initCondition: boolean;
  summaries: DeckSimulatorSummaries;
}

export interface DeckSimulatorSummaries {
  totalPerformance: {
    attack: {
      minPower?: number;
      expPower?: number;
      maxPower?: number;
      skillEffect?: number;
    };
    defense: {
      minPower?: number;
      expPower?: number;
      maxPower?: number;
      skillEffect?: number;
    };
    isConvertPoint?: boolean;
  };
  mainScenes: {
    attack: {
      [K: number]: SceneEstimatedParameters;
    };
    defense: {
      [K: number]: SceneEstimatedParameters;
    };
  };
  mainSkills: {
    attack: {
      [K: number]: SkillEstimatedParameters;
    };
    defense: {
      [K: number]: SkillEstimatedParameters;
    };
  };
  subScenes: {
    attack: {
      [K: number]: SceneEstimatedParameters;
    };
    defense: {
      [K: number]: SceneEstimatedParameters;
    };
  };
  subSwitches: {
    attack: {
      [K: number]: SkillEstimatedParameters;
    };
    defense: {
      [K: number]: SkillEstimatedParameters;
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
  divraceSpecial?: {
    itemEffect?: {
      [K: number]: {
        baseStage: number;
        challengeStage: number;
        descOrder: number;
      },
    }
  }
  boardSpecial?: {
    weatherEffect?: {
      [K: number]: number;
    };
    spaceEffect?: {
      [K: number]: number;
    };
    totalEffect?: {
      minPower: number;
      expPower: number;
      maxPower: number;
    };
  };
}

interface SceneEstimatedParameters {
  estimatedPower?: number;
  estimatedPowerAscOrder?: number;
  skillEffect?: number;
  eventGimmickTotalPower?: number;
  eventGimmickTotalAscOrder?: number;
}

interface SkillEstimatedParameters {
  estimatedPower?: number;
  estimatedEffect?: number;
  estimatedRate?: number;
  skillEffect?: number;
  eventGimmickTotalPower?: number;
}
