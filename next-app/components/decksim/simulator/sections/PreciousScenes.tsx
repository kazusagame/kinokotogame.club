import { useState } from "react";

import {
  DeckSimulatorData,
  DeckSimulatorResult,
} from "@/components/decksim/simulator/useDeckSimulatorData";
import { PRECIOUS_SCENES_DATA } from "@/components/decksim/data/preciousScenesData";

import TextWithTooltip from "@/components/common/TextWithTooltip";
import { formatNumber } from "@/lib/formatNumber";
import { removeKeyAndReindex } from "@/lib/removeKeyAndReindex";

export function PreciousScenes({
  data,
  summary,
  type,
  onChange,
  onBlur,
  setValueAtPath,
}: {
  data: DeckSimulatorData;
  summary: DeckSimulatorResult;
  type: "攻援" | "守援";
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
        <h2 className="text-lg font-bold">プレシャスシーン</h2>
        <div className="flex flex-col gap-6 mt-4 pl-2 md:pl-4">
          <RegisteredPreciousScenesBlock
            data={data}
            summary={summary}
            type={type}
            onChange={onChange}
            onBlur={onBlur}
            setValueAtPath={setValueAtPath}
          />
          <AddPreciousScenesBlock
            data={data}
            type={type}
            setValueAtPath={setValueAtPath}
          />
        </div>
      </section>
    </>
  );
}

