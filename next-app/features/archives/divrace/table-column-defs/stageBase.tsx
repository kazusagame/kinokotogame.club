import { createColumnHelper } from "@tanstack/react-table";

export type RowDataDivraceStageBase = {
  lv: number;
  hp: number;
  pt: number;
  ptTotal: number;
  trustA: number;
  trustATotal: number;
  trustB: number;
  trustBTotal: number;
  count: number;
  average: number;
  stamina: number;
  staminaTotal: number;
};

const columnHelper = createColumnHelper<RowDataDivraceStageBase>();
export const columnDefDivraceStageBase = [
  columnHelper.accessor("lv", {
    header: "Lv",
    cell: (info) => {
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
  columnHelper.accessor("trustA", {
    header: "クリア時 獲得信頼度",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "クリア時 獲得信頼度",
      textAlign: "right",
    },
  }),
  columnHelper.accessor("trustATotal", {
    header: "(合計)",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "クリア時 獲得信頼度(合計)",
      textAlign: "right",
    },
  }),
  columnHelper.accessor("trustB", {
    header: "回数制限 獲得信頼度",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "回数制限 獲得信頼度",
      textAlign: "right",
    },
  }),
  columnHelper.accessor("trustBTotal", {
    header: "(合計)",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "回数制限 獲得信頼度(合計)",
      textAlign: "right",
    },
  }),
  columnHelper.accessor("count", {
    header: "回数制限値",
    cell: (info) => {
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
  columnHelper.accessor("stamina", {
    header: "必要体力",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "必要体力",
      textAlign: "right",
    },
  }),
  columnHelper.accessor("staminaTotal", {
    header: "(合計)",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "必要体力(合計)",
      textAlign: "right",
    },
  }),
];
