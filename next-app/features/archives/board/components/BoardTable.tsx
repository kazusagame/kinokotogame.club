"use client";

import {
  RowDataBoardRewardTotal202405,
  columnDefBoardRewardTotal202405,
} from "@/features/archives/board/table-column-defs/rewardTotal202405";
import {
  RowDataBoardRewardRound202405,
  columnDefBoardRewardRound202405,
} from "@/features/archives/board/table-column-defs/rewardRound202405";
import {
  RowDataBoardRewardCount202405,
  columnDefBoardRewardCount202405,
} from "@/features/archives/board/table-column-defs/rewardCount202405";
import {
  RowDataBoardRewardTotal202411,
  columnDefBoardRewardTotal202411,
} from "@/features/archives/board/table-column-defs/rewardTotal202411";
import {
  RowDataBoardRewardRound202411,
  columnDefBoardRewardRound202411,
} from "@/features/archives/board/table-column-defs/rewardRound202411";
import {
  RowDataBoardRewardCount202411,
  columnDefBoardRewardCount202411,
} from "@/features/archives/board/table-column-defs/rewardCount202411";
import {
  RowDataBoardPoint,
  columnDefBoardPoint,
} from "@/features/archives/board/table-column-defs/point";
import {
  RowDataBoardStage,
  columnDefBoardStage,
} from "@/features/archives/board/table-column-defs/stage";
import {
  RowDataBoardEffect,
  columnDefBoardEffect,
} from "@/features/archives/board/table-column-defs/effect";
import {
  RowDataBoardCupid,
  columnDefBoardCupid,
} from "@/features/archives/board/table-column-defs/cupid";
import {
  RowDataBoardItem,
  columnDefBoardItem,
} from "@/features/archives/board/table-column-defs/item";

import GenericCollapseTable from "@/components/GenericCollapseTable";

interface Props {
  title: string;
  jsonFileName: string;
  tableType: string;
  tableSize?: "xs" | "sm" | "md" | "lg";
  enableNowrapHead?: boolean;
  enableNowrapBody?: boolean;
  pageSize?: number;
  disablePagination?: boolean;
  disableSearchBox?: boolean;
  disableColumnFilter?: boolean;
  initialColumnVisibility?: { [K: string]: boolean };
  initialColumnPinning?: { [K: string]: string[] };
}

export default function BoardTable(props: Props) {
  switch (props.tableType) {
    case "boardRewardTotal202405":
      return (
        <GenericCollapseTable<RowDataBoardRewardTotal202405>
          {...props}
          columnDef={columnDefBoardRewardTotal202405}
        />
      );
    case "boardRewardRound202405":
      return (
        <GenericCollapseTable<RowDataBoardRewardRound202405>
          {...props}
          columnDef={columnDefBoardRewardRound202405}
        />
      );
    case "boardRewardCount202405":
      return (
        <GenericCollapseTable<RowDataBoardRewardCount202405>
          {...props}
          columnDef={columnDefBoardRewardCount202405}
        />
      );
    case "boardRewardTotal202411":
      return (
        <GenericCollapseTable<RowDataBoardRewardTotal202411>
          {...props}
          columnDef={columnDefBoardRewardTotal202411}
        />
      );
    case "boardRewardRound202411":
      return (
        <GenericCollapseTable<RowDataBoardRewardRound202411>
          {...props}
          columnDef={columnDefBoardRewardRound202411}
        />
      );
    case "boardRewardCount202411":
      return (
        <GenericCollapseTable<RowDataBoardRewardCount202411>
          {...props}
          columnDef={columnDefBoardRewardCount202411}
        />
      );
    case "boardPoint":
      return (
        <GenericCollapseTable<RowDataBoardPoint>
          {...props}
          columnDef={columnDefBoardPoint}
        />
      );
    case "boardStage":
      return (
        <GenericCollapseTable<RowDataBoardStage>
          {...props}
          columnDef={columnDefBoardStage}
        />
      );
    case "boardEffect":
      return (
        <GenericCollapseTable<RowDataBoardEffect>
          {...props}
          columnDef={columnDefBoardEffect}
        />
      );
    case "boardCupid":
      return (
        <GenericCollapseTable<RowDataBoardCupid>
          {...props}
          columnDef={columnDefBoardCupid}
        />
      );
    case "boardItem":
      return (
        <GenericCollapseTable<RowDataBoardItem>
          {...props}
          columnDef={columnDefBoardItem}
        />
      );
  }
}
