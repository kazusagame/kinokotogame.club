import { createColumnHelper } from "@tanstack/react-table";

export type RowDataBoardRewardTotal202511 = {
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
};

const columnHelper = createColumnHelper<RowDataBoardRewardTotal202511>();
export const columnDefBoardRewardTotal202511 = [
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
    header: "[和装花嫁25]時谷小瑠璃(SR)",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "[和装花嫁25]時谷小瑠璃(SR)",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_2", {
    header: "[星の契り]南田七星用マカロン",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "[星の契り]南田七星用マカロン",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_3", {
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
  columnHelper.accessor("reward_4", {
    header: "SR(+5)確定フラワーストラップキュピチケ",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "SR(+5)確定フラワーストラップキュピチケ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_5", {
    header: "SR(+2)以上確定フラワーストラップキュピチケ",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "SR(+2)以上確定フラワーストラップキュピチケ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_6", {
    header: "SR確定フラワーストラップキュピチケ",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "SR確定フラワーストラップキュピチケ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_7", {
    header: "SR30%フラワーストラップキュピチケ",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "SR30%フラワーストラップキュピチケ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_8", {
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
  columnHelper.accessor("reward_9", {
    header: "チャーム(COOL)",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "チャーム(COOL)",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_10", {
    header: "COOLリング(大)",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "COOLリング(大)",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_11", {
    header: "COOLリング(中)",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "COOLリング(中)",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_12", {
    header: "COOLリング(小)",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "COOLリング(小)",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_13", {
    header: "称号",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "称号",
      textAlign: "center",
    },
  }),
];
