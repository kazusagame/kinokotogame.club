import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";

export type RowDataEpisodeTheater = {
  Chapter: string;
  Link: string;
  Section: string;
  Title: string;
  CharacterList: string;
};

const columnHelper = createColumnHelper<RowDataEpisodeTheater>();
export const columnDefEpisodeTheater = [
  columnHelper.accessor("Chapter", {
    header: "編",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "編",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("Link", {
    header: "リンク",
    cell: (info) => {
      const str = info.getValue();
      if (!str) return "";
      return (
        <Link
          href={str}
          target="_blank"
          rel="noreferrer"
          className="link"
          prefetch={false}
        >
          開く
        </Link>
      );
    },
    sortingFn: "basic",
    meta: {
      label: "リンク",
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
