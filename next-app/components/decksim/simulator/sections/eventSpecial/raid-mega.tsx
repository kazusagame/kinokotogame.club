import { DeckSimulatorData } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";

import TextWithTooltip from "@/components/common/TextWithTooltip";
import { formatNumber } from "@/lib/formatNumber";

export function RaidMegaSpecialSection({
  data,
  onChange,
  onBlur,
}: {
  data: DeckSimulatorData;
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
      : "bg-sweet";

  return (
    <section className="pl-1">
      <h2 className="text-lg font-bold">イベント固有</h2>
      <div className="flex flex-col gap-6 mt-4 pl-0 sm:pl-2 md:pl-4">
        <div className="flex items-center gap-2 md:gap-4">
          <p className="text-base">SP応援効果</p>
          <input
            type="text"
            inputMode="numeric"
            name="specialGirlsEffect"
            className="input input-sm input-bordered max-w-28 md:w-28 text-right"
            value={formatNumber(
              data?.eventSpecial?.["raid-mega"]?.specialGirlsEffect
            )}
            onChange={onChange}
            onBlur={onBlur}
            data-path="eventSpecial.raid-mega.specialGirlsEffect"
          />
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <p className="text-base">悪男のタイプ</p>
          <select
            name="enemyType"
            className={`select select-sm select-bordered ${getBgClass(
              data?.eventSpecial?.["raid-mega"]?.enemyType
            )}`}
            value={
              data?.eventSpecial?.["raid-mega"]?.enemyType ?? "SWEETタイプ"
            }
            onChange={onChange}
            data-path="eventSpecial.raid-mega.enemyType"
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
        <div className="flex items-center gap-2 md:gap-4">
          <p className="text-base">アタック種別</p>
          <select
            name="attackType"
            className="select select-sm select-bordered"
            value={
              data?.eventSpecial?.["raid-mega"]?.attackType ?? "元気炭酸アメ"
            }
            onChange={onChange}
            data-path="eventSpecial.raid-mega.attackType"
          >
            <option value="元気炭酸アメ">ハート1個 (元気炭酸アメ)</option>
            <option value="元気炭酸">ハート6個 (元気炭酸)</option>
            <option value="勇気炭酸">ハート12個 (勇気炭酸)</option>
          </select>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <p className="text-base">
            <TextWithTooltip
              displayText="攻援力UP"
              tipText="ヒーロー声援によるガールの攻援力UP合計値を指定します。上限は 100 % です。"
            />
          </p>
          <div className="relative w-fit">
            <input
              type="number"
              inputMode="numeric"
              name="attackUpBuff"
              min={-100}
              max={100}
              className="input input-sm input-bordered max-w-20 md:w-20 text-right mr-7"
              value={data?.eventSpecial?.["raid-mega"]?.attackUpBuff ?? 100}
              onChange={onChange}
              onBlur={onBlur}
              data-path="eventSpecial.raid-mega.attackUpBuff"
            />
            <span className="absolute right-1 top-1/2 -translate-y-1/2">%</span>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <p className="text-base">
            <TextWithTooltip
              displayText="守備力DOWN"
              tipText="ヒーロー声援によるメガ悪男の守備力DOWN合計値を指定します。上限は 50 % です。"
            />
          </p>
          <div className="relative w-fit">
            <input
              type="number"
              inputMode="numeric"
              name="defenseDownDeBuff"
              min={-50}
              max={50}
              className="input input-sm input-bordered max-w-20 md:w-20 text-right mr-7"
              value={data?.eventSpecial?.["raid-mega"]?.defenseDownDeBuff ?? 50}
              onChange={onChange}
              onBlur={onBlur}
              data-path="eventSpecial.raid-mega.defenseDownDeBuff"
            />
            <span className="absolute right-1 top-1/2 -translate-y-1/2">%</span>
          </div>
        </div>
        <div className="flex items-center">
          <label className="label cursor-pointer pl-0 pt-1 pb-1">
            <p className="text-base mr-2 md:mr-4">
              <TextWithTooltip
                displayText="結果を獲得ポイントで表示する"
                tipText="チェックを入れると計算結果が発揮値表示から獲得ポイント表示に変わります。ただし、実際のゲーム中では残りのHPを上回る分はポイントになりません。"
              />
            </p>
            <input
              type="checkbox"
              name="isConvertPoint"
              className="checkbox checkbox-md"
              checked={
                data?.eventSpecial?.["raid-mega"]?.isConvertPoint === true
              }
              onChange={onChange}
              data-path="eventSpecial.raid-mega.isConvertPoint"
            />
          </label>
        </div>
      </div>
    </section>
  );
}
