import { useState, useId } from "react";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import {
  DeckSimulatorData,
  DeckSimulatorResult,
} from "@/components/decksim/simulator/useDeckSimulatorData";
import { PRECIOUS_SCENES_DATA } from "@/components/decksim/data/preciousScenesData";
import { MAX_PRECIOUS_SCENES_NUM } from "@/components/decksim/simulator/globalConfig";

import TextWithTooltip from "@/components/common/TextWithTooltip";
import { SortableItem } from "@/components/common/SortableItem";
import { formatNumber } from "@/lib/formatNumber";
import { removeKeyAndReindex } from "@/lib/removeKeyAndReindex";

type SceneSelectModalProps = {
  title: string;
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
  const typeIndex = type === "攻援" ? "attack" : "defense";
  const sceneData = data.preciousScenes?.[typeIndex] ?? {};
  const sceneCount = Object.keys(sceneData).length;
  const summaryData = summary.summaries.preciousScenes?.[typeIndex] ?? {};

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
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

  const handleAddButton = async () => {
    if (modalOpen) return;
    setModalTitle("新規追加");
    const result = await openSelectModal();
    if (result.id !== null && result.rarity !== null) {
      setValueAtPath({
        path: `preciousScenes.${typeIndex}.${sceneCount + 1}`,
        value: { id: result.id, rarity: result.rarity },
      });
    }
  };

  const handleEditButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (modalOpen) return;
    const key = e.currentTarget.dataset.key;
    if (!key) return;
    setModalTitle(`編集: ${key}`);
    setSelectedState(sceneData[Number(key)]);
    const result = await openSelectModal();
    if (result.id !== null && result.rarity !== null) {
      setValueAtPath({
        path: `preciousScenes.${typeIndex}.${key}`,
        value: { id: result.id, rarity: result.rarity },
      });
    }
  };

  const handleDeleteButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.dataset.key;
    const newData = removeKeyAndReindex(
      sceneData,
      Number(key)
    ) as DeckSimulatorData["preciousScenes"][typeof typeIndex];
    if (newData === undefined) return;
    setValueAtPath({
      path: `preciousScenes.${typeIndex}`,
      value: newData,
    });
  };

  const handleReorder = (
    newData: NonNullable<
      DeckSimulatorData["preciousScenes"]["attack" | "defense"]
    >
  ) => {
    setValueAtPath({
      path: `preciousScenes.${typeIndex}`,
      value: newData,
    });
  };

  return (
    <section className="pl-1">
      <h2 className="text-lg font-bold">プレシャスシーン</h2>
      <div className="flex flex-col gap-6 mt-4 pl-0 sm:pl-2 md:pl-4">
        <RegisteredPreciousScenesBlock
          typeIndex={typeIndex}
          sceneData={sceneData}
          sceneCount={sceneCount}
          summaryData={summaryData}
          onChange={onChange}
          onBlur={onBlur}
          handleEditButton={handleEditButton}
          handleDeleteButton={handleDeleteButton}
          handleReorder={handleReorder}
        />
        <AddPreciousScenesBlock
          sceneCount={sceneCount}
          handleAddButton={handleAddButton}
        />
      </div>
      {modalOpen && (
        <SceneSelectModal
          title={modalTitle}
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
          initialFilterState={
            modalTitle === "追加"
              ? filterState
              : {
                  initialRarity: null,
                  effectTarget: null,
                  effectType: null,
                }
          }
        />
      )}
    </section>
  );
}

