import { useId, useRef, useState } from "react";
import Link from "next/link";
import ThemeControllerMenu from "@/components/ThemeControllerMenu";
import MenuIcon from "@mui/icons-material/Menu";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import SaveIcon from "@mui/icons-material/Save";

import {
  OriginSavedDataSummary,
  OriginLocalStorageData,
} from "@/features/decksim/hooks/useLocalStorageData";

import { MAX_SAVE_DATA_NUM } from "@/features/decksim/global-config";
import { EventId } from "@/features/decksim/data/eventData";
import { RaidwarSkillResultSummaryDiv } from "@/features/decksim/components/RaidwarSkillSimulator";
import { RaidwarSkillResult } from "@/features/decksim/hooks/useRaidwarSkillData";
import {
  DivraceStageResultSummaryDiv,
  DivraceStageSavedDataDiv,
} from "@/features/decksim/components/DivraceStageSimulator";
import {
  DivraceStageData,
  DivraceStageResult,
  DivraceStageSavedDataSummary,
} from "@/features/decksim/hooks/useDivraceStageData";
import {
  DeckSimulatorResultSummaryDiv,
  DeckSimulatorSavedDataDiv,
} from "@/features/decksim/components/DeckSimulator";
import { DeckSimulatorResult } from "@/features/decksim/type-definitions/DeckSimulatorResult";
import { DeckSimulatorSavedDataSummary } from "@/features/decksim/type-definitions/DeckSimulatorSavedDataSummary";

import { UpdateHistory } from "@/features/decksim/components/UpdateHistory";

interface HeaderProps<T, U, V> {
  eventId: EventId;
  title: string;
  isFixHeader: boolean;
  data: T;
  resultSummary: U;
  savedDataSummaries: V[];
  currentDataNum?: number;
  handleFixHeader: () => void;
  handleLoadData: (newData: T) => void;
  handleChangeMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleClickIndividualSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setCurrentDataNum?: React.Dispatch<React.SetStateAction<number>>;
  headerHeight?: string;
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
  currentDataNum,
  handleFixHeader,
  handleLoadData,
  handleChangeMemo,
  handleClickIndividualSave,
  setCurrentDataNum,
  headerHeight = "h-[52px]",
}: HeaderProps<T, U, V>) {
  const [modalOpen, setModalOpen] = useState(false);
  const position = isFixHeader ? "sticky top-0" : "static";

  const handleClickThemeMenu = () => {
    const nextData = structuredClone(data);
    setTimeout(() => handleLoadData(nextData), 100);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <header
      className={`bg-base-200 rounded-b-box flex ${headerHeight} z-[2] ${position}`}
    >
      <LoadButton<T, V, W>
        eventId={eventId}
        handleLoadData={handleLoadData}
        savedDataSummaries={savedDataSummaries}
        handleChangeMemo={handleChangeMemo}
        setCurrentDataNum={setCurrentDataNum}
      />
      <SaveButton<V>
        eventId={eventId}
        savedDataSummaries={savedDataSummaries}
        handleChangeMemo={handleChangeMemo}
        handleClickIndividualSave={handleClickIndividualSave}
      />
      <ResultSummaryDiv<T, U, V>
        eventId={eventId}
        title={title}
        data={data}
        resultSummary={resultSummary}
        savedDataSummaries={savedDataSummaries}
        currentDataNum={currentDataNum}
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
          <li onClick={() => setModalOpen(true)}>
            <p>更新履歴を表示する</p>
          </li>
          <li>
            <Link href="/decksim/">1つ前のページに戻る</Link>
          </li>
        </ul>
      </div>
      {modalOpen && <UpdateHistory handleCloseModal={handleCloseModal} />}
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
  setCurrentDataNum,
}: {
  eventId: EventId;
  handleLoadData: (newData: T) => void;
  savedDataSummaries: U[];
  handleChangeMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setCurrentDataNum?: React.Dispatch<React.SetStateAction<number>>;
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

        // センバツシミュレーターの場合は setCurrentDataNum で現在のデータ番号を更新する
        if (setCurrentDataNum) setCurrentDataNum(Number(num));

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
        className="flex flex-col justify-center items-center ml-4 md:ml-6"
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
                <div className="flex flex-col gap-1 pt-2 pl-0 sm:pl-2 md:pl-4">
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
  eventId: EventId;
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
        className="flex flex-col justify-center items-center ml-4 md:ml-6"
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
                <div className="flex flex-col gap-1 pt-2 pl-0 sm:pl-2 md:pl-4">
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

function ResultSummaryDiv<T, U extends ResultSummary, V>({
  eventId,
  title,
  data,
  resultSummary,
  savedDataSummaries,
  currentDataNum,
}: {
  eventId: EventId;
  title: string;
  data: T;
  resultSummary: U;
  savedDataSummaries: V[];
  currentDataNum?: number;
}) {
  return (
    <>
      {resultSummary.initCondition ? (
        <div className="ml-4 md:ml-8 mr-2 flex flex-col justify-start">
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
      ) : [
          "raid-first",
          "raid-second",
          "raid-mega",
          "raidwar",
          "clubcup",
          "championship",
          "championship-defense",
          "tower",
          "divrace",
          "board",
          "normal-battle",
        ].includes(eventId) ? (
        <DeckSimulatorResultSummaryDiv
          eventId={eventId}
          resultSummary={resultSummary as DeckSimulatorResult}
          savedDataSummaries={
            savedDataSummaries as DeckSimulatorSavedDataSummary[]
          }
          currentDataNum={currentDataNum}
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
  eventId: EventId;
  savedDataSummary: OriginSavedDataSummary;
}) {
  return (
    <>
      {eventId === "divrace-stage" && (
        <DivraceStageSavedDataDiv
          savedDataSummary={savedDataSummary as DivraceStageSavedDataSummary}
        />
      )}
      {[
        "raid-first",
        "raid-second",
        "raid-mega",
        "raidwar",
        "clubcup",
        "championship",
        "championship-defense",
        "tower",
        "divrace",
        "board",
        "normal-battle",
      ].includes(eventId) && (
        <DeckSimulatorSavedDataDiv
          eventId={eventId}
          savedDataSummary={savedDataSummary as DeckSimulatorSavedDataSummary}
        />
      )}
    </>
  );
}
