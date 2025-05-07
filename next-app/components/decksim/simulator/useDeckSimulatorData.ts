import { useState, useCallback } from "react";
import { EVENT_ID_TO_NAME_DICT } from "@/components/decksim/data/eventData";
import { calcDeckSimulatorResult } from "@/components/decksim/simulator/calcDeckSimulatorResult";

import { setDeepValue } from "@/lib/setDeepValue";

export interface DeckSimulatorData {
  dataType: keyof typeof EVENT_ID_TO_NAME_DICT;
  mainScenes: {
    [K: number]: {
      basePower?: number | string;
      strap?: number | string;
      type?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "その他";
      rarity?: "Luv" | "UR" | "SSR" | "SR";
      cost?: number | string;
      skillLv?: number | string;
      grade?: "1年" | "2年" | "3年" | "その他";
      isClubMatch?: boolean;
      isDate?: boolean;
      isTouch?: boolean;
      isBirthday?: boolean;
      isLimitBreak?: boolean;
      isBestFriend?: boolean;
      isSpecial?: boolean;
    };
  };
  mainSkill: {
    [K: number]: {
      isValid?: boolean;
      skillLv?: number | string;
      target?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "全タイプ";
      range?: "主＋副" | "主のみ" | "副のみ";
      subRange?: number | string;
      type?: "攻" | "守" | "攻守";
      strength?:
        | "中"
        | "中+"
        | "中++"
        | "大"
        | "特大"
        | "特大+"
        | "特大++"
        | "スーパー特大"
        | "スーパー特大+"
        | "スーパー特大++"
        | "超スーパー特大";
      oldUrChangeNum?: number | string;
    };
  };
  subScenes: {
    [K: number]: {
      basePower?: number | string;
      strap?: number | string;
      type?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "その他";
      rarity?: "Luv" | "UR" | "SSR" | "SR";
      cost?: number | string;
      skillLv?: number | string;
      grade?: "1年" | "2年" | "3年" | "その他";
      isClubMatch?: boolean;
      isDate?: boolean;
      isTouch?: boolean;
      isBirthday?: boolean;
      isLimitBreak?: boolean;
      isBestFriend?: boolean;
      isSpecial?: boolean;
    };
  };
  subSwitch: {
    [K: number]: {
      isValid?: boolean;
      skillLv?: number | string;
      target?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "全タイプ";
      range?: "主＋副" | "主のみ" | "副のみ";
      subRange?: number | string;
      type?: "攻" | "守" | "攻守";
      strength?:
        | "中"
        | "中+"
        | "中++"
        | "大"
        | "特大"
        | "特大+"
        | "特大++"
        | "スーパー特大"
        | "スーパー特大+"
        | "スーパー特大++"
        | "超スーパー特大";
      oldUrChangeNum?: number | string;
    };
  };
  preciousScenes: {
    [K: number]: {
      isValid?: boolean;
      id?: number;
      rarity?: number;
    };
  };
  petitGirls: {
    totalPower: {
      attack: number;
      defense: number;
    };
    effects: {
      [K: number]: {
        [K: number]: {
          id?: number;
        };
        isRarityUr?: boolean;
      };
    };
    details: {
      [K: number]: {
        [K: number]: {
          attack?: number;
          defense?: number;
          skillTarget?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "全タイプ";
          SkillValue?: number;
        };
      };
    };
  };
  deckBonus: {
    normal: {
      [K: number]: {
        level: number;
        type: "攻" | "守" | "攻守";
      };
    };
    shine: {
      level: number;
      type: "攻守";
    };
    precious: {
      level: number;
      type: "攻守";
    };
    preciousPlus: {
      level: number;
      type: "攻守";
    };
  };
  playerData: {
    playerType: "SWEETタイプ" | "COOLタイプ" | "POPタイプ";
    clubPosition:
      | "leader"
      | "subLeader"
      | "attackCaptain"
      | "defenseCaptain"
      | "member";
    mensCologne: {
      sweet: {
        level: number;
      };
      cool: {
        level: number;
      };
      pop: {
        level: number;
      };
    };
    clubItem: {
      sweet: {
        isValid: boolean;
      };
      cool: {
        isValid: boolean;
      };
      pop?: {
        isValid: boolean;
      };
    };
  };
  eventSpecial: {
    raidFirst?: {
      enemyType?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "通常タイプ";
      attackType?: "元気炭酸アメ" | "元気炭酸" | "勇気炭酸";
      comboNum?: 0 | 1 | 5 | 10 | 50 | 100;
      specialGirlsEffect?: number;
      isConvertPoint?: boolean;
      isAssistMembers?: boolean;
    };
    raidSecond?: {
      enemyType?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "通常タイプ";
      attackType?: "元気炭酸アメ" | "元気炭酸" | "勇気炭酸";
      comboNum?: 0 | 1 | 5 | 10 | 50 | 100;
      specialGirlsEffect?: number;
      isConvertPoint?: boolean;
      isAssistMembers?: boolean;
    };
    raidMega?: {
      enemyType?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ";
      attackType?: "元気炭酸アメ" | "元気炭酸" | "勇気炭酸";
      specialGirlsEffect?: number;
      isConvertPoint?: boolean;
      attackUpBuff?: number;
      defenseDownDeBuff?: number;
    };
    raidwar?: {
      enemyType?: "夜行性激レア" | "超レアLv50" | "超レアLv59" | "超レアLv64";
      attackType?: "元気炭酸アメ" | "元気炭酸" | "本気炭酸";
      attackNum?: number;
      comboNum?: 0 | 6 | 12 | 18 | 24 | 30 | 36 | 42 | 48 | 50;
      specialGirlsEffect?: number;
      isConvertPoint?: boolean;
      attackUpBuff?: number;
      totalSkillDamage?: number;
    };
    clubcup?: {
      pointUpBonus?: number;
      attackUpBonus?: number;
      isWinBonus?: boolean;
      isConvertPoint?: boolean;
      attackType?: "全力勧誘" | "全力勧誘×3";
      specialGirlsEffectPercent?: number;
      specialGirlsEffectFix?: number;
      rivalSkillEffectDown?: number;
      isRivalLeader?: boolean;
    };
    championship?: {
      appealType?: "アピール対決" | "アピールタイム" | "レアアピールタイム";
      heartNum?: number;
      isTensionMax?: boolean;
      TurnNum?: number;
      specialGirlsEffect?: number;
      isConvertPoint?: boolean;
    };
    championshipDefense?: Record<string, never>;
    tower?: Record<string, never>;
    divrace?: {
      specialGirlsEffect?: number;
      stage?: "ベースステージ" | "チャレンジステージ";
      item?: {
        [K: number]: {
          isValid?: boolean;
        };
      };
    };
    board?: {
      specialGirlsEffect?: number;
      weatherNum?: number;
      spaceEffects?: {
        [K: number]: {
          value: string | number;
        };
      };
    };
    normalBattle?: {
      isWinBonus?: boolean;
    };
  };
}
const initData: DeckSimulatorData = {
  dataType: "raidwar",
  mainScenes: {},
  mainSkill: {},
  subScenes: {},
  subSwitch: {},
  preciousScenes: {},
  petitGirls: {
    totalPower: {
      attack: 0,
      defense: 0,
    },
    effects: {},
    details: {},
  },
  deckBonus: {
    normal: {},
    shine: {
      level: 0,
      type: "攻守",
    },
    precious: {
      level: 0,
      type: "攻守",
    },
    preciousPlus: {
      level: 0,
      type: "攻守",
    },
  },
  playerData: {
    playerType: "SWEETタイプ",
    clubPosition: "leader",
    mensCologne: {
      sweet: {
        level: 0,
      },
      cool: {
        level: 0,
      },
      pop: {
        level: 0,
      },
    },
    clubItem: {
      sweet: {
        isValid: true,
      },
      cool: {
        isValid: true,
      },
      pop: {
        isValid: true,
      },
    },
  },
  eventSpecial: {},
} as const;

