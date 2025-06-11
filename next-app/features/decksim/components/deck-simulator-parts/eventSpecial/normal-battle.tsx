import { DeckSimulatorData } from "@/features/decksim/type-definitions/DeckSimulatorData";

import TextWithTooltip from "@/components/TextWithTooltip";

export function NormalBattleSpecialSection({
  data,
  onChange,
}: {
  data: DeckSimulatorData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}) {
  return (
    <section className="pl-1">
      <h2 className="text-lg font-bold">イベント固有</h2>
      <div className="flex flex-col gap-6 mt-4 pl-0 sm:pl-2 md:pl-4">
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
              checked={data?.eventSpecial?.["normal-battle"]?.isWinBonus ?? true}
              onChange={onChange}
              data-path="eventSpecial.normal-battle.isWinBonus"
            />
          </label>
        </div>
      </div>
    </section>
  );
}
