import { EventType } from "./eventData";

export const MAX_SKILL_LEVEL = 18;
export const INIT_SKILL_LEVEL = 12;

export interface SkillDataPerEvent {
  skillMaxNumMain: number;
  skillProbabilityMain: number[];
  skillMaxNumSubSwitchOff: number;
  skillProbabilitySubSwitchOff: number[];
  annotations?: string[];
}

export const SKILL_DATA_PER_EVENT: { [K in EventType]: SkillDataPerEvent } = {
  raidFirst: {
    skillMaxNumMain: 5,
    skillProbabilityMain: [100.00, 30.00, 30.00, 30.00, 30.00],
    skillMaxNumSubSwitchOff: 2,
    skillProbabilitySubSwitchOff: [30.00, 30.00, 27.30, 23.52, 19.55],
  },
  raidSecond: {
    skillMaxNumMain: 3,
    skillProbabilityMain: [100.00, 100.00, 100.00, 0.00, 0.00],
    skillMaxNumSubSwitchOff: 2,
    skillProbabilitySubSwitchOff: [100.00, 100.00, 0.00, 0.00, 0.00],
    annotations: ["主センバツは(基本的には)効果が高い順に自動で 3人まで 選出される。", "副センバツに配置したスイッチOFFガールの声援は 2人まで 100% の確率で発動する。"]
  },
  raidMega: {
    skillMaxNumMain: 5,
    skillProbabilityMain: [100.00, 30.00, 30.00, 30.00, 30.00],
    skillMaxNumSubSwitchOff: 0,
    skillProbabilitySubSwitchOff: [0.00, 0.00, 0.00, 0.00, 0.00],
    annotations: ["副センバツにスイッチOFFガールを配置しても声援は発動しない。"]
  },
  raidwar: {
    skillMaxNumMain: 3,
    skillProbabilityMain: [100.00, 30.00, 30.00, 27.30, 23.52],
    skillMaxNumSubSwitchOff: 2,
    skillProbabilitySubSwitchOff: [30.00, 30.00, 27.30, 23.52, 19.55],
  },
  clubcup: {
    skillMaxNumMain: 5,
    skillProbabilityMain: [100.00, 100.00, 100.00, 100.00, 100.00],
    skillMaxNumSubSwitchOff: 2,
    skillProbabilitySubSwitchOff: [100.00, 100.00, 0.00, 0.00, 0.00],
    annotations: ["主センバツ全員の声援が 100% の確率で発動する。", "副センバツに配置したスイッチOFFガールの声援は 2人まで 100% の確率で発動する。"]
  },
  championship: {
    skillMaxNumMain: 5,
    skillProbabilityMain: [100.00, 30.00, 30.00, 30.00, 30.00, 29.76, 29.08, 27.89, 26.22, 24.18],
    skillMaxNumSubSwitchOff: 2,
    skillProbabilitySubSwitchOff: [30.00, 30.00, 27.30, 23.52, 19.55],
  },
  tower: {
    skillMaxNumMain: 3,
    skillProbabilityMain: [100.00, 30.00, 30.00, 27.30, 23.52],
    skillMaxNumSubSwitchOff: 2,
    skillProbabilitySubSwitchOff: [30.00, 30.00, 27.30, 23.52, 19.55],
  },
  divrace: {
    skillMaxNumMain: 3,
    skillProbabilityMain: [100.00, 30.00, 30.00, 27.30, 23.52],
    skillMaxNumSubSwitchOff: 2,
    skillProbabilitySubSwitchOff: [30.00, 30.00, 27.30, 23.52, 19.55],
  },
  board: {
    skillMaxNumMain: 3,
    skillProbabilityMain: [100.00, 30.00, 30.00, 27.30, 23.52],
    skillMaxNumSubSwitchOff: 2,
    skillProbabilitySubSwitchOff: [30.00, 30.00, 27.30, 23.52, 19.55],
  },
  normalBattle: {
    skillMaxNumMain: 3,
    skillProbabilityMain: [100.00, 30.00, 30.00, 27.30, 23.52],
    skillMaxNumSubSwitchOff: 2,
    skillProbabilitySubSwitchOff: [30.00, 30.00, 27.30, 23.52, 19.55],
  },
} as const;


