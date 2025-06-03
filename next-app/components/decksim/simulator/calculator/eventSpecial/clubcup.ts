import {
  DeckSimulatorData,
  DeckSimulatorCommonData,
} from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { IntermediateResults } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorIntermediateResults";

import { returnNumber } from "@/lib/returnNumber";

export const calcEventSpecialClubcup = ({
  inputData,
  commonData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  commonData: DeckSimulatorCommonData;
  intermediateResults: IntermediateResults;
}) => {
  let attackUpBonus = returnNumber(
    inputData.eventSpecial.clubcup?.attackUpBonus ?? 50
  );
  if (attackUpBonus < 0) attackUpBonus = 0;
  if (attackUpBonus > 50) attackUpBonus = 50;

  const isWinBonus = inputData.eventSpecial.clubcup?.isWinBonus ?? true;

  const isConvertPoint =
    inputData.eventSpecial.clubcup?.isConvertPoint ?? false;

  let pointUpBonus = returnNumber(
    inputData.eventSpecial.clubcup?.pointUpBonus ?? 200
  );
  if (pointUpBonus < 0) pointUpBonus = 0;
  if (pointUpBonus > 200) pointUpBonus = 200;

  const attackTypeNum =
    inputData.eventSpecial.clubcup?.attackType === undefined
      ? 1
      : inputData.eventSpecial.clubcup.attackType === "全力勧誘"
      ? 1
      : inputData.eventSpecial.clubcup.attackType === "全力勧誘×3"
      ? 3
      : 1;

  let specialGirlsEffectPercent = returnNumber(
    inputData.eventSpecial.clubcup?.specialGirlsEffectPercent ?? 0
  );
  if (specialGirlsEffectPercent < 0) specialGirlsEffectPercent = 0;

  let specialGirlsEffectFix = returnNumber(
    inputData.eventSpecial.clubcup?.specialGirlsEffectFix ?? 0
  );
  if (specialGirlsEffectFix < 0) specialGirlsEffectFix = 0;

  const isRivalLeader = inputData.eventSpecial.clubcup?.isRivalLeader ?? false;
  const isMyselfLeader =
    commonData.playerData.clubPosition === "leader" ||
    commonData.playerData.clubPosition === "subLeader"
      ? true
      : false;

  let rivalSkillEffectDown = returnNumber(
    inputData.eventSpecial.clubcup?.rivalSkillEffectDown ?? 0
  );
  if (rivalSkillEffectDown < 0) rivalSkillEffectDown = 0;
  if (rivalSkillEffectDown > 100) rivalSkillEffectDown = 100;

  let { minPower, expPower, maxPower } =
    intermediateResults.totalPerformance.attack;
  const skillEffect = intermediateResults.totalPerformance.attack.skillEffect;

  // 攻援力UPボーナスが掛かるのはベース分とセンバツボーナスだけなのでそれだけ合計する
  const attackUpBonusEffect = calcAttackUpBonusEffect({
    intermediateResults,
    attackUpBonus,
  });

  minPower = Math.ceil(
    ((minPower ?? 0) + attackUpBonusEffect) * (1 + (isWinBonus ? 0.1 : 0))
  );
  expPower = Math.ceil(
    ((expPower ?? 0) + attackUpBonusEffect) * (1 + (isWinBonus ? 0.1 : 0))
  );
  maxPower = Math.ceil(
    ((maxPower ?? 0) + attackUpBonusEffect) * (1 + (isWinBonus ? 0.1 : 0))
  );

  // ポイント変換を行う場合
  if (isConvertPoint) {
    intermediateResults.totalPerformance.isConvertPoint = true;

    let pointMultiplier = 1000000;

    // 攻コスト補正
    const maxAttackCost = returnNumber(
      commonData.playerData.maxAttackCost ?? 1000
    );
    pointMultiplier *= Math.pow(maxAttackCost, 0.3);

    // 固定値 0.3
    pointMultiplier *= 0.3;

    // 勧誘ptUp (%)
    if (isMyselfLeader) pointUpBonus += 5;
    if (isRivalLeader) pointUpBonus += 5;
    pointMultiplier *= 1 + pointUpBonus / 100;

    // 声援効果Up (自分)
    pointMultiplier *=
      1 + (intermediateResults.totalPerformance.attack.skillEffect ?? 0) / 100;

    // 声援効果Down (相手)
    pointMultiplier *= 1 - rivalSkillEffectDown / 100;

    // SP応援 (%)
    pointMultiplier *= 1 + specialGirlsEffectPercent / 100;

    // 事前に計算した乗数を使って発揮値を獲得ptに変換する
    minPower = Math.ceil(
      ((Math.pow(minPower, 0.5) * pointMultiplier) / 1000000 +
        specialGirlsEffectFix) *
        attackTypeNum
    );
    expPower = Math.ceil(
      ((Math.pow(expPower, 0.5) * pointMultiplier) / 1000000 +
        specialGirlsEffectFix) *
        attackTypeNum
    );
    maxPower = Math.ceil(
      ((Math.pow(maxPower, 0.5) * pointMultiplier) / 1000000 +
        specialGirlsEffectFix) *
        attackTypeNum
    );
  }

  // イベント固有補正後の数値を反映しなおす
  intermediateResults.totalPerformance.attack = {
    minPower,
    expPower,
    maxPower,
    skillEffect,
  };
};

