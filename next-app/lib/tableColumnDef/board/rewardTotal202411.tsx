import { createColumnHelper } from "@tanstack/react-table";

export type RowDataBoardRewardTotal202411 = {
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
};

const columnHelper = createColumnHelper<RowDataBoardRewardTotal202411>();
export const columnDefBoardRewardTotal202411 = [
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
    header: "[部活動]綾小路美麗(SR)",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "[部活動]綾小路美麗(SR)",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_2", {
    header: "[ｽﾏｲﾙﾏｼﾞｯｸ]島田泉用マカロン",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "[ｽﾏｲﾙﾏｼﾞｯｸ]島田泉用マカロン",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_3", {
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
  columnHelper.accessor("reward_4", {
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
  columnHelper.accessor("reward_5", {
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
  columnHelper.accessor("reward_6", {
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
  columnHelper.accessor("reward_7", {
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
  columnHelper.accessor("reward_8", {
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
  columnHelper.accessor("reward_9", {
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
  columnHelper.accessor("reward_10", {
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
  columnHelper.accessor("reward_11", {
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
  columnHelper.accessor("reward_12", {
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
