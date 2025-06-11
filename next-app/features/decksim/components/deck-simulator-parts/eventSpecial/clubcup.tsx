import { DeckSimulatorData } from "@/features/decksim/type-definitions/DeckSimulatorData";

import TextWithTooltip from "@/components/TextWithTooltip";

export function ClubcupSpecialSection({
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
  const isConvertPoint =
    data?.eventSpecial?.clubcup?.isConvertPoint === undefined
      ? false
      : data.eventSpecial.clubcup.isConvertPoint;

  return (
    <section className="pl-1">
      <h2 className="text-lg font-bold">イベント固有</h2>
      <div className="flex flex-col gap-6 mt-4 pl-0 sm:pl-2 md:pl-4">
        <div className="flex items-center gap-2 md:gap-4">
          <p className="text-base">
            <TextWithTooltip
              displayText="攻援力UP"
              tipText="コンボや、マイク、部長の喝の効果による攻援力UPボーナスの数値を入力します。上限は 50 ％ です。"
            />
          </p>
          <div className="relative w-fit">
            <input
              type="number"
              inputMode="numeric"
              name="attackUpBonus"
              min={0}
              max={50}
              className="input input-sm input-bordered max-w-16 md:w-16 text-right mr-7"
              value={data?.eventSpecial?.clubcup?.attackUpBonus ?? 50}
              onChange={onChange}
              onBlur={onBlur}
              data-path="eventSpecial.clubcup.attackUpBonus"
            />
            <span className="absolute right-1 top-1/2 -translate-y-1/2">%</span>
          </div>
        </div>
        <div className="flex items-center">
          <label className="label cursor-pointer pl-0 pt-1 pb-1">
            <p className="text-base mr-2 md:mr-4">
              <TextWithTooltip
                displayText="勝利後ボーナス"
                tipText="誰かとのバトル勝利後に10分間、発生する攻援力ボーナス（10%）を加算する場合はチェックを入れます。"
              />
            </p>
            <input
              type="checkbox"
              name="isWinBonus"
              className="checkbox checkbox-md"
              checked={data?.eventSpecial?.clubcup?.isWinBonus ?? true}
              onChange={onChange}
              data-path="eventSpecial.clubcup.isWinBonus"
            />
          </label>
        </div>
        <div className="flex items-center">
          <label className="label cursor-pointer pl-0 pt-1 pb-1">
            <p className="text-base mr-2 md:mr-4">
              <TextWithTooltip
                displayText="結果を獲得ポイントで表示する"
                tipText="チェックを入れると計算結果が発揮値表示から獲得ポイント表示に変わります。"
              />
            </p>
            <input
              type="checkbox"
              name="isConvertPoint"
              className="checkbox checkbox-md"
              checked={data?.eventSpecial?.clubcup?.isConvertPoint === true}
              onChange={onChange}
              data-path="eventSpecial.clubcup.isConvertPoint"
            />
          </label>
        </div>

        {/* 以下は獲得ポイント表示の場合だけ表示する */}
        <div
          className={`flex flex-wrap items-center gap-2 md:gap-4 ${
            isConvertPoint ? "" : "opacity-10"
          }`}
        >
          <p className="text-base">
            <TextWithTooltip
              displayText="勧誘ptUP"
              tipText="コンボや、看板、部長の喝、ハッスルの効果による勧誘ptUPボーナスの数値を入力します。上限は 200 ％ です。"
            />
          </p>
          <div className="relative w-fit">
            <input
              type="number"
              inputMode="numeric"
              name="pointUpBonus"
              min={0}
              max={200}
              className="input input-sm input-bordered max-w-20 md:w-20 text-right mr-7"
              value={data?.eventSpecial?.clubcup?.pointUpBonus ?? 200}
              onChange={onChange}
              onBlur={onBlur}
              data-path="eventSpecial.clubcup.pointUpBonus"
            />
            <span className="absolute right-1 top-1/2 -translate-y-1/2">%</span>
          </div>
        </div>
        <div
          className={`flex flex-wrap items-center gap-2 md:gap-4 ${
            isConvertPoint ? "" : "opacity-10"
          }`}
        >
          <p className="text-base">炭酸本数</p>
          <select
            name="attackType"
            className="select select-sm select-bordered"
            value={data?.eventSpecial?.clubcup?.attackType ?? "全力勧誘"}
            onChange={onChange}
            data-path="eventSpecial.clubcup.attackType"
          >
            <option value="全力勧誘">1本 (全力勧誘)</option>
            <option value="全力勧誘×3">3本 (全力勧誘×3)</option>
          </select>
        </div>
        <div
          className={`flex flex-wrap items-center gap-2 md:gap-4 ${
            isConvertPoint ? "" : "opacity-10"
          }`}
        >
          <p className="text-base">SP応援効果 (割合)</p>
          <div className="relative w-fit">
            <input
              type="number"
              inputMode="numeric"
              name="specialGirlsEffectPercent"
              min={0}
              className="input input-sm input-bordered max-w-20 md:w-20 text-right mr-7"
              value={
                data?.eventSpecial?.clubcup?.specialGirlsEffectPercent ?? 0
              }
              onChange={onChange}
              onBlur={onBlur}
              data-path="eventSpecial.clubcup.specialGirlsEffectPercent"
            />
            <span className="absolute right-1 top-1/2 -translate-y-1/2">%</span>
          </div>
          <p className="text-base">/</p>
          <p className="text-base">(固定値)</p>
          <div className="relative w-fit">
            <input
              type="number"
              inputMode="numeric"
              name="specialGirlsEffectFix"
              min={0}
              className="input input-sm input-bordered max-w-20 md:w-20 text-right mr-7"
              value={data?.eventSpecial?.clubcup?.specialGirlsEffectFix ?? 0}
              onChange={onChange}
              onBlur={onBlur}
              data-path="eventSpecial.clubcup.specialGirlsEffectFix"
            />
            <span className="absolute right-1 top-1/2 -translate-y-1/2">
              pt
            </span>
          </div>
        </div>
        <div
          className={`flex items-center ${
            isConvertPoint ? "" : "opacity-10"
          }`}
        >
          <label className="label cursor-pointer pl-0 pt-1 pb-1">
            <p className="text-base mr-2 md:mr-4">
              <TextWithTooltip
                displayText="対戦相手が部長or副部長"
                tipText="対戦相手が部長もしくは副部長を想定する場合はチェックを入れます。獲得ptに少しだけボーナスが入ります。"
              />
            </p>
            <input
              type="checkbox"
              name="isRivalLeader"
              className="checkbox checkbox-md"
              checked={data?.eventSpecial?.clubcup?.isRivalLeader === true}
              onChange={onChange}
              data-path="eventSpecial.clubcup.isRivalLeader"
            />
          </label>
        </div>
        <div
          className={`flex items-center ${
            isConvertPoint ? "" : "opacity-10"
          }`}
        >
          <p className="text-base mr-2 md:mr-4">
            <TextWithTooltip
              displayText="対戦相手の声援効果 Down率"
              tipText="対戦相手の声援効果 Down率を入力します。数値が大きいほど獲得ptが下がります。"
            />
          </p>
          <div className="relative w-fit">
            <input
              type="number"
              inputMode="numeric"
              name="rivalSkillEffectDown"
              min={0}
              max={100}
              className="input input-sm input-bordered max-w-20 md:w-20 text-right mr-7"
              value={
                data?.eventSpecial?.clubcup?.rivalSkillEffectDown ?? 0
              }
              onChange={onChange}
              onBlur={onBlur}
              data-path="eventSpecial.clubcup.rivalSkillEffectDown"
            />
            <span className="absolute right-1 top-1/2 -translate-y-1/2">%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
