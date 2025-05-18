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

import WarningIcon from "@mui/icons-material/Warning";
import Tooltip from "@mui/material/Tooltip";

import {
  DeckSimulatorData,
  DeckSimulatorResult,
} from "@/components/decksim/simulator/useDeckSimulatorData";
import { DeckSimulatorEventId } from "@/components/decksim/data/eventData";
import {
  INIT_SKILL_LEVEL,
  SKILL_DATA_PER_EVENT,
  SKILL_RATE_DATA,
} from "@/components/decksim/data/skillData";
import { MAX_SWITCH_OFF_GIRLS_NUM } from "@/components/decksim/simulator/globalConfig";

import TextWithTooltip from "@/components/common/TextWithTooltip";
import { SortableItem } from "@/components/common/SortableItem";
import { formatNumber } from "@/lib/formatNumber";
import { removeKeyAndReindex } from "@/lib/removeKeyAndReindex";

type SelectModalProps = {
  title: string;
  onSubmit: (selected: SelectState) => void;
  onClose: (selected: SelectState) => void;
  initialSelected: SelectState;
};

type SelectState = NonNullable<
  DeckSimulatorData["subSwitches"]["attack" | "defense"]
>[number];

export function SubSwitch({
  data,
  summary,
  eventId,
  type,
  setValueAtPath,
}: {
  data: DeckSimulatorData;
  summary: DeckSimulatorResult;
  eventId: DeckSimulatorEventId;
  type: "攻援" | "守援";
  setValueAtPath: (obj: {
    path: string;
    value: { [key: string | number]: unknown };
  }) => void;
}) {
  const typeIndex = type === "攻援" ? "attack" : "defense";
  const skillData = data.subSwitches?.[typeIndex] ?? {};
  const skillCount = Object.keys(skillData).length;
  const summaryData = summary.summaries.subSwitches?.[typeIndex] ?? {};
  const isSubSwitchValid = eventId !== "raid-mega";

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [resolveModal, setResolveModal] = useState<
    ((obj: SelectState | null) => void) | null
  >(null);
  const [selectedState, setSelectedState] = useState<SelectState>({
    skillLv: String(INIT_SKILL_LEVEL),
    target: "SWEETタイプ",
    range: "主のみ",
    subRange: String(0),
    type: "攻",
    strength: "特大",
  });

  const openSelectModal = (): Promise<SelectState | null> => {
    setModalOpen(true);
    return new Promise((resolve) => {
      setResolveModal(() => resolve);
    });
  };

  const handleGirlSelect = (selected: SelectState) => {
    if (resolveModal) {
      resolveModal(selected);
      setResolveModal(null);
    }
    setSelectedState(selected);
    setModalOpen(false);
  };

  const handleAddButton = async () => {
    if (modalOpen) return;
    setModalTitle("新規追加");
    const result = await openSelectModal();
    if (result !== null) {
      setValueAtPath({
        path: `subSwitches.${typeIndex}.${skillCount + 1}`,
        value: result,
      });
    }
  };

  const handleEditButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (modalOpen) return;
    const key = e.currentTarget.dataset.key;
    if (!key) return;
    setModalTitle(`編集: ${key}`);
    setSelectedState(skillData[Number(key)]);
    const result = await openSelectModal();
    if (result !== null) {
      setValueAtPath({
        path: `subSwitches.${typeIndex}.${key}`,
        value: result,
      });
    }
  };

  const handleDeleteButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.dataset.key;
    const newData = removeKeyAndReindex(
      skillData,
      Number(key)
    ) as DeckSimulatorData["subSwitches"][typeof typeIndex];
    if (newData === undefined) return;
    setValueAtPath({
      path: `subSwitches.${typeIndex}`,
      value: newData,
    });
  };

  const handleReorder = (
    newData: NonNullable<DeckSimulatorData["subSwitches"]["attack" | "defense"]>
  ) => {
    setValueAtPath({
      path: `subSwitches.${typeIndex}`,
      value: newData,
    });
  };

  return (
    <>
      {isSubSwitchValid && (
        <section className="pl-1">
          <h2 className="text-lg font-bold">
            副センバツ内のスイッチOFFガール 声援
          </h2>
          <div className="flex flex-col gap-6 mt-4 pl-0 sm:pl-2 md:pl-4">
            <RegisteredSubSwitchesBlock
              eventId={eventId}
              skillData={skillData}
              skillCount={skillCount}
              summaryData={summaryData}
              handleEditButton={handleEditButton}
              handleDeleteButton={handleDeleteButton}
              handleReorder={handleReorder}
            />
            <AddSubSwitchesBlock
              skillCount={skillCount}
              handleAddButton={handleAddButton}
            />
          </div>
          {modalOpen && (
            <SkillSelectModal
              title={modalTitle}
              onSubmit={handleGirlSelect}
              onClose={(selected) => {
                if (resolveModal) {
                  resolveModal(null);
                  setResolveModal(null);
                }
                setSelectedState(selected);
                setModalOpen(false);
              }}
              initialSelected={selectedState}
            />
          )}
        </section>
      )}
    </>
  );
}

