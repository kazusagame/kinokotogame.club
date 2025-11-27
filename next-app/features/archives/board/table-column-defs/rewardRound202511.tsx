import { createColumnHelper } from "@tanstack/react-table";

export type RowDataBoardRewardRound202511 = {
  rank: string;
  reward_1: number;
  reward_2: number;
  reward_3: number;
  reward_4: number;
  reward_5: number;
  reward_6: number;
  reward_7: number;
};

const columnHelper = createColumnHelper<RowDataBoardRewardRound202511>();
export const columnDefBoardRewardRound202511 = [
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
    header: "[和装花嫁25]南田七星(SR)",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "[和装花嫁25]南田七星(SR)",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_2", {
    header: "ぷちワンダースナップ",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "ぷちワンダースナップ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_3", {
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
  columnHelper.accessor("reward_4", {
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
  columnHelper.accessor("reward_5", {
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
  columnHelper.accessor("reward_6", {
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
  columnHelper.accessor("reward_7", {
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
