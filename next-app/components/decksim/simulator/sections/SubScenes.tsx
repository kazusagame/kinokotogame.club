import { useId } from "react";

import { DeckSimulatorData } from "@/components/decksim/simulator/useDeckSimulatorData";
import { EVENT_ID_TO_NAME_DICT } from "@/components/decksim/data/eventData";

import TextWithTooltip from "@/components/common/TextWithTooltip";

export function SubScenes({
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
  return <></>;
}
