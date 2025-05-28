import { DeckSimulatorSummaries } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorResult";

// DeckSimulatorSummaries からの追加分を定義
export type IntermediateResults = DeckSimulatorSummaries & {
  mainScenes: {
    attack: {
      [K: number]: {
        preciousSceneEffect?: {
          [K: number]: number;
          total?: number;
        };
        effectMatrix?: EffectMatrix;
      };
      basePowerArray?: BasePowerArray;
    };
    defense: {
      [K: number]: {
        preciousSceneEffect?: {
          [K: number]: number;
          total?: number;
        };
        effectMatrix?: EffectMatrix;
      };
      basePowerArray?: BasePowerArray;
    };
  };
  subScenes: {
    attack: {
      [K: number]: {
        preciousSceneEffect?: {
          [K: number]: number;
          total?: number;
        };
        effectMatrix?: EffectMatrix;
      };
      basePowerArray?: BasePowerArray;
    };
    defense: {
      [K: number]: {
        preciousSceneEffect?: {
          [K: number]: number;
          total?: number;
        };
        effectMatrix?: EffectMatrix;
      };
      basePowerArray?: BasePowerArray;
    };
  };
  preciousScenes: {
    attack: {
      [K: number]: SelectPreciousSceneParameters;
      limitBreakCount?: {
        main: number;
        sub: number;
      };
    };
    defense: {
      [K: number]: SelectPreciousSceneParameters;
      limitBreakCount?: {
        main: number;
        sub: number;
      };
    };
  };
  deckBonus: EffectType;
  petitGirls: {
    effects?: {
      [K in
        | "type"
        | "bestFriend"
        | "date"
        | "touch"
        | "birthday"
        | "clubItem"]: TargetType;
    };
  };
};

export interface PowerDict {
    scenePower: number;
    strapEffect: number;
    preciousEffect: number;
}

export interface BasePowerArray {
  全タイプ: PowerDict[];
  SWEETタイプ: PowerDict[];
  COOLタイプ: PowerDict[];
  POPタイプ: PowerDict[];
}

export interface EffectMatrix {
  base: PowerDict,
  typeMatch: PowerDict,
  clubMatch: PowerDict,
  clubItem: PowerDict,
  clubPosition: PowerDict,
  deck: PowerDict,
  date: PowerDict,
  touch: PowerDict,
  birthday: PowerDict,
  mensCologne: PowerDict,
  petitEffects: PowerDict,
  limitBreak: PowerDict,
}

export type SelectPreciousSceneParameters =
  DeckSimulatorSummaries["preciousScenes"]["attack" | "defense"][number] & {
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
  };

export interface TargetType {
  all?: EffectType;
  sweet?: EffectType;
  cool?: EffectType;
  pop?: EffectType;
}
interface EffectType {
  attack?: number;
  defense?: number;
  both?: number;
}
