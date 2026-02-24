export interface BoardWeatherEffect {
  name: string,
  effectType:
    | "ガール" | "ぷちセンバツ" | "応援力効果" | "声援効果" | "Ex進展ボーナス"
    | "センバツボーナス" | "SP応援効果" | "なし";
  effectValue: number;
  condition: {
    isPreSelect?: boolean;
    type?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ";
    rarityNum?: number;
    cost?: number;
    skillLv?: number;
  };
}

export interface BoardWeather {
  name: string;
  effectList: BoardWeatherEffect[];
};

export const BOARD_WEATHER_DATA: { [K: number]: BoardWeather } = {
  0: {
    name: "無効",
    effectList: [
      { name: "―", effectType: "なし", effectValue: 0, condition: {} },
      { name: "―", effectType: "なし", effectValue: 0, condition: {} },
      { name: "―", effectType: "なし", effectValue: 0, condition: {} },
      { name: "―", effectType: "なし", effectValue: 0, condition: {} },
    ],
  },
  1: {
    name: "晴れ(12℃)",
    effectList: [
      { name: "POPガールの攻援力", effectType: "ガール", effectValue: 30, condition: { type: "POPタイプ" } },
      { name: "SP応援効果", effectType: "SP応援効果", effectValue: 20, condition: {} },
      { name: "コスト25以上ガールの攻援力", effectType: "ガール", effectValue: 30, condition: { cost: 25 } },
      { name: "SWEETガールの攻援力", effectType: "ガール", effectValue: -20, condition: { type: "SWEETタイプ" } },
    ],
  },
  2: {
    name: "くもり(13℃)",
    effectList: [
      { name: "SWEETガールの攻援力", effectType: "ガール", effectValue: 30, condition: { type: "SWEETタイプ" } },
      { name: "ぷち応援力効果", effectType: "応援力効果", effectValue: 30, condition: {} },
      { name: "URガールの攻援力", effectType: "ガール", effectValue: 30, condition: { rarityNum: 7 } },
      { name: "COOLガールの攻援力", effectType: "ガール", effectValue: -20, condition: { type: "COOLタイプ" } },
    ],
  },
  3: {
    name: "雨(10℃)",
    effectList: [
      { name: "COOLガールの攻援力", effectType: "ガール", effectValue: 30, condition: { type: "COOLタイプ" } },
      { name: "声援効果", effectType: "声援効果", effectValue: 30, condition: {} },
      { name: "声援Lv.15以上のガールの攻援力", effectType: "ガール", effectValue: 30, condition: { skillLv: 15 } },
      { name: "POPガールの攻援力", effectType: "ガール",  effectValue: -20, condition: { type: "POPタイプ" } },
    ],
  },
  4: {
    name: "晴れ(14℃)",
    effectList: [
      { name: "声援Lv.12以上かつコスト25以上ガールの攻援力", effectType: "ガール", effectValue: 30, condition: { cost: 25, skillLv: 12 } },
      { name: "SP応援効果", effectType: "SP応援効果", effectValue: 20, condition: {} },
      { name: "センバツボーナス効果", effectType: "センバツボーナス", effectValue: 5, condition: {} },
      { name: "―", effectType: "なし", effectValue: 0, condition: {} },
    ],
  },
} as const;

