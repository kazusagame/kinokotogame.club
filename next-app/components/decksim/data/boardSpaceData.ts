export interface BoardSpace {
  name: string,
  effectType:
    | "ガール" | "ぷちセンバツ" | "応援力効果" | "声援効果" | "Ex進展ボーナス"
    | "センバツボーナス" | "SP応援効果" | "スキル効果" | "なし";
  condition: {
    isPreSelect?: boolean;
    type?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ";
    rarityNum?: number;
    cost?: number;
    skillLv?: number;
    grade?: "1年生" | "2年生" | "3年生" | "その他";
  };
};

export const DIVRACE_SPACE_DATA: { [K: number]: BoardSpace } = {
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
  11: { name: "ぷちセンバツの攻援力", effectType: "ぷちセンバツ", condition: {} },
  12: { name: "ぷち応援力効果", effectType: "応援力効果", condition: {} },
  13: { name: "ぷちスキル効果", effectType: "スキル効果", condition: {} },
  14: { name: "声援効果", effectType: "声援効果", condition: {} },
  15: { name: "センバツボーナス効果", effectType: "センバツボーナス", condition: {} },
  16: { name: "SP応援効果", effectType: "SP応援効果", condition: {} },
} as const;

