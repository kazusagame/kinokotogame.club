"use strict";

const MAX_MAIN_GIRLS = 5;
const MAX_MAIN_GIRLS_CHAMP = 10;
const MAX_MAIN_GIRLS_DIVRACE = 5;
const MAX_SUB_GIRLS = 60;
const MAX_SUB_GIRLS_CHAMP = 25;
const MAX_SUB_GIRLS_DIVRACE = 45;
const MAX_SUB_GIRLS_MEGA = 0;
const MAX_SWITCH_GIRLS = 5;
const MAX_SWITCH_GIRLS_MEGA = 0;
const MAX_PRECIOUS_SCENES = 3;
const MAX_PETIT_GIRLS = 3;
const MAX_PETIT_GIRLS_SUB_SKILL = 3;
const MAX_PETIT_GIRLS_SUB_NORMAL = 6;
const MAX_SKILL_LEVEL = 18;
const INIT_SKILL_LEVEL = 12;
const MAX_SKILL_SUB_MEMBER = 35;
const MAX_WEATHER_EFFECT = 4;
const MAX_SPACE_EFFECT = 16;

const SKILL_CHANCE_MAINLIMIT_3 = [
  "100.00", " 30.00", " 30.00", " 27.30", " 23.52",
  " 19.55", " 15.85", " 12.61", "  9.88", "  7.66",
];
const SKILL_CHANCE_MAINLIMIT_3_ALWAYS = [
  "100.00", "100.00", "100.00", "  0.00", "  0.00",
  "  0.00", "  0.00", "  0.00", "  0.00", "  0.00",
];
const SKILL_CHANCE_MAINLIMIT_5 = [
  "100.00", " 30.00", " 30.00", " 30.00", " 30.00",
  " 29.76", " 29.08", " 27.89", " 26.22", " 24.18",
];
const SKILL_CHANCE_MAINLIMIT_5_ALWAYS = [
  "100.00", "100.00", "100.00", "100.00", "100.00",
  "  0.00", "  0.00", "  0.00", "  0.00", "  0.00",
];
const SKILL_CHANCE_SWITCHLIMIT_2 = [
  " 30.00", " 30.00", " 27.30", " 23.52", " 19.55",
  " 15.85", " 12.61", "  9.88", "  7.66", "  5.88",
];
const SKILL_CHANCE_SWITCHLIMIT_2_ALWAYS = [
  "100.00", "100.00", "  0.00", "  0.00", "  0.00",
  "  0.00", "  0.00", "  0.00", "  0.00", "  0.00",
];
const SKILL_CHANCE_SWITCHLIMIT_0 = [
  "  0.00", "  0.00", "  0.00", "  0.00", "  0.00",
  "  0.00", "  0.00", "  0.00", "  0.00", "  0.00",
];

const RARITY_TO_NUM_ARRAY = {
  Luv: 7, UR: 7, SSR: 6, SR: 5,
};

const EVENT_NAME_CONVERT = {
  "raid-first": "たすけて！マイヒーロー 前半",
  "raid-second-attack": "たすけて！マイヒーロー 後半攻援",
  "raid-second-defence": "たすけて！マイヒーロー 後半守援",
  "raid-mega": "たすけて！マイヒーロー メガ悪男",
  "raidwar": "おねがい★ハンターズ",
  "raidwar-skill": "おねがい★ハンターズ ハンター声援",
  "clubcup": "部活対抗！勧誘★グランプリ",
  "championship": "聖櫻学園★カリスマ決定戦 攻援",
  "championship-defence": "聖櫻学園★カリスマ決定戦 守援",
  "tower": "聖櫻学園メモリアルストーリー",
  "divrace": "全国高校生課外活動コンテスト",
  "board": "散策♪聖櫻ワールド",
  "normal-battle": "通常バトル",
};

const BONUS_VALUE_ARRAY = {
  typematch: { attack: 5, defence: 5 },
  clubmatch: { attack: 10, defence: 10 },
  clubitem: { attack: 2, defence: 2 },
  clubposition: {
    attack: { leader: 2, subleader: 2, attackcap: 5, defencecap: 0, member: 0 },
    defence: { leader: 2, subleader: 2, attackcap: 0, defencecap: 5, member: 0 }
  },
  deck: {
    normal: {
      attack: { Lv0: 0, Lv1: 3, Lv2: 8, Lv3: 13, Lv4: 18, Lv5: 23, Lv6: 28, Lv7: 33, Lv8: 38 },
      defence: { Lv0: 0, Lv1: 3, Lv2: 8, Lv3: 13, Lv4: 18, Lv5: 23, Lv6: 28, Lv7: 33, Lv8: 38 },
      both: { Lv0: 0, Lv1: 3, Lv2: 8, Lv3: 13, Lv4: 18, Lv5: 23, Lv6: 28, Lv7: 33, Lv8: 38 }
    },
    shine: {
      both: { Lv0: 0, Lv1: 3, Lv2: 5, Lv3: 7, Lv4: 9, Lv5: 11 }
    },
    precious: {
      both: { Lv0: 0, Lv1: 5, Lv2: 10, Lv3: 15 }
    }
  },
  date: {
    attack: { Luv: 100, UR: 100, SSR: 80, SR: 70 },
    defence: { Luv: 100, UR: 100, SSR: 80, SR: 70 }
  },
  touch: { attack: 20, defence: 20 },
  birthday: { attack: 20, defence: 20 },
  limitbreak: { attack: 3, defence: 3, probability: 20 },
  towerspecial: {
    attack: {
      Luv: { 10: 68, 11: 68.4, 12: 68.8, 13: 69.2, 14: 69.6, 15: 70, 16: 72.5, 17: 75.0, 18: 77.5 },
      UR: { 10: 68, 11: 68.4, 12: 68.8, 13: 69.2, 14: 69.6, 15: 70, 16: 72.5, 17: 75.0, 18: 77.5 },
      SSR: { 10: 58, 11: 58.4, 12: 58.8, 13: 59.2, 14: 59.6, 15: 60, 16: 62.5, 17: 65.0, 18: 67.5 },
      SR: { 10: 10, 11: 10, 12: 10, 13: 10, 14: 10, 15: 10, 16: 10, 17: 10, 18: 10 }
    }
  },
  raidspecial: {
    superrare: {
      attack: {
        Normal: { Pop: 0, Sweet: 0, Cool: 0 },
        Sweet: { Pop: 30, Sweet: 0, Cool: -30 },
        Cool: { Pop: -30, Sweet: 30, Cool: 0 },
        Pop: { Pop: 0, Sweet: -30, Cool: 30 }
      },
      defence: {
        Normal: { Pop: 0, Sweet: 0, Cool: 0 },
        Sweet: { Pop: 30, Sweet: 0, Cool: -30 },
        Cool: { Pop: -30, Sweet: 30, Cool: 0 },
        Pop: { Pop: 0, Sweet: -30, Cool: 30 }
      }
    },
    mega: {
      attack: {
        Normal: {
          Pop: { scenes: 0, strap: 0, precious: 0 },
          Sweet: { scenes: 0, strap: 0, precious: 0 },
          Cool: { scenes: 0, strap: 0, precious: 0 }
        },
        Sweet: {
          Pop: { scenes: 20, strap: 20, precious: 30 },
          Sweet: { scenes: 0, strap: 0, precious: 0 },
          Cool: { scenes: -20, strap: -20, precious: -30 }
        },
        Cool: {
          Pop: { scenes: -20, strap: -20, precious: -30 },
          Sweet: { scenes: 20, strap: 20, precious: 30 },
          Cool: { scenes: 0, strap: 0, precious: 0 }
        },
        Pop: {
          Pop: { scenes: 0, strap: 0, precious: 0 },
          Sweet: { scenes: -20, strap: -20, precious: -30 },
          Cool: { scenes: 20, strap: 20, precious: 30 }
        }
      }
    },
    combo: { 0: 0.0, 1: 0.1, 5: 0.2, 10: 0.4, 50: 0.8, 100: 1.0 },
    heart: { 1: 1, 6: 6, 12: 12 }
  },
  clubcupspecial: { winbonus: 10 },
  raidwarSpecial: {
    combo: {
      0: 0.0, 6: 0.3, 12: 0.6, 18: 0.9, 24: 1.2, 30: 1.4,
      36: 1.58, 42: 1.76, 48: 1.94, 50: 2.0
    },
    heart: {
      1: 1, 6: 6, 12: 12
    }
  },
  championshipSpecial: {
    heart: {
      battle: { 1: 1.0, 2: 1.5, 3: 2.0, 4: 2.5, 5: 3.5 },
      "time-normal": { 1: 1.0, 2: 2.2, 3: 3.5, 4: 4.8, 5: 6.5 },
      "time-rare": { 1: 1.0, 2: 2.2, 3: 3.5, 4: 4.8, 5: 6.5 }
    },
    tensionMax: 2.0
  },
};

const BONUS_RATE_ARRAY = {
  "raid-first": {
    "main-scenes": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-strap": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-precious": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 100, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "sub-scenes": {
      base: 50, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 50, touch: 0, birthday: 50, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 80
    },
    "sub-strap": {
      base: 0, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    },
    "sub-precious": {
      base: 50, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 50, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 80
    },
    "petit-girls": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    }
  },
  "raid-second-attack": {
    "main-scenes": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-strap": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-precious": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 100, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "sub-scenes": {
      base: 50, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 50, touch: 0, birthday: 50, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 80
    },
    "sub-strap": {
      base: 0, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    },
    "sub-precious": {
      base: 50, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 50, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 80
    },
    "petit-girls": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    }
  },
  "raid-second-defence": {
    "main-scenes": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-strap": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-precious": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 100, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "sub-scenes": {
      base: 50, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 50, touch: 0, birthday: 50, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 80
    },
    "sub-strap": {
      base: 0, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    },
    "sub-precious": {
      base: 50, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 50, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 80
    },
    "petit-girls": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    }
  },
  "raid-mega": {
    "main-scenes": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-strap": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-precious": {
      base: 200, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 200, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "sub-scenes": {
      base: 0, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    },
    "sub-strap": {
      base: 0, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    },
    "sub-precious": {
      base: 0, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    },
    "petit-girls": {
      base: 25, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    }
  },
  raidwar: {
    "main-scenes": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-strap": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-precious": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 100, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "sub-scenes": {
      base: 80, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 80, touch: 80, birthday: 80, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 80
    },
    "sub-strap": {
      base: 0, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    },
    "sub-precious": {
      base: 80, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 0, date: 80, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 80
    },
    "petit-girls": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    }
  },
  clubcup: {
    "main-scenes": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 100, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-strap": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 100, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 0
    },
    "main-precious": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 100, date: 100, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 0
    },
    "sub-scenes": {
      base: 80, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 100, date: 80, touch: 0, birthday: 80, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 80
    },
    "sub-strap": {
      base: 0, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    },
    "sub-precious": {
      base: 80, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 100, date: 80, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 0
    },
    "petit-girls": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    }
  },
  championship: {
    "main-scenes": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 100, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-strap": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 100, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-precious": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 100, date: 100, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "sub-scenes": {
      base: 80, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 80, date: 80, touch: 80, birthday: 80, menscologne: 80,
      petit_effects: 80, limitbreak: 80, skill: 80
    },
    "sub-strap": {
      base: 0, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    },
    "sub-precious": {
      base: 80, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 80, date: 80, touch: 0, birthday: 0, menscologne: 80,
      petit_effects: 80, limitbreak: 80, skill: 80
    },
    "petit-girls": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    }
  },
  "championship-defence": {
    "main-scenes": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 100, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-strap": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 100, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-precious": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 100, date: 100, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "sub-scenes": {
      base: 80, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 80, date: 80, touch: 80, birthday: 80, menscologne: 80,
      petit_effects: 80, limitbreak: 80, skill: 80
    },
    "sub-strap": {
      base: 0, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    },
    "sub-precious": {
      base: 80, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 80, date: 80, touch: 0, birthday: 0, menscologne: 80,
      petit_effects: 80, limitbreak: 80, skill: 80
    },
    "petit-girls": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    }
  },
  tower: {
    "main-scenes": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 100, clubposition: 0,
      deck: 100, date: 100, touch: 100, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-strap": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 100, clubposition: 0,
      deck: 100, date: 100, touch: 100, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-precious": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 100, clubposition: 0,
      deck: 100, date: 100, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "sub-scenes": {
      base: 50, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 50, date: 50, touch: 0, birthday: 0, menscologne: 50,
      petit_effects: 50, limitbreak: 100, skill: 80
    },
    "sub-strap": {
      base: 0, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    },
    "sub-precious": {
      base: 50, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 50, date: 50, touch: 0, birthday: 0, menscologne: 50,
      petit_effects: 50, limitbreak: 100, skill: 80
    },
    "petit-girls": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    }
  },
  divrace: {
    "main-scenes": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 100, date: 0, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-strap": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 100, date: 0, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-precious": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 100, date: 0, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "sub-scenes": {
      base: 80, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 80, date: 0, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 80
    },
    "sub-strap": {
      base: 0, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    },
    "sub-precious": {
      base: 80, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 80, date: 0, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 80
    },
    "petit-girls": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    }
  },
  board: {
    "main-scenes": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 100, date: 0, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-strap": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 100, date: 0, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-precious": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 100, date: 0, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "sub-scenes": {
      base: 80, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 80, date: 0, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 80
    },
    "sub-strap": {
      base: 0, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    },
    "sub-precious": {
      base: 80, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 80, date: 0, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 80
    },
    "petit-girls": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    }
  },
  "normal-battle": {
    "main-scenes": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 100, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-strap": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 100, date: 100, touch: 100, birthday: 100, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "main-precious": {
      base: 100, typematch: 100, clubmatch: 100, clubitem: 100, clubposition: 100,
      deck: 100, date: 100, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 100
    },
    "sub-scenes": {
      base: 80, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 100, date: 80, touch: 0, birthday: 80, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 80
    },
    "sub-strap": {
      base: 0, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    },
    "sub-precious": {
      base: 80, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 100, date: 80, touch: 0, birthday: 0, menscologne: 100,
      petit_effects: 100, limitbreak: 100, skill: 80
    },
    "petit-girls": {
      base: 100, typematch: 0, clubmatch: 0, clubitem: 0, clubposition: 0,
      deck: 0, date: 0, touch: 0, birthday: 0, menscologne: 0,
      petit_effects: 0, limitbreak: 0, skill: 0
    }
  },
};

