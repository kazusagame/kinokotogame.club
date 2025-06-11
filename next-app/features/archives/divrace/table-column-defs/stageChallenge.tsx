import { createColumnHelper } from "@tanstack/react-table";

export type RowDataDivraceStageChallenge = {
  lv: number | string;
  hp: number | string;
  pt: number | string;
  ptTotal: number | string;
  rewardA: string;
  rewardB: string;
  count: number | string;
  average: number | string;
  trust: number | string;
  trustTotal: number | string;
};

const columnHelper = createColumnHelper<RowDataDivraceStageChallenge>();
export const columnDefDivraceStageChallenge = [
  columnHelper.accessor("lv", {
    header: "Lv",
    cell: (info) => {
      if (typeof info.getValue() !== "number") return "-";
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    enableHiding: false,
    size: 40,
    meta: {
      label: "Lv",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("hp", {
    header: "HP",
    cell: (info) => {
      if (typeof info.getValue() !== "number") return "-";
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "HP",
      textAlign: "right",
    },
  }),
  columnHelper.accessor("pt", {
    header: "(pt換算)",
    cell: (info) => {
      if (typeof info.getValue() !== "number") return "-";
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "(pt換算)",
      textAlign: "right",
    },
  }),
  columnHelper.accessor("ptTotal", {
    header: "(pt合計)",
    cell: (info) => {
      if (typeof info.getValue() !== "number") return "-";
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "(pt合計)",
      textAlign: "right",
    },
  }),
  columnHelper.accessor("rewardA", {
    header: "クリア時 獲得アイテム",
    cell: (info) => {
      const itemList = info.getValue().split("\n");
      return (
        <div className="flex flex-col gap-1 min-w-40">
          {itemList.map((value, index) => {
            return <p key={index}>{value}</p>;
          })}
        </div>
      );
    },
    sortingFn: "basic",
    meta: {
      label: "クリア時 獲得アイテム",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("rewardB", {
    header: "回数制限 獲得アイテム",
    cell: (info) => {
      const itemList = info.getValue().split("\n");
      return (
        <div className="flex flex-col gap-1 min-w-40">
          {itemList.map((value, index) => {
            return <p key={index}>{value}</p>;
          })}
        </div>
      );
    },
    sortingFn: "basic",
    meta: {
      label: "回数制限 獲得アイテム",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("count", {
    header: "回数制限値",
    cell: (info) => {
      if (typeof info.getValue() !== "number") return "-";
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "回数制限値",
      textAlign: "right",
    },
  }),
  columnHelper.accessor("average", {
    header: "HP / 回数制限",
    cell: (info) => {
      if (typeof info.getValue() !== "number") return "-";
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
        maximumFractionDigits: 0,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "HP / 回数制限",
      textAlign: "right",
    },
  }),
  columnHelper.accessor("trust", {
    header: "必要信頼度",
    cell: (info) => {
      if (typeof info.getValue() !== "number") return "-";
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "必要信頼度",
      textAlign: "right",
    },
  }),
  columnHelper.accessor("trustTotal", {
    header: "(合計)",
    cell: (info) => {
      if (typeof info.getValue() !== "number") return "-";
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "必要信頼度(合計)",
      textAlign: "right",
    },
  }),
];
