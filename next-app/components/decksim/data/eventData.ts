export type EventId = keyof typeof EVENT_ID_TO_NAME_DICT;

export type DeckSimulatorEventId =
  Exclude<EventId, "raidwar-skill" | "divrace-stage">;

export const EVENT_ID_TO_NAME_DICT = {
  "raid-first": "たすけて！マイヒーロー 前半",
  "raid-second": "たすけて！マイヒーロー 後半",
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
  [K in EventId]?: string[]
} = {
  "raidwar-skill": ["raidwar-skill"],
  "divrace-stage": ["divrace-stage"],
  "raid-first": [
    "raid-first", "raid-second", "raid-mega", "raidwar", "clubcup",
    "championship", "championship-defense", "tower", "divrace", "board",
    "normal-battle"
  ],
  "raid-second": [
    "raid-first", "raid-second", "raid-mega", "raidwar", "clubcup",
    "championship", "championship-defense", "tower", "divrace", "board",
    "normal-battle"
  ],
  "raid-mega": [
    "raid-first", "raid-second", "raid-mega", "raidwar", "clubcup",
    "championship", "championship-defense", "tower", "divrace", "board",
    "normal-battle"
  ],
  "raidwar": [
    "raid-first", "raid-second", "raid-mega", "raidwar", "clubcup",
    "championship", "championship-defense", "tower", "divrace", "board",
    "normal-battle"
  ],
  "clubcup": [
    "raid-first", "raid-second", "raid-mega", "raidwar", "clubcup",
    "championship", "championship-defense", "tower", "divrace", "board",
    "normal-battle"
  ],
  "championship": [
    "raid-first", "raid-second", "raid-mega", "raidwar", "clubcup",
    "championship", "championship-defense", "tower", "divrace", "board",
    "normal-battle"
  ],
  "championship-defense": [
    "raid-first", "raid-second", "raid-mega", "raidwar", "clubcup",
    "championship", "championship-defense", "tower", "divrace", "board",
    "normal-battle"
  ],
  "tower": [
    "raid-first", "raid-second", "raid-mega", "raidwar", "clubcup",
    "championship", "championship-defense", "tower", "divrace", "board",
    "normal-battle"
  ],
  "divrace": [
    "raid-first", "raid-second", "raid-mega", "raidwar", "clubcup",
    "championship", "championship-defense", "tower", "divrace", "board",
    "normal-battle"
  ],
  "board": [
    "raid-first", "raid-second", "raid-mega", "raidwar", "clubcup",
    "championship", "championship-defense", "tower", "divrace", "board",
    "normal-battle"
  ],
  "normal-battle": [
    "raid-first", "raid-second", "raid-mega", "raidwar", "clubcup",
    "championship", "championship-defense", "tower", "divrace", "board",
    "normal-battle"
  ],
} as const;

export const SAVE_DATA_SUMMARY_KEY_LIST: {
  [K in EventId]?: string[]
} = {
  "raidwar-skill": ["lastUpdate", "memo"],
  "divrace-stage": [
    "lastUpdate", "memo",
    "totalPoint", "totalCandy", "totalNormal", "totalSpecial",
  ],
  "raid-first": [
    "lastUpdate", "memo",
    "powerMin", "powerExp", "powerMax",
  ],
  "raid-second": [
    "lastUpdate", "memo",
    "powerMin", "powerExp", "powerMax",
  ],
  "raid-mega": [
    "lastUpdate", "memo",
    "powerMin", "powerExp", "powerMax",
  ],
  "raidwar": [
    "lastUpdate", "memo",
    "powerMin", "powerExp", "powerMax",
  ],
  "clubcup": [
    "lastUpdate", "memo",
    "powerMin", "powerExp", "powerMax", "skillEffect",
  ],
  "championship": [
    "lastUpdate", "memo",
    "powerMin", "powerExp", "powerMax",
  ],
  "championship-defense": [
    "lastUpdate", "memo",
    "powerMin", "powerExp", "powerMax",
  ],
  "tower": [
    "lastUpdate", "memo",
    "powerMin", "powerExp", "powerMax",
  ],
  "divrace": [
    "lastUpdate", "memo",
    "powerMin", "powerExp", "powerMax",
  ],
  "board": [
    "lastUpdate", "memo",
    "powerMin", "powerExp", "powerMax",
  ],
  "normal-battle": [
    "lastUpdate", "memo",
    "powerMin", "powerExp", "powerMax",
  ],
} as const;
