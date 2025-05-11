import { DeckSimulatorCommonData } from "@/components/decksim/simulator/useDeckSimulatorData";
import { EVENT_ID_TO_NAME_DICT } from "@/components/decksim/data/eventData";

import TextWithTooltip from "@/components/common/TextWithTooltip";

export function PlayerData({
  data,
  eventId,
  onChange,
  onBlur,
}: {
  data: DeckSimulatorCommonData;
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
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
  const isTypeMatchValidEvent =
    eventId !== "tower" && eventId !== "divrace" && eventId !== "board"
      ? true
      : false;
  const isClubPositionValidEvent =
    eventId !== "tower" && eventId !== "divrace" && eventId !== "board"
      ? true
      : false;
  const isMaxCostValidEvent =
    eventId === "raid-first" ||
    eventId === "raid-second" ||
    eventId === "raid-mega" ||
    eventId === "raidwar" ||
    eventId === "clubcup"
      ? true
      : false;
  const isClubItemValidEvent =
    eventId !== "divrace" && eventId !== "board" ? true : false;
  return (
    <>
      <section className="pl-1">
        <h2 className="text-lg font-bold">
          プレイヤーデータ・部活データ [共通設定]
        </h2>
        <p className="text-sm mt-4 mb-6 pl-4">
          こちらは共通設定です。ここでの変更は他のページにも反映されます。
        </p>
        {isTypeMatchValidEvent && (
          <div className="flex flex-col gap-6 mt-4 pl-2 md:pl-4">
            <div className="flex items-center gap-2 md:gap-4">
              <p className="text-base">自身のタイプ</p>
              <select
                name="playerType"
                className={`select select-sm select-bordered ${getBgClass(
                  data.playerData.playerType
                )}`}
                value={data.playerData.playerType ?? "SWEETタイプ"}
                onChange={onChange}
                data-path="playerData.playerType"
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
          </div>
        )}
        {isClubPositionValidEvent && (
          <div className="flex flex-col gap-6 mt-4 pl-2 md:pl-4">
            <div className="flex items-center gap-2 md:gap-4">
              <p className="text-base">部活役職</p>
              <select
                name="clubPosition"
                className="select select-sm select-bordered"
                value={data.playerData.clubPosition ?? "member"}
                onChange={onChange}
                data-path="playerData.clubPosition"
              >
                <option value="leader">部長</option>
                <option value="subLeader">副部長</option>
                <option value="attackCaptain">攻キャプテン</option>
                <option value="defenseCaptain">守キャプテン</option>
                <option value="member">部員</option>
              </select>
            </div>
          </div>
        )}
        {isMaxCostValidEvent && (
          <div className="flex flex-col gap-6 mt-4 pl-2 md:pl-4">
            <div className="flex items-center gap-2 md:gap-4">
              <p className="text-base">
                <TextWithTooltip
                  displayText="攻コスト(最大)"
                  tipText="プレイヤーの攻コストの最大値を入力します。センバツの使用コストではなく最大値です。"
                />
              </p>
              <input
                type="number"
                inputMode="numeric"
                name="maxAttackCost"
                min={1}
                className="input input-sm input-bordered max-w-20 md:w-20 text-right"
                value={data.playerData.maxAttackCost ?? 1000}
                onChange={onChange}
                onBlur={onBlur}
                data-path="playerData.maxAttackCost"
              />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2 mt-4 pl-2 md:pl-4">
          <p className="text-base">メンズコロンLv</p>
          <div className="w-fit text-base pl-2 md:pl-4">
            <div className="grid grid-cols-3 text-center text-xs font-bold rounded-t-xl">
              <div className="bg-sweet w-24 py-1 rounded-tl-xl">SWEET</div>
              <div className="bg-cool w-24 py-1">COOL</div>
              <div className="bg-pop w-24 py-1 rounded-tr-xl">POP</div>
            </div>
            <div className="grid grid-cols-3 gap-2 px-1 py-2 odd:bg-base-300 even:bg-base-200 rounded-b-xl">
              <div className="flex justify-center">
                <input
                  type="number"
                  inputMode="numeric"
                  name="mensCologneSweetLevel"
                  min={0}
                  max={100}
                  className="input input-sm input-bordered max-w-20 md:w-20 text-right"
                  value={data.playerData.mensCologne.sweet.level ?? 0}
                  onChange={onChange}
                  onBlur={onBlur}
                  data-path="playerData.mensCologne.sweet.level"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="number"
                  inputMode="numeric"
                  name="mensCologneCoolLevel"
                  min={0}
                  max={100}
                  className="input input-sm input-bordered max-w-20 md:w-20 text-right"
                  value={data.playerData.mensCologne.cool.level ?? 0}
                  onChange={onChange}
                  onBlur={onBlur}
                  data-path="playerData.mensCologne.cool.level"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="number"
                  inputMode="numeric"
                  name="mensColognePopLevel"
                  min={0}
                  max={100}
                  className="input input-sm input-bordered max-w-20 md:w-20 text-right"
                  value={data.playerData.mensCologne.pop.level ?? 0}
                  onChange={onChange}
                  onBlur={onBlur}
                  data-path="playerData.mensCologne.pop.level"
                />
              </div>
            </div>
          </div>
        </div>
        {isClubItemValidEvent && (
          <div className="flex flex-col gap-2 mt-4 pl-2 md:pl-4">
            <p className="text-base">
              <TextWithTooltip
                displayText="部活設備"
                tipText="所属している部活で部活設備が購入済みの場合はチェックを入れます。未購入の場合はチェックを外します。"
              />
            </p>
            <div className="w-fit text-base pl-2 md:pl-4">
              <div className="grid grid-cols-3 text-center text-xs font-bold rounded-t-xl">
                <div className="bg-sweet w-24 py-1 rounded-tl-xl">SWEET</div>
                <div className="bg-cool w-24 py-1">COOL</div>
                <div className="bg-pop w-24 py-1 rounded-tr-xl">POP</div>
              </div>
              <div className="grid grid-cols-3 gap-2 px-1 py-2 odd:bg-base-300 even:bg-base-200 rounded-b-xl">
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    name="clubItemSweet"
                    className="checkbox"
                    checked={data.playerData.clubItem.sweet.isValid === true}
                    onChange={onChange}
                    data-path="playerData.clubItem.sweet.isValid"
                  />
                </div>
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    name="clubItemCool"
                    className="checkbox"
                    checked={data.playerData.clubItem.cool.isValid === true}
                    onChange={onChange}
                    data-path="playerData.clubItem.cool.isValid"
                  />
                </div>
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    name="clubItemPop"
                    className="checkbox"
                    checked={data.playerData.clubItem.pop.isValid === true}
                    onChange={onChange}
                    data-path="playerData.clubItem.pop.isValid"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
