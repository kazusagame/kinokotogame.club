import { Table } from "@tanstack/react-table";

interface Prop<T> {
  table: Table<T>;
  pageSizeList?: number[];
}

export default function TablePageController<T>({
  table,
  pageSizeList = [5, 10, 20, 50, 100],
}: Prop<T>) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex items-center justify-center gap-4 mx-auto">
        <button
          className="btn btn-neutral rounded-md w-12"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="btn btn-neutral rounded-md w-12"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <span className="flex items-center whitespace-nowrap">
          <strong>
            {table.getState().pagination.pageIndex + 1} {" / "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <button
          className="btn btn-neutral rounded-md w-12"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="btn btn-neutral rounded-md w-12"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>
      <div className="flex items-center justify-center gap-1">
        <p className="text-sm">表示数</p>
        <select
          className="select select-bordered select-md mx-2"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {pageSizeList.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
