export interface PreciousScenes {
  name: string,
  rarity: 1 | 2 | 3 | 4 | 5 | 6,
  effectCondition:
    | "コストが高いほど"
    | "レアリティが高いほど"
    | "声援Lvが高いほど"
    | "Ex進展ガールが多いほど"
    | "特定のガールで編成するほど"
    | "様々なガールで編成するほど"
    | "---",
  conditionThreshold?: number | string,
  conditionThreshold6?: number | string,
  additionalCondition6?: "たすけて！マイヒーロー限定",
  effectTarget: "全タイプ" | "SWEETタイプ" | "COOLタイプ" | "POPタイプ",
  effectType: "攻援UP" | "守援UP" | "攻守UP",
  effectType6?: "攻援UP" | "守援UP" | "攻守UP",
  effectRange: "主＋副" | "主のみ" | "副のみ",
  valueFormat: "割合(%)" | "固定値",
  value1: number,
  value2: number,
  value3: number,
  value4: number,
  value5: number,
  value6?: number,
  factor?: number,
  factor6?: number,
  annotation?: string,
  isTemp?: boolean,
}

export const PRECIOUS_SCENES_DATA: { [K: number]: PreciousScenes } = {
  /* 初期星3 */
  1: {
    name: "[思い出の…]クロエ・ルメール", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 23, conditionThreshold6: 31,
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.5, value5: 5.0, value6: 7.0,
    factor: 1.5, factor6: 1.12,
    annotation: "星6の減衰係数に推定値を使用しています。情報募集中です。",
  },
  3: {
    name: "[靴箱の邂逅]上条るい", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 23, conditionThreshold6: 31,
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.5, value5: 5.0, value6: 7.0,
    factor: 1.5, factor6: 1.12,
    annotation: "星6の減衰係数に推定値を使用しています。情報募集中です。",
  },
  5: {
    name: "[ｺﾚが自信作]時谷小瑠璃", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 23, conditionThreshold6: 31,
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.5, value5: 5.0, value6: 7.0,
    factor: 1.5, factor6: 1.12,
    annotation: "星6の減衰係数に推定値を使用しています。情報募集中です。",
  },

  2: {
    name: "[ﾗｲﾌﾞの誘い]風町陽歌", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "守援UP", effectType6: "守援UP",
    effectCondition: "---",
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.5, value5: 5.0, value6: 5.5,
  },
  4: {
    name: "[頑張り屋の]鴫野睦", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "守援UP", effectType6: "守援UP",
    effectCondition: "---",
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.5, value5: 5.0, value6: 5.5,
  },
  6: {
    name: "[夕方の約束]花房優輝", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "守援UP", effectType6: "守援UP",
    effectCondition: "---",
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.5, value5: 5.0, value6: 5.5,
  },

  29: {
    name: "[部活の前に]重藤秋穂", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻援UP", effectType6: "攻援UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 15, conditionThreshold6: 17,
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.5, value5: 5.0, value6: 5.5,
    factor: 0.75, factor6: 0.75,
    annotation: "星6の減衰係数に推定値を使用しています。情報募集中です。",
  },
  30: {
    name: "[ﾗｸﾛｽ少女]葉月柚子", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻援UP", effectType6: "攻援UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 15, conditionThreshold6: 17,
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.5, value5: 5.0, value6: 5.5,
    factor: 0.75, factor6: 0.75,
    annotation: "星6の減衰係数に推定値を使用しています。情報募集中です。",
  },
  31: {
    name: "[昼の約束]優木苗", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻援UP", effectType6: "攻援UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 15, conditionThreshold6: 17,
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.5, value5: 5.0, value6: 5.5,
    factor: 0.75, factor6: 0.75,
    annotation: "星6の減衰係数に推定値を使用しています。情報募集中です。",
  },

  36: {
    name: "[お菓子ﾀｲﾑ]朝比奈桃子", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻援UP", effectType6: "攻援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR", conditionThreshold6: "UR",
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.5, value5: 5.0, value6: 6.0,
    factor: 0.18, factor6: 1.18,
  },
  37: {
    name: "[一口いる？]玉井麗巳", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻援UP", effectType6: "攻援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR", conditionThreshold6: "UR",
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.5, value5: 5.0, value6: 6.0,
    factor: 0.18, factor6: 1.18,
  },
  43: {
    name: "[表情の意味]神楽坂砂夜", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻援UP", effectType6: "攻援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR", conditionThreshold6: "UR",
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.5, value5: 5.0, value6: 6.0,
    factor: 0.18, factor6: 1.18,
  },

  38: {
    name: "[成果発表会]心実&エミ", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "全タイプ", effectRange: "主＋副", effectType: "攻守UP", effectType6: "攻守UP",
    effectCondition: "Ex進展ガールが多いほど", conditionThreshold: 30, conditionThreshold6: 35,
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.5, value5: 5.0, value6: 6.0,
    factor: 0.2, factor6: 0.2,
  },

  44: {
    name: "[何をﾌﾟﾚｲ?]姫島木乃子", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 15, conditionThreshold6: 18,
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0, value6: 7.0,
    factor: 1.05, factor6: 0.84,
  },
  45: {
    name: "[せーのっ!]浅見景", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 15, conditionThreshold6: 18,
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0, value6: 7.0,
    factor: 1.05, factor6: 0.84,
  },
  49: {
    name: "[お手伝い]月隈林子", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 15, conditionThreshold6: 18,
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0, value6: 7.0,
    factor: 1.05, factor6: 0.84,
  },

  46: {
    name: "[ｶｯﾌﾟﾙ…？]白水六花", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "特定のガールで編成するほど", conditionThreshold: 10,
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0,
    factor: 0.4,
  },
  50: {
    name: "[二人でﾗﾝﾁ]篠宮りさ", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "特定のガールで編成するほど", conditionThreshold: 10,
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0,
    factor: 0.4,
  },
  56: {
    name: "[図書室紹介]村上文緒", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "特定のガールで編成するほど", conditionThreshold: 10,
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0,
    factor: 0.4,
  },

  52: {
    name: "[貸切食堂]君嶋里琉", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻援UP", effectType6: "攻援UP",
    effectCondition: "---",
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.3, value5: 4.7, value6: 5.2,
  },
  53: {
    name: "[真剣ﾃﾆｽ]加賀美茉莉", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻援UP", effectType6: "攻援UP",
    effectCondition: "---",
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.3, value5: 4.7, value6: 5.2,
  },
  55: {
    name: "[勇者登場]酒井田夏海", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻援UP", effectType6: "攻援UP",
    effectCondition: "---",
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.3, value5: 4.7, value6: 5.2,
  },

  57: {
    name: "[乙女の願い]奈木野さくら", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻援UP", effectType6: "攻守UP",
    effectCondition: "Ex進展ガールが多いほど", conditionThreshold: 35, conditionThreshold6: 35,
    additionalCondition6: "たすけて！マイヒーロー限定",
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0, value6: 6.5,
    factor: 1.18, factor6: 1.18,
    annotation: "星6で効果が攻守UP化 & たすけて！マイヒーロー限定になる。星6の減衰係数に推定値を使用しています。情報募集中です。",
  },
  58: {
    name: "[特別な場所]櫻井明音", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻援UP", effectType6: "攻守UP",
    effectCondition: "Ex進展ガールが多いほど", conditionThreshold: 35, conditionThreshold6: 35,
    additionalCondition6: "たすけて！マイヒーロー限定",
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0, value6: 6.5,
    factor: 1.18, factor6: 1.18,
    annotation: "星6で効果が攻守UP化 & たすけて！マイヒーロー限定になる。星6の減衰係数に推定値を使用しています。情報募集中です。",
  },
  59: {
    name: "[新体操とは]椎名心実", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻援UP", effectType6: "攻守UP",
    effectCondition: "Ex進展ガールが多いほど", conditionThreshold: 35, conditionThreshold6: 35,
    additionalCondition6: "たすけて！マイヒーロー限定",
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0, value6: 6.5,
    factor: 1.18, factor6: 1.18,
    annotation: "星6で効果が攻守UP化 & たすけて！マイヒーロー限定になる。星6の減衰係数に推定値を使用しています。情報募集中です。",
  },

  60: {
    name: "[ﾗｲﾌﾞｽﾀｰﾄ!]風町陽歌", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻守UP", effectType6: "攻守UP",
    effectCondition: "様々なガールで編成するほど", conditionThreshold: 20, conditionThreshold6: 20,
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0, value6: 6.5,
    factor: 0.4, factor6: 0.4,
    annotation: "星6の減衰係数に推定値を使用しています。情報募集中です。",
  },
  62: {
    name: "[清掃対決]鴫野睦", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻守UP", effectType6: "攻守UP",
    effectCondition: "様々なガールで編成するほど", conditionThreshold: 20, conditionThreshold6: 20,
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0, value6: 6.5,
    factor: 0.4, factor6: 0.4,
    annotation: "星6の減衰係数に推定値を使用しています。情報募集中です。",
  },
  66: {
    name: "[回転日和]花房優輝", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻守UP", effectType6: "攻守UP",
    effectCondition: "様々なガールで編成するほど", conditionThreshold: 20, conditionThreshold6: 20,
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0, value6: 6.5,
    factor: 0.4, factor6: 0.4,
    annotation: "星6の減衰係数に推定値を使用しています。情報募集中です。",
  },

  61: {
    name: "[お手本披露]九重忍", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 27,
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0,
    factor: 1.5,
  },
  64: {
    name: "[二人飯]白水六花", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 27,
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0,
    factor: 1.5,
  },
  67: {
    name: "[勇気を胸に]真白透子", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 27,
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0,
    factor: 1.5,
  },

  68: {
    name: "[角煮に夢中]篠宮りさ", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0,
    factor: 0.93,
  },
  71: {
    name: "[薄暮の逢瀬]夏目真尋", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0,
    factor: 0.93,
  },
  73: {
    name: "[奔走ｺｽﾓｽ]笹原野々花", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0,
    factor: 0.93,
  },

  69: {
    name: "[10周年]メモリアル", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "全タイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 17,
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.5, value5: 5.0,
    factor: 1.99
  },

  70: {
    name: "[二人だけで]クロエ・ルメール", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "コストが高いほど", conditionThreshold: 28,
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0,
    factor: 0.5,
  },
  72: {
    name: "[油断の足元]葉月柚子", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "コストが高いほど", conditionThreshold: 28,
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0,
    factor: 0.5,
  },
  74: {
    name: "[鈴蘭の君]上条るい", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "コストが高いほど", conditionThreshold: 28,
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.0,
    factor: 0.5,
  },

  75: {
    name: "[愛ゆえに…]苗&小瑠璃", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "全タイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 16,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 6.5,
    factor: 0.55,
  },

  76: {
    name: "[忍ぶれど]村上文緒", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "様々なガールで編成するほど", conditionThreshold: 23,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 1.5,
  },
  80: {
    name: "[愛情おかゆ]風町陽歌", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "様々なガールで編成するほど", conditionThreshold: 23,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 1.5,
  },
  81: {
    name: "[お気に入り]花房優輝", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "様々なガールで編成するほど", conditionThreshold: 23,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 1.5,
  },

  77: {
    name: "[幸福の白羽]森園芽以", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "Ex進展ガールが多いほど", conditionThreshold: 35,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 0.45,
  },
  79: {
    name: "[メッセージ]見吉奈央", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "Ex進展ガールが多いほど", conditionThreshold: 35,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 0.45,
  },
  83: {
    name: "[放課後彼氏]玉井麗巳", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "Ex進展ガールが多いほど", conditionThreshold: 35,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 0.45,
  },

  82: {
    name: "[11周年]メモリアル", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "全タイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 26,
    value1: 3.5, value2: 3.5, value3: 3.5, value4: 4.0, value5: 5.5,
    factor: 1.75
  },

  84: {
    name: "[優しい手]鴫野睦", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 17,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 0.63,
  },
  87: {
    name: "[贅沢ﾀｲﾑ]天都かなた", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 17,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 0.63,
  },
  89: {
    name: "[想い感じて]春宮つぐみ", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 17,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 0.63,
  },

  85: {
    name: "[幸せの果実]小日向いちご", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "特定のガールで編成するほど", conditionThreshold: 8,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 0.5,
  },
  86: {
    name: "[ご注文は？]神楽坂砂夜", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "特定のガールで編成するほど", conditionThreshold: 8,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 0.5,
  },
  88: {
    name: "[きみと一緒]櫻井明音", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "特定のガールで編成するほど", conditionThreshold: 8,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 0.5,
  },

  91: {
    name: "[ﾛﾏﾝﾁｯｸに]望月エレナ", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "コストが高いほど", conditionThreshold: 30,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 1.3,
  },
  92: {
    name: "[幸せタイム]椎名心実", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "コストが高いほど", conditionThreshold: 30,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 1.3,
  },
  94: {
    name: "[乙女ﾌｨﾙﾀｰ]戸村美知留", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "コストが高いほど", conditionThreshold: 30,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 1.3,
  },

  93: {
    name: "[ﾙﾝﾙﾝ日和]優木苗", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 1.45,
  },
  95: {
    name: "[凛として]重藤秋穂", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 1.45,
  },
  101: {
    name: "[素直が一番]時谷小瑠璃", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 1.45,
  },

  96: {
    name: "[12周年]メモリアル", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "全タイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 4.0, value2: 4.0, value3: 4.0, value4: 4.5, value5: 5.5,
    factor: 1.17
  },

  97: {
    name: "[よそ見注意]朝比奈桃子", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 16,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 0.75,
  },
  98: {
    name: "[きみが一番]相楽エミ", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 16,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 0.75,
  },
  102: {
    name: "[幸せの共有]月隈林子", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 16,
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 7.0,
    factor: 0.75,
  },

  100: {
    name: "[力の源]桃子&柚子", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "全タイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 5.0, value2: 5.0, value3: 5.0, value4: 6.0, value5: 6.5,
    factor: 1.07
  },

  99: {
    name: "[高鳴る鼓動]真白透子", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "Ex進展ガールが多いほど", conditionThreshold: 35,
    value1: 6.0, value2: 6.0, value3: 6.0, value4: 7.0, value5: 8.0,
    factor: 0.42,
  },
  103: {
    name: "[勘違いﾊﾟﾆｯｸ]加賀美茉莉", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "Ex進展ガールが多いほど", conditionThreshold: 35,
    value1: 6.0, value2: 6.0, value3: 6.0, value4: 7.0, value5: 8.0,
    factor: 0.42,
  },
  104: {
    name: "[伝えたくて]玉井麗巳", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "Ex進展ガールが多いほど", conditionThreshold: 35,
    value1: 6.0, value2: 6.0, value3: 6.0, value4: 7.0, value5: 8.0,
    factor: 0.42,
  },

  106: {
    name: "[アツい展開]姫島木乃子", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "様々なガールで編成するほど", conditionThreshold: 25,
    value1: 6.0, value2: 6.0, value3: 6.0, value4: 7.0, value5: 8.0,
    factor: 1.5,
  },
  107: {
    name: "[私好みに]上条るい", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "様々なガールで編成するほど", conditionThreshold: 25,
    value1: 6.0, value2: 6.0, value3: 6.0, value4: 7.0, value5: 8.0,
    factor: 1.5,
  },

  108: {
    name: "[13周年]メモリアル", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "全タイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 18,
    value1: 4.5, value2: 4.5, value3: 4.5, value4: 5.5, value5: 6.5,
    factor: 2.01,
  },

  109: {
    name: "[小指の約束]浅見景", rarity: 3, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主＋副", effectType: "攻守UP",
    effectCondition: "コストが高いほど", conditionThreshold: 32,
    value1: 6.0, value2: 6.0, value3: 6.0, value4: 7.0, value5: 8.0,
    factor: 1.55,
  },
  // 92: {
  //   name: "[幸せタイム]椎名心実", rarity: 3, valueFormat: "割合(%)",
  //   effectTarget: "COOLタイプ", effectRange: "主＋副", effectType: "攻守UP",
  //   effectCondition: "コストが高いほど", conditionThreshold: 32,
  //   value1: 6.0, value2: 6.0, value3: 6.0, value4: 7.0, value5: 8.0,
  //   factor: 1.55,
  // },
  // 94: {
  //   name: "[乙女ﾌｨﾙﾀｰ]戸村美知留", rarity: 3, valueFormat: "割合(%)",
  //   effectTarget: "POPタイプ", effectRange: "主＋副", effectType: "攻守UP",
  //   effectCondition: "コストが高いほど", conditionThreshold: 32,
  //   value1: 6.0, value2: 6.0, value3: 6.0, value4: 7.0, value5: 8.0,
  //   factor: 1.55,
  // },

  /* 初期星2 */
  7: {
    name: "[緊張ﾁﾗｼ配ﾘ]白水六花", rarity: 2, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "副のみ", effectType: "攻援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 3.0, value2: 3.0, value3: 3.5, value4: 4.0, value5: 5.0,
    factor: 0.18,
  },
  11: {
    name: "[秘密の演技]椎名心実", rarity: 2, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "副のみ", effectType: "攻援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 3.0, value2: 3.0, value3: 3.5, value4: 4.0, value5: 5.0,
    factor: 0.18,
  },
  15: {
    name: "[必要なのは]酒井田夏海", rarity: 2, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "副のみ", effectType: "攻援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 3.0, value2: 3.0, value3: 3.5, value4: 4.0, value5: 5.0,
    factor: 0.18,
  },

  8: {
    name: "[偶然の…]奈木野さくら", rarity: 2, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "主のみ", effectType: "攻援UP",
    effectCondition: "Ex進展ガールが多いほど", conditionThreshold: 5,
    value1: 3.0, value2: 3.0, value3: 3.5, value4: 4.0, value5: 5.0,
    factor: 0.47,
  },
  10: {
    name: "[図書室にて]村上文緒", rarity: 2, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "主のみ", effectType: "攻援UP",
    effectCondition: "Ex進展ガールが多いほど", conditionThreshold: 5,
    value1: 3.0, value2: 3.0, value3: 3.5, value4: 4.0, value5: 5.0,
    factor: 0.47,
  },
  14: {
    name: "[放送室のｷﾐ]櫻井明音", rarity: 2, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "主のみ", effectType: "攻援UP",
    effectCondition: "Ex進展ガールが多いほど", conditionThreshold: 5,
    value1: 3.0, value2: 3.0, value3: 3.5, value4: 4.0, value5: 5.0,
    factor: 0.47,
  },

  9: {
    name: "[ｸﾛｴ探険隊!]クロエ・ルメール", rarity: 2, valueFormat: "割合(%)",
    effectTarget: "SWEETタイプ", effectRange: "副のみ", effectType: "守援UP",
    effectCondition: "特定のガールで編成するほど", conditionThreshold: 7,
    value1: 3.0, value2: 3.0, value3: 3.5, value4: 4.0, value5: 5.0,
    factor: 0.2,
  },
  12: {
    name: "[最悪な遭遇]月隈林子", rarity: 2, valueFormat: "割合(%)",
    effectTarget: "COOLタイプ", effectRange: "副のみ", effectType: "守援UP",
    effectCondition: "特定のガールで編成するほど", conditionThreshold: 7,
    value1: 3.0, value2: 3.0, value3: 3.5, value4: 4.0, value5: 5.0,
    factor: 0.2,
  },
  13: {
    name: "[楽しい時間]時谷小瑠璃", rarity: 2, valueFormat: "割合(%)",
    effectTarget: "POPタイプ", effectRange: "副のみ", effectType: "守援UP",
    effectCondition: "特定のガールで編成するほど", conditionThreshold: 7,
    value1: 3.0, value2: 3.0, value3: 3.5, value4: 4.0, value5: 5.0,
    factor: 0.2,
  },

  35: {
    name: "[8周年]メモリアル", rarity: 2, valueFormat: "割合(%)",
    effectTarget: "全タイプ", effectRange: "副のみ", effectType: "攻援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 25,
    value1: 3.0, value2: 3.0, value3: 3.5, value4: 4.0, value5: 5.0,
    factor: 1.6,
  },

  54: {
    name: "[9周年]メモリアル", rarity: 2, valueFormat: "割合(%)",
    effectTarget: "全タイプ", effectRange: "副のみ", effectType: "攻援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 3.0, value2: 3.0, value3: 3.5, value4: 4.5, value5: 5.5,
    factor: 1.7,
  },

  63: {
    name: "[私たちの音]心実&景", rarity: 2, valueFormat: "割合(%)",
    effectTarget: "全タイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 28,
    value1: 3.0, value2: 3.0, value3: 3.5, value4: 4.0, value5: 5.0,
    factor: 1.78,
  },

  65: {
    name: "[音にのせて]文緒&桃子&るい", rarity: 2, valueFormat: "割合(%)",
    effectTarget: "全タイプ", effectRange: "主＋副", effectType: "守援UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 15,
    value1: 3.0, value2: 3.0, value3: 3.5, value4: 4.0, value5: 5.0,
    factor: 1.56,
  },

  78: {
    name: "[総選挙2022]メモリアル", rarity: 2, valueFormat: "割合(%)",
    effectTarget: "全タイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "様々なガールで編成するほど", conditionThreshold: 25,
    value1: 3.0, value2: 3.0, value3: 3.5, value4: 4.0, value5: 5.0,
    factor: 1.1,
  },

  90: {
    name: "[総選挙2023]メモリアル", rarity: 2, valueFormat: "割合(%)",
    effectTarget: "全タイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 17,
    value1: 3.0, value2: 3.0, value3: 3.5, value4: 4.5, value5: 5.5,
    factor: 0.76,
  },

  105: {
    name: "[総選挙2024]メモリアル", rarity: 2, valueFormat: "割合(%)",
    effectTarget: "全タイプ", effectRange: "主＋副", effectType: "攻援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 31,
    value1: 3.5, value2: 3.5, value3: 4.0, value4: 5.0, value5: 6.0,
    factor: 0.85,
  },

  /* 初期星1 */
  16: {
    name: "クロエ・ルメール", rarity: 1, valueFormat: "固定値",
    effectTarget: "SWEETタイプ", effectRange: "副のみ", effectType: "攻援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 0.18,
  },
  20: {
    name: "村上文緒", rarity: 1, valueFormat: "固定値",
    effectTarget: "COOLタイプ", effectRange: "副のみ", effectType: "攻援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 0.18,
  },
  24: {
    name: "櫻井明音", rarity: 1, valueFormat: "固定値",
    effectTarget: "POPタイプ", effectRange: "副のみ", effectType: "攻援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 0.18,
  },

  17: {
    name: "風町陽歌", rarity: 1, valueFormat: "固定値",
    effectTarget: "SWEETタイプ", effectRange: "副のみ", effectType: "攻援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 23,
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 1.5,
  },
  21: {
    name: "上条るい", rarity: 1, valueFormat: "固定値",
    effectTarget: "COOLタイプ", effectRange: "副のみ", effectType: "攻援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 23,
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 1.5,
  },
  25: {
    name: "時谷小瑠璃", rarity: 1, valueFormat: "固定値",
    effectTarget: "POPタイプ", effectRange: "副のみ", effectType: "攻援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 23,
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 1.5,
  },

  18: {
    name: "白水六花", rarity: 1, valueFormat: "固定値",
    effectTarget: "SWEETタイプ", effectRange: "副のみ", effectType: "守援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 23,
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 1.5,
  },
  22: {
    name: "鴫野睦", rarity: 1, valueFormat: "固定値",
    effectTarget: "COOLタイプ", effectRange: "副のみ", effectType: "守援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 23,
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 1.5,
  },
  26: {
    name: "花房優輝", rarity: 1, valueFormat: "固定値",
    effectTarget: "POPタイプ", effectRange: "副のみ", effectType: "守援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 23,
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 1.5,
  },

  19: {
    name: "奈木野さくら", rarity: 1, valueFormat: "固定値",
    effectTarget: "SWEETタイプ", effectRange: "副のみ", effectType: "守援UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 15,
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 0.5,
  },
  23: {
    name: "月隈林子", rarity: 1, valueFormat: "固定値",
    effectTarget: "COOLタイプ", effectRange: "副のみ", effectType: "守援UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 15,
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 0.5,
  },
  27: {
    name: "酒井田夏海", rarity: 1, valueFormat: "固定値",
    effectTarget: "POPタイプ", effectRange: "副のみ", effectType: "守援UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 15,
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 0.5,
  },

  28: {
    name: "椎名心実", rarity: 1, valueFormat: "固定値",
    effectTarget: "全タイプ", effectRange: "副のみ", effectType: "攻援UP",
    effectCondition: "---",
    value1: 700, value2: 730, value3: 760, value4: 800, value5: 900,
  },

  32: {
    name: "重藤秋穂", rarity: 1, valueFormat: "固定値",
    effectTarget: "COOLタイプ", effectRange: "副のみ", effectType: "守援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 0.18,
  },
  33: {
    name: "葉月柚子", rarity: 1, valueFormat: "固定値",
    effectTarget: "POPタイプ", effectRange: "副のみ", effectType: "守援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 0.18,
  },
  34: {
    name: "優木苗", rarity: 1, valueFormat: "固定値",
    effectTarget: "SWEETタイプ", effectRange: "副のみ", effectType: "守援UP",
    effectCondition: "レアリティが高いほど", conditionThreshold: "UR",
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 0.18,
  },

  39: {
    name: "朝比奈桃子", rarity: 1, valueFormat: "固定値",
    effectTarget: "SWEETタイプ", effectRange: "副のみ", effectType: "守援UP",
    effectCondition: "特定のガールで編成するほど", conditionThreshold: 7,
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 0.2,
  },
  40: {
    name: "玉井麗巳", rarity: 1, valueFormat: "固定値",
    effectTarget: "POPタイプ", effectRange: "副のみ", effectType: "守援UP",
    effectCondition: "特定のガールで編成するほど", conditionThreshold: 7,
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 0.2,
  },
  41: {
    name: "神楽坂砂夜", rarity: 1, valueFormat: "固定値",
    effectTarget: "COOLタイプ", effectRange: "副のみ", effectType: "守援UP",
    effectCondition: "特定のガールで編成するほど", conditionThreshold: 7,
    value1: 800, value2: 830, value3: 860, value4: 900, value5: 1000,
    factor: 0.2,
  },

  47: {
    name: "浅見景", rarity: 1, valueFormat: "固定値",
    effectTarget: "全タイプ", effectRange: "副のみ", effectType: "攻援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 24,
    value1: 700, value2: 730, value3: 760, value4: 800, value5: 900,
    factor: 1.5,
  },

  48: {
    name: "姫島木乃子", rarity: 1, valueFormat: "固定値",
    effectTarget: "全タイプ", effectRange: "副のみ", effectType: "守援UP",
    effectCondition: "コストが高いほど", conditionThreshold: 24,
    value1: 700, value2: 730, value3: 760, value4: 800, value5: 900,
    factor: 1.5,
  },

  51: {
    name: "篠宮りさ", rarity: 1, valueFormat: "固定値",
    effectTarget: "全タイプ", effectRange: "副のみ", effectType: "守援UP",
    effectCondition: "声援Lvが高いほど", conditionThreshold: 15,
    value1: 700, value2: 730, value3: 760, value4: 800, value5: 900,
    factor: 1.25,
  },
} as const;
