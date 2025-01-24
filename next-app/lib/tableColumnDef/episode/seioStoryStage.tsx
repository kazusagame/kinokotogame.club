import { createColumnHelper } from "@tanstack/react-table";

export type RowDataEpisodeSeioStoryStage = {
  Volume: string;
  Chapter: string;
  Stage: string;
  Point: number | string;
  RewardMain: string;
  RewardSub: string;
};

const columnHelper = createColumnHelper<RowDataEpisodeSeioStoryStage>();
export const columnDefEpisodeSeioStoryStage = [
  columnHelper.accessor("Volume", {
    header: "編",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "編",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("Chapter", {
    header: "章",
    cell: (info) => info.getValue(),
    sortingFn: "alphanumeric",
    meta: {
      label: "章",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("Stage", {
    header: "ステージ",
    cell: (info) => info.getValue(),
    sortingFn: "alphanumeric",
    meta: {
      label: "ステージ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("Point", {
    header: "クリア条件 (pt)",
    cell: (info) => {
      if (typeof info.getValue() !== "number") return "-";
      return info.getValue().toLocaleString("ja-JP", {
        style: "decimal",
        useGrouping: true,
      });
    },
    sortingFn: "basic",
    meta: {
      label: "クリア条件 (pt)",
      textAlign: "right",
    },
  }),
  columnHelper.accessor("RewardMain", {
    header: "スペシャルごほうび",
    cell: (info) => {
      const itemList = info.getValue().split("\n");
      return (
        <div className="flex flex-col gap-1 min-w-40">
          {itemList.map((value, index) => {
            return <p key={index}>{value}</p>;
          })}
        </div>
      );
    },
    sortingFn: "basic",
    meta: {
      label: "スペシャルごほうび",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("RewardSub", {
    header: "その他ごほうび",
    cell: (info) => {
      const itemList = info.getValue().split("\n");
      return (
        <div className="flex flex-col gap-1 min-w-40">
          {itemList.map((value, index) => {
            return <p key={index}>{value}</p>;
          })}
        </div>
      );
    },
    sortingFn: "basic",
    meta: {
      label: "その他ごほうび",
      textAlign: "left",
    },
  }),
];
