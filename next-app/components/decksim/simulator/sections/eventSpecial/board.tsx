import { useRef } from "react";

import { DeckSimulatorData } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { DeckSimulatorResult } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorResult";

import { BOARD_WEATHER_DATA } from "@/components/decksim/data/boardWeatherData";
import {
  BOARD_SPACE_DATA,
  BOARD_SPACE_EFFECTS_NAME_TO_ID,
} from "@/components/decksim/data/boardSpaceData";

import TextWithTooltip from "@/components/common/TextWithTooltip";
import { formatNumber } from "@/lib/formatNumber";
import { returnNumber } from "@/lib/returnNumber";

export function BoardSpecialSection({
  data,
  summary,
  onChange,
  onBlur,
  setValueAtPath,
}: {
  data: DeckSimulatorData;
  summary: DeckSimulatorResult;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setValueAtPath: (obj: {
    path: string;
    value: { [key: string | number]: unknown };
  }) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentWeatherData =
    BOARD_WEATHER_DATA[returnNumber(data.eventSpecial.board?.weatherNum)];
  const weatherSummary = summary.summaries.boardSpecial?.weatherEffect ?? {};
  const spaceSummary = summary.summaries.boardSpecial?.spaceEffect ?? {};
  const totalSummary = summary.summaries.boardSpecial?.totalEffect ?? {
    minPower: 0,
    expPower: 0,
    maxPower: 0,
  };

  const handleParseClick = () => {
    // refが存在しなければ何もせずに終了（通常ありえない）
    if (!textareaRef.current) return;

    const inputText = textareaRef.current.value;

    // 空文字ならば何もせずに終了
    if (!inputText) return;

    const spaceEffects = {
      1: { value: 0 },
      2: { value: 0 },
      3: { value: 0 },
      4: { value: 0 },
      5: { value: 0 },
      6: { value: 0 },
      7: { value: 0 },
      8: { value: 0 },
      9: { value: 0 },
      10: { value: 0 },
      11: { value: 0 },
      12: { value: 0 },
      13: { value: 0 },
      14: { value: 0 },
      15: { value: 0 },
      16: { value: 0 },
    };

    // 1行ずつ分割（Windows/Unix対応）
    const lines = inputText.split(/\r?\n/);

    // 一致判定と数値の取得
    const regex = /^(.+?)\s*([\d,]+)[％%](UP|DOWN)$/i;
    lines.forEach((line) => {
      const match = line.match(regex);
      if (match) {
        const [, name, value, direction] = match;
        let valueNum = Number(value.replaceAll(",", ""));
        if (Number.isNaN(valueNum)) return;
        if (direction === "DOWN") {
          valueNum *= -1;
        }
        const id = BOARD_SPACE_EFFECTS_NAME_TO_ID[
          name
        ] as keyof typeof spaceEffects;
        if (id) {
          spaceEffects[id].value = valueNum;
        }
      }
    });

    // ステートに新しい数値を反映する
    setValueAtPath({
      path: "eventSpecial.board.spaceEffects",
      value: spaceEffects,
    });

    // 最後にテキストエリアの内容を消去する
    textareaRef.current.value = "";
  };

  return (
    <section className="pl-1">
      <h2 className="text-lg font-bold">イベント固有</h2>
      <div className="flex flex-col gap-6 mt-4 pl-0 sm:pl-2 md:pl-4">
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <p className="text-base">SP応援効果</p>
          <input
            type="text"
            inputMode="numeric"
            name="specialGirlsEffect"
            className="input input-sm input-bordered max-w-24 md:w-24 text-right"
            value={formatNumber(data?.eventSpecial?.board?.specialGirlsEffect)}
            onChange={onChange}
            onBlur={onBlur}
            data-path="eventSpecial.board.specialGirlsEffect"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <h3 className="text-md font-bold">天気効果</h3>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 pl-2 md:pl-4">
              <p className="text-base">現在の天気</p>
              <select
                name="appealType"
                className="select select-sm select-bordered"
                value={returnNumber(
                  data?.eventSpecial?.board?.weatherNum ?? "0"
                )}
                onChange={onChange}
                data-path="eventSpecial.board.weatherNum"
              >
                {Object.entries(BOARD_WEATHER_DATA).map(([key, value]) => {
                  return (
                    <option key={key} value={key}>
                      {value.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-auto sm:w-fit text-base border border-base-300 rounded-xl ml-2 md:ml-4">
              <div className="grid grid-cols-3 sm:grid-cols-[200px_120px_100px] bg-base-300 text-center text-xs font-bold px-2 py-1 rounded-t-xl">
                <div className="flex justify-center items-center rounded-tl-xl">
                  効果名
                </div>
                <div className="flex justify-center items-center">数値</div>
                <div className="flex justify-center items-center rounded-tr-xl">
                  <TextWithTooltip
                    displayText="効果期待値"
                    tipText="センバツの設定に基づいて計算された効果の期待値を自動で表示します。"
                  />
                </div>
              </div>
              {Array(4)
                .fill(0)
                .map((_, i) => {
                  return (
                    <div
                      key={i}
                      className={`grid grid-cols-3 sm:grid-cols-[200px_120px_100px] odd:bg-base-200 even:bg-base-100 text-xs md:text-sm min-h-10 px-2 py-1 ${
                        i === 3 ? "rounded-b-xl" : ""
                      }`}
                    >
                      <div className="flex justify-start items-center">
                        {currentWeatherData.effectList[i].name}
                      </div>
                      <div
                        className={`flex justify-center items-center ${
                          currentWeatherData.effectList[i].effectValue < 0
                            ? "text-red-700"
                            : ""
                        }`}
                      >
                        {currentWeatherData.effectList[i].name === "―"
                          ? "―"
                          : currentWeatherData.effectList[i].effectValue + " %"}
                      </div>
                      <div
                        className={`flex justify-end items-center pr-2 ${
                          (weatherSummary?.[i] ?? 0) < 0 ? "text-red-700" : ""
                        }`}
                      >
                        {currentWeatherData.effectList[i].name === "―"
                          ? "―"
                          : formatNumber(weatherSummary?.[i] ?? 0)}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <h3 className="text-md font-bold">マス効果</h3>
            <div className="w-auto sm:w-fit text-base border border-base-300 rounded-xl ml-2 md:ml-4">
              <div className="grid grid-cols-3 sm:grid-cols-[200px_120px_100px] bg-base-300 text-center text-xs font-bold px-2 py-1 rounded-t-xl">
                <div className="flex justify-center items-center rounded-tl-xl">
                  効果名
                </div>
                <div className="flex justify-center items-center">数値</div>
                <div className="flex justify-center items-center rounded-tr-xl">
                  <TextWithTooltip
                    displayText="効果期待値"
                    tipText="センバツの設定に基づいて計算された効果の期待値を自動で表示します。"
                  />
                </div>
              </div>
              {Array(16)
                .fill(0)
                .map((_, i) => {
                  return (
                    <div
                      key={i}
                      className={`grid grid-cols-3 sm:grid-cols-[200px_120px_100px] odd:bg-base-200 even:bg-base-100 text-xs md:text-sm px-2 py-1 ${
                        i === 16 ? "rounded-b-xl" : ""
                      }`}
                    >
                      <div className="flex justify-start items-center">
                        {BOARD_SPACE_DATA[i + 1].name}
                      </div>
                      <div
                        className={`flex justify-center items-center ${
                          returnNumber(
                            data.eventSpecial.board?.spaceEffects?.[i + 1]
                              ?.value ?? 0
                          ) < 0
                            ? "text-red-700"
                            : ""
                        }`}
                      >
                        <div className="relative w-fit">
                          <input
                            type="text"
                            inputMode="numeric"
                            name={`spaceEffectValue${i + 1}`}
                            className="input input-sm input-bordered max-w-20 md:w-20 text-right mr-7"
                            value={formatNumber(
                              data?.eventSpecial?.board?.spaceEffects?.[i + 1]
                                ?.value ?? 0
                            )}
                            onChange={onChange}
                            onBlur={onBlur}
                            data-path={`eventSpecial.board.spaceEffects.${
                              i + 1
                            }.value`}
                          />
                          <span className="absolute right-1 top-1/2 -translate-y-1/2">
                            %
                          </span>
                        </div>
                      </div>
                      <div
                        className={`flex justify-end items-center pr-2 ${
                          (spaceSummary?.[i + 1] ?? 0) < 0 ? "text-red-700" : ""
                        }`}
                      >
                        {formatNumber(spaceSummary?.[i + 1] ?? 0)}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <h3 className="text-md font-bold">
              <TextWithTooltip
                displayText="合計ボーナス効果"
                tipText="天気効果とマス効果を合算した♡1あたりのボーナス効果を自動で表示します。"
              />
            </h3>
            <div className="w-auto sm:w-fit text-base border border-base-300 rounded-xl ml-2 md:ml-4">
              <div className="grid grid-cols-3 sm:grid-cols-[120px_120px_120px] bg-base-300 text-center text-xs font-bold px-2 py-1 rounded-t-xl">
                <div className="flex justify-center items-center rounded-tl-xl">
                  最小値
                </div>
                <div className="flex justify-center items-center">期待値</div>
                <div className="flex justify-center items-center rounded-tr-xl">
                  最大値
                </div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-[120px_120px_120px] bg-base-100 text-xs md:text-sm px-2 py-1 min-h-10 rounded-b-xl">
                <div className="flex justify-end items-center pr-2">
                  {formatNumber(totalSummary.minPower)}
                </div>
                <div className="flex justify-end items-center pr-2">
                  {formatNumber(totalSummary.expPower)}
                </div>
                <div className="flex justify-end items-center pr-2">
                  {formatNumber(totalSummary.maxPower)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <h3 className="text-md font-bold">
              <TextWithTooltip
                displayText="マス効果を一覧から取得"
                tipText="ステージ効果 → マス効果で表示されているマス効果の一覧をコピー&ペーストして取得ボタンを押すと文章から各数値を抽出して取得を試みます。"
              />
            </h3>
            <div className="ml-2 md:ml-4">
              <p className="text-sm mb-4">こちらの機能はまだテスト前です。</p>
              <textarea
                ref={textareaRef}
                placeholder="こちらにステージ効果 → マス効果で表示されているマス効果の一覧を貼り付けます。その次に取得ボタンを押すと解析が行われて、上のマス効果の表に各効果値が自動で入力された状態になります。手動で1つずつ入力していく手間を省くことが出来ます。"
                className="textarea textarea-bordered w-full max-w-xs rounded-xl"
                rows={7}
              />
              <div className="mt-4 pl-4">
                <button
                  className="btn btn-md btn-primary w-20"
                  onClick={handleParseClick}
                >
                  取得
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
