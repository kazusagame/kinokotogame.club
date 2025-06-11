import { createColumnHelper } from "@tanstack/react-table";

export type RowDataBoardStage = {
  lv: number;
  item: string;
  bossName: string;
  hp: number;
};

const columnHelper = createColumnHelper<RowDataBoardStage>();
export const columnDefBoardStage = [
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
  columnHelper.accessor("bossName", {
    header: "BOSS",
    cell: (info) => {
      return info.getValue().replace(/\n/g, "、");
    },
    sortingFn: "basic",
    meta: {
      label: "BOSS",
      textAlign: "left",
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
];
