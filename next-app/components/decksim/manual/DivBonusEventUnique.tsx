import BonusEventUniqueRaidSuperRare from "./DivBonusEventUnique/BonusEventUniqueRaidSuperRare";
import BonusEventUniqueRaidMega from "./DivBonusEventUnique/BonusEventUniqueRaidMega";
import BonusEventUniqueRaidwar from "./DivBonusEventUnique/BonusEventUniqueRaidwar";
import BonusEventUniqueClubcup from "./DivBonusEventUnique/BonusEventUniqueClubcup";
import BonusEventUniqueTower from "./DivBonusEventUnique/BonusEventUniqueTower";

export default function DivBonusEventUnique() {
  return (
    <div className="my-4 md:pl-4">
      <BonusEventUniqueRaidSuperRare />
      <BonusEventUniqueRaidMega />
      <BonusEventUniqueRaidwar />
      <BonusEventUniqueClubcup />
      <BonusEventUniqueTower />
    </div>
  );
}
