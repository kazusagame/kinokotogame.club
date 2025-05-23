export interface IntermediateResults {
  totalPerformance?: {
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
  mainScenes?: {
    attack?: {
      [K: number]: {
        estimatedPower?: number;
        estimatedPowerAscOrder?: number;
        skillEffect?: number;
        eventGimmickTotalPower?: number;
        eventGimmickTotalAscOrder?: number;
        preciousSceneEffect?: {
          [K: number]: number;
          total?: number;
        };
      };
    };
    defense?: {
      [K: number]: {
        estimatedPower?: number;
        estimatedPowerAscOrder?: number;
        skillEffect?: number;
        eventGimmickTotalPower?: number;
        eventGimmickTotalAscOrder?: number;
        preciousSceneEffect?: {
          [K: number]: number;
          total?: number;
        };
      };
    };
  };
  mainSkills?: {
    attack?: {
      [K: number]: {
        estimatedPower?: number;
        estimatedRate?: number;
        skillEffect?: number;
      };
    };
    defense?: {
      [K: number]: {
        estimatedPower?: number;
        estimatedRate?: number;
        skillEffect?: number;
      };
    };
  };
  subScenes?: {
    attack?: {
      [K: number]: {
        estimatedPower?: number;
        estimatedPowerAscOrder?: number;
        skillEffect?: number;
        eventGimmickTotalPower?: number;
        eventGimmickTotalAscOrder?: number;
        preciousSceneEffect?: {
          [K: number]: number;
          total?: number;
        };
      };
    };
    defense?: {
      [K: number]: {
        estimatedPower?: number;
        estimatedPowerAscOrder?: number;
        skillEffect?: number;
        eventGimmickTotalPower?: number;
        eventGimmickTotalAscOrder?: number;
        preciousSceneEffect?: {
          [K: number]: number;
          total?: number;
        };
      };
    };
  };
  subSwitches?: {
    attack?: {
      [K: number]: {
        estimatedPower?: number;
        estimatedRate?: number;
        skillEffect?: number;
      };
    };
    defense?: {
      [K: number]: {
        estimatedPower?: number;
        estimatedRate?: number;
        skillEffect?: number;
      };
    };
  };
  preciousScenes?: {
    attack?: {
      [K: number]: SelectPreciousSceneParameters;
      limitBreakCount?: {
        main: number;
        sub: number;
      };
    };
    defense?: {
      [K: number]: SelectPreciousSceneParameters;
      limitBreakCount?: {
        main: number;
        sub: number;
      };
    };
  };
  deckBonus?: effectType;
  petitGirls?: {
    effects?: {
      [K in
        | "type"
        | "bestFriend"
        | "date"
        | "touch"
        | "birthday"
        | "clubItem"]: targetType;
    };
  };
}

export interface SelectPreciousSceneParameters {
  estimatedPower?: number;
  estimatedCount?: number;
  effectCondition:
    | "コストが高いほど"
    | "レアリティが高いほど"
    | "声援Lvが高いほど"
    | "Ex進展ガールが多いほど"
    | "特定のガールで編成するほど"
    | "様々なガールで編成するほど"
    | "---";
  conditionThreshold?: number | string;
  additionalCondition?: "たすけて！マイヒーロー限定";
  effectTarget: "全タイプ" | "SWEETタイプ" | "COOLタイプ" | "POPタイプ";
  effectType: "攻援UP" | "守援UP" | "攻守UP";
  effectRange: "主＋副" | "主のみ" | "副のみ";
  valueFormat: "割合(%)" | "固定値";
  value: number;
  factor: number;
  headcount?: number | string;
}

interface targetType {
  all?: effectType;
  sweet?: effectType;
  cool?: effectType;
  pop?: effectType;
}
interface effectType {
  attack?: number;
  defense?: number;
  both?: number;
}
