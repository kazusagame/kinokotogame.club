import { DeckSimulatorEventId } from "@/components/decksim/data/eventData";

export interface SceneParameters {
  basePower: string;
  strap?: string;
  type: "SWEETタイプ" | "COOLタイプ" | "POPタイプ";
  rarity: "Luv" | "UR" | "SSR" | "SR";
  cost: string;
  skillLv: string;
  grade: "1年生" | "2年生" | "3年生" | "その他";
  isClubMatch: boolean;
  isDate: boolean;
  isTouch: boolean;
  isBirthday: boolean;
  isLimitBreak: boolean;
  isBestFriend: boolean;
  isSpecial: boolean;
}

export interface SkillParameters {
  skillLv: string;
  target: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "全タイプ";
  range: "主＋副" | "主のみ" | "副のみ";
  subRange: string;
  type: "攻援" | "守援" | "攻守";
  strength:
    | "中"
    | "中+"
    | "中++"
    | "大"
    | "特大"
    | "特大+"
    | "特大++"
    | "スーパー特大"
    | "スーパー特大+"
    | "スーパー特大++"
    | "超スーパー特大";
}

export interface DeckSimulatorData {
  dataType: DeckSimulatorEventId;
  mainScenes: {
    attack: {
      [K: number]: SceneParameters;
    };
    defense?: {
      [K: number]: SceneParameters;
    };
  };
  mainSkills: {
    attack: {
      [K: number]: SkillParameters;
    };
    defense?: {
      [K: number]: SkillParameters;
    };
  };
  subScenes: {
    attack: {
      [K: number]: SceneParameters;
    };
    defense?: {
      [K: number]: SceneParameters;
    };
  };
  subSwitches: {
    attack: {
      [K: number]: SkillParameters;
    };
    defense?: {
      [K: number]: SkillParameters;
    };
  };
  preciousScenes: {
    attack: {
      [K: number]: {
        id: string;
        rarity: string;
        headcount?: number | string;
      };
    };
    defense?: {
      [K: number]: {
        id: string;
        rarity: string;
        headcount?: number | string;
      };
    };
  };
  petitGirls: {
    totalPower: {
      attack: number | string;
      defense: number | string;
    };
    effects: {
      [K: number]: {
        [K: number]: {
          id?: string;
        };
        isRarityUr?: boolean;
      };
    };
    details: {
      [K: number]: {
        [K: number]: {
          attack?: number | string;
          defense?: number | string;
          type?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ";
          skillTarget?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "全タイプ";
          SkillValue?: number | string;
        };
      };
    };
  };
  deckBonus: {
    normal: {
      [K: number]: {
        level?: string;
        type?: "攻援" | "守援" | "攻守";
      };
    };
    shine: {
      level: string;
      type: "攻守";
    };
    precious: {
      level: string;
      type: "攻守";
    };
    preciousPlus: {
      level: string;
      type: "攻守";
    };
  };
  eventSpecial: {
    "raid-first"?: {
      enemyType?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "通常タイプ";
      attackType?: "元気炭酸アメ" | "元気炭酸" | "勇気炭酸";
      comboNum?: "0" | "1" | "5" | "10" | "50" | "100";
      specialGirlsEffect?: number | string;
      isConvertPoint?: boolean;
      isAssistMembers?: boolean;
    };
    "raid-second"?: {
      enemyType?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "通常タイプ";
      attackType?: "元気炭酸アメ" | "元気炭酸" | "勇気炭酸";
      comboNum?: "0" | "1" | "5" | "10" | "50" | "100";
      specialGirlsEffect?: number | string;
      isConvertPoint?: boolean;
      isAssistMembers?: boolean;
    };
    "raid-mega"?: {
      enemyType?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ";
      attackType?: "元気炭酸アメ" | "元気炭酸" | "勇気炭酸";
      specialGirlsEffect?: number | string;
      isConvertPoint?: boolean;
      attackUpBuff?: number | string;
      defenseDownDeBuff?: number | string;
    };
    raidwar?: {
      enemyType?: "夜行性激レア" | "超レアLv50" | "超レアLv59" | "超レアLv64";
      attackType?: "元気炭酸アメ" | "元気炭酸" | "本気炭酸";
      attackNum?: number | string;
      comboNum?:
        | "0"
        | "6"
        | "12"
        | "18"
        | "24"
        | "30"
        | "36"
        | "42"
        | "48"
        | "50";
      specialGirlsEffect?: number | string;
      isConvertPoint?: boolean;
      attackUpBuff?: number | string;
      totalSkillDamage?: number | string;
    };
    clubcup?: {
      attackUpBonus?: number | string;
      isWinBonus?: boolean;
      isConvertPoint?: boolean;
      pointUpBonus?: number | string;
      attackType?: "全力勧誘" | "全力勧誘×3";
      specialGirlsEffectPercent?: number | string;
      specialGirlsEffectFix?: number | string;
      isRivalLeader?: boolean;
      rivalSkillEffectDown?: number | string;
    };
    championship?: {
      appealType?: "アピール対決" | "アピールタイム" | "レアアピールタイム";
      heartNum?: number | string;
      isTensionMax?: boolean;
      TurnNum?: number | string;
      specialGirlsEffect?: number | string;
      isConvertPoint?: boolean;
    };
    "championship-defense"?: Record<string, never>;
    tower?: Record<string, never>;
    divrace?: {
      specialGirlsEffect?: number | string;
      stage?: "ベースステージ" | "チャレンジステージ";
      item?: {
        [K: number]: {
          isValid?: boolean;
        };
      };
    };
    board?: {
      specialGirlsEffect?: number | string;
      weatherNum?: number | string;
      spaceEffects?: {
        [K: number]: {
          value: number | string;
        };
      };
    };
    "normal-battle"?: {
      isWinBonus?: boolean;
    };
  };
}

export interface DeckSimulatorCommonData {
  playerData: {
    playerType: "SWEETタイプ" | "COOLタイプ" | "POPタイプ";
    clubPosition:
      | "leader"
      | "subLeader"
      | "attackCaptain"
      | "defenseCaptain"
      | "member";
    maxAttackCost: number | string;
    mensCologne: {
      sweet: {
        level: number | string;
      };
      cool: {
        level: number | string;
      };
      pop: {
        level: number | string;
      };
    };
    clubItem: {
      sweet: {
        isValid: boolean;
      };
      cool: {
        isValid: boolean;
      };
      pop: {
        isValid: boolean;
      };
    };
  };
}
