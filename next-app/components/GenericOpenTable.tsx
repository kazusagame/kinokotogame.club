"use client";

import { CSSProperties } from "react";
import {
  Column,
  RowData,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import TableSearchBoxAndColumnFilter from "@/components/TableSearchBoxAndColumnFilter";
import TablePageController from "@/components/TablePageController";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string;
    textAlign?: string;
  }
}
interface Props<T> {
  data: { [K: string]: string | number | number[] }[];
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

  /* TanStackTable GitHub#4382 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columnDef: ColumnDef<T, any>[];
}

const getCommonPinningStyles = <T,>(column: Column<T>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
      ? "4px 0 4px -4px gray inset"
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? "sticky" : "relative",
    width: isPinned ? column.getSize() : undefined,
    minWidth: isPinned ? column.getSize() : "80px",
    backgroundColor: "inherit",
    zIndex: isPinned ? 1 : 0,
  };
};

export default function GenericOpenTable<T>({
  data,
  tableSize,
  enableNowrapHead,
  enableNowrapBody,
  pageSize,
  pageSizeList,
  disablePagination,
  disableSearchBox,
  disableColumnFilter,
  initialColumnVisibility,
  initialColumnPinning,
  columnDef,
}: Props<T>) {
  const table = useReactTable({
    data: data as T[],
    columns: columnDef,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getColumnCanGlobalFilter: (column) => {
      return column.columnDef.enableGlobalFilter ?? true;
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize ?? 10,
      },
      columnVisibility: initialColumnVisibility ?? {},
      columnPinning: initialColumnPinning ?? {},
    },
  });
  let tableSizeCSS = "md:table-md";
  switch (tableSize) {
    case "xs":
      tableSizeCSS = "md:table-xs";
      break;
    case "sm":
      tableSizeCSS = "md:table-sm";
      break;
    case "md":
      tableSizeCSS = "md:table-md";
      break;
    case "lg":
      tableSizeCSS = "md:table-lg";
      break;
    default:
      break;
  }
  const theadCss = enableNowrapHead ? "whitespace-nowrap" : "whitespace-normal";
  const tbodyCss = enableNowrapBody ? "whitespace-nowrap" : "whitespace-normal";

  return (
    <>
      <TableSearchBoxAndColumnFilter<T>
        table={table}
        disableSearchBox={disableSearchBox}
        disableColumnFilter={disableColumnFilter}
      />
      <div className="overflow-x-scroll">
        <table className={`table table-xs ${tableSizeCSS} w-auto mb-2`}>
          <thead className={theadCss}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="odd:bg-base-300 even:bg-base-200"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={
                      header.column.getCanSort()
                        ? "text-center cursor-pointer select-none"
                        : "text-center"
                    }
                    style={{ ...getCommonPinningStyles(header.column) }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span className="ml-2">
                          {{ asc: "▲", desc: "▼" }[
                            header.column.getIsSorted() as string
                          ] ?? null}
                        </span>
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={tbodyCss}>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="odd:bg-base-200 even:bg-base-300">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={
                      cell.column.columnDef?.meta?.textAlign === "left"
                        ? "text-left align-middle"
                        : cell.column.columnDef?.meta?.textAlign === "right"
                        ? "text-right align-middle"
                        : "text-center align-middle"
                    }
                    style={{ ...getCommonPinningStyles(cell.column) }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!disablePagination && <TablePageController<T> table={table} pageSizeList={pageSizeList}/>}
    </>
  );
}
