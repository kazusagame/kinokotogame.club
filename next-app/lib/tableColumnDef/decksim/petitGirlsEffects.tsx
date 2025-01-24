import { createColumnHelper } from "@tanstack/react-table";

import { PetitGirlsEffects } from "@/components/decksim/data/petitGirlsEffectData";

const columnHelper = createColumnHelper<PetitGirlsEffects>();
export const columnDefPetitGirlsEffects = [
  columnHelper.accessor("name", {
    header: "名称",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "名称",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("effectCondition", {
    header: "効果条件",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "効果条件",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("conditionDetail", {
    header: "条件詳細",
    cell: (info) => {
      const value = info.getValue();
      if (!value) {
        return "---";
      } else {
        return value;
      }
    },
    sortingFn: "basic",
    meta: {
      label: "条件詳細",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("effectType", {
    header: "効果",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "効果",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("markerType", {
    header: "マーカー",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "マーカー",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("levelMaxValue", {
    header: "Lvmax時の効果値",
    cell: (info) => {
      return info.getValue() + " %";
    },
    sortingFn: "auto",
    meta: {
      label: "Lvmax時の効果値",
      textAlign: "right",
    },
  }),
];
