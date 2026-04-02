interface CountPerType {
  SWEETタイプ: number;
  COOLタイプ: number;
  POPタイプ: number;
}

interface GirlCountPerDeckType {
  rarity: {
    Luv: CountPerType;
    UR: CountPerType;
    SSR: CountPerType;
    SR: CountPerType;
  };
  cost: {
    [K: string]: CountPerType;
  };
  skillLv: {
    [K: string]: CountPerType;
  };
  grade: {
    "1年生": CountPerType;
    "2年生": CountPerType;
    "3年生": CountPerType;
    その他: CountPerType;
  };
  isClubMatch: {
    true: CountPerType;
    false: CountPerType;
  };
  isLimitBreak: {
    true: CountPerType;
    false: CountPerType;
  };
}

export interface DeckSimulatorGirlCount {
  attack: GirlCountPerDeckType;
  defense: GirlCountPerDeckType;
}
