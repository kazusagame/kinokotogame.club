import { createColumnHelper } from "@tanstack/react-table";

export type RowDataBoardPoint = {
  point: number;
  item: string;
};

const columnHelper = createColumnHelper<RowDataBoardPoint>();
export const columnDefBoardPoint = [
  columnHelper.accessor("point", {
    header: "必要pt",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "必要pt",
      textAlign: "right",
    },
  }),
  columnHelper.accessor("item", {
    header: "獲得アイテム",
    cell: (info) => {
      const itemList = info.getValue().split("\n");
      return (
        <div className="flex flex-col gap-1">
          {itemList.map((value, index) => {
            return <p key={index}>{value}</p>;
          })}
        </div>
      );
    },
    sortingFn: "basic",
    meta: {
      label: "獲得アイテム",
      textAlign: "left",
    },
  }),
];
