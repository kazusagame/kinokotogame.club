import { EventType } from "./eventData";

export interface BonusList {
  base: number;
  typeMatch: number;
  clubMatch: number;
  clubItem: number;
  clubPosition: number;
  deck: number;
  date: number;
  touch: number;
  birthday: number;
  mensCologne: number;
  petitEffects: number;
  limitBreak: number;
  skill: number;
}

export interface HeartRate {
  [K: string]: number
}
export interface HeartRateChampionship {
  [K: string]: {[K: number]: number }
}
export type RaidTypeAdvantageSuperRareBonusMap = {
  [K in "normal" | "sweet" | "cool" | "pop"]:
    { [K in "sweet" | "cool" | "pop"]: number };
}
export interface RaidComboMap {
  [K: number]: number
}
export type RaidTypeAdvantageMegaBonusMap = {
  [K in "normal" | "sweet" | "cool" | "pop"]:
    { [K in "sweet" | "cool" | "pop"]:
      { [K in "scenes" | "strap" | "precious"]: number } };
}
export interface RaidwarComboMap {
  [K: number]: number,
}
export type ClubcupSkillEffectMap = {
  [K in "luv" | "ur" | "ssr" | "sr"]: { [K: string]: number };
};
export type TowerSpecialGirls = {
  [K in "luv" | "ur" | "ssr" | "sr"]: { [K: string]: number };
}

export interface EventUniqueBonus {
  formulaVariable?: string;
  formulaDisplayName?: string;
  formulaDisplayValue?: string;
  mainScenes?: number;
  mainStrap?: number;
  mainPrecious?: number;
  subScenes?: number;
  subPrecious?: number;
  petitGirls?: number;
  value?:
    | HeartRate
    | HeartRateChampionship
    | RaidTypeAdvantageSuperRareBonusMap
    | RaidComboMap
    | RaidTypeAdvantageMegaBonusMap
    | RaidwarComboMap
    | ClubcupSkillEffectMap
    | TowerSpecialGirls;
}

export interface BonusDataPerEvent {
  mainScenes: BonusList;
  mainStrap: BonusList;
  mainPrecious: BonusList;
  subScenes: BonusList;
  subPrecious: BonusList;
  petitGirls: BonusList;
  eventUniqueBonus?: { [K: string]: EventUniqueBonus };
  annotations?: string[];
}

export const BONUS_DATA_COMMON = {
  typeMatch: { attack: 5, defense: 5 },
  clubMatch: { attack: 10, defense: 10 },
  clubItem: { attack: 2, defense: 2 },
  clubPosition: {
    attack: { leader: 2, subLeader: 2, attackCaptain: 5, defenseCaptain: 0, member: 0 },
    defense: { leader: 2, subLeader: 2, attackCaptain: 0, defenseCaptain: 5, member: 0 }
  },
  deck: {
    normal: {
      attack: { lv0: 0, lv1: 3, lv2: 8, lv3: 13, lv4: 18, lv5: 23, lv6: 28, lv7: 33, lv8: 38 },
      defense: { lv0: 0, lv1: 3, lv2: 8, lv3: 13, lv4: 18, lv5: 23, lv6: 28, lv7: 33, lv8: 38 },
      both: { lv0: 0, lv1: 3, lv2: 8, lv3: 13, lv4: 18, lv5: 23, lv6: 28, lv7: 33, lv8: 38 }
    },
    shine: {
      both: { lv0: 0, lv1: 3, lv2: 5, lv3: 7, lv4: 9, lv5: 11 }
    },
    precious: {
      both: { lv0: 0, lv1: 5, lv2: 10, lv3: 15 }
    },
    preciousPlus: {
      both: { lv0: 0, lv1: 7, lv2: 14, lv3: 21 }
    }
  },
  date: {
    attack: { luv: 100, ur: 100, ssr: 80, sr: 70 },
    defense: { luv: 100, ur: 100, ssr: 80, sr: 70 }
  },
  touch: { attack: 20, defense: 20 },
  birthday: { attack: 20, defense: 20 },
  limitBreak: { attack: 3, defense: 3, probability: 20 },
} as const;

