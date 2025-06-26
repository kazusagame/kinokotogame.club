const BOARD_WEATHER_ID_CONVERT = {
  なし: "0",
  "晴れ(15℃)": "1",
  "雨(14℃)": "2",
  "くもり(17℃)": "3",
  "晴れ(19℃)": "4",
};

const BOARD_WEATHER_LIST = [
  {
    id: "0",
    name: "なし",
    "effect-list": [
      { name: "―", effect: "invalid", rate: 0 },
      { name: "―", effect: "invalid", rate: 0 },
      { name: "―", effect: "invalid", rate: 0 },
      { name: "―", effect: "invalid", rate: 0 },
    ],
  },
  {
    id: "1",
    name: "くもり(28℃)",
    "effect-list": [
      {
        name: "SWEETガールの攻援力",
        condition: { type: "Sweet" },
        effect: "girl",
        rate: 30,
      },
      {
        name: "SP応援効果",
        condition: {
          /* */
        },
        effect: "spgirls",
        rate: 20,
      },
      {
        name: "コスト25以上ガールの攻援力",
        condition: { highercost: 25 },
        effect: "girl",
        rate: 30,
      },
      {
        name: "POPガールの攻援力",
        condition: { type: "Pop" },
        effect: "girl",
        rate: -20,
      },
    ],
  },
  {
    id: "2",
    name: "雨(26℃)",
    "effect-list": [
      {
        name: "COOLガールの攻援力",
        condition: { type: "Cool" },
        effect: "girl",
        rate: 30,
      },
      {
        name: "ぷち応援力効果",
        condition: {
          /* */
        },
        effect: "petit-effect",
        rate: 30,
      },
      {
        name: "URガールの攻援力",
        condition: { higherrarity: 7 },
        effect: "girl",
        rate: 30,
      },
      {
        name: "SWEETガールの攻援力",
        condition: { type: "Sweet" },
        effect: "girl",
        rate: -20,
      },
    ],
  },
  {
    id: "3",
    name: "晴れ(30℃)",
    "effect-list": [
      {
        name: "POPガールの攻援力",
        condition: { type: "Pop" },
        effect: "girl",
        rate: 30,
      },
      {
        name: "声援効果",
        condition: {
          /* */
        },
        effect: "skill-effect",
        rate: 30,
      },
      {
        name: "声援Lv.15以上のガールの攻援力",
        condition: { higherskilllv: 15 },
        effect: "girl",
        rate: 30,
      },
      {
        name: "COOLガールの攻援力",
        condition: { type: "Cool" },
        effect: "girl",
        rate: -20,
      },
    ],
  },
  {
    id: "4",
    name: "晴れ(33℃)",
    "effect-list": [
      {
        name: "声援Lv.12以上かつコスト25以上ガールの攻援力",
        condition: { highercost: 25, higherskilllv: 12 },
        effect: "girl",
        rate: 30,
      },
      {
        name: "SP応援効果",
        condition: {
          /* */
        },
        effect: "spgirls",
        rate: 20,
      },
      {
        name: "センバツボーナス効果",
        condition: {
          /* */
        },
        effect: "deckbonus",
        rate: 5,
      },
      { name: "―", effect: "invalid", rate: 0 },
    ],
  },
];

const BOARD_SPACE_EFFECT_CONVERT = {
  SWEETガールの攻援力: "1",
  COOLガールの攻援力: "2",
  POPガールの攻援力: "3",
  "1年生の攻援力": "4",
  "2年生の攻援力": "5",
  "3年生の攻援力": "6",
  "声援Lv.13以上かつコスト24以上ガールの攻援力": "7",
  コスト26以上ガールの攻援力: "8",
  "声援Lv.16以上ガールの攻援力": "9",
  URガールの攻援力: "10",
  ぷちセンバツの攻援力: "11",
  ぷち応援力効果: "12",
  ぷちスキル効果: "13",
  声援効果: "14",
  センバツボーナス効果: "15",
  SP応援効果: "16",
};
const BOARD_SPACE_EFFECT_LIST = [
  {
    id: "1",
    name: "SWEETガールの攻援力",
    effect: "girl",
    condition: { type: "Sweet" },
  },
  {
    id: "2",
    name: "COOLガールの攻援力",
    effect: "girl",
    condition: { type: "Cool" },
  },
  {
    id: "3",
    name: "POPガールの攻援力",
    effect: "girl",
    condition: { type: "Pop" },
  },
  {
    id: "4",
    name: "1年生の攻援力",
    effect: "girl",
    condition: { grade: "1" },
  },
  {
    id: "5",
    name: "2年生の攻援力",
    effect: "girl",
    condition: { grade: "2" },
  },
  {
    id: "6",
    name: "3年生の攻援力",
    effect: "girl",
    condition: { grade: "3" },
  },
  {
    id: "7",
    name: "声援Lv.13以上かつコスト24以上ガールの攻援力",
    effect: "girl",
    condition: { highercost: 24, higherskilllv: 13 },
  },
  {
    id: "8",
    name: "コスト26以上ガールの攻援力",
    effect: "girl",
    condition: { highercost: 26 },
  },
  {
    id: "9",
    name: "声援Lv.16以上ガールの攻援力",
    effect: "girl",
    condition: { higherskilllv: 16 },
  },
  {
    id: "10",
    name: "URガールの攻援力",
    effect: "girl",
    condition: { higherrarity: 7 },
  },
  {
    id: "11",
    name: "ぷちセンバツの攻援力",
    effect: "petit-girl",
    condition: { type: "All" },
  },
  {
    id: "12",
    name: "ぷち応援力効果",
    effect: "petit-effect",
    condition: {
      /* */
    },
  },
  {
    id: "13",
    name: "ぷちスキル効果",
    effect: "petit-skill",
    condition: {
      /* */
    },
  },
  {
    id: "14",
    name: "声援効果",
    effect: "skill-effect",
    condition: {
      /* */
    },
  },
  {
    id: "15",
    name: "センバツボーナス効果",
    effect: "deckbonus",
    condition: {
      /* */
    },
  },
  {
    id: "16",
    name: "SP応援効果",
    effect: "spgirls",
    condition: {
      /* */
    },
  },
];
