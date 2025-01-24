"use client";

import {
  RowDataEpisodeGeneral,
  columnDefEpisodeGeneral,
} from "@/lib/tableColumnDef/episode/general";
import {
  RowDataEpisodeSeioStoryScenario,
  columnDefEpisodeSeioStoryScenario,
} from "@/lib/tableColumnDef/episode/seioStoryScenario";
import {
  RowDataEpisodeRomance,
  columnDefEpisodeRomance,
} from "@/lib/tableColumnDef/episode/romance";
import {
  RowDataEpisodeTheater,
  columnDefEpisodeTheater,
} from "@/lib/tableColumnDef/episode/theater";
import {
  RowDataEpisodeSearchEtc,
  columnDefEpisodeSearchEtc,
} from "@/lib/tableColumnDef/episode/searchEtc";

import GenericOpenTable from "@/components/common/GenericOpenTable";

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
