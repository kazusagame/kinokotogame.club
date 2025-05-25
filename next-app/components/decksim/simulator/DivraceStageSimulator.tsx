"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next-export-optimize-images/image";

import WarningIcon from "@mui/icons-material/Warning";

import TextWithTooltip from "@/components/common/TextWithTooltip";
import SimulatorHeader from "@/components/decksim/simulator/SimulatorHeader";
import {
  useDivraceStageData,
  DivraceStageData,
  DivraceStageResult,
  DivraceStageSavedDataSummary,
  DivraceStageLocalStorageData,
  initDivraceStageSavedDataSummary,
} from "@/components/decksim/simulator/hook/useDivraceStageData";
import { useLocalStorageData } from "@/components/decksim/simulator/hook/useLocalStorageData";

import {
  baseStageData,
  challengeStageData,
} from "@/components/decksim/data/divraceStageData";

export default function DivraceStageSimulator() {
  const simulatorTabButtonRef = useRef(null);
  const {
    data,
    resultSummary,
    handleChangeParameters,
    handleBlurParameters,
    handleAimCountRewardDict,
    handleLoadData,
  } = useDivraceStageData({ simulatorTabButtonRef: simulatorTabButtonRef });
  const {
    savedDataSummaries,
    handleSaveDataSummaries,
    handleChangeMemo,
    handleExportData,
    handleImportData,
  } = useLocalStorageData<
    DivraceStageSavedDataSummary,
    DivraceStageLocalStorageData
  >({
    eventId: "divrace-stage",
    initSavedDataSummary: structuredClone(initDivraceStageSavedDataSummary),
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
      const key = `deck-divrace-stage-${num}`;
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

      const result = resultSummary as DivraceStageResult;
      const totalPoint =
        result.summaries.base.totalPoint +
        result.summaries.challenge.totalPoint;
      const totalCandy =
        result.summaries.base.totalCandy +
        result.summaries.challenge.totalCandy;
      const totalNormal =
        result.summaries.base.totalNormal +
        result.summaries.challenge.totalNormal;
      const totalSpecial =
        result.summaries.base.totalSpecial +
        result.summaries.challenge.totalSpecial;
      const tempData: DivraceStageLocalStorageData = {
        lastUpdate: dateStr,
        memo: savedDataSummaries[Number(num) - 1].memo,
        version: 2,
        data: data as DivraceStageData,
        totalPoint: totalPoint,
        totalCandy: totalCandy,
        totalNormal: totalNormal,
        totalSpecial: totalSpecial,
      };
      const convertData = JSON.stringify(tempData);
      localStorage.setItem(key, convertData);
      handleSaveDataSummaries(Number(num) - 1, "lastUpdate", dateStr);
      handleSaveDataSummaries(Number(num) - 1, "totalPoint", totalPoint);
      handleSaveDataSummaries(Number(num) - 1, "totalCandy", totalCandy);
      handleSaveDataSummaries(Number(num) - 1, "totalNormal", totalNormal);
      handleSaveDataSummaries(Number(num) - 1, "totalSpecial", totalSpecial);
    }
  };

  return (
    <>
      <SimulatorHeader<
        DivraceStageData,
        DivraceStageResult,
        DivraceStageSavedDataSummary,
        DivraceStageLocalStorageData
      >
        eventId="divrace-stage"
        title="全国高校生課外活動コンテスト本選 ステージシミュ"
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
          aria-label="ベース"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box px-1 md:px-2 py-4"
        >
          <div className="flex flex-col xl:flex-row gap-4">
            <section>
              <CandyDamage
                data={data}
                onChangeParameters={handleChangeParameters}
                onBlurParameters={handleBlurParameters}
                stageType="base"
              />
              <div className="my-6" />
              <PatternSelect
                data={data}
                onChangeParameters={handleChangeParameters}
                stageType="base"
              />
              <div className="my-6" />
              <StageTable
                data={data}
                resultSummary={resultSummary}
                onChangeParameters={handleChangeParameters}
                onBlurParameters={handleBlurParameters}
                onChangeAimCountReward={handleAimCountRewardDict}
                stageType="base"
              />
            </section>
          </div>
        </div>
        <input
          type="radio"
          name="main_menu"
          role="tab"
          className="tab whitespace-nowrap"
          aria-label="チャレンジ"
          defaultChecked
          ref={simulatorTabButtonRef}
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box px-1 md:px-2 py-4"
        >
          <div className="flex flex-col xl:flex-row gap-4">
            <section>
              <CandyDamage
                data={data}
                onChangeParameters={handleChangeParameters}
                onBlurParameters={handleBlurParameters}
                stageType="challenge"
              />
              <div className="my-6" />
              <PatternSelect
                data={data}
                onChangeParameters={handleChangeParameters}
                stageType="challenge"
              />
              <div className="my-6" />
              <StageTable
                data={data}
                resultSummary={resultSummary}
                onChangeParameters={handleChangeParameters}
                onBlurParameters={handleBlurParameters}
                onChangeAimCountReward={handleAimCountRewardDict}
                stageType="challenge"
              />
            </section>
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
          <HowToUse />
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
          />
        </div>
      </div>
    </>
  );
}

