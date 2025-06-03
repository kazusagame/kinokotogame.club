import { DeckSimulatorData } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { DeckSimulatorEventId } from "@/components/decksim/data/eventData";

import { RaidwarSpecialSection } from "@/components/decksim/simulator/sections/eventSpecial/raidwar";
import { ClubcupSpecialSection } from "@/components/decksim/simulator/sections/eventSpecial/clubcup";
import { NormalBattleSpecialSection } from "@/components/decksim/simulator/sections/eventSpecial/normal-battle";

export function EventSpecial({
  data,
  eventId,
  onChange,
  onBlur,
}: {
  data: DeckSimulatorData;
  eventId: DeckSimulatorEventId;
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
      {eventId === "clubcup" && (
        <ClubcupSpecialSection
          data={data}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
      {eventId === "normal-battle" && (
        <NormalBattleSpecialSection
          data={data}
          onChange={onChange}
        />
      )}
    </>
  );
}