function RegisteredSubSwitchesBlock({
  eventId,
  skillData = {},
  skillCount,
  summaryData,
  handleEditButton,
  handleDeleteButton,
  handleReorder,
}: {
  eventId: DeckSimulatorEventId;
  skillData: DeckSimulatorData["subSwitches"]["attack" | "defense"];
  skillCount: number;
  summaryData: DeckSimulatorResult["summaries"]["subSwitches"][
    | "attack"
    | "defense"];
  handleEditButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDeleteButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleReorder: (
    newSkillData: NonNullable<
      DeckSimulatorData["subSwitches"]["attack" | "defense"]
    >
  ) => void;
}) {
  const orderedKeys = Object.keys(skillData);
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
      const newSkillData: typeof skillData = {};
      newOrder.forEach((key, i) => {
        newSkillData[i + 1] = skillData[Number(key)];
      });
      handleReorder(newSkillData);
    }
  };

  const skillRates = Object.values(skillData).map((value) => {
    const target = value.target !== "全タイプ" ? "単タイプ" : "全タイプ";
    const range = value.range ?? "主＋副";
    const subRange =
      range === "主のみ"
        ? "副人数0"
        : Number(value.subRange) === 0
        ? "副人数0"
        : Number(value.subRange) === 1
        ? "副人数1"
        : "副人数2";
    const baseValue =
      SKILL_RATE_DATA[target]?.[range]?.[subRange]?.[value.type]?.[
        value.strength
      ]?.value;

    return baseValue ? baseValue + Number(value.skillLv) - 1 : 0;
  });
  const skillProbabilities =
    SKILL_DATA_PER_EVENT[eventId].skillProbabilitySubSwitchOff;

  const gridColumnCss =
    eventId !== "clubcup"
      ? "lg:grid-cols-[45px_40px_90px_55px_60px_60px_55px_75px_85px_75px_65px_65px]"
      : "lg:grid-cols-[45px_40px_90px_55px_60px_60px_55px_75px_85px_75px_75px_65px_65px]";

  return (
    <div className="text-base border border-base-300 rounded-xl">
      <div
        className={`grid grid-cols-4 md:grid-cols-6 ${gridColumnCss} gap-2 md:gap-3 bg-base-300 text-center text-xs font-bold py-1 rounded-t-xl`}
      >
        <div>No.</div>
        <div>声援Lv</div>
        <div>対象タイプ</div>
        <div>対象範囲</div>
        <div>対象副人数</div>
        <div>効果タイプ</div>
        <div>効果強度</div>
        <div className="flex justify-center items-center">
          <TextWithTooltip
            displayText="効果値"
            tipText="入力した声援Lvや声援の内容から算出した声援効果値を自動で表示します。"
          />
        </div>
        <div className="flex justify-center items-center">
          <TextWithTooltip
            displayText="発動時合計"
            tipText="声援が発動したときの効果合計値を自動で表示します。声援が掛かる対象の応援力 × 効果値 × 対象人数 × 補正。基本的にはこの数値が大きい声援ほど効果が高いです。"
          />
        </div>
        <div className="flex justify-center items-center">
          <TextWithTooltip
            displayText="発動率"
            tipText="声援が発動する確率を自動で表示します。声援の同時発動数には制限があるため、老番のガールほど発動率は低くなります。"
          />
        </div>
        {eventId === "clubcup" && (
          <div className="flex justify-center items-center">
            <TextWithTooltip
              displayText="声援効果"
              tipText="対抗戦における声援効果への加算値を自動で表示します。( 発動時合計 / 5,000) %。"
            />
          </div>
        )}
        <div></div>
      </div>
      {skillCount === 0 ? (
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
              const value = skillData[Number(key)];
              const summary = summaryData[Number(key)];
              const skillRate = skillRates[Number(key) - 1];
              const skillProbability = skillProbabilities[Number(key) - 1];
              return (
                <SortableItem
                  key={key}
                  id={key}
                  classStrings={`grid grid-cols-4 md:grid-cols-6 ${gridColumnCss} gap-2 md:gap-3 min-h-10 text-xs md:text-sm py-1 odd:bg-base-200 even:bg-base-100`}
                  itemCount={skillCount}
                >
                  <div className="flex justify-center items-center">
                    {value.skillLv}
                  </div>
                  <div className="flex justify-center items-center">
                    {value.target}
                  </div>
                  <div className="flex justify-center items-center">
                    {value.range}
                  </div>
                  {value.range === "主のみ" ? (
                    <div className="flex justify-center items-center">―</div>
                  ) : (
                    <div className="flex justify-center items-center">
                      {value.subRange}
                    </div>
                  )}
                  <div className="flex justify-center items-center">
                    {value.type}
                  </div>
                  <div className="flex justify-center items-center">
                    {value.strength}
                  </div>
                  {skillRates[Number(key) - 1] ? (
                    <div className="flex justify-end items-center pr-4">
                      {`${skillRate} %`}
                    </div>
                  ) : (
                    <Tooltip
                      title="選択したパラメータの組み合わせの効果値は未登録です（いずれかのパラメータが間違っているのかも？）"
                      arrow
                      enterTouchDelay={250}
                      leaveTouchDelay={5000}
                    >
                      <div className="flex justify-end items-center pr-4 bg-warning text-warning-content">
                        <WarningIcon />
                        <span className="ml-2">0 %</span>
                      </div>
                    </Tooltip>
                  )}
                  <div className="flex justify-end items-center pr-2">
                    {formatNumber(summary?.estimatedPower ?? 0)}
                  </div>
                  <div className="flex justify-end items-center pr-2">
                    {formatNumber(skillProbability ?? 0, "0.00", "ja-JP", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    %
                  </div>
                  {eventId === "clubcup" && (
                    <div className="flex justify-end items-center pr-2">
                      {formatNumber(
                        summary?.skillEffect ?? 0,
                        "0.00",
                        "ja-JP",
                        {
                          style: "decimal",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}{" "}
                      %
                    </div>
                  )}
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

function AddSubSwitchesBlock({
  skillCount,
  handleAddButton,
}: {
  skillCount: number;
  handleAddButton: () => void;
}) {
  const isSkillCountFull = skillCount >= MAX_SWITCH_OFF_GIRLS_NUM;
  return (
    <div className="pl-4">
      <button
        type="button"
        className="btn btn-md w-24 btn-primary"
        onClick={() => handleAddButton()}
        disabled={isSkillCountFull}
      >
        追加する
      </button>
    </div>
  );
}

function SkillSelectModal({
  title,
  onSubmit,
  onClose,
  initialSelected,
}: SelectModalProps) {
  const modalId = useId();
  const [selected, setSelected] = useState<SelectState>(initialSelected);

  return (
    <dialog id={modalId} className="modal modal-open" open>
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => onClose(selected)}
          >
            ✕
          </button>
          <div className="flex flex-col gap-6 mt-6">
            <h2 className="text-lg font-bold">{title}</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {/* 声援Lv */}
              <div className="flex flex-col">
                <label className="label">
                  <span className="label-text">声援Lv</span>
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  name="skillLv"
                  min={1}
                  className="input input-md input-bordered max-w-20 md:w-20 text-right"
                  value={selected.skillLv}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      skillLv: e.target.value,
                    })
                  }
                />
              </div>

              {/* 対象タイプ */}
              <div className="flex flex-col">
                <label className="label">
                  <span className="label-text">
                    <TextWithTooltip
                      displayText="対象タイプ"
                      tipText="どのタイプのガールに掛かる声援かを選択します。声援の説明の中に SWEETタイプ / COOLタイプ / POPタイプ のどれも記載がない場合は 全タイプ が対象です。"
                    />
                  </span>
                </label>
                <select
                  name="target"
                  className="select select-md select-bordered"
                  value={selected.target}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      target: e.target.value as SelectState["target"],
                    })
                  }
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
              </div>

              {/* 対象範囲 */}
              <div className="flex flex-col">
                <label className="label">
                  <span className="label-text">
                    <TextWithTooltip
                      displayText="対象範囲"
                      tipText="声援が掛かる対象が 主センバツ か 副センバツ か もしくは その両方か を選択します。声援の説明の中に指定がない場合は 主センバツ のみが対象です。"
                    />
                  </span>
                </label>
                <select
                  name="range"
                  className="select select-md select-bordered"
                  value={selected.range}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      range: e.target.value as SelectState["range"],
                    })
                  }
                >
                  <option value="主＋副">主＋副</option>
                  <option value="主のみ">主のみ</option>
                  <option value="副のみ">副のみ</option>
                </select>
              </div>

              {/* 対象副人数 */}
              <div className="flex flex-col">
                <label className="label">
                  <span className="label-text">
                    <TextWithTooltip
                      displayText="対象副人数"
                      tipText="声援が掛かる対象が 副センバツの上位何人までか を入力します。副センバツに効果が掛からない場合は入力不要です。"
                    />
                  </span>
                </label>
                {selected.range !== "主のみ" ? (
                  <input
                    type="number"
                    inputMode="numeric"
                    name="subRange"
                    min={1}
                    className="input input-md input-bordered max-w-20 md:w-20 text-right"
                    value={selected.subRange}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        subRange: e.target.value,
                      })
                    }
                  />
                ) : (
                  <input
                    type="number"
                    inputMode="numeric"
                    name="subRange"
                    min={0}
                    className="input input-md input-bordered max-w-20 md:w-20 text-right"
                    value={0}
                    disabled
                  />
                )}
              </div>

              {/* 効果タイプ */}
              <div className="flex flex-col">
                <label className="label">
                  <span className="label-text">効果タイプ</span>
                </label>
                <select
                  name="type"
                  className="select select-md select-bordered"
                  value={selected.type}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      type: e.target.value as SelectState["type"],
                    })
                  }
                >
                  <option value="攻">攻</option>
                  <option value="守">守</option>
                  <option value="攻守">攻守</option>
                </select>
              </div>

              {/* 強度 */}
              <div className="flex flex-col">
                <label className="label">
                  <span className="label-text">強度</span>
                </label>
                <select
                  name="range"
                  className="select select-md select-bordered"
                  value={selected.strength}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      strength: e.target.value as SelectState["strength"],
                    })
                  }
                >
                  <option value="特大">特大UP</option>
                  <option value="大">大UP</option>
                  <option value="中">中UP</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="button"
              className="btn btn-md w-32 btn-primary"
              onClick={() => selected !== null && onSubmit(selected)}
              disabled={false}
            >
              決定
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={() => onClose(selected)}>
        <button>close</button>
      </div>
    </dialog>
  );
}
