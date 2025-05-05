import { useState, useCallback } from "react";
import { EVENT_ID_TO_NAME_DICT } from "@/components/decksim/data/eventData";
import { calcDeckSimulatorResult } from "@/components/decksim/simulator/calcDeckSimulatorResult";

export interface DeckSimulatorData {
  dataType: keyof typeof EVENT_ID_TO_NAME_DICT;
  mainScenes: {
    [K: number]: {
      basePower?: number | string;
      strap?: number | string;
      type?: "SWEET" | "COOL" | "POP" | "---";
      rarity?: "luv" | "ur" | "ssr" | "sr";
      cost?: number | string;
      skillLv?: number | string;
      grade?: "1年" | "2年" | "3年" | "---";
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
      type?: "SWEET" | "COOL" | "POP" | "---";
      rarity?: "luv" | "ur" | "ssr" | "sr";
      cost?: number | string;
      skillLv?: number | string;
      grade?: "1年" | "2年" | "3年" | "---";
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
    totalPower?: {
      attack?: number;
      defense?: number;
    };
    effects?: {
      [K: number]: {
        [K: number]: {
          id?: number;
        };
        isRarityUr?: boolean;
      };
    };
    details?: {
      [K: number]: {
        [K: number]: {
          attack?: number;
          target?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "全タイプ";
          value?: number;
        };
      };
    };
  };
  deckBonus: {
    normal?: {
      [K: number]: {
        level?: number;
        type?: "攻" | "守" | "攻守";
      };
    };
    shine?: {
      level?: number;
      type?: "攻守";
    };
    precious?: {
      level?: number;
      type?: "攻守";
    };
    preciousPlus?: {
      level?: number;
      type?: "攻守";
    };
  };
  playerData: {
    [K: number]: {
      isValid?: boolean;
    };
  };
  eventSpecial: {
    [K: number]: {
      isValid?: boolean;
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
  petitGirls: {},
  deckBonus: {},
  playerData: {},
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

  const handleSettings = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextData = structuredClone(data);
      // const key = e.target.name as "patternSelect" | "customPattern";
      // if (key === "patternSelect") {
      //   nextData.settings[key] = e.target.value as AttackPattern;
      // } else if (key === "customPattern") {
      //   nextData.settings[key] = e.target.value as string;
      // }
      setData(nextData);
      calcResultSummaries(nextData);
    },
    [data, calcResultSummaries]
  );

  const handleChangeParameters = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextData = structuredClone(data);
      // const positionName = e.target.dataset["positionName"] as
      //   | "leader"
      //   | "helper"
      //   | "member";
      // const positionNum = Number(e.target.dataset["positionNum"]);
      // const key = e.target.name as "heartNum" | "damage";

      // if (positionName && positionNum) {
      //   if (nextData[positionName][positionNum] === undefined) {
      //     nextData[positionName][positionNum] = {};
      //   }
      //   nextData[positionName][positionNum][key] = e.target.value;
      setData(nextData);
      calcResultSummaries(nextData);
      // }
    },
    [data, calcResultSummaries]
  );

  const handleBlurParameters = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const nextData = structuredClone(data);
      // const positionName = e.target.dataset["positionName"] as
      //   | "leader"
      //   | "helper"
      //   | "member";
      // const positionNum = Number(e.target.dataset["positionNum"]);
      // const key = e.target.name as "heartNum" | "damage";

      // if (positionName && positionNum) {
      //   if (nextData[positionName][positionNum] === undefined) {
      //     nextData[positionName][positionNum] = {};
      //   }

      // onBlurで整数のnumber型に校正
      let value = Number(e.target.value);
      if (Number.isNaN(value)) value = 0;
      if (value < 0) value = 0;
      value = Math.floor(value);

      // nextData[positionName][positionNum][key] = value;
      setData(nextData);
      calcResultSummaries(nextData);
      // }
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
        const file = e.target.files?.[0];
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
      e.target.value = "";
    },
    [importRawDataDeckSimulator]
  );

  return {
    data,
    resultSummary,
    handleSettings,
    handleChangeParameters,
    handleBlurParameters,
    handleLoadData,
    handleImportRawData,
  };
}
