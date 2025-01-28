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
} from "@/components/decksim/simulator/useDivraceStageData";
import { useLocalStorageData } from "@/components/decksim/simulator/useLocalStorageData";

import {
  baseStageData,
  challengeStageData,
} from "@/components/decksim/data/divraceStageData";

export default function DivraceStageSimulator() {
  const simulatorTabButtonRef = useRef(null);
  const {
    data,
    resultSummary,
    handleParameters,
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
        onChangeFixHeader={handleFixHeader}
        onLoadData={handleLoadData}
        handleSaveDataSummaries={handleSaveDataSummaries}
        handleChangeMemo={handleChangeMemo}
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
                onChangeParameters={handleParameters}
                stageType="base"
              />
              <div className="my-6" />
              <PatternSelect
                data={data}
                onChangeParameters={handleParameters}
                stageType="base"
              />
              <div className="my-6" />
              <StageTable
                data={data}
                resultSummary={resultSummary}
                onChangeParameters={handleParameters}
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
                onChangeParameters={handleParameters}
                stageType="challenge"
              />
              <div className="my-6" />
              <PatternSelect
                data={data}
                onChangeParameters={handleParameters}
                stageType="challenge"
              />
              <div className="my-6" />
              <StageTable
                data={data}
                resultSummary={resultSummary}
                onChangeParameters={handleParameters}
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
  stageType,
}: {
  data: DivraceStageData;
  onChangeParameters: (e: React.ChangeEvent<HTMLInputElement>) => void;
  stageType: "base" | "challenge";
}) {
  return (
    <div>
      <h1 className="text-lg font-bold ml-1">
        <TextWithTooltip
          displayText="ハート1個分のダメージ量"
          tipText="飴1個使用時などのハート1個分相当のダメージ量を入力します。シミュレーターを使用して算出した期待値でもゲーム内で実測した平均値でも構いません。ベースステージとチャレンジステージとで風向きアイテムの効果量に若干の違いがあることには少し注意が必要です。"
        />
      </h1>
      <input
        type="text"
        inputMode="numeric"
        className="input input-md input-bordered max-w-32 md:w-32 text-right mt-2 ml-4"
        data-stage-name={stageType}
        data-key-name="candyDamage"
        value={data[stageType].candyDamage.toLocaleString("ja-JP", {
          style: "decimal",
          useGrouping: true,
        })}
        onChange={onChangeParameters}
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
      <h1 className="text-lg font-bold ml-1">
        <TextWithTooltip
          displayText="サポートパターン選択"
          tipText="熱中炭酸の使用傾向を選択します。"
        />
      </h1>
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
            tipText="サポート回数ごぼうびを狙う場合にのみ可能な限り少量の熱中炭酸を使用します。回数ごぼうひを狙わない場合は熱中炭酸を使用しません。HPの端数処理ではハート4個分を超える場合に元気炭酸を使用します。"
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
  onChangeAimCountReward,
  stageType,
}: {
  data: DivraceStageData;
  resultSummary: DivraceStageResult;
  onChangeParameters: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAimCountReward: (e: React.ChangeEvent<HTMLInputElement>) => void;
  stageType: "base" | "challenge";
}) {
  const stageData = stageType === "base" ? baseStageData : challengeStageData;
  const summary = resultSummary.summaries;

  return (
    <div>
      <h1 className="text-lg font-bold ml-1">
        <TextWithTooltip
          displayText="ステージ表"
          tipText="どのLvまでクリアするかや、各Lvでサポート回数制限ごぼうびを狙うかどうかを選択します。選択に基づいたサポートの推奨パターンの計算結果なども表示されます。"
        />
      </h1>
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
                        disabled={data[stageType].clearStageLevel !== 31}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
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
        本ページのシミュレーターは、ゲーム側でそのセンバツを使用する前に、期待したタイムラインの通りにハンター声援センバツの声援が発動するかどうかや、アタック毎のダメージ声援の合計値を確認できることを目標に作成しています。
      </p>
      <div className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
        <Image
          src="/image/decksim/raidwarSkill/01_attackPattern.png"
          alt="アタックパターン選択の画像"
          width={362}
          height={330}
          className="w-1/3 mb-2"
        />
        <p>
          まずはアタックパターンを選択します。ここでは夜行性に対してどのようなパターンで捕獲を試みるのかを選びます。
        </p>
      </div>
      <div className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
        <Image
          src="/image/decksim/raidwarSkill/02_deck.png"
          alt="ハンター声援センバツの画像"
          width={756}
          height={257}
          className="w-full mb-2"
        />
        <p>
          次にハンター声援センバツグループのデータを入力していきます。
          ダメージ系声援の場合は攻援力の何%分のダメージなのかと、発動に必要なハート数を入力します。
          能力UP系声援の場合はダメージ%欄は空欄のままか、もしくは{" 0 "}
          にしてハート数を入力します。
        </p>
        <p>
          助っ人欄 (班員からレンタルする予定のガール) は省略可です。
          また、確実にそこまでは発動しないメンバーも省略できます。
        </p>
      </div>
      <div className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
        <Image
          src="/image/decksim/raidwarSkill/03_timeline.png"
          alt="タイムラインの画像"
          width={750}
          height={357}
          className="w-full mb-2"
        />
        <p>
          ここまでに入力したデータに基づいて画像のようなタイムラインが形成されます。
        </p>
        <p>
          時系列は上から下の順になっています。
          横の破線は選択したアタックパターンに基づいて描写します。
          この線はどのタイミングで声援発動の判定が行われるのかを表しています。
        </p>
        <p>
          各ガールの声援の発動に必要なハートの充足状況は四角形で表されています。
          四角形の下辺に到達した時点で発動条件を満たしたことになります。
        </p>
        <p>
          右側にはアタック毎に飴何個分のダメージを与えられるのかを表示していています。
          区間は1つ前のアタックからの差分値で、合計はその時点でのトータルのダメージ数値です。左側はダメージ声援の合計%値で、右側はさらに飴や炭酸などによる通常のアタック分も加算した数値です。
        </p>
      </div>
      <div className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
        <Image
          src="/image/decksim/raidwarSkill/04_ngPattern.png"
          alt="NGパターンの画像"
          width={270}
          height={157}
          className="w-1/3 mb-2"
        />
        <p>
          パターンによってはタイムライン中にこのようなバツ印が表示されることがあります。
          これはその箇所でハートの繰り越しあふれが発生している状態を表しています。
          1回のアタックで発動できる声援はラインごとに最大1つまでというゲーム側の仕様を再現したものであり、なるべくこの表示が出ないようなセンバツ構成になるとハートの無駄が少ないです。
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
        <h1 className="text-lg font-bold">
          <TextWithTooltip
            displayText="保存データのバックアップ"
            tipText="ブラウザ内に保存したデータのバックアップファイルを取得したり、逆にバックアップファイルからブラウザ内のデータを復旧することが出来ます。"
          />
        </h1>
        <div className="pl-4 py-2">
          <h1 className="mb-4">
            バックアップファイルの取得 (ブラウザ → ローカルファイル)
          </h1>
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
          <h1 className="mt-6 mb-4">
            バックアップファイルからの復旧 (ローカルファイル → ブラウザ)
          </h1>
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [displayNum, setDisplayNum] = useState<number>(0);

  const handleClickResultDiv = () => {
    setDisplayNum((v) => (v + 1) % 3);
  };

  const baseCss = displayNum === 0 ? "" : "hidden";
  const challengeCss = displayNum === 1 ? "" : "hidden";
  const totalCss = displayNum === 2 ? "" : "hidden";

  return (
    <div
      className="ml-4 md:ml-8 mr-4 flex flex-col justify-start"
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
