"use client";

import React, { useState, useRef, useCallback } from "react";

import { EVENT_ID_TO_NAME_DICT } from "@/components/decksim/data/eventData";

import TextWithTooltip from "@/components/common/TextWithTooltip";
import SimulatorHeader from "@/components/decksim/simulator/SimulatorHeader";
import {
  useDeckSimulatorData,
  DeckSimulatorData,
  DeckSimulatorResult,
  DeckSimulatorSavedDataSummary,
  DeckSimulatorLocalStorageData,
  initDeckSimulatorSavedDataSummary,
} from "@/components/decksim/simulator/useDeckSimulatorData";
import { useLocalStorageData } from "@/components/decksim/simulator/useLocalStorageData";

import { MainScenes } from "@/components/decksim/simulator/sections/MainScenes";
import { MainSkill } from "@/components/decksim/simulator/sections/MainSkill";
import { SubScenes } from "@/components/decksim/simulator/sections/SubScenes";
import { SubSwitch } from "@/components/decksim/simulator/sections/SubSwitch";
import { PreciousScenes } from "@/components/decksim/simulator/sections/PreciousScenes";
import { DeckBonus } from "@/components/decksim/simulator/sections/DeckBonus";
import { PetitGirls } from "@/components/decksim/simulator/sections/PetitGirls";
import { PlayerData } from "@/components/decksim/simulator/sections/PlayerData";

import { EventSpecial } from "@/components/decksim/simulator/sections/EventSpecial";
import { DeckSimulatorHowToUse } from "@/components/decksim/manual/DeckSimulatorHowToUse";

