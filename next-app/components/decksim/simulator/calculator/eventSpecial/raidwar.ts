import {
  DeckSimulatorData,
  DeckSimulatorCommonData,
} from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { IntermediateResults } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorIntermediateResults";

import {
  BONUS_DATA_PER_EVENT,
  RaidwarComboMap,
  HeartRate,
} from "@/components/decksim/data/bonusData";

import { returnNumber } from "@/lib/returnNumber";

export const calcEventSpecialRaidwar = ({
  inputData,
  commonData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  commonData: DeckSimulatorCommonData;
  intermediateResults: IntermediateResults;
}) => {
  const comboMap = BONUS_DATA_PER_EVENT.raidwar.eventUniqueBonus!.combo
    .value as RaidwarComboMap;
  const comboNum = returnNumber(inputData.eventSpecial.raidwar?.comboNum ?? 50);

  const heartRate = BONUS_DATA_PER_EVENT.raidwar.eventUniqueBonus!.heartRate
    .value as HeartRate;
  const attackType =
    inputData.eventSpecial.raidwar?.attackType === "元気炭酸アメ"
      ? "candy"
      : inputData.eventSpecial.raidwar?.attackType === "元気炭酸"
      ? "normalItem"
      : inputData.eventSpecial.raidwar?.attackType === "本気炭酸"
      ? "specialItem"
      : "candy";

  const enemyType = inputData.eventSpecial.raidwar?.enemyType ?? "夜行性激レア";
  const attackNum = returnNumber(
    inputData.eventSpecial.raidwar?.attackNum ?? 1
  );

  let totalSkillDamage = returnNumber(
    inputData.eventSpecial.raidwar?.totalSkillDamage ?? 0
  );
  if (enemyType !== "夜行性激レア") totalSkillDamage = 0;

  const isConvertPoint =
    inputData.eventSpecial.raidwar?.isConvertPoint ?? false;

  const attackCostMultiplier =
    returnNumber(commonData.playerData.maxAttackCost ?? 1000) / 100;
  const specialGirlsEffect = returnNumber(
    inputData.eventSpecial.raidwar?.specialGirlsEffect ?? 0
  );
  const comboMultiplier = (comboMap[comboNum] ?? 0) / 100;

  let attackUpBuff = returnNumber(
    inputData.eventSpecial.raidwar?.attackUpBuff ?? 150
  );
  if (attackUpBuff < 0) attackUpBuff = 0;
  if (attackUpBuff > 150) attackUpBuff = 150;
  if (enemyType !== "夜行性激レア") attackUpBuff = 0;

  const heartMultiplier = heartRate[attackType] ?? 1;

  let { minPower, expPower, maxPower } =
    intermediateResults.totalPerformance.attack;
  minPower = Math.ceil(
    ((minPower ?? 0) * attackCostMultiplier + specialGirlsEffect) *
      (1 + comboMultiplier) *
      (1 + attackUpBuff / 100) *
      (heartMultiplier * attackNum + totalSkillDamage / 100)
  );
  expPower = Math.ceil(
    ((expPower ?? 0) * attackCostMultiplier + specialGirlsEffect) *
      (1 + comboMultiplier) *
      (1 + attackUpBuff / 100) *
      (heartMultiplier * attackNum + totalSkillDamage / 100)
  );
  maxPower = Math.ceil(
    ((maxPower ?? 0) * attackCostMultiplier + specialGirlsEffect) *
      (1 + comboMultiplier) *
      (1 + attackUpBuff / 100) *
      (heartMultiplier * attackNum + totalSkillDamage / 100)
  );

  // ポイント変換を行う場合
  if (isConvertPoint) {
    intermediateResults.totalPerformance.isConvertPoint = true;
    const pointMultiplier =
      enemyType === "夜行性激レア"
        ? 1.0
        : enemyType === "超レアLv50"
        ? 2.0
        : enemyType === "超レアLv59"
        ? 2.5
        : enemyType === "超レアLv64"
        ? 3.0
        : 1.0;
    minPower = Math.ceil(minPower * pointMultiplier / 1000);
    expPower = Math.ceil(expPower * pointMultiplier / 1000);
    maxPower = Math.ceil(maxPower * pointMultiplier / 1000);
  }

  // イベント固有補正後の数値を反映しなおす
  intermediateResults.totalPerformance.attack = {
    minPower,
    expPower,
    maxPower,
  };
};
