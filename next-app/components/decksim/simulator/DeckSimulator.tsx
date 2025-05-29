"use client";

import React, { useState, useRef, useCallback } from "react";

import {
  DeckSimulatorEventId,
  EVENT_ID_TO_NAME_DICT,
} from "@/components/decksim/data/eventData";

import TextWithTooltip from "@/components/common/TextWithTooltip";
import { formatNumber } from "@/lib/formatNumber";

import SimulatorHeader from "@/components/decksim/simulator/SimulatorHeader";
import {
  useDeckSimulatorData,
  DeckSimulatorLocalStorageData,
  initDeckSimulatorSavedDataSummary,
} from "@/components/decksim/simulator/hook/useDeckSimulatorData";
import { DeckSimulatorData } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { DeckSimulatorResult } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorResult";
import { DeckSimulatorSavedDataSummary } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorSavedDataSummary";
import { useLocalStorageData } from "@/components/decksim/simulator/hook/useLocalStorageData";

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
  eventId: DeckSimulatorEventId;
}) {
  const simulatorTabButtonRef = useRef(null);
  const {
    data,
    commonData,
    resultSummary,
    loadCondition,
    handleChangeParameters,
    handleBlurParameters,
    handleLoadData,
    handleImportRawData,
    setValueAtPath,
    handleLoadCondition,
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
  const [currentDataNum, setCurrentDataNum] = useState<number>(0);

  /* 保存ボタンクリック時にローカルストレージ上の該当番号のデータを更新するとともに、
     内部で持つセーブデータサマリーを更新する。 */
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

      const result = resultSummary as DeckSimulatorResult;
      const attackMin = result.summaries.totalPerformance?.attack?.minPower ?? 0;
      const attackExp = result.summaries.totalPerformance?.attack?.expPower ?? 0;
      const attackMax = result.summaries.totalPerformance?.attack?.maxPower ?? 0;
      const attackSkillEffect = result.summaries.totalPerformance?.attack?.skillEffect ?? 0;
      const defenseMin = result.summaries.totalPerformance?.defense?.minPower ?? 0;
      const defenseExp = result.summaries.totalPerformance?.defense?.expPower ?? 0;
      const defenseMax = result.summaries.totalPerformance?.defense?.maxPower ?? 0;
      // const defenseSkillEffect = result.summaries.totalPerformance.defense.skillEffect ?? 0;

      let totalMin = 0;
      let totalExp = 0;
      let totalMax = 0;
      if (eventId === "raid-second") {
        totalMin = attackMin + defenseMin;
        totalExp = attackExp + defenseExp;
        totalMax = attackMax + defenseMax;
      } else if (eventId === "championship-defense") {
        totalMin = defenseMin;
        totalExp = defenseExp;
        totalMax = defenseMax;
      } else {
        totalMin = attackMin;
        totalExp = attackExp;
        totalMax = attackMax;
      }
      const isConvertPoint =
        result.summaries.totalPerformance.isConvertPoint ?? false;

      const tempData = {
        lastUpdate: dateStr,
        memo: savedDataSummaries[Number(num) - 1].memo,
        version: 2,
        data: data,
        powerMin: totalMin,
        powerExp: totalExp,
        powerMax: totalMax,
        skillEffect: attackSkillEffect,
        isConvertPoint: isConvertPoint,
      };
      const convertData = JSON.stringify(tempData);
      localStorage.setItem(key, convertData);
      handleSaveDataSummaries(Number(num) - 1, "lastUpdate", dateStr);
      handleSaveDataSummaries(Number(num) - 1, "powerMin", totalMin);
      handleSaveDataSummaries(Number(num) - 1, "powerExp", totalExp);
      handleSaveDataSummaries(Number(num) - 1, "powerMax", totalMax);
      handleSaveDataSummaries(Number(num) - 1, "skillEffect", attackSkillEffect);
      handleSaveDataSummaries(
        Number(num) - 1,
        "isConvertPoint",
        isConvertPoint
      );
      setCurrentDataNum(Number(num));
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
        currentDataNum={currentDataNum}
        handleFixHeader={handleFixHeader}
        handleLoadData={handleLoadData}
        handleChangeMemo={handleChangeMemo}
        handleClickIndividualSave={handleClickIndividualSave}
        setCurrentDataNum={setCurrentDataNum}
        headerHeight={eventId === "clubcup" ? "h-[84px]" : "h-[68px]"}
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
                      summary={resultSummary}
                      eventId={eventId}
                      type={
                        eventId !== "championship-defense" ? "攻援" : "守援"
                      }
                      setValueAtPath={setValueAtPath}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <MainSkill
                      data={data}
                      summary={resultSummary}
                      eventId={eventId}
                      type={
                        eventId !== "championship-defense" ? "攻援" : "守援"
                      }
                      setValueAtPath={setValueAtPath}
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
                      summary={resultSummary}
                      eventId={eventId}
                      type={
                        eventId !== "championship-defense" ? "攻援" : "守援"
                      }
                      setValueAtPath={setValueAtPath}
                    />
                    {eventId !== "raid-mega" && (
                      <hr className="mx-4 h-px bg-base-300 border-0" />
                    )}
                    <SubSwitch
                      data={data}
                      summary={resultSummary}
                      eventId={eventId}
                      type={
                        eventId !== "championship-defense" ? "攻援" : "守援"
                      }
                      setValueAtPath={setValueAtPath}
                    />
                    {eventId !== "raid-mega" && (
                      <hr className="mx-4 h-px bg-base-300 border-0" />
                    )}
                    <PreciousScenes
                      data={data}
                      summary={resultSummary}
                      type={
                        eventId !== "championship-defense" ? "攻援" : "守援"
                      }
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                      setValueAtPath={setValueAtPath}
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
                      summary={resultSummary}
                      eventId={eventId}
                      type="攻援"
                      setValueAtPath={setValueAtPath}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <MainSkill
                      data={data}
                      summary={resultSummary}
                      eventId={eventId}
                      type="攻援"
                      setValueAtPath={setValueAtPath}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <SubScenes
                      data={data}
                      summary={resultSummary}
                      eventId={eventId}
                      type="攻援"
                      setValueAtPath={setValueAtPath}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <SubSwitch
                      data={data}
                      summary={resultSummary}
                      eventId={eventId}
                      type="攻援"
                      setValueAtPath={setValueAtPath}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <PreciousScenes
                      data={data}
                      summary={resultSummary}
                      type="攻援"
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                      setValueAtPath={setValueAtPath}
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
                      summary={resultSummary}
                      eventId={eventId}
                      type="守援"
                      setValueAtPath={setValueAtPath}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <MainSkill
                      data={data}
                      summary={resultSummary}
                      eventId={eventId}
                      type="守援"
                      setValueAtPath={setValueAtPath}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <SubScenes
                      data={data}
                      summary={resultSummary}
                      eventId={eventId}
                      type="守援"
                      setValueAtPath={setValueAtPath}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <SubSwitch
                      data={data}
                      summary={resultSummary}
                      eventId={eventId}
                      type="守援"
                      setValueAtPath={setValueAtPath}
                    />
                    <hr className="mx-4 h-px bg-base-300 border-0" />
                    <PreciousScenes
                      data={data}
                      summary={resultSummary}
                      type="守援"
                      onChange={handleChangeParameters}
                      onBlur={handleBlurParameters}
                      setValueAtPath={setValueAtPath}
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
                  setValueAtPath={setValueAtPath}
                />
                <hr className="mx-4 h-px bg-base-300 border-0" />
                <PlayerData
                  data={commonData}
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
            eventId={eventId}
            loadCondition={loadCondition}
            handleLoadCondition={handleLoadCondition}
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
  eventId,
  loadCondition,
  handleLoadCondition,
}: {
  savedDataSummaries: DeckSimulatorSavedDataSummary[];
  handleExportData: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImportRawData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  eventId: DeckSimulatorEventId;
  loadCondition: {
    clubType: string;
    specialGirlName1: string;
    specialGirlName2: string;
  };
  handleLoadCondition: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
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
          <div className="flex flex-wrap gap-6">
            {eventId !== "tower" &&
              eventId !== "divrace" &&
              eventId !== "board" && (
                <div className="mb-6">
                  <label className="label">
                    <span className="label-text">プレイヤーの部活タイプ</span>
                  </label>
                  <select
                    name="playerClubType"
                    className="select select-sm select-bordered"
                    value={loadCondition.clubType}
                    onChange={handleLoadCondition}
                    data-property="clubType"
                  >
                    <option value="未所属">未所属</option>
                    <option value="委員会＆団体">委員会＆団体</option>
                    <option value="運動部">運動部</option>
                    <option value="運動部(個人競技)">運動部(個人競技)</option>
                    <option value="帰宅部">帰宅部</option>
                    <option value="研究会">研究会</option>
                    <option value="文化部">文化部</option>
                    <option value="文化部(音楽系)">文化部(音楽系)</option>
                    <option value="文化部(日本)">文化部(日本)</option>
                  </select>
                </div>
              )}
            {eventId === "tower" && (
              <div className="flex flex-col mb-6">
                <label className="label">
                  <span className="label-text">有利なガール</span>
                </label>
                <input
                  type="text"
                  name="specialGirlName1"
                  className="input input-sm input-bordered max-w-48 md:w-48"
                  data-property="specialGirlName1"
                  value={loadCondition.specialGirlName1}
                  onChange={handleLoadCondition}
                />
                <input
                  type="text"
                  name="specialGirlName2"
                  className="input input-sm input-bordered max-w-48 md:w-48 mt-4"
                  data-property="specialGirlName2"
                  value={loadCondition.specialGirlName2}
                  onChange={handleLoadCondition}
                />
              </div>
            )}
            {eventId === "divrace" && (
              <div className="flex flex-col mb-6">
                <label className="label">
                  <span className="label-text">予選グループガール</span>
                </label>
                <input
                  type="text"
                  name="specialGirlName1"
                  className="input input-sm input-bordered max-w-48 md:w-48"
                  data-property="specialGirlName1"
                  value={loadCondition.specialGirlName1}
                  onChange={handleLoadCondition}
                />
              </div>
            )}
          </div>
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
  eventId,
  resultSummary,
  savedDataSummaries,
  currentDataNum,
}: {
  eventId: DeckSimulatorEventId;
  resultSummary: DeckSimulatorResult;
  savedDataSummaries: DeckSimulatorSavedDataSummary[];
  currentDataNum?: number;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [displayNum, setDisplayNum] = useState<number>(0);
  const summary = resultSummary.summaries.totalPerformance;
  const savedDataSummary = currentDataNum
    ? savedDataSummaries?.[currentDataNum - 1]
    : undefined;

  const handleClickResultDiv = () => {
    setDisplayNum((v) => {
      return savedDataSummary?.lastUpdate ? (v + 1) % 2 : 0;
    });
  };

  const baseCss = displayNum === 0 ? "" : "hidden";
  const differenceCss = displayNum === 1 ? "" : "hidden";

  const isConvertPoint = summary.isConvertPoint ?? false;
  const attackMin = summary?.attack?.minPower ?? 0;
  const attackExp = summary?.attack?.expPower ?? 0;
  const attackMax = summary?.attack?.maxPower ?? 0;
  const attackSkillEffect = summary?.attack?.skillEffect ?? 0;
  const defenseMin = summary?.defense?.minPower ?? 0;
  const defenseExp = summary?.defense?.expPower ?? 0;
  const defenseMax = summary?.defense?.maxPower ?? 0;
  // const defenseSkillEffect = summary.defense.skillEffect ?? 0;

  let totalMin = 0;
  let totalExp = 0;
  let totalMax = 0;

  if (eventId === "raid-second") {
    totalMin = attackMin + defenseMin;
    totalExp = attackExp + defenseExp;
    totalMax = attackMax + defenseMax;
  } else if (eventId === "championship-defense") {
    totalMin = defenseMin;
    totalExp = defenseExp;
    totalMax = defenseMax;
  } else {
    totalMin = attackMin;
    totalExp = attackExp;
    totalMax = attackMax;
  }

  const savedIsConvertPoint = savedDataSummary?.isConvertPoint ?? undefined;
  const savedMin = savedDataSummary?.powerMin ?? 0;
  const savedExp = savedDataSummary?.powerExp ?? 0;
  const savedMax = savedDataSummary?.powerMax ?? 0;
  const savedSkillEffect = savedDataSummary?.skillEffect ?? 0;

  return (
    <div
      className="ml-4 md:ml-8 mr-2 flex flex-col justify-start"
      role="button"
      onClick={handleClickResultDiv}
    >
      <div className="flex gap-10 text-xs">
        <div className={`${baseCss} sm:block`}>
          <div className="flex flex-col">
            <div>
              <p>[計算結果]</p>
            </div>
            <div className="flex gap-2 pl-2">
              <div className="flex flex-col">
                <p>最小値：</p>
                <p>期待値：</p>
                <p>最大値：</p>
                {eventId === "clubcup" && <p>声援効果：</p>}
              </div>
              <div className="flex flex-col">
                <p className="text-right">
                  {isConvertPoint
                    ? `${formatNumber(totalMin)} pt`
                    : formatNumber(totalMin)}
                </p>
                <p className="text-right">
                  {isConvertPoint
                    ? `${formatNumber(totalExp)} pt`
                    : formatNumber(totalExp)}
                </p>
                <p className="text-right">
                  {isConvertPoint
                    ? `${formatNumber(totalMax)} pt`
                    : formatNumber(totalMax)}
                </p>
                {eventId === "clubcup" && (
                  <p className="text-right">
                    {formatNumber(attackSkillEffect, "0.0", "ja-JP", {
                      style: "decimal",
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}{" "}
                    %
                  </p>
                )}
              </div>
              {(eventId === "divrace" || eventId === "board") && (
                <>
                  <div className="hidden lg:block">
                    <div className="flex flex-col">
                      <p>最小値(×6)：</p>
                      <p>期待値(×6)：</p>
                      <p>最大値(×6)：</p>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="flex flex-col">
                      <p className="text-right">
                        {isConvertPoint
                          ? `${formatNumber(totalMin * 6)} pt`
                          : formatNumber(totalMin * 6)}
                      </p>
                      <p className="text-right">
                        {isConvertPoint
                          ? `${formatNumber(totalExp * 6)} pt`
                          : formatNumber(totalExp * 6)}
                      </p>
                      <p className="text-right">
                        {isConvertPoint
                          ? `${formatNumber(totalMax * 6)} pt`
                          : formatNumber(totalMax * 6)}
                      </p>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="flex flex-col">
                      <p>最小値(×15)：</p>
                      <p>期待値(×15)：</p>
                      <p>最大値(×15)：</p>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="flex flex-col">
                      <p className="text-right">
                        {isConvertPoint
                          ? `${formatNumber(totalMin * 15)} pt`
                          : formatNumber(totalMin * 15)}
                      </p>
                      <p className="text-right">
                        {isConvertPoint
                          ? `${formatNumber(totalExp * 15)} pt`
                          : formatNumber(totalExp * 15)}
                      </p>
                      <p className="text-right">
                        {isConvertPoint
                          ? `${formatNumber(totalMax * 15)} pt`
                          : formatNumber(totalMax * 15)}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={`${differenceCss} sm:block`}>
          {currentDataNum !== 0 && isConvertPoint === savedIsConvertPoint && (
            <div className="flex flex-col">
              <div>
                <p>{`[データ${currentDataNum}との差分]`}</p>
              </div>
              <div className="flex gap-2 pl-2">
                <div className="flex flex-col">
                  <p>最小値：</p>
                  <p>期待値：</p>
                  <p>最大値：</p>
                  {eventId === "clubcup" && <p>声援効果：</p>}
                </div>
                <div className="flex flex-col">
                  <p
                    className={`text-right ${
                      totalMin - savedMin < 0 && "text-red-700"
                    }`}
                  >
                    {totalMin - savedMin > 0 && "+"}
                    {isConvertPoint
                      ? `${formatNumber(totalMin - savedMin)} pt`
                      : formatNumber(totalMin - savedMin)}
                  </p>
                  <p
                    className={`text-right ${
                      totalExp - savedExp < 0 && "text-red-700"
                    }`}
                  >
                    {totalExp - savedExp > 0 && "+"}
                    {isConvertPoint
                      ? `${formatNumber(totalExp - savedExp)} pt`
                      : formatNumber(totalExp - savedExp)}
                  </p>
                  <p
                    className={`text-right ${
                      totalMax - savedMax < 0 && "text-red-700"
                    }`}
                  >
                    {totalMax - savedMax > 0 && "+"}
                    {isConvertPoint
                      ? `${formatNumber(totalMax - savedMax)} pt`
                      : formatNumber(totalMax - savedMax)}
                  </p>
                  {eventId === "clubcup" && (
                    <p className="text-right">
                      {attackSkillEffect - savedSkillEffect > 0 && "+"}
                      {formatNumber(
                        attackSkillEffect - savedSkillEffect,
                        "0.0",
                        "ja-JP",
                        {
                          style: "decimal",
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        }
                      )}{" "}
                      %
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DeckSimulatorSavedDataDiv({
  eventId,
  savedDataSummary,
}: {
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
  savedDataSummary: DeckSimulatorSavedDataSummary;
}) {
  const savedIsConvertPoint = savedDataSummary.isConvertPoint;
  const totalMin = formatNumber(savedDataSummary.powerMin);
  const totalExp = formatNumber(savedDataSummary.powerExp);
  const totalMax = formatNumber(savedDataSummary.powerMax);

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <div className="flex flex-col gap-1">
            <p>最小値：</p>
            <p>期待値：</p>
            <p>最大値：</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-right">
              {savedIsConvertPoint ? `${totalMin} pt` : totalMin}
            </p>
            <p className="text-right">
              {savedIsConvertPoint ? `${totalExp} pt` : totalExp}
            </p>
            <p className="text-right">
              {savedIsConvertPoint ? `${totalMax} pt` : totalMax}
            </p>
          </div>
        </div>
        {eventId === "clubcup" && (
          <p>
            声援効果：
            <span className="ml-2">{`${savedDataSummary?.skillEffect} %`}</span>
          </p>
        )}
      </div>
    </>
  );
}
