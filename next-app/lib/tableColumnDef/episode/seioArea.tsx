import { createColumnHelper } from "@tanstack/react-table";

export type RowDataEpisodeSeioArea = {
  Type: string;
  AreaName: string;
  GirlList: string;
  Conversation: string[];
};

const columnHelper = createColumnHelper<RowDataEpisodeSeioArea>();
export const columnDefEpisodeSeioArea = [
  columnHelper.accessor("Type", {
    header: "会話タイプ",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "会話タイプ",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("AreaName", {
    header: "エリア名",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "エリア名",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("GirlList", {
    header: "登場キャラクター名",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "登場キャラクター名",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("Conversation", {
    header: "会話",
    cell: (info) => {
      const conversationList = info.getValue();
      return (
        <div className="flex flex-col gap-1">
          {conversationList.map((value, index) => {
            return <p key={index}>{value}</p>;
          })}
        </div>
      );
    },
    sortingFn: "basic",
    meta: {
      label: "会話",
      textAlign: "left",
    },
  }),
];
