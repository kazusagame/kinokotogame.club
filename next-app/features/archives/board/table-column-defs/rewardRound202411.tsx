import { createColumnHelper } from "@tanstack/react-table";

export type RowDataBoardRewardRound202411 = {
  rank: string;
  reward_1: number;
  reward_2: number;
  reward_3: number;
  reward_4: number;
  reward_5: number;
  reward_6: number;
};

const columnHelper = createColumnHelper<RowDataBoardRewardRound202411>();
export const columnDefBoardRewardRound202411 = [
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
    header: "[部活動]島田泉(SR)",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "[部活動]島田泉(SR)",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_2", {
    header: "ぷちフレンドケーキ",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "ぷちフレンドケーキ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_3", {
    header: "ぷちフレンドプリン",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "ぷちフレンドプリン",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_4", {
    header: "ストロベリーキャンディ",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "ストロベリーキャンディ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_5", {
    header: "ソーダキャンディ",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "ソーダキャンディ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_6", {
    header: "ぷちクレープ",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "ぷちクレープ",
      textAlign: "center",
    },
  }),
];
