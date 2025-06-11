"use client";

import {
  RowDataEpisodeGeneral,
  columnDefEpisodeGeneral,
} from "@/features/archives/episode/table-column-defs/general";
import {
  RowDataEpisodeSeioStoryScenario,
  columnDefEpisodeSeioStoryScenario,
} from "@/features/archives/episode/table-column-defs/seioStoryScenario";
import {
  RowDataEpisodeRomance,
  columnDefEpisodeRomance,
} from "@/features/archives/episode/table-column-defs/romance";
import {
  RowDataEpisodeTheater,
  columnDefEpisodeTheater,
} from "@/features/archives/episode/table-column-defs/theater";
import {
  RowDataEpisodeSearchEtc,
  columnDefEpisodeSearchEtc,
} from "@/features/archives/episode/table-column-defs/searchEtc";

import GenericOpenTable from "@/components/GenericOpenTable";

interface Props {
  data: { [K: string]: string | number | number[] }[];
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

export default function EpisodeResultTable(props: Props) {
  switch (props.tableType) {
    case "seio-story":
      return (
        <GenericOpenTable<RowDataEpisodeSeioStoryScenario>
          {...props}
          columnDef={columnDefEpisodeSeioStoryScenario}
        />
      );
    case "raid-episode":
    case "story-episode":
      return (
        <GenericOpenTable<RowDataEpisodeGeneral>
          {...props}
          columnDef={columnDefEpisodeGeneral}
        />
      );
    case "romance":
      return (
        <GenericOpenTable<RowDataEpisodeRomance>
          {...props}
          columnDef={columnDefEpisodeRomance}
        />
      );
    case "theater":
      return (
        <GenericOpenTable<RowDataEpisodeTheater>
          {...props}
          columnDef={columnDefEpisodeTheater}
        />
      );
    case "episode-etc":
      return (
        <GenericOpenTable<RowDataEpisodeSearchEtc>
          {...props}
          columnDef={columnDefEpisodeSearchEtc}
        />
      );
  }
}