function CandyDamage({
  data,
  onChangeParameters,
  onBlurParameters,
  stageType,
}: {
  data: DivraceStageData;
  onChangeParameters: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurParameters: (e: React.FocusEvent<HTMLInputElement>) => void;
  stageType: "base" | "challenge";
}) {
  return (
    <div>
      <h2 className="text-lg font-bold ml-1">
        <TextWithTooltip
          displayText="ハート1個分のダメージ量"
          tipText="飴1個使用時などのハート1個分相当のダメージ量を入力します。シミュレーターを使用して算出した期待値でもゲーム内で実測した平均値でも構いません。ベースステージとチャレンジステージとで風向きアイテムの効果量に若干の違いがあることには少し注意が必要です。"
        />
      </h2>
      <input
        type="text"
        inputMode="numeric"
        name="candyDamage"
        className="input input-md input-bordered max-w-32 md:w-32 text-right mt-2 ml-4"
        data-stage-name={stageType}
        data-key-name="candyDamage"
        value={data[stageType].candyDamage.toLocaleString("ja-JP", {
          style: "decimal",
          useGrouping: true,
        })}
        onChange={onChangeParameters}
        onBlur={onBlurParameters}
      />
    </div>
  );
}

function PatternSelect({
  data,
  onChangeParameters,
  stageType,
}: {
  data: DivraceStageData;
  onChangeParameters: (e: React.ChangeEvent<HTMLInputElement>) => void;
  stageType: "base" | "challenge";
}) {
  return (
    <div>
      <h2 className="text-lg font-bold ml-1">
        <TextWithTooltip
          displayText="サポートパターン選択"
          tipText="熱中炭酸の使用傾向を選択します。"
        />
      </h2>
      <label className="label cursor-pointer justify-start">
        <input
          type="radio"
          name={`patternSelect${stageType}`}
          className="radio"
          data-stage-name={stageType}
          data-key-name="patternSelect"
          value="useSpecialALot"
          checked={data[stageType].patternSelect === "useSpecialALot"}
          onChange={onChangeParameters}
        />
        <span className="label-text ml-2">
          <TextWithTooltip
            displayText="熱中炭酸を大量に使用する"
            tipText="サポート回数ごぼうびを狙わない場合でも積極的に熱中炭酸を使用します。HPの端数処理でもハート10個分を超える場合には熱中炭酸を使用します。"
            iconSize="small"
          />
        </span>
      </label>
      <label className="label cursor-pointer justify-start">
        <input
          type="radio"
          name={`patternSelect${stageType}`}
          className="radio"
          data-stage-name={stageType}
          data-key-name="patternSelect"
          value="useSpecialALittle"
          checked={data[stageType].patternSelect === "useSpecialALittle"}
          onChange={onChangeParameters}
        />
        <span className="label-text ml-2">
          <TextWithTooltip
            displayText="熱中炭酸を必要最小限に使用する"
            tipText="サポート回数ごぼうびを狙う場合にのみ可能な限り少量の熱中炭酸を使用します。回数ごぼうびを狙わない場合は熱中炭酸を使用しません。HPの端数処理ではハート4個分を超える場合に元気炭酸を使用します。"
            iconSize="small"
          />
        </span>
      </label>
      <label className="label cursor-pointer justify-start">
        <input
          type="radio"
          name={`patternSelect${stageType}`}
          className="radio"
          data-stage-name={stageType}
          data-key-name="patternSelect"
          value="doNotUseSpecial"
          checked={data[stageType].patternSelect === "doNotUseSpecial"}
          onChange={onChangeParameters}
        />
        <span className="label-text ml-2">
          <TextWithTooltip
            displayText="熱中炭酸を使用しない"
            tipText="熱中炭酸を一切使用しません。HPの端数処理ではハート4個分を超える場合に元気炭酸を使用します。"
            iconSize="small"
          />
        </span>
      </label>
    </div>
  );
}

