import { DeckSimulatorData,
  DeckSimulatorResult } from "@/components/decksim/simulator/useDeckSimulatorData";
import { DeckSimulatorEventId } from "@/components/decksim/data/eventData";

import TextWithTooltip from "@/components/common/TextWithTooltip";

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
  return <></>;
}
