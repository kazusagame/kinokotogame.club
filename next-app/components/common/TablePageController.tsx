import { Table } from "@tanstack/react-table";

interface Prop<T> {
  table: Table<T>;
}

export default function TablePageController<T>({ table }: Prop<T>) {
  return (
    <div className="flex items-center justify-center gap-4">
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
  );
}
