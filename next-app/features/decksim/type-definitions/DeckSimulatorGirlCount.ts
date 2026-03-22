interface CountPerType {
  SWEETタイプ: number;
  COOLタイプ: number;
  POPタイプ: number;
}

export interface DeckSimulatorGirlCount {
  rarity: {
    Luv: CountPerType;
    UR: CountPerType;
    SSR: CountPerType;
    SR: CountPerType;
  };
  cost: {
    [K: number]: CountPerType;
  };
  skillLv: {
    [K: number]: CountPerType;
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
}
