export interface PetitGirlsEffects {
  name: string,
  effectCondition: "タイプ" | "本命ガール" | "デート中" | "タッチ" | "誕生日" | "部活設備",
  conditionDetail?: "全タイプ" | "SWEETタイプ" | "COOLタイプ" | "POPタイプ",
  effectType: "攻援UP" | "守援UP" | "攻守UP",
  markerType: "ピンク" | "イエロー" | "ブルー",
  levelMaxValue: number,
  levelMaxValueUr: number,
}
interface InvalidPetitsGirlsEffects {
  name: string,
  effectCondition: "無効",
  conditionDetail?: "無効",
}

export const PETIT_GIRLS_EFFECTS_DATA: {
  [K: number]: PetitGirlsEffects | InvalidPetitsGirlsEffects
} = {
  255: { name: "---", effectCondition: "無効" },

  0: { name: "全ﾀｲﾌﾟの攻援UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 9.5, levelMaxValueUr: 10.5 },
  4: { name: "POPﾀｲﾌﾟの攻援UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 9.5, levelMaxValueUr: 10.5 },
  8: { name: "SWEETﾀｲﾌﾟの攻援UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 9.5, levelMaxValueUr: 10.5 },
  12: { name: "COOLﾀｲﾌﾟの攻援UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 9.5, levelMaxValueUr: 10.5 },

  1: { name: "全ﾀｲﾌﾟの守援UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 9.5, levelMaxValueUr: 10.5 },
  5: { name: "POPﾀｲﾌﾟの守援UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 9.5, levelMaxValueUr: 10.5 },
  9: { name: "SWEETﾀｲﾌﾟの守援UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 9.5, levelMaxValueUr: 10.5 },
  13: { name: "COOLﾀｲﾌﾟの守援UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 9.5, levelMaxValueUr: 10.5 },

  2: { name: "全ﾀｲﾌﾟの攻守UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 8.5, levelMaxValueUr: 9.5 },
  6: { name: "POPﾀｲﾌﾟの攻守UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 8.5, levelMaxValueUr: 9.5 },
  10: { name: "SWEETﾀｲﾌﾟの攻守UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 8.5, levelMaxValueUr: 9.5 },
  14: { name: "COOLﾀｲﾌﾟの攻守UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 8.5, levelMaxValueUr: 9.5 },

  16: { name: "全ﾀｲﾌﾟの攻援大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 12, levelMaxValueUr: 13 },
  20: { name: "POPﾀｲﾌﾟの攻援大UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 12, levelMaxValueUr: 13 },
  24: { name: "SWEETﾀｲﾌﾟの攻援大UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 12, levelMaxValueUr: 13 },
  28: { name: "COOLﾀｲﾌﾟの攻援大UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 12, levelMaxValueUr: 13 },

  17: { name: "全ﾀｲﾌﾟの守援大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 12, levelMaxValueUr: 13 },
  21: { name: "POPﾀｲﾌﾟの守援大UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 12, levelMaxValueUr: 13 },
  25: { name: "SWEETﾀｲﾌﾟの守援大UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 12, levelMaxValueUr: 13 },
  29: { name: "COOLﾀｲﾌﾟの守援大UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 12, levelMaxValueUr: 13 },

  18: { name: "全ﾀｲﾌﾟの攻守大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 12, levelMaxValueUr: 13 },
  22: { name: "POPﾀｲﾌﾟの攻守大UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 12, levelMaxValueUr: 13 },
  26: { name: "SWEETﾀｲﾌﾟの攻守大UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 12, levelMaxValueUr: 13 },
  30: { name: "COOLﾀｲﾌﾟの攻守大UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 12, levelMaxValueUr: 13 },

  32: { name: "全ﾀｲﾌﾟの攻援特大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 14, levelMaxValueUr: 15 },
  36: { name: "POPﾀｲﾌﾟの攻援特大UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 14, levelMaxValueUr: 15 },
  40: { name: "SWEETﾀｲﾌﾟの攻援特大UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 14, levelMaxValueUr: 15 },
  44: { name: "COOLﾀｲﾌﾟの攻援特大UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "攻援UP", markerType: "ピンク", levelMaxValue: 14, levelMaxValueUr: 15 },

  33: { name: "全ﾀｲﾌﾟの守援特大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 14, levelMaxValueUr: 15 },
  37: { name: "POPﾀｲﾌﾟの守援特大UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 14, levelMaxValueUr: 15 },
  41: { name: "SWEETﾀｲﾌﾟの守援特大UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 14, levelMaxValueUr: 15 },
  45: { name: "COOLﾀｲﾌﾟの守援特大UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "守援UP", markerType: "ピンク", levelMaxValue: 14, levelMaxValueUr: 15 },

  34: { name: "全ﾀｲﾌﾟの攻守特大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 14, levelMaxValueUr: 15 },
  38: { name: "POPﾀｲﾌﾟの攻守特大UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 14, levelMaxValueUr: 15 },
  42: { name: "SWEETﾀｲﾌﾟの攻守特大UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 14, levelMaxValueUr: 15 },
  46: { name: "COOLﾀｲﾌﾟの攻守特大UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "攻守UP", markerType: "ピンク", levelMaxValue: 14, levelMaxValueUr: 15 },

  64: { name: "全ﾀｲﾌﾟの攻援小UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻援UP", markerType: "イエロー", levelMaxValue: 3, levelMaxValueUr: 3.3 },
  68: { name: "POPﾀｲﾌﾟの攻援小UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "攻援UP", markerType: "イエロー", levelMaxValue: 3, levelMaxValueUr: 3.3 },
  72: { name: "SWEETﾀｲﾌﾟの攻援小UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "攻援UP", markerType: "イエロー", levelMaxValue: 3, levelMaxValueUr: 3.3 },
  76: { name: "COOLﾀｲﾌﾟの攻援小UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "攻援UP", markerType: "イエロー", levelMaxValue: 3, levelMaxValueUr: 3.3 },

  65: { name: "全ﾀｲﾌﾟの守援小UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "守援UP", markerType: "イエロー", levelMaxValue: 3, levelMaxValueUr: 3.3 },
  69: { name: "POPﾀｲﾌﾟの守援小UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "守援UP", markerType: "イエロー", levelMaxValue: 3, levelMaxValueUr: 3.3 },
  73: { name: "SWEETﾀｲﾌﾟの守援小UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "守援UP", markerType: "イエロー", levelMaxValue: 3, levelMaxValueUr: 3.3 },
  77: { name: "COOLﾀｲﾌﾟの守援小UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "守援UP", markerType: "イエロー", levelMaxValue: 3, levelMaxValueUr: 3.3 },

  66: { name: "全ﾀｲﾌﾟの攻守小UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻守UP", markerType: "イエロー", levelMaxValue: 3, levelMaxValueUr: 3.3 },
  70: { name: "POPﾀｲﾌﾟの攻守小UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "攻守UP", markerType: "イエロー", levelMaxValue: 3, levelMaxValueUr: 3.3 },
  74: { name: "SWEETﾀｲﾌﾟの攻守小UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "攻守UP", markerType: "イエロー", levelMaxValue: 3, levelMaxValueUr: 3.3 },
  78: { name: "COOLﾀｲﾌﾟの攻守小UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "攻守UP", markerType: "イエロー", levelMaxValue: 3, levelMaxValueUr: 3.3 },

  130: { name: "本命ｶﾞｰﾙの攻守UP", effectCondition: "本命ガール", effectType: "攻守UP", markerType: "ブルー", levelMaxValue: 11, levelMaxValueUr: 12 },
  146: { name: "ﾃﾞｰﾄ中のｶﾞｰﾙの攻守UP", effectCondition: "デート中", effectType: "攻守UP", markerType: "ブルー", levelMaxValue: 11, levelMaxValueUr: 12 },
  162: { name: "ﾀｯﾁﾎﾞｰﾅｽの効果UP", effectCondition: "タッチ", effectType: "攻守UP", markerType: "ブルー", levelMaxValue: 11, levelMaxValueUr: 12 },
  178: { name: "誕生日のｶﾞｰﾙの攻守UP", effectCondition: "誕生日", effectType: "攻守UP", markerType: "ブルー", levelMaxValue: 19, levelMaxValueUr: 21 },

  198: { name: "ﾃﾚﾋﾞの効果UP", effectCondition: "部活設備", conditionDetail: "POPタイプ", effectType: "攻守UP", markerType: "ブルー", levelMaxValue: 120, levelMaxValueUr: 128 },
  202: { name: "ﾛｯｶｰの効果UP", effectCondition: "部活設備", conditionDetail: "SWEETタイプ", effectType: "攻守UP", markerType: "ブルー", levelMaxValue: 120, levelMaxValueUr: 128 },
  206: { name: "ﾎﾜｲﾄﾎﾞｰﾄﾞの効果UP", effectCondition: "部活設備", conditionDetail: "COOLタイプ", effectType: "攻守UP", markerType: "ブルー", levelMaxValue: 120, levelMaxValueUr: 128 },
} as const;
