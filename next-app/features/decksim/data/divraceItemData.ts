export interface DivraceItem {
  name: string;
  description: string;
  effectType:
    | "ガール" | "ぷちセンバツ" | "応援力効果" | "声援効果" | "Ex進展ボーナス"
    | "センバツボーナス";
  effectValue: number;
  condition: {
    isPreSelect?: boolean;
    type?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "全タイプ";
    rarityNum?: number;
    cost?: number;
    skillLv?: number;
  };
};

export const DIVRACE_ITEMS_DATA: { [K: number]: DivraceItem } = {
  1: {
    name: "お月見団子", description: "予選で選択したガールの攻援力が30%UP",
    effectType: "ガール", effectValue: 30,
    condition: { isPreSelect: true },
  },
  2: {
    name: "吊るし飾り", description: "URガールの攻援力が30%UP",
    effectType: "ガール", effectValue: 30,
    condition: { rarityNum: 7 },
  },
  3: {
    name: "マスコット", description: "SWEETガールの攻援力が30%UP",
    effectType: "ガール", effectValue: 30,
    condition: { type: "SWEETタイプ" },
  },
  4: {
    name: "すすき", description: "COOLガールの攻援力が30%UP",
    effectType: "ガール", effectValue: 30,
    condition: { type: "COOLタイプ" },
  },
  5: {
    name: "三色だんご", description: "POPガールの攻援力が30%UP",
    effectType: "ガール", effectValue: 30,
    condition: { type: "POPタイプ" },
  },
  6: {
    name: "月餅", description: "コスト29以上のガールの攻援力が40%UP",
    effectType: "ガール", effectValue: 40,
    condition: { cost: 29 },
  },
  7: {
    name: "お抹茶", description: "声援Lv.16以上のガールの攻援力が40%UP",
    effectType: "ガール", effectValue: 40,
    condition: { skillLv: 16 },
  },
  8: {
    name: "扇", description: "ぷちセンバツの攻援力が60%UP",
    effectType: "ぷちセンバツ", effectValue: 60,
    condition: {},
  },
  9: {
    name: "ハンカチ", description: "ぷちセンバツの応援力効果が55%UP",
    effectType: "応援力効果", effectValue: 55,
    condition: {},
  },
  10: {
    name: "携帯", description: "声援の効果が50%UP",
    effectType: "声援効果", effectValue: 50,
    condition: {},
  },
  11: {
    name: "風鈴", description: "Ex進展ボーナスの効果が25倍に",
    effectType: "Ex進展ボーナス", effectValue: 2500, /* ゲーム動作に合わせて "効果が26倍 (2500％UP)" に設定 */
    condition: {},
  },
  12: {
    name: "甘酒", description: "センバツボーナスの効果が15%UP",
    effectType: "センバツボーナス", effectValue: 15,
    condition: {},
  },
  13: {
    name: "ミネラルウォーター", description: "声援Lv.13以上のコスト27以上ガールの攻援力が40%UP",
    effectType: "ガール", effectValue: 40,
    condition: { skillLv: 13, cost: 27 },
  },
  14: {
    name: "和菓子", description: "コスト25以上のURガールの攻援力が40%UP",
    effectType: "ガール", effectValue: 40,
    condition: { cost: 25, rarityNum: 7 },
  },
  15: {
    name: "果物", description: "声援Lv.17以上のURガールの攻援力が40%UP",
    effectType: "ガール", effectValue: 40,
    condition: { skillLv: 17, rarityNum: 7 },
  },
} as const;