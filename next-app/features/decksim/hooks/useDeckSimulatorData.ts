import { useState, useEffect, useCallback } from "react";

import { DeckSimulatorEventId } from "@/features/decksim/data/eventData";

import {
  DeckSimulatorData,
  DeckSimulatorCommonData,
} from "@/features/decksim/type-definitions/DeckSimulatorData";
import { DeckSimulatorResult } from "@/features/decksim/type-definitions/DeckSimulatorResult";
import { DeckSimulatorSavedDataSummary } from "@/features/decksim/type-definitions/DeckSimulatorSavedDataSummary";
import { RawDataDeckSimulator } from "@/features/decksim/type-definitions/DeckSimulatorRawData";
import { calcDeckSimulatorResult } from "@/features/decksim/calc-functions/calcDeckSimulatorResult";
import { importDeckSimulatorRawData } from "@/features/decksim/calc-functions/importDeckSimulatorRawData";

import { setDeepValue } from "@/lib/setDeepValue";

const initData: DeckSimulatorData = {
  dataType: "raidwar",
  mainScenes: {
    attack: {},
  },
  mainSkills: {
    attack: {},
  },
  subScenes: {
    attack: {},
  },
  subSwitches: {
    attack: {},
  },
  preciousScenes: {
    attack: {},
  },
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
      level: "0",
      type: "攻守",
    },
    precious: {
      level: "0",
      type: "攻守",
    },
    preciousPlus: {
      level: "0",
      type: "攻守",
    },
  },
  eventSpecial: {},
} as const;

