import { useId } from "react";

import { DeckSimulatorData } from "@/components/decksim/simulator/useDeckSimulatorData";
import { EVENT_ID_TO_NAME_DICT } from "@/components/decksim/data/eventData";

import TextWithTooltip from "@/components/common/TextWithTooltip";

export function EventSpecial({
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
  return (
    <>
      {eventId === "raidwar" && (
        <RaidwarSpecialSection
          data={data}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    </>
  );
}

function RaidwarSpecialSection({
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
  const selectId = useId();
  const isSsrEnemy =
    data?.eventSpecial?.raidwar?.enemyType === undefined
      ? true
      : data.eventSpecial.raidwar.enemyType === "夜行性激レア"
      ? true
      : false;

  return (
    <section className="pl-1">
      <h2 className="text-lg font-bold">イベント固有</h2>
      <div className="flex flex-col gap-4 mt-4 pl-2 md:pl-4">
        <div className="flex items-center gap-2 md:gap-4">
          <p className="text-base">SP応援効果</p>
          <input
            type="text"
            inputMode="numeric"
            className="input input-sm input-bordered max-w-28 md:w-28 text-right"
            value={(
              data?.eventSpecial?.raidwar?.specialGirlsEffect ?? 0
            ).toLocaleString("ja-JP", {
              style: "decimal",
              useGrouping: true,
            })}
            onChange={onChange}
            onBlur={onBlur}
            data-path="eventSpecial.raidwar.specialGirlsEffect"
          />
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <p className="text-base">捕獲相手</p>
          <select
            id={`${selectId}-1`}
            className="select select-sm select-bordered"
            value={data?.eventSpecial?.raidwar?.enemyType ?? "夜行性激レア"}
            onChange={onChange}
            data-path="eventSpecial.raidwar.enemyType"
          >
            <option value="夜行性激レア">夜行性激レア</option>
            <option value="超レアLv50">超レア Lv50以下 (Pt×2.0)</option>
            <option value="超レアLv59">超レア Lv59 (Pt×2.5)</option>
            <option value="超レアLv64">超レア Lv64 (Pt×3.0)</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <p className="text-base">アタック種別</p>
          <select
            id={`${selectId}-2`}
            className="select select-sm select-bordered"
            value={data?.eventSpecial?.raidwar?.attackType ?? "元気炭酸アメ"}
            onChange={onChange}
            data-path="eventSpecial.raidwar.attackType"
          >
            <option value="元気炭酸アメ">ハート1個 (元気炭酸アメ)</option>
            <option value="元気炭酸">ハート6個 (元気炭酸)</option>
            <option value="本気炭酸">ハート12個 (本気炭酸)</option>
          </select>
          <p className="text-base">/</p>
          <p className="text-base">アタック回数</p>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            className="input input-sm input-bordered max-w-20 md:w-20 text-right"
            value={data?.eventSpecial?.raidwar?.attackNum ?? 1}
            onChange={onChange}
            onBlur={onBlur}
            data-path="eventSpecial.raidwar.attackNum"
          />
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <p className="text-base">コンボ数</p>
          <select
            id={`${selectId}-3`}
            className="select select-sm select-bordered"
            value={data?.eventSpecial?.raidwar?.comboNum ?? 50}
            onChange={onChange}
            data-path="eventSpecial.raidwar.comboNum"
          >
            <option value="0">0</option>
            <option value="6">6 (×1.3)</option>
            <option value="12">12 (×1.6)</option>
            <option value="18">18 (×1.9)</option>
            <option value="24">24 (×2.2)</option>
            <option value="30">30 (×2.4)</option>
            <option value="36">36 (×2.58)</option>
            <option value="42">42 (×2.76)</option>
            <option value="48">48 (×2.94)</option>
            <option value="50">50 ～ (×3.0)</option>
          </select>
        </div>
        <div
          className={`flex items-center gap-2 md:gap-4 ${
            isSsrEnemy ? "" : "opacity-10"
          }`}
        >
          <p className="text-base">
            <TextWithTooltip
              displayText="攻援力UP"
              tipText="夜行性激レア捕獲時の攻援力UPバフの数値を入力します。上限は 150 ％ です。"
            />
          </p>
          <div className="relative w-fit">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={150}
              className="input input-sm input-bordered max-w-20 md:w-20 text-right mr-7"
              value={data?.eventSpecial?.raidwar?.attackUpBuff ?? 150}
              onChange={onChange}
              onBlur={onBlur}
              data-path="eventSpecial.raidwar.attackUpBuff"
            />
            <span className="absolute right-1 top-1/2 -translate-y-1/2">%</span>
          </div>
        </div>
        <div
          className={`flex items-center gap-2 md:gap-4 ${
            isSsrEnemy ? "" : "opacity-10"
          }`}
        >
          <p className="text-base">
            <TextWithTooltip
              displayText="声援ダメージ合計"
              tipText="夜行性激レア捕獲時に、選択したアタック種別と回数で発揮するハンター声援センバツ内の声援ダメージの合計値を入力します。"
            />
          </p>
          <div className="relative w-fit">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              className="input input-sm input-bordered max-w-24 md:w-24 text-right mr-7"
              value={data?.eventSpecial?.raidwar?.totalSkillDamage ?? 0}
              onChange={onChange}
              onBlur={onBlur}
              data-path="eventSpecial.raidwar.totalSkillDamage"
            />
            <span className="absolute right-1 top-1/2 -translate-y-1/2">%</span>
          </div>
        </div>
        <div className="flex items-center">
          <label className="label cursor-pointer pl-0">
            <p className="text-base mr-2 md:mr-4">
              <TextWithTooltip
                displayText="結果を獲得ポイントで表示する"
                tipText="チェックを入れると計算結果が発揮値表示から獲得ポイント表示に変わります。ただし、実際のゲーム中では残りのHPを上回る分はポイントになりません。"
              />
            </p>
            <input
              id={`${selectId}-4`}
              type="checkbox"
              className="checkbox checkbox-md"
              checked={data?.eventSpecial?.raidwar?.isConvertPoint === true}
              onChange={onChange}
              data-path="eventSpecial.raidwar.isConvertPoint"
            />
          </label>
        </div>
      </div>
    </section>
  );
}
