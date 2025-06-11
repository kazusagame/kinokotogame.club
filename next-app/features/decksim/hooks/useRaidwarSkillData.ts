import { useState, useCallback } from "react";
import { calcRaidwarSkillResult } from "@/features/decksim/calc-functions/drawCanvasRaidwarSkill";

type AttackPattern =
  | "specialOnly"
  | "specialAfterNormal"
  | "normalOnly"
  | "specialAfterCandy"
  | "normalAfterCandy"
  | "custom";

export interface RaidwarSkillData {
  dataType: "raidwar-skill";
  settings: { patternSelect: AttackPattern; customPattern: string };
  leader: {
    [K: number]: {
      heartNum?: number | string;
      damage?: number | string;
    };
  };
  helper: {
    [K: number]: {
      heartNum?: number | string;
      damage?: number | string;
    };
  };
  member: {
    [K: number]: {
      heartNum?: number | string;
      damage?: number | string;
    };
  };
}
const initData: RaidwarSkillData = {
  dataType: "raidwar-skill",
  settings: { patternSelect: "specialOnly", customPattern: "" },
  leader: {},
  helper: {},
  member: {},
} as const;

export interface RaidwarSkillResult {
  dataType: "raidwar-skill";
  initCondition: boolean;
  summaries: { [K in number]: string };
}
const initResultSummary: RaidwarSkillResult = {
  dataType: "raidwar-skill",
  initCondition: true,
  summaries: {},
} as const;

export interface RaidwarSkillSavedDataSummary {
  lastUpdate: string;
  memo: string;
}
export const initRaidwarSkillSavedDataSummary: RaidwarSkillSavedDataSummary = {
  lastUpdate: "",
  memo: "",
} as const;
export interface RaidwarSkillLocalStorageData
  extends RaidwarSkillSavedDataSummary {
  version: number;
  data: RaidwarSkillData;
}

interface SceneProfile {
  remainNeedHeartCount: number;
  skillBean: {
    type: "DAMAGE" | "BUFF" | "PARTY_BUFF" | undefined;
    value: number;
    needHeartCount: number;
  };
}

interface RawDataRaidwarSkill {
  resultStatus: string;
  data: {
    leaderCardBean: SceneProfile;
    memberCardBeans: SceneProfile[];
  };
}

export function useRaidwarSkillData({
  simulatorTabButtonRef,
}: {
  simulatorTabButtonRef: React.RefObject<HTMLInputElement>;
}) {
  const [data, setData] = useState(structuredClone(initData));
  const [resultSummary, setResultSummary] = useState(
    structuredClone(initResultSummary)
  );

  const calcResultSummaries = useCallback((data: RaidwarSkillData) => {
    const newSummary: RaidwarSkillResult = {
      dataType: "raidwar-skill",
      initCondition: false,
      summaries: {},
    };
    const { damageArray } = calcRaidwarSkillResult({ data });
    damageArray.forEach((v, i) => {
      newSummary.summaries[i] = String(v);
    });
    setResultSummary(newSummary);
  }, []);

  const handleSettings = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextData = structuredClone(data);
      const key = e.currentTarget.name as "patternSelect" | "customPattern";
      if (key === "patternSelect") {
        nextData.settings[key] = e.currentTarget.value as AttackPattern;
      } else if (key === "customPattern") {
        nextData.settings[key] = e.currentTarget.value as string;
      }
      setData(nextData);
      calcResultSummaries(nextData);
    },
    [data, calcResultSummaries]
  );

  const handleChangeParameters = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextData = structuredClone(data);
      const positionName = e.currentTarget.dataset["positionName"] as
        | "leader"
        | "helper"
        | "member";
      const positionNum = Number(e.currentTarget.dataset["positionNum"]);
      const key = e.currentTarget.name as "heartNum" | "damage";

      if (positionName && positionNum) {
        if (nextData[positionName][positionNum] === undefined) {
          nextData[positionName][positionNum] = {};
        }
        nextData[positionName][positionNum][key] = e.currentTarget.value;
        setData(nextData);
        calcResultSummaries(nextData);
      }
    },
    [data, calcResultSummaries]
  );

  const handleBlurParameters = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const nextData = structuredClone(data);
      const positionName = e.currentTarget.dataset["positionName"] as
        | "leader"
        | "helper"
        | "member";
      const positionNum = Number(e.currentTarget.dataset["positionNum"]);
      const key = e.currentTarget.name as "heartNum" | "damage";

      if (positionName && positionNum) {
        if (nextData[positionName][positionNum] === undefined) {
          nextData[positionName][positionNum] = {};
        }

        // onBlurで整数のnumber型に校正
        let value = Number(e.currentTarget.value.replaceAll(",", ""));
        if (Number.isNaN(value)) value = 0;
        if (value < 0) value = 0;
        value = Math.floor(value);

        nextData[positionName][positionNum][key] = value;
        setData(nextData);
        calcResultSummaries(nextData);
      }
    },
    [data, calcResultSummaries]
  );

  const handleLoadData = useCallback(
    (newData: RaidwarSkillData) => {
      setData(newData);
      calcResultSummaries(newData);
    },
    [calcResultSummaries]
  );

  const importRawDataRaidwarSkill = useCallback(
    (importData: unknown) => {
      if (typeof importData === "object" && typeof importData !== null) {
        const nextData = structuredClone(initData);
        const rawData = importData as RawDataRaidwarSkill;

        const leaderType = rawData?.data?.leaderCardBean?.skillBean?.type;
        const leaderDamage = rawData?.data?.leaderCardBean?.skillBean?.value;
        const leaderHeart =
          rawData?.data?.leaderCardBean?.skillBean?.needHeartCount;
        if (leaderType === "DAMAGE" && leaderDamage !== undefined) {
          nextData.leader[1] = { damage: leaderDamage, heartNum: leaderHeart };
        } else {
          nextData.leader[1] = { damage: 0, heartNum: leaderHeart };
        }

        const memberLength = rawData?.data?.memberCardBeans?.length;
        if (memberLength) {
          rawData?.data?.memberCardBeans.forEach((v, i) => {
            const memberType = v.skillBean.type;
            const memberDamage = v.skillBean.value;
            const memberHeart = v.skillBean.needHeartCount;
            if (memberType === "DAMAGE" && memberDamage !== undefined) {
              nextData.member[i + 1] = {
                damage: memberDamage,
                heartNum: memberHeart,
              };
            } else {
              nextData.member[i + 1] = { damage: 0, heartNum: memberHeart };
            }
          });
        }

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
                  importRawDataRaidwarSkill(importData);
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
    [importRawDataRaidwarSkill]
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
