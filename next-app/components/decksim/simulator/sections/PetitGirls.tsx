import { useId } from "react";

import { DeckSimulatorData } from "@/components/decksim/simulator/useDeckSimulatorData";
import { EVENT_ID_TO_NAME_DICT } from "@/components/decksim/data/eventData";

import TextWithTooltip from "@/components/common/TextWithTooltip";
import { PETIT_GIRLS_EFFECTS_DATA } from "@/components/decksim/data/petitGirlsEffectData";

export function PetitGirls({
  data,
  eventId,
  onChange,
  onBlur,
}: {
  data: DeckSimulatorData;
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  const isAttackValidEvent = eventId !== "championship-defense" ? true : false;
  const isDefenseValidEvent =
    eventId === "raid-second" || eventId === "championship-defense"
      ? true
      : false;
  const isDetailsValidEvent = eventId === "board" ? true : false;
  const selectId = useId();
  return (
    <>
      <section className="pl-1">
        <h2 className="text-lg font-bold">ぷちセンバツ</h2>
        <div className="flex flex-col gap-6 mt-4 pl-2 md:pl-4">
          <div className="flex items-center gap-2 md:gap-4">
            <p
              className={`text-base ${isAttackValidEvent ? "" : "opacity-10"}`}
            >
              総攻援
            </p>
            <input
              type="text"
              inputMode="numeric"
              className={`input input-sm input-bordered max-w-24 md:w-24 text-right ${
                isAttackValidEvent ? "" : "opacity-10"
              }`}
              value={(data.petitGirls.totalPower.attack ?? 0).toLocaleString(
                "ja-JP",
                {
                  style: "decimal",
                  useGrouping: true,
                }
              )}
              onChange={onChange}
              onBlur={onBlur}
              data-path="petitGirls.totalPower.attack"
            />
            <p
              className={`text-base ${
                isAttackValidEvent && isDefenseValidEvent ? "" : "opacity-10"
              }`}
            >
              /
            </p>
            <p
              className={`text-base ${isDefenseValidEvent ? "" : "opacity-10"}`}
            >
              総守援
            </p>
            <input
              type="text"
              inputMode="numeric"
              className={`input input-sm input-bordered max-w-24 md:w-24 text-right ${
                isDefenseValidEvent ? "" : "opacity-10"
              }`}
              value={(data.petitGirls.totalPower.defense ?? 0).toLocaleString(
                "ja-JP",
                {
                  style: "decimal",
                  useGrouping: true,
                }
              )}
              onChange={onChange}
              onBlur={onBlur}
              data-path="petitGirls.totalPower.defense"
            />
          </div>
          <div className="">
            <p className="text-base">
              <TextWithTooltip
                displayText="応援力効果"
                tipText="ぷち主センバツ3人の応援力効果を選択します。経験値UPなど発揮値計算に影響を与えない効果の場合は --- を選択します。成長Lvを上限まで上げてある状態を想定して計算を行うため、まだ成長の途中で効果Lvが上限に到達していない場合は誤差が発生します。あらかじめご承知おきください。"
              />
            </p>
            <div className="flex flex-col gap-3 mt-2 pl-2 md:pl-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex items-center gap-24">
                      <p className="text-base">{i + 1}:</p>
                      <div>
                        <label className="label cursor-pointer">
                          <p className="text-base mr-2">レアリティUR</p>
                          <input
                            id={`${selectId}-${i}`}
                            type="checkbox"
                            className="checkbox"
                            checked={
                              data.petitGirls.effects?.[i + 1]?.isRarityUr ===
                              true
                            }
                            onChange={onChange}
                            data-path={`petitGirls.effects.${i + 1}.isRarityUr`}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-4 pl-2 md:pl-4">
                      {Array(4)
                        .fill(0)
                        .map((_, j) => (
                          <PetitEffectSelect
                            key={j + 1}
                            data={data}
                            onChange={onChange}
                            onBlur={onBlur}
                            girlNum={i + 1}
                            effectNum={j + 1}
                          />
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {isDetailsValidEvent && (
            <div className="">
              <p className="text-base">
                <TextWithTooltip
                  displayText="ぷちガールちゃん詳細 (マス効果用) "
                  tipText="ぶちセンバツ内のぷちガールちゃんの詳細データを入力します。ここでの入力は散策♪聖櫻ワールドのマス効果を計算する時にのみ使用されます。"
                />
              </p>
              <div className="flex flex-col gap-3 mt-2 pl-2 md:pl-4">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="flex items-center gap-4">
                        <p className="text-base">{i + 1}:</p>
                      </div>
                      <div className="w-fit text-base pl-2 md:pl-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 bg-base-300 text-center text-xs font-bold py-1 rounded-t-xl">
                          <div>攻援力</div>
                          <div>タイプ</div>
                          <div>スキル効果</div>
                          <div></div>
                        </div>
                        {Array(10)
                          .fill(0)
                          .map((_, j) => (
                            <RowBoardPetitDetail
                              key={j + 1}
                              data={data}
                              onChange={onChange}
                              onBlur={onBlur}
                              groupNum={i + 1}
                              girlNum={j + 1}
                            />
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function PetitEffectSelect({
  data,
  onChange,
  onBlur,
  girlNum,
  effectNum,
}: {
  data: DeckSimulatorData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  girlNum: number;
  effectNum: number;
}) {
  const selectId = useId();
  const id = data.petitGirls.effects?.[girlNum]?.[effectNum]?.id ?? 255;
  const condition = PETIT_GIRLS_EFFECTS_DATA?.[id]?.conditionDetail;
  const bgColor =
    condition === undefined
      ? ""
      : condition.includes("SWEET")
      ? "bg-sweet"
      : condition.includes("COOL")
      ? "bg-cool"
      : condition.includes("POP")
      ? "bg-pop"
      : "bg-base-100";
  return (
    <select
      id={selectId}
      className={`select select-sm select-bordered ${bgColor}`}
      value={data.petitGirls.effects?.[girlNum]?.[effectNum]?.id ?? 255}
      onChange={onChange}
      onBlur={onBlur}
      data-path={`petitGirls.effects.${girlNum}.${effectNum}.id`}
    >
      {Object.entries(PETIT_GIRLS_EFFECTS_DATA)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([key, value]) => (
          <option
            key={key}
            value={key}
            className={
              value.conditionDetail === "SWEETタイプ"
                ? "bg-sweet"
                : value.conditionDetail === "COOLタイプ"
                ? "bg-cool"
                : value.conditionDetail === "POPタイプ"
                ? "bg-pop"
                : "bg-base-100"
            }
          >
            {value.name}
          </option>
        ))}
    </select>
  );
}

function RowBoardPetitDetail({
  data,
  onChange,
  onBlur,
  groupNum,
  girlNum,
}: {
  data: DeckSimulatorData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  groupNum: number;
  girlNum: number;
}) {
  const selectId = useId();
  const getBgClass = (type?: string | undefined) =>
    type === "SWEETタイプ"
      ? "bg-sweet"
      : type === "COOLタイプ"
      ? "bg-cool"
      : type === "POPタイプ"
      ? "bg-pop"
      : type === undefined
      ? "bg-sweet"
      : "bg-base-100";

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-4 gap-2 px-1 py-2 odd:bg-base-300 even:bg-base-200 ${
        girlNum === 10 ? "rounded-b-xl" : ""
      }`}
    >
      {/* 攻援力 */}
      <div className="flex justify-center">
        <input
          type="text"
          inputMode="numeric"
          className="input input-sm input-bordered max-w-24 md:w-24 text-right"
          value={(
            data.petitGirls.details?.[groupNum]?.[girlNum]?.attack ?? 0
          ).toLocaleString("ja-JP", {
            style: "decimal",
            useGrouping: true,
          })}
          onChange={onChange}
          onBlur={onBlur}
          data-path={`petitGirls.details.${groupNum}.${girlNum}.attack`}
        />
      </div>
      {/* タイプ */}
      <div className="flex justify-center">
        <select
          id={`${selectId}-1`}
          className={`select select-sm select-bordered ${getBgClass(
            data.petitGirls.details?.[groupNum]?.[girlNum]?.type
          )}`}
          value={
            data.petitGirls.details?.[groupNum]?.[girlNum]?.type ??
            "SWEETタイプ"
          }
          onChange={onChange}
          data-path={`petitGirls.details.${groupNum}.${girlNum}.type`}
        >
          <option value="SWEETタイプ" className="bg-sweet">
            SWEETタイプ
          </option>
          <option value="COOLタイプ" className="bg-cool">
            COOLタイプ
          </option>
          <option value="POPタイプ" className="bg-pop">
            POPタイプ
          </option>
        </select>
      </div>
      {/* スキル効果 */}
      <div className="flex justify-center">
        {girlNum <= 4 ? (
          <select
            id={`${selectId}-2`}
            className={`select select-sm select-bordered ${getBgClass(
              data.petitGirls.details?.[groupNum]?.[girlNum]?.skillTarget
            )}`}
            value={
              data.petitGirls.details?.[groupNum]?.[girlNum]?.skillTarget ??
              "SWEETタイプ"
            }
            onChange={onChange}
            data-path={`petitGirls.details.${groupNum}.${girlNum}.skillTarget`}
          >
            <option value="SWEETタイプ" className="bg-sweet">
              SWEETタイプ
            </option>
            <option value="COOLタイプ" className="bg-cool">
              COOLタイプ
            </option>
            <option value="POPタイプ" className="bg-pop">
              POPタイプ
            </option>
            <option value="全タイプ" className="bg-base-100">
              全タイプ
            </option>
          </select>
        ) : (
          <div className="text-center">―</div>
        )}
      </div>
      {/* 効果値 */}
      <div className="flex justify-center">
        {girlNum <= 4 ? (
          <div className="relative w-fit">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              className="input input-sm input-bordered max-w-20 md:w-20 text-right mr-6"
              value={
                data.petitGirls.details?.[groupNum]?.[girlNum]?.SkillValue ?? 0
              }
              onChange={onChange}
              onBlur={onBlur}
              data-path={`petitGirls.details.${groupNum}.${girlNum}.SkillValue`}
            />
            <span className="absolute right-1 top-1/2 -translate-y-1/2">%</span>
          </div>
        ) : (
          <div className="text-center">―</div>
        )}
      </div>
    </div>
  );
}
