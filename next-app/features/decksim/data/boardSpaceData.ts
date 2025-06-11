export interface BoardSpaceEffect {
  name: string,
  effectType:
    | "ガール" | "ぷちセンバツ" | "応援力効果" | "声援効果" | "Ex進展ボーナス"
    | "センバツボーナス" | "SP応援効果" | "スキル効果" | "なし";
  condition: {
    isPreSelect?: boolean;
    type?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "全タイプ";
    rarityNum?: number;
    cost?: number;
    skillLv?: number;
    grade?: "1年生" | "2年生" | "3年生" | "その他";
  };
};

export const BOARD_SPACE_DATA: { [K: number]: BoardSpaceEffect } = {
  1: { name: "SWEETガールの攻援力", effectType: "ガール", condition: { type: "SWEETタイプ" } },
  2: { name: "COOLガールの攻援力", effectType: "ガール", condition: { type: "COOLタイプ" } },
  3: { name: "POPガールの攻援力", effectType: "ガール", condition: { type: "POPタイプ" } },
  4: { name: "1年生の攻援力", effectType: "ガール", condition: { grade: "1年生" } },
  5: { name: "2年生の攻援力", effectType: "ガール", condition: { grade: "2年生" } },
  6: { name: "3年生の攻援力", effectType: "ガール", condition: { grade: "3年生" } },
  7: { name: "声援Lv.13以上かつコスト24以上ガールの攻援力", effectType: "ガール", condition: { cost: 24, skillLv: 13 } },
  8: { name: "コスト26以上ガールの攻援力", effectType: "ガール", condition: { cost: 26 } },
  9: { name: "声援Lv.16以上ガールの攻援力", effectType: "ガール", condition: { skillLv: 16 } },
  10: { name: "URガールの攻援力", effectType: "ガール", condition: { rarityNum: 7 } },
  11: { name: "ぷちセンバツの攻援力", effectType: "ぷちセンバツ", condition: { type: "全タイプ"} },
  12: { name: "ぷち応援力効果", effectType: "応援力効果", condition: {} },
  13: { name: "ぷちスキル効果", effectType: "スキル効果", condition: {} },
  14: { name: "声援効果", effectType: "声援効果", condition: {} },
  15: { name: "センバツボーナス効果", effectType: "センバツボーナス", condition: {} },
  16: { name: "SP応援効果", effectType: "SP応援効果", condition: {} },
} as const;

export const BOARD_SPACE_EFFECTS_NAME_TO_ID: {
  [K: (typeof BOARD_SPACE_DATA)[number]["name"]]: keyof typeof BOARD_SPACE_DATA
} = {
  "SWEETガールの攻援力": 1,
  "COOLガールの攻援力": 2,
  "POPガールの攻援力": 3,
  "1年生の攻援力": 4,
  "2年生の攻援力": 5,
  "3年生の攻援力": 6,
  "声援Lv.13以上かつコスト24以上ガールの攻援力": 7,
  "コスト26以上ガールの攻援力": 8,
  "声援Lv.16以上ガールの攻援力": 9,
  "URガールの攻援力": 10,
  "ぷちセンバツの攻援力": 11,
  "ぷち応援力効果": 12,
  "ぷちスキル効果": 13,
  "声援効果": 14,
  "センバツボーナス効果": 15,
  "SP応援効果": 16,
} as const;
