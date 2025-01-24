import { useId, useRef, useState } from "react";
import Link from "next/link";
import ThemeControllerMenu from "@/components/common/ThemeControllerMenu";
import MenuIcon from "@mui/icons-material/Menu";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import SaveIcon from "@mui/icons-material/Save";

import {
  RaidwarSkillData,
  RaidwarSkillResultSummary,
} from "@/components/decksim/simulator/useRaidwarSkillData";
import { MAX_SAVE_DATA_NUM } from "@/components/decksim/simulator/globalConfig";
import {
  SavedDataSummary,
  LocalStorageData,
} from "@/components/decksim/simulator/useLocalStorageData";
import { EVENT_ID_TO_NAME_DICT } from "@/components/decksim/data/eventData";

interface HeaderProps {
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
  title: string;
  isFixHeader: boolean;
  data: RaidwarSkillData;
  resultSummary: RaidwarSkillResultSummary;
  savedDataSummaries: SavedDataSummary[];
  onChangeFixHeader: () => void;
  onLoadData: (newData: RaidwarSkillData) => void;
  handleSaveDataSummaries: (
    index: number,
    key: keyof SavedDataSummary,
    value: string
  ) => void;
  handleChangeMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function SimulatorHeader({
  eventId,
  title,
  isFixHeader,
  data,
  resultSummary,
  savedDataSummaries,
  onChangeFixHeader,
  onLoadData,
  handleSaveDataSummaries,
  handleChangeMemo,
}: HeaderProps) {
  const position = isFixHeader ? "sticky top-0" : "static";

  const handleClickThemeMenu = () => {
    const nextData = structuredClone(data);
    setTimeout(() => onLoadData(nextData), 100);
  };

  return (
    <header
      className={`bg-base-200 rounded-b-box flex h-[52px] z-[2] ${position}`}
    >
      <LoadButton
        eventId={eventId}
        onLoadData={onLoadData}
        savedDataSummaries={savedDataSummaries}
        handleChangeMemo={handleChangeMemo}
      />
      <SaveButton
        eventId={eventId}
        data={data}
        savedDataSummaries={savedDataSummaries}
        handleSaveDataSummaries={handleSaveDataSummaries}
        handleChangeMemo={handleChangeMemo}
      />
      <ResultSummaryDiv
        eventId={eventId}
        title={title}
        resultSummary={resultSummary}
      />
      <div className="ml-auto" />
      <div className="dropdown dropdown-end mr-4 my-auto">
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
              <p onClick={onChangeFixHeader}>ヘッダー表示切替 [固定]</p>
            ) : (
              <p onClick={onChangeFixHeader}>ヘッダー表示切替 [通常]</p>
            )}
          </li>
          <li onClick={handleClickThemeMenu}>
            <ThemeControllerMenu />
          </li>
          <li>
            <Link href="../">1つ前のページに戻る</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

function LoadButton({
  eventId,
  onLoadData,
  savedDataSummaries,
  handleChangeMemo,
}: {
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
  onLoadData: (newData: RaidwarSkillData) => void;
  savedDataSummaries: SavedDataSummary[];
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
        const parsedData = JSON.parse(loadData) as LocalStorageData;

        // 旧バージョンのデータは無視する
        if (parsedData.version !== 2) return;

        onLoadData(parsedData.data);

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
                  >
                    これを開く
                  </button>
                </div>
                <div className="flex flex-col gap-1 pt-2 pl-2 md:pl-4">
                  <div>保存日時：{savedDataSummaries[i].lastUpdate}</div>
                  <div className="flex flex-row gap-2">
                    <p className="whitespace-nowrap">メモ：</p>
                    <textarea
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

function SaveButton({
  eventId,
  data,
  savedDataSummaries,
  handleSaveDataSummaries,
  handleChangeMemo,
}: {
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
  data: RaidwarSkillData;
  savedDataSummaries: SavedDataSummary[];
  handleSaveDataSummaries: (
    index: number,
    key: keyof SavedDataSummary,
    value: string
  ) => void;
  handleChangeMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const modalId = useId();
  const handleClickSaveButton = () => {
    const dialogElement = document.getElementById(
      modalId
    ) as HTMLDialogElement | null;
    dialogElement?.showModal();
  };
  const handleClickIndividualSave = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const num = e.currentTarget.dataset.num;
    if (window.localStorage) {
      const key = `deck-${eventId}-${num}`;
      const currentDate = new Date();
      const dateStr =
        String(currentDate.getFullYear()) +
        "-" +
        String(currentDate.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(currentDate.getDate()).padStart(2, "0") +
        " " +
        String(currentDate.getHours()).padStart(2, "0") +
        ":" +
        String(currentDate.getMinutes()).padStart(2, "0") +
        ":" +
        String(currentDate.getSeconds()).padStart(2, "0");
      const convertData = JSON.stringify(
        {
          lastUpdate: dateStr,
          memo: savedDataSummaries[Number(num) - 1].memo,
          data: data,
          version: 2,
        },
        undefined,
        1
      );
      localStorage.setItem(key, convertData);
      handleSaveDataSummaries(Number(num) - 1, "lastUpdate", dateStr);
    }
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
                <div className="flex flex-col gap-1 pt-2 pl-2 md:pl-4">
                  <div>保存日時：{savedDataSummaries[i].lastUpdate}</div>
                  <div className="flex flex-row gap-2">
                    <p className="whitespace-nowrap">メモ：</p>
                    <textarea
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

function ResultSummaryDiv({
  eventId,
  title,
  resultSummary,
}: {
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
  title: string;
  resultSummary: RaidwarSkillResultSummary;
}) {
  const [startPage, setStartPage] = useState<number>(0);

  const isInitDisplay =
    Object.keys(resultSummary.summaries).length === 0 ? true : false;

  const chunks: string[][] = [];
  const maxPageNum: number = Math.ceil(
    Object.keys(resultSummary.summaries).length / 3
  );
  for (let page = startPage; page < maxPageNum; page++) {
    chunks[page - startPage] = [];
    for (let i = 0; i < 3; i++) {
      if (resultSummary.summaries[page * 3 + i])
        chunks[page - startPage].push(resultSummary.summaries[page * 3 + i]);
    }
  }

  const handleClickResultDiv = () => {
    let addPageNum = 1;
    const width = window.innerWidth;
    if (width >= 1536) {
      addPageNum = 5;
    } else if (width >= 1280) {
      addPageNum = 4;
    } else if (width >= 1024) {
      addPageNum = 3;
    } else if (width >= 768) {
      addPageNum = 2;
    }

    let nextPage = startPage + addPageNum;
    if (nextPage >= maxPageNum) {
      nextPage = 0;
    } else if (nextPage >= 10) {
      // 長すぎても意味がないので10ページまでにする
      nextPage = 0;
    }

    setStartPage(nextPage);
  };

  return (
    <>
      {isInitDisplay ? (
        <div className="ml-4 md:ml-8 mr-4 flex flex-col justify-start">
          <p className="text-xs">{title}</p>
        </div>
      ) : eventId === "raidwar-skill" ? (
        <RaidwarSkillResultSummaryChild
          chunks={chunks}
          startPage={startPage}
          handleClickResultDiv={handleClickResultDiv}
        />
      ) : (
        <></>
      )}
    </>
  );
}

function RaidwarSkillResultSummaryChild({
  chunks,
  startPage,
  handleClickResultDiv,
}: {
  chunks: string[][];
  startPage: number;
  handleClickResultDiv: () => void;
}) {
  return (
    <div
      className="ml-4 md:ml-8 mr-4 flex flex-col justify-start"
      role="button"
      onClick={handleClickResultDiv}
    >
      <div className="flex flex-row gap-8">
        {chunks[0] && (
          <div>
            {chunks[0].map((v, i) => (
              <p key={i} className="text-xs">
                アタック
                <span className="inline-block w-4 text-right">
                  {startPage * 3 + i + 1}
                </span>
                回目 ダメージ声援:{" "}
                <span className="inline-block w-8 text-right">{v}</span> %
              </p>
            ))}
          </div>
        )}
        {chunks[1] && (
          <div className="max-md:hidden">
            {chunks[1].map((v, i) => (
              <p key={i} className="text-xs">
                アタック
                <span className="inline-block w-4 text-right">
                  {startPage * 3 + i + 4}
                </span>
                回目 ダメージ声援:{" "}
                <span className="inline-block w-8 text-right">{v}</span> %
              </p>
            ))}
          </div>
        )}
        {chunks[2] && (
          <div className="max-lg:hidden">
            {chunks[2].map((v, i) => (
              <p key={i} className="text-xs">
                アタック
                <span className="inline-block w-4 text-right">
                  {startPage * 3 + i + 7}
                </span>
                回目 ダメージ声援:{" "}
                <span className="inline-block w-8 text-right">{v}</span> %
              </p>
            ))}
          </div>
        )}
        {chunks[3] && (
          <div className="max-xl:hidden">
            {chunks[3].map((v, i) => (
              <p key={i} className="text-xs">
                アタック
                <span className="inline-block w-4 text-right">
                  {startPage * 3 + i + 10}
                </span>
                回目 ダメージ声援:{" "}
                <span className="inline-block w-8 text-right">{v}</span> %
              </p>
            ))}
          </div>
        )}
        {chunks[4] && (
          <div className="max-2xl:hidden">
            {chunks[4].map((v, i) => (
              <p key={i} className="text-xs">
                アタック
                <span className="inline-block w-4 text-right">
                  {startPage * 3 + i + 13}
                </span>
                回目 ダメージ声援:{" "}
                <span className="inline-block w-8 text-right">{v}</span> %
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
