import { createColumnHelper } from "@tanstack/react-table";

export type RowDataDivraceReward003 = {
  class: string;
  grade: string;
  rank: string;
  reward_1: number;
  reward_2: number;
  reward_3: number;
  reward_4: number;
  reward_5: number;
  reward_6: number;
  reward_7: number;
  reward_8: number;
  reward_9: number;
  reward_10: number;
  reward_11: number;
  reward_12: number;
  reward_13: number;
  reward_14: number;
  reward_15: number;
  reward_16: number;
  reward_17: number;
};

const columnHelper = createColumnHelper<RowDataDivraceReward003>();
export const columnDefDivraceReward003 = [
  columnHelper.accessor("class", {
    header: "クラス",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    enableHiding: false,
    size: 70,
    meta: {
      label: "クラス",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("grade", {
    header: "組",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    enableHiding: false,
    size: 40,
    meta: {
      label: "組",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("rank", {
    header: "順位",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    enableHiding: false,
    size: 80,
    meta: {
      label: "順位",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_1", {
    header: "NewSR小日向いちご",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "NewSR小日向いちご",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_2", {
    header: "NewSR雪風真弥",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "NewSR雪風真弥",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_3", {
    header: "NewSR雪風真弥専用マカロン",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "NewSR雪風真弥専用マカロン",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_4", {
    header: "イベントスペシャルガールラブレター",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "イベントスペシャルガールラブレター",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_5", {
    header: "イベントスペシャルガールSR確定キュピチケ",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "イベントスペシャルガールSR確定キュピチケ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_6", {
    header: "予選グループガールラブレター",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "予選グループガールラブレター",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_7", {
    header: "予選グループガール確定キュピチケ",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "予選グループガール確定キュピチケ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_8", {
    header: "ぷちフレンドブーケ",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "ぷちフレンドブーケ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_9", {
    header: "ぷちローズ全種セット",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "ぷちローズ全種セット",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_10", {
    header: "ぷちローズ交換チケット",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "ぷちローズ交換チケット",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_11", {
    header: "ラブリーティラミス",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "ラブリーティラミス",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_12", {
    header: "ラブリーショコラ",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "ラブリーショコラ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_13", {
    header: "ラブリークッキー",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "ラブリークッキー",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_14", {
    header: "グミ",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "グミ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_15", {
    header: "POPリング(大)",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "POPリング(大)",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_16", {
    header: "プラチナシーンキュピチケ",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "プラチナシーンキュピチケ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_17", {
    header: "王冠",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "王冠",
      textAlign: "center",
    },
  }),
];