export const BONUS_DATA_PER_EVENT: { [K in EventType]: BonusDataPerEvent } = {
  raidFirst: {
    mainScenes: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainStrap: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainPrecious: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 100, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    subScenes: {
      base: 50, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 50, touch: 0, birthday: 50, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 80
    },
    subPrecious: {
      base: 50, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 50, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 80
    },
    petitGirls: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, mensCologne: 0,
      petitEffects: 0, limitBreak: 0, skill: 0
    },
    eventUniqueBonus: {
      typeAdvantage: {
        formulaVariable: "C",
        formulaDisplayName: "有利/不利タイプ補正",
        formulaDisplayValue: "(30 % / 0 % / -30 %)",
        mainScenes: 100,
        mainStrap: 100,
        mainPrecious: 100,
        subScenes: 100,
        subPrecious: 100,
        petitGirls: 0,
        value: {
          normal: { sweet: 0, cool: 0, pop: 0 },
          sweet: { sweet: 0, cool: -30, pop: 30 },
          cool: { sweet: 30, cool: 0, pop: -30 },
          pop: { sweet: -30, cool: 30, pop: 0 }
        },
      },
      combo: {
        value: {
          0: 0, 1: 10, 5: 20, 10: 40, 50: 80, 100: 100,
        }
      },
    },
    annotations: ["センバツボーナスはこのイベントでは 無効 (0 %) なので無視してOKです。"],
  },
  raidSecond: {
    mainScenes: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainStrap: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainPrecious: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 100, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    subScenes: {
      base: 50, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 50, touch: 0, birthday: 50, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 80
    },
    subPrecious: {
      base: 50, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 50, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 80
    },
    petitGirls: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, mensCologne: 0,
      petitEffects: 0, limitBreak: 0, skill: 0
    },
    eventUniqueBonus: {
      typeAdvantage: {
        formulaVariable: "C",
        formulaDisplayName: "有利/不利タイプ補正",
        formulaDisplayValue: "(30 % / 0 % / -30 %)",
        mainScenes: 100,
        mainStrap: 100,
        mainPrecious: 100,
        subScenes: 100,
        subPrecious: 100,
        petitGirls: 0,
        value: {
          normal: { pop: 0, sweet: 0, cool: 0 },
          sweet: { pop: 30, sweet: 0, cool: -30 },
          cool: { pop: -30, sweet: 30, cool: 0 },
          pop: { pop: 0, sweet: -30, cool: 30 }
        }
      },
      combo: {
        value: {
          0: 0, 1: 10, 5: 20, 10: 40, 50: 80, 100: 100,
        },
      },
      heartRate: {
        value: {
          candy: 1, normalItem: 6, specialItem: 12,
        },
      },
    },
    annotations: ["センバツボーナスはこのイベントでは 無効 (0 %) なので無視してOKです。"],
  },
  raidMega: {
    mainScenes: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainStrap: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainPrecious: {
      base: 200, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 200, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    subScenes: {
      base: 0, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, mensCologne: 0,
      petitEffects: 0, limitBreak: 0, skill: 0
    },
    subPrecious: {
      base: 0, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, mensCologne: 0,
      petitEffects: 0, limitBreak: 0, skill: 0
    },
    petitGirls: {
      base: 25, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, mensCologne: 0,
      petitEffects: 0, limitBreak: 0, skill: 0
    },
    eventUniqueBonus: {
      typeAdvantage: {
        formulaVariable: "C",
        formulaDisplayName: "有利/不利タイプ補正",
        formulaDisplayValue: "(20 % / 0 % / -20 % (※))",
        mainScenes: 100,
        mainStrap: 100,
        mainPrecious: 100,
        subScenes: 0,
        subPrecious: 0,
        petitGirls: 0,
        value: {
          normal: {
            pop: { scenes: 0, strap: 0, precious: 0 },
            sweet: { scenes: 0, strap: 0, precious: 0 },
            cool: { scenes: 0, strap: 0, precious: 0 }
          },
          sweet: {
            pop: { scenes: 20, strap: 20, precious: 30 },
            sweet: { scenes: 0, strap: 0, precious: 0 },
            cool: { scenes: -20, strap: -20, precious: -30 }
          },
          cool: {
            pop: { scenes: -20, strap: -20, precious: -30 },
            sweet: { scenes: 20, strap: 20, precious: 30 },
            cool: { scenes: 0, strap: 0, precious: 0 }
          },
          pop: {
            pop: { scenes: 0, strap: 0, precious: 0 },
            sweet: { scenes: -20, strap: -20, precious: -30 },
            cool: { scenes: 20, strap: 20, precious: 30 }
          },
        },
      },
      attackUpBuff: {
        formulaVariable: "D",
        formulaDisplayName: "ヒーロー声援　攻援力UP",
        formulaDisplayValue: "(~ 100 %)",
        mainScenes: 100,
        mainStrap: 100,
        mainPrecious: 0,
        subScenes: 0,
        subPrecious: 0,
        petitGirls: 0,
      },
      defenseDownDeBuff: {
        formulaVariable: "E",
        formulaDisplayName: "ヒーロー声援　守備力DOWN",
        formulaDisplayValue: "(~ 50 %)",
        mainScenes: 100,
        mainStrap: 100,
        mainPrecious: 100,
        subScenes: 0,
        subPrecious: 0,
        petitGirls: 100,
      },
      heartRate: {
        value: {
          candy: 1, normalItem: 6, specialItem: 12,
        },
      },
    },
    annotations: ["有利/不利タイプ補正について、プレシャスシーンの場合は 30 % / 0 % / -30 % を適用し、かつ基礎とデートボーナス分には適用しない。"],
  },
  raidwar: {
    mainScenes: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainStrap: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainPrecious: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 100, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    subScenes: {
      base: 80, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 80, touch: 80, birthday: 80, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 80
    },
    subPrecious: {
      base: 80, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 0, date: 80, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 80
    },
    petitGirls: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, mensCologne: 0,
      petitEffects: 0, limitBreak: 0, skill: 0
    },
    eventUniqueBonus: {
      combo: {
        value: {
          0: 0, 6: 30, 12: 60, 18: 90, 24: 120, 30: 140,
          36: 158, 42: 176, 48: 194, 50: 200
        },
      },
      heartRate: {
        value: {
          candy: 1, normalItem: 6, specialItem: 12,
        },
      },
    },
    annotations: ["センバツボーナスはこのイベントでは 無効 (0 %) なので無視してOKです。"],
  },
  clubcup: {
    mainScenes: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 100, date: 100, touch: 100, birthday: 100, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainStrap: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 100, date: 100, touch: 100, birthday: 100, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 0
    },
    mainPrecious: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 100, date: 100, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 0
    },
    subScenes: {
      base: 80, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 100, date: 80, touch: 0, birthday: 80, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 80
    },
    subPrecious: {
      base: 80, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 100, date: 80, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 0
    },
    petitGirls: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, mensCologne: 0,
      petitEffects: 0, limitBreak: 0, skill: 0
    },
    eventUniqueBonus: {
      attackUpBonus: {
        formulaVariable: "C",
        formulaDisplayName: "攻援力UPボーナス",
        formulaDisplayValue: "(~ 50 %)",
        mainScenes: 100,
        mainStrap: 100,
        mainPrecious: 100,
        subScenes: 100,
        subPrecious: 100,
        petitGirls: 0,
      },
      skillEffect: {
        value: {
          luv: {
            lv1: 0.0, lv2: 0.0, lv3: 0.0, lv4: 0.0, lv5: 1.0,
            lv6: 1.0, lv7: 1.0, lv8: 1.0, lv9: 1.0, lv10: 2.0,
            lv11: 3.0, lv12: 4.0, lv13: 5.0, lv14: 7.0, lv15: 9.0,
            lv16: 11.0, lv17: 13.0, lv18: 15.0
          },
          ur: {
            lv1: 0.0, lv2: 0.0, lv3: 0.0, lv4: 0.0, lv5: 1.0,
            lv6: 1.0, lv7: 1.0, lv8: 1.0, lv9: 1.0, lv10: 2.0,
            lv11: 3.0, lv12: 4.0, lv13: 5.0, lv14: 7.0, lv15: 9.0,
            lv16: 11.0, lv17: 13.0, lv18: 15.0
          },
          ssr: {
            lv1: 0.0, lv2: 0.0, lv3: 0.0, lv4: 0.0, lv5: 0.5,
            lv6: 0.5, lv7: 0.5, lv8: 0.5, lv9: 0.5, lv10: 1.0,
            lv11: 1.5, lv12: 2.0, lv13: 2.5, lv14: 3.5, lv15: 4.5,
            lv16: 5.5, lv17: 6.5, lv18: 7.5
          },
          sr: {
            lv1: 0.0, lv2: 0.0, lv3: 0.0, lv4: 0.0, lv5: 0.3,
            lv6: 0.3, lv7: 0.3, lv8: 0.3, lv9: 0.3, lv10: 0.6,
            lv11: 0.6, lv12: 0.6, lv13: 0.6, lv14: 0.6, lv15: 0.6,
            lv16: 0.6, lv17: 0.6, lv18: 0.6
          },
        }
      }
    },
    annotations: ["攻援力UPボーナス (C) は基礎 (A)とセンバツボーナスにだけ掛かる。"],
  },
  championship: {
    mainScenes: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 100, date: 100, touch: 100, birthday: 100, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainStrap: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 100, date: 100, touch: 100, birthday: 100, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainPrecious: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 100, date: 100, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    subScenes: {
      base: 80, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 80, date: 80, touch: 80, birthday: 80, mensCologne: 80,
      petitEffects: 80, limitBreak: 80, skill: 80
    },
    subPrecious: {
      base: 80, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 80, date: 80, touch: 0, birthday: 0, mensCologne: 80,
      petitEffects: 80, limitBreak: 80, skill: 80
    },
    petitGirls: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, mensCologne: 0,
      petitEffects: 0, limitBreak: 0, skill: 0
    },
    eventUniqueBonus: {
      heartRate: {
        value: {
          appealBattle: {
            1: 1.0, 2: 1.5, 3: 2.0, 4: 2.5, 5: 3.5
          },
          appealTimeNormal: {
            1: 1.0, 2: 2.2, 3: 3.5, 4: 4.8, 5: 6.5
          },
          appealTimeRare: {
            1: 1.0, 2: 2.2, 3: 3.5, 4: 4.8, 5: 6.5
          }
        },
      },
    },
  },
  tower: {
    mainScenes: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 100, clubPosition: 0,
      deck: 100, date: 100, touch: 100, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainStrap: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 100, clubPosition: 0,
      deck: 100, date: 100, touch: 100, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainPrecious: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 100, clubPosition: 0,
      deck: 100, date: 100, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    subScenes: {
      base: 50, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 50, date: 50, touch: 0, birthday: 0, mensCologne: 50,
      petitEffects: 50, limitBreak: 100, skill: 80
    },
    subPrecious: {
      base: 50, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 50, date: 50, touch: 0, birthday: 0, mensCologne: 50,
      petitEffects: 50, limitBreak: 100, skill: 80
    },
    petitGirls: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, mensCologne: 0,
      petitEffects: 0, limitBreak: 0, skill: 0
    },
    eventUniqueBonus: {
      specialGirls: {
        formulaVariable: "C",
        formulaDisplayName: "有利なガールボーナス",
        formulaDisplayValue: "(~ 77.5 %)",
        mainScenes: 100,
        mainStrap: 100,
        mainPrecious: 100,
        subScenes: 100,
        subPrecious: 100,
        petitGirls: 0,
        value: {
          luv: {
            lv10: 68, lv11: 68.4, lv12: 68.8, lv13: 69.2, lv14: 69.6,
            lv15: 70, lv16: 72.5, lv17: 75.0, lv18: 77.5
          },
          ur: {
            lv10: 68, lv11: 68.4, lv12: 68.8, lv13: 69.2, lv14: 69.6,
            lv15: 70, lv16: 72.5, lv17: 75.0, lv18: 77.5
          },
          ssr: {
            lv10: 58, lv11: 58.4, lv12: 58.8, lv13: 59.2, lv14: 59.6,
            lv15: 60, lv16: 62.5, lv17: 65.0, lv18: 67.5
          },
          sr: {
            lv10: 10, lv11: 10, lv12: 10, lv13: 10, lv14: 10,
            lv15: 10, lv16: 10, lv17: 10, lv18: 10
          }
        }
      },
    },
  },
  divrace: {
    mainScenes: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 100, date: 0, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainStrap: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 100, date: 0, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainPrecious: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 100, date: 0, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    subScenes: {
      base: 80, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 80, date: 0, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 80
    },
    subPrecious: {
      base: 80, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 80, date: 0, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 80
    },
    petitGirls: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, mensCologne: 0,
      petitEffects: 0, limitBreak: 0, skill: 0
    },
    eventUniqueBonus: {
      heartRate: {
        value: {
          candy: 1, normalItem: 6, specialItem: 15,
        },
      },
    },
  },
  board: {
    mainScenes: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 100, date: 0, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainStrap: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 100, date: 0, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainPrecious: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 100, date: 0, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    subScenes: {
      base: 80, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 80, date: 0, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 80
    },
    subPrecious: {
      base: 80, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 80, date: 0, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 80
    },
    petitGirls: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, mensCologne: 0,
      petitEffects: 0, limitBreak: 0, skill: 0
    },
    eventUniqueBonus: {
      heartRate: {
        value: {
          candy: 1, normalItem: 6, specialItem: 15,
        },
      },
    },
  },
  normalBattle: {
    mainScenes: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 100, date: 100, touch: 100, birthday: 100, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainStrap: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 100, date: 100, touch: 100, birthday: 100, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    mainPrecious: {
      base: 100, typeMatch: 100, clubMatch: 100, clubItem: 100, clubPosition: 100,
      deck: 100, date: 100, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 100
    },
    subScenes: {
      base: 80, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 100, date: 80, touch: 0, birthday: 80, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 80
    },
    subPrecious: {
      base: 80, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 100, date: 80, touch: 0, birthday: 0, mensCologne: 100,
      petitEffects: 100, limitBreak: 100, skill: 80
    },
    petitGirls: {
      base: 100, typeMatch: 0, clubMatch: 0, clubItem: 0, clubPosition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, mensCologne: 0,
      petitEffects: 0, limitBreak: 0, skill: 0
    },
  },
} as const;
