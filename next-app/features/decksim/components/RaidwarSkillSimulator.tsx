"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next-export-optimize-images/image";

import TextWithTooltip from "@/components/TextWithTooltip";
import SimulatorHeader from "@/features/decksim/components/SimulatorHeader";
import {
  useRaidwarSkillData,
  RaidwarSkillData,
  RaidwarSkillResult,
  RaidwarSkillSavedDataSummary,
  RaidwarSkillLocalStorageData,
  initRaidwarSkillSavedDataSummary,
} from "@/features/decksim/hooks/useRaidwarSkillData";
import { useLocalStorageData } from "@/features/decksim/hooks/useLocalStorageData";
import { drawCanvasRaidwarSkill } from "@/features/decksim/calc-functions/drawCanvasRaidwarSkill";

export default function RaidwarSkillSimulator() {
  const simulatorTabButtonRef = useRef(null);
  const {
    data,
    resultSummary,
    handleSettings,
    handleChangeParameters,
    handleBlurParameters,
    handleLoadData,
    handleImportRawData,
  } = useRaidwarSkillData({ simulatorTabButtonRef: simulatorTabButtonRef });
  const {
    savedDataSummaries,
    handleSaveDataSummaries,
    handleChangeMemo,
    handleExportData,
    handleImportData,
  } = useLocalStorageData<
    RaidwarSkillSavedDataSummary,
    RaidwarSkillLocalStorageData
  >({
    eventId: "raidwar-skill",
    initSavedDataSummary: structuredClone(initRaidwarSkillSavedDataSummary),
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
      const key = `deck-raidwar-skill-${num}`;
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
        RaidwarSkillData,
        RaidwarSkillResult,
        RaidwarSkillSavedDataSummary,
        RaidwarSkillLocalStorageData
      >
        eventId="raidwar-skill"
        title="おねがい★ハンターズ ハンター声援"
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
          className="tab-content bg-base-100 border-base-300 rounded-box px-1 md:px-2 py-4 max-w-screen"
        >
          <div className="flex flex-col xl:flex-row gap-4">
            <section className="xl:basis-1/2">
              <PatternSelect data={data} onChangeSettings={handleSettings} />
              <div className="my-6" />
              <GirlsTable
                data={data}
                onChangeParameters={handleChangeParameters}
                onBlurParameters={handleBlurParameters}
              />
            </section>
            <ResultCanvas data={data} />
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
            handleImportRawData={handleImportRawData}
          />
        </div>
      </div>
    </>
  );
}

function PatternSelect({
  data,
  onChangeSettings,
}: {
  data: RaidwarSkillData;
  onChangeSettings: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const customPattern = data.settings.customPattern;
  let isInvalidPattern = false;
  if (
    data.settings.patternSelect === "custom" &&
    customPattern.length !== 0 &&
    !/^[cnsCNS]+$/.test(customPattern)
  ) {
    isInvalidPattern = true;
  }

  return (
    <div>
      <h2 className="text-lg font-bold ml-1">
        {/* cSpell:disable */}
        <TextWithTooltip
          displayText="アタックパターン選択"
          tipText="夜行性に対してどのようなパターンでアタックを行うのかを選択します。カスタムパターンを選択する場合は具体的なパターンも入力します。例えば、本気炭酸を2回使用後に飴を2回使用する場合は「SSCC」と入力します。"
        />
        {/* cSpell:enable */}
      </h2>
      <label className="label cursor-pointer justify-start">
        <input
          type="radio"
          name="patternSelect"
          className="radio"
          value="specialOnly"
          onChange={onChangeSettings}
          checked={data.settings.patternSelect === "specialOnly"}
        />
        <span className="label-text ml-2">本気炭酸 のみ</span>
      </label>
      <label className="label cursor-pointer justify-start">
        <input
          type="radio"
          name="patternSelect"
          className="radio"
          value="specialAfterNormal"
          onChange={onChangeSettings}
          checked={data.settings.patternSelect === "specialAfterNormal"}
        />
        <span className="label-text ml-2">初手だけ 通常炭酸 → 本気炭酸</span>
      </label>
      <label className="label cursor-pointer justify-start">
        <input
          type="radio"
          name="patternSelect"
          className="radio"
          value="normalOnly"
          onChange={onChangeSettings}
          checked={data.settings.patternSelect === "normalOnly"}
        />
        <span className="label-text ml-2">通常炭酸 のみ</span>
      </label>
      <label className="label cursor-pointer justify-start">
        <input
          type="radio"
          name="patternSelect"
          className="radio"
          value="specialAfterCandy"
          onChange={onChangeSettings}
          checked={data.settings.patternSelect === "specialAfterCandy"}
        />
        <span className="label-text ml-2">初手だけ 飴 → 本気炭酸</span>
      </label>
      <label className="label cursor-pointer justify-start">
        <input
          type="radio"
          name="patternSelect"
          className="radio"
          value="normalAfterCandy"
          onChange={onChangeSettings}
          checked={data.settings.patternSelect === "normalAfterCandy"}
        />
        <span className="label-text ml-2">初手だけ 飴 → 通常炭酸</span>
      </label>
      <div>
        <label className="label cursor-pointer justify-start">
          <input
            type="radio"
            name="patternSelect"
            className="radio"
            value="custom"
            onChange={onChangeSettings}
            checked={data.settings.patternSelect === "custom"}
          />
          <span className="label-text ml-2">カスタムパターン</span>
          {isInvalidPattern && (
            <span className="ml-4 text-error text-sm">
              &#x26a0; 無効なパターンです
            </span>
          )}
        </label>
        <input
          type="text"
          name="customPattern"
          className="input input-bordered max-w-sm ml-4 text-sm"
          onChange={onChangeSettings}
          value={data.settings.customPattern}
          placeholder="左からC(飴), N(通常炭酸), S(本気炭酸)を並べる"
        />
      </div>
    </div>
  );
}

function GirlsTable({
  data,
  onChangeParameters,
  onBlurParameters,
}: {
  data: RaidwarSkillData;
  onChangeParameters: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurParameters: (e: React.FocusEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <h2 className="text-lg font-bold ml-1">
        <TextWithTooltip
          displayText="ハンター声援センバツ"
          tipText="ハンター声援センバツのデータを入力します。%ダメージ声援の場合は、ダメージ%の欄にその数値を入力します。攻援力UP声援の場合はダメージ%の欄は空白のままか、0を入力します。ハート数の欄は1回目の発動に必要なハート数を入力します。"
        />
      </h2>
      <div className="grid grid-cols-4 gap-2 mt-2">
        <TableCell
          title="リーダー"
          data={data.leader?.[1]}
          onChangeParameters={onChangeParameters}
          onBlurParameters={onBlurParameters}
          positionName="leader"
          positionNum={1}
          isColSpan2
        />
        <TableCell
          title="助っ人"
          data={data.helper?.[1]}
          onChangeParameters={onChangeParameters}
          onBlurParameters={onBlurParameters}
          positionName="helper"
          positionNum={1}
          isColSpan2
        />
        {Array(49)
          .fill(0)
          .map((_, i) => (
            <TableCell
              key={i}
              title={String(i + 1)}
              data={data.member?.[i + 1]}
              onChangeParameters={onChangeParameters}
              onBlurParameters={onBlurParameters}
              positionName="member"
              positionNum={i + 1}
            />
          ))}
      </div>
    </>
  );
}

function TableCell({
  title,
  data,
  onChangeParameters,
  onBlurParameters,
  positionName,
  positionNum,
  isColSpan2,
}: {
  title: string;
  data: { damage?: number | string; heartNum?: number | string };
  onChangeParameters: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurParameters: (e: React.FocusEvent<HTMLInputElement>) => void;
  positionName: string;
  positionNum: number;
  isColSpan2?: boolean;
}) {
  const colSpanCss = isColSpan2 ? "col-span-2" : "col-span-1";

  return (
    <div
      className={`p-1 rounded-md odd:bg-base-200 even:bg-base-300 ${colSpanCss}`}
    >
      <p className="pl-1 text-sm">[{title}]</p>
      <div className="flex flex-col sm:flex-row gap-0 md:gap-1">
        <label className="form-control">
          <div className="label">
            <span className="label-text text-xs">ダメージ%</span>
          </div>
          <input
            type="text"
            inputMode="numeric"
            className="input input-sm input-bordered max-w-16 md:w-16 text-right"
            value={data?.damage === undefined ? "" : data.damage}
            onChange={onChangeParameters}
            onBlur={onBlurParameters}
            data-position-name={positionName}
            data-position-num={positionNum}
            name="damage"
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text text-xs">ハート数</span>
          </div>
          <input
            type="text"
            inputMode="numeric"
            className="input input-sm input-bordered max-w-16 md:w-16 text-right"
            value={data?.heartNum === undefined ? "" : data.heartNum}
            onChange={onChangeParameters}
            onBlur={onBlurParameters}
            data-position-name={positionName}
            data-position-num={positionNum}
            name="heartNum"
          />
        </label>
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
  handleImportRawData,
}: {
  savedDataSummaries: RaidwarSkillSavedDataSummary[];
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

function ResultCanvas({ data }: { data: RaidwarSkillData }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // data変化時にキャンバス描写を更新する
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvasRaidwarSkill({ data: data, ctx: ctx });
  }, [data]);

  return (
    <div className="xl:basis-1/2 p-2">
      <h2 className="text-lg font-bold ml-1 mb-2">
        <TextWithTooltip
          displayText="タイムライン"
          tipText="メンバーの入れ替わり状況やアタック毎の予想ダメージ値を表示します。"
        />
      </h2>
      <div className="border border-base-300 rounded-md bg-base-200 overflow-x-scroll sm:overflow-x-auto w-[calc(100dvw-45px)] sm:w-auto max-w-[602px]">
        <canvas ref={canvasRef} width={600} height={3000} />
      </div>
    </div>
  );
}

export function RaidwarSkillResultSummaryDiv({
  resultSummary,
}: {
  resultSummary: RaidwarSkillResult;
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
