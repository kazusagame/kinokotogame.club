import { useState, useCallback, useEffect } from "react";
import { calcDivraceStageResult } from "@/components/decksim/simulator/calcDivraceStageResult";

type SupportPattern =
  | "useSpecialALot"
  | "useSpecialALittle"
  | "doNotUseSpecial";

export type DivraceStageData = {
  dataType: "divrace-stage";
} & {
  [K in "base" | "challenge"]: {
    patternSelect: SupportPattern;
    candyDamage: number | string;
    clearStageLevel: number;
    endlessStageCount: number | string;
    aimCountRewardDict: { [K in number]: boolean };
  };
};

const initData: DivraceStageData = {
  dataType: "divrace-stage",
  base: {
    patternSelect: "useSpecialALittle",
    candyDamage: 10000000,
    clearStageLevel: 10,
    endlessStageCount: 1,
    aimCountRewardDict: {},
  },
  challenge: {
    patternSelect: "useSpecialALittle",
    candyDamage: 10000000,
    clearStageLevel: 10,
    endlessStageCount: 1,
    aimCountRewardDict: {
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
      10: true,
      13: true,
      14: true,
      30: true,
    },
  },
} as const;

export interface DivraceStageResult {
  dataType: "divrace-stage";
  initCondition: boolean;
  summaries: {
    [K in "base" | "challenge"]: {
      totalPoint: number;
      totalTrust: number;
      totalCandy: number;
      totalNormal: number;
      totalSpecial: number;
    } & {
      [K in number]: {
        candyNum: number;
        normalNum: number;
        specialNum: number;
        totalDamage: number;
      };
    };
  };
}

/* prettier-ignore */
const initResultSummary: DivraceStageResult = {
  dataType: "divrace-stage",
  initCondition: true,
  summaries: {
    base: {
      totalPoint: 0, totalTrust: 0, totalCandy: 0, totalNormal: 0, totalSpecial: 0,
      1: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      2: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      3: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      4: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      5: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      6: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      7: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      8: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      9: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      10: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      11: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      12: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      13: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      14: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      15: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      16: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      17: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      18: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      19: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      20: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      21: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      22: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      23: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      24: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      25: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      26: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      27: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      28: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      29: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      30: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      31: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
    },
    challenge: {
      totalPoint: 0, totalTrust: 0, totalCandy: 0, totalNormal: 0, totalSpecial: 0,
      1: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      2: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      3: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      4: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      5: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      6: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      7: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      8: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      9: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      10: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      11: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      12: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      13: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      14: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      15: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      16: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      17: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      18: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      19: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      20: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      21: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      22: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      23: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      24: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      25: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      26: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      27: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      28: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      29: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      30: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
      31: { candyNum: 0, normalNum: 0, specialNum: 0, totalDamage: 0 },
    },
  },
} as const;

export interface DivraceStageSavedDataSummary {
  lastUpdate: string;
  memo: string;
  totalPoint: number;
  totalCandy: number;
  totalNormal: number;
  totalSpecial: number;
}
export const initDivraceStageSavedDataSummary: DivraceStageSavedDataSummary = {
  lastUpdate: "",
  memo: "",
  totalPoint: 0,
  totalCandy: 0,
  totalNormal: 0,
  totalSpecial: 0,
} as const;
export interface DivraceStageLocalStorageData
  extends DivraceStageSavedDataSummary {
  version: number;
  data: DivraceStageData;
}

export function useDivraceStageData({}: {
  simulatorTabButtonRef: React.RefObject<HTMLInputElement>;
}) {
  const [data, setData] = useState(structuredClone(initData));
  const [resultSummary, setResultSummary] = useState(
    structuredClone(initResultSummary)
  );

  // ステージ表の初期表示用
  useEffect(() => {
    const summary = structuredClone(initResultSummary);
    calcDivraceStageResult({ data: structuredClone(initData), summary });
    setResultSummary(summary);
  }, []);

  const calcResultSummaries = useCallback((data: DivraceStageData) => {
    const summary = structuredClone(initResultSummary);
    summary.initCondition = false;
    calcDivraceStageResult({ data, summary });
    setResultSummary(summary);
  }, []);

  const handleChangeParameters = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextData = structuredClone(data);
      const stageName = e.currentTarget.dataset["stageName"] as
        | "base"
        | "challenge";
      const keyName = e.currentTarget.dataset[
        "keyName"
      ] as keyof DivraceStageData["base" | "challenge"];

      if (keyName === "candyDamage" || keyName === "endlessStageCount") {
        nextData[stageName][keyName] = e.currentTarget.value as string;
      } else if (keyName === "patternSelect") {
        nextData[stageName][keyName] = e.currentTarget.value as SupportPattern;
      } else if (keyName === "clearStageLevel") {
        nextData[stageName][keyName] = Number(e.currentTarget.value);
      }

      setData(nextData);
      calcResultSummaries(nextData);
    },
    [data, calcResultSummaries]
  );

  const handleBlurParameters = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const nextData = structuredClone(data);
      const stageName = e.currentTarget.dataset["stageName"] as
        | "base"
        | "challenge";
      const keyName = e.currentTarget.dataset[
        "keyName"
      ] as keyof DivraceStageData["base" | "challenge"];

      if (keyName === "candyDamage" || keyName === "endlessStageCount") {
        const rawValue = e.currentTarget.value;
        const omitCommaValue = rawValue.replaceAll(",", "");
        let rawNumber = Math.floor(Number(omitCommaValue));
        if (Number.isNaN(rawNumber) || rawNumber < 1) rawNumber = 1;
        nextData[stageName][keyName] = rawNumber;
      }

      setData(nextData);
      calcResultSummaries(nextData);
    },
    [data, calcResultSummaries]
  );

  const handleAimCountRewardDict = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextData = structuredClone(data);
      const stageName = e.currentTarget.dataset["stageName"] as
        | "base"
        | "challenge";
      const keyName = e.currentTarget.dataset[
        "keyName"
      ] as keyof DivraceStageData["base" | "challenge"];
      const stageNum = Number(e.currentTarget.dataset["stageNum"]);

      if (keyName === "aimCountRewardDict" && stageNum) {
        nextData[stageName][keyName][stageNum] = e.currentTarget.checked;
        setData(nextData);
        calcResultSummaries(nextData);
      }
    },
    [data, calcResultSummaries]
  );

  const handleLoadData = useCallback(
    (newData: DivraceStageData) => {
      setData(newData);
      calcResultSummaries(newData);
    },
    [calcResultSummaries]
  );

  return {
    data,
    resultSummary,
    handleChangeParameters,
    handleBlurParameters,
    handleAimCountRewardDict,
    handleLoadData,
  };
}
