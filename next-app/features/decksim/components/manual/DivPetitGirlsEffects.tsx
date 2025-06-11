"use client";

import { useMemo } from "react";

import GenericOpenTable from "@/components/GenericOpenTable";
import { PETIT_GIRLS_EFFECTS_DATA } from "@/features/decksim/data/petitGirlsEffectData";
import { columnDefPetitGirlsEffects } from "@/features/decksim/table-column-defs/petitGirlsEffects";

export default function DivPetitGirlsEffects() {
  const petitGirlsEffectsList = useMemo(
    () => Object.values(PETIT_GIRLS_EFFECTS_DATA),
    []
  ) as unknown as { [K: string]: string | number | number[] }[];
  return (
    <div className="my-4 p-4 rounded-xl bg-base-200">
      <GenericOpenTable
        data={petitGirlsEffectsList}
        tableType="petitGirlsEffects"
        tableSize="xs"
        enableNowrapHead
        enableNowrapBody
        pageSize={15}
        columnDef={columnDefPetitGirlsEffects}
      />
    </div>
  );
}
