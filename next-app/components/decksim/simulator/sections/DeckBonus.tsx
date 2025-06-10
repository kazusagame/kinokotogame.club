import { DeckSimulatorData } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { DeckSimulatorEventId } from "@/components/decksim/data/eventData";

export function DeckBonus({
  data,
  eventId,
  onChange,
}: {
  data: DeckSimulatorData;
  eventId: DeckSimulatorEventId;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}) {
  const isValidEvent =
    eventId !== "raid-first" &&
    eventId !== "raid-second" &&
    eventId !== "raid-mega" &&
    eventId !== "raidwar"
      ? true
      : false;

  return (
    <>
      {isValidEvent && (
        <section className="pl-1">
          <h2 className="text-lg font-bold">センバツボーナス</h2>
          <div className="flex flex-col gap-6 mt-4 pl-0 sm:pl-2 md:pl-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div className="flex items-center gap-2 md:gap-4" key={i}>
                  <p className="text-base">通常{i + 1}</p>
                  <select
                    name={`normal.${i + 1}.level`}
                    className="select select-sm select-bordered"
                    value={data.deckBonus.normal?.[i + 1]?.level ?? "0"}
                    onChange={onChange}
                    data-path={`deckBonus.normal.${i + 1}.level`}
                  >
                    <option value="0">Lv0 (無効)</option>
                    <option value="1">Lv1</option>
                    <option value="2">Lv2</option>
                    <option value="3">Lv3</option>
                    <option value="4">Lv4</option>
                    <option value="5">Lv5</option>
                    <option value="6">Lv6</option>
                    <option value="7">Lv7</option>
                    <option value="8">Lv8</option>
                  </select>
                  <select
                    name={`normal.${i + 1}.type`}
                    className="select select-sm select-bordered"
                    value={data.deckBonus.normal?.[i + 1]?.type ?? "攻守"}
                    onChange={onChange}
                    data-path={`deckBonus.normal.${i + 1}.type`}
                  >
                    <option value="攻守">攻守</option>
                    <option value="攻援">攻援</option>
                    <option value="守援">守援</option>
                  </select>
                </div>
              ))}
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <p className="text-base">シャイニング★スプラッシュ</p>
              <select
                name="shine.level"
                className="select select-sm select-bordered"
                value={data.deckBonus.shine.level ?? "0"}
                onChange={onChange}
                data-path={`deckBonus.shine.level`}
              >
                <option value="0">Lv0 (無効)</option>
                <option value="1">Lv1</option>
                <option value="2">Lv2</option>
                <option value="3">Lv3</option>
                <option value="4">Lv4</option>
                <option value="5">Lv5</option>
              </select>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <p className="text-base">Precious★Friend</p>
              <select
                name="precious.level"
                className="select select-sm select-bordered"
                value={data.deckBonus.precious.level ?? "0"}
                onChange={onChange}
                data-path={`deckBonus.precious.level`}
              >
                <option value="0">Lv0 (無効)</option>
                <option value="1">Lv1</option>
                <option value="2">Lv2</option>
                <option value="3">Lv3</option>
              </select>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <p className="text-base">Precious★Friend+</p>
              <select
                name="preciousPlus.level"
                className="select select-sm select-bordered"
                value={data.deckBonus.preciousPlus.level ?? "0"}
                onChange={onChange}
                data-path={`deckBonus.preciousPlus.level`}
              >
                <option value="0">Lv0 (無効)</option>
                <option value="1">Lv1</option>
                <option value="2">Lv2</option>
                <option value="3">Lv3</option>
              </select>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
