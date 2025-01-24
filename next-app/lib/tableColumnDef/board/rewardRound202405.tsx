import { createColumnHelper } from "@tanstack/react-table";

export type RowDataBoardRewardRound202405 = {
  rank: string;
  reward_1: number;
  reward_2: number;
  reward_3: number;
  reward_4: number;
  reward_5: number;
  reward_6: number;
};

const columnHelper = createColumnHelper<RowDataBoardRewardRound202405>();
export const columnDefBoardRewardRound202405 = [
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
    header: "ぷちローズ交換チケット",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "ぷちローズ交換チケット",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_2", {
    header: "[水着選び24]月隈林子(SR)",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "[水着選び24]月隈林子(SR)",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_3", {
    header: "[部活体験会24]押井知(SR)",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "[部活体験会24]押井知(SR)",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_4", {
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
  columnHelper.accessor("reward_5", {
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
