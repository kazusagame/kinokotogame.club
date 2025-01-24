import { createColumnHelper } from "@tanstack/react-table";

export type RowDataEpisodeCollabo = {
  Collabo: string;
  Event: string;
  Date: string;
  Section: string;
  Title: string;
  CharacterList: string;
};

const columnHelper = createColumnHelper<RowDataEpisodeCollabo>();
export const columnDefEpisodeCollabo = [
  columnHelper.accessor("Collabo", {
    header: "コラボ元",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "コラボ元",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("Event", {
    header: "イベント名",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "イベント名",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("Date", {
    header: "登場年月",
    cell: (info) => info.getValue(),
    sortingFn: "alphanumeric",
    meta: {
      label: "登場年月",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("Section", {
    header: "話",
    cell: (info) => info.getValue(),
    sortingFn: "alphanumeric",
    meta: {
      label: "話",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("Title", {
    header: "タイトル",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "タイトル",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("CharacterList", {
    header: "登場キャラクター名",
    cell: (info) => {
      const characterList = info.getValue();
      return <div className="min-w-40">{characterList}</div>;
    },
    sortingFn: "basic",
    meta: {
      label: "登場キャラクター名",
      textAlign: "left",
    },
  }),
];
