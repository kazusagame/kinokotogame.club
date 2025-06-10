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
import CheckIcon from "@mui/icons-material/Check";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { DeckSimulatorData } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { DeckSimulatorResult } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorResult";
import { DeckSimulatorEventId } from "@/components/decksim/data/eventData";
import { MAX_SUB_GIRLS_NUM } from "@/components/decksim/simulator/globalConfig";
import { INIT_SKILL_LEVEL } from "@/components/decksim/data/skillData";

import Tooltip from "@mui/material/Tooltip";
import TextWithTooltip from "@/components/common/TextWithTooltip";
import { SortableItem } from "@/components/common/SortableItem";
import { formatNumber } from "@/lib/formatNumber";
import { removeKeyAndReindex } from "@/lib/removeKeyAndReindex";

type SelectModalProps = {
  eventId: DeckSimulatorEventId;
  type: "攻援" | "守援";
  title: string;
  onSubmit: (selected: SelectState) => void;
  onClose: (selected: SelectState) => void;
  initialSelected: SelectState;
};

type SelectState = NonNullable<
  DeckSimulatorData["subScenes"]["attack" | "defense"]
>[number];

export function SubScenes({
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
  const sceneData = data.subScenes?.[typeIndex] ?? {};
  const sceneCount = Object.keys(sceneData).length;
  const summaryData = summary.summaries.subScenes?.[typeIndex] ?? {};

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [resolveModal, setResolveModal] = useState<
    ((obj: SelectState | null) => void) | null
  >(null);
  const [selectedState, setSelectedState] = useState<SelectState>({
    basePower: "40000",
    type: "SWEETタイプ",
    rarity: "SSR",
    cost: "30",
    skillLv: String(INIT_SKILL_LEVEL),
    grade: "1年生",
    isClubMatch: false,
    isDate: false,
    isTouch: false,
    isBirthday: false,
    isLimitBreak: false,
    isBestFriend: false,
    isSpecial: false,
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
        path: `subScenes.${typeIndex}.${sceneCount + 1}`,
        value: result as unknown as { [key: string]: unknown },
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
    if (result !== null) {
      setValueAtPath({
        path: `subScenes.${typeIndex}.${key}`,
        value: result as unknown as { [key: string]: unknown },
      });
    }
  };

  const handleDeleteButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.dataset.key;
    const newData = removeKeyAndReindex(
      sceneData,
      Number(key)
    ) as DeckSimulatorData["subScenes"][typeof typeIndex];
    if (newData === undefined) return;
    setValueAtPath({
      path: `subScenes.${typeIndex}`,
      value: newData,
    });
  };

  const handleReorder = (
    newData: NonNullable<DeckSimulatorData["subScenes"]["attack" | "defense"]>
  ) => {
    setValueAtPath({
      path: `subScenes.${typeIndex}`,
      value: newData,
    });
  };

  const isValidEvent = eventId === "raid-mega" ? false : true;

  return (
    <>
      {isValidEvent && (
        <section className="pl-1">
          <h2 className="text-lg font-bold">副センバツ</h2>
          <div className="flex flex-col gap-6 mt-4 pl-0 sm:pl-2 md:pl-4">
            <RegisteredSubScenesBlock
              eventId={eventId}
              type={type}
              sceneData={sceneData}
              sceneCount={sceneCount}
              summaryData={summaryData}
              handleEditButton={handleEditButton}
              handleDeleteButton={handleDeleteButton}
              handleReorder={handleReorder}
            />
            <AddSubScenesBlock
              sceneCount={sceneCount}
              handleAddButton={handleAddButton}
            />
          </div>
          {modalOpen && (
            <SceneSelectModal
              eventId={eventId}
              type={type}
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

function SubScenesHeader({
  eventId,
  type,
  classStrings,
  isClubMatchValid,
  isSpecialValid,
}: {
  eventId: DeckSimulatorEventId;
  type: "攻援" | "守援";
  classStrings: string;
  isClubMatchValid: boolean;
  isSpecialValid: boolean;
}) {
  return (
    <div className={classStrings}>
      <div>No.</div>
      <div>{type === "攻援" ? "攻援力" : "守援力"}</div>
      <div>タイプ</div>
      <div>レアリティ</div>
      <div>コスト</div>
      <div>声援Lv</div>
      <div className="max-sm:hidden">学年</div>
      {isClubMatchValid && (
        <div className="flex flex-col justify-center items-center max-sm:hidden">
          <span>部活</span>
          <span>一致</span>
        </div>
      )}
      <div className="max-sm:hidden">デート中</div>
      <div className="max-sm:hidden">タッチ中</div>
      <div className="max-sm:hidden">誕生日</div>
      <div className="max-sm:hidden">Ex進展</div>
      <div className="max-sm:hidden">本命ガール</div>
      {isSpecialValid && eventId === "tower" && (
        <div className="max-sm:hidden">有利ガール</div>
      )}
      {isSpecialValid && eventId === "divrace" && (
        <div className="max-sm:hidden">予選ガール</div>
      )}
      <div>
        <Tooltip
          title="【声援を除いて】各種ボーナスや各種効果による補正後の応援力を自動で表示します。基本的にはこの数値が大きいガールほど効果が高いです。"
          arrow
          enterTouchDelay={250}
          leaveTouchDelay={5000}
        >
          <div className="flex justify-center items-center gap-1">
            <div className="flex flex-col justify-center items-center">
              <span>補正後</span>
              <span>個人</span>
            </div>
            <HelpOutlineIcon fontSize="small" />
          </div>
        </Tooltip>
      </div>
      <div>← 昇順</div>
      {eventId === "clubcup" && (
        <div className="max-sm:hidden">
          <Tooltip
            title="対抗戦における声援効果への加算値を自動で表示します。"
            arrow
            enterTouchDelay={250}
            leaveTouchDelay={5000}
          >
            <div className="flex justify-center items-center gap-1">
              <div className="flex flex-col justify-center items-center">
                <span>声援</span>
                <span>効果</span>
              </div>
              <HelpOutlineIcon fontSize="small" />
            </div>
          </Tooltip>
        </div>
      )}
      {eventId === "divrace" && (
        <>
          <div>
            <Tooltip
              title="選択した風向きアイテムの効果を加算した後の応援力を自動で表示します。"
              arrow
              enterTouchDelay={250}
              leaveTouchDelay={5000}
            >
              <div className="flex justify-center items-center gap-1">
                <div className="flex flex-col justify-center items-center">
                  <span>風向き</span>
                  <span>加算後</span>
                </div>
                <HelpOutlineIcon fontSize="small" />
              </div>
            </Tooltip>
          </div>
          <div>← 昇順</div>
        </>
      )}
      {eventId === "board" && (
        <>
          <div>
            <Tooltip
              title="天気効果やマス効果を加算した後の応援力を自動で表示します。"
              arrow
              enterTouchDelay={250}
              leaveTouchDelay={5000}
            >
              <div className="flex justify-center items-center gap-1">
                <div className="flex flex-col justify-center items-center">
                  <span>マス/天気</span>
                  <span>加算後</span>
                </div>
                <HelpOutlineIcon fontSize="small" />
              </div>
            </Tooltip>
          </div>
          <div>← 昇順</div>
        </>
      )}
      <div></div>
    </div>
  );
}

function RegisteredSubScenesBlock({
  eventId,
  type,
  sceneData = {},
  sceneCount,
  summaryData,
  handleEditButton,
  handleDeleteButton,
  handleReorder,
}: {
  eventId: DeckSimulatorEventId;
  type: "攻援" | "守援";
  sceneData: DeckSimulatorData["subScenes"]["attack" | "defense"];
  sceneCount: number;
  summaryData: DeckSimulatorResult["summaries"]["subScenes"][
    | "attack"
    | "defense"];
  handleEditButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDeleteButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleReorder: (
    newSkillData: NonNullable<
      DeckSimulatorData["subScenes"]["attack" | "defense"]
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
      const newSceneData: typeof sceneData = {};
      newOrder.forEach((key, i) => {
        newSceneData[i + 1] = sceneData[Number(key)];
      });
      handleReorder(newSceneData);
    }
  };

  const gridColumnCss =
    eventId === "raid-first" ||
    eventId === "raid-second" ||
    eventId === "raidwar"
      ? "xl:grid-cols-[45px_60px_45px_40px_40px_40px_45px_40px_40px_40px_40px_40px_40px_80px_40px_65px_65px]"
      : eventId === "clubcup"
      ? "xl:grid-cols-[45px_60px_45px_40px_40px_40px_45px_40px_40px_40px_40px_40px_80px_40px_60px_65px_65px]"
      : eventId === "tower"
      ? "xl:grid-cols-[45px_60px_45px_40px_40px_40px_45px_40px_40px_40px_40px_40px_40px_80px_40px_65px_65px]"
      : eventId === "divrace"
      ? "xl:grid-cols-[45px_60px_45px_40px_40px_40px_45px_40px_40px_40px_40px_40px_40px_80px_40px_80px_40px_65px_65px]"
      : eventId === "board"
      ? "xl:grid-cols-[45px_60px_45px_40px_40px_40px_45px_40px_40px_40px_40px_40px_80px_40px_80px_40px_65px_65px]"
      : "xl:grid-cols-[45px_60px_45px_40px_40px_40px_45px_40px_40px_40px_40px_40px_80px_40px_65px_65px]";
  const isClubMatchValid =
    eventId === "raid-first" ||
    eventId === "raid-second" ||
    eventId === "raidwar";
  const isSpecialValid = eventId === "tower" || eventId === "divrace";

  return (
    <div className="text-base border border-base-300 rounded-xl">
      <SubScenesHeader
        eventId={eventId}
        type={type}
        classStrings={`grid grid-cols-6 sm:grid-cols-9 ${gridColumnCss} gap-2 md:gap-3 bg-base-300 text-center text-xs font-bold py-1 rounded-t-xl`}
        isClubMatchValid={isClubMatchValid}
        isSpecialValid={isSpecialValid}
      />
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
            {orderedKeys.map((key, index) => {
              const value = sceneData[Number(key)];
              const summary = summaryData[Number(key)];
              return (
                <div
                  key={key}
                  className={`odd:bg-base-200 even:bg-base-100 ${
                    index + 1 === sceneCount && "rounded-b-xl"
                  }`}
                >
                  <SortableItem
                    id={key}
                    classStrings={`grid grid-cols-6 sm:grid-cols-9 ${gridColumnCss} gap-2 md:gap-3 min-h-10 text-xs md:text-sm py-1`}
                    itemCount={sceneCount}
                  >
                    <div className="flex justify-end items-center md:pr-2">
                      {formatNumber(value.basePower ?? 0)}
                    </div>
                    <div className="flex justify-center items-center">
                      {value.type.replace(/タイプ/, "")}
                    </div>
                    <div className="flex justify-center items-center">
                      {value.rarity}
                    </div>
                    <div className="flex justify-center items-center">
                      {value.cost}
                    </div>
                    <div className="flex justify-center items-center">
                      {value.skillLv}
                    </div>
                    <div className="flex justify-center items-center max-sm:hidden">
                      {value.grade}
                    </div>
                    {isClubMatchValid && (
                      <div className="flex justify-center items-center max-sm:hidden">
                        {value.isClubMatch && <CheckIcon fontSize="small" />}
                      </div>
                    )}
                    <div className="flex justify-center items-center max-sm:hidden">
                      {value.isDate && <CheckIcon fontSize="small" />}
                    </div>
                    <div className="flex justify-center items-center max-sm:hidden">
                      {value.isTouch && <CheckIcon fontSize="small" />}
                    </div>
                    <div className="flex justify-center items-center max-sm:hidden">
                      {value.isBirthday && <CheckIcon fontSize="small" />}
                    </div>
                    <div className="flex justify-center items-center max-sm:hidden">
                      {(value.isLimitBreak || value.rarity === "Luv") && (
                        <CheckIcon fontSize="small" />
                      )}
                    </div>
                    <div className="flex justify-center items-center max-sm:hidden">
                      {value.isBestFriend && <CheckIcon fontSize="small" />}
                    </div>
                    {isSpecialValid && (
                      <div className="flex justify-center items-center max-sm:hidden">
                        {value.isSpecial && <CheckIcon fontSize="small" />}
                      </div>
                    )}
                    <div className="flex justify-end items-center md:pr-2">
                      {formatNumber(summary?.estimatedPower ?? 0)}
                    </div>
                    <div className="flex justify-center items-center">
                      {summary?.estimatedPowerAscOrder ?? "―"}
                    </div>
                    {(eventId === "divrace" || eventId === "board") && (
                      <>
                        <div className="flex justify-end items-center md:pr-2">
                          {formatNumber(summary?.eventGimmickTotalPower ?? 0)}
                        </div>
                        <div className="flex justify-center items-center">
                          {summary?.eventGimmickTotalAscOrder ?? "―"}
                        </div>
                      </>
                    )}
                    {eventId === "clubcup" && (
                      <div className="flex justify-end items-center md:pr-2 max-sm:hidden">
                        {formatNumber(
                          summary?.skillEffect ?? 0,
                          "0.0",
                          "ja-JP",
                          {
                            style: "decimal",
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
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
                  {index + 1 !== sceneCount && index % 10 === 9 && (
                    <SubScenesHeader
                      eventId={eventId}
                      type={type}
                      classStrings={`grid grid-cols-6 sm:grid-cols-9 ${gridColumnCss} gap-2 md:gap-3 bg-base-300 text-center text-xs font-bold py-1`}
                      isClubMatchValid={isClubMatchValid}
                      isSpecialValid={isSpecialValid}
                    />
                  )}
                </div>
              );
            })}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

function AddSubScenesBlock({
  sceneCount,
  handleAddButton,
}: {
  sceneCount: number;
  handleAddButton: () => void;
}) {
  const isSceneCountFull = sceneCount >= MAX_SUB_GIRLS_NUM;
  return (
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
  );
}

function SceneSelectModal({
  eventId,
  type,
  title,
  onSubmit,
  onClose,
  initialSelected,
}: SelectModalProps) {
  const modalId = useId();
  const [selected, setSelected] = useState<SelectState>(initialSelected);

  const isClubMatchValid =
    eventId === "raid-first" ||
    eventId === "raid-second" ||
    eventId === "raidwar";
  const isSpecialValid = eventId === "tower" || eventId === "divrace";

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
              {/* 攻援力/守援力 */}
              <div className="flex flex-col">
                <label className="label">
                  <span className="label-text">
                    <TextWithTooltip
                      displayText={type === "攻援" ? "攻援力" : "守援力"}
                      tipText="各シーンに表示されている攻援力や守援力の数値をそのまま入力します。誕生日やデートなどによって変動する数値は含めず、元々の数値を入力します。"
                    />
                  </span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  name="basePower"
                  min={0}
                  className="input input-md input-bordered max-w-24 md:w-24 text-right"
                  value={formatNumber(selected.basePower)}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      basePower: e.target.value,
                    })
                  }
                />
              </div>

              {/* タイプ */}
              <div className="flex flex-col">
                <label className="label">
                  <span className="label-text">タイプ</span>
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

              {/* レアリティ */}
              <div className="flex flex-col">
                <label className="label">
                  <span className="label-text">レアリティ</span>
                </label>
                <select
                  name="rarity"
                  className="select select-md select-bordered"
                  value={selected.rarity}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      rarity: e.target.value as SelectState["rarity"],
                    })
                  }
                >
                  <option value="Luv">Luv</option>
                  <option value="UR">UR</option>
                  <option value="SSR">SSR</option>
                  <option value="SR">SR</option>
                </select>
              </div>

              {/* コスト */}
              <div className="flex flex-col">
                <label className="label">
                  <span className="label-text">コスト</span>
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  name="cost"
                  min={1}
                  className="input input-md input-bordered max-w-20 md:w-20 text-right"
                  value={selected.cost}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      cost: e.target.value,
                    })
                  }
                />
              </div>

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

              {/* 学年 */}
              <div className="flex flex-col">
                <label className="label">
                  <span className="label-text">
                    <TextWithTooltip
                      displayText="学年"
                      tipText="ガールの学年を選択します。ここでの選択はぷちガールちゃんの応援力効果と散策♪聖櫻ワールドでのマス効果の数値算出に使用されます。F"
                    />
                  </span>
                </label>
                <select
                  name="grade"
                  className="select select-md select-bordered"
                  value={selected.grade}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      grade: e.target.value as SelectState["grade"],
                    })
                  }
                >
                  <option value="1年生">1年生</option>
                  <option value="2年生">2年生</option>
                  <option value="3年生">3年生</option>
                  <option value="その他">その他</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {/* 部活一致 */}
              {isClubMatchValid && (
                <label className="label flex flex-col gap-2 items-center cursor-pointer">
                  <span className="label-text">
                    <TextWithTooltip
                      displayText="部活一致"
                      tipText="プレイヤーの所属する部活と部活タイプが一致するガールの場合はチェックを入れます。"
                    />
                  </span>
                  <input
                    type="checkbox"
                    name="isClubMatch"
                    className="checkbox checkbox-md"
                    checked={selected.isClubMatch === true}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        isClubMatch: e.target.checked,
                      })
                    }
                  />
                </label>
              )}

              {/* デート中 */}
              <label className="label flex flex-col gap-2 items-center cursor-pointer">
                <span className="label-text">
                  <TextWithTooltip
                    displayText="デート中"
                    tipText="デート中のガールの場合はチェックを入れます。"
                  />
                </span>
                <input
                  type="checkbox"
                  name="isDate"
                  className="checkbox checkbox-md"
                  checked={selected.isDate === true}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      isDate: e.target.checked,
                    })
                  }
                />
              </label>

              {/* タッチ中 */}
              <label className="label flex flex-col gap-2 items-center cursor-pointer">
                <span className="label-text">
                  <TextWithTooltip
                    displayText="タッチ中"
                    tipText="タッチボーナスが発動するガールの場合はチェックを入れます。"
                  />
                </span>
                <input
                  type="checkbox"
                  name="isTouch"
                  className="checkbox checkbox-md"
                  checked={selected.isTouch === true}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      isTouch: e.target.checked,
                    })
                  }
                />
              </label>

              {/* 誕生日 */}
              <label className="label flex flex-col gap-2 items-center cursor-pointer">
                <span className="label-text">
                  <TextWithTooltip
                    displayText="誕生日"
                    tipText="誕生日のガールの場合はチェックを入れます。"
                  />
                </span>
                <input
                  type="checkbox"
                  name="isBirthday"
                  className="checkbox checkbox-md"
                  checked={selected.isBirthday === true}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      isBirthday: e.target.checked,
                    })
                  }
                />
              </label>

              {/* Ex進展 */}
              <label className="label flex flex-col gap-2 items-center cursor-pointer">
                <span className="label-text">
                  <TextWithTooltip
                    displayText="Ex進展"
                    tipText="Ex進展済みのガールの場合はチェックを入れます。レアリティで Luv (ラブリー進展済み) を選択した場合は自動でチェックが入ります。"
                  />
                </span>
                {selected.rarity === "Luv" ? (
                  <input
                    type="checkbox"
                    name="isLimitBreak"
                    className="checkbox checkbox-md"
                    checked={true}
                    disabled
                  />
                ) : (
                  <input
                    type="checkbox"
                    name="isLimitBreak"
                    className="checkbox checkbox-md"
                    checked={selected.isLimitBreak === true}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        isLimitBreak: e.target.checked,
                      })
                    }
                  />
                )}
              </label>

              {/* 本命ガール */}
              <label className="label flex flex-col gap-2 items-center cursor-pointer">
                <span className="label-text">
                  <TextWithTooltip
                    displayText="本命ガール"
                    tipText="本命ガール（自身で設定したランキング等で表示されるシーン）の場合はチェックを入れます。ぷちセンバツの応援力効果に「本命ガールの攻守UP」が存在する場合にのみ計算結果に影響します。"
                  />
                </span>
                <input
                  type="checkbox"
                  name="isBestFriend"
                  className="checkbox checkbox-md"
                  checked={selected.isBestFriend === true}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      isBestFriend: e.target.checked,
                    })
                  }
                />
              </label>

              {/* 有利ガール / 予選ガール */}
              {isSpecialValid && (
                <label className="label flex flex-col gap-2 items-center cursor-pointer">
                  <span className="label-text">
                    {eventId === "tower" ? (
                      <TextWithTooltip
                        displayText="有利ガール"
                        tipText="聖櫻メモリアルストーリーにおいてそのステージの有利なガールの場合はチェックを入れます。"
                      />
                    ) : (
                      <TextWithTooltip
                        displayText="予選ガール"
                        tipText="課外活動コンテストの予選グループで選択したガールの場合はチェックを入れます。"
                      />
                    )}
                  </span>
                  <input
                    type="checkbox"
                    name="isSpecial"
                    className="checkbox checkbox-md"
                    checked={selected.isSpecial === true}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        isSpecial: e.target.checked,
                      })
                    }
                  />
                </label>
              )}
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
