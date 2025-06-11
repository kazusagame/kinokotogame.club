import {
  DeckSimulatorData,
  DeckSimulatorCommonData,
} from "@/features/decksim/type-definitions/DeckSimulatorData";
import { IntermediateResults } from "@/features/decksim/type-definitions/DeckSimulatorIntermediateResults";

import {
  BONUS_DATA_PER_EVENT,
  RaidComboMap,
  HeartRate,
} from "@/features/decksim/data/bonusData";

import { returnNumber } from "@/lib/returnNumber";

export const calcEventSpecialRaidFirst = ({
  inputData,
  commonData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  commonData: DeckSimulatorCommonData;
  intermediateResults: IntermediateResults;
}) => {
  const comboMap = BONUS_DATA_PER_EVENT["raid-first"].eventUniqueBonus!.combo
    .value as RaidComboMap;
  const comboNum = returnNumber(
    inputData.eventSpecial["raid-first"]?.comboNum ?? 0
  );

  const heartRate = BONUS_DATA_PER_EVENT["raid-first"].eventUniqueBonus!
    .heartRate.value as HeartRate;
  const attackType =
    inputData.eventSpecial["raid-first"]?.attackType === "元気炭酸アメ"
      ? "candy"
      : inputData.eventSpecial["raid-first"]?.attackType === "元気炭酸"
      ? "normalItem"
      : inputData.eventSpecial["raid-first"]?.attackType === "勇気炭酸"
      ? "specialItem"
      : "candy";

  const isConvertPoint =
    inputData.eventSpecial["raid-first"]?.isConvertPoint ?? false;
  const isAssistMembers =
    inputData.eventSpecial["raid-first"]?.isAssistMembers ?? false;

  const specialGirlsEffect = returnNumber(
    inputData.eventSpecial["raid-first"]?.specialGirlsEffect ?? 0
  );
  const attackCostMultiplier =
    returnNumber(commonData.playerData.maxAttackCost ?? 1000) / 100;
  const comboMultiplier = (comboMap[comboNum] ?? 0) / 100;
  const heartMultiplier = heartRate[attackType] ?? 1;

  let { minPower, expPower, maxPower } =
    intermediateResults.totalPerformance.attack;
  minPower = Math.ceil(
    ((minPower ?? 0) * attackCostMultiplier * (1 + comboMultiplier) +
      specialGirlsEffect) *
      heartMultiplier
  );
  expPower = Math.ceil(
    ((expPower ?? 0) * attackCostMultiplier * (1 + comboMultiplier) +
      specialGirlsEffect) *
      heartMultiplier
  );
  maxPower = Math.ceil(
    ((maxPower ?? 0) * attackCostMultiplier * (1 + comboMultiplier) +
      specialGirlsEffect) *
      heartMultiplier
  );

  // ポイント変換を行う場合
  if (isConvertPoint) {
    intermediateResults.totalPerformance.isConvertPoint = true;
    const pointMultiplier = 3.5;
    const helpMultiplier = isAssistMembers ? 1.2 : 1.0;
    minPower = Math.ceil((minPower * pointMultiplier * helpMultiplier) / 1000);
    expPower = Math.ceil((expPower * pointMultiplier * helpMultiplier) / 1000);
    maxPower = Math.ceil((maxPower * pointMultiplier * helpMultiplier) / 1000);
  }

  // イベント固有補正後の数値を反映しなおす
  intermediateResults.totalPerformance.attack = {
    minPower,
    expPower,
    maxPower,
  };
};