function StageTable({
  data,
  resultSummary,
  onChangeParameters,
  onBlurParameters,
  onChangeAimCountReward,
  stageType,
}: {
  data: DivraceStageData;
  resultSummary: DivraceStageResult;
  onChangeParameters: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurParameters: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChangeAimCountReward: (e: React.ChangeEvent<HTMLInputElement>) => void;
  stageType: "base" | "challenge";
}) {
  const stageData = stageType === "base" ? baseStageData : challengeStageData;
  const summary = resultSummary.summaries;

  return (
    <div>
      <h2 className="text-lg font-bold ml-1">
        <TextWithTooltip
          displayText="ステージ表"
          tipText="どのLvまでクリアするかや、各Lvでサポート回数制限ごぼうびを狙うかどうかを選択します。選択に基づいたサポートの推奨パターンの計算結果なども表示されます。"
        />
      </h2>
      <div className="mt-2 overflow-x-scroll w-[calc(100dvw-30px)] sm:w-[610px] md:w-[730px] lg:w-auto">
        <table className="table table-xs w-auto mb-2">
          <thead className="whitespace-normal">
            <tr className="odd:bg-base-300 even:bg-base-200">
              <th className="text-center">Lv</th>
              <th className="text-center">ここまでクリアする</th>
              <th className="text-center">クリア回数</th>
              <th className="text-center">サポート回数ごほうびを狙う</th>
              <th className="text-center">飴</th>
              <th className="text-center">元気炭酸</th>
              <th className="text-center">熱中炭酸</th>
              <th className="text-center">合計ダメージ量</th>
              <th className="text-center">HP</th>
              {stageType === "challenge" && (
                <>
                  <th className="text-center">クリアごほうび</th>
                  <th className="text-center">サポート回数ごほうび</th>
                </>
              )}
              {stageType === "base" && (
                <>
                  <th className="text-center">クリア信頼度</th>
                  <th className="text-center">サポート回数信頼度</th>
                </>
              )}
              <th className="text-center">回数制限値</th>
              {stageType === "challenge" && (
                <>
                  <th className="text-center">必要信頼度</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {Array(31)
              .fill(0)
              .map((_, i) => (
                <tr key={i} className="odd:bg-base-200 even:bg-base-300">
                  <td className="text-center">{i + 1}</td>
                  <td className="text-center">
                    <input
                      type="radio"
                      name={`clearStageLevel${stageType}`}
                      className="radio bg-base-100"
                      data-stage-name={stageType}
                      data-key-name="clearStageLevel"
                      value={i + 1}
                      checked={data[stageType].clearStageLevel === i + 1}
                      onChange={onChangeParameters}
                    />
                  </td>
                  <td className="text-center">
                    {i !== 30 ? (
                      <span>―</span>
                    ) : (
                      <input
                        type="text"
                        name={`clearStageCount${i + 1}`}
                        inputMode="numeric"
                        className="input input-xs input-bordered max-w-16 md:w-16 text-right"
                        data-stage-name={stageType}
                        data-key-name="endlessStageCount"
                        value={data[stageType].endlessStageCount.toLocaleString(
                          "ja-JP",
                          {
                            style: "decimal",
                            useGrouping: true,
                          }
                        )}
                        onChange={onChangeParameters}
                        onBlur={onBlurParameters}
                        disabled={data[stageType].clearStageLevel !== 31}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      name={`aimCountRewardDict${i + 1}`}
                      className="checkbox bg-base-100"
                      data-stage-name={stageType}
                      data-key-name="aimCountRewardDict"
                      data-stage-num={i + 1}
                      checked={
                        data[stageType].aimCountRewardDict[i + 1] === true
                      }
                      onChange={onChangeAimCountReward}
                      disabled={i + 1 > data[stageType].clearStageLevel}
                    />
                  </td>
                  {i + 1 > data[stageType].clearStageLevel ? (
                    <>
                      <td className="text-right bg-invalid">-</td>
                      <td className="text-right bg-invalid">-</td>
                      <td className="text-right bg-invalid">-</td>
                      <td className="text-right bg-invalid">-</td>
                    </>
                  ) : (
                    <>
                      <td className="text-right">
                        {summary[stageType][i + 1].candyNum.toLocaleString(
                          "ja-JP",
                          {
                            style: "decimal",
                            useGrouping: true,
                          }
                        )}
                      </td>
                      <td className="text-right">
                        {summary[stageType][i + 1].normalNum.toLocaleString(
                          "ja-JP",
                          {
                            style: "decimal",
                            useGrouping: true,
                          }
                        )}
                      </td>
                      <td className="text-right">
                        {summary[stageType][i + 1].specialNum.toLocaleString(
                          "ja-JP",
                          {
                            style: "decimal",
                            useGrouping: true,
                          }
                        )}
                      </td>
                      {summary[stageType][i + 1].totalDamage <
                      stageData[i].hp ? (
                        <td className="text-right bg-warning text-warning-content relative pl-8">
                          <WarningIcon
                            style={{
                              position: "absolute",
                              left: "5px",
                              top: "calc(50% - 12px)",
                            }}
                          />
                          {summary[stageType][i + 1].totalDamage.toLocaleString(
                            "ja-JP",
                            {
                              style: "decimal",
                              useGrouping: true,
                            }
                          )}
                        </td>
                      ) : (
                        <td className="text-right">
                          {summary[stageType][i + 1].totalDamage.toLocaleString(
                            "ja-JP",
                            {
                              style: "decimal",
                              useGrouping: true,
                            }
                          )}
                        </td>
                      )}
                    </>
                  )}
                  <td className="text-right">
                    {stageData[i].hp.toLocaleString("ja-JP", {
                      style: "decimal",
                      useGrouping: true,
                    })}
                  </td>
                  {stageType === "challenge" && (
                    <>
                      <td className="text-left">
                        {challengeStageData[i].rewardA
                          .split("\n")
                          .map((v, i) => (
                            <p key={i}>{v}</p>
                          ))}
                      </td>
                      <td className="text-left">
                        {challengeStageData[i].rewardB
                          .split("\n")
                          .map((v, i) => (
                            <p key={i}>{v}</p>
                          ))}
                      </td>
                    </>
                  )}
                  {stageType === "base" && (
                    <>
                      <td className="text-right">{baseStageData[i].trustA}</td>
                      <td className="text-right">{baseStageData[i].trustB}</td>
                    </>
                  )}
                  <td className="text-center">{stageData[i].count}</td>
                  {stageType === "challenge" && (
                    <>
                      <td className="text-center">
                        {challengeStageData[i].trust.toLocaleString("ja-JP", {
                          style: "decimal",
                          useGrouping: true,
                        })}
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
          <thead className="whitespace-normal">
            <tr className="odd:bg-base-300 even:bg-base-200">
              <th className="text-center">Lv</th>
              <th className="text-center">ここまでクリアする</th>
              <th className="text-center">クリア回数</th>
              <th className="text-center">サポート回数ごほうびを狙う</th>
              <th className="text-center">飴</th>
              <th className="text-center">元気炭酸</th>
              <th className="text-center">熱中炭酸</th>
              <th className="text-center">合計ダメージ量</th>
              <th className="text-center">HP</th>
              {stageType === "challenge" && (
                <>
                  <th className="text-center">クリアごほうび</th>
                  <th className="text-center">サポート回数ごほうび</th>
                </>
              )}
              {stageType === "base" && (
                <>
                  <th className="text-center">クリア信頼度</th>
                  <th className="text-center">サポート回数信頼度</th>
                </>
              )}
              <th className="text-center">回数制限値</th>
              {stageType === "challenge" && (
                <>
                  <th className="text-center">必要信頼度</th>
                </>
              )}
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

function HowToUse() {
  return (
    <section className="flex flex-col gap-4 my-2 px-2 md:px-4 leading-7 sm:max-w-screen-sm">
      <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
        本ページは全国高校生課外活動コンテストの本選に特化したツールになっています。
        飴1個分の火力や炭酸の使用傾向などの設定を行うとサポートのパターン案や必要になる炭酸本数などを算出します。
        <br />
        過去の開催時の情報を元に作成しているため、ゲーム側でパラメータ変更などが発生すると機能しなくなる場合がございます。あらかじめご了承ください。
      </p>
      <div className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
        <Image
          src="/image/decksim/divraceStage/01_candyDamage.png"
          alt="ハート1個分のダメージ量の画像"
          width={276}
          height={100}
          className="w-1/3 mb-2"
        />
        <p>まずは飴1個使用時などのハート1個分相当のダメージ量を入力します。</p>
        <p>
          センバツシミュレーターを使用して算出した期待値でもゲーム内で実測した平均値でも構いません。
          ベースステージとチャレンジステージとで風向きアイテムの効果量に若干の違いがあることには少し注意が必要です。
        </p>
      </div>
      <div className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
        <Image
          src="/image/decksim/divraceStage/02_supportPattern.png"
          alt="サポートパターン選択の画像"
          width={316}
          height={165}
          className="w-1/3 mb-2"
        />
        <p>次に熱中炭酸の使用傾向を選択します。</p>
        <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
          <tbody>
            <tr>
              <td className="min-w-20">熱中炭酸を大量に使用する</td>
              <td>
                サポート回数ごぼうびを狙わない場合でも積極的に熱中炭酸を使用します。
                HPの端数処理でもハート10個分を超える場合には熱中炭酸を使用します。
              </td>
            </tr>
            <tr>
              <td className="min-w-20">熱中炭酸を必要最小限に使用する</td>
              <td>
                サポート回数ごぼうびを狙う場合にのみ可能な限り少量の熱中炭酸を使用します。
                回数ごぼうびを狙わない場合は熱中炭酸を使用しません。
                HPの端数処理ではハート4個分を超える場合に元気炭酸を使用します。
              </td>
            </tr>
            <tr>
              <td className="min-w-20">熱中炭酸を使用しない</td>
              <td>
                熱中炭酸を一切使用しません。
                HPの端数処理ではハート4個分を超える場合に元気炭酸を使用します。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
        <Image
          src="/image/decksim/divraceStage/03_stageTable.png"
          alt="ステージ表の画像"
          width={1305}
          height={343}
          className="w-full mb-2"
        />
        <p>
          どのLvまでクリアするかや各Lvのサポート回数ごほうびを狙うかどうかを選択します。
          また、もし最終Lvを周回する場合はその回数も入力します。
        </p>
        <p>
          ここまでの入力結果に基づいて、各Lvで飴や元気炭酸、熱中炭酸の使用予定数と合計ダメージ量を計算して表示します。
        </p>
      </div>
      <div className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
        <Image
          src="/image/decksim/divraceStage/04_countNG.png"
          alt="回数ごぼうびNG時の画像"
          width={1303}
          height={221}
          className="w-full mb-2"
        />
        <p>
          「サポート回数ごぼうびを狙う」にチェックを入れた場合に、合計ダメージ欄が上記のような警告表示になる場合があります。
        </p>
        <p>
          これは現在の火力では既定回数まで炭酸を使用してもクリアに必要なダメージ量に届かないこと、このままではサポート回数ごぼうびの入手確率が低いことを表しています。
        </p>
        <p>
          この警告表示を解消するには、「サポート回数ごぼうびを狙う」のチェックを外してごほうびの入手を断念するか、もしくは風向きアイテムやSP応援ガールなどを積み増しするなどして火力を底上げする必要があります。
        </p>
      </div>
      <div className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
        <Image
          src="/image/decksim/divraceStage/05_resultSummary.png"
          alt="リザルトサマリーの画像"
          width={1293}
          height={64}
          className="w-full mb-2"
        />
        <p>
          画面上部の左側には保存したデータを開くボタン、現在のデータを保存するボタンがあり、右側にはその他のメニューのボタンがあります。
          また、その間には各Lvの使用アイテム数や獲得ptなどを集計したサマリーが表示されます。
        </p>
        <p>
          スマートフォンなどの横幅が小さい環境では、ベースステージ、チャレンジステージ、2つのステージの合計の3つの情報の内の1つが表示されます。
          タップすることで表示される情報が順に切り替わります。
        </p>
      </div>
      <div className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
        <h2 className="text-lg font-bold">注意事項</h2>
        <p>
          実際のゲーム中では声援などの発動率などの要因によってダメージ量に上振れと下振れが発生します。
          これにより本ページで計算したパターンの通りには行かない状況が多々発生します。
        </p>
        <p>
          サポート回数ごほうびを狙う場合は、HPのミリ残しでごほうびの取得ミスが発生しないようによく注意してプレイしていただきますようにお願いいたします。
          熱中炭酸 → 元気炭酸 → 飴
          の順に使用しつつも下振れしている場合には上位のアイテムに変更するなど柔軟に対応するようにしましょう。
          特に可能なサポート回数があと1回の状況においては、残りのHPを確実に削り切れるかどうかの確認にセンバツシミュレーター側の最小値も合わせてご確認ください。
        </p>
      </div>
    </section>
  );
}

function DataExportAndImport({
  savedDataSummaries,
  handleExportData,
  handleImportData,
}: {
  savedDataSummaries: DivraceStageSavedDataSummary[];
  handleExportData: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    </>
  );
}

export function DivraceStageResultSummaryDiv({
  data,
  resultSummary,
}: {
  data: DivraceStageData;
  resultSummary: DivraceStageResult;
}) {
  const [displayNum, setDisplayNum] = useState<number>(0);

  const summary = resultSummary.summaries;

  const baseLv =
    data.base.clearStageLevel === 31
      ? data.base.clearStageLevel +
        " x " +
        data.base.endlessStageCount.toLocaleString("ja-JP", {
          style: "decimal",
          useGrouping: true,
        })
      : data.base.clearStageLevel;
  const basePoint = summary.base.totalPoint.toLocaleString("ja-JP", {
    style: "decimal",
    useGrouping: true,
  });
  const baseTrust = summary.base.totalTrust.toLocaleString("ja-JP", {
    style: "decimal",
    useGrouping: true,
  });
  const baseCandy = summary.base.totalCandy.toLocaleString("ja-JP", {
    style: "decimal",
    useGrouping: true,
  });
  const baseNormal = summary.base.totalNormal.toLocaleString("ja-JP", {
    style: "decimal",
    useGrouping: true,
  });
  const baseSpecial = summary.base.totalSpecial.toLocaleString("ja-JP", {
    style: "decimal",
    useGrouping: true,
  });
  const baseSummary = [
    `ベースステージ Lv${baseLv}`,
    `${basePoint} pt / 獲得信頼度 ${baseTrust}`,
    `飴 ${baseCandy} 個 / 元気炭酸 ${baseNormal} 個 / 熱中炭酸 ${baseSpecial} 個`,
  ];

  const challengeLv =
    data.challenge.clearStageLevel === 31
      ? data.challenge.clearStageLevel +
        " x " +
        data.challenge.endlessStageCount.toLocaleString("ja-JP", {
          style: "decimal",
          useGrouping: true,
        })
      : data.challenge.clearStageLevel;
  const challengePoint = summary.challenge.totalPoint.toLocaleString("ja-JP", {
    style: "decimal",
    useGrouping: true,
  });
  const challengeTrust = summary.challenge.totalTrust.toLocaleString("ja-JP", {
    style: "decimal",
    useGrouping: true,
  });
  const challengeCandy = summary.challenge.totalCandy.toLocaleString("ja-JP", {
    style: "decimal",
    useGrouping: true,
  });
  const challengeNormal = summary.challenge.totalNormal.toLocaleString(
    "ja-JP",
    {
      style: "decimal",
      useGrouping: true,
    }
  );
  const challengeSpecial = summary.challenge.totalSpecial.toLocaleString(
    "ja-JP",
    {
      style: "decimal",
      useGrouping: true,
    }
  );
  const challengeSummary = [
    `チャレンジステージ Lv${challengeLv}`,
    `${challengePoint} pt / 必要信頼度 ${challengeTrust}`,
    `飴 ${challengeCandy} 個 / 元気炭酸 ${challengeNormal} 個 / 熱中炭酸 ${challengeSpecial} 個`,
  ];

  const totalPoint = (
    summary.base.totalPoint + summary.challenge.totalPoint
  ).toLocaleString("ja-JP", {
    style: "decimal",
    useGrouping: true,
  });
  const totalCandy = (
    summary.base.totalCandy + summary.challenge.totalCandy
  ).toLocaleString("ja-JP", {
    style: "decimal",
    useGrouping: true,
  });
  const totalNormal = (
    summary.base.totalNormal + summary.challenge.totalNormal
  ).toLocaleString("ja-JP", {
    style: "decimal",
    useGrouping: true,
  });
  const totalSpecial = (
    summary.base.totalSpecial + summary.challenge.totalSpecial
  ).toLocaleString("ja-JP", {
    style: "decimal",
    useGrouping: true,
  });
  const totalSummary = [
    `合計`,
    `${totalPoint} pt`,
    `飴 ${totalCandy} 個 / 元気炭酸 ${totalNormal} 個 / 熱中炭酸 ${totalSpecial} 個`,
  ];

  const handleClickResultDiv = () => {
    setDisplayNum((v) => (v + 1) % 3);
  };

  const baseCss = displayNum === 0 ? "" : "hidden";
  const challengeCss = displayNum === 1 ? "" : "hidden";
  const totalCss = displayNum === 2 ? "" : "hidden";

  return (
    <div
      className="ml-4 md:ml-8 mr-2 flex flex-col justify-start"
      role="button"
      onClick={handleClickResultDiv}
    >
      <div className="flex flex-row gap-8">
        <div className={`${baseCss} lg:block`}>
          {baseSummary.map((v, i) => (
            <p key={i} className="text-xs">
              {v}
            </p>
          ))}
        </div>
        <div className={`${challengeCss} lg:block`}>
          {challengeSummary.map((v, i) => (
            <p key={i} className="text-xs">
              {v}
            </p>
          ))}
        </div>
        <div className={`${totalCss} lg:block`}>
          {totalSummary.map((v, i) => (
            <p key={i} className="text-xs">
              {v}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DivraceStageSavedDataDiv({
  savedDataSummary,
}: {
  savedDataSummary: DivraceStageSavedDataSummary;
}) {
  const totalPoint =
    savedDataSummary?.totalPoint?.toLocaleString("ja-JP", {
      style: "decimal",
      useGrouping: true,
    }) ?? "0";
  const totalCandy =
    savedDataSummary?.totalCandy?.toLocaleString("ja-JP", {
      style: "decimal",
      useGrouping: true,
    }) ?? "0";
  const totalNormal =
    savedDataSummary?.totalNormal?.toLocaleString("ja-JP", {
      style: "decimal",
      useGrouping: true,
    }) ?? "0";
  const totalSpecial =
    savedDataSummary?.totalSpecial?.toLocaleString("ja-JP", {
      style: "decimal",
      useGrouping: true,
    }) ?? "0";

  return (
    <>
      <div>合計 {totalPoint} pt</div>
      <div>
        飴 {totalCandy} 個 / 元気炭酸 {totalNormal} 個 / 熱中炭酸 {totalSpecial}{" "}
        個
      </div>
    </>
  );
}
