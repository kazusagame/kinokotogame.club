import { DeckSimulatorData } from "@/features/decksim/type-definitions/DeckSimulatorData";
import { DeckSimulatorResult } from "@/features/decksim/type-definitions/DeckSimulatorResult";
import { DeckSimulatorEventId } from "@/features/decksim/data/eventData";

import { RaidFirstSpecialSection } from "@/features/decksim/components/deck-simulator-parts/eventSpecial/raid-first";
import { RaidSecondSpecialSection } from "@/features/decksim/components/deck-simulator-parts/eventSpecial/raid-second";
import { RaidMegaSpecialSection } from "@/features/decksim/components/deck-simulator-parts/eventSpecial/raid-mega";
import { RaidwarSpecialSection } from "@/features/decksim/components/deck-simulator-parts/eventSpecial/raidwar";
import { ClubcupSpecialSection } from "@/features/decksim/components/deck-simulator-parts/eventSpecial/clubcup";
import { ChampionshipSpecialSection } from "@/features/decksim/components/deck-simulator-parts/eventSpecial/championship";
import { DivraceSpecialSection } from "@/features/decksim/components/deck-simulator-parts/eventSpecial/divrace";
import { BoardSpecialSection } from "@/features/decksim/components/deck-simulator-parts/eventSpecial/board";
import { NormalBattleSpecialSection } from "@/features/decksim/components/deck-simulator-parts/eventSpecial/normal-battle";

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
