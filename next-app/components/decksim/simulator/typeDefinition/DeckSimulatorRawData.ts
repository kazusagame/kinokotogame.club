

interface RawDataMainScene {
  cardName: string,
  baseAttackRating: number,
  baseDefenceRating: number, /* raid-second */
  baseDefenseRating: number, /* championship-defence */
  wearDeckCardBean?: {
    attackEffectValue: number,
    defenceEffectValue: number,
  }

}

interface RawDataNormalDeck {
  resultStatus: string;
  data: {
    frontDeckList: RawDataMainScene[];
    subDeckList: unknown[];
    precious: {
      deckPreciousBeanList: unknown[];
    };
    deckBonusList: unknown[];
    deckRatingInfo: {
      attackRatingByPetitgirl: number;
      defenceRatingByPetitgirl: number;
    };
    mainPetitgirls: unknown[];
    maxPower: number;
  };
}

interface RawDataRaidSecond {
  resultStatus: string;
  data: {
    attackDeckMap: {
      frontDeckList: RawDataMainScene[];
      subDeckList: unknown[];
      precious: {
        deckPreciousBeanList: unknown[];
      };
      deckBonusList: unknown[];
      deckRatingInfo: {
        attackRatingByPetitgirl: number;
        defenceRatingByPetitgirl: number;
      };
    };
    defenceDeckMap: {
      frontDeckList: RawDataMainScene[];
      subDeckList: unknown[];
      precious: {
        deckPreciousBeanList: unknown[];
      };
      deckBonusList: unknown[];
      deckRatingInfo: {
        attackRatingByPetitgirl: number;
        defenceRatingByPetitgirl: number;
      };
    };

    mainPetitgirls: unknown[];
    maxPower: number;
  };
}

interface RawDataChampionship {
  resultStatus: string;
  data: {
    frontCards: RawDataMainScene[];
    subDeckList: unknown[];
    precious: {
      deckPreciousBeanList: unknown[];
    };
    deckBonusList: unknown[];
    deckRatingInfo: {
      attackRatingByPetitgirl: number;
      defenceRatingByPetitgirl: number;
    };
    mainPetitgirls: unknown[];
    maxPower: number;
  };
}

interface RawDataDivrace {
  resultStatus: string;
  data: {
    defaultDeck: {
      divraceDeckBean: {
        frontDeckList: RawDataMainScene[];
        subDeckList: unknown[];
        precious: {
          deckPreciousBeanList: unknown[];
        };
        deckBonusList: unknown[];
        deckRatingInfo: {
          attackRatingByPetitgirl: number;
          defenceRatingByPetitgirl: number;
        };
        mainPetitgirls: unknown[];
      };
    };
    maxPower: number;
  };
}

export type RawDataDeckSimulator = RawDataNormalDeck &
  RawDataRaidSecond &
  RawDataChampionship &
  RawDataDivrace;
