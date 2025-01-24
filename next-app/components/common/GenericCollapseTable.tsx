"use client";

import { useState, useId, CSSProperties } from "react";
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

import TableSearchBoxAndColumnFilter from "@/components/common/TableSearchBoxAndColumnFilter";
import TablePageController from "@/components/common/TablePageController";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string;
    textAlign?: string;
  }
}
interface Props<T> {
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

export default function GenericCollapseTable<T>({
  title,
  jsonFileName,
  tableSize,
  enableNowrapHead,
  enableNowrapBody,
  pageSize,
  disablePagination,
  disableSearchBox,
  disableColumnFilter,
  initialColumnVisibility,
  initialColumnPinning,
  columnDef,
}: Props<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);
  const table = useReactTable({
    columns: columnDef,
    data: data,
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
  const checkboxId = useId();

  const handleCollapseChange = async () => {
    if (!isLoaded) {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetch(jsonFileName).then((res) => res.json());
        setData(result);
        setIsLoaded(true);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "予期せぬエラーが発生しました"
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

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
    <div className="collapse collapse-arrow border border-base-300 bg-base-200 my-2">
      <input type="checkbox" id={checkboxId} onChange={handleCollapseChange} />
      <div className="collapse-title text-xl">{title}</div>
      <div className="collapse-content overflow-x-auto">
        {isLoading ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : error ? (
          <span className="text-error">{error}</span>
        ) : (
          isLoaded && (
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
                      <tr
                        key={row.id}
                        className="odd:bg-base-200 even:bg-base-300"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className={
                              cell.column.columnDef?.meta?.textAlign === "left"
                                ? "text-left align-middle"
                                : cell.column.columnDef?.meta?.textAlign ===
                                  "right"
                                ? "text-right align-middle"
                                : "text-center align-middle"
                            }
                            style={{ ...getCommonPinningStyles(cell.column) }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!disablePagination && <TablePageController<T> table={table} />}
            </>
          )
        )}
      </div>
    </div>
  );
}