export default function DeckSimulator({
  eventId,
}: {
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
}) {
  const simulatorTabButtonRef = useRef(null);
  const {
    data,
    commonData,
    resultSummary,
    handleChangeParameters,
    handleBlurParameters,
    handleLoadData,
    handleImportRawData,
  } = useDeckSimulatorData({
    simulatorTabButtonRef: simulatorTabButtonRef,
    eventId: eventId,
  });
  const {
    savedDataSummaries,
    handleSaveDataSummaries,
    handleChangeMemo,
    handleExportData,
    handleImportData,
  } = useLocalStorageData<
    DeckSimulatorSavedDataSummary,
    DeckSimulatorLocalStorageData
  >({
    eventId: eventId,
    initSavedDataSummary: structuredClone(initDeckSimulatorSavedDataSummary),
  });

  const [isFixHeader, setIsFixHeader] = useState<boolean>(true);
  const handleFixHeader = useCallback(() => {
    setIsFixHeader((v) => !v);
  }, []);

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

      const tempData = {
        lastUpdate: dateStr,
        memo: savedDataSummaries[Number(num) - 1].memo,
        version: 2,
        data: data,
      };
      const convertData = JSON.stringify(tempData);
      localStorage.setItem(key, convertData);
      handleSaveDataSummaries(Number(num) - 1, "lastUpdate", dateStr);
    }
  };

  return (
    <>
      <SimulatorHeader<
        DeckSimulatorData,
        DeckSimulatorResult,
        DeckSimulatorSavedDataSummary,
        DeckSimulatorLocalStorageData
      >
        eventId={eventId}
        title={EVENT_ID_TO_NAME_DICT[eventId]}
        isFixHeader={isFixHeader}
        data={data}
        resultSummary={resultSummary}
        savedDataSummaries={savedDataSummaries}
        handleFixHeader={handleFixHeader}
        handleLoadData={handleLoadData}
        handleChangeMemo={handleChangeMemo}
        handleClickIndividualSave={handleClickIndividualSave}
      />
      <div className="my-2" />
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="main_menu"
          role="tab"
          className="tab whitespace-nowrap"
          aria-label="シミュレーター本体"
          defaultChecked
          ref={simulatorTabButtonRef}
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box px-1 md:px-2 pt-2 pb-4 max-w-screen"
        >
          <div role="tablist" className="tabs tabs-lifted">
            {eventId !== "raid-second" ? (
              <>
                <input
                  type="radio"
                  name="sub_menu"
                  role="tab"
                  className="tab whitespace-nowrap max-md:!ps-2 max-md:!pe-2 max-md:checked:!ps-[6px] max-md:checked:!pe-[6px]"
                  aria-label="主センバツ"
                  defaultChecked
                />
                <div
                  role="tabpanel"
                  className="tab-content bg-base-100 border-base-300 rounded-box px-1 md:px-2 py-4 max-w-screen"
                >
                  <div className="flex flex-col gap-6">
                    <MainScenes
                      data={data}
                      eventId={eventId}
                      type="攻援"
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <MainSkill
                      data={data}
                      eventId={eventId}
                      type="攻援"
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                    />
                  </div>
                </div>
                <input
                  type="radio"
                  name="sub_menu"
                  role="tab"
                  className="tab whitespace-nowrap max-md:!ps-2 max-md:!pe-2 max-md:checked:!ps-[6px] max-md:checked:!pe-[6px]"
                  aria-label="副センバツ"
                />
                <div
                  role="tabpanel"
                  className="tab-content bg-base-100 border-base-300 rounded-box px-1 md:px-2 py-4 max-w-screen"
                >
                  <div className="flex flex-col gap-6">
                    <SubScenes
                      data={data}
                      eventId={eventId}
                      type="攻援"
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <SubSwitch
                      data={data}
                      eventId={eventId}
                      type="攻援"
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <PreciousScenes
                      data={data}
                      eventId={eventId}
                      type="攻援"
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <input
                  type="radio"
                  name="sub_menu"
                  role="tab"
                  className="tab whitespace-nowrap max-md:!ps-2 max-md:!pe-2 max-md:checked:!ps-[6px] max-md:checked:!pe-[6px]"
                  aria-label="攻援センバツ"
                  defaultChecked
                />
                <div
                  role="tabpanel"
                  className="tab-content bg-base-100 border-base-300 rounded-box px-1 md:px-2 py-4 max-w-screen"
                >
                  <div className="flex flex-col gap-6">
                    <MainScenes
                      data={data}
                      eventId={eventId}
                      type="攻援"
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <MainSkill
                      data={data}
                      eventId={eventId}
                      type="攻援"
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <SubScenes
                      data={data}
                      eventId={eventId}
                      type="攻援"
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <SubSwitch
                      data={data}
                      eventId={eventId}
                      type="攻援"
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <PreciousScenes
                      data={data}
                      eventId={eventId}
                      type="攻援"
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                    />
                  </div>
                </div>
                <input
                  type="radio"
                  name="sub_menu"
                  role="tab"
                  className="tab whitespace-nowrap max-md:!ps-2 max-md:!pe-2 max-md:checked:!ps-[6px] max-md:checked:!pe-[6px]"
                  aria-label="守援センバツ"
                />
                <div
                  role="tabpanel"
                  className="tab-content bg-base-100 border-base-300 rounded-box px-1 md:px-2 py-4 max-w-screen"
                >
                  <div className="flex flex-col gap-6">
                    <MainScenes
                      data={data}
                      eventId={eventId}
                      type="守援"
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <MainSkill
                      data={data}
                      eventId={eventId}
                      type="守援"
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <SubScenes
                      data={data}
                      eventId={eventId}
                      type="守援"
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <SubSwitch
                      data={data}
                      eventId={eventId}
                      type="守援"
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <PreciousScenes
                      data={data}
                      eventId={eventId}
                      type="守援"
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                    />
                  </div>
                </div>
              </>
            )}
            <input
              type="radio"
              name="sub_menu"
              role="tab"
              className="tab whitespace-nowrap max-md:!ps-2 max-md:!pe-2 max-md:checked:!ps-[6px] max-md:checked:!pe-[6px]"
              aria-label="その他"
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box px-1 md:px-2 py-4 max-w-screen"
            >
              <div className="flex flex-col gap-6">
                <DeckBonus
                  data={data}
                  eventId={eventId}
                  onChange={handleChangeParameters}
                  _onBlur={handleBlurParameters}
                />
                {eventId !== "raid-first" &&
                  eventId !== "raid-second" &&
                  eventId !== "raid-mega" &&
                  eventId !== "raidwar" && (
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                  )}
                <PetitGirls
                  data={data}
                  eventId={eventId}
                  onChange={handleChangeParameters}
                  onBlur={handleBlurParameters}
                />
                <hr className="mx-4 h-px bg-base-300 border-0" />
                <PlayerData
                  data={commonData}
                  eventId={eventId}
                  onChange={handleChangeParameters}
                  onBlur={handleBlurParameters}
                />
              </div>
            </div>
            <input
              type="radio"
              name="sub_menu"
              role="tab"
              className="tab whitespace-nowrap max-md:!ps-2 max-md:!pe-2 max-md:checked:!ps-[6px] max-md:checked:!pe-[6px]"
              aria-label="イベント固有"
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box px-1 md:px-2 py-4 max-w-screen"
            >
              <div className="flex flex-col gap-6">
                <EventSpecial
                  data={data}
                  eventId={eventId}
                  onChange={handleChangeParameters}
                  onBlur={handleBlurParameters}
                />
              </div>
            </div>
          </div>
        </div>
        <input
          type="radio"
          name="main_menu"
          role="tab"
          className="tab whitespace-nowrap"
          aria-label="使用方法"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box px-1 py-2"
        >
          <DeckSimulatorHowToUse />
        </div>
        <input
          type="radio"
          name="main_menu"
          role="tab"
          className="tab whitespace-nowrap"
          aria-label="外部入出力"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box px-1 py-2"
        >
          <DataExportAndImport
            savedDataSummaries={savedDataSummaries}
            handleExportData={handleExportData}
            handleImportData={handleImportData}
            handleImportRawData={handleImportRawData}
          />
        </div>
      </div>
    </>
  );
}