function RegisteredPreciousScenesBlock({
  data,
  summary,
  type,
  onChange,
  onBlur,
  setValueAtPath,
}: {
  data: DeckSimulatorData;
  summary: DeckSimulatorResult;
  type: "攻援" | "守援";
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setValueAtPath: (obj: {
    path: string;
    value: { [key: string | number]: unknown };
  }) => void;
}) {
  const typeIndex = type === "攻援" ? "attack" : "defense";
  const registeredData =
    data.preciousScenes?.[type === "攻援" ? "attack" : "defense"] ?? {};
  const registeredCount = Object.keys(registeredData).length;
  const summaryData =
    summary.summaries.preciousScenes?.[
      type === "攻援" ? "attack" : "defense"
    ] ?? {};

  const handleDeleteButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.dataset.key;
    const newData = removeKeyAndReindex(registeredData, Number(key)) as DeckSimulatorData["preciousScenes"][typeof typeIndex];
    if (newData === undefined) return;
    setValueAtPath({
      path: `preciousScenes.${typeIndex}`,
      value: newData,
    });
  };

  return (
    <div className="w-fit text-base border border-base-300 rounded-xl">
      <div className="grid grid-cols-3 sm:grid-cols-[40px_200px_30px_80px_90px_90px] gap-3 bg-base-300 text-center text-xs font-bold py-1 rounded-t-xl">
        <div></div>
        <div>名称</div>
        <div>レア</div>
        <div className="flex justify-center items-center">
          <TextWithTooltip
            displayText="人数"
            tipText="最大効果発揮条件に「特定の～」や「様々な～」の文が入るシーンにおいてそのカウント数値を入力します。未入力のままの場合は最大効果発揮条件を満たしているものと見なして最大効果値を計算に使用します。"
          />
        </div>
        <div className="flex justify-center items-center">
          <TextWithTooltip
            displayText="表示近似値"
            tipText="主センバツおよび副センバツの入力値とプレシャスシーンの入力値から算出した効果合計値を自動で表示します。ゲーム内のセンバツ設定ページで表示される効果値と近似した値になります。正確に入力していれば誤差は1桁程度です。"
          />
        </div>
        <div></div>
      </div>
      {registeredCount === 0 ? (
        <div className="text-center text-sm font-bold py-4">
          まだ何も設定されていません
        </div>
      ) : (
        <>
          {Object.entries(registeredData).map(([key, value]) => {
            const sceneData = PRECIOUS_SCENES_DATA[Number(value.id)];
            return (
              <div
                key={key}
                className={`grid grid-cols-3 sm:grid-cols-[40px_200px_30px_80px_90px_90px] gap-3 min-h-10 text-sm py-1 odd:bg-base-200 even:bg-base-100 ${
                  registeredCount === Number(key) ? "rounded-b-xl" : ""
                }`}
              >
                <div className="flex justify-center items-center">{key}</div>
                <div className="flex items-center">{sceneData.name}</div>
                <div className="flex justify-center items-center">{`星${value.rarity}`}</div>
                <div className="flex justify-center items-center">
                  {sceneData.effectCondition === "特定のガールで編成するほど" ||
                  sceneData.effectCondition === "様々なガールで編成するほど" ? (
                    <input
                      type="number"
                      inputMode="numeric"
                      name={`headcount_${key}`}
                      min={0}
                      className="input input-sm input-bordered max-w-16 md:w-16 text-right"
                      value={value.headcount ?? 0}
                      onChange={onChange}
                      onBlur={onBlur}
                      data-path={`preciousScenes.${typeIndex}.${key}.headcount`}
                    />
                  ) : (
                    <p>―</p>
                  )}
                </div>
                <div className="flex justify-center items-center">
                  {formatNumber(
                    summaryData?.[Number(key)]?.estimatedPower ?? 0
                  )}
                </div>
                <div className="flex justify-center items-center">
                  <button
                    className="btn btn-sm btn-secondary"
                    data-key={key}
                    onClick={handleDeleteButton}
                  >
                    削除
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

type SceneSelectModalProps = {
  onSubmit: (
    selectedScene: SelectState,
    currentFilterState: FilterState
  ) => void;
  onClose: (selectedScene: SelectState, filterState: FilterState) => void;
  initialSelected: SelectState;
  initialFilterState: FilterState;
};

type SelectState = {
  id: string | null;
  rarity: string | null;
};

type FilterState = {
  initialRarity: string | null;
  effectTarget: string | null;
  effectType: string | null;
};

function AddPreciousScenesBlock({
  data,
  type,
  setValueAtPath,
}: {
  data: DeckSimulatorData;
  type: "攻援" | "守援";
  setValueAtPath: (obj: {
    path: string;
    value: { [key: string | number]: unknown };
  }) => void;
}) {
  const typeIndex = type === "攻援" ? "attack" : "defense";
  const scenesData = data.preciousScenes?.[typeIndex] ?? {};
  const scenesCount = Object.keys(scenesData).length;
  const isScenesCountFull = scenesCount >= 10;

  const [modalOpen, setModalOpen] = useState(false);
  const [resolveModal, setResolveModal] = useState<
    ((obj: { id: string | null; rarity: string | null }) => void) | null
  >(null);
  const [selectedState, setSelectedState] = useState<SelectState>({
    id: null,
    rarity: null,
  });
  const [filterState, setFilterState] = useState<FilterState>({
    initialRarity: null,
    effectTarget: null,
    effectType: null,
  });

  const handleClickAddButton = async () => {
    if (modalOpen) return;
    const result = await openSelectModal();
    if (result.id !== null && result.rarity !== null) {
      setValueAtPath({
        path: `preciousScenes.${typeIndex}.${scenesCount + 1}`,
        value: { id: result.id, rarity: result.rarity },
      });
    }
  };

  const openSelectModal = (): Promise<{
    id: string | null;
    rarity: string | null;
  }> => {
    setModalOpen(true);
    return new Promise((resolve) => {
      setResolveModal(() => resolve);
    });
  };

  const handleSceneSelect = (
    selectedScene: { id: string | null; rarity: string | null },
    currentFilterState: FilterState
  ) => {
    if (resolveModal) {
      resolveModal(selectedScene);
      setResolveModal(null);
    }
    setSelectedState(selectedScene);
    setFilterState(currentFilterState);
    setModalOpen(false);
  };

  return (
    <>
      <div className="pl-4">
        <button
          type="button"
          className="btn btn-md w-24 btn-primary"
          onClick={() => handleClickAddButton()}
          disabled={isScenesCountFull}
        >
          追加する
        </button>
      </div>
      {modalOpen && (
        <SceneSelectModal
          onSubmit={handleSceneSelect}
          onClose={(selectedScene, currentFilters) => {
            if (resolveModal) {
              resolveModal({ id: null, rarity: null });
              setResolveModal(null);
            }
            setSelectedState(selectedScene);
            setFilterState(currentFilters);
            setModalOpen(false);
          }}
          initialSelected={selectedState}
          initialFilterState={filterState}
        />
      )}
    </>
  );
}

function SceneSelectModal({
  onSubmit,
  onClose,
  initialSelected,
  initialFilterState,
}: SceneSelectModalProps) {
  const [selectedScene, setSelectedScene] =
    useState<SelectState>(initialSelected);
  const [selectedInitialRarity, setSelectedInitialRarity] = useState<
    string | null
  >(initialFilterState.initialRarity);
  const [selectedEffectTarget, setSelectedEffectTarget] = useState<
    string | null
  >(initialFilterState.effectTarget);
  const [selectedEffectType, setSelectedEffectType] = useState<string | null>(
    initialFilterState.effectType
  );

  const handleFilterChange =
    (setter: React.Dispatch<React.SetStateAction<string | null>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value === "未選択" ? null : e.target.value);
      setSelectedScene({ id: null, rarity: null });
    };

  const filteredOptions = Object.entries(PRECIOUS_SCENES_DATA)
    .filter(
      ([_, value]) =>
        !selectedInitialRarity || String(value.rarity) === selectedInitialRarity
    )
    .filter(
      ([_, value]) =>
        !selectedEffectTarget || value.effectTarget === selectedEffectTarget
    )
    .filter(
      ([_, value]) =>
        !selectedEffectType || value.effectType === selectedEffectType
    )
    .sort(([a], [b]) => Number(a) - Number(b));

  const selectedSceneInitialRarity =
    selectedScene.id === null
      ? 1
      : PRECIOUS_SCENES_DATA[Number(selectedScene.id)].rarity;
  const isSelectedScneHasRarity6 =
    selectedScene.id === null
      ? false
      : "value6" in PRECIOUS_SCENES_DATA[Number(selectedScene.id)];
  const rarityStartNum = isSelectedScneHasRarity6 ? 6 : 5;
  const rarityEndNum = selectedSceneInitialRarity;

  return (
    <dialog id="effect-modal" className="modal modal-open" open>
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() =>
              onClose(selectedScene, {
                initialRarity: selectedInitialRarity,
                effectTarget: selectedEffectTarget,
                effectType: selectedEffectType,
              })
            }
          >
            ✕
          </button>
          <div className="flex flex-col gap-6 mt-6">
            {/* 初期レアリティ */}
            <div>
              <div className="font-bold">初期レアリティ</div>
              <div className="flex gap-5 flex-wrap pl-2 md:pl-4 mt-3">
                {["未選択", "星1", "星2", "星3"].map((rarity) => (
                  <label
                    key={rarity}
                    className="label cursor-pointer flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="initialRarity"
                      className="radio"
                      value={rarity === "未選択" ? rarity : rarity.slice(-1)}
                      onChange={handleFilterChange(setSelectedInitialRarity)}
                      checked={
                        selectedInitialRarity ===
                        (rarity === "未選択" ? null : rarity.slice(-1))
                      }
                    />
                    {rarity}
                  </label>
                ))}
              </div>
            </div>

            {/* 効果対象 */}
            <div>
              <div className="font-bold">効果対象</div>
              <div className="flex gap-5 flex-wrap pl-2 md:pl-4 mt-3">
                {[
                  "未選択",
                  "全タイプ",
                  "SWEETタイプ",
                  "COOLタイプ",
                  "POPタイプ",
                ].map((target) => (
                  <label
                    key={target}
                    className="label cursor-pointer flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="effectTarget"
                      className="radio"
                      value={target}
                      onChange={handleFilterChange(setSelectedEffectTarget)}
                      checked={
                        selectedEffectTarget ===
                        (target === "未選択" ? null : target)
                      }
                    />
                    {target}
                  </label>
                ))}
              </div>
            </div>

            {/* 効果タイプ */}
            <div>
              <div className="font-bold">効果タイプ</div>
              <div className="flex gap-5 flex-wrap pl-2 md:pl-4 mt-3">
                {["未選択", "攻援UP", "守援UP", "攻守UP"].map((type) => (
                  <label
                    key={type}
                    className="label cursor-pointer flex items-center gap-2"
                  >
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

            <div className="flex flex-wrap gap-4 mt-4">
              {/* シーン選択 */}
              <select
                name="effectSelect"
                className="select select-md select-bordered"
                value={selectedScene.id ?? ""}
                onChange={(e) =>
                  setSelectedScene({
                    id: e.target.value,
                    rarity: null,
                  })
                }
              >
                <option disabled value="">
                  シーンを選択してください
                </option>
                {filteredOptions.map(([key, value]) => (
                  <option
                    key={key}
                    value={key}
                    className={
                      value.effectTarget === "SWEETタイプ"
                        ? "bg-sweet"
                        : value.effectTarget === "COOLタイプ"
                        ? "bg-cool"
                        : value.effectTarget === "POPタイプ"
                        ? "bg-pop"
                        : "bg-base-100"
                    }
                  >
                    {value.name}
                  </option>
                ))}
              </select>

              {/* レアリティ選択 */}
              <select
                name="effectSelect"
                className="select select-md select-bordered"
                value={selectedScene.rarity ?? ""}
                onChange={(e) =>
                  setSelectedScene({
                    id: selectedScene.id,
                    rarity: e.target.value.slice(-1),
                  })
                }
              >
                <option disabled value="">
                  現在のレアリティ
                </option>
                {Array(rarityStartNum - rarityEndNum + 1)
                  .fill(0)
                  .map((_, i) => {
                    const num = rarityStartNum - i;
                    return (
                      <option key={num} value={num}>
                        {`星${num}`}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                className="btn btn-md w-32 btn-primary"
                onClick={() =>
                  selectedScene !== null &&
                  filteredOptions.length !== 0 &&
                  onSubmit(selectedScene, {
                    initialRarity: selectedInitialRarity,
                    effectTarget: selectedEffectTarget,
                    effectType: selectedEffectType,
                  })
                }
                disabled={
                  selectedScene.id === null || selectedScene.rarity === null
                }
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
          onClose(selectedScene, {
            initialRarity: selectedInitialRarity,
            effectTarget: selectedEffectTarget,
            effectType: selectedEffectType,
          })
        }
      >
        <button>close</button>
      </div>
    </dialog>
  );
}
