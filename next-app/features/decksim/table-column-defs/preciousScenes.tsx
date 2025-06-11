import { createColumnHelper } from "@tanstack/react-table";

import { PreciousScenes } from "@/features/decksim/data/preciousScenesData";

const columnHelper = createColumnHelper<PreciousScenes>();
export const columnDefPreciousScenes = [
  columnHelper.accessor("name", {
    header: "名称",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "名称",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("rarity", {
    header: "初期星",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "初期星",
      textAlign: "center",
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
  columnHelper.accessor("conditionThreshold", {
    header: "閾値",
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
      label: "閾値",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("conditionThreshold6", {
    header: "閾値(星6)",
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
      label: "閾値(星6)",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("effectTarget", {
    header: "効果対象",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "効果対象",
      textAlign: "left",
    },
  }),
  columnHelper.accessor("effectType", {
    header: "効果タイプ",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "効果タイプ",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("effectRange", {
    header: "効果範囲",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "効果範囲",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("valueFormat", {
    header: "効果",
    cell: (info) => info.getValue(),
    sortingFn: "basic",
    meta: {
      label: "効果",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("value1", {
    header: "星1",
    cell: (info) => info.getValue(),
    sortingFn: "auto",
    meta: {
      label: "星1",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("value2", {
    header: "星2",
    cell: (info) => info.getValue(),
    sortingFn: "auto",
    meta: {
      label: "星2",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("value3", {
    header: "星3",
    cell: (info) => info.getValue(),
    sortingFn: "auto",
    meta: {
      label: "星3",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("value4", {
    header: "星4",
    cell: (info) => info.getValue(),
    sortingFn: "auto",
    meta: {
      label: "星4",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("value5", {
    header: "星5",
    cell: (info) => info.getValue(),
    sortingFn: "auto",
    meta: {
      label: "星5",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("value6", {
    header: "星6",
    cell: (info) => {
      const value = info.getValue();
      if (!value) {
        return "---";
      } else {
        return value;
      }
    },
    sortingFn: "auto",
    meta: {
      label: "星6",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("factor", {
    header: "減衰係数",
    cell: (info) => {
      const value = info.getValue();
      if (!value) {
        return "---";
      } else {
        return value;
      }
    },
    sortingFn: "auto",
    meta: {
      label: "減衰係数",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("factor6", {
    header: "減衰係数(星6)",
    cell: (info) => {
      const value = info.getValue();
      if (!value) {
        return "---";
      } else {
        return value;
      }
    },
    sortingFn: "auto",
    meta: {
      label: "減衰係数(星6)",
      textAlign: "center",
    },
  }),
  columnHelper.accessor("annotation", {
    header: "備考",
    cell: (info) => {
      const value = info.getValue();
      if (!value) {
        return "";
      } else {
        return value;
      }
    },
    sortingFn: "basic",
    meta: {
      label: "備考",
      textAlign: "left",
    },
  }),
];
