import { DeckSimulatorData } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { DeckSimulatorResult } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorResult";
import { DeckSimulatorEventId } from "@/components/decksim/data/eventData";

import { RaidFirstSpecialSection } from "@/components/decksim/simulator/sections/eventSpecial/raid-first";
import { RaidSecondSpecialSection } from "@/components/decksim/simulator/sections/eventSpecial/raid-second";
import { RaidMegaSpecialSection } from "@/components/decksim/simulator/sections/eventSpecial/raid-mega";
import { RaidwarSpecialSection } from "@/components/decksim/simulator/sections/eventSpecial/raidwar";
import { ClubcupSpecialSection } from "@/components/decksim/simulator/sections/eventSpecial/clubcup";
import { ChampionshipSpecialSection } from "@/components/decksim/simulator/sections/eventSpecial/championship";
import { DivraceSpecialSection } from "@/components/decksim/simulator/sections/eventSpecial/divrace";
import { BoardSpecialSection } from "@/components/decksim/simulator/sections/eventSpecial/board";
import { NormalBattleSpecialSection } from "@/components/decksim/simulator/sections/eventSpecial/normal-battle";

export function EventSpecial({
  data,
  summary,
  eventId,
  onChange,
  onBlur,
  setValueAtPath,
}: {
  data: DeckSimulatorData;
  summary: DeckSimulatorResult;
  eventId: DeckSimulatorEventId;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setValueAtPath: (obj: {
    path: string;
    value: { [key: string | number]: unknown };
  }) => void;
}) {
  return (
    <>
      {eventId === "raid-first" && (
        <RaidFirstSpecialSection
          data={data}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
      {eventId === "raid-second" && (
        <RaidSecondSpecialSection
          data={data}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
      {eventId === "raid-mega" && (
        <RaidMegaSpecialSection
          data={data}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
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
      {eventId === "championship" && (
        <ChampionshipSpecialSection
          data={data}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
      {eventId === "divrace" && (
        <DivraceSpecialSection
          data={data}
          summary={summary}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
      {eventId === "board" && (
        <BoardSpecialSection
          data={data}
          summary={summary}
          onChange={onChange}
          onBlur={onBlur}
          setValueAtPath={setValueAtPath}
        />
      )}
      {eventId === "normal-battle" && (
        <NormalBattleSpecialSection data={data} onChange={onChange} />
      )}
    </>
  );
}
