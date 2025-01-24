"use client";

import { useRef } from "react";

import useFilter from "./useFilter";
import useSearch, {
  COLLECTION_LIST,
  Collection,
  EPISODE_NAME,
} from "./useSearch";
import TypeGradeSchoolFilter from "./TypeGradeSchoolFilter";
import GirlSelectBox from "./GirlSelectBox";
import EpisodeResultTable from "./EpisodeResultTable";

export default function EpisodeSearch() {
  const selectRef = useRef<HTMLSelectElement>(null);
  const { filter, handleChangeFilter } = useFilter();
  const { isLoading, result, error, handleClickSearchButton } =
    useSearch(selectRef);

  return (
    <>
      <section className="p-4 rounded-xl bg-base-200">
        <TypeGradeSchoolFilter
          filter={filter}
          onChangeFilter={handleChangeFilter}
        />
        <div className="flex mt-4">
          <GirlSelectBox filter={filter} ref={selectRef} />
          <button
            className="btn btn-neutral rounded-md ml-8"
            onClick={handleClickSearchButton}
          >
            検索
          </button>
        </div>
      </section>
      <ResultSummary result={result} />
      <ResultEpisode isLoading={isLoading} result={result} error={error} />
    </>
  );
}

function ResultSummary({
  result,
}: {
  result: {
    [K in Collection]:
      | { [K: string]: string | number | number[] }[]
      | undefined;
  };
}) {
  return (
    <section className="mt-4 p-4 rounded-xl bg-base-200">
      <h1 className="text-xl mb-4">検索結果</h1>
      <table className="table table-xs md:table-md w-auto mt-2">
        <thead>
          <tr>
            <th className="p-1 md:p-2"></th>
            <th className="p-1 md:p-2 text-center min-w-20">件数</th>
          </tr>
        </thead>
        <tbody>
          {COLLECTION_LIST.map((collection) => (
            <tr key={collection}>
              <td className="p-1 md:p-2">
                <a href={"#" + collection} className="link">
                  {EPISODE_NAME[collection]}
                </a>
              </td>
              <td className="p-1 md:p-2 text-right">
                {result[collection] ? result[collection].length : 0}
                {" 件"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function ResultEpisode({
  isLoading,
  result,
  error,
}: {
  isLoading: boolean;
  result: {
    [K in Collection]:
      | { [K: string]: string | number | number[] }[]
      | undefined;
  };
  error: { [K in Collection]: string | undefined };
}) {
  return (
    <>
      {COLLECTION_LIST.map((collection) => (
        <section
          key={collection}
          id={collection}
          className="mt-4 p-4 rounded-xl bg-base-200"
        >
          <h1 className="text-xl mb-4">{EPISODE_NAME[collection]}</h1>
          {isLoading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : error[collection] ? (
            <span className="text-error">{error[collection]}</span>
          ) : !result[collection] ? (
            <span className="text-info">
              エピソードが見つかりませんでした。
            </span>
          ) : result[collection].length === 0 ? (
            <span className="text-info">
              エピソードが見つかりませんでした。
            </span>
          ) : (
            <EpisodeResultTable
              data={result[collection]}
              tableType={collection}
              tableSize="xs"
              initialColumnVisibility={
                collection === "seio-story" || collection === "romance"
                  ? { Summary: false }
                  : {}
              }
            />
          )}
        </section>
      ))}
    </>
  );
}
