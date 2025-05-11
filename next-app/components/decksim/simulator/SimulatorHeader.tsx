import { useId, useRef } from "react";
import Link from "next/link";
import ThemeControllerMenu from "@/components/common/ThemeControllerMenu";
import MenuIcon from "@mui/icons-material/Menu";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import SaveIcon from "@mui/icons-material/Save";

import {
  OriginSavedDataSummary,
  OriginLocalStorageData,
} from "@/components/decksim/simulator/useLocalStorageData";

import { MAX_SAVE_DATA_NUM } from "@/components/decksim/simulator/globalConfig";
import { EVENT_ID_TO_NAME_DICT } from "@/components/decksim/data/eventData";
import { RaidwarSkillResultSummaryDiv } from "@/components/decksim/simulator/RaidwarSkillSimulator";
import { RaidwarSkillResult } from "@/components/decksim/simulator/useRaidwarSkillData";
import {
  DivraceStageResultSummaryDiv,
  DivraceStageSavedDataDiv,
} from "@/components/decksim/simulator/DivraceStageSimulator";
import {
  DivraceStageData,
  DivraceStageResult,
  DivraceStageSavedDataSummary,
} from "@/components/decksim/simulator/useDivraceStageData";

interface HeaderProps<T, U, V> {
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
  title: string;
  isFixHeader: boolean;
  data: T;
  resultSummary: U;
  savedDataSummaries: V[];
  handleFixHeader: () => void;
  handleLoadData: (newData: T) => void;
  handleChangeMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleClickIndividualSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ResultSummary {
  dataType: string;
  initCondition: boolean;
  summaries: unknown;
}

export default function SimulatorHeader<
  T,
  U extends ResultSummary,
  V extends OriginSavedDataSummary,
  W extends OriginLocalStorageData
>({
  eventId,
  title,
  isFixHeader,
  data,
  resultSummary,
  savedDataSummaries,
  handleFixHeader,
  handleLoadData,
  handleChangeMemo,
  handleClickIndividualSave,
}: HeaderProps<T, U, V>) {
  const position = isFixHeader ? "sticky top-0" : "static";

  const handleClickThemeMenu = () => {
    const nextData = structuredClone(data);
    setTimeout(() => handleLoadData(nextData), 100);
  };

  return (
    <header
      className={`bg-base-200 rounded-b-box flex h-[52px] z-[2] ${position}`}
    >
      <LoadButton<T, V, W>
        eventId={eventId}
        handleLoadData={handleLoadData}
        savedDataSummaries={savedDataSummaries}
        handleChangeMemo={handleChangeMemo}
      />
      <SaveButton<V>
        eventId={eventId}
        savedDataSummaries={savedDataSummaries}
        handleChangeMemo={handleChangeMemo}
        handleClickIndividualSave={handleClickIndividualSave}
      />
      <ResultSummaryDiv<T, U>
        eventId={eventId}
        title={title}
        data={data}
        resultSummary={resultSummary}
      />
      <div className="ml-auto" />
      <div className="dropdown dropdown-end mr-2 my-auto">
        <div
          tabIndex={0}
          role="button"
          className="flex flex-col justify-center items-center"
        >
          <MenuIcon />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-200 rounded-box w-52 p-2 shadow z-[2]"
        >
          <li>
            {isFixHeader ? (
              <p onClick={handleFixHeader}>ヘッダー表示切替 [固定]</p>
            ) : (
              <p onClick={handleFixHeader}>ヘッダー表示切替 [通常]</p>
            )}
          </li>
          <li onClick={handleClickThemeMenu}>
            <ThemeControllerMenu />
          </li>
          <li>
            <Link href="/decksim/">1つ前のページに戻る</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

function LoadButton<
  T,
  U extends OriginSavedDataSummary,
  V extends OriginLocalStorageData
>({
  eventId,
  handleLoadData,
  savedDataSummaries,
  handleChangeMemo,
}: {
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
  handleLoadData: (newData: T) => void;
  savedDataSummaries: U[];
  handleChangeMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const modalId = useId();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const handleClickLoadButton = () => {
    const dialogElement = document.getElementById(
      modalId
    ) as HTMLDialogElement | null;
    dialogElement?.showModal();
  };
  const handleClickIndividualLoad = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const num = e.currentTarget.dataset.num;
    if (window.localStorage) {
      const key = `deck-${eventId}-${num}`;
      const loadData = localStorage.getItem(key);
      if (loadData) {
        const parsedData = JSON.parse(loadData) as V;

        // 旧バージョンのデータは無視する
        if (parsedData.version !== 2) return;

        handleLoadData(parsedData.data as T);

        // ロードしたらモーダルは閉じる
        if (buttonRef.current) {
          buttonRef.current.click();
        }
      }
    }
  };

  return (
    <>
      <div
        role="button"
        onClick={handleClickLoadButton}
        className="flex flex-col justify-center items-center ml-2 md:ml-6"
      >
        <FileOpenIcon />
        <p className="text-xs whitespace-nowrap">開く</p>
      </div>
      <dialog id={modalId} className="modal">
        <div className="modal-box w-fit">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              ref={buttonRef}
              autoFocus
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-2">保存したデータを開く</h3>
          {Array(MAX_SAVE_DATA_NUM)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="my-4 text-sm">
                <hr className="mt-4 mb-4 h-px bg-base-300 border-0" />
                <div className="flex flex-row items-center gap-4">
                  <h4>データ{i + 1}</h4>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={handleClickIndividualLoad}
                    data-num={i + 1}
                    disabled={savedDataSummaries[i].lastUpdate ? false : true}
                  >
                    これを開く
                  </button>
                </div>
                <div className="flex flex-col gap-1 pt-2 pl-2 md:pl-4">
                  <div>保存日時：{savedDataSummaries[i].lastUpdate}</div>
                  <SavedDataPerEventDiv
                    eventId={eventId}
                    savedDataSummary={savedDataSummaries[i]}
                  />
                  <div className="flex flex-row gap-2">
                    <p className="whitespace-nowrap">メモ：</p>
                    <textarea
                      name={`memo-${i + 1}`}
                      className="textarea textarea-bordered textarea-xs text-sm w-60"
                      rows={2}
                      cols={15}
                      value={savedDataSummaries[i].memo}
                      onChange={handleChangeMemo}
                      data-num={i + 1}
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

function SaveButton<T extends OriginSavedDataSummary>({
  eventId,
  savedDataSummaries,
  handleChangeMemo,
  handleClickIndividualSave,
}: {
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
  savedDataSummaries: T[];
  handleChangeMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleClickIndividualSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const modalId = useId();
  const handleClickSaveButton = () => {
    const dialogElement = document.getElementById(
      modalId
    ) as HTMLDialogElement | null;
    dialogElement?.showModal();
  };

  return (
    <>
      <div
        role="button"
        onClick={handleClickSaveButton}
        className="flex flex-col justify-center items-center ml-3 md:ml-6"
      >
        <SaveIcon />
        <p className="text-xs whitespace-nowrap">保存</p>
      </div>
      <dialog id={modalId} className="modal">
        <div className="modal-box w-fit">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              autoFocus
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-2">データを保存する</h3>
          {Array(MAX_SAVE_DATA_NUM)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="my-4 text-sm">
                <hr className="mt-4 mb-4 h-px bg-base-300 border-0" />
                <div className="flex flex-row items-center gap-4">
                  <h4>データ{i + 1}</h4>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={handleClickIndividualSave}
                    data-num={i + 1}
                  >
                    ここに保存
                  </button>
                </div>
                <div className="flex flex-col gap-1 pt-2 pl-2 md:pl-4">
                  <div>保存日時：{savedDataSummaries[i].lastUpdate}</div>
                  <SavedDataPerEventDiv
                    eventId={eventId}
                    savedDataSummary={savedDataSummaries[i]}
                  />
                  <div className="flex flex-row gap-2">
                    <p className="whitespace-nowrap">メモ：</p>
                    <textarea
                      name={`memo-${i + 1}`}
                      className="textarea textarea-bordered textarea-xs text-sm w-60"
                      rows={2}
                      cols={15}
                      value={savedDataSummaries[i].memo}
                      onChange={handleChangeMemo}
                      data-num={i + 1}
                    ></textarea>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

function ResultSummaryDiv<T, U extends ResultSummary>({
  eventId,
  title,
  data,
  resultSummary,
}: {
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
  title: string;
  data: T;
  resultSummary: U;
}) {
  return (
    <>
      {resultSummary.initCondition ? (
        <div className="ml-2 md:ml-8 mr-2 flex flex-col justify-start">
          <p className="text-xs">{title}</p>
        </div>
      ) : eventId === "raidwar-skill" ? (
        <RaidwarSkillResultSummaryDiv
          resultSummary={resultSummary as RaidwarSkillResult}
        />
      ) : eventId === "divrace-stage" ? (
        <DivraceStageResultSummaryDiv
          data={data as DivraceStageData}
          resultSummary={resultSummary as DivraceStageResult}
        />
      ) : (
        <></>
      )}
    </>
  );
}

function SavedDataPerEventDiv({
  eventId,
  savedDataSummary,
}: {
  eventId: string;
  savedDataSummary: OriginSavedDataSummary;
}) {
  return (
    <>
      {eventId === "divrace-stage" && (
        <DivraceStageSavedDataDiv
          savedDataSummary={savedDataSummary as DivraceStageSavedDataSummary}
        />
      )}
    </>
  );
}
