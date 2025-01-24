import Link from "next/link";
import { createColumnHelper } from "@tanstack/react-table";

export type RowDataEpisodeRomance = {
  Volume: string;
  Link: string;
  Chapter: string;
  Section: string;
  CharacterList: string;
  Summary: string;
};

const columnHelper = createColumnHelper<RowDataEpisodeRomance>();
export const columnDefEpisodeRomance = [
  columnHelper.accessor("Volume", {
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
  columnHelper.accessor("Chapter", {
    header: "章",
    cell: (info) => info.getValue(),
    sortingFn: "alphanumeric",
    meta: {
      label: "章",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("Section", {
    header: "話",
    cell: (info) => info.getValue(),
    sortingFn: "alphanumeric",
    meta: {
      label: "話",
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
  columnHelper.accessor("Summary", {
    header: "あらすじ",
    cell: (info) => {
      const summary = info.getValue();
      return <div className="min-w-60">{summary}</div>;
    },
    sortingFn: "basic",
    meta: {
      label: "あらすじ",
      textAlign: "left",
    },
  }),
];