const initCommonData: DeckSimulatorCommonData = {
  playerData: {
    playerType: "SWEETタイプ",
    clubPosition: "member",
    maxAttackCost: 1000,
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
} as const;

const initResultSummary: DeckSimulatorResult = {
  dataType: "raidwar",
  initCondition: true,
  summaries: {
    totalPerformance: { attack: {}, defense: {} },
    mainScenes: { attack: {}, defense: {} },
    mainSkills: { attack: {}, defense: {} },
    subScenes: { attack: {}, defense: {} },
    subSwitches: { attack: {}, defense: {} },
    preciousScenes: { attack: {}, defense: {} },
  },
} as const;

export const initDeckSimulatorSavedDataSummary: DeckSimulatorSavedDataSummary =
  {
    lastUpdate: "",
    memo: "",
    powerMin: 0,
    powerExp: 0,
    powerMax: 0,
    skillEffect: 0,
    isConvertPoint: false,
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
  eventId: DeckSimulatorEventId;
}) {
  const [data, setData] = useState(() => {
    const baseData = structuredClone(initData);
    baseData.dataType = eventId;
    return baseData;
  });
  const [commonData, setCommonData] = useState(structuredClone(initCommonData));
  const [resultSummary, setResultSummary] = useState(() => {
    const baseData = structuredClone(initResultSummary);
    baseData.dataType = eventId;
    return baseData;
  });
  // 生データロード時の動作モード用
  const [loadCondition, setLoadCondition] = useState({
    clubType: "未所属",
    specialGirlName1: "",
    specialGirlName2: "",
  });

  // 初回のロード時のみplayerDataをローカルストレージ内の共通データで上書きする
  useEffect(() => {
    const baseData = structuredClone(initCommonData);

    loadPlayerData({ playerData: baseData["playerData"] });
    setCommonData(baseData);
  }, [eventId]);

  const calcResultSummaries = useCallback(
    ({
      data,
      commonData,
    }: {
      data: DeckSimulatorData;
      commonData: DeckSimulatorCommonData;
    }) => {
      const summary = structuredClone(initResultSummary);
      summary.dataType = eventId;
      summary.initCondition = false;
      calcDeckSimulatorResult({ inputData: data, commonData, summary });
      setResultSummary(summary);
    },
    [eventId]
  );

  const handleChangeParameters = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const nextData = structuredClone(data);
      const nextCommonData = structuredClone(commonData);

      const target = e.currentTarget;
      if (!target.dataset["path"]) return;

      const path = target.dataset["path"];
      const value: string | boolean =
        target instanceof HTMLInputElement && target.type === "checkbox"
          ? target.checked
          : target.value;

      const keys = path.split(".");
      if (keys.length !== 0) {
        if (keys[0] !== "playerData") {
          // playerData以外
          setDeepValue(nextData, path, value);
          setData(nextData);
        } else {
          // playerDataの変更の場合は、ローカルストレージ値の更新も行う。
          setDeepValue(nextCommonData, path, value);
          setCommonData(nextCommonData);
          savePlayerData({ playerData: nextCommonData["playerData"] });
        }
        calcResultSummaries({ data: nextData, commonData: nextCommonData });
      }
    },
    [data, commonData, calcResultSummaries]
  );

  const handleBlurParameters = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      const nextData = structuredClone(data);
      const nextCommonData = structuredClone(commonData);

      const target = e.currentTarget;
      if (!target.dataset["path"]) return;

      const path = target.dataset["path"];
      let value = Number(target.value.replace(/,/g, "").trim());

      if (Number.isNaN(value)) value = 0;

      const keys = path.split(".");
      if (keys.length !== 0) {
        if (keys[0] !== "playerData") {
          // onBlurでnumber型に校正
          setDeepValue(nextData, path, value);
          setData(nextData);
        } else {
          // playerDataの変更の場合は、ローカルストレージ値の更新も行う。
          setDeepValue(nextCommonData, path, value);
          setCommonData(nextCommonData);
          savePlayerData({ playerData: nextCommonData["playerData"] });
        }
        calcResultSummaries({ data: nextData, commonData: nextCommonData });
      }
    },
    [data, commonData, calcResultSummaries]
  );

  const handleLoadData = useCallback(
    (nextData: DeckSimulatorData) => {
      setData(nextData);
      calcResultSummaries({ data: nextData, commonData: commonData });
    },
    [calcResultSummaries, commonData]
  );

  const importRawDataDeckSimulator = useCallback(
    (importData: unknown) => {
      if (typeof importData === "object" && typeof importData !== null) {
        const nextData = structuredClone(initData);
        nextData.dataType = eventId;

        // イベント固有系の設定は書き戻す
        nextData.eventSpecial = structuredClone(data.eventSpecial);

        const rawData = importData as RawDataDeckSimulator;

        // 期待したデータのようなら更新処理へ
        if (
          (rawData as unknown as { [K: string]: unknown })?.resultStatus ===
            "success" ||
          (rawData as unknown as { [K: string]: { [K: string]: unknown } })
            ?.data?.success === true
        ) {
          importDeckSimulatorRawData({ nextData, rawData, loadCondition });
          setData(nextData);
          calcResultSummaries({ data: nextData, commonData: commonData });

          // データの抽出に成功したらシミュレーター本体のタブを有効にする。
          if (simulatorTabButtonRef.current) {
            simulatorTabButtonRef.current.checked = true;
          }
        }
      }
    },
    [
      data,
      commonData,
      eventId,
      loadCondition,
      calcResultSummaries,
      simulatorTabButtonRef,
    ]
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
                // 中身のチェックはimportRawDataDeckSimulator側で実施
                importRawDataDeckSimulator(importData);
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

  // 直接、パスや値を受け取ってステートやサマリーの更新をトリガーする
  const setValueAtPath = useCallback(
    ({
      path,
      value,
    }: {
      path: string;
      value: { [key: string | number]: unknown };
    }) => {
      const nextData = structuredClone(data);
      const nextCommonData = structuredClone(commonData);

      const keys = path.split(".");
      if (keys.length !== 0) {
        if (keys[0] !== "playerData") {
          // playerData以外
          setDeepValue(nextData, path, value);
          setData(nextData);
        } else {
          // playerDataの変更の場合は、ローカルストレージ値の更新も行う。
          setDeepValue(nextCommonData, path, value);
          setCommonData(nextCommonData);
          savePlayerData({ playerData: nextCommonData["playerData"] });
        }
        calcResultSummaries({ data: nextData, commonData: nextCommonData });
      }
    },
    [data, commonData, calcResultSummaries]
  );

  const handleLoadCondition = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const nextData = structuredClone(loadCondition);

      const target = e.currentTarget;
      if (!target.dataset["property"]) return;

      const property = target.dataset["property"] as
        | "clubType"
        | "specialGirlName1"
        | "specialGirlName2";
      const value = target.value;

      nextData[property] = value;
      setLoadCondition(nextData);
    },
    [loadCondition]
  );

  return {
    data,
    commonData,
    resultSummary,
    loadCondition,
    handleChangeParameters,
    handleBlurParameters,
    handleLoadData,
    handleImportRawData,
    setValueAtPath,
    handleLoadCondition,
  };
}

