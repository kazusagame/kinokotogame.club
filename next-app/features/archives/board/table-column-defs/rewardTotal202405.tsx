import { createColumnHelper } from "@tanstack/react-table";

export type RowDataBoardRewardTotal202405 = {
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

const columnHelper = createColumnHelper<RowDataBoardRewardTotal202405>();
export const columnDefBoardRewardTotal202405 = [
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
    header: "ラブリーティラミス",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "ラブリーティラミス",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_2", {
    header: "[定番ですヨM]クロエ・ルメール用マカロン",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "[定番ですヨM]クロエ・ルメール用マカロン",
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
    header: "思い出の19-24SR確定ぷちｷｭﾋﾟﾁｹ",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "思い出の19-24SR確定ぷちｷｭﾋﾟﾁｹ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_8", {
    header: "SR確定ぷちｷｭﾋﾟﾁｹ",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "SR確定ぷちｷｭﾋﾟﾁｹ",
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
    header: "POPリング(大)",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "POPリング(大)",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_11", {
    header: "POPリング(中)",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "POPリング(中)",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("reward_12", {
    header: "POPリング(小)",
    cell: (info) => {
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "POPリング(小)",
      textAlign: "center",
    },
  }),
];
