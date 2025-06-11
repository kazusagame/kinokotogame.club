import { createColumnHelper } from "@tanstack/react-table";

export type RowDataBoardCupid = {
  name: string;
  count: number;
  rate: number;
};

const columnHelper = createColumnHelper<RowDataBoardCupid>();
export const columnDefBoardCupid = [
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
    header: "人数",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "人数",
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
