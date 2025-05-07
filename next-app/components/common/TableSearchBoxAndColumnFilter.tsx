import { useState, useId } from "react";
import { Table } from "@tanstack/react-table";

interface Prop<T> {
  table: Table<T>;
  disableSearchBox?: boolean;
  disableColumnFilter?: boolean;
}

export default function TableSearchBoxAndColumnFilter<T>({
  table,
  disableSearchBox,
  disableColumnFilter,
}: Prop<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [animation, setAnimation] = useState("");
  /* chromeのワーニング対策  */
  const textId = useId();

  const toggleDropdown = () => {
    if (isOpen) {
      setAnimation("animate-fadeOut");
      setTimeout(() => setIsOpen(false), 300);
    } else {
      setIsOpen(true);
      setAnimation("animate-fadeIn");
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between mt-1">
        {!disableSearchBox ? (
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              id={textId}
              className="grow w-full md:w-80"
              placeholder="検索"
              onChange={(e) => table.setGlobalFilter(String(e.currentTarget.value))}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        ) : (
          <div></div>
        )}
        {!disableColumnFilter && (
          <button
            className="btn btn-neutral rounded-md ml-4"
            onClick={toggleDropdown}
          >
            {"列表示切替"}
          </button>
        )}
      </div>
      <div className="relative mt-2">
        {isOpen ? (
          <div className={animation}>
            <div className="flex flex-wrap gap-x-4">
              <label className="label cursor-pointer justify-start">
                <input
                  type="checkbox"
                  checked={table.getIsAllColumnsVisible()}
                  onChange={table.getToggleAllColumnsVisibilityHandler()}
                  className="checkbox rounded-md mr-2"
                />
                <span className="label-text">全て表示 / 非表示</span>
              </label>
            </div>
            <div className="divider my-0"></div>
            <div className="flex flex-wrap gap-x-4">
              {table.getAllLeafColumns().map((column) => {
                if (!column.getCanHide()) return null;
                return (
                  <label
                    key={column.id}
                    className="label cursor-pointer justify-start"
                  >
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                      className="checkbox rounded-md mr-2"
                    />
                    <span className="label-text">
                      {column.columnDef?.meta?.label ?? column.id}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
