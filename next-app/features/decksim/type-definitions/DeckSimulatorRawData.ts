export type RawDataDeckSimulator =
  | RawDataNormalDeck
  | RawDataRaidSecond
  | RawDataChampionship
  | RawDataDivrace;

export interface RawDataNormalDeck {
  resultStatus: string;
  data: {
    frontDeckList: RawDataMainScene[];
    subDeckList: RawDataSubScene[];
    precious: {
      deckPreciousBeanList: RawDataPreciousScene[];
    };
    deckBonusList: RawDataDeckBonus[];
    deckRatingInfo: {
      attackRatingByPetitgirl: number;
      defenceRatingByPetitgirl: number;
    };
    mainPetitgirls: RawDataPetitGirl[];
  };
}

export interface RawDataRaidSecond {
  resultStatus: string;
  data: {
    attackDeckMap: {
      frontDeckList: RawDataMainScene[];
      subDeckList: RawDataSubScene[];
      precious: {
        deckPreciousBeanList: RawDataPreciousScene[];
      };
      deckBonusList: RawDataDeckBonus[];
    };
    defenceDeckMap: {
      frontDeckList: RawDataMainScene[];
      subDeckList: RawDataSubScene[];
      precious: {
        deckPreciousBeanList: RawDataPreciousScene[];
      };
      deckBonusList: RawDataDeckBonus[];
    };
    deckRatingInfo: {
      attackRatingByPetitgirl: number;
      defenceRatingByPetitgirl: number;
    };
    mainPetitgirls: RawDataPetitGirl[];
  };
}

export interface RawDataChampionship {
  resultStatus: string;
  data: {
    frontCards: RawDataMainScene[];
    subCards: RawDataSubScene[];
    preciousList: RawDataPreciousScene[];
    deckAdvantages: RawDataDeckBonus[];
    petitgirlDeckBean: {
      mainPetitgirls: RawDataPetitGirl[];
      petitgirlTotalAttackRating: number;
      petitgirlTotalAttackCardEffect: number;
      petitgirlTotalDefenseRating: number;
      petitgirlTotalDefenseCardEffect: number;
    };
  };
}

export interface RawDataDivrace {
  data: {
    defaultDeck: {
      divraceDeckBean: {
        frontDeckList: RawDataMainScene[];
        subDeckList: RawDataSubScene[];
        precious: {
          deckPreciousBeanList: RawDataPreciousScene[];
        };
        deckBonusList: RawDataDeckBonus[];
      };
      mainPetitgirls: RawDataPetitGirl[];
      deckRatingInfo: {
        attackRatingByPetitgirl: number;
        defenceRatingByPetitgirl: number;
      };
    };
    success: boolean;
  };
}

export interface RawDataMainScene {
  cardName: string;
  baseAttackRating: number;
  baseDefenceRating: number /* raid-second */;
  baseDefenseRating: number /* championship-defence */;
  wearDeckCardBean?: {
    attackEffectValue: number;
    defenceEffectValue: number;
  };
  sphereName: "POP" | "SWEET" | "COOL";
  sphereId: 3 | 2 | 1;
  rarityShortName: "UR" | "SSR" | "SR";
  power: number;
  skillLevel: number;
  dateBonus?: boolean /* championship 以外 */;
  dateFlg?: boolean /* championship */;
  touchBonusRating?: number /* championship 以外 */;
  touchFlg?: boolean /* championship */;
  birthdayBonus?: boolean /* championship 以外 */;
  birthdayFlg?: boolean /* championship */;
  limitbreakCount: number;
  leader?: boolean /* championship 以外 */;

  skillList?: {
    description: string;
  }[];
  /* divrace専用声援*/
  divraceSkillList?: {
    description: string;
  }[];
}

export interface RawDataSubScene {
  cardName: string;
  baseAttackRating: number;
  baseDefenceRating: number /* raid-second */;
  baseDefenseRating: number /* championship-defence */;
  wearDeckCardBean?: {
    attackEffectValue: number;
    defenceEffectValue: number;
  };
  sphereName: "POP" | "SWEET" | "COOL";
  sphereId: 3 | 2 | 1;
  rarityShortName: "UR" | "SSR" | "SR";
  power: number;
  skillLevel: number;
  dateBonus?: boolean /* championship 以外 */;
  dateFlg?: boolean /* championship */;
  touchBonusRating?: number; /* championship 以外 */
  touchFlg?: boolean /* championship */;
  birthdayBonus?: boolean /* championship 以外 */;
  birthdayFlg?: boolean /* championship */;
  limitbreakCount: number;
  leader?: boolean /* championship 以外 */;

  skillList?: {
    description: string;
  }[];

  cardType: string /* championship */;
  isMirrorGirl: boolean /* championship 以外 */;
  isMirrorFront: boolean /* championship 以外 */;
}

export interface RawDataPreciousScene {
  preciousId: number;
  level: number;
}

export interface RawDataPetitGirl {
  effects: {
    effectName: string;
  }[];
  rarity: {
    rarityShortName: "UR" | "SSR" | "SR" | "HR" | "R" | "N";
  }
}

export interface RawDataDeckBonus {
  /* championship 以外 */
  mDeckBonus: {
    deckBonusName: string;
    description: string;
  };
  mDeckBonusLv: number;

  /* championship */
  MDeckBonus: {
    deckBonusName: string;
    description: string;
  };
  deckBonusLevel: number;
}