function DataExportAndImport({
  savedDataSummaries,
  handleExportData,
  handleImportData,
  handleImportRawData,
}: {
  savedDataSummaries: DeckSimulatorSavedDataSummary[];
  handleExportData: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImportRawData: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <section className="mt-2 mb-6 px-2 md:px-4 leading-7 sm:max-w-screen-sm">
        <h2 className="text-lg font-bold">
          <TextWithTooltip
            displayText="保存データのバックアップ"
            tipText="ブラウザ内に保存したデータのバックアップファイルを取得したり、逆にバックアップファイルからブラウザ内のデータを復旧することが出来ます。"
          />
        </h2>
        <div className="pl-4 py-2">
          <h2 className="mb-4">
            バックアップファイルの取得 (ブラウザ → ローカルファイル)
          </h2>
          <div className="flex flex-row gap-4 flex-wrap px-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <button
                  key={i}
                  data-num={i + 1}
                  onClick={handleExportData}
                  className="btn btn-sm btn-secondary"
                  disabled={savedDataSummaries[i].lastUpdate ? false : true}
                >
                  データ{i + 1}
                </button>
              ))}
          </div>
          <h2 className="mt-6 mb-4">
            バックアップファイルからの復旧 (ローカルファイル → ブラウザ)
          </h2>
          <div className="flex flex-row gap-4 flex-wrap px-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <label key={i}>
                  <div role="button" className="btn btn-sm btn-primary">
                    データ{i + 1}
                  </div>
                  <input
                    type="file"
                    data-num={i + 1}
                    onChange={handleImportData}
                    accept="text/plain"
                    hidden
                  />
                </label>
              ))}
          </div>
        </div>
      </section>
      <hr className="mx-4 mt-6 mb-4 h-px bg-base-300 border-0" />
      <section className="mt-4 mb-4 px-2 md:px-4 leading-7 sm:max-w-screen-sm">
        <h2 className="text-lg font-bold">
          <TextWithTooltip
            displayText="センバツ生データのインポート"
            tipText="ゲームのセンバツ生データからのデータ抽出を試みます。UTF-8エンコード方式で保存したjson拡張子のファイルを指定します。"
          />
        </h2>
        <div className="pl-4 py-2">
          <h2 className="mb-4">
            JSONファイルからのインポート (ローカルファイル → ブラウザ)
          </h2>
          <div className="px-4">
            <label>
              <div role="button" className="btn btn-sm btn-primary">
                ファイルを選択
              </div>
              <input
                type="file"
                onChange={handleImportRawData}
                accept="application/json"
                hidden
              />
            </label>
          </div>
        </div>
      </section>
    </>
  );
}

export function DeckSimulatorResultSummaryDiv({
  resultSummary,
}: {
  resultSummary: DeckSimulatorResult;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [startPage, setStartPage] = useState<number>(0);
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
    <div
      className="ml-4 md:ml-8 mr-2 flex flex-col justify-start"
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
