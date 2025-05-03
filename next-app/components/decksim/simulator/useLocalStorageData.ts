import { useState, useEffect, useCallback } from "react";
import { MAX_SAVE_DATA_NUM } from "@/components/decksim/simulator/globalConfig";
import {
  EVENT_ID_TO_NAME_DICT,
  SAVE_DATA_SUMMARY_KEY_LIST,
  SAVE_DATA_COMPATIBILITY_TABLE,
} from "@/components/decksim/data/eventData";

export interface OriginSavedDataSummary {
  lastUpdate: string;
  memo: string;
  totalPoint?: number;
  totalCandy?: number;
  totalNormal?: number;
  totalSpecial?: number;
}
export interface OriginLocalStorageData extends OriginSavedDataSummary {
  version: number;
  data: unknown;
}

export function useLocalStorageData<
  T extends OriginSavedDataSummary,
  U extends T & OriginLocalStorageData
>({
  eventId,
  initSavedDataSummary,
}: {
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
  initSavedDataSummary: T;
}) {
  const [savedDataSummaries, setSavedDataSummaries] = useState<T[]>(
    Array(MAX_SAVE_DATA_NUM)
      .fill({})
      .map(() => structuredClone(initSavedDataSummary))
  );

  function hasDataType(obj: unknown): obj is { dataType: string } {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "dataType" in obj &&
      typeof (obj as { dataType: unknown }).dataType === "string"
    );
  }

  useEffect(() => {
    if (window.localStorage) {
      for (let i = 0; i < MAX_SAVE_DATA_NUM; i++) {
        const key = `deck-${eventId}-${i + 1}`;
        const loadData = localStorage.getItem(key);
        if (loadData) {
          const parsedData = JSON.parse(loadData) as U;

          // 旧バージョンのデータや、互換性のないデータは無視する
          if (
            !(
              typeof parsedData === "object" &&
              parsedData?.version === 2 &&
              hasDataType(parsedData.data) &&
              SAVE_DATA_COMPATIBILITY_TABLE[eventId] !== undefined &&
              SAVE_DATA_COMPATIBILITY_TABLE[eventId].includes(
                parsedData.data.dataType
              )
            )
          )
            continue;

          const keyList = SAVE_DATA_SUMMARY_KEY_LIST[eventId] as
            | (keyof T)[]
            | undefined;
          if (!keyList) continue;
          const newValue = {} as T;
          keyList.map((key) => {
            newValue[key] = parsedData[key];
          });
          setSavedDataSummaries((prev) =>
            prev.map((value, index) => (index === i ? newValue : value))
          );
        }
      }
    }
  }, [eventId]);

  const handleSaveDataSummaries = useCallback(
    (index: number, key: keyof T, value: string | number) => {
      setSavedDataSummaries((prev) =>
        prev.map((currentObj, i) => {
          if (index === i) {
            const nextObj = structuredClone(currentObj);
            nextObj[key] = value as T[keyof T];
            return nextObj;
          } else {
            return currentObj;
          }
        })
      );
    },
    []
  );

  const handleChangeMemo = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const num = e.target.dataset.num;
      handleSaveDataSummaries(Number(num) - 1, "memo", e.target.value);
      if (window.localStorage) {
        const key = `deck-${eventId}-${num}`;
        const loadData = localStorage.getItem(key);
        if (loadData) {
          const parsedData = JSON.parse(loadData) as U;

          // 旧バージョンのデータは無視する
          if (parsedData.version !== 2) return;

          parsedData.memo = e.target.value;
          const convertData = JSON.stringify(parsedData);
          localStorage.setItem(key, convertData);
        }
      }
    },
    [eventId, handleSaveDataSummaries]
  );

  const handleExportData = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (window.localStorage) {
        const num = e.currentTarget.dataset.num;
        const key = `deck-${eventId}-${num}`;
        const loadData = localStorage.getItem(key);
        if (loadData) {
          const eventName = EVENT_ID_TO_NAME_DICT[eventId];
          const lastUpdate = JSON.parse(loadData).lastUpdate as string;
          const dateStr = lastUpdate.replace(/ /g, "_").replace(/\:/g, "-");
          const blob = new Blob([loadData], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.download = `${eventName}_データ${num}_${dateStr}`;
          a.href = url;
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        }
      }
    },
    [eventId]
  );

  const handleImportData = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (window.localStorage && window.File && window.FileReader) {
        const num = e.currentTarget.dataset.num;
        const key = `deck-${eventId}-${num}`;
        const file = e.target.files?.[0];
        const reader = new FileReader();
        if (file) {
          reader.readAsText(file);
          reader.onload = function () {
            if (typeof reader.result === "string") {
              try {
                const loadData = JSON.parse(reader.result);
                if (
                  loadData.lastUpdate &&
                  loadData.data &&
                  loadData.version === 2 &&
                  SAVE_DATA_COMPATIBILITY_TABLE[eventId] &&
                  SAVE_DATA_COMPATIBILITY_TABLE[eventId].includes(
                    loadData.data.dataType
                  )
                ) {
                  localStorage.setItem(key, reader.result);
                  const keyList = SAVE_DATA_SUMMARY_KEY_LIST[eventId] as
                    | (keyof T)[]
                    | undefined;
                  if (keyList) {
                    keyList.map((key) => {
                      handleSaveDataSummaries(
                        Number(num) - 1,
                        key,
                        loadData[key]
                      );
                    });
                  }
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
    [eventId, handleSaveDataSummaries]
  );

  return {
    savedDataSummaries,
    handleSaveDataSummaries,
    handleChangeMemo,
    handleExportData,
    handleImportData,
  };
}
