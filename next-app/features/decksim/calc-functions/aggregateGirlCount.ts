import { initDeckSimulatorGirlCount } from "@/features/decksim/hooks/useDeckSimulatorData";

import { DeckSimulatorEventId } from "@/features/decksim/data/eventData";

import { DeckSimulatorData } from "@/features/decksim/type-definitions/DeckSimulatorData";
import { DeckSimulatorGirlCount } from "@/features/decksim/type-definitions/DeckSimulatorGirlCount";

export const aggregateGirlCount = ({
  inputData,
  eventId,
}: {
  inputData: DeckSimulatorData;
  eventId: DeckSimulatorEventId;
}): DeckSimulatorGirlCount => {
  const nextGirlCount = structuredClone(initDeckSimulatorGirlCount);

  // ここに集計処理を書く。
  (["mainScenes", "subScenes"] as const).forEach((mainOrSub) => {
    (["attack", "defense"] as const).forEach((attackOrDefense) => {
      if (attackOrDefense === "attack" && eventId === "championship-defense")
        return;

      if (
        attackOrDefense === "defense" &&
        eventId !== "raid-second" &&
        eventId !== "championship-defense"
      )
        return;

      const scenesData = inputData[mainOrSub][attackOrDefense] ?? {};
      Object.values(scenesData).forEach(
        ({ type, rarity, cost, skillLv, grade, isClubMatch, isLimitBreak }) => {
          const clubMatchKey = isClubMatch ? "true" : "false";
          const limitBreakKey = isLimitBreak ? "true" : "false";

          nextGirlCount[attackOrDefense].rarity[rarity][type]++;
          nextGirlCount[attackOrDefense].cost[cost] ??= {
            SWEETタイプ: 0,
            COOLタイプ: 0,
            POPタイプ: 0,
          };
          nextGirlCount[attackOrDefense].cost[cost][type]++;
          nextGirlCount[attackOrDefense].skillLv[skillLv] ??= {
            SWEETタイプ: 0,
            COOLタイプ: 0,
            POPタイプ: 0,
          };
          nextGirlCount[attackOrDefense].skillLv[skillLv][type]++;
          nextGirlCount[attackOrDefense].grade[grade][type]++;

          if (
            mainOrSub === "mainScenes" ||
            (eventId !== "clubcup" &&
              eventId !== "championship" &&
              eventId !== "championship-defense" &&
              eventId !== "normal-battle")
          ) {
            nextGirlCount[attackOrDefense].isClubMatch[clubMatchKey][type]++;
          }

          // ラブリー進展は強制的にEx進展済みとしてカウントする
          if (rarity === "Luv") {
            nextGirlCount[attackOrDefense].isLimitBreak["true"][type]++;
          } else {
            nextGirlCount[attackOrDefense].isLimitBreak[limitBreakKey][type]++;
          }
        },
      );
    });
  });

  return nextGirlCount;
};