export type SkillStrength =
  | "中" | "中+" | "中++" | "大" | "特大" | "特大+" | "特大++" | "スーパー特大"
  | "スーパー特大+" | "スーパー特大++" | "超スーパー特大"

type SkillRateData = {
  [K in "単タイプ" | "全タイプ"]?: {
    [K in "主＋副" | "主のみ" | "副のみ"]?: {
      [K in "副人数0" | "副人数1" | "副人数2"]?: {
        [K in "攻" | "守" | "攻守"]?: {
          [K in SkillStrength]?: {
            value: number,
            isTemp?: boolean
          }
        }
      }
    }
  }
}

export const SKILL_RATE_DATA: SkillRateData = {
  "単タイプ": {
    "主＋副": {
      "副人数1" : {
        "攻": {
          "特大": { value: 20 },
          "スーパー特大": { value: 30 },
          "超スーパー特大": { value: 41 },
        },
        "守": {
          "特大": { value: 20 },
          "スーパー特大": { value: 30 },
          "超スーパー特大": { value: 41 },
        },
        "攻守": {
          "中": { value: 8 },
          "大": { value: 15 },
          "特大": { value: 21 },
          "スーパー特大+": { value: 30 },
          "スーパー特大++": { value: 35 },
        },
      },
      "副人数2" : {
        "攻": {
          "大": { value: 16 },
          "特大+": { value: 21 },
        },
        "守": {
          "大": { value: 16 },
          "特大+": { value: 21 },
        },
        "攻守": {
          "大": { value: 16 },
          "特大+": { value: 21 },
          "特大++": { value: 23 },
        },
      },
    },
    "主のみ": {
      "副人数0" : {
        "攻": {
          "中": { value: 10 },
          "大": { value: 13 },
          "特大": { value: 20 },
          "スーパー特大": { value: 30 },
          "超スーパー特大": { value: 41, isTemp: true },
        },
        "守": {
          "中": { value: 10 },
          "大": { value: 13 },
          "特大": { value: 20 },
          "スーパー特大": { value: 30 },
          "超スーパー特大": { value: 41, isTemp: true },
        },
        "攻守": {
          "中": { value: 8 },
          "大": { value: 15 },
          "特大": { value: 22 },
          "スーパー特大": { value: 28 },
          "スーパー特大+": { value: 30 },
          "スーパー特大++": { value: 35 },
        },
      },
    },
    "副のみ": {
      "副人数2" : {
        "攻": {
          "中+": { value: 11 },
          "大": { value: 16 },
          "特大": { value: 21 },
        },
        "守": {
          "中+": { value: 11 },
          "大": { value: 16 },
          "特大": { value: 21 },
        },
        "攻守": {
          "中+": { value: 11 },
          "中++": { value: 12 },
          "大": { value: 16 },
          "スーパー特大": { value: 30 },
          "スーパー特大+": { value: 30, isTemp: true },
          "スーパー特大++": { value: 35, isTemp: true },
          "超スーパー特大": { value: 41, isTemp: true },
        },
      },
    },
  },
  "全タイプ": {
    "主＋副": {
      "副人数1": {
        "攻": {
          "中": { value: 8 },
          "大": { value: 15 },
          "特大": { value: 22 },
          "超スーパー特大": { value: 41 },
        },
        "守": {
          "中": { value: 8 },
          "大": { value: 15 },
          "特大": { value: 22 },
          "超スーパー特大": { value: 41 },
        },
      },
    },
    "主のみ": {
      "副人数0": {
        "攻": {
          "中": { value: 8 },
          "大": { value: 15 },
          "特大": { value: 22 },
        },
        "守": {
          "中": { value: 8 },
          "大": { value: 15 },
          "特大": { value: 22 },
        },
        "攻守": {
          "大": { value: 15, isTemp: true },
          "特大": { value: 22, isTemp: true },
        },
      },
    },
    "副のみ": {
      "副人数2": {
        "攻": {
          "中": { value: 9 },
          "特大": { value: 21 },
        },
        "守": {
          "中": { value: 9 },
          "特大": { value: 21 },
        },
      }
    }
  }
} as const;
