import {
  DeckSimulatorData,
  DeckSimulatorCommonData,
} from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { IntermediateResults } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorIntermediateResults";

import {
  BONUS_DATA_PER_EVENT,
  HeartRate,
} from "@/components/decksim/data/bonusData";

import { returnNumber } from "@/lib/returnNumber";

export const calcEventSpecialRaidMega = ({
  inputData,
  commonData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  commonData: DeckSimulatorCommonData;
  intermediateResults: IntermediateResults;
}) => {
  const heartRate = BONUS_DATA_PER_EVENT["raid-mega"].eventUniqueBonus!
    .heartRate.value as HeartRate;
  const attackType =
    inputData.eventSpecial["raid-mega"]?.attackType === "元気炭酸アメ"
      ? "candy"
      : inputData.eventSpecial["raid-mega"]?.attackType === "元気炭酸"
      ? "normalItem"
      : inputData.eventSpecial["raid-mega"]?.attackType === "勇気炭酸"
      ? "specialItem"
      : "candy";
  let defenseDownDeBuff = returnNumber(
    inputData.eventSpecial["raid-mega"]?.defenseDownDeBuff ?? 50
  );
  if (defenseDownDeBuff < -50) defenseDownDeBuff = -50;
  if (defenseDownDeBuff > 50) defenseDownDeBuff = 50;

  const isConvertPoint =
    inputData.eventSpecial["raid-mega"]?.isConvertPoint ?? false;

  const specialGirlsEffect = returnNumber(
    inputData.eventSpecial["raid-mega"]?.specialGirlsEffect ?? 0
  );
  const attackCostMultiplier =
    returnNumber(commonData.playerData.maxAttackCost ?? 1000) / 100;
  const heartMultiplier = heartRate[attackType] ?? 1;

  let { minPower, expPower, maxPower } =
    intermediateResults.totalPerformance.attack;
  minPower = Math.ceil(
    (((minPower ?? 0) * attackCostMultiplier) / (1 - defenseDownDeBuff / 100) +
      specialGirlsEffect) *
      heartMultiplier
  );
  expPower = Math.ceil(
    (((expPower ?? 0) * attackCostMultiplier) / (1 - defenseDownDeBuff / 100) +
      specialGirlsEffect) *
      heartMultiplier
  );
  maxPower = Math.ceil(
    (((maxPower ?? 0) * attackCostMultiplier) / (1 - defenseDownDeBuff / 100) +
      specialGirlsEffect) *
      heartMultiplier
  );

  // ポイント変換を行う場合
  if (isConvertPoint) {
    intermediateResults.totalPerformance.isConvertPoint = true;
    const pointMultiplier = 5.9;
    minPower = Math.ceil((minPower * pointMultiplier) / 1000);
    expPower = Math.ceil((expPower * pointMultiplier) / 1000);
    maxPower = Math.ceil((maxPower * pointMultiplier) / 1000);
  }

  // イベント固有補正後の数値を反映しなおす
  intermediateResults.totalPerformance.attack = {
    minPower,
    expPower,
    maxPower,
  };
};
