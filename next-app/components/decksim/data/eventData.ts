export type EventType =
  | "raidFirst"
  | "raidSecond"
  | "raidMega"
  | "raidwar"
  | "clubcup"
  | "championship"
  | "tower"
  | "divrace"
  | "board"
  | "normalBattle";

export const EVENT_ID_TO_NAME_DICT = {
  "raid-first": "たすけて！マイヒーロー 前半",
  "raid-second-attack": "たすけて！マイヒーロー 後半攻援",
  "raid-second-defense": "たすけて！マイヒーロー 後半守援",
  "raid-mega": "たすけて！マイヒーロー メガ悪男",
  "raidwar": "おねがい★ハンターズ",
  "raidwar-skill": "おねがい★ハンターズ ハンター声援",
  "clubcup": "部活対抗！勧誘★グランプリ",
  "championship": "聖櫻学園★カリスマ決定戦 攻援",
  "championship-defense": "聖櫻学園★カリスマ決定戦 守援",
  "tower": "聖櫻学園メモリアルストーリー",
  "divrace": "全国高校生課外活動コンテスト",
  "divrace-stage": "全国高校生課外活動コンテスト ステージシミュ",
  "board": "散策♪聖櫻ワールド",
  "normal-battle": "通常バトル",
} as const;

export const SAVE_DATA_COMPATIBILITY_TABLE: {
  [K in keyof typeof EVENT_ID_TO_NAME_DICT]?: string[]
} = {
  "raidwar-skill": ["raidwar-skill"],
  "divrace-stage": ["divrace-stage"],
} as const;

export const SAVE_DATA_SUMMARY_KEY_LIST: {
  [K in keyof typeof EVENT_ID_TO_NAME_DICT]?: string[]
} = {
  "raidwar-skill": ["lastUpdate", "memo"],
  "divrace-stage": [
    "lastUpdate", "memo",
    "totalPoint", "totalCandy", "totalNormal", "totalSpecial",
  ],
} as const;