const POINT_RATE_ARRAY = {
  "raid-first": 3.5,
  "raid-second-attack": 3.5,
  "raid-second-defence": 3.5,
  "raid-mega": 5.9,
  "raidwar": {
    "SSR": 1.0, "SR-Lv50": 2.0, "SR-Lv59": 2.5, "SR-Lv64": 3.0
  },
  "clubcup": {
    "bottle": { 1: 1.0, 3: 3.0 }, "leaders": 0.05
  },
  "championship": {
    "time-normal": 1.0, "time-rare": 3.0
  },
};

const SKILL_MATRIX = [
  /* 中 中+ 大 特大 特大+ ｽｰﾊﾟｰ特大 ｽｰﾊﾟｰ特大+ ｽｰﾊﾟｰ特大++ 超ｽｰﾊﾟｰ特大UP 中++ 特大++ */
  [
    /* 単ﾀｲﾌﾟ */
    [
      /* 主+副 */
      [
        /* 副人数 0 (異常な組み合わせ -> 副人数 1 をコピー) */
        [0, 0, 0, 34, 0, 44, 0, 0, 55, 0, 0], // 攻
        [0, 0, 0, 34, 0, 44, 0, 0, 55, 0, 0], // 守
        [22, 0, 29, 35, 0, 0, 44, 49, 0, 0, 0], // 攻守
      ], [
        /* 副人数 1 */
        [0, 0, 0, 34, 0, 44, 0, 0, 55, 0, 0], // 攻
        [0, 0, 0, 34, 0, 44, 0, 0, 55, 0, 0], // 守
        [22, 0, 29, 35, 0, 0, 44, 49, 0, 0, 0], // 攻守
      ], [
        /* 副人数 2 (主+副ラブリーのみ) */
        [0, 0, 30, 0, 35, 0, 0, 0, 0, 0, 37], // 攻
        [0, 0, 30, 0, 35, 0, 0, 0, 0, 0, 37], // 守
        [0, 0, 30, 0, 35, 0, 0, 0, 0, 0, 37], // 攻守
      ],
    ], [
      /* 主 */
      [
        /* 副人数 0 */
        [24, 0, 27, 34, 0, 44, 0, 0, 55, 0, 0], // 攻
        [24, 0, 27, 34, 0, 44, 0, 0, 55, 0, 0], // 守
        [22, 0, 29, 36, 0, 42, 44, 0, 0, 0, 0], // 攻守
      ], [
        /* 副人数 1 (異常な組み合わせ -> 副人数 0 をコピー) */
        [24, 0, 27, 34, 0, 44, 0, 0, 55, 0, 0], // 攻
        [24, 0, 27, 34, 0, 44, 0, 0, 55, 0, 0], // 守
        [22, 0, 29, 36, 0, 42, 44, 0, 0, 0, 0], // 攻守
      ], [
        /* 副人数 2 (異常な組み合わせ -> 副人数 0 をコピー) */
        [24, 0, 27, 34, 0, 44, 0, 0, 55, 0, 0], // 攻
        [24, 0, 27, 34, 0, 44, 0, 0, 55, 0, 0], // 守
        [22, 0, 29, 36, 0, 42, 44, 0, 0, 0, 0], // 攻守
      ],
    ], [
      /* 副 */
      [
        /* 副人数 0 (異常な組み合わせ -> 副人数 2 をコピー) */
        [0, 25, 30, 35, 0, 0, 0, 0, 0, 0, 0], // 攻
        [0, 25, 30, 35, 0, 0, 0, 0, 0, 0, 0], // 守
        [0, 25, 30, 35, 0, 0, 0, 0, 0, 0, 0], // 攻守
      ], [
        /* 副人数 1 (異常な組み合わせ -> 副人数 2 をコピー) */
        [0, 25, 30, 35, 0, 0, 0, 0, 0, 0, 0], // 攻
        [0, 25, 30, 35, 0, 0, 0, 0, 0, 0, 0], // 守
        [0, 25, 30, 35, 0, 0, 0, 0, 0, 0, 0], // 攻守
      ], [
        /* 副人数 2 (副ラブリーと王冠と副10大、コンテストスペシャルガール) */
        [0, 25, 30, 35, 0, 0, 0, 0, 0, 26, 0], // 攻
        [0, 25, 30, 35, 0, 0, 0, 0, 0, 26, 0], // 守
        [0, 25, 30, 35, 0, 44, 44, 49, 55, 26, 0], // 攻守
      ],
    ],
  ], [
    /* 全ﾀｲﾌﾟ */
    [
      /* 主+副 */
      [
        /* 副人数 0 (異常な組み合わせ -> 副人数 1 をコピー) */
        [22, 0, 29, 36, 0, 0, 0, 0, 55, 0, 0], // 攻
        [22, 0, 29, 36, 0, 0, 0, 0, 55, 0, 0], // 守
        [22, 0, 29, 36, 0, 0, 0, 0, 55, 0, 0], // 攻守 (該当なし、攻/守をコピー)
      ], [
        /* 副人数 1 */
        [22, 0, 29, 36, 0, 0, 0, 0, 55, 0, 0], // 攻
        [22, 0, 29, 36, 0, 0, 0, 0, 55, 0, 0], // 守
        [22, 0, 29, 36, 0, 0, 0, 0, 55, 0, 0], // 攻守 (該当なし、攻/守をコピー)
      ], [
        /* 副人数 2 (該当なし) */
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 攻
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 守
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 攻守
      ],
    ], [
      /* 主 */
      [
        /* 副人数 0 */
        [22, 0, 29, 36, 0, 0, 0, 0, 0, 0, 0], // 攻 (攻援特大UPは未検証)
        [22, 0, 29, 36, 0, 0, 0, 0, 0, 0, 0], // 守
        [0, 0, 29, 36, 0, 0, 0, 0, 0, 0, 0], // 攻守 (未所持につき仮の数値)
      ], [
        /* 副人数 1 (異常な組み合わせ -> 副人数 0 をコピー) */
        [22, 0, 29, 36, 0, 0, 0, 0, 0, 0, 0], // 攻
        [22, 0, 29, 36, 0, 0, 0, 0, 0, 0, 0], // 守
        [0, 0, 29, 36, 0, 0, 0, 0, 0, 0, 0], // 攻守
      ], [
        /* 副人数 2 (異常な組み合わせ -> 副人数 0 をコピー) */
        [22, 0, 29, 36, 0, 0, 0, 0, 0, 0, 0], // 攻
        [22, 0, 29, 36, 0, 0, 0, 0, 0, 0, 0], // 守
        [0, 0, 29, 36, 0, 0, 0, 0, 0, 0, 0], // 攻守
      ],
    ], [
      /* 副 */
      [
        /* 副人数 0 (異常な組み合わせ -> 副人数 2 をコピー) */
        [23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 攻
        [23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 守
        [23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 攻守 (該当なし、攻/守をコピー)
      ], [
        /* 副人数 1 (異常な組み合わせ -> 副人数 2 をコピー) */
        [23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 攻
        [23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 守
        [23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 攻守 (該当なし、攻/守をコピー)
      ], [
        /* 副人数 2 (副10中, 副10特大) */
        [23, 0, 0, 35, 0, 0, 0, 0, 0, 0, 0], // 攻
        [23, 0, 0, 35, 0, 0, 0, 0, 0, 0, 0], // 守
        [23, 0, 0, 35, 0, 0, 0, 0, 0, 0, 0], // 攻守 (該当なし、攻/守をコピー)
      ],
    ],
  ],
];

const PRECIOS_SCENES = {
  /* 初期星3 */
  1: {
    name: "[思い出の…]クロエ・ルメール", rarity: "3", condition: "highercost", threshold: 23,
    range: "both", type: "Sweet", effect: "attack", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.5, star5max: 5.0, factor: 1.5
  },
  3: {
    name: "[靴箱の邂逅]上条るい", rarity: "3", condition: "highercost", threshold: 23,
    range: "both", type: "Cool", effect: "attack", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.5, star5max: 5.0, factor: 1.5
  },
  5: {
    name: "[ｺﾚが自信作]時谷小瑠璃", rarity: "3", condition: "highercost", threshold: 23,
    range: "both", type: "Pop", effect: "attack", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.5, star5max: 5.0, factor: 1.5
  },
  2: {
    name: "[ﾗｲﾌﾞの誘い]風町陽歌", rarity: "3", condition: "absolute", threshold: 1,
    range: "both", type: "Sweet", effect: "defence", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.5, star5max: 5.0, factor: 1,
    star6: { max: 5.5, description: "5.5" }
  },
  4: {
    name: "[頑張り屋の]鴫野睦", rarity: "3", condition: "absolute", threshold: 1,
    range: "both", type: "Cool", effect: "defence", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.5, star5max: 5.0, factor: 1,
    star6: { max: 5.5, description: "5.5" }
  },
  6: {
    name: "[夕方の約束]花房優輝", rarity: "3", condition: "absolute", threshold: 1,
    range: "both", type: "Pop", effect: "defence", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.5, star5max: 5.0, factor: 1,
    star6: { max: 5.5, description: "5.5" }
  },
  29: {
    name: "[部活の前に]重藤秋穂", rarity: "3", condition: "higherskilllv", threshold: 15,
    range: "both", type: "Cool", effect: "attack", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.5, star5max: 5.0, factor: 0.75,
    star6: { threshold: 17, max: 5.5, factor: 0.75, description: "5.5 (声援Lv17)" }
  },
  30: {
    name: "[ﾗｸﾛｽ少女]葉月柚子", rarity: "3", condition: "higherskilllv", threshold: 15,
    range: "both", type: "Pop", effect: "attack", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.5, star5max: 5.0, factor: 0.75,
    star6: { threshold: 17, max: 5.5, factor: 0.75, description: "5.5 (声援Lv17)" }
  },
  31: {
    name: "[昼の約束]優木苗", rarity: "3", condition: "higherskilllv", threshold: 15,
    range: "both", type: "Sweet", effect: "attack", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.5, star5max: 5.0, factor: 0.75,
    star6: { threshold: 17, max: 5.5, factor: 0.75, description: "5.5 (声援Lv17)" }
  },
  36: {
    name: "[お菓子ﾀｲﾑ]朝比奈桃子", rarity: "3", condition: "higherrarity", threshold: 7,
    range: "both", type: "Sweet", effect: "attack", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.5, star5max: 5.0, factor: 0.18,
    star6: { max: 6.0, description: "6 (指数=1.18)", factor: 1.18 }
  },
  37: {
    name: "[一口いる？]玉井麗巳", rarity: "3", condition: "higherrarity", threshold: 7,
    range: "both", type: "Pop", effect: "attack", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.5, star5max: 5.0, factor: 0.18,
    star6: { max: 6.0, description: "6 (指数=1.18)", factor: 1.18 }
  },
  43: {
    name: "[表情の意味]神楽坂砂夜", rarity: "3", condition: "higherrarity", threshold: 7,
    range: "both", type: "Cool", effect: "attack", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.5, star5max: 5.0, factor: 0.18,
    star6: { max: 6.0, description: "6 (指数=1.18)", factor: 1.18 }
  },
  38: {
    name: "[成果発表会]心実&エミ", rarity: "3", condition: "morelimitbreak", threshold: 30,
    range: "both", type: "All", effect: "both", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.5, star5max: 5.0, factor: 0.2,
    star6: { threshold: 35, max: 6.0, description: "6 (35ガール)" }
  },
  44: {
    name: "[何をﾌﾟﾚｲ?]姫島木乃子", rarity: "3", condition: "higherskilllv", threshold: 15,
    range: "both", type: "Pop", effect: "attack", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 1.05
  },
  45: {
    name: "[せーのっ!]浅見景", rarity: "3", condition: "higherskilllv", threshold: 15,
    range: "both", type: "Sweet", effect: "attack", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 1.05
  },
  49: {
    name: "[お手伝い]月隈林子", rarity: "3", condition: "higherskilllv", threshold: 15,
    range: "both", type: "Cool", effect: "attack", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 1.05
  },
  46: {
    name: "[ｶｯﾌﾟﾙ…？]白水六花", rarity: "3", condition: "fewergirls", threshold: 10,
    range: "both", type: "Sweet", effect: "both", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 0.4
  },
  50: {
    name: "[二人でﾗﾝﾁ]篠宮りさ", rarity: "3", condition: "fewergirls", threshold: 10,
    range: "both", type: "Pop", effect: "both", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 0.4
  },
  56: {
    name: "[図書室紹介]村上文緒", rarity: "3", condition: "fewergirls", threshold: 10,
    range: "both", type: "Cool", effect: "both", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 0.4
  },
  52: {
    name: "[貸切食堂]君嶋里琉", rarity: "3", condition: "absolute", threshold: 1,
    range: "both", type: "Cool", effect: "attack", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.3, star5max: 4.7, factor: 1,
    star6: { max: 5.2, description: "5.2" }
  },
  53: {
    name: "[真剣ﾃﾆｽ]加賀美茉莉", rarity: "3", condition: "absolute", threshold: 1,
    range: "both", type: "Sweet", effect: "attack", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.3, star5max: 4.7, factor: 1,
    star6: { max: 5.2, description: "5.2" }
  },
  55: {
    name: "[勇者登場]酒井田夏海", rarity: "3", condition: "absolute", threshold: 1,
    range: "both", type: "Pop", effect: "attack", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.3, star5max: 4.7, factor: 1,
    star6: { max: 5.2, description: "5.2" }
  },
  57: {
    name: "[乙女の願い]奈木野さくら", rarity: "3", condition: "morelimitbreak", threshold: 35,
    range: "both", type: "Sweet", effect: "attack", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 1.18,
    star6: {
      threshold: 35, effect: "both", max: 6.5, factor: 1.18,
      eventlist: [
        "raid-first", "raid-second-attack", "raid-second-defence", "raid-mega",
      ],
      description: "6.5 (攻守 / たすけて！マイヒーロー限定)"
    }
  },
  58: {
    name: "[特別な場所]櫻井明音", rarity: "3", condition: "morelimitbreak", threshold: 35,
    range: "both", type: "Pop", effect: "attack", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 1.18,
    star6: {
      threshold: 35, effect: "both", max: 6.5, factor: 1.18,
      eventlist: [
        "raid-first", "raid-second-attack", "raid-second-defence", "raid-mega",
      ],
      description: "6.5 (攻守 / たすけて！マイヒーロー限定)"
    }
  },
  59: {
    name: "[新体操とは]椎名心実", rarity: "3", condition: "morelimitbreak", threshold: 35,
    range: "both", type: "Cool", effect: "attack", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 1.18,
    star6: {
      threshold: 35, effect: "both", max: 6.5, factor: 1.18,
      eventlist: [
        "raid-first", "raid-second-attack", "raid-second-defence", "raid-mega",
      ],
      description: "6.5 (攻守 / たすけて！マイヒーロー限定)"
    }
  },
  60: {
    name: "[ﾗｲﾌﾞｽﾀｰﾄ!]風町陽歌", rarity: "3", condition: "moregirls", threshold: 20,
    range: "both", type: "Sweet", effect: "both", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 0.4,
    star6: { max: 6.5, description: "6.5" }
  },
  62: {
    name: "[清掃対決]鴫野睦", rarity: "3", condition: "moregirls", threshold: 20,
    range: "both", type: "Cool", effect: "both", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 0.4,
    star6: { max: 6.5, description: "6.5" }
  },
  66: {
    name: "[回転日和]花房優輝", rarity: "3", condition: "moregirls", threshold: 20,
    range: "both", type: "Pop", effect: "both", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 0.4,
    star6: { max: 6.5, description: "6.5" }
  },
  61: {
    name: "[お手本披露]九重忍", rarity: "3", condition: "highercost", threshold: 27,
    range: "both", type: "Pop", effect: "attack", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 1.5
  },
  64: {
    name: "[二人飯]白水六花", rarity: "3", condition: "highercost", threshold: 27,
    range: "both", type: "Sweet", effect: "attack", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 1.5
  },
  67: {
    name: "[勇気を胸に]真白透子", rarity: "3", condition: "highercost", threshold: 27,
    range: "both", type: "Cool", effect: "attack", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 1.5
  },
  68: {
    name: "[角煮に夢中]篠宮りさ", rarity: "3", condition: "higherrarity", threshold: 7,
    range: "both", type: "Pop", effect: "attack", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 0.93
  },
  71: {
    name: "[薄暮の逢瀬]夏目真尋", rarity: "3", condition: "higherrarity", threshold: 7,
    range: "both", type: "Cool", effect: "attack", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 0.93
  },
  73: {
    name: "[奔走ｺｽﾓｽ]笹原野々花", rarity: "3", condition: "higherrarity", threshold: 7,
    range: "both", type: "Sweet", effect: "attack", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 0.93
  },
  69: {
    name: "[10周年]メモリアル", rarity: "3", condition: "higherskilllv", threshold: 17,
    range: "both", type: "All", effect: "attack", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.5, star5max: 5.0, factor: 1.99
  },
  70: {
    name: "[二人だけで]クロエ・ルメール", rarity: "3", condition: "highercost", threshold: 28,
    range: "both", type: "Sweet", effect: "both", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 0.5
  },
  72: {
    name: "[油断の足元]葉月柚子", rarity: "3", condition: "highercost", threshold: 28,
    range: "both", type: "Pop", effect: "both", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 0.5
  },
  74: {
    name: "[鈴蘭の君]上条るい", rarity: "3", condition: "highercost", threshold: 28,
    range: "both", type: "Cool", effect: "both", format: "percent",
    star1max: 4.5, star2max: 4.5, star3max: 4.5, star4max: 5.5, star5max: 6.0, factor: 0.5
  },
  75: {
    name: "[愛ゆえに…]苗&小瑠璃", rarity: "3", condition: "higherskilllv", threshold: 16,
    range: "both", type: "All", effect: "both", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 6.5, factor: 0.55
  },
  76: {
    name: "[忍ぶれど]村上文緒", rarity: "3", condition: "moregirls", threshold: 23,
    range: "both", type: "Cool", effect: "attack", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 1.5
  },
  80: {
    name: "[愛情おかゆ]風町陽歌", rarity: "3", condition: "moregirls", threshold: 23,
    range: "both", type: "Sweet", effect: "attack", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 1.5
  },
  81: {
    name: "[お気に入り]花房優輝", rarity: "3", condition: "moregirls", threshold: 23,
    range: "both", type: "Pop", effect: "attack", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 1.5
  },
  77: {
    name: "[幸福の白羽]森園芽以", rarity: "3", condition: "morelimitbreak", threshold: 35,
    range: "both", type: "Sweet", effect: "both", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 0.45
  },
  79: {
    name: "[メッセージ]見吉奈央", rarity: "3", condition: "morelimitbreak", threshold: 35,
    range: "both", type: "Cool", effect: "both", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 0.45
  },
  83: {
    name: "[放課後彼氏]玉井麗巳", rarity: "3", condition: "morelimitbreak", threshold: 35,
    range: "both", type: "Pop", effect: "both", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 0.45
  },
  82: {
    name: "[11周年]メモリアル", rarity: "3", condition: "highercost", threshold: 26,
    range: "both", type: "All", effect: "attack", format: "percent",
    star1max: 3.5, star2max: 3.5, star3max: 3.5, star4max: 4.0, star5max: 5.5, factor: 1.75
  },
  84: {
    name: "[優しい手]鴫野睦", rarity: "3", condition: "higherskilllv", threshold: 17,
    range: "both", type: "Cool", effect: "attack", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 0.63
  },
  87: {
    name: "[贅沢ﾀｲﾑ]天都かなた", rarity: "3", condition: "higherskilllv", threshold: 17,
    range: "both", type: "Sweet", effect: "attack", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 0.63
  },
  89: {
    name: "[想い感じて]春宮つぐみ", rarity: "3", condition: "higherskilllv", threshold: 17,
    range: "both", type: "Pop", effect: "attack", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 0.63
  },
  85: {
    name: "[幸せの果実]小日向いちご", rarity: "3", condition: "fewergirls", threshold: 8,
    range: "both", type: "Sweet", effect: "both", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 0.5
  },
  86: {
    name: "[ご注文は？]神楽坂砂夜", rarity: "3", condition: "fewergirls", threshold: 8,
    range: "both", type: "Cool", effect: "both", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 0.5
  },
  88: {
    name: "[きみと一緒]櫻井明音", rarity: "3", condition: "fewergirls", threshold: 8,
    range: "both", type: "Pop", effect: "both", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 0.5
  },

  91: {
    name: "[ﾛﾏﾝﾁｯｸに]望月エレナ", rarity: "3", condition: "highercost", threshold: 30,
    range: "both", type: "Sweet", effect: "both", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 1.3
  },
  92: {
    name: "[幸せタイム]椎名心実", rarity: "3", condition: "highercost", threshold: 30,
    range: "both", type: "Cool", effect: "both", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 1.3
  },
  94: {
    name: "[乙女ﾌｨﾙﾀｰ]戸村美知留", rarity: "3", condition: "highercost", threshold: 30,
    range: "both", type: "Pop", effect: "both", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 1.3
  },

  93: {
    name: "[ﾙﾝﾙﾝ日和]優木苗", rarity: "3", condition: "higherrarity", threshold: 7,
    range: "both", type: "Sweet", effect: "attack", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 1.45
  },
  95: {
    name: "[凛として]重藤秋穂", rarity: "3", condition: "higherrarity", threshold: 7,
    range: "both", type: "Cool", effect: "attack", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 1.45
  },

  96: {
    name: "[12周年]メモリアル", rarity: "3", condition: "higherrarity", threshold: 7,
    range: "both", type: "All", effect: "attack", format: "percent",
    star1max: 4.0, star2max: 4.0, star3max: 4.0, star4max: 4.5, star5max: 5.5, factor: 1.17
  },

  97: {
    name: "[よそ見注意]朝比奈桃子", rarity: "3", condition: "higherskilllv", threshold: 16,
    range: "both", type: "Sweet", effect: "both", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 0.75
  },
  97: {
    name: "[きみが一番]相楽エミ", rarity: "3", condition: "higherskilllv", threshold: 16,
    range: "both", type: "Pop", effect: "both", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 7.0, factor: 0.75
  },

  100: {
    name: "[力の源]桃子&柚子", rarity: "3", condition: "higherrarity", threshold: 7,
    range: "both", type: "All", effect: "both", format: "percent",
    star1max: 5.0, star2max: 5.0, star3max: 5.0, star4max: 6.0, star5max: 6.5, factor: 1.07
  },

  /* 初期星2 */
  7: {
    name: "[緊張ﾁﾗｼ配ﾘ]白水六花", rarity: "2", condition: "higherrarity", threshold: 7,
    range: "sub", type: "Sweet", effect: "attack", format: "percent",
    star1max: 3.0, star2max: 3.0, star3max: 3.5, star4max: 4.0, star5max: 5.0, factor: 0.18
  },
  11: {
    name: "[秘密の演技]椎名心実", rarity: "2", condition: "higherrarity", threshold: 7,
    range: "sub", type: "Cool", effect: "attack", format: "percent",
    star1max: 3.0, star2max: 3.0, star3max: 3.5, star4max: 4.0, star5max: 5.0, factor: 0.18
  },
  15: {
    name: "[必要なのは]酒井田夏海", rarity: "2", condition: "higherrarity", threshold: 7,
    range: "sub", type: "Pop", effect: "attack", format: "percent",
    star1max: 3.0, star2max: 3.0, star3max: 3.5, star4max: 4.0, star5max: 5.0, factor: 0.18
  },
  8: {
    name: "[偶然の…]奈木野さくら", rarity: "2", condition: "morelimitbreak", threshold: 5,
    range: "main", type: "Sweet", effect: "attack", format: "percent",
    star1max: 3.0, star2max: 3.0, star3max: 3.5, star4max: 4.0, star5max: 5.0, factor: 0.47
  },
  10: {
    name: "[図書室にて]村上文緒", rarity: "2", condition: "morelimitbreak", threshold: 5,
    range: "main", type: "Cool", effect: "attack", format: "percent",
    star1max: 3.0, star2max: 3.0, star3max: 3.5, star4max: 4.0, star5max: 5.0, factor: 0.47
  },
  14: {
    name: "[放送室のｷﾐ]櫻井明音", rarity: "2", condition: "morelimitbreak", threshold: 5,
    range: "main", type: "Pop", effect: "attack", format: "percent",
    star1max: 3.0, star2max: 3.0, star3max: 3.5, star4max: 4.0, star5max: 5.0, factor: 0.47
  },
  9: {
    name: "[ｸﾛｴ探険隊!]クロエ・ルメール", rarity: "2", condition: "fewergirls", threshold: 7,
    range: "sub", type: "Sweet", effect: "defence", format: "percent",
    star1max: 3.0, star2max: 3.0, star3max: 3.5, star4max: 4.0, star5max: 5.0, factor: 0.2
  },
  12: {
    name: "[最悪な遭遇]月隈林子", rarity: "2", condition: "fewergirls", threshold: 7,
    range: "sub", type: "Cool", effect: "defence", format: "percent",
    star1max: 3.0, star2max: 3.0, star3max: 3.5, star4max: 4.0, star5max: 5.0, factor: 0.2
  },
  13: {
    name: "[楽しい時間]時谷小瑠璃", rarity: "2", condition: "fewergirls", threshold: 7,
    range: "sub", type: "Pop", effect: "defence", format: "percent",
    star1max: 3.0, star2max: 3.0, star3max: 3.5, star4max: 4.0, star5max: 5.0, factor: 0.2
  },
  35: {
    name: "[8周年]メモリアル", rarity: "2", condition: "highercost", threshold: 25,
    range: "sub", type: "All", effect: "attack", format: "percent",
    star1max: 3.0, star2max: 3.0, star3max: 3.5, star4max: 4.0, star5max: 5.0, factor: 1.6
  },
  54: {
    name: "[9周年]メモリアル", rarity: "2", condition: "higherrarity", threshold: 7,
    range: "sub", type: "All", effect: "attack", format: "percent",
    star1max: 3.0, star2max: 3.0, star3max: 3.5, star4max: 4.5, star5max: 5.5, factor: 1.7
  },
  63: {
    name: "[私たちの音]心実&景", rarity: "2", condition: "highercost", threshold: 28,
    range: "both", type: "All", effect: "attack", format: "percent",
    star1max: 3.0, star2max: 3.0, star3max: 3.5, star4max: 4.0, star5max: 5.0, factor: 1.78
  },
  65: {
    name: "[音にのせて]文緒&桃子&るい", rarity: "2", condition: "higherskilllv", threshold: 15,
    range: "both", type: "All", effect: "defence", format: "percent",
    star1max: 3.0, star2max: 3.0, star3max: 3.5, star4max: 4.0, star5max: 5.0, factor: 1.56
  },
  78: {
    name: "[総選挙2022]メモリアル", rarity: "2", condition: "moregirls", threshold: 25,
    range: "both", type: "All", effect: "attack", format: "percent",
    star1max: 3.0, star2max: 3.0, star3max: 3.5, star4max: 4.0, star5max: 5.0, factor: 1.1
  },
  90: {
    name: "[総選挙2023]メモリアル", rarity: "2", condition: "higherskilllv", threshold: 17,
    range: "both", type: "All", effect: "attack", format: "percent",
    star1max: 3.0, star2max: 3.0, star3max: 3.5, star4max: 4.5, star5max: 5.5, factor: 0.76
  },
  /* 初期星1 */
  16: {
    name: "クロエ・ルメール", rarity: "1", condition: "higherrarity", threshold: 7,
    range: "sub", type: "Sweet", effect: "attack", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 0.18
  },
  20: {
    name: "村上文緒", rarity: "1", condition: "higherrarity", threshold: 7,
    range: "sub", type: "Cool", effect: "attack", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 0.18
  },
  24: {
    name: "櫻井明音", rarity: "1", condition: "higherrarity", threshold: 7,
    range: "sub", type: "Pop", effect: "attack", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 0.18
  },
  17: {
    name: "風町陽歌", rarity: "1", condition: "highercost", threshold: 23,
    range: "sub", type: "Sweet", effect: "attack", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 1.5
  },
  21: {
    name: "上条るい", rarity: "1", condition: "highercost", threshold: 23,
    range: "sub", type: "Cool", effect: "attack", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 1.5
  },
  25: {
    name: "時谷小瑠璃", rarity: "1", condition: "highercost", threshold: 23,
    range: "sub", type: "Pop", effect: "attack", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 1.5
  },
  18: {
    name: "白水六花", rarity: "1", condition: "highercost", threshold: 23,
    range: "sub", type: "Sweet", effect: "defence", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 1.5
  },
  22: {
    name: "鴫野睦", rarity: "1", condition: "highercost", threshold: 23,
    range: "sub", type: "Cool", effect: "defence", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 1.5
  },
  26: {
    name: "花房優輝", rarity: "1", condition: "highercost", threshold: 23,
    range: "sub", type: "Pop", effect: "defence", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 1.5
  },
  19: {
    name: "奈木野さくら", rarity: "1", condition: "higherskilllv", threshold: 15,
    range: "sub", type: "Sweet", effect: "defence", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 0.5
  },
  23: {
    name: "月隈林子", rarity: "1", condition: "higherskilllv", threshold: 15,
    range: "sub", type: "Cool", effect: "defence", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 0.5
  },
  27: {
    name: "酒井田夏海", rarity: "1", condition: "higherskilllv", threshold: 15,
    range: "sub", type: "Pop", effect: "defence", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 0.5
  },
  28: {
    name: "椎名心実", rarity: "1", condition: "absolute", threshold: 1,
    range: "sub", type: "All", effect: "attack", format: "fix",
    star1max: 700, star2max: 730, star3max: 760, star4max: 800, star5max: 900, factor: 1
  },
  32: {
    name: "重藤秋穂", rarity: "1", condition: "higherrarity", threshold: 7,
    range: "sub", type: "Cool", effect: "defence", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 0.18
  },
  33: {
    name: "葉月柚子", rarity: "1", condition: "higherrarity", threshold: 7,
    range: "sub", type: "Pop", effect: "defence", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 0.18
  },
  34: {
    name: "優木苗", rarity: "1", condition: "higherrarity", threshold: 7,
    range: "sub", type: "Sweet", effect: "defence", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 0.18
  },
  39: {
    name: "朝比奈桃子", rarity: "1", condition: "fewergirls", threshold: 7,
    range: "sub", type: "Sweet", effect: "defence", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 0.2
  },
  40: {
    name: "玉井麗巳", rarity: "1", condition: "fewergirls", threshold: 7,
    range: "sub", type: "Pop", effect: "defence", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 0.2
  },
  41: {
    name: "神楽坂砂夜", rarity: "1", condition: "fewergirls", threshold: 7,
    range: "sub", type: "Cool", effect: "defence", format: "fix",
    star1max: 800, star2max: 830, star3max: 860, star4max: 900, star5max: 1000, factor: 0.2
  },
  47: {
    name: "浅見景", rarity: "1", condition: "highercost", threshold: 24,
    range: "sub", type: "All", effect: "attack", format: "fix",
    star1max: 700, star2max: 730, star3max: 760, star4max: 800, star5max: 900, factor: 1.5
  },
  48: {
    name: "姫島木乃子", rarity: "1", condition: "highercost", threshold: 24,
    range: "sub", type: "All", effect: "defence", format: "fix",
    star1max: 700, star2max: 730, star3max: 760, star4max: 800, star5max: 900, factor: 1.5
  },
  51: {
    name: "篠宮りさ", rarity: "1", condition: "higherskilllv", threshold: 15,
    range: "sub", type: "All", effect: "defence", format: "fix",
    star1max: 700, star2max: 730, star3max: 760, star4max: 800, star5max: 900, factor: 1.25
  },
};

const INIT_PRECIOS_SCENES = ["50", "44", "37"];

const PETIT_GIRLS_EFFECTS = {
  /*
  7654 3210
         **  効果    00 ... 攻援, 01 ... 守援, 10 ... 攻守
       **    ﾀｲﾌﾟ    00 ... all, 01 ... Pop, 10 ... Sweet, 11 ... Cool
    **       連番
  **         ﾏｰｶｰ    00 ... ﾋﾟﾝｸ, 01 ... ｲｴﾛｰ, 1x ... ﾌﾞﾙｰ
  */

  /* 無効 */
  255: { name: "---", condition: "invalid", type: "All", effect: "", format: "", lvmax: "" },
  /* ピンクマーカー */
  0: { name: "全タイプ攻援UP", condition: "type", type: "All", effect: "attack", format: "percent", lvmax: 9.5 },
  4: { name: "Popタイプ攻援UP", condition: "type", type: "Pop", effect: "attack", format: "percent", lvmax: 9.5 },
  8: { name: "Sweetタイプ攻援UP", condition: "type", type: "Sweet", effect: "attack", format: "percent", lvmax: 9.5 },
  12: { name: "Coolタイプ攻援UP", condition: "type", type: "Cool", effect: "attack", format: "percent", lvmax: 9.5 },
  1: { name: "全タイプ守援UP", condition: "type", type: "All", effect: "defence", format: "percent", lvmax: 9.5 },
  5: { name: "Popタイプ守援UP", condition: "type", type: "Pop", effect: "defence", format: "percent", lvmax: 9.5 },
  9: { name: "Sweetタイプ守援UP", condition: "type", type: "Sweet", effect: "defence", format: "percent", lvmax: 9.5 },
  13: { name: "Coolタイプ守援UP", condition: "type", type: "Cool", effect: "defence", format: "percent", lvmax: 9.5 },
  2: { name: "全タイプ攻守UP", condition: "type", type: "All", effect: "both", format: "percent", lvmax: 8.5 },
  6: { name: "Popタイプ攻守UP", condition: "type", type: "Pop", effect: "both", format: "percent", lvmax: 8.5 },
  10: { name: "Sweetタイプ攻守UP", condition: "type", type: "Sweet", effect: "both", format: "percent", lvmax: 8.5 },
  14: { name: "Coolタイプ攻守UP", condition: "type", type: "Cool", effect: "both", format: "percent", lvmax: 8.5 },
  16: { name: "全タイプ攻援大UP", condition: "type", type: "All", effect: "attack", format: "percent", lvmax: 12 },
  17: { name: "全タイプ守援大UP", condition: "type", type: "All", effect: "defence", format: "percent", lvmax: 12 },
  18: { name: "全タイプ攻守大UP", condition: "type", type: "All", effect: "both", format: "percent", lvmax: 12 },
  32: { name: "全タイプ攻援特大UP", condition: "type", type: "All", effect: "attack", format: "percent", lvmax: 14 },
  33: { name: "全タイプ守援特大UP", condition: "type", type: "All", effect: "defence", format: "percent", lvmax: 14 },
  34: { name: "全タイプ攻守特大UP", condition: "type", type: "All", effect: "both", format: "percent", lvmax: 14 },
  /* イエローマーカー */
  64: { name: "全タイプ攻援小UP", condition: "type", type: "All", effect: "attack", format: "percent", lvmax: 3 },
  65: { name: "全タイプ守援小UP", condition: "type", type: "All", effect: "defence", format: "percent", lvmax: 3 },
  66: { name: "全タイプ攻守小UP", condition: "type", type: "All", effect: "both", format: "percent", lvmax: 3 },
  /* ブルーマーカー */
  130: { name: "本命ガールの攻守UP", condition: "best", type: "All", effect: "both", format: "percent", lvmax: 11 },
  146: { name: "デート中のガールの攻守UP", condition: "date", type: "All", effect: "both", format: "percent", lvmax: 11 },
  162: { name: "タッチボーナスの効果UP", condition: "touch", type: "All", effect: "both", format: "percent", lvmax: 11 },
  178: { name: "誕生日のガールの攻守UP", condition: "birth", type: "All", effect: "both", format: "percent", lvmax: 19 },
  198: { name: "テレビの効果UP", condition: "clubitem", type: "Pop", effect: "both", format: "percent", lvmax: 120 },
  202: { name: "ロッカーの効果UP", condition: "clubitem", type: "Sweet", effect: "both", format: "percent", lvmax: 120 },
  206: { name: "ホワイトボードの効果UP", condition: "clubitem", type: "Cool", effect: "both", format: "percent", lvmax: 120 },
};

const PETIT_GIRLS_EFFECTS_REVERSE = {
  /* 無効 */
  "---": { number: "255" },
  /* ピンクマーカー */
  全ﾀｲﾌﾟの攻援UP: { number: "0" }, POPﾀｲﾌﾟの攻援UP: { number: "4" }, SWEETﾀｲﾌﾟの攻援UP: { number: "8" },
  COOLﾀｲﾌﾟの攻援UP: { number: "12" }, 全ﾀｲﾌﾟの守援UP: { number: "1" }, POPﾀｲﾌﾟの守援UP: { number: "5" },
  SWEETﾀｲﾌﾟの守援UP: { number: "9" }, COOLﾀｲﾌﾟの守援UP: { number: "13" }, 全ﾀｲﾌﾟの攻守UP: { number: "2" },
  POPﾀｲﾌﾟの攻守UP: { number: "6" }, SWEETﾀｲﾌﾟの攻守UP: { number: "10" }, COOLﾀｲﾌﾟの攻守UP: { number: "14" },
  全ﾀｲﾌﾟの攻援大UP: { number: "16" }, 全ﾀｲﾌﾟの守援大UP: { number: "17" }, 全ﾀｲﾌﾟの攻守大UP: { number: "18" },
  全ﾀｲﾌﾟの攻援特大UP: { number: "32" }, 全ﾀｲﾌﾟの守援特大UP: { number: "33" }, 全ﾀｲﾌﾟの攻守特大UP: { number: "34" },
  /* イエローマーカー */
  全ﾀｲﾌﾟの攻援小UP: { number: "64" }, 全ﾀｲﾌﾟの守援小UP: { number: "65" }, 全ﾀｲﾌﾟの攻守小UP: { number: "66" },
  /* ブルーマーカー */
  本命ｶﾞｰﾙの攻守UP: { number: "130" }, ﾃﾞｰﾄ中のｶﾞｰﾙの攻守UP: { number: "146" },
  ﾀｯﾁﾎﾞｰﾅｽの効果UP: { number: "162" }, 誕生日のｶﾞｰﾙの攻守UP: { number: "178" },
  ﾃﾚﾋﾞの効果UP: { number: "198" }, ﾛｯｶｰの効果UP: { number: "202" }, ﾎﾜｲﾄﾎﾞｰﾄﾞの効果UP: { number: "206" },
};

/* -> { "effect-1" : "18", "effect-2" : "66", "effect-3" : "64", "effect-4" : "198" } */
const INIT_PETIT_GIRLS_EFFECTS = ["18", "66", "64", "198"];

/* -> { "1" : { lv : "Lv8", effect : "attack", type : "normal" }, "2" : { lv : "Lv5", effect : "attack", type : "normal" }, ... */
const INIT_DECKBONUS = [
  ["Lv8", "attack"], ["Lv5", "attack"], ["Lv5", "attack"], ["Lv5", "attack"], ["Lv5", "attack"],
  ["Lv5", "both"], ["Lv3", "both"],
];

const CLUBCUP_SKILL_EFFECT = {
  Luv: {
    1: 0.0, 2: 0.0, 3: 0.0, 4: 0.0, 5: 1.0, 6: 1.0, 7: 1.0, 8: 1.0, 9: 1.0, 10: 2.0,
    11: 3.0, 12: 4.0, 13: 5.0, 14: 7.0, 15: 9.0, 16: 11.0, 17: 13.0, 18: 15.0
  },
  UR: {
    1: 0.0, 2: 0.0, 3: 0.0, 4: 0.0, 5: 1.0, 6: 1.0, 7: 1.0, 8: 1.0, 9: 1.0, 10: 2.0,
    11: 3.0, 12: 4.0, 13: 5.0, 14: 7.0, 15: 9.0, 16: 11.0, 17: 13.0, 18: 15.0
  },
  SSR: {
    1: 0.0, 2: 0.0, 3: 0.0, 4: 0.0, 5: 0.5, 6: 0.5, 7: 0.5, 8: 0.5, 9: 0.5, 10: 1.0,
    11: 1.5, 12: 2.0, 13: 2.5, 14: 3.5, 15: 4.5, 16: 5.5, 17: 6.5, 18: 7.5
  },
  SR: {
    1: 0.0, 2: 0.0, 3: 0.0, 4: 0.0, 5: 0.3, 6: 0.3, 7: 0.3, 8: 0.3, 9: 0.3, 10: 0.6,
    11: 0.6, 12: 0.6, 13: 0.6, 14: 0.6, 15: 0.6, 16: 0.6, 17: 0.6, 18: 0.6
  },
};

const DIVRACE_ITEM_LIST = [
  {
    name: "カメラ", memo: "予選で選択したガールの攻援力が30%UP",
    condition: { "pre-select": true }, effect: "girl", value: 30
  }, {
    name: "雑誌", memo: "URガールの攻援力が30%UP",
    condition: { higherrarity: 7 }, effect: "girl", value: 30
  }, {
    name: "ドレス", memo: "SWEETガールの攻援力が30%UP",
    condition: { type: "Sweet" }, effect: "girl", value: 30
  }, {
    name: "テディベア", memo: "COOLガールの攻援力が30%UP",
    condition: { type: "Cool" }, effect: "girl", value: 30
  }, {
    name: "シューズ", memo: "POPガールの攻援力が30%UP",
    condition: { type: "Pop" }, effect: "girl", value: 30
  }, {
    name: "お菓子", memo: "コストが26以上のガールの攻援力が40%UP",
    condition: { highercost: 26 }, effect: "girl", value: 40
  }, {
    name: "ジュース", memo: "声援Lvが16以上のガールの攻援力が40%UP",
    condition: { higherskilllv: 16 }, effect: "girl", value: 40
  }, {
    name: "ノート", memo: "ぷちセンバツの攻援力が60%UP",
    condition: { /* */ }, effect: "petit-girl", value: 60
  }, {
    name: "ブランケット", memo: "ぷちセンバツの応援力効果が55%UP",
    condition: { /* */ }, effect: "petit-effect", value: 55
  }, {
    name: "携帯", memo: "声援の効果が50%UP",
    condition: { /* */ }, effect: "skill-effect", value: 50
  }, {
    name: "アルバム", memo: "Ex進展ボーナスの効果が25倍に",
    condition: { /* */ }, effect: "limitbreak", value: 2500
  }, {
    name: "ペン", memo: "センバツボーナスの効果が15%UP",
    condition: { /* */ }, effect: "deckbonus", value: 15
  }, {
    name: "ミネラルウォーター", memo: "声援Lv.13以上のコスト24以上ガールの攻援力が40%UP",
    condition: { highercost: 24, higherskilllv: 13 }, effect: "girl", value: 40
  }, {
    name: "シュシュ", memo: "コスト22以上のURガールの攻援力が40%UP",
    condition: { highercost: 22, higherrarity: 7 }, effect: "girl", value: 40
  }, {
    name: "コミック", memo: "声援Lv.17のURガールの攻援力が40%UP",
    condition: { higherskilllv: 17, higherrarity: 7 }, effect: "girl", value: 40
  },
];

const TOOL_TIPS_LIST = [
  {
    element: "div.main.scenes.heading > div.apower, div.sub.heading > div.apower",
    content: "各シーンで表示されている攻援力の数値をそのまま入力します。誕生日やデート、副センバツ補正などは含めずに元々の数値を入力します。"
  }, {
    element: "body#raid-second-defence div.main.scenes.heading > div.apower, body#raid-second-defence div.sub.heading > div.apower, body#championship-defence div.main.scenes.heading > div.apower, body#championship-defence div.sub.heading > div.apower",
    content: "各シーンで表示されている守援力の数値をそのまま入力します。誕生日やデート、副センバツ補正などは含めずに元々の数値を入力します。"
  }, {
    element: "div.main.scenes.heading > div.strap",
    content: "フラワーストラップの場合も％ではなく実際の効果値を入力します。"
  }, {
    element: "div.main.scenes.heading > div.grade, div.sub.heading > div.grade",
    content: "ガールの学年を選択します。なお、2024年5月時点のゲーム仕様では他校生と一ノ瀬友恵は「その他」の扱いになります。"
  }, {
    element: "div.main.scenes.heading > div.club, div.sub.heading > div.club",
    content: "自身と部活が一致するガールの場合はチェックを入れます。"
  }, {
    element: "div.main.scenes.heading > div.date, div.sub.heading > div.date",
    content: "デート中のガールの場合はチェックを入れます。"
  }, {
    element: "div.main.scenes.heading > div.touch, div.sub.heading > div.touch",
    content: "タッチボーナスが発動するガールの場合はチェックを入れます。"
  }, {
    element: "div.main.scenes.heading > div.birth, div.sub.heading > div.birth",
    content: "誕生日のガールの場合はチェックを入れます。"
  }, {
    element: "div.main.scenes.heading > div.limit, div.sub.heading > div.limit",
    content: "Ex進展済み もしくは ラブリー進展済みのガールの場合はチェックを入れます。"
  }, {
    element: "div.main.scenes.heading > div.best, div.sub.heading > div.best",
    content: "本命ガールの場合はチェックを入れます。"
  }, {
    element: "div.main.scenes.heading > div.special, div.sub.heading > div.special",
    content: "聖櫻メモリアルストーリーにおいて、有利なガールの場合はチェックを入れます。"
  }, {
    element: "div.main.scenes.heading > div.result-1, div.sub.heading > div.result-1",
    content: "【声援を除いて】各種ボーナスや各種効果による補正後の応援力を自動で表示します。基本的にはこの数値が大きいガールほど効果が高いです。"
  }, {
    element: "body#clubcup div.main.scenes.heading > div.clubcup-skilleffect, body#clubcup div.sub.heading > div.clubcup-skilleffect",
    content: "対抗戦における声援効果への加算値を自動で表示します。"
  }, {
    element: "body#divrace div.main.scenes.heading > div.result-event-sp-1, body#divrace div.sub.heading > div.result-event-sp-1",
    content: "さらに選択した風向きアイテムの効果を加算した後の応援力を自動で表示します。"
  }, {
    element: "body#board div.main.scenes.heading > div.result-event-sp-1, body#board div.sub.heading > div.result-event-sp-1",
    content: "さらに天気効果やマス効果を加算した後の応援力を自動で表示します。"
  }, {
    element: "body#normal-battle div.main.scenes.heading > div.result-event-sp-1, body#normal-battle div.sub.heading > div.result-event-sp-1",
    content: "補正後の応援力をコストで割り算した後の数値を自動で表示します。"
  }, {
    element: "div.main.skill.heading > div.valid",
    content: "ガールが有効な声援を持っている場合はチェックを入れます。声援未所持やイベントで効果が無い声援の場合はチェックを外します。"
  }, {
    element: "div.main.skill.heading > div.skill-1, div.switch.heading > div.skill-1",
    content: "どのタイプのガールに掛かる声援かを選択します。声援の説明の中に POP / SWEET / COOL のどれも記載がない場合は 全タイプ が対象です。"
  }, {
    element: "div.main.skill.heading > div.skill-2, div.switch.heading > div.skill-2",
    content: "声援が掛かる対象が 主センバツ か 副センバツ か もしくは その両方か を選択します。声援の説明の中に指定がない場合は 主センバツ のみが対象です。"
  }, {
    element: "div.main.skill.heading > div.skill-3, div.switch.heading > div.skill-3",
    content: "声援が掛かる対象が 副センバツの上位何人までか を入力します。副センバツに効果が掛からない場合は 0 と入力します。"
  }, {
    element: "div.main.skill.heading > div.skill-6, div.switch.heading > div.skill-6",
    content: "昔のURガールのみが対象です(王冠URは対象外)。声援変更を行っている場合はその数値を選択します。それ以外は 空欄のまま とします。"
  }, {
    element: "div.main.skill.heading > div.skill-effect, div.switch.heading > div.skill-effect",
    content: "入力した声援Lvや声援の内容から算出した声援効果値を自動で表示します。"
  }, {
    element: "div.main.skill.heading > div.skill-total, div.switch.heading > div.skill-total",
    content: "声援が発動したときの効果合計値を自動で表示します。声援が掛かる対象の応援力 × 効果値 × 対象人数 × 補正。基本的にはこの数値が大きい声援ほど効果が高いです。"
  }, {
    element: "div.main.skill.heading > div.skill-chance, div.switch.heading > div.skill-chance",
    content: "声援が発動する確率を自動で表示します。声援の同時発動数には制限があるため、老番のガールほど発動率は低くなります。"
  }, {
    element: "div.main.skill.heading > div.clubcup-skilleffect, div.switch.heading > div.clubcup-skilleffect",
    content: "対抗戦における声援効果への加算値を自動で表示します。( 発動時合計 / 5,000) %。"
  }, {
    element: "div.switch.heading > div.valid",
    content: "副センバツ内のスイッチOFFガール人数分のチェックを入れます。未設定の場合はチェックを外します。"
  }, {
    element: "div.precious.heading > div.valid",
    content: "プレシャスシーンをセンバツに設定している場合はチェックを入れます。未設定の場合はチェックを外します。"
  }, {
    element: "div.precious.heading > div.type",
    content: "効果の対象タイプを選択した場合、名称欄で表示されるプレシャスシーンの絞り込みを行います。"
  }, {
    element: "div.precious.heading > div.rarity",
    content: "初期レアリティを選択した場合、名称欄で表示されるプレシャスシーンの絞り込みを行います。"
  }, {
    element: "div.precious.heading > div.effect",
    content: "効果の攻/守を選択した場合、名称欄で表示されるプレシャスシーンの絞り込みを行います。"
  }, {
    element: "div.precious.heading > div.count",
    content: "一部の人数カウント系のシーンにおいてその数値を入力します。空欄のままの場合は最大効果発揮条件を満たしているものと見なして最大効果値を計算に使用します。"
  }, {
    element: "div.precious.heading > div.precious-effect",
    content: "主センバツおよび副センバツの入力値とプレシャスシーンの入力値から算出した効果合計値を自動で表示します。ゲーム内のセンバツ設定ページで表示される効果値と近似した値になります。正確に入力していれば誤差は1桁程度です。"
  }, {
    element: "div.petit.heading > div.attack, div.petit.heading > div.defence",
    content: "ぷちセンバツの画面で表示される総攻援、総守援の数値をそのまま入力します"
  }, {
    element: "div.petit.heading > div.effect",
    content: "応援力効果を選択します。経験値UPなど計算に影響を与えない効果の場合は --- を選択します。"
  }, {
    element: "div.player-data.heading > div.attackcost",
    content: "プレイヤーの攻コストの最大値を入力します。センバツの使用コストではなく最大値です。"
  }, {
    element: "div.player-data.heading > div.clubitem.title",
    content: "部活設備を購入済みの場合はチェックを入れます。未購入の場合はチェックを外します。"
  }, {
    element: "div.player-data.heading > div.spgirls",
    content: "固定値加算系のSP応援ガール効果も計算結果で考慮に入れたい場合はその数値を入力します。センバツ本体の出力だけを比較していく場合には 0 のままで大丈夫です。"
  }, {
    element: "div.player-data.heading > div.multiply-1, div.player-data.heading > div.multiply-2",
    content: "基本的には1.00のままでOKです。デフォルトでは計算結果はハート1個分、0コンボでのアタックといったような最小倍率での結果を表示しますが、炭酸補正(x6/x12)やコンボ補正などの倍率を掛けた後の数値で表示したい場合にはその倍率を入力します。"
  }, {
    element: "div.player-data.heading > div.raidtype",
    content: "たすけて！マイヒーロー(通称レイド)において悪男のタイプを指定します。ここでの指定値に応じて得意タイプのガールにはプラスの補正、苦手タイプのガールにはマイナスの補正が追加されます。"
  }, {
    element: "div.player-data.heading > div.megabuff",
    content: "たすけて！マイヒーローのメガ悪男において、ヒーロー声援によるガールの攻援力UP合計値を指定します。上限は 100 % です。"
  }, {
    element: "div.player-data.heading > div.megadebuff",
    content: "たすけて！マイヒーローのメガ悪男において、ヒーロー声援によるメガ悪男の守備力DOWN合計値を指定します。上限は 50 % です。"
  }, {
    element: "div.player-data.heading > div.clubcupbuff",
    content: "勧誘★グランプリにおいて、マイクや喝などによる攻援力UPボーナス値を指定します。上限は 50 % です。"
  }, {
    element: "div.player-data.heading > div.clubcupwinbonus",
    content: "勧誘★グランプリや通常のバトルにおいて、バトル勝利後の10分間、自動で追加される攻援力UPボーナスを有効する場合はチェックを入れます。無効にする場合はチェックを外します。"
  }, {
    element: "body#divrace div.main.scenes.heading > div.special, body#divrace div.sub.heading > div.special",
    content: "コンテスト予選で選択したガールの場合はチェックを入れます。"
  }, {
    element: "body#divrace div.special-item.heading > div.stage",
    content: "ステージ名を選択します。ステージ種別によって風向きアイテムの効果が変化するためです。"
  }, {
    element: "body#divrace div.special-item.heading > div.valid",
    content: "風向きアイテムを使用する場合はチェックを入れます。計算結果に効果値が加算されます。"
  }, {
    element: "body#divrace div.special-item.heading > div.effect-base, body#divrace div.special-item.heading > div.effect-challenge",
    content: "センバツの設定に基づいて計算された風向きアイテム使用時の効果値を自動で表示します。"
  }, {
    element: "div.petit.heading > div.attack_i",
    content: "ぷちガールちゃん1人ずつの攻援力を入力します。"
  }, {
    element: "div.petit.heading > div.type",
    content: "ぷちガールちゃん1人ずつのタイプを選択します。"
  }, {
    element: "div.petit.heading > div.skill",
    content: "ぷち主センバツ1人および副センバツ3人のスキル効果のタイプと効果値を入力します。"
  }, {
    element: "div.event-special.weather.heading > div.weather",
    content: "現在の天気を選択します。"
  }, {
    element: "div.event-special.weather.heading > div.name",
    content: "上で選択した天気に基づいた効果名を自動で表示します。"
  }, {
    element: "div.event-special.weather.heading > div.rate",
    content: "上で選択した天気に基づいた効果値を自動で表示します。"
  }, {
    element: "div.event-special.weather.heading > div.effect",
    content: "センバツの設定に基づいて計算された効果の期待値を自動で表示します。"
  }, {
    element: "div.event-special.space.heading > div.rate",
    content: "それぞれのマス効果が何％かを数値で入力します。DOWNの場合はマイナス(-)を付けて入力します。"
  }, {
    element: "div.event-special.space.heading > div.effect",
    content: "センバツの設定に基づいて計算された効果の期待値を自動で表示します。"
  }, {
    element: "div.event-special.total.heading > div.min, div.event-special.total.heading > div.exp, div.event-special.total.heading > div.max",
    content: "天気効果とマス効果を合算した♡1あたりのボーナス効果を自動で表示します。" },
];

const NAME_TO_CLUBTYPE_CONVERT = {
  日野奏恵: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  伊勢崎郁歩: { clubType: "文化部(日本)", clubTypeNumber: "clubType_8" },
  林田たまき: { clubType: "委員会＆団体", clubTypeNumber: "clubType_1" },
  島田泉: { clubType: "研究会", clubTypeNumber: "clubType_5" },
  鍋島ちより: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  小倉愛: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  岩本樹: { clubType: "文化部(日本)", clubTypeNumber: "clubType_8" },
  前田彩賀: { clubType: "文化部(日本)", clubTypeNumber: "clubType_8" },
  皆藤蜜子: { clubType: "文化部(日本)", clubTypeNumber: "clubType_8" },
  遠山未涼: { clubType: "研究会", clubTypeNumber: "clubType_5" },
  伊勢谷里都: { clubType: "運動部(個人競技)", clubTypeNumber: "clubType_3" },
  水野楓夏: { clubType: "委員会＆団体", clubTypeNumber: "clubType_1" },
  岸田稚慧: { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  小泉由佳: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  緒川唯: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  江藤くるみ: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  東野梓: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  早見英子: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  桐山優月: { clubType: "研究会", clubTypeNumber: "clubType_5" },
  柊真琴: { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  神崎ミコト: { clubType: "委員会＆団体", clubTypeNumber: "clubType_1" },
  円城寺小菊: { clubType: "文化部(日本)", clubTypeNumber: "clubType_8" },
  西野彩音: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  長谷川美卯: { clubType: "委員会＆団体", clubTypeNumber: "clubType_1" },
  川上瀬莉: { clubType: "文化部(日本)", clubTypeNumber: "clubType_8" },
  成瀬まなみ: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  一色愛瑠: { clubType: "研究会", clubTypeNumber: "clubType_5" },
  五代律: { clubType: "運動部(個人競技)", clubTypeNumber: "clubType_3" },
  竜ヶ崎珠里椏: { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  上条るい: { clubType: "運動部(個人競技)", clubTypeNumber: "clubType_3" },
  南條クミコ: { clubType: "委員会＆団体", clubTypeNumber: "clubType_1" },
  赤瀬川摩姫: { clubType: "研究会", clubTypeNumber: "clubType_5" },
  雪風真弥: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  李春燕: { clubType: "運動部(個人競技)", clubTypeNumber: "clubType_3" },
  羽鳥晶: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  林田希羅: { clubType: "委員会＆団体", clubTypeNumber: "clubType_1" },
  綾小路美麗: { clubType: "運動部(個人競技)", clubTypeNumber: "clubType_3" },
  皆口英里: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  山田はな: { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  高崎瑠依: { clubType: "研究会", clubTypeNumber: "clubType_5" },
  新垣雛菜: { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  八束由紀恵: { clubType: "委員会＆団体", clubTypeNumber: "clubType_1" },
  櫻井明音: { clubType: "委員会＆団体", clubTypeNumber: "clubType_1" },
  山野こだま: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  白鳥詩織: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  "ユーリヤ・ヴャルコワ": { clubType: "運動部", clubTypeNumber: "clubType_2" },
  新田萌果: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  南田七星: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  正岡真衣: { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  重藤秋穂: { clubType: "運動部(個人競技)", clubTypeNumber: "clubType_3" },
  見吉奈央: { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  黒川凪子: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  小野寺千鶴: { clubType: "研究会", clubTypeNumber: "clubType_5" },
  熊田一葉: { clubType: "運動部(個人競技)", clubTypeNumber: "clubType_3" },
  掛井園美: { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  大山真由里: { clubType: "運動部(個人競技)", clubTypeNumber: "clubType_3" },
  玉井麗巳: { clubType: "運動部(個人競技)", clubTypeNumber: "clubType_3" },
  優木苗: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  東雲レイ: { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  湯川基世: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  小日向いちご: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  "ミス・モノクローム": { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  姫島木乃子: { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  "クロエ・ルメール": { clubType: "研究会", clubTypeNumber: "clubType_5" },
  椎名心実: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  月白陽子: { clubType: "研究会", clubTypeNumber: "clubType_5" },
  村上文緒: { clubType: "委員会＆団体", clubTypeNumber: "clubType_1" },
  霧生典子: { clubType: "委員会＆団体", clubTypeNumber: "clubType_1" },
  古谷朱里: { clubType: "研究会", clubTypeNumber: "clubType_5" },
  戸村美知留: { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  佐伯鞠香: { clubType: "委員会＆団体", clubTypeNumber: "clubType_1" },
  夢前春瑚: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  飛原鋭子: { clubType: "文化部(日本)", clubTypeNumber: "clubType_8" },
  不知火五十鈴: { clubType: "文化部(日本)", clubTypeNumber: "clubType_8" },
  望月エレナ: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  鈴河凜乃: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  笹原野々花: { clubType: "文化部(日本)", clubTypeNumber: "clubType_8" },
  神楽坂砂夜: { clubType: "委員会＆団体", clubTypeNumber: "clubType_1" },
  春宮つぐみ: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  螺子川来夢: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  宮内希: { clubType: "研究会", clubTypeNumber: "clubType_5" },
  久保田友季: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  荒井薫: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  音羽ユリ: { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  浅見景: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  吉川繭子: { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  三科果歩: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  橘響子: { clubType: "運動部(個人競技)", clubTypeNumber: "clubType_3" },
  弓削楓: { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  鴫野睦: { clubType: "委員会＆団体", clubTypeNumber: "clubType_1" },
  森園芽以: { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  葉月柚子: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  九重忍: { clubType: "研究会", clubTypeNumber: "clubType_5" },
  朝比奈桃子: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  畑山政子: { clubType: "運動部(個人競技)", clubTypeNumber: "clubType_3" },
  加賀美茉莉: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  甘利燈: { clubType: "研究会", clubTypeNumber: "clubType_5" },
  石田いすき: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  夏目真尋: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  天都かなた: { clubType: "委員会＆団体", clubTypeNumber: "clubType_1" },
  有栖川小枝子: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  君嶋里琉: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  時谷小瑠璃: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  三嶋ゆらら: { clubType: "研究会", clubTypeNumber: "clubType_5" },
  押井知: { clubType: "委員会＆団体", clubTypeNumber: "clubType_1" },
  白瀬つづり: { clubType: "文化部(日本)", clubTypeNumber: "clubType_8" },
  風町陽歌: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  相楽エミ: { clubType: "研究会", clubTypeNumber: "clubType_5" },
  千代浦あやめ: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  栢嶋乙女: { clubType: "研究会", clubTypeNumber: "clubType_5" },
  川淵一美: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  芙来田伊吹: { clubType: "文化部(日本)", clubTypeNumber: "clubType_8" },
  武内未美: { clubType: "研究会", clubTypeNumber: "clubType_5" },
  蓬田菫: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  篠宮りさ: { clubType: "委員会＆団体", clubTypeNumber: "clubType_1" },
  七海四季: { clubType: "研究会", clubTypeNumber: "clubType_5" },
  織部千華: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  吉永和花那: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  祐天寺弥生: { clubType: "委員会＆団体", clubTypeNumber: "clubType_1" },
  深見絵真: { clubType: "運動部", clubTypeNumber: "clubType_2" },
  花房優輝: { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  鳴海調: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  反町牡丹: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  浮橋明日香: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  直江悠: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  朝門春日: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  牧瀬昴: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  久仁城雅: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  藤堂静子: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  真白透子: { clubType: "帰宅部 ", clubTypeNumber: "clubType_4" },
  豊永日々喜: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  "アネット・O・唐澤": { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  三条八重: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  高良美空: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  高良美海: { clubType: "文化部(音楽系)", clubTypeNumber: "clubType_7" },
  白水六花: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  酒井田夏海: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  奈木野さくら: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  月隈林子: { clubType: "文化部", clubTypeNumber: "clubType_6" },
  一ノ瀬友恵: { clubType: "設定なし", clubTypeNumber: "---" },
  お助け部: { clubType: "文化部", clubTypeNumber: "clubType_6" },
};

/* 聖櫻ワールドのみで使用。他校生に学年バフが掛からない仕様に対応するため、他校生はコメントアウトしている。*/
const NAME_TO_PROFILE_CONVERT = {
  日野奏恵: { profileId: "1", type: "SWEET", grade: "3年", school: "聖櫻学園" },
  伊勢崎郁歩: { profileId: "2", type: "SWEET", grade: "2年", school: "聖櫻学園" },
  林田たまき: { profileId: "3", type: "SWEET", grade: "3年", school: "聖櫻学園" },
  島田泉: { profileId: "4", type: "SWEET", grade: "1年", school: "聖櫻学園" },
  鍋島ちより: { profileId: "5", type: "SWEET", grade: "3年", school: "聖櫻学園" },
  小倉愛: { profileId: "6", type: "SWEET", grade: "1年", school: "聖櫻学園" },
  岩本樹: { profileId: "7", type: "COOL", grade: "2年", school: "聖櫻学園" },
  前田彩賀: { profileId: "8", type: "COOL", grade: "2年", school: "聖櫻学園" },
  皆藤蜜子: { profileId: "9", type: "COOL", grade: "3年", school: "聖櫻学園" },
  遠山未涼: { profileId: "10", type: "COOL", grade: "2年", school: "聖櫻学園" },
  伊勢谷里都: { profileId: "11", type: "COOL", grade: "3年", school: "聖櫻学園" },
  水野楓夏: { profileId: "12", type: "COOL", grade: "---", school: "聖櫻学園" },
  岸田稚慧: { profileId: "13", type: "POP", grade: "2年", school: "聖櫻学園" },
  小泉由佳: { profileId: "14", type: "POP", grade: "1年", school: "聖櫻学園" },
  緒川唯: { profileId: "15", type: "POP", grade: "3年", school: "聖櫻学園" },
  江藤くるみ: { profileId: "16", type: "POP", grade: "1年", school: "聖櫻学園" },
  東野梓: { profileId: "17", type: "POP", grade: "2年", school: "聖櫻学園" },
  早見英子: { profileId: "18", type: "POP", grade: "2年", school: "聖櫻学園" },
  桐山優月: { profileId: "19", type: "POP", grade: "2年", school: "聖櫻学園" },
  柊真琴: { profileId: "20", type: "SWEET", grade: "1年", school: "聖櫻学園" },
  神崎ミコト: { profileId: "21", type: "COOL", grade: "---", school: "聖櫻学園" },
  円城寺小菊: { profileId: "22", type: "SWEET", grade: "1年", school: "聖櫻学園" },
  西野彩音: { profileId: "23", type: "SWEET", grade: "1年", school: "聖櫻学園" },
  長谷川美卯: { profileId: "24", type: "SWEET", grade: "1年", school: "聖櫻学園" },
  川上瀬莉: { profileId: "25", type: "SWEET", grade: "2年", school: "聖櫻学園" },
  成瀬まなみ: { profileId: "26", type: "SWEET", grade: "1年", school: "聖櫻学園" },
  一色愛瑠: { profileId: "27", type: "SWEET", grade: "3年", school: "聖櫻学園" },
  五代律: { profileId: "28", type: "COOL", grade: "3年", school: "聖櫻学園" },
  竜ヶ崎珠里椏: { profileId: "29", type: "COOL", grade: "1年", school: "聖櫻学園" },
  上条るい: { profileId: "30", type: "COOL", grade: "2年", school: "聖櫻学園" },
  南條クミコ: { profileId: "31", type: "COOL", grade: "2年", school: "聖櫻学園" },
  赤瀬川摩姫: { profileId: "32", type: "COOL", grade: "2年", school: "聖櫻学園" },
  雪風真弥: { profileId: "33", type: "COOL", grade: "2年", school: "聖櫻学園" },
  李春燕: { profileId: "34", type: "POP", grade: "2年", school: "聖櫻学園" },
  羽鳥晶: { profileId: "35", type: "POP", grade: "2年", school: "聖櫻学園" },
  林田希羅: { profileId: "36", type: "POP", grade: "1年", school: "聖櫻学園" },
  綾小路美麗: { profileId: "37", type: "POP", grade: "1年", school: "聖櫻学園" },
  皆口英里: { profileId: "38", type: "POP", grade: "2年", school: "聖櫻学園" },
  山田はな: { profileId: "39", type: "POP", grade: "2年", school: "聖櫻学園" },
  高崎瑠依: { profileId: "40", type: "POP", grade: "2年", school: "聖櫻学園" },
  新垣雛菜: { profileId: "41", type: "SWEET", grade: "2年", school: "聖櫻学園" },
  八束由紀恵: { profileId: "42", type: "COOL", grade: "2年", school: "聖櫻学園" },
  櫻井明音: { profileId: "43", type: "POP", grade: "2年", school: "聖櫻学園" },
  山野こだま: { profileId: "44", type: "SWEET", grade: "1年", school: "聖櫻学園" },
  白鳥詩織: { profileId: "45", type: "SWEET", grade: "2年", school: "聖櫻学園" },
  "ユーリヤ・ヴャルコワ": { profileId: "46", type: "SWEET", grade: "1年", school: "聖櫻学園" },
  新田萌果: { profileId: "47", type: "SWEET", grade: "1年", school: "聖櫻学園" },
  南田七星: { profileId: "48", type: "SWEET", grade: "2年", school: "聖櫻学園" },
  正岡真衣: { profileId: "49", type: "COOL", grade: "3年", school: "聖櫻学園" },
  重藤秋穂: { profileId: "50", type: "COOL", grade: "3年", school: "聖櫻学園" },
  見吉奈央: { profileId: "51", type: "COOL", grade: "2年", school: "聖櫻学園" },
  黒川凪子: { profileId: "52", type: "COOL", grade: "2年", school: "聖櫻学園" },
  小野寺千鶴: { profileId: "53", type: "POP", grade: "3年", school: "聖櫻学園" },
  熊田一葉: { profileId: "54", type: "POP", grade: "2年", school: "聖櫻学園" },
  掛井園美: { profileId: "55", type: "POP", grade: "2年", school: "聖櫻学園" },
  大山真由里: { profileId: "56", type: "POP", grade: "1年", school: "聖櫻学園" },
  玉井麗巳: { profileId: "57", type: "POP", grade: "3年", school: "聖櫻学園" },
  優木苗: { profileId: "58", type: "SWEET", grade: "1年", school: "聖櫻学園" },
  東雲レイ: { profileId: "59", type: "COOL", grade: "2年", school: "聖櫻学園" },
  湯川基世: { profileId: "60", type: "POP", grade: "2年", school: "聖櫻学園" },
  小日向いちご: { profileId: "61", type: "SWEET", grade: "1年", school: "聖櫻学園" },
  "ミス・モノクローム": { profileId: "62", type: "COOL", grade: "2年", school: "聖櫻学園" },
  姫島木乃子: { profileId: "63", type: "POP", grade: "2年", school: "聖櫻学園" },
  "クロエ・ルメール": { profileId: "64", type: "SWEET", grade: "3年", school: "聖櫻学園" },
  椎名心実: { profileId: "65", type: "COOL", grade: "2年", school: "聖櫻学園" },
  月白陽子: { profileId: "66", type: "COOL", grade: "---", school: "聖櫻学園" },
  村上文緒: { profileId: "67", type: "COOL", grade: "3年", school: "聖櫻学園" },
  霧生典子: { profileId: "68", type: "COOL", grade: "2年", school: "聖櫻学園" },
  古谷朱里: { profileId: "69", type: "POP", grade: "2年", school: "聖櫻学園" },
  戸村美知留: { profileId: "70", type: "POP", grade: "2年", school: "聖櫻学園" },
  佐伯鞠香: { profileId: "71", type: "SWEET", grade: "2年", school: "聖櫻学園" },
  夢前春瑚: { profileId: "72", type: "SWEET", grade: "1年", school: "聖櫻学園" },
  飛原鋭子: { profileId: "73", type: "COOL", grade: "3年", school: "聖櫻学園" },
  不知火五十鈴: { profileId: "74", type: "COOL", grade: "2年", school: "聖櫻学園" },
  望月エレナ: { profileId: "75", type: "SWEET", grade: "3年", school: "聖櫻学園" },
  鈴河凜乃: { profileId: "76", type: "POP", grade: "2年", school: "聖櫻学園" },
  笹原野々花: { profileId: "77", type: "SWEET", grade: "3年", school: "聖櫻学園" },
  神楽坂砂夜: { profileId: "78", type: "COOL", grade: "3年", school: "聖櫻学園" },
  春宮つぐみ: { profileId: "79", type: "POP", grade: "2年", school: "聖櫻学園" },
  螺子川来夢: { profileId: "80", type: "POP", grade: "2年", school: "聖櫻学園" },
  宮内希: { profileId: "81", type: "POP", grade: "1年", school: "聖櫻学園" },
  久保田友季: { profileId: "82", type: "---", grade: "---", school: "聖櫻学園" },
  荒井薫: { profileId: "83", type: "---", grade: "---", school: "聖櫻学園" },
  音羽ユリ: { profileId: "84", type: "COOL", grade: "1年", school: "聖櫻学園" },
  浅見景: { profileId: "85", type: "SWEET", grade: "3年", school: "聖櫻学園" },
  吉川繭子: { profileId: "87", type: "POP", grade: "2年", school: "聖櫻学園" },
  三科果歩: { profileId: "88", type: "SWEET", grade: "1年", school: "聖櫻学園" },
  橘響子: { profileId: "92", type: "SWEET", grade: "---", school: "聖櫻学園" },
  弓削楓: { profileId: "93", type: "POP", grade: "3年", school: "聖櫻学園" },
  鴫野睦: { profileId: "97", type: "COOL", grade: "1年", school: "聖櫻学園" },
  森園芽以: { profileId: "98", type: "SWEET", grade: "1年", school: "聖櫻学園" },
  葉月柚子: { profileId: "99", type: "POP", grade: "1年", school: "聖櫻学園" },
  九重忍: { profileId: "100", type: "POP", grade: "3年", school: "聖櫻学園" },
  朝比奈桃子: { profileId: "101", type: "SWEET", grade: "1年", school: "聖櫻学園" },
  畑山政子: { profileId: "102", type: "---", grade: "---", school: "聖櫻学園" },
  加賀美茉莉: { profileId: "103", type: "SWEET", grade: "2年", school: "聖櫻学園" },
  甘利燈: { profileId: "104", type: "POP", grade: "1年", school: "聖櫻学園" },
  石田いすき: { profileId: "109", type: "POP", grade: "2年", school: "聖櫻学園" },
  夏目真尋: { profileId: "110", type: "COOL", grade: "2年", school: "聖櫻学園" },
  天都かなた: { profileId: "111", type: "SWEET", grade: "3年", school: "聖櫻学園" },
  有栖川小枝子: { profileId: "112", type: "SWEET", grade: "3年", school: "聖櫻学園" },
  君嶋里琉: { profileId: "113", type: "COOL", grade: "1年", school: "聖櫻学園" },
  時谷小瑠璃: { profileId: "115", type: "POP", grade: "3年", school: "聖櫻学園" },
  三嶋ゆらら: { profileId: "116", type: "SWEET", grade: "3年", school: "聖櫻学園" },
  押井知: { profileId: "117", type: "POP", grade: "2年", school: "聖櫻学園" },
  白瀬つづり: { profileId: "119", type: "SWEET", grade: "2年", school: "聖櫻学園" },
  風町陽歌: { profileId: "120", type: "SWEET", grade: "2年", school: "聖櫻学園" },
  相楽エミ: { profileId: "121", type: "POP", grade: "2年", school: "聖櫻学園" },
  千代浦あやめ: { profileId: "122", type: "COOL", grade: "3年", school: "聖櫻学園" },
  栢嶋乙女: { profileId: "123", type: "POP", grade: "3年", school: "聖櫻学園" },
  川淵一美: { profileId: "124", type: "COOL", grade: "2年", school: "聖櫻学園" },
  芙来田伊吹: { profileId: "125", type: "POP", grade: "1年", school: "聖櫻学園" },
  武内未美: { profileId: "138", type: "POP", grade: "2年", school: "聖櫻学園" },
  蓬田菫: { profileId: "148", type: "POP", grade: "2年", school: "聖櫻学園" },
  篠宮りさ: { profileId: "156", type: "POP", grade: "2年", school: "聖櫻学園" },
  七海四季: { profileId: "164", type: "COOL", grade: "2年", school: "聖櫻学園" },
  織部千華: { profileId: "166", type: "COOL", grade: "2年", school: "聖櫻学園" },
  吉永和花那: { profileId: "168", type: "POP", grade: "3年", school: "聖櫻学園" },
  祐天寺弥生: { profileId: "172", type: "POP", grade: "---", school: "聖櫻学園" },
  深見絵真: { profileId: "176", type: "SWEET", grade: "---", school: "聖櫻学園" },
  花房優輝: { profileId: "179", type: "POP", grade: "2年", school: "聖櫻学園" },
  鳴海調: { profileId: "180", type: "SWEET", grade: "---", school: "聖櫻学園" },
  // "反町牡丹" : { profileId : "183", type : "POP", grade : "3年", school : "昇星高校" },
  // "浮橋明日香" : { profileId : "184", type : "SWEET", grade : "2年", school : "昇星高校" },
  // "直江悠" : { profileId : "185", type : "COOL", grade : "3年", school : "昇星高校" },
  // "朝門春日" : { profileId : "194", type : "SWEET", grade : "3年", school : "鳳歌院高校" },
  // "牧瀬昴" : { profileId : "195", type : "POP", grade : "2年", school : "鳳歌院高校" },
  // "久仁城雅" : { profileId : "196", type : "COOL", grade : "3年", school : "鳳歌院高校" },
  藤堂静子: { profileId: "199", type: "COOL", grade: "---", school: "聖櫻学園" },
  真白透子: { profileId: "200", type: "COOL", grade: "2年", school: "聖櫻学園" },
  // "豊永日々喜" : { profileId : "202", type : "POP", grade : "3年", school : "嵯峨椿高校" },
  // "アネット・O・唐澤" : { profileId : "203", type : "SWEET", grade : "3年", school : "嵯峨椿高校" },
  // "三条八重" : { profileId : "204", type : "COOL", grade : "3年", school : "嵯峨椿高校" },
  // "高良美空" : { profileId : "208", type : "POP", grade : "2年", school : "玉宮高校" },
  // "高良美海" : { profileId : "209", type : "POP", grade : "2年", school : "玉宮高校" },
  白水六花: { profileId: "235", type: "SWEET", grade: "2年", school: "聖櫻学園" },
  酒井田夏海: { profileId: "236", type: "POP", grade: "3年", school: "聖櫻学園" },
  奈木野さくら: { profileId: "237", type: "SWEET", grade: "1年", school: "聖櫻学園" },
  月隈林子: { profileId: "238", type: "COOL", grade: "1年", school: "聖櫻学園" },
  // "一ノ瀬友恵" : { profileId : "260", type : "COOL", grade : "2年", school : "聖櫻学園" },
  若林璃子: { profileId: "999", type: "---", grade: "3年", school: "聖櫻学園" },
};
