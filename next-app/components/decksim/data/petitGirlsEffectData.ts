export interface PetitGirlsEffects {
  name: string,
  effectCondition: "タイプ" | "本命ガール" | "デート中" | "タッチ" | "誕生日" | "部活設備",
  conditionDetail?: "全タイプ" | "Sweetタイプ" | "Coolタイプ" | "Popタイプ",
  effectType: "攻援UP" | "守援UP" | "攻守UP",
  markerType: "ピンク" | "イエロー" | "ブルー",
  levelMaxValue: number,
}
interface InvalidPetitsGirlsEffects {
  name: string,
  effectCondition: "無効",
}

export const PETIT_GIRLS_EFFECTS_DATA: {
  [K: number]: PetitGirlsEffects | InvalidPetitsGirlsEffects
} = {
  255: { name: "---", effectCondition: "無効" },

  0: { name: "全ﾀｲﾌﾟの攻援UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 9.5 },
  4: { name: "Popﾀｲﾌﾟの攻援UP", effectCondition: "タイプ", conditionDetail: "Popタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 9.5 },
  8: { name: "SWEETﾀｲﾌﾟの攻援UP", effectCondition: "タイプ", conditionDetail: "Sweetタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 9.5 },
  12: { name: "Coolﾀｲﾌﾟの攻援UP", effectCondition: "タイプ", conditionDetail: "Coolタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 9.5 },

  1: { name: "全ﾀｲﾌﾟの守援UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 9.5 },
  5: { name: "Popﾀｲﾌﾟの守援UP", effectCondition: "タイプ", conditionDetail: "Popタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 9.5 },
  9: { name: "Sweetﾀｲﾌﾟの守援UP", effectCondition: "タイプ", conditionDetail: "Sweetタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 9.5 },
  13: { name: "Coolﾀｲﾌﾟの守援UP", effectCondition: "タイプ", conditionDetail: "Coolタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 9.5 },

  2: { name: "全ﾀｲﾌﾟの攻守UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 8.5 },
  6: { name: "Popﾀｲﾌﾟの攻守UP", effectCondition: "タイプ", conditionDetail: "Popタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 8.5 },
  10: { name: "Sweetﾀｲﾌﾟの攻守UP", effectCondition: "タイプ", conditionDetail: "Sweetタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 8.5 },
  14: { name: "Coolﾀｲﾌﾟの攻守UP", effectCondition: "タイプ", conditionDetail: "Coolタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 8.5 },

  16: { name: "全ﾀｲﾌﾟの攻援大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 12 },
  20: { name: "Popﾀｲﾌﾟの攻援大UP", effectCondition: "タイプ", conditionDetail: "Popタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 12 },
  24: { name: "Sweetﾀｲﾌﾟの攻援大UP", effectCondition: "タイプ", conditionDetail: "Sweetタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 12 },
  28: { name: "Coolﾀｲﾌﾟの攻援大UP", effectCondition: "タイプ", conditionDetail: "Coolタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 12 },

  17: { name: "全ﾀｲﾌﾟの守援大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 12 },
  21: { name: "Popﾀｲﾌﾟの守援大UP", effectCondition: "タイプ", conditionDetail: "Popタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 12 },
  25: { name: "Sweetﾀｲﾌﾟの守援大UP", effectCondition: "タイプ", conditionDetail: "Sweetタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 12 },
  29: { name: "Coolﾀｲﾌﾟの守援大UP", effectCondition: "タイプ", conditionDetail: "Coolタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 12 },

  18: { name: "全ﾀｲﾌﾟの攻守大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 12 },
  22: { name: "Popﾀｲﾌﾟの攻守大UP", effectCondition: "タイプ", conditionDetail: "Popタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 12 },
  26: { name: "Sweetﾀｲﾌﾟの攻守大UP", effectCondition: "タイプ", conditionDetail: "Sweetタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 12 },
  30: { name: "Coolﾀｲﾌﾟの攻守大UP", effectCondition: "タイプ", conditionDetail: "Coolタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 12 },

  32: { name: "全ﾀｲﾌﾟの攻援特大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 14 },
  36: { name: "Popﾀｲﾌﾟの攻援特大UP", effectCondition: "タイプ", conditionDetail: "Popタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 14 },
  40: { name: "Sweetﾀｲﾌﾟの攻援特大UP", effectCondition: "タイプ", conditionDetail: "Sweetタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 14 },
  44: { name: "Coolﾀｲﾌﾟの攻援特大UP", effectCondition: "タイプ", conditionDetail: "Coolタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 14 },

  33: { name: "全ﾀｲﾌﾟの守援特大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 14 },
  37: { name: "Popﾀｲﾌﾟの守援特大UP", effectCondition: "タイプ", conditionDetail: "Popタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 14 },
  41: { name: "Sweetﾀｲﾌﾟの守援特大UP", effectCondition: "タイプ", conditionDetail: "Sweetタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 14 },
  45: { name: "Coolﾀｲﾌﾟの守援特大UP", effectCondition: "タイプ", conditionDetail: "Coolタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 14 },

  34: { name: "全ﾀｲﾌﾟの攻守特大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 14 },
  38: { name: "Popﾀｲﾌﾟの攻守特大UP", effectCondition: "タイプ", conditionDetail: "Popタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 14 },
  42: { name: "Sweetﾀｲﾌﾟの攻守特大UP", effectCondition: "タイプ", conditionDetail: "Sweetタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 14 },
  46: { name: "Coolﾀｲﾌﾟの攻守特大UP", effectCondition: "タイプ", conditionDetail: "Coolタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 14 },

  64: { name: "全ﾀｲﾌﾟの攻援小UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻援UP", markerType: "イエロー", levelMaxValue: 3 },
  68: { name: "Popﾀｲﾌﾟの攻援小UP", effectCondition: "タイプ", conditionDetail: "Popタイプ", effectType: "攻援UP", markerType: "イエロー", levelMaxValue: 3 },
  72: { name: "Sweetﾀｲﾌﾟの攻援小UP", effectCondition: "タイプ", conditionDetail: "Sweetタイプ", effectType: "攻援UP", markerType: "イエロー", levelMaxValue: 3 },
  76: { name: "Coolﾀｲﾌﾟの攻援小UP", effectCondition: "タイプ", conditionDetail: "Coolタイプ", effectType: "攻援UP", markerType: "イエロー", levelMaxValue: 3 },

  65: { name: "全ﾀｲﾌﾟの守援小UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "守援UP", markerType: "イエロー", levelMaxValue: 3 },
  69: { name: "Popﾀｲﾌﾟの守援小UP", effectCondition: "タイプ", conditionDetail: "Popタイプ", effectType: "守援UP", markerType: "イエロー", levelMaxValue: 3 },
  73: { name: "Sweetﾀｲﾌﾟの守援小UP", effectCondition: "タイプ", conditionDetail: "Sweetタイプ", effectType: "守援UP", markerType: "イエロー", levelMaxValue: 3 },
  77: { name: "Coolﾀｲﾌﾟの守援小UP", effectCondition: "タイプ", conditionDetail: "Coolタイプ", effectType: "守援UP", markerType: "イエロー", levelMaxValue: 3 },

  66: { name: "全ﾀｲﾌﾟの攻守小UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻守UP", markerType: "イエロー", levelMaxValue: 3 },
  70: { name: "Popﾀｲﾌﾟの攻守小UP", effectCondition: "タイプ", conditionDetail: "Popタイプ", effectType: "攻守UP", markerType: "イエロー", levelMaxValue: 3 },
  74: { name: "Sweetﾀｲﾌﾟの攻守小UP", effectCondition: "タイプ", conditionDetail: "Sweetタイプ", effectType: "攻守UP", markerType: "イエロー", levelMaxValue: 3 },
  78: { name: "Coolﾀｲﾌﾟの攻守小UP", effectCondition: "タイプ", conditionDetail: "Coolタイプ", effectType: "攻守UP", markerType: "イエロー", levelMaxValue: 3 },

  130: { name: "本命ｶﾞｰﾙの攻守UP", effectCondition: "本命ガール", effectType: "攻守UP", markerType: "ブルー", levelMaxValue: 11 },
  146: { name: "ﾃﾞｰﾄ中のｶﾞｰﾙの攻守UP", effectCondition: "デート中", effectType: "攻守UP", markerType: "ブルー", levelMaxValue: 11 },
  162: { name: "ﾀｯﾁﾎﾞｰﾅｽの効果UP", effectCondition: "タッチ", effectType: "攻守UP", markerType: "ブルー", levelMaxValue: 11 },
  178: { name: "誕生日のｶﾞｰﾙの攻守UP", effectCondition: "誕生日", effectType: "攻守UP", markerType: "ブルー", levelMaxValue: 19 },

  198: { name: "ﾃﾚﾋﾞの効果UP", effectCondition: "部活設備", conditionDetail: "Popタイプ", effectType: "攻守UP", markerType: "ブルー", levelMaxValue: 120 },
  202: { name: "ﾛｯｶｰの効果UP", effectCondition: "部活設備", conditionDetail: "Sweetタイプ", effectType: "攻守UP", markerType: "ブルー", levelMaxValue: 120 },
  206: { name: "ﾎﾜｲﾄﾎﾞｰﾄﾞの効果UP", effectCondition: "部活設備", conditionDetail: "Coolタイプ", effectType: "攻守UP", markerType: "ブルー", levelMaxValue: 120 },
} as const;
