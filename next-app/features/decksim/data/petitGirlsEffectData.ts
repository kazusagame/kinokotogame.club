export interface PetitGirlsEffects {
  name: string,
  effectCondition: "タイプ" | "学年" | "本命ガール" | "デート中" | "タッチ" | "誕生日" | "部活設備",
  conditionDetail: "全タイプ" | "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "1年生" | "2年生" | "3年生",
  effectType: "攻援UP" | "守援UP" | "攻守UP",
  markerType: "ピンク" | "イエロー" | "ブルー",
  level20Value: number,
  level22Value: number,
}

export const PETIT_GIRLS_EFFECTS_DATA: {
  [K: number]: PetitGirlsEffects
} = {
  0: { name: "全ﾀｲﾌﾟの攻援UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻援UP", markerType: "ピンク", level20Value: 9.5, level22Value: 10.5 },
  4: { name: "POPﾀｲﾌﾟの攻援UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "攻援UP", markerType: "ピンク", level20Value: 9.5, level22Value: 10.5 },
  8: { name: "SWEETﾀｲﾌﾟの攻援UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "攻援UP", markerType: "ピンク", level20Value: 9.5, level22Value: 10.5 },
  12: { name: "COOLﾀｲﾌﾟの攻援UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "攻援UP", markerType: "ピンク", level20Value: 9.5, level22Value: 10.5 },

  1: { name: "全ﾀｲﾌﾟの守援UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "守援UP", markerType: "ピンク", level20Value: 9.5, level22Value: 10.5 },
  5: { name: "POPﾀｲﾌﾟの守援UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "守援UP", markerType: "ピンク", level20Value: 9.5, level22Value: 10.5 },
  9: { name: "SWEETﾀｲﾌﾟの守援UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "守援UP", markerType: "ピンク", level20Value: 9.5, level22Value: 10.5 },
  13: { name: "COOLﾀｲﾌﾟの守援UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "守援UP", markerType: "ピンク", level20Value: 9.5, level22Value: 10.5 },

  2: { name: "全ﾀｲﾌﾟの攻守UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻守UP", markerType: "ピンク", level20Value: 8.5, level22Value: 9.5 },
  6: { name: "POPﾀｲﾌﾟの攻守UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "攻守UP", markerType: "ピンク", level20Value: 8.5, level22Value: 9.5 },
  10: { name: "SWEETﾀｲﾌﾟの攻守UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "攻守UP", markerType: "ピンク", level20Value: 8.5, level22Value: 9.5 },
  14: { name: "COOLﾀｲﾌﾟの攻守UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "攻守UP", markerType: "ピンク", level20Value: 8.5, level22Value: 9.5 },

  16: { name: "全ﾀｲﾌﾟの攻援大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻援UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },
  20: { name: "POPﾀｲﾌﾟの攻援大UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "攻援UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },
  24: { name: "SWEETﾀｲﾌﾟの攻援大UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "攻援UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },
  28: { name: "COOLﾀｲﾌﾟの攻援大UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "攻援UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },

  17: { name: "全ﾀｲﾌﾟの守援大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "守援UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },
  21: { name: "POPﾀｲﾌﾟの守援大UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "守援UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },
  25: { name: "SWEETﾀｲﾌﾟの守援大UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "守援UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },
  29: { name: "COOLﾀｲﾌﾟの守援大UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "守援UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },

  18: { name: "全ﾀｲﾌﾟの攻守大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻守UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },
  22: { name: "POPﾀｲﾌﾟの攻守大UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "攻守UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },
  26: { name: "SWEETﾀｲﾌﾟの攻守大UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "攻守UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },
  30: { name: "COOLﾀｲﾌﾟの攻守大UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "攻守UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },

  32: { name: "全ﾀｲﾌﾟの攻援特大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻援UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },
  36: { name: "POPﾀｲﾌﾟの攻援特大UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "攻援UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },
  40: { name: "SWEETﾀｲﾌﾟの攻援特大UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "攻援UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },
  44: { name: "COOLﾀｲﾌﾟの攻援特大UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "攻援UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },

  33: { name: "全ﾀｲﾌﾟの守援特大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "守援UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },
  37: { name: "POPﾀｲﾌﾟの守援特大UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "守援UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },
  41: { name: "SWEETﾀｲﾌﾟの守援特大UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "守援UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },
  45: { name: "COOLﾀｲﾌﾟの守援特大UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "守援UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },

  34: { name: "全ﾀｲﾌﾟの攻守特大UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻守UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },
  38: { name: "POPﾀｲﾌﾟの攻守特大UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "攻守UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },
  42: { name: "SWEETﾀｲﾌﾟの攻守特大UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "攻守UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },
  46: { name: "COOLﾀｲﾌﾟの攻守特大UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "攻守UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },

  64: { name: "全ﾀｲﾌﾟの攻援小UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻援UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },
  68: { name: "POPﾀｲﾌﾟの攻援小UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "攻援UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },
  72: { name: "SWEETﾀｲﾌﾟの攻援小UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "攻援UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },
  76: { name: "COOLﾀｲﾌﾟの攻援小UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "攻援UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },

  65: { name: "全ﾀｲﾌﾟの守援小UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "守援UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },
  69: { name: "POPﾀｲﾌﾟの守援小UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "守援UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },
  73: { name: "SWEETﾀｲﾌﾟの守援小UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "守援UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },
  77: { name: "COOLﾀｲﾌﾟの守援小UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "守援UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },

  66: { name: "全ﾀｲﾌﾟの攻守小UP", effectCondition: "タイプ", conditionDetail: "全タイプ", effectType: "攻守UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },
  70: { name: "POPﾀｲﾌﾟの攻守小UP", effectCondition: "タイプ", conditionDetail: "POPタイプ", effectType: "攻守UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },
  74: { name: "SWEETﾀｲﾌﾟの攻守小UP", effectCondition: "タイプ", conditionDetail: "SWEETタイプ", effectType: "攻守UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },
  78: { name: "COOLﾀｲﾌﾟの攻守小UP", effectCondition: "タイプ", conditionDetail: "COOLタイプ", effectType: "攻守UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },

  130: { name: "本命ｶﾞｰﾙの攻守UP", effectCondition: "本命ガール", conditionDetail: "全タイプ", effectType: "攻守UP", markerType: "ブルー", level20Value: 11, level22Value: 12 },
  146: { name: "ﾃﾞｰﾄ中のｶﾞｰﾙの攻守UP", effectCondition: "デート中", conditionDetail: "全タイプ", effectType: "攻守UP", markerType: "ブルー", level20Value: 11, level22Value: 12 },
  162: { name: "ﾀｯﾁﾎﾞｰﾅｽの効果UP", effectCondition: "タッチ", conditionDetail: "全タイプ", effectType: "攻守UP", markerType: "ブルー", level20Value: 11, level22Value: 12 },
  178: { name: "誕生日のｶﾞｰﾙの攻守UP", effectCondition: "誕生日", conditionDetail: "全タイプ", effectType: "攻守UP", markerType: "ブルー", level20Value: 19, level22Value: 21 },

  198: { name: "ﾃﾚﾋﾞの効果UP", effectCondition: "部活設備", conditionDetail: "POPタイプ", effectType: "攻守UP", markerType: "ブルー", level20Value: 120, level22Value: 128 },
  202: { name: "ﾛｯｶｰの効果UP", effectCondition: "部活設備", conditionDetail: "SWEETタイプ", effectType: "攻守UP", markerType: "ブルー", level20Value: 120, level22Value: 128 },
  206: { name: "ﾎﾜｲﾄﾎﾞｰﾄﾞの効果UP", effectCondition: "部活設備", conditionDetail: "COOLタイプ", effectType: "攻守UP", markerType: "ブルー", level20Value: 120, level22Value: 128 },

  256: { name: "1年生の攻援UP", effectCondition: "学年", conditionDetail: "1年生", effectType: "攻援UP", markerType: "ピンク", level20Value: 9.5, level22Value: 10.5 },
  260: { name: "2年生の攻援UP", effectCondition: "学年", conditionDetail: "2年生", effectType: "攻援UP", markerType: "ピンク", level20Value: 9.5, level22Value: 10.5 },
  264: { name: "3年生の攻援UP", effectCondition: "学年", conditionDetail: "3年生", effectType: "攻援UP", markerType: "ピンク", level20Value: 9.5, level22Value: 10.5 },

  257: { name: "1年生の守援UP", effectCondition: "学年", conditionDetail: "1年生", effectType: "守援UP", markerType: "ピンク", level20Value: 9.5, level22Value: 10.5 },
  261: { name: "2年生の守援UP", effectCondition: "学年", conditionDetail: "2年生", effectType: "守援UP", markerType: "ピンク", level20Value: 9.5, level22Value: 10.5 },
  265: { name: "3年生の守援UP", effectCondition: "学年", conditionDetail: "3年生", effectType: "守援UP", markerType: "ピンク", level20Value: 9.5, level22Value: 10.5 },

  258: { name: "1年生の攻守UP", effectCondition: "学年", conditionDetail: "1年生", effectType: "攻守UP", markerType: "ピンク", level20Value: 8.5, level22Value: 9.5 },
  262: { name: "2年生の攻守UP", effectCondition: "学年", conditionDetail: "2年生", effectType: "攻守UP", markerType: "ピンク", level20Value: 8.5, level22Value: 9.5 },
  266: { name: "3年生の攻守UP", effectCondition: "学年", conditionDetail: "3年生", effectType: "攻守UP", markerType: "ピンク", level20Value: 8.5, level22Value: 9.5 },

  268: { name: "1年生の攻援大UP", effectCondition: "学年", conditionDetail: "1年生", effectType: "攻援UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },
  272: { name: "2年生の攻援大UP", effectCondition: "学年", conditionDetail: "2年生", effectType: "攻援UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },
  276: { name: "3年生の攻援大UP", effectCondition: "学年", conditionDetail: "3年生", effectType: "攻援UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },

  269: { name: "1年生の守援大UP", effectCondition: "学年", conditionDetail: "1年生", effectType: "守援UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },
  273: { name: "2年生の守援大UP", effectCondition: "学年", conditionDetail: "2年生", effectType: "守援UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },
  277: { name: "3年生の守援大UP", effectCondition: "学年", conditionDetail: "3年生", effectType: "守援UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },

  270: { name: "1年生の攻守大UP", effectCondition: "学年", conditionDetail: "1年生", effectType: "攻守UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },
  274: { name: "2年生の攻守大UP", effectCondition: "学年", conditionDetail: "2年生", effectType: "攻守UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },
  278: { name: "3年生の攻守大UP", effectCondition: "学年", conditionDetail: "3年生", effectType: "攻守UP", markerType: "ピンク", level20Value: 12, level22Value: 13 },

  280: { name: "1年生の攻援特大UP", effectCondition: "学年", conditionDetail: "1年生", effectType: "攻援UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },
  284: { name: "2年生の攻援特大UP", effectCondition: "学年", conditionDetail: "2年生", effectType: "攻援UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },
  288: { name: "3年生の攻援特大UP", effectCondition: "学年", conditionDetail: "3年生", effectType: "攻援UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },

  281: { name: "1年生の守援特大UP", effectCondition: "学年", conditionDetail: "1年生", effectType: "守援UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },
  285: { name: "2年生の守援特大UP", effectCondition: "学年", conditionDetail: "2年生", effectType: "守援UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },
  289: { name: "3年生の守援特大UP", effectCondition: "学年", conditionDetail: "3年生", effectType: "守援UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },

  282: { name: "1年生の攻守特大UP", effectCondition: "学年", conditionDetail: "1年生", effectType: "攻守UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },
  286: { name: "2年生の攻守特大UP", effectCondition: "学年", conditionDetail: "2年生", effectType: "攻守UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },
  290: { name: "3年生の攻守特大UP", effectCondition: "学年", conditionDetail: "3年生", effectType: "攻守UP", markerType: "ピンク", level20Value: 14, level22Value: 15 },

  292: { name: "1年生の攻援小UP", effectCondition: "学年", conditionDetail: "1年生", effectType: "攻援UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },
  296: { name: "2年生の攻援小UP", effectCondition: "学年", conditionDetail: "2年生", effectType: "攻援UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },
  300: { name: "3年生の攻援小UP", effectCondition: "学年", conditionDetail: "3年生", effectType: "攻援UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },

  293: { name: "1年生の守援小UP", effectCondition: "学年", conditionDetail: "1年生", effectType: "守援UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },
  297: { name: "2年生の守援小UP", effectCondition: "学年", conditionDetail: "2年生", effectType: "守援UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },
  301: { name: "3年生の守援小UP", effectCondition: "学年", conditionDetail: "3年生", effectType: "守援UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },

  294: { name: "1年生の攻守小UP", effectCondition: "学年", conditionDetail: "1年生", effectType: "攻守UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },
  298: { name: "2年生の攻守小UP", effectCondition: "学年", conditionDetail: "2年生", effectType: "攻守UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },
  302: { name: "3年生の攻守小UP", effectCondition: "学年", conditionDetail: "3年生", effectType: "攻守UP", markerType: "イエロー", level20Value: 3, level22Value: 3.3 },
} as const;

export const PETIT_GIRLS_EFFECTS_NAME_TO_ID: {
  [K: (typeof PETIT_GIRLS_EFFECTS_DATA)[number]["name"]]: keyof typeof PETIT_GIRLS_EFFECTS_DATA
} = {
  "全ﾀｲﾌﾟの攻援UP": 0,
  "POPﾀｲﾌﾟの攻援UP": 4,
  "SWEETﾀｲﾌﾟの攻援UP": 8,
  "COOLﾀｲﾌﾟの攻援UP": 12,

  "全ﾀｲﾌﾟの守援UP": 1,
  "POPﾀｲﾌﾟの守援UP": 5,
  "SWEETﾀｲﾌﾟの守援UP": 9,
  "COOLﾀｲﾌﾟの守援UP": 13,

  "全ﾀｲﾌﾟの攻守UP": 2,
  "POPﾀｲﾌﾟの攻守UP": 6,
  "SWEETﾀｲﾌﾟの攻守UP": 10,
  "COOLﾀｲﾌﾟの攻守UP": 14,

  "全ﾀｲﾌﾟの攻援大UP": 16,
  "POPﾀｲﾌﾟの攻援大UP": 20,
  "SWEETﾀｲﾌﾟの攻援大UP": 24,
  "COOLﾀｲﾌﾟの攻援大UP": 28,

  "全ﾀｲﾌﾟの守援大UP": 17,
  "POPﾀｲﾌﾟの守援大UP": 21,
  "SWEETﾀｲﾌﾟの守援大UP": 25,
  "COOLﾀｲﾌﾟの守援大UP": 29,

  "全ﾀｲﾌﾟの攻守大UP": 18,
  "POPﾀｲﾌﾟの攻守大UP": 22,
  "SWEETﾀｲﾌﾟの攻守大UP": 26,
  "COOLﾀｲﾌﾟの攻守大UP": 30,

  "全ﾀｲﾌﾟの攻援特大UP": 32,
  "POPﾀｲﾌﾟの攻援特大UP": 36,
  "SWEETﾀｲﾌﾟの攻援特大UP": 40,
  "COOLﾀｲﾌﾟの攻援特大UP": 44,

  "全ﾀｲﾌﾟの守援特大UP": 33,
  "POPﾀｲﾌﾟの守援特大UP": 37,
  "SWEETﾀｲﾌﾟの守援特大UP": 41,
  "COOLﾀｲﾌﾟの守援特大UP": 45,

  "全ﾀｲﾌﾟの攻守特大UP": 34,
  "POPﾀｲﾌﾟの攻守特大UP": 38,
  "SWEETﾀｲﾌﾟの攻守特大UP": 42,
  "COOLﾀｲﾌﾟの攻守特大UP": 46,

  "全ﾀｲﾌﾟの攻援小UP": 64,
  "POPﾀｲﾌﾟの攻援小UP": 68,
  "SWEETﾀｲﾌﾟの攻援小UP": 72,
  "COOLﾀｲﾌﾟの攻援小UP": 76,

  "全ﾀｲﾌﾟの守援小UP": 65,
  "POPﾀｲﾌﾟの守援小UP": 69,
  "SWEETﾀｲﾌﾟの守援小UP": 73,
  "COOLﾀｲﾌﾟの守援小UP": 77,

  "全ﾀｲﾌﾟの攻守小UP": 66,
  "POPﾀｲﾌﾟの攻守小UP": 70,
  "SWEETﾀｲﾌﾟの攻守小UP": 74,
  "COOLﾀｲﾌﾟの攻守小UP": 78,

  "本命ｶﾞｰﾙの攻守UP": 130,
  "ﾃﾞｰﾄ中のｶﾞｰﾙの攻守UP": 146,
  "ﾀｯﾁﾎﾞｰﾅｽの効果UP": 162,
  "誕生日のｶﾞｰﾙの攻守UP": 178,

  "ﾃﾚﾋﾞの効果UP": 198,
  "ﾛｯｶｰの効果UP": 202,
  "ﾎﾜｲﾄﾎﾞｰﾄﾞの効果UP": 206,

  "1年生の攻援UP": 256,
  "2年生の攻援UP": 260,
  "3年生の攻援UP": 264,

  "1年生の守援UP": 257,
  "2年生の守援UP": 261,
  "3年生の守援UP": 265,

  "1年生の攻守UP": 258,
  "2年生の攻守UP": 262,
  "3年生の攻守UP": 266,

  "1年生の攻援大UP": 268,
  "2年生の攻援大UP": 272,
  "3年生の攻援大UP": 276,

  "1年生の守援大UP": 269,
  "2年生の守援大UP": 273,
  "3年生の守援大UP": 277,

  "1年生の攻守大UP": 270,
  "2年生の攻守大UP": 274,
  "3年生の攻守大UP": 278,

  "1年生の攻援特大UP": 280,
  "2年生の攻援特大UP": 284,
  "3年生の攻援特大UP": 288,

  "1年生の守援特大UP": 281,
  "2年生の守援特大UP": 285,
  "3年生の守援特大UP": 289,

  "1年生の攻守特大UP": 282,
  "2年生の攻守特大UP": 286,
  "3年生の攻守特大UP": 290,

  "1年生の攻援小UP": 292,
  "2年生の攻援小UP": 296,
  "3年生の攻援小UP": 300,

  "1年生の守援小UP": 293,
  "2年生の守援小UP": 297,
  "3年生の守援小UP": 301,

  "1年生の攻守小UP": 294,
  "2年生の攻守小UP": 298,
  "3年生の攻守小UP": 302,
} as const;