const savePlayerData = ({
  playerData,
}: {
  playerData: DeckSimulatorCommonData["playerData"];
}) => {
  if (window.localStorage) {
    const key = `deck-common`;
    const currentDate = new Date();
    const dateStr =
      String(currentDate.getFullYear()) +
      "-" +
      String(currentDate.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(currentDate.getDate()).padStart(2, "0") +
      " " +
      String(currentDate.getHours()).padStart(2, "0") +
      ":" +
      String(currentDate.getMinutes()).padStart(2, "0") +
      ":" +
      String(currentDate.getSeconds()).padStart(2, "0");

    const tempData = {
      lastUpdate: dateStr,
      version: 2,
      data: playerData,
    };
    const convertData = JSON.stringify(tempData);
    localStorage.setItem(key, convertData);
  }
};

const loadPlayerData = ({
  playerData,
}: {
  playerData: DeckSimulatorCommonData["playerData"];
}) => {
  if (window.localStorage) {
    const key = `deck-common`;
    const loadData = localStorage.getItem(key);
    if (loadData) {
      const parsedData = JSON.parse(loadData) as unknown;

      // 旧バージョンのデータや、互換性のないデータは無視する
      if (
        typeof parsedData === "object" &&
        parsedData !== null &&
        "version" in parsedData &&
        parsedData.version === 2 &&
        "data" in parsedData &&
        isPlayerData(parsedData.data)
      ) {
        playerData.playerType = parsedData.data.playerType;
        playerData.clubPosition = parsedData.data.clubPosition;
        playerData.maxAttackCost = parsedData.data.maxAttackCost;
        playerData.mensCologne = parsedData.data.mensCologne;
        playerData.clubItem = parsedData.data.clubItem;
      }
    }
  }
};

const isPlayerData = (
  obj: unknown
): obj is DeckSimulatorCommonData["playerData"] => {
  if (typeof obj !== "object" || obj === null) return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const o = obj as Record<string, any>;

  const isPlayerType =
    o.playerType === "SWEETタイプ" ||
    o.playerType === "COOLタイプ" ||
    o.playerType === "POPタイプ";

  const isClubPosition =
    o.clubPosition === "leader" ||
    o.clubPosition === "subLeader" ||
    o.clubPosition === "attackCaptain" ||
    o.clubPosition === "defenseCaptain" ||
    o.clubPosition === "member";

  const isMaxAttackCost =
    typeof o.maxAttackCost === "number" || typeof o.maxAttackCost === "string";

  const isMensCologne =
    (typeof o.mensCologne?.sweet?.level === "number" ||
      typeof o.mensCologne?.sweet?.level === "string") &&
    (typeof o.mensCologne?.cool?.level === "number" ||
      typeof o.mensCologne?.cool?.level === "string") &&
    (typeof o.mensCologne?.pop?.level === "number" ||
      typeof o.mensCologne?.pop?.level === "string");

  const isClubItem =
    typeof o.clubItem?.sweet?.isValid === "boolean" &&
    typeof o.clubItem?.cool?.isValid === "boolean" &&
    typeof o.clubItem?.pop?.isValid === "boolean";

  return (
    isPlayerType &&
    isClubPosition &&
    isMaxAttackCost &&
    isMensCologne &&
    isClubItem
  );
};
