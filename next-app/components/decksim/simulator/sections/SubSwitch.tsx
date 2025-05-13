import {
  DeckSimulatorData,
  DeckSimulatorResult,
} from "@/components/decksim/simulator/useDeckSimulatorData";
import { EVENT_ID_TO_NAME_DICT } from "@/components/decksim/data/eventData";

import TextWithTooltip from "@/components/common/TextWithTooltip";

export function SubSwitch({
  data,
  summary,
  eventId,
  type,
  setValueAtPath,
}: {
  data: DeckSimulatorData;
  summary: DeckSimulatorResult;
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
  type: "攻援" | "守援";
  setValueAtPath: (obj: {
    path: string;
    value: { [key: string | number]: unknown };
  }) => void;
}) {
  return (
    <>
      <section className="pl-1">
        <h2 className="text-lg font-bold">副センバツ内のスイッチOFFガール</h2>
        <div className="flex flex-col gap-6 mt-4 pl-2 md:pl-4">
          {/* <RegisteredSubSwitchBlock
            data={data}
            summary={summary}
            eventId={eventId}
            type={type}
            setValueAtPath={setValueAtPath}
          />
          <AddSubSwitchBlock
            data={data}
            type={type}
            setValueAtPath={setValueAtPath}
          /> */}
        </div>
      </section>
    </>
  );
}
