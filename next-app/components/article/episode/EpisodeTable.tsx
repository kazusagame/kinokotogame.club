"use client";

import {
  RowDataEpisodeGeneral,
  columnDefEpisodeGeneral,
} from "@/lib/tableColumnDef/episode/general";
import {
  RowDataEpisodeSeioArea,
  columnDefEpisodeSeioArea,
} from "@/lib/tableColumnDef/episode/seioArea";
import {
  RowDataEpisodeSeioStoryScenario,
  columnDefEpisodeSeioStoryScenario,
} from "@/lib/tableColumnDef/episode/seioStoryScenario";
import {
  RowDataEpisodeSeioStoryStage,
  columnDefEpisodeSeioStoryStage,
} from "@/lib/tableColumnDef/episode/seioStoryStage";
import {
  RowDataEpisodeRomance,
  columnDefEpisodeRomance,
} from "@/lib/tableColumnDef/episode/romance";
import {
  RowDataEpisodeTheater,
  columnDefEpisodeTheater,
} from "@/lib/tableColumnDef/episode/theater";
import {
  RowDataEpisodeCollabo,
  columnDefEpisodeCollabo,
} from "@/lib/tableColumnDef/episode/collabo";
import {
  RowDataEpisodeIchinose,
  columnDefEpisodeIchinose,
} from "@/lib/tableColumnDef/episode/ichinose";
import {
  RowDataEpisodeAnimeSideStory,
  columnDefEpisodeAnimeSideStory,
} from "@/lib/tableColumnDef/episode/animeSideStory";

import GenericCollapseTable from "@/components/common/GenericCollapseTable";

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
