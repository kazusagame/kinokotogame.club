import { DeckSimulatorData } from "@/features/decksim/type-definitions/DeckSimulatorData";
import { DeckSimulatorResult } from "@/features/decksim/type-definitions/DeckSimulatorResult";

import { DIVRACE_ITEMS_DATA } from "@/features/decksim/data/divraceItemData";

import TextWithTooltip from "@/components/TextWithTooltip";
import { formatNumber } from "@/lib/formatNumber";

export function DivraceSpecialSection({
  data,
  summary,
  onChange,
  onBlur,
}: {
  data: DeckSimulatorData;
  summary: DeckSimulatorResult;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  const itemSummary = summary.summaries.divraceSpecial?.itemEffect ?? {};

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
            value={formatNumber(
              data?.eventSpecial?.divrace?.specialGirlsEffect
            )}
            onChange={onChange}
            onBlur={onBlur}
            data-path="eventSpecial.divrace.specialGirlsEffect"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-4">
            <h3 className="text-md font-bold">風向きアイテム</h3>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 pl-2 md:pl-4">
              <p className="text-base">
                <TextWithTooltip
                  displayText="ステージ名"
                  tipText="ステージ名を選択します。ステージ種別によって風向きアイテムの効果が変化するためです。"
                />
              </p>
              <select
                name="stage"
                className="select select-sm select-bordered"
                value={
                  data?.eventSpecial?.divrace?.stage ?? "チャレンジステージ"
                }
                onChange={onChange}
                data-path="eventSpecial.divrace.stage"
              >
                <option value="ベースステージ">ベースステージ</option>
                <option value="チャレンジステージ">チャレンジステージ</option>
              </select>
            </div>
            <div className="w-auto md:w-fit text-base border border-base-300 rounded-xl ml-2 md:ml-4">
              <div className="grid grid-cols-3 md:grid-cols-[80px_100px_200px_100px_100px_65px]  lg:grid-cols-[80px_150px_380px_100px_100px_65px] bg-base-300 text-center text-xs font-bold px-2 py-1 rounded-t-xl">
                <div className="flex justify-center items-center rounded-tl-xl">
                  <TextWithTooltip
                    displayText="使用中"
                    tipText="風向きアイテムを使用する場合はチェックを入れます。計算結果に効果値が加算されます。"
                  />
                </div>
                <div className="flex justify-center items-center">
                  アイテム名
                </div>
                <div className="flex justify-center items-center">説明</div>
                <div className="flex flex-col justify-center items-center">
                  <p>効果期待値</p>
                  <p>(ベース)</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p>効果期待値</p>
                  <p>(チャレンジ)</p>
                </div>
                <div className="flex justify-center items-center rounded-tr-xl">
                  ← 降順
                </div>
              </div>
              {Array(Object.keys(DIVRACE_ITEMS_DATA).length)
                .fill(0)
                .map((_, i) => {
                  return (
                    <div
                      key={i}
                      className={`grid grid-cols-3 md:grid-cols-[80px_100px_200px_100px_100px_65px] lg:grid-cols-[80px_150px_380px_100px_100px_65px] odd:bg-base-200 even:bg-base-100 text-xs md:text-sm px-2 py-1 ${
                        i === Object.keys(DIVRACE_ITEMS_DATA).length - 1
                          ? "rounded-b-xl"
                          : ""
                      }`}
                    >
                      <div className="flex justify-center items-center">
                        <label className="label cursor-pointer w-full flex justify-center items-center py-1">
                          <input
                            type="checkbox"
                            name={`isValid-${i + 1}`}
                            className="checkbox checkbox-md"
                            checked={
                              data?.eventSpecial?.divrace?.item?.[i + 1]
                                ?.isValid ?? false
                            }
                            onChange={onChange}
                            data-path={`eventSpecial.divrace.item.${
                              i + 1
                            }.isValid`}
                          />
                        </label>
                      </div>
                      <div className="flex justify-start items-center px-1">
                        {DIVRACE_ITEMS_DATA[i + 1].name}
                      </div>
                      <div className="flex justify-start items-center px-1">
                        {DIVRACE_ITEMS_DATA[i + 1].description}
                      </div>
                      <div className="flex justify-end items-center pr-2">
                        {formatNumber(itemSummary?.[i + 1]?.baseStage ?? 0)}
                      </div>
                      <div className="flex justify-end items-center pr-2">
                        {formatNumber(
                          itemSummary?.[i + 1]?.challengeStage ?? 0
                        )}
                      </div>
                      <div className="flex justify-end items-center pr-2">
                        {itemSummary?.[i + 1]?.descOrder ?? "―"}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
