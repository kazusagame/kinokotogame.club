import { DeckSimulatorData } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";

import TextWithTooltip from "@/components/common/TextWithTooltip";
import { formatNumber } from "@/lib/formatNumber";

export function RaidFirstSpecialSection({
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
    data?.eventSpecial?.["raid-first"]?.isConvertPoint ?? false;

  const getBgClass = (type?: string | undefined) =>
    type === "SWEETタイプ"
      ? "bg-sweet"
      : type === "COOLタイプ"
      ? "bg-cool"
      : type === "POPタイプ"
      ? "bg-pop"
      : "bg-base-100";

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
              data?.eventSpecial?.["raid-first"]?.specialGirlsEffect
            )}
            onChange={onChange}
            onBlur={onBlur}
            data-path="eventSpecial.raid-first.specialGirlsEffect"
          />
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <p className="text-base">悪男のタイプ</p>
          <select
            name="enemyType"
            className={`select select-sm select-bordered ${getBgClass(
              data?.eventSpecial?.["raid-first"]?.enemyType
            )}`}
            value={
              data?.eventSpecial?.["raid-first"]?.enemyType ?? "通常タイプ"
            }
            onChange={onChange}
            data-path="eventSpecial.raid-first.enemyType"
          >
            <option value="通常タイプ" className="bg-base-100">
              通常タイプ
            </option>
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
              data?.eventSpecial?.["raid-first"]?.attackType ?? "元気炭酸アメ"
            }
            onChange={onChange}
            data-path="eventSpecial.raid-first.attackType"
          >
            <option value="元気炭酸アメ">ハート1個 (元気炭酸アメ)</option>
            <option value="元気炭酸">ハート6個 (元気炭酸)</option>
            <option value="勇気炭酸">ハート12個 (勇気炭酸)</option>
          </select>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <p className="text-base">コンボ数</p>
          <select
            name="comboNum"
            className="select select-sm select-bordered"
            value={data?.eventSpecial?.["raid-first"]?.comboNum ?? "0"}
            onChange={onChange}
            data-path="eventSpecial.raid-first.comboNum"
          >
            <option value="0">0</option>
            <option value="1">1 ～ (×1.1)</option>
            <option value="5">5 ～ (×1.2)</option>
            <option value="10">10 ～ (×1.4)</option>
            <option value="50">50 ～ (×1.8)</option>
            <option value="100">100 ～ (×2.0)</option>
          </select>
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
                data?.eventSpecial?.["raid-first"]?.isConvertPoint === true
              }
              onChange={onChange}
              data-path="eventSpecial.raid-first.isConvertPoint"
            />
          </label>
        </div>
        <div
          className={`flex items-center ${isConvertPoint ? "" : "opacity-10"}`}
        >
          <label className="label cursor-pointer pl-0 pt-1 pb-1">
            <p className="text-base mr-2 md:mr-4">
              <TextWithTooltip
                displayText="部員お助け (Pt×1.2)"
                tipText="部員がお助け依頼した超レアを相手として想定する場合はチェックを入れます。獲得ポイントにプラスの補正が入ります。"
              />
            </p>
            <input
              type="checkbox"
              name="isConvertPoint"
              className="checkbox checkbox-md"
              checked={
                data?.eventSpecial?.["raid-first"]?.isAssistMembers === true
              }
              onChange={onChange}
              data-path="eventSpecial.raid-first.isAssistMembers"
            />
          </label>
        </div>
      </div>
    </section>
  );
}
