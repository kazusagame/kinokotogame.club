import { useState, useEffect, useCallback } from "react";
import { RaidwarSkillData } from "@/components/decksim/simulator/useRaidwarSkillData";
import { MAX_SAVE_DATA_NUM } from "@/components/decksim/simulator/globalConfig";
import {
  EVENT_ID_TO_NAME_DICT,
  SAVE_DATA_SUMMARY_KEY_LIST,
  SAVE_DATA_COMPATIBILITY_TABLE,
} from "@/components/decksim/data/eventData";

export interface SavedDataSummary {
  lastUpdate?: string;
  memo?: string;
}
const initSavedDataSummary: SavedDataSummary = {
  lastUpdate: "",
  memo: "",
};
export interface LocalStorageData extends SavedDataSummary {
  version: number;
  data: RaidwarSkillData;
}

export function useLocalStorageData({
  eventId,
}: {
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
}) {
  const [savedDataSummaries, setSavedDataSummaries] = useState<
    SavedDataSummary[]
  >(
    Array(MAX_SAVE_DATA_NUM)
      .fill({})
      .map(() => structuredClone(initSavedDataSummary))
  );

  useEffect(() => {
    if (window.localStorage) {
      for (let i = 0; i < MAX_SAVE_DATA_NUM; i++) {
        const key = `deck-${eventId}-${i + 1}`;
        const loadData = localStorage.getItem(key);
        if (loadData) {
          const parsedData = JSON.parse(loadData) as LocalStorageData;

          // 旧バージョンのデータは無視する
          if (parsedData.version !== 2) continue;

          const keyList = SAVE_DATA_SUMMARY_KEY_LIST[eventId] as
            | (keyof SavedDataSummary)[]
            | undefined;
          if (!keyList) continue;
          const newValue: SavedDataSummary = {};
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
    (index: number, key: keyof SavedDataSummary, value: string) => {
      setSavedDataSummaries((prev) =>
        prev.map((currentObj, i) => {
          if (index === i) {
            const nextObj = structuredClone(currentObj);
            nextObj[key] = value;
            return nextObj;
          } else {
            return currentObj;
          }
        })
      );
    },
    []
  );

  const handleChangeMemo = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const num = e.target.dataset.num;
    handleSaveDataSummaries(Number(num) - 1, "memo", e.target.value);
    if (window.localStorage) {
      const key = `deck-${eventId}-${num}`;
      const loadData = localStorage.getItem(key);
      if (loadData) {
        const parsedData = JSON.parse(loadData) as LocalStorageData;

        // 旧バージョンのデータは無視する
        if (parsedData.version !== 2) return;

        parsedData.memo = e.target.value;
        const convertData = JSON.stringify(parsedData, undefined, 1);
        localStorage.setItem(key, convertData);
      }
    }
  }, [eventId, handleSaveDataSummaries]);

  const handleExportData = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
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
  }, [eventId]);

  const handleImportData = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
                  | (keyof SavedDataSummary)[]
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
  }, [eventId, handleSaveDataSummaries]);

  return {
    savedDataSummaries,
    handleSaveDataSummaries,
    handleChangeMemo,
    handleExportData,
    handleImportData,
  };
}