export interface DeckSimulatorResult {
  dataType: keyof typeof EVENT_ID_TO_NAME_DICT;
  initCondition: boolean;
  summaries: { [K in number]: string };
}
const initResultSummary: DeckSimulatorResult = {
  dataType: "raidwar",
  initCondition: true,
  summaries: {},
} as const;

export interface DeckSimulatorSavedDataSummary {
  lastUpdate: string;
  memo: string;
  powerMin: number;
  powerExp: number;
  powerMax: number;
  skillEffect: number;
}
export const initDeckSimulatorSavedDataSummary: DeckSimulatorSavedDataSummary =
  {
    lastUpdate: "",
    memo: "",
    powerMin: 0,
    powerExp: 0,
    powerMax: 0,
    skillEffect: 0,
  } as const;
export interface DeckSimulatorLocalStorageData
  extends DeckSimulatorSavedDataSummary {
  version: number;
  data: DeckSimulatorData;
}

export function useDeckSimulatorData({
  simulatorTabButtonRef,
  eventId,
}: {
  simulatorTabButtonRef: React.RefObject<HTMLInputElement>;
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
}) {
  const [data, setData] = useState(() => {
    const baseData = structuredClone(initData);
    baseData.dataType = eventId;
    return baseData;
  });

  const [resultSummary, setResultSummary] = useState(() => {
    const baseData = structuredClone(initResultSummary);
    baseData.dataType = eventId;
    return baseData;
  });

  const calcResultSummaries = useCallback(
    (data: DeckSimulatorData) => {
      const summary = structuredClone(initResultSummary);
      summary.dataType = eventId;
      summary.initCondition = false;
      calcDeckSimulatorResult({ data, summary });
      setResultSummary(summary);
    },
    [eventId]
  );

  const handleChangeParameters = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const nextData = structuredClone(data);

      const target = e.currentTarget;
      if (!target.dataset["path"]) return;

      const path = target.dataset["path"];
      const value: string | boolean =
        target instanceof HTMLInputElement && target.type === "checkbox"
          ? target.checked
          : target.value;

      setDeepValue(nextData, path, value);

      setData(nextData);
      calcResultSummaries(nextData);
    },
    [data, calcResultSummaries]
  );

  const handleBlurParameters = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      const nextData = structuredClone(data);
      const path = e.currentTarget.dataset["path"];

      // onBlurでnumber型に校正
      let value = Number(e.currentTarget.value.replaceAll(",", ""));
      if (Number.isNaN(value)) value = 0;

      if (!path) return;
      setDeepValue(nextData, path, value);

      setData(nextData);
      calcResultSummaries(nextData);
    },
    [data, calcResultSummaries]
  );

  const handleLoadData = useCallback(
    (newData: DeckSimulatorData) => {
      setData(newData);
      calcResultSummaries(newData);
    },
    [calcResultSummaries]
  );

  const importRawDataDeckSimulator = useCallback(
    (importData: unknown) => {
      if (typeof importData === "object" && typeof importData !== null) {
        const nextData = structuredClone(initData);
        // const rawData = importData as RawDataDeckSimulator;

        // const leaderType = rawData?.data?.leaderCardBean?.skillBean?.type;
        // const leaderDamage = rawData?.data?.leaderCardBean?.skillBean?.value;
        // const leaderHeart =
        //   rawData?.data?.leaderCardBean?.skillBean?.needHeartCount;
        // if (leaderType === "DAMAGE" && leaderDamage !== undefined) {
        //   nextData.leader[1] = { damage: leaderDamage, heartNum: leaderHeart };
        // } else {
        //   nextData.leader[1] = { damage: 0, heartNum: leaderHeart };
        // }

        // const memberLength = rawData?.data?.memberCardBeans?.length;
        // if (memberLength) {
        //   rawData?.data?.memberCardBeans.forEach((v, i) => {
        //     const memberType = v.skillBean.type;
        //     const memberDamage = v.skillBean.value;
        //     const memberHeart = v.skillBean.needHeartCount;
        //     if (memberType === "DAMAGE" && memberDamage !== undefined) {
        //       nextData.member[i + 1] = {
        //         damage: memberDamage,
        //         heartNum: memberHeart,
        //       };
        //     } else {
        //       nextData.member[i + 1] = { damage: 0, heartNum: memberHeart };
        //     }
        //   });
        // }

        setData(nextData);
        calcResultSummaries(nextData);
        // データの抽出に成功したらシミュレーター本体のタブを有効にする。
        if (simulatorTabButtonRef.current) {
          simulatorTabButtonRef.current.checked = true;
        }
      }
    },
    [simulatorTabButtonRef, calcResultSummaries]
  );

  const handleImportRawData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (window.File && window.FileReader) {
        const file = e.currentTarget.files?.[0];
        const reader = new FileReader();
        if (file) {
          reader.readAsText(file);
          reader.onload = function () {
            if (typeof reader.result === "string") {
              try {
                const importData = JSON.parse(reader.result);
                if (importData.resultStatus === "success" && importData.data) {
                  // 期待したテキストっぽい感じなら更新処理へ
                  importRawDataDeckSimulator(importData);
                }
              } catch (error) {
                console.error(`読出に失敗しました エラー理由：${error}`);
              }
            }
          };
          reader.onerror = function () {
            console.error(`読出に失敗しました エラー理由：${reader.error}`);
          };
        }
      }
      // 同じファイルを再度読み込んだ場合に備えてvalueを空にする
      e.currentTarget.value = "";
    },
    [importRawDataDeckSimulator]
  );

  return {
    data,
    resultSummary,
    handleChangeParameters,
    handleBlurParameters,
    handleLoadData,
    handleImportRawData,
  };
}
