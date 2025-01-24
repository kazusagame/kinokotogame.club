"use client";

import {
  RowDataDivraceReward001,
  columnDefDivraceReward001,
} from "@/lib/tableColumnDef/divrace/reward001";
import {
  RowDataDivraceReward002,
  columnDefDivraceReward002,
} from "@/lib/tableColumnDef/divrace/reward002";
import {
  RowDataDivraceReward003,
  columnDefDivraceReward003,
} from "@/lib/tableColumnDef/divrace/reward003";
import {
  RowDataDivraceReward004,
  columnDefDivraceReward004,
} from "@/lib/tableColumnDef/divrace/reward004";
import {
  RowDataDivracePoint,
  columnDefDivracePoint,
} from "@/lib/tableColumnDef/divrace/point";
import {
  RowDataDivraceStageBase,
  columnDefDivraceStageBase,
} from "@/lib/tableColumnDef/divrace/stageBase";
import {
  RowDataDivraceStageChallenge,
  columnDefDivraceStageChallenge,
} from "@/lib/tableColumnDef/divrace/stageChallenge";

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

export default function DivraceTable(props: Props) {
  switch (props.tableType) {
    case "divraceReward001":
      return (
        <GenericCollapseTable<RowDataDivraceReward001>
          {...props}
          columnDef={columnDefDivraceReward001}
        />
      );
    case "divraceReward002":
      return (
        <GenericCollapseTable<RowDataDivraceReward002>
          {...props}
          columnDef={columnDefDivraceReward002}
        />
      );
    case "divraceReward003":
      return (
        <GenericCollapseTable<RowDataDivraceReward003>
          {...props}
          columnDef={columnDefDivraceReward003}
        />
      );
    case "divraceReward004":
      return (
        <GenericCollapseTable<RowDataDivraceReward004>
          {...props}
          columnDef={columnDefDivraceReward004}
        />
      );
    case "divracePoint":
      return (
        <GenericCollapseTable<RowDataDivracePoint>
          {...props}
          columnDef={columnDefDivracePoint}
        />
      );
    case "divraceStageBase":
      return (
        <GenericCollapseTable<RowDataDivraceStageBase>
          {...props}
          columnDef={columnDefDivraceStageBase}
        />
      );
    case "divraceStageChallenge":
      return (
        <GenericCollapseTable<RowDataDivraceStageChallenge>
          {...props}
          columnDef={columnDefDivraceStageChallenge}
        />
      );
  }
}
