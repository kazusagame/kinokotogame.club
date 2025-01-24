import { useState, useCallback } from "react";
import { calcRaidwarSkillResult } from "@/components/decksim/simulator/drawCanvasRaidwarSkill";

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
  leader: { [K: number]: { heartNum?: number; damage?: number } };
  helper: { [K: number]: { heartNum?: number; damage?: number } };
  member: { [K: number]: { heartNum?: number; damage?: number } };
}
const initData: RaidwarSkillData = {
  dataType: "raidwar-skill",
  settings: { patternSelect: "specialOnly", customPattern: "" },
  leader: {},
  helper: {},
  member: {},
} as const;

export interface RaidwarSkillResultSummary {
  dataType: "raidwar-skill";
  summaries: { [K in number]: string };
}
const initResultSummary: RaidwarSkillResultSummary = {
  dataType: "raidwar-skill",
  summaries: {},
} as const;

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
    const newSummary: RaidwarSkillResultSummary = {
      dataType: "raidwar-skill",
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
      const key = e.target.name as "patternSelect" | "customPattern";
      if (key === "patternSelect") {
        nextData.settings[key] = e.target.value as AttackPattern;
      } else if (key === "customPattern") {
        nextData.settings[key] = e.target.value as string;
      }
      setData(nextData);
      calcResultSummaries(nextData);
    },
    [data, calcResultSummaries]
  );

  const handleParameters = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextData = structuredClone(data);
      const positionName = e.target.dataset["positionName"] as
        | "leader"
        | "helper"
        | "member";
      const positionNum = Number(e.target.dataset["positionNum"]);
      const key = e.target.name as "heartNum" | "damage";

      if (positionName && positionNum) {
        if (nextData[positionName][positionNum] === undefined) {
          nextData[positionName][positionNum] = {};
        }
        let value = Number(e.target.value);
        if (Number.isNaN(value)) value = 0;
        if (value < 0) value = 0;

        nextData[positionName][positionNum][key] = value;
        setData(nextData);
        calcResultSummaries(nextData);
      }
    },
    [data, calcResultSummaries]
  );

  const handleLoadData = useCallback((newData: RaidwarSkillData) => {
    setData(newData);
    calcResultSummaries(newData);
  }, [calcResultSummaries]);

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
      e.target.value = "";
    },
    [importRawDataRaidwarSkill]
  );

  return {
    data,
    resultSummary,
    handleSettings,
    handleParameters,
    handleLoadData,
    handleImportRawData,
  };
}
