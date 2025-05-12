import { DeckSimulatorData } from "@/components/decksim/simulator/useDeckSimulatorData";
import { EVENT_ID_TO_NAME_DICT } from "@/components/decksim/data/eventData";

import TextWithTooltip from "@/components/common/TextWithTooltip";

export function MainSkill({
  data,
  eventId,
  type,
  onChange,
  onBlur,
}: {
  data: DeckSimulatorData;
  eventId: keyof typeof EVENT_ID_TO_NAME_DICT;
  type: "攻援" | "守援";
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  return <></>;
}
