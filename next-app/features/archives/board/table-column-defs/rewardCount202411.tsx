import { createColumnHelper } from "@tanstack/react-table";

export type RowDataBoardRewardCount202411 = {
  rank: string;
  reward_1: number;
  reward_2: number;
  reward_3: number;
  reward_4: number;
};

const columnHelper = createColumnHelper<RowDataBoardRewardCount202411>();
export const columnDefBoardRewardCount202411 = [
  columnHelper.accessor("rank", {
    header: "順位",
    cell: (info) => info.getValue().replace(/\n/g, "、"),
    sortingFn: "basic",
    enableHiding: false,
    size: 80,
    meta: {
      label: "順位",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_1", {
    header: "ラブリーショコラ",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "ラブリーショコラ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_2", {
    header: "ラブリークッキー",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "ラブリークッキー",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_3", {
    header: "レインボーキャンディ",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "レインボーキャンディ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_4", {
    header: "ミニマカロン",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "ミニマカロン",
      textAlign: "center",
    },
  }),
];
