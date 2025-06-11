import { DeckSimulatorData } from "@/features/decksim/type-definitions/DeckSimulatorData";
import { IntermediateResults } from "@/features/decksim/type-definitions/DeckSimulatorIntermediateResults";

import {
  BONUS_DATA_PER_EVENT,
  HeartRateChampionship,
} from "@/features/decksim/data/bonusData";

import { returnNumber } from "@/lib/returnNumber";

export const calcEventSpecialChampionship = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  const appealType =
    inputData.eventSpecial.championship?.appealType ?? "アピール対決";
  const heartNum = returnNumber(
    inputData.eventSpecial.championship?.heartNum ?? "1"
  );
  const isTensionMax =
    inputData.eventSpecial.championship?.isTensionMax ?? true;
  const turnNum = returnNumber(
    inputData.eventSpecial.championship?.TurnNum ?? "5"
  );
  const specialGirlsEffect = returnNumber(
    inputData.eventSpecial.championship?.specialGirlsEffect ?? 0
  );
  const isConvertPoint =
    inputData.eventSpecial.championship?.isConvertPoint ?? false;

  let { minPower, expPower, maxPower } =
    intermediateResults.totalPerformance.attack;

  // アピール種別とハート数に応じた応援力倍率を確定する
  const heartRateMap = BONUS_DATA_PER_EVENT.championship.eventUniqueBonus!
    .heartRate.value as HeartRateChampionship;
  const attackRate =
    appealType === "アピール対決"
      ? heartRateMap.appealBattle[heartNum]
      : appealType === "アピールタイム"
      ? heartRateMap.appealTimeNormal[heartNum]
      : appealType === "レアアピールタイム"
      ? heartRateMap.appealTimeRare[heartNum]
      : 1.0;

  if (appealType === "アピール対決") {
    minPower = Math.ceil((minPower ?? 0) * attackRate);
    expPower = Math.ceil((expPower ?? 0) * attackRate);
    maxPower = Math.ceil((maxPower ?? 0) * attackRate);
  } else {
    minPower = Math.ceil(
      ((minPower ?? 0) + specialGirlsEffect) *
        (isTensionMax ? 2 : 1) *
        attackRate *
        turnNum
    );
    expPower = Math.ceil(
      ((expPower ?? 0) + specialGirlsEffect) *
        (isTensionMax ? 2 : 1) *
        attackRate *
        turnNum
    );
    maxPower = Math.ceil(
      ((maxPower ?? 0) + specialGirlsEffect) *
        (isTensionMax ? 2 : 1) *
        attackRate *
        turnNum
    );
  }

  // ポイント変換を行う場合
  if (isConvertPoint) {
    intermediateResults.totalPerformance.isConvertPoint = true;
    if (appealType === "アピール対決") {
      minPower = Math.ceil(minPower / 10000);
      expPower = Math.ceil(expPower / 10000);
      maxPower = Math.ceil(maxPower / 10000);
    } else {
      const pointMultiplier =
        appealType === "アピールタイム"
          ? 1.0
          : appealType === "レアアピールタイム"
          ? 3.0
          : 1.0;
      minPower = Math.ceil((minPower * pointMultiplier * 0.3) / 10000);
      expPower = Math.ceil((expPower * pointMultiplier * 0.3) / 10000);
      maxPower = Math.ceil((maxPower * pointMultiplier * 0.3) / 10000);
    }
  }

  // イベント固有補正後の数値を反映しなおす
  intermediateResults.totalPerformance.attack = {
    minPower,
    expPower,
    maxPower,
  };
};