/**
 * すべてのシーンを横断してAttackUpBonusの合計効果値を算出して返す
 * ついでに シーンごとに estimatedPowerに効果値を加算して昇順番号も更新する
 *
 * @param {{
 *   intermediateResults: IntermediateResults;
 *   attackUpBonus
 * }} param0
 * @returns {number} AttackUpBonusの合計効果値
 */
const calcAttackUpBonusEffect = ({
  intermediateResults,
  attackUpBonus,
}: {
  intermediateResults: IntermediateResults;
  attackUpBonus: number;
}): number => {
  let total = 0;

  // 主セン/副セン、攻援/守援 のシーンごとに各ボーナス効果値を合計する
  (["mainScenes", "subScenes"] as const).forEach((mainOrSub) => {
    // シーンごとの補正後効果値を保管する
    const keyPowerArray: number[][] = [];

    const scenesData = intermediateResults[mainOrSub]["attack"] ?? {};
    const keys = Object.keys(scenesData).filter(
      (key) => key !== "basePowerArray"
    );

    keys.forEach((key) => {
      const effectMatrix = scenesData[Number(key)]?.effectMatrix;
      const estimatedPower = scenesData[Number(key)]?.estimatedPower;

      // effectMatrixもしくはestimatedPowerがない場合はreturn (通常ありえない)
      if (!effectMatrix || !estimatedPower) return;

      const baseDict = effectMatrix["base"];
      const deckDict = effectMatrix["deck"];
      const subTotal =
        baseDict.scenePower +
        baseDict.strapEffect +
        baseDict.preciousEffect +
        deckDict.scenePower +
        deckDict.strapEffect +
        deckDict.preciousEffect;
      total += Math.ceil((subTotal * attackUpBonus) / 100);

      // 表示用と並べ替え用に補正後効果値の保管
      keyPowerArray.push([
        Number(key),
        estimatedPower + Math.ceil((subTotal * attackUpBonus) / 100),
      ]);
    });

    // 効果値を昇順で並べ替えてEstimatedPowerとその順番を設定する
    const sortedArray = keyPowerArray.sort(([_, a], [__, b]) => a - b);
    sortedArray.forEach(([key, power], index) => {
      intermediateResults[mainOrSub]["attack"][Number(key)].estimatedPower =
        power;
      intermediateResults[mainOrSub]["attack"][
        Number(key)
      ].estimatedPowerAscOrder = index + 1;
    });
  });

  return total;
};
