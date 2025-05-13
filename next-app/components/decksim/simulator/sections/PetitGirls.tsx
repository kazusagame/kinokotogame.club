import { useState } from "react";

import { DeckSimulatorData } from "@/components/decksim/simulator/useDeckSimulatorData";
import { EVENT_ID_TO_NAME_DICT } from "@/components/decksim/data/eventData";
import { PETIT_GIRLS_EFFECTS_DATA } from "@/components/decksim/data/petitGirlsEffectData";

import TextWithTooltip from "@/components/common/TextWithTooltip";
import { formatNumber } from "@/lib/formattedNumber";

const MAIN_GIRLS_COUNT = 3;
const EFFECTS_PER_GIRL = 4;
const GIRLS_COUNT_IN_GROUP = 10;

type EffectSelectModalProps = {
  onSubmit: (effectId: string, filterState: FilterState) => void;
  onClose: (selectedId: string | null, filterState: FilterState) => void;
  initialSelected: string | null;
  initialFilterState?: FilterState;
};

type FilterState = {
  markerType: string | null;
  conditionDetail: string | null;
  effectType: string | null;
};

function TotalPowerInputs({
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

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <p className={`text-base ${isAttackValidEvent ? "" : "opacity-10"}`}>
        総攻援
      </p>
      <input
        type="text"
        inputMode="numeric"
        name="totalPowerAttack"
        className={`input input-sm input-bordered max-w-24 md:w-24 text-right ${
          isAttackValidEvent ? "" : "opacity-10"
        }`}
        value={formatNumber(data.petitGirls.totalPower.attack)}
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
      <p className={`text-base ${isDefenseValidEvent ? "" : "opacity-10"}`}>
        総守援
      </p>
      <input
        type="text"
        inputMode="numeric"
        name="totalPowerDefense"
        className={`input input-sm input-bordered max-w-24 md:w-24 text-right ${
          isDefenseValidEvent ? "" : "opacity-10"
        }`}
        value={formatNumber(data.petitGirls.totalPower.defense)}
        onChange={onChange}
        onBlur={onBlur}
        data-path="petitGirls.totalPower.defense"
      />
    </div>
  );
}

