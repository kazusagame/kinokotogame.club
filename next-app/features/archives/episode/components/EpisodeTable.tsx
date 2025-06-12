"use client";

import {
  RowDataEpisodeGeneral,
  columnDefEpisodeGeneral,
} from "@/features/archives/episode/table-column-defs/general";
import {
  RowDataEpisodeSeioArea,
  columnDefEpisodeSeioArea,
} from "@/features/archives/episode/table-column-defs/seioArea";
import {
  RowDataEpisodeSeioStoryScenario,
  columnDefEpisodeSeioStoryScenario,
} from "@/features/archives/episode/table-column-defs/seioStoryScenario";
import {
  RowDataEpisodeSeioStoryStage,
  columnDefEpisodeSeioStoryStage,
} from "@/features/archives/episode/table-column-defs/seioStoryStage";
import {
  RowDataEpisodeRomance,
  columnDefEpisodeRomance,
} from "@/features/archives/episode/table-column-defs/romance";
import {
  RowDataEpisodeTheater,
  columnDefEpisodeTheater,
} from "@/features/archives/episode/table-column-defs/theater";
import {
  RowDataEpisodeCollabo,
  columnDefEpisodeCollabo,
} from "@/features/archives/episode/table-column-defs/collabo";
import {
  RowDataEpisodeIchinose,
  columnDefEpisodeIchinose,
} from "@/features/archives/episode/table-column-defs/ichinose";
import {
  RowDataEpisodeAnimeSideStory,
  columnDefEpisodeAnimeSideStory,
} from "@/features/archives/episode/table-column-defs/animeSideStory";

import GenericCollapseTable from "@/components/GenericCollapseTable";

interface Props {
  title: string;
  jsonFileName: string;
  tableType: string;
  tableSize?: "xs" | "sm" | "md" | "lg";
  enableNowrapHead?: boolean;
  enableNowrapBody?: boolean;
  pageSize?: number;
  pageSizeList?: number[];
  disablePagination?: boolean;
  disableSearchBox?: boolean;
  disableColumnFilter?: boolean;
  initialColumnVisibility?: { [K: string]: boolean };
  initialColumnPinning?: { [K: string]: string[] };
}

export default function EpisodeTable(props: Props) {
  switch (props.tableType) {
    case "general":
      return (
        <GenericCollapseTable<RowDataEpisodeGeneral>
          {...props}
          columnDef={columnDefEpisodeGeneral}
        />
      );
    case "seioArea":
      return (
        <GenericCollapseTable<RowDataEpisodeSeioArea>
          {...props}
          columnDef={columnDefEpisodeSeioArea}
        />
      );
    case "seioStoryScenario":
      return (
        <GenericCollapseTable<RowDataEpisodeSeioStoryScenario>
          {...props}
          columnDef={columnDefEpisodeSeioStoryScenario}
        />
      );
    case "seioStoryStage":
      return (
        <GenericCollapseTable<RowDataEpisodeSeioStoryStage>
          {...props}
          columnDef={columnDefEpisodeSeioStoryStage}
        />
      );
    case "romance":
      return (
        <GenericCollapseTable<RowDataEpisodeRomance>
          {...props}
          columnDef={columnDefEpisodeRomance}
        />
      );
    case "theater":
      return (
        <GenericCollapseTable<RowDataEpisodeTheater>
          {...props}
          columnDef={columnDefEpisodeTheater}
        />
      );
    case "collabo":
      return (
        <GenericCollapseTable<RowDataEpisodeCollabo>
          {...props}
          columnDef={columnDefEpisodeCollabo}
        />
      );
    case "ichinose":
      return (
        <GenericCollapseTable<RowDataEpisodeIchinose>
          {...props}
          columnDef={columnDefEpisodeIchinose}
        />
      );
    case "animeSideStory":
      return (
        <GenericCollapseTable<RowDataEpisodeAnimeSideStory>
          {...props}
          columnDef={columnDefEpisodeAnimeSideStory}
        />
      );
  }
}
