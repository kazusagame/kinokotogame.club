"use client";

import { useMemo } from "react";

import GenericOpenTable from "@/components/common/GenericOpenTable";
import { PETIT_GIRLS_EFFECTS_DATA } from "@/components/decksim/data/petitGirlsEffectData";
import { columnDefPetitGirlsEffects } from "@/lib/tableColumnDef/decksim/petitGirlsEffects";

export default function DivPetitGirlsEffects() {
  const petitGirlsEffectsList = useMemo(
    () =>
      Object.values(PETIT_GIRLS_EFFECTS_DATA).filter(
        (value) => value.effectCondition !== "無効"
      ),
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