function EffectSelectionBlock({
  data,
  onChange,
  setValueAtPath,
}: {
  data: DeckSimulatorData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  setValueAtPath: (obj: {
    path: string;
    value: { [key: string | number]: unknown };
  }) => void;
}) {
  const [effectModalOpen, setEffectModalOpen] = useState(false);
  const [resolveEffectModal, setResolveEffectModal] = useState<
    ((id?: string) => void) | null
  >(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [filterState, setFilterState] = useState<FilterState>({
    markerType: null,
    conditionDetail: null,
    effectType: null,
  });

  const handleClickEffectAddButton = async ({
    girlNum,
    effectNum,
  }: {
    girlNum: number;
    effectNum: number;
  }) => {
    if (effectModalOpen) return;
    const result = await openEffectSelectModal();
    if (result !== undefined) {
      setValueAtPath({
        path: `petitGirls.effects.${girlNum}.${effectNum}`,
        value: { id: result },
      });
    }
  };

  const handleClickEffectDeleteButton = ({
    girlNum,
    effectNum,
  }: {
    girlNum: number;
    effectNum: number;
  }) => {
    setValueAtPath({
      path: `petitGirls.effects.${girlNum}.${effectNum}`,
      value: {},
    });
  };

  const openEffectSelectModal = (): Promise<string | undefined> => {
    setEffectModalOpen(true);
    return new Promise((resolve) => {
      setResolveEffectModal(() => resolve);
    });
  };

  const handleEffectSelect = (id: string, currentFilterState: FilterState) => {
    if (resolveEffectModal) {
      resolveEffectModal(id);
      setResolveEffectModal(null);
    }
    setSelectedState(id);
    setFilterState(currentFilterState);
    setEffectModalOpen(false);
  };

  return (
    <div>
      <p className="text-base">
        <TextWithTooltip
          displayText="応援力効果"
          tipText="ぷち主センバツ3人の応援力効果を選択します。経験値UPなど発揮値計算に影響を与えない効果の場合は選択不要です。成長Lvを上限まで上げてある状態を想定して計算を行うため、まだ成長の途中で効果Lvが上限に到達していない場合は誤差が発生します。"
        />
      </p>
      <div className="flex flex-col gap-3 mt-2 pl-2 md:pl-4">
        {Array(MAIN_GIRLS_COUNT)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex items-center gap-24">
                <p className="text-base">{i + 1}:</p>
                <div>
                  <label className="label cursor-pointer">
                    <p className="text-base mr-2">レアリティUR</p>
                    <input
                      type="checkbox"
                      name={`isRarityUr${i + 1}`}
                      className="checkbox"
                      checked={
                        data.petitGirls.effects?.[i + 1]?.isRarityUr === true
                      }
                      onChange={onChange}
                      data-path={`petitGirls.effects.${i + 1}.isRarityUr`}
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pl-2 md:pl-4">
                {Array(EFFECTS_PER_GIRL)
                  .fill(0)
                  .map((_, j) => (
                    <div
                      key={j}
                      className="flex justify-end gap-2 items-center flex-none w-[266px] border border-base-300 rounded-box"
                    >
                      {data.petitGirls.effects?.[i]?.[j]?.id ? (
                        <>
                          <p className="flex-auto pl-3">
                            {
                              PETIT_GIRLS_EFFECTS_DATA?.[
                                Number(data.petitGirls.effects[i][j].id)
                              ]?.name
                            }
                          </p>
                          <button
                            onClick={() =>
                              handleClickEffectDeleteButton({
                                girlNum: i,
                                effectNum: j,
                              })
                            }
                            className="btn btn-sm btn-secondary"
                          >
                            削除
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() =>
                              handleClickEffectAddButton({
                                girlNum: i,
                                effectNum: j,
                              })
                            }
                            className="btn btn-sm btn-primary"
                          >
                            追加
                          </button>
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
      {effectModalOpen && (
        <EffectSelectModal
          onSubmit={handleEffectSelect}
          onClose={(selectedId, currentFilters) => {
            if (resolveEffectModal) {
              resolveEffectModal(undefined);
              setResolveEffectModal(null);
            }
            setSelectedState(selectedId);
            setFilterState(currentFilters);
            setEffectModalOpen(false);
          }}
          initialSelected={selectedState}
          initialFilterState={filterState}
        />
      )}
    </div>
  );
}

function EffectSelectModal({
  onSubmit,
  onClose,
  initialSelected = null,
  initialFilterState = {
    markerType: null,
    conditionDetail: null,
    effectType: null,
  },
}: EffectSelectModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(initialSelected);
  const [selectedMarkerType, setSelectedMarkerType] = useState<string | null>(
    initialFilterState.markerType
  );
  const [selectedConditionDetail, setSelectedConditionDetail] = useState<
    string | null
  >(initialFilterState.conditionDetail);
  const [selectedEffectType, setSelectedEffectType] = useState<string | null>(
    initialFilterState.effectType
  );

  const handleFilterChange =
    (setter: React.Dispatch<React.SetStateAction<string | null>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value === "未選択" ? null : e.target.value);
      setSelectedId(null);
    };

  const filteredOptions = Object.entries(PETIT_GIRLS_EFFECTS_DATA)
    .filter(
      ([_, value]) =>
        !selectedMarkerType || value.markerType === selectedMarkerType
    )
    .filter(
      ([_, value]) =>
        !selectedConditionDetail ||
        value.conditionDetail === selectedConditionDetail
    )
    .filter(
      ([_, value]) =>
        !selectedEffectType || value.effectType === selectedEffectType
    )
    .sort(([a], [b]) => Number(a) - Number(b));

  return (
    <dialog id="effect-modal" className="modal modal-open" open>
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() =>
              onClose(selectedId, {
                markerType: selectedMarkerType,
                conditionDetail: selectedConditionDetail,
                effectType: selectedEffectType,
              })
            }
          >
            ✕
          </button>
          <div className="flex flex-col gap-6 mt-6">
            {/* Marker Type */}
            <div>
              <div className="font-bold">マーカータイプ</div>
              <div className="flex gap-5 flex-wrap pl-2 md:pl-4 mt-3">
                {["未選択", "ピンク", "イエロー", "ブルー"].map((type) => (
                  <label key={type} className="label cursor-pointer flex items-center gap-2">
                    <input
                      type="radio"
                      name="markerType"
                      className="radio"
                      value={type}
                      onChange={handleFilterChange(setSelectedMarkerType)}
                      checked={
                        selectedMarkerType === (type === "未選択" ? null : type)
                      }
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Condition Detail */}
            <div>
              <div className="font-bold">発動条件</div>
              <div className="flex gap-5 flex-wrap pl-2 md:pl-4 mt-3">
                {[
                  "未選択",
                  "全タイプ",
                  "SWEETタイプ",
                  "COOLタイプ",
                  "POPタイプ",
                ].map((detail) => (
                  <label key={detail} className="label cursor-pointer flex items-center gap-2">
                    <input
                      type="radio"
                      name="conditionDetail"
                      className="radio"
                      value={detail}
                      onChange={handleFilterChange(setSelectedConditionDetail)}
                      checked={
                        selectedConditionDetail ===
                        (detail === "未選択" ? null : detail)
                      }
                    />
                    {detail}
                  </label>
                ))}
              </div>
            </div>

            {/* Effect Type */}
            <div>
              <div className="font-bold">効果タイプ</div>
              <div className="flex gap-5 flex-wrap pl-2 md:pl-4 mt-3">
                {["未選択", "攻援UP", "守援UP", "攻守UP"].map((type) => (
                  <label key={type} className="label cursor-pointer flex items-center gap-2">
                    <input
                      type="radio"
                      name="effectType"
                      className="radio"
                      value={type}
                      onChange={handleFilterChange(setSelectedEffectType)}
                      checked={
                        selectedEffectType === (type === "未選択" ? null : type)
                      }
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Select box */}
            <select
              name="effectSelect"
              className="select select-md select-bordered w-full mt-4"
              value={selectedId ?? ""}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option disabled value="">
                効果を選択してください
              </option>
              {filteredOptions.map(([key, value]) => (
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

            <div className="flex justify-center">
              <button
                type="button"
                className="btn btn-md w-32 btn-primary"
                onClick={() =>
                  selectedId !== null &&
                  filteredOptions.length !== 0 &&
                  onSubmit(selectedId, {
                    markerType: selectedMarkerType,
                    conditionDetail: selectedConditionDetail,
                    effectType: selectedEffectType,
                  })
                }
                disabled={selectedId === null}
              >
                決定
              </button>
            </div>
          </div>
        </form>
      </div>
      <div
        className="modal-backdrop"
        onClick={() =>
          onClose(selectedId, {
            markerType: selectedMarkerType,
            conditionDetail: selectedConditionDetail,
            effectType: selectedEffectType,
          })
        }
      >
        <button>close</button>
      </div>
    </dialog>
  );
}

function PetitGirlDetailsBlock({
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
  const isDetailsValidEvent = eventId === "board" ? true : false;
  return (
    <>
      {isDetailsValidEvent && (
        <div>
          <p className="text-base">
            <TextWithTooltip
              displayText="ぷちガールちゃん詳細 (マス効果用) "
              tipText="ぶちセンバツ内のぷちガールちゃんの詳細データを入力します。ここでの入力は散策♪聖櫻ワールドのマス効果を計算する時にのみ使用されます。"
            />
          </p>
          <div className="flex flex-col gap-3 mt-2 pl-2 md:pl-4">
            {Array(MAIN_GIRLS_COUNT)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <p className="text-base">{i + 1}:</p>
                  </div>
                  <div className="w-fit text-base ml-2 md:ml-4 border border-base-300 rounded-xl">
                    <div className="grid grid-cols-2 sm:grid-cols-4 bg-base-300 text-center text-xs font-bold py-1 rounded-t-xl">
                      <div>攻援力</div>
                      <div>タイプ</div>
                      <div>スキル効果</div>
                      <div></div>
                    </div>
                    {Array(GIRLS_COUNT_IN_GROUP)
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
    </>
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
      className={`grid grid-cols-2 sm:grid-cols-4 gap-2 px-1 py-2 odd:bg-base-200 even:bg-base-100 ${
        girlNum === 10 ? "rounded-b-xl" : ""
      }`}
    >
      {/* 攻援力 */}
      <div className="flex justify-center">
        <input
          type="text"
          inputMode="numeric"
          name={`attack_${groupNum}_${girlNum}`}
          className="input input-sm input-bordered max-w-24 md:w-24 text-right"
          value={formatNumber(
            data.petitGirls.details?.[groupNum]?.[girlNum]?.attack
          )}
          onChange={onChange}
          onBlur={onBlur}
          data-path={`petitGirls.details.${groupNum}.${girlNum}.attack`}
        />
      </div>
      {/* タイプ */}
      <div className="flex justify-center">
        <select
          name={`type_${groupNum}_${girlNum}`}
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
            name={`skillTarget_${groupNum}_${girlNum}`}
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
              name={`skillValue_${groupNum}_${girlNum}`}
              min={0}
              className="input input-sm input-bordered max-w-20 md:w-20 text-right mr-6"
              value={
                data.petitGirls.details?.[groupNum]?.[girlNum]?.SkillValue ?? 0
              }
              onChange={onChange}
              onBlur={onBlur}
              data-path={`petitGirls.details.${groupNum}.${girlNum}.skillValue`}
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

export function PetitGirls({
  data,
  eventId,
  onChange,
  onBlur,
  setValueAtPath,
}: {
  data: DeckSimulatorData;
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setValueAtPath: (obj: {
    path: string;
    value: { [key: string | number]: unknown };
  }) => void;
}) {
  return (
    <>
      <section className="pl-1">
        <h2 className="text-lg font-bold">ぷちセンバツ</h2>
        <div className="flex flex-col gap-6 mt-4 pl-2 md:pl-4">
          <TotalPowerInputs
            data={data}
            eventId={eventId}
            onChange={onChange}
            onBlur={onBlur}
          />
          <EffectSelectionBlock
            data={data}
            onChange={onChange}
            setValueAtPath={setValueAtPath}
          />
          <PetitGirlDetailsBlock
            data={data}
            eventId={eventId}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
      </section>
    </>
  );
}
