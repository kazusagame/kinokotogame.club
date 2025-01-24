import { createColumnHelper } from "@tanstack/react-table";

export type RowDataBoardEffect = {
  effect: string;
  plus1: number;
  plus2: number;
  minus1: number | string;
  minus2: number | string;
};

const columnHelper = createColumnHelper<RowDataBoardEffect>();
export const columnDefBoardEffect = [
  columnHelper.accessor("effect", {
    header: "効果",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    enableHiding: false,
    size: 160,
    meta: {
      label: "効果",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("plus1", {
    header: "プラス Lv.1",
    cell: (info) => {
      const value = info.getValue();
      if (typeof value !== "number") {
        return value;
      }
      return (
        (value * 100).toLocaleString("ja-JP", {
          style: "decimal",
          useGrouping: true,
        }) + " %"
      );
    },
    sortingFn: "basic",
    meta: {
      label: "プラス Lv.1",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("plus2", {
    header: "プラス Lv.2",
    cell: (info) => {
      const value = info.getValue();
      if (typeof value !== "number") {
        return value;
      }
      return (
        (value * 100).toLocaleString("ja-JP", {
          style: "decimal",
          useGrouping: true,
        }) + " %"
      );
    },
    sortingFn: "basic",
    meta: {
      label: "プラス Lv.2",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("minus1", {
    header: "マイナス Lv.1",
    cell: (info) => {
      const value = info.getValue();
      if (typeof value !== "number") {
        return value;
      }
      return (
        (value * 100).toLocaleString("ja-JP", {
          style: "decimal",
          useGrouping: true,
        }) + " %"
      );
    },
    sortingFn: "basic",
    meta: {
      label: "マイナス Lv.1",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("minus2", {
    header: "マイナス Lv.2",
    cell: (info) => {
      const value = info.getValue();
      if (typeof value !== "number") {
        return value;
      }
      return (
        (value * 100).toLocaleString("ja-JP", {
          style: "decimal",
          useGrouping: true,
        }) + " %"
      );
    },
    sortingFn: "basic",
    meta: {
      label: "マイナス Lv.2",
      textAlign: "center",
    },
  }),
];
