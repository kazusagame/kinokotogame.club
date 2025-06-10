import {
  DeckSimulatorData,
  DeckSimulatorCommonData,
} from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { IntermediateResults } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorIntermediateResults";

import {
  BONUS_DATA_PER_EVENT,
  RaidComboMap,
  HeartRate,
} from "@/components/decksim/data/bonusData";

import { returnNumber } from "@/lib/returnNumber";

export const calcEventSpecialRaidSecond = ({
  inputData,
  commonData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  commonData: DeckSimulatorCommonData;
  intermediateResults: IntermediateResults;
}) => {
  const comboMap = BONUS_DATA_PER_EVENT["raid-second"].eventUniqueBonus!.combo
    .value as RaidComboMap;
  const comboNum = returnNumber(
    inputData.eventSpecial["raid-second"]?.comboNum ?? 0
  );

  const heartRate = BONUS_DATA_PER_EVENT["raid-second"].eventUniqueBonus!
    .heartRate.value as HeartRate;
  const attackType =
    inputData.eventSpecial["raid-second"]?.attackType === "元気炭酸アメ"
      ? "candy"
      : inputData.eventSpecial["raid-second"]?.attackType === "元気炭酸"
      ? "normalItem"
      : inputData.eventSpecial["raid-second"]?.attackType === "勇気炭酸"
      ? "specialItem"
      : "candy";

  const isConvertPoint =
    inputData.eventSpecial["raid-second"]?.isConvertPoint ?? false;
  const isAssistMembers =
    inputData.eventSpecial["raid-second"]?.isAssistMembers ?? false;

  const specialGirlsEffect = returnNumber(
    inputData.eventSpecial["raid-second"]?.specialGirlsEffect ?? 0
  );
  const attackCostMultiplier =
    returnNumber(commonData.playerData.maxAttackCost ?? 1000) / 200;
  const comboMultiplier = (comboMap[comboNum] ?? 0) / 100;
  const heartMultiplier = heartRate[attackType] ?? 1;

  let {
    minPower: attackMinPower,
    expPower: attackExpPower,
    maxPower: attackMaxPower,
  } = intermediateResults.totalPerformance.attack;
  let {
    minPower: defenseMinPower,
    expPower: defenseExpPower,
    maxPower: defenseMaxPower,
  } = intermediateResults.totalPerformance.defense;
  attackMinPower = Math.ceil(
    ((attackMinPower ?? 0) * attackCostMultiplier * (1 + comboMultiplier) +
      specialGirlsEffect) *
      heartMultiplier
  );
  attackExpPower = Math.ceil(
    ((attackExpPower ?? 0) * attackCostMultiplier * (1 + comboMultiplier) +
      specialGirlsEffect) *
      heartMultiplier
  );
  attackMaxPower = Math.ceil(
    ((attackMaxPower ?? 0) * attackCostMultiplier * (1 + comboMultiplier) +
      specialGirlsEffect) *
      heartMultiplier
  );
  defenseMinPower = Math.ceil(
    (defenseMinPower ?? 0) *
      attackCostMultiplier *
      (1 + comboMultiplier) *
      heartMultiplier
  );
  defenseExpPower = Math.ceil(
    (defenseExpPower ?? 0) *
      attackCostMultiplier *
      (1 + comboMultiplier) *
      heartMultiplier
  );
  defenseMaxPower = Math.ceil(
    (defenseMaxPower ?? 0) *
      attackCostMultiplier *
      (1 + comboMultiplier) *
      heartMultiplier
  );

  // ポイント変換を行う場合
  if (isConvertPoint) {
    intermediateResults.totalPerformance.isConvertPoint = true;
    const pointMultiplier = 3.5;
    const helpMultiplier = isAssistMembers ? 1.2 : 1.0;
    attackMinPower = Math.ceil(
      (attackMinPower * pointMultiplier * helpMultiplier) / 1000
    );
    attackExpPower = Math.ceil(
      (attackExpPower * pointMultiplier * helpMultiplier) / 1000
    );
    attackMaxPower = Math.ceil(
      (attackMaxPower * pointMultiplier * helpMultiplier) / 1000
    );
    defenseMinPower = Math.ceil(
      (defenseMinPower * pointMultiplier * helpMultiplier) / 1000
    );
    defenseExpPower = Math.ceil(
      (defenseExpPower * pointMultiplier * helpMultiplier) / 1000
    );
    defenseMaxPower = Math.ceil(
      (defenseMaxPower * pointMultiplier * helpMultiplier) / 1000
    );
  }

  // イベント固有補正後の数値を反映しなおす
  intermediateResults.totalPerformance.attack = {
    minPower: attackMinPower,
    expPower: attackExpPower,
    maxPower: attackMaxPower,
  };
  intermediateResults.totalPerformance.defense = {
    minPower: defenseMinPower,
    expPower: defenseExpPower,
    maxPower: defenseMaxPower,
  };
};
