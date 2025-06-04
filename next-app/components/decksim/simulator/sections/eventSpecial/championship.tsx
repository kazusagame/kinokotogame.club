import { DeckSimulatorData } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";

import TextWithTooltip from "@/components/common/TextWithTooltip";

import { formatNumber } from "@/lib/formatNumber";

export function ChampionshipSpecialSection({
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
  const isAppealTime =
    data?.eventSpecial?.championship?.appealType == undefined
      ? false
      : data.eventSpecial.championship.appealType === "アピール対決"
      ? false
      : true;

  return (
    <section className="pl-1">
      <h2 className="text-lg font-bold">イベント固有</h2>
      <div className="flex flex-col gap-6 mt-4 pl-0 sm:pl-2 md:pl-4">
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <p className="text-base">
            <TextWithTooltip
              displayText="アピール種別"
              tipText="他のプレイヤーとのアピール対決か、ガールが相手のアピールタイムかを選択します。"
            />
          </p>
          <select
            name="appealType"
            className="select select-sm select-bordered"
            value={
              data?.eventSpecial?.championship?.appealType ?? "アピール対決"
            }
            onChange={onChange}
            data-path="eventSpecial.championship.appealType"
          >
            <option value="アピール対決">アピール対決</option>
            <option value="アピールタイム">アピールタイム</option>
            <option value="レアアピールタイム">レアアピールタイム (Pt3倍)</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <p className="text-base">
            <TextWithTooltip
              displayText="ハート数"
              tipText="アタック数に使用するハート数を選択します。アピール対決かアピールタイムかでダメージ倍率が異なります。"
            />
          </p>
          <select
            name="heartNum"
            className="select select-sm select-bordered"
            value={data?.eventSpecial?.championship?.heartNum ?? "1"}
            onChange={onChange}
            data-path="eventSpecial.championship.heartNum"
          >
            <option value="1">1個（100% / 100%）</option>
            <option value="2">2個（150% / 220%）</option>
            <option value="3">3個（200% / 350%）</option>
            <option value="4">4個（250% / 480%）</option>
            <option value="5">5個（350% / 650%）</option>
          </select>
        </div>

        {/* 以下はアピールタイムの場合だけ表示する */}
        <div
          className={`flex flex-wrap items-center gap-2 md:gap-4 ${
            isAppealTime ? "" : "opacity-10"
          }`}
        >
          <label className="label cursor-pointer pl-0 pt-1 pb-1">
            <p className="text-base mr-2 md:mr-4">
              <TextWithTooltip
                displayText="テンションゲージMAX中"
                tipText="テンションゲージMAXの10分間、攻援力+100%効果の発揮中はチェックを入れます。"
              />
            </p>
            <input
              type="checkbox"
              name="isTensionMax"
              className="checkbox checkbox-md"
              checked={data?.eventSpecial?.championship?.isTensionMax ?? true}
              onChange={onChange}
              data-path="eventSpecial.championship.isTensionMax"
            />
          </label>
        </div>

        <div
          className={`flex flex-wrap items-center gap-2 md:gap-4 ${
            isAppealTime ? "" : "opacity-10"
          }`}
        >
          <p className="text-base">
            <TextWithTooltip
              displayText="ターン数"
              tipText="アピールタイム中のターン数を選択します。基本は最大ターン数である5のままで大丈夫ですが、ハート数が少な目の場合は5ターン目まで主センバツの体力が持たずに火力が維持できない場合があります。"
            />
          </p>
          <select
            name="TurnNum"
            className="select select-sm select-bordered"
            value={data?.eventSpecial?.championship?.TurnNum ?? "5"}
            onChange={onChange}
            data-path="eventSpecial.championship.TurnNum"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div
          className={`flex flex-wrap items-center gap-2 md:gap-4 ${
            isAppealTime ? "" : "opacity-10"
          }`}
        >
          <p className="text-base">SP応援効果（攻援）</p>
          <input
            type="text"
            inputMode="numeric"
            name="specialGirlsEffect"
            className="input input-sm input-bordered max-w-24 md:w-24 text-right"
            value={formatNumber(
              data?.eventSpecial?.championship?.specialGirlsEffect
            )}
            onChange={onChange}
            onBlur={onBlur}
            data-path="eventSpecial.championship.specialGirlsEffect"
          />
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
              checked={data?.eventSpecial?.championship?.isConvertPoint === true}
              onChange={onChange}
              data-path="eventSpecial.championship.isConvertPoint"
            />
          </label>
        </div>

      </div>
    </section>
  );
}
