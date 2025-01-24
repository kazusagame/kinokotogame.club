"use client";

import { useMemo } from "react";

import GenericOpenTable from "@/components/common/GenericOpenTable";
import { PRECIOUS_SCENES_DATA } from "@/components/decksim/data/preciousScenesData";
import { columnDefPreciousScenes } from "@/lib/tableColumnDef/decksim/preciousScenes";

export default function DivPreciousScenes() {
  const preciousScenesList = useMemo(
    () => Object.values(PRECIOUS_SCENES_DATA),
    []
  ) as unknown as { [K: string]: string | number | number[] }[];
  return (
    <div className="my-4 p-4 rounded-xl bg-base-200">
      <GenericOpenTable
        data={preciousScenesList}
        tableType="preciousScenes"
        tableSize="xs"
        enableNowrapHead
        enableNowrapBody
        pageSize={15}
        columnDef={columnDefPreciousScenes}
      />
      <div className="mt-2 md:pl-4">
        <p className="text-sm/relaxed">
          ※ 減衰係数は最大効果発揮条件が未達の場合に使用されるマスクデータです。
          この数値が大きいほど効果値の減衰量が大きくなる傾向になります。
        </p>
      </div>
    </div>
  );
}
