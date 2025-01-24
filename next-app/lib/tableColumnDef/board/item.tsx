import { createColumnHelper } from "@tanstack/react-table";

export type RowDataBoardItem = {
  name: string;
  count: number;
  rate: number;
};

const columnHelper = createColumnHelper<RowDataBoardItem>();
export const columnDefBoardItem = [
  columnHelper.accessor("name", {
    header: "名称",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "名称",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("count", {
    header: "個数",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "個数",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("rate", {
    header: "確率(?)",
    cell: (info) => {
      return (
        (info.getValue() * 100).toLocaleString("ja-JP", {
          style: "decimal",
          useGrouping: true,
        }) + " %"
      );
    },
    sortingFn: "basic",
    meta: {
      label: "確率(?)",
      textAlign: "center",
    },
  }),
];