function RegisteredPreciousScenesBlock({
  typeIndex,
  sceneData = {},
  sceneCount,
  summaryData,
  onChange,
  onBlur,
  handleEditButton,
  handleDeleteButton,
  handleReorder,
}: {
  typeIndex: "attack" | "defense";
  sceneData: DeckSimulatorData["preciousScenes"]["attack" | "defense"];
  sceneCount: number;
  summaryData: DeckSimulatorResult["summaries"]["preciousScenes"][
    | "attack"
    | "defense"];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleEditButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDeleteButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleReorder: (
    newScenesData: NonNullable<
      DeckSimulatorData["preciousScenes"]["attack" | "defense"]
    >
  ) => void;
}) {
  const orderedKeys = Object.keys(sceneData);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 10,
      },
    })
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;
    if (active.id !== over.id) {
      const oldIndex = orderedKeys.indexOf(active.id.toString());
      const newIndex = orderedKeys.indexOf(over.id.toString());
      const newOrder = arrayMove(orderedKeys, oldIndex, newIndex);

      // 新しい順番で並び替えたデータを作成
      const newScenesData: typeof sceneData = {};
      newOrder.forEach((key, i) => {
        newScenesData[i + 1] = sceneData[Number(key)];
      });
      handleReorder(newScenesData);
    }
  };

  const gridColumnCss = "md:grid-cols-[40px_200px_30px_80px_90px_65px_65px]";

  return (
    <div className="text-base border border-base-300 rounded-xl">
      <div
        className={`grid grid-cols-3 ${gridColumnCss} gap-3 bg-base-300 text-center text-xs font-bold py-1 rounded-t-xl`}
      >
        <div>No.</div>
        <div>名称</div>
        <div>レア</div>
        <div className="flex justify-center items-center">
          <TextWithTooltip
            displayText="人数"
            tipText="最大効果発揮条件に「特定の～ガール」や「様々な～ガール」の文があるシーンにおいて、そのガールのカウント数値を入力します。その他のシーンでは入力欄は表示されません。未入力のままの場合は最大効果発揮条件を満たしているものと見なして最大効果値を計算に使用します。"
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
      {sceneCount === 0 ? (
        <div className="text-center text-sm font-bold py-4">
          まだ何も設定されていません
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={orderedKeys}
            strategy={verticalListSortingStrategy}
          >
            {orderedKeys.map((key) => {
              const value = sceneData[Number(key)];
              const summary = summaryData[Number(key)];
              const sceneProfile = PRECIOUS_SCENES_DATA[Number(value.id)];
              return (
                <SortableItem
                  key={key}
                  id={key}
                  classStrings={`grid grid-cols-4 md:grid-cols-6 ${gridColumnCss} gap-2 md:gap-3 min-h-10 text-xs md:text-sm py-1 odd:bg-base-200 even:bg-base-100`}
                  itemCount={sceneCount}
                >
                  <div className="flex items-center">{sceneProfile.name}</div>
                  <div className="flex justify-center items-center">{`星${value.rarity}`}</div>
                  <div className="flex justify-center items-center">
                    {sceneProfile.effectCondition ===
                      "特定のガールで編成するほど" ||
                    sceneProfile.effectCondition ===
                      "様々なガールで編成するほど" ? (
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
                    ) : sceneProfile.effectCondition ===
                      "Ex進展ガールが多いほど" ? (
                      <input
                        type="number"
                        inputMode="numeric"
                        name={`headcount_${key}`}
                        className="input input-sm input-bordered max-w-16 md:w-16 text-right"
                        value={summary?.estimatedCount ?? 0}
                        disabled
                      />
                    ) : (
                      <p>―</p>
                    )}
                  </div>
                  <div className="flex justify-center items-center">
                    {formatNumber(summary?.estimatedPower ?? 0)}
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      className="btn btn-xs md:btn-sm btn-primary"
                      data-key={key}
                      onClick={handleEditButton}
                    >
                      編集
                    </button>
                  </div>
                  <div className="flex justify-center items-center">
                    <button
                      className="btn btn-xs md:btn-sm btn-secondary"
                      data-key={key}
                      onClick={handleDeleteButton}
                    >
                      削除
                    </button>
                  </div>
                </SortableItem>
              );
            })}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

function AddPreciousScenesBlock({
  sceneCount,
  handleAddButton,
}: {
  sceneCount: number;
  handleAddButton: () => void;
}) {
  const isSceneCountFull = sceneCount >= MAX_PRECIOUS_SCENES_NUM;
  return (
    <>
      <div className="pl-4">
        <button
          type="button"
          className="btn btn-md w-24 btn-primary"
          onClick={() => handleAddButton()}
          disabled={isSceneCountFull}
        >
          追加する
        </button>
      </div>
    </>
  );
}

function SceneSelectModal({
  title,
  onSubmit,
  onClose,
  initialSelected,
  initialFilterState,
}: SceneSelectModalProps) {
  const modalId = useId();
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
    <dialog id={modalId} className="modal modal-open" open>
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
            <h2 className="text-lg font-bold">{title}</h2>
            {/* 初期レアリティ */}
            <div>
              <label className="label">初期レアリティ</label>
              <div className="flex gap-5 flex-wrap pl-0 sm:pl-2 md:pl-4">
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
              <label className="label">効果対象</label>
              <div className="flex gap-5 flex-wrap pl-0 sm:pl-2 md:pl-4">
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
              <label className="label">効果タイプ</label>
              <div className="flex gap-5 flex-wrap pl-0 sm:pl-2 md:pl-4">
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
