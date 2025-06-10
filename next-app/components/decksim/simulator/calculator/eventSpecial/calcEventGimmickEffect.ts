import {
  DeckSimulatorData,
  SceneParameters,
} from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { IntermediateResults } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorIntermediateResults";

import {
  BONUS_DATA_COMMON,
  BONUS_DATA_PER_EVENT,
} from "@/components/decksim/data/bonusData";

import { calcPetitEffectsPowerDict } from "@/components/decksim/simulator/calculator/createEffectMatrix";
import { calcLimitBreakPowerDict } from "@/components/decksim/simulator/calculator/createEffectMatrix";
import { calcDeckBonusPowerDict } from "@/components/decksim/simulator/calculator/createEffectMatrix";

import { returnNumber } from "@/lib/returnNumber";
import { setDeepValue } from "@/lib/setDeepValue";

export const calcEventGimmickEffect = ({
  effectType,
  effectValue,
  effectCondition,
  inputData,
  intermediateResults,
  isGimmickDiffAdd = true,
}: {
  effectType:
    | "ガール"
    | "ぷちセンバツ"
    | "応援力効果"
    | "声援効果"
    | "Ex進展ボーナス"
    | "センバツボーナス"
    | "SP応援効果"
    | "スキル効果"
    | "なし";
  effectValue: number;
  effectCondition: {
    isPreSelect?: boolean;
    type?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "全タイプ";
    rarityNum?: number;
    cost?: number;
    skillLv?: number;
    grade?: "1年生" | "2年生" | "3年生" | "その他";
  };
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
  isGimmickDiffAdd?: boolean;
}): {
  minPower: number;
  expPower: number;
  maxPower: number;
} => {
  const effectResult = {
    minPower: 0,
    expPower: 0,
    maxPower: 0,
  };

  // valueが0の場合は早期リターン
  if (effectValue === 0) return effectResult;
  // 下限は -100 % まで
  const rate = effectValue < -100 ? -100 : effectValue;

  switch (effectType) {
    case "ガール":
      const sceneEffectValue = calcSceneEffect({
        rate,
        effectCondition,
        inputData,
        intermediateResults,
        isGimmickDiffAdd,
      });
      effectResult.minPower = sceneEffectValue.minPower;
      effectResult.expPower = sceneEffectValue.expPower;
      effectResult.maxPower = sceneEffectValue.maxPower;
      break;

    case "ぷちセンバツ":
      const petitGirlValue = calcPetitGirlEffect({
        rate,
        effectCondition,
        inputData,
        intermediateResults,
        isGimmickDiffAdd,
      });
      effectResult.minPower = petitGirlValue.minPower;
      effectResult.expPower = petitGirlValue.expPower;
      effectResult.maxPower = petitGirlValue.maxPower;
      break;

    case "応援力効果":
      const petitEffectValue = calcPetitEffectEffect({
        rate,
        inputData,
        intermediateResults,
        isGimmickDiffAdd,
      });
      effectResult.minPower = petitEffectValue.minPower;
      effectResult.expPower = petitEffectValue.expPower;
      effectResult.maxPower = petitEffectValue.maxPower;
      break;

    case "声援効果":
      const girlSkillValue = calcGirlSkillEffect({
        rate,
        intermediateResults,
        isGimmickDiffAdd,
      });
      effectResult.minPower = girlSkillValue.minPower;
      effectResult.expPower = girlSkillValue.expPower;
      effectResult.maxPower = girlSkillValue.maxPower;
      break;

    case "Ex進展ボーナス":
      const limitBreakValue = calcLimitBreakEffect({
        rate,
        inputData,
        intermediateResults,
        isGimmickDiffAdd,
      });
      effectResult.minPower = limitBreakValue.minPower;
      effectResult.expPower = limitBreakValue.expPower;
      effectResult.maxPower = limitBreakValue.maxPower;
      break;

    case "センバツボーナス":
      const deckBonusValue = calcDeckBonusEffect({
        rate,
        inputData,
        intermediateResults,
        isGimmickDiffAdd,
      });
      effectResult.minPower = deckBonusValue.minPower;
      effectResult.expPower = deckBonusValue.expPower;
      effectResult.maxPower = deckBonusValue.maxPower;
      break;

    case "SP応援効果":
      const specialGirlsEffect = returnNumber(
        inputData.eventSpecial.board?.specialGirlsEffect ?? 0
      );
      const specialGirlsValue = Math.ceil((specialGirlsEffect * rate) / 100);
      effectResult.minPower = specialGirlsValue;
      effectResult.expPower = specialGirlsValue;
      effectResult.maxPower = specialGirlsValue;
      break;

    case "スキル効果":
      const petitSkillValue = calcPetitSkillEffect({
        rate,
        intermediateResults,
        isGimmickDiffAdd,
      });
      effectResult.minPower = petitSkillValue.minPower;
      effectResult.expPower = petitSkillValue.expPower;
      effectResult.maxPower = petitSkillValue.maxPower;
      break;

    case "なし":
      break;

    default:
      break;
  }

  return effectResult;
};

const calcSceneEffect = ({
  rate,
  effectCondition,
  inputData,
  intermediateResults,
  isGimmickDiffAdd = true,
}: {
  rate: number;
  effectCondition: {
    isPreSelect?: boolean;
    type?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "全タイプ";
    rarityNum?: number;
    cost?: number;
    skillLv?: number;
    grade?: "1年生" | "2年生" | "3年生" | "その他";
  };
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
  isGimmickDiffAdd?: boolean;
}): {
  minPower: number;
  expPower: number;
  maxPower: number;
} => {
  const effectResult = {
    minPower: 0,
    expPower: 0,
    maxPower: 0,
  };
  const eventId = inputData.dataType;
  const keyName = "base";

  (["mainScenes", "subScenes"] as const).forEach((mainOrSub) => {
    const scenesData = intermediateResults[mainOrSub]["attack"] ?? {};
    const keys = Object.keys(scenesData).filter(
      (key) => key !== "basePowerArray"
    );

    keys.forEach((key) => {
      const sceneData = inputData[mainOrSub]["attack"][Number(key)];
      const preciousTotal =
        intermediateResults[mainOrSub]["attack"][Number(key)]
          .preciousSceneEffect?.total ?? 0;

      // 条件に合致するかの判定
      if (!isMatchCondition({ sceneData, effectCondition })) return;

      // 効果加算前の数値はeffectMatrixから数値を取得
      const beforePowerDict = intermediateResults[mainOrSub]["attack"][
        Number(key)
      ]?.effectMatrix?.[keyName] ?? {
        scenePower: 0,
        strapEffect: 0,
        preciousEffect: 0,
      };
      const beforeTotalPower =
        Math.ceil(beforePowerDict.scenePower) +
        Math.ceil(beforePowerDict.strapEffect) +
        Math.ceil(beforePowerDict.preciousEffect);

      // 効果加算後でPowerDictを再算出
      const afterPowerDict = {
        scenePower: 0,
        strapEffect: 0,
        preciousEffect: 0,
      };
      const effectiveRate = BONUS_DATA_PER_EVENT[eventId];
      const bonusValue = 100;
      if (mainOrSub === "mainScenes") {
        afterPowerDict.scenePower = Math.ceil(
          returnNumber(sceneData.basePower) *
            (bonusValue / 100) *
            (effectiveRate.mainScenes[keyName] / 100) *
            (1 + rate / 100)
        );
        afterPowerDict.strapEffect = Math.ceil(
          returnNumber(sceneData.strap) *
            (bonusValue / 100) *
            (effectiveRate.mainStrap[keyName] / 100) *
            (1 + rate / 100)
        );
        afterPowerDict.preciousEffect = Math.ceil(
          preciousTotal *
            (bonusValue / 100) *
            (effectiveRate.mainPrecious[keyName] / 100) *
            (1 + rate / 100)
        );
      } else {
        afterPowerDict.scenePower = Math.ceil(
          returnNumber(sceneData.basePower) *
            (bonusValue / 100) *
            (effectiveRate.subScenes[keyName] / 100) *
            (1 + rate / 100)
        );
        afterPowerDict.preciousEffect = Math.ceil(
          preciousTotal *
            (bonusValue / 100) *
            (effectiveRate.subPrecious[keyName] / 100) *
            (1 + rate / 100)
        );
      }
      const afterTotalPower =
        Math.ceil(afterPowerDict.scenePower) +
        Math.ceil(afterPowerDict.strapEffect) +
        Math.ceil(afterPowerDict.preciousEffect);

      // 差を取って発動時の効果値を確定
      const diffPower = afterTotalPower - beforeTotalPower;

      effectResult.minPower += diffPower;
      effectResult.expPower += diffPower;
      effectResult.maxPower += diffPower;

      if (isGimmickDiffAdd) {
        const beforeNum =
          intermediateResults[mainOrSub]["attack"][Number(key)]
            .eventGimmickDiff?.[keyName] ?? 0;
        setDeepValue(
          intermediateResults,
          `${mainOrSub}.attack.${key}.eventGimmickDiff.${keyName}`,
          beforeNum + diffPower
        );
      }
    });
  });

  return effectResult;
};

const calcPetitGirlEffect = ({
  rate,
  effectCondition,
  inputData,
  intermediateResults,
  isGimmickDiffAdd = true,
}: {
  rate: number;
  effectCondition: {
    isPreSelect?: boolean;
    type?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "全タイプ";
    rarityNum?: number;
    cost?: number;
    skillLv?: number;
    grade?: "1年生" | "2年生" | "3年生" | "その他";
  };
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
  isGimmickDiffAdd?: boolean;
}): {
  minPower: number;
  expPower: number;
  maxPower: number;
} => {
  const effectResult = {
    minPower: 0,
    expPower: 0,
    maxPower: 0,
  };

  if (effectCondition.type === undefined) {
    // 課外活動コンテストの "ぷちセンバツの攻援力UP" の場合
    // スキル効果分を含めた総攻援に対して効果が掛かる
    const petitGirlsTotalPower = Math.ceil(
      (returnNumber(inputData.petitGirls.totalPower.attack) *
        BONUS_DATA_PER_EVENT[inputData.dataType].petitGirls.base) /
        100
    );
    const totalEffect = Math.ceil((petitGirlsTotalPower * rate) / 100);
    effectResult.minPower += totalEffect;
    effectResult.expPower += totalEffect;
    effectResult.maxPower += totalEffect;
  } else {
    // 聖櫻ワールドの "ぶちセンバツの攻援力UP" の場合
    // スキル効果分を含まない素の攻援力に対してのみ効果が掛かる
    const detailMap = intermediateResults.petitGirls.details ?? {};
    const typeCondition = effectCondition.type;
    const isSweetValid =
      typeCondition === "SWEETタイプ" || typeCondition === "全タイプ";
    const isCoolValid =
      typeCondition === "COOLタイプ" || typeCondition === "全タイプ";
    const isPopValid =
      typeCondition === "POPタイプ" || typeCondition === "全タイプ";

    Object.values(detailMap).forEach(({ attackTotal }) => {
      const sweetEffect = Math.ceil(
        attackTotal.SWEETタイプ * (isSweetValid ? 1 : 0) * (rate / 100)
      );
      const coolEffect = Math.ceil(
        attackTotal.COOLタイプ * (isCoolValid ? 1 : 0) * (rate / 100)
      );
      const popEffect = Math.ceil(
        attackTotal.POPタイプ * (isPopValid ? 1 : 0) * (rate / 100)
      );

      const totalEffect = sweetEffect + coolEffect + popEffect;
      effectResult.minPower += totalEffect;
      effectResult.expPower += totalEffect;
      effectResult.maxPower += totalEffect;
    });
  }

  if (isGimmickDiffAdd) {
    if (!intermediateResults.petitGirls.eventGimmickDiff) {
      intermediateResults.petitGirls.eventGimmickDiff = {
        base: 0,
        skill: 0,
      };
    }

    intermediateResults.petitGirls.eventGimmickDiff.base +=
      effectResult.expPower;
  }

  return effectResult;
};

const calcPetitEffectEffect = ({
  rate,
  inputData,
  intermediateResults,
  isGimmickDiffAdd = true,
}: {
  rate: number;
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
  isGimmickDiffAdd?: boolean;
}): {
  minPower: number;
  expPower: number;
  maxPower: number;
} => {
  const effectResult = {
    minPower: 0,
    expPower: 0,
    maxPower: 0,
  };
  const eventId = inputData.dataType;
  const keyName = "petitEffects";

  (["mainScenes", "subScenes"] as const).forEach((mainOrSub) => {
    const scenesData = intermediateResults[mainOrSub]["attack"] ?? {};
    const keys = Object.keys(scenesData).filter(
      (key) => key !== "basePowerArray"
    );

    keys.forEach((key) => {
      const sceneData = inputData[mainOrSub]["attack"][Number(key)];
      const preciousTotal =
        intermediateResults[mainOrSub]["attack"][Number(key)]
          .preciousSceneEffect?.total ?? 0;

      // 効果加算前の数値はeffectMatrixから数値を取得
      const beforePowerDict = intermediateResults[mainOrSub]["attack"][
        Number(key)
      ]?.effectMatrix?.[keyName] ?? {
        scenePower: 0,
        strapEffect: 0,
        preciousEffect: 0,
      };
      const beforeTotalPower =
        Math.ceil(beforePowerDict.scenePower) +
        Math.ceil(beforePowerDict.strapEffect) +
        Math.ceil(beforePowerDict.preciousEffect);

      // 効果加算後でPowerDictを再算出
      const afterPowerDict = calcPetitEffectsPowerDict({
        eventId,
        mainOrSub,
        attackOrDefense: "attack",
        sceneData,
        preciousTotal,
        petitGirlsEffects: intermediateResults.petitGirls.effects,
        bonusRate: 1 + rate / 100,
      });
      const afterTotalPower =
        Math.ceil(afterPowerDict.scenePower) +
        Math.ceil(afterPowerDict.strapEffect) +
        Math.ceil(afterPowerDict.preciousEffect);

      // 差を取って発動時の効果値を確定
      const diffPower = afterTotalPower - beforeTotalPower;

      effectResult.minPower += diffPower;
      effectResult.expPower += diffPower;
      effectResult.maxPower += diffPower;

      if (isGimmickDiffAdd) {
        const beforeNum =
          intermediateResults[mainOrSub]["attack"][Number(key)]
            .eventGimmickDiff?.[keyName] ?? 0;
        setDeepValue(
          intermediateResults,
          `${mainOrSub}.attack.${key}.eventGimmickDiff.${keyName}`,
          beforeNum + diffPower
        );
      }
    });
  });

  return effectResult;
};

const calcGirlSkillEffect = ({
  rate,
  intermediateResults,
  isGimmickDiffAdd = true,
}: {
  rate: number;
  intermediateResults: IntermediateResults;
  isGimmickDiffAdd?: boolean;
}): {
  minPower: number;
  expPower: number;
  maxPower: number;
} => {
  const effectResult = {
    minPower: 0,
    expPower: 0,
    maxPower: 0,
  };
  // const eventId = inputData.dataType;
  const bonusRate = rate;

  const skillPerformance = intermediateResults.skillPerformance;

  // skillPerformanceが存在しなければreturn(通常ありえない)
  if (!skillPerformance) return effectResult;

  effectResult.minPower += Math.ceil(
    skillPerformance.attack.minPower * (bonusRate / 100)
  );
  effectResult.expPower += Math.ceil(
    skillPerformance.attack.expPower * (bonusRate / 100)
  );
  effectResult.maxPower += Math.ceil(
    skillPerformance.attack.maxPower * (bonusRate / 100)
  );

  if (isGimmickDiffAdd) {
    (["mainSkills", "subSwitches"] as const).forEach((mainOrSub) => {
      const skillsData = intermediateResults[mainOrSub]["attack"] ?? {};

      Object.entries(skillsData).forEach(([key, { estimatedPower }]) => {
        const bonusRatePowerDiff = Math.ceil(
          (estimatedPower ?? 0) * (bonusRate / 100)
        );
        const beforeNum =
          intermediateResults[mainOrSub]["attack"][Number(key)]
            .eventGimmickDiff ?? 0;
        intermediateResults[mainOrSub]["attack"][Number(key)].eventGimmickDiff =
          beforeNum + bonusRatePowerDiff;
      });
    });
  }

  return effectResult;
};

const calcLimitBreakEffect = ({
  rate,
  inputData,
  intermediateResults,
  isGimmickDiffAdd = true,
}: {
  rate: number;
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
  isGimmickDiffAdd?: boolean;
}): {
  minPower: number;
  expPower: number;
  maxPower: number;
} => {
  const effectResult = {
    minPower: 0,
    expPower: 0,
    maxPower: 0,
  };
  const eventId = inputData.dataType;
  const keyName = "limitBreak";

  (["mainScenes", "subScenes"] as const).forEach((mainOrSub) => {
    const scenesData = intermediateResults[mainOrSub]["attack"] ?? {};
    const keys = Object.keys(scenesData).filter(
      (key) => key !== "basePowerArray"
    );

    keys.forEach((key) => {
      const sceneData = inputData[mainOrSub]["attack"][Number(key)];
      const preciousTotal =
        intermediateResults[mainOrSub]["attack"][Number(key)]
          .preciousSceneEffect?.total ?? 0;

      // 効果加算前の数値はeffectMatrixから数値を取得
      const beforePowerDict = intermediateResults[mainOrSub]["attack"][
        Number(key)
      ].effectMatrix?.[keyName] ?? {
        scenePower: 0,
        strapEffect: 0,
        preciousEffect: 0,
      };
      const beforeTotalPower =
        Math.ceil(beforePowerDict.scenePower) +
        Math.ceil(beforePowerDict.strapEffect) +
        Math.ceil(beforePowerDict.preciousEffect);

      // 効果加算後でPowerDictを再算出
      const afterPowerDict = calcLimitBreakPowerDict({
        eventId,
        mainOrSub,
        attackOrDefense: "attack",
        sceneData,
        preciousTotal,
        bonusRate: 1 + rate / 100,
      });
      const afterTotalPower =
        Math.ceil(afterPowerDict.scenePower) +
        Math.ceil(afterPowerDict.strapEffect) +
        Math.ceil(afterPowerDict.preciousEffect);

      // 差を取って発動時の効果値を確定
      const diffPower = afterTotalPower - beforeTotalPower;

      // 発動率を考慮して加算していく
      // effectResult.minPower += 0;
      effectResult.expPower += Math.ceil(
        (diffPower * BONUS_DATA_COMMON.limitBreak.probability) / 100
      );
      effectResult.maxPower += diffPower;

      if (isGimmickDiffAdd) {
        const beforeNum =
          intermediateResults[mainOrSub]["attack"][Number(key)]
            .eventGimmickDiff?.[keyName] ?? 0;
        setDeepValue(
          intermediateResults,
          `${mainOrSub}.attack.${key}.eventGimmickDiff.${keyName}`,
          beforeNum +
            Math.ceil(
              (diffPower * BONUS_DATA_COMMON.limitBreak.probability) / 100
            )
        );
      }
    });
  });

  return effectResult;
};

const calcDeckBonusEffect = ({
  rate,
  inputData,
  intermediateResults,
  isGimmickDiffAdd = true,
}: {
  rate: number;
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
  isGimmickDiffAdd?: boolean;
}): {
  minPower: number;
  expPower: number;
  maxPower: number;
} => {
  const effectResult = {
    minPower: 0,
    expPower: 0,
    maxPower: 0,
  };
  const eventId = inputData.dataType;
  const keyName = "deck";

  (["mainScenes", "subScenes"] as const).forEach((mainOrSub) => {
    const scenesData = intermediateResults[mainOrSub]["attack"] ?? {};
    const keys = Object.keys(scenesData).filter(
      (key) => key !== "basePowerArray"
    );

    keys.forEach((key) => {
      const sceneData = inputData[mainOrSub]["attack"][Number(key)];
      const preciousTotal =
        intermediateResults[mainOrSub]["attack"][Number(key)]
          .preciousSceneEffect?.total ?? 0;

      // 効果加算前の数値はeffectMatrixから数値を取得
      const beforePowerDict = intermediateResults[mainOrSub]["attack"][
        Number(key)
      ]?.effectMatrix?.[keyName] ?? {
        scenePower: 0,
        strapEffect: 0,
        preciousEffect: 0,
      };
      const beforeTotalPower =
        Math.ceil(beforePowerDict.scenePower) +
        Math.ceil(beforePowerDict.strapEffect) +
        Math.ceil(beforePowerDict.preciousEffect);

      // 効果加算後でPowerDictを再算出
      const afterPowerDict = calcDeckBonusPowerDict({
        eventId,
        mainOrSub,
        attackOrDefense: "attack",
        sceneData,
        preciousTotal,
        deckBonus: intermediateResults.deckBonus,
        bonusRate: 1 + rate / 100,
      });
      const afterTotalPower =
        Math.ceil(afterPowerDict.scenePower) +
        Math.ceil(afterPowerDict.strapEffect) +
        Math.ceil(afterPowerDict.preciousEffect);

      // 差を取って発動時の効果値を確定
      const diffPower = afterTotalPower - beforeTotalPower;

      effectResult.minPower += diffPower;
      effectResult.expPower += diffPower;
      effectResult.maxPower += diffPower;

      if (isGimmickDiffAdd) {
        const beforeNum =
          intermediateResults[mainOrSub]["attack"][Number(key)]
            .eventGimmickDiff?.[keyName] ?? 0;
        setDeepValue(
          intermediateResults,
          `${mainOrSub}.attack.${key}.eventGimmickDiff.${keyName}`,
          beforeNum + diffPower
        );
      }
    });
  });

  return effectResult;
};

const calcPetitSkillEffect = ({
  rate,
  intermediateResults,
  isGimmickDiffAdd = true,
}: {
  rate: number;
  intermediateResults: IntermediateResults;
  isGimmickDiffAdd?: boolean;
}): {
  minPower: number;
  expPower: number;
  maxPower: number;
} => {
  const effectResult = {
    minPower: 0,
    expPower: 0,
    maxPower: 0,
  };

  const detailMap = intermediateResults.petitGirls.details ?? {};
  Object.values(detailMap).forEach(({ attackTotal, skillTotal }) => {
    const sweetEffect = Math.ceil(
      attackTotal.SWEETタイプ *
        ((skillTotal.SWEETタイプ + skillTotal.全タイプ) / 100) *
        (rate / 100)
    );
    const coolEffect = Math.ceil(
      attackTotal.COOLタイプ *
        ((skillTotal.COOLタイプ + skillTotal.全タイプ) / 100) *
        (rate / 100)
    );
    const popEffect = Math.ceil(
      attackTotal.POPタイプ *
        ((skillTotal.POPタイプ + skillTotal.全タイプ) / 100) *
        (rate / 100)
    );

    const totalEffect = sweetEffect + coolEffect + popEffect;
    effectResult.minPower += totalEffect;
    effectResult.expPower += totalEffect;
    effectResult.maxPower += totalEffect;
  });

  if (isGimmickDiffAdd) {
    if (!intermediateResults.petitGirls.eventGimmickDiff) {
      intermediateResults.petitGirls.eventGimmickDiff = {
        base: 0,
        skill: 0,
      };
    }

    intermediateResults.petitGirls.eventGimmickDiff.skill +=
      effectResult.expPower;
  }

  return effectResult;
};

const isMatchCondition = ({
  sceneData,
  effectCondition,
}: {
  sceneData: SceneParameters;
  effectCondition: {
    isPreSelect?: boolean;
    type?: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "全タイプ";
    rarityNum?: number;
    cost?: number;
    skillLv?: number;
    grade?: "1年生" | "2年生" | "3年生" | "その他";
  };
}): boolean => {
  // 課外活動コンテストの予選グループガール
  if (effectCondition.isPreSelect === true) {
    if (sceneData.isSpecial !== true) return false;
  }

  // タイプ条件
  if (effectCondition.type !== undefined) {
    switch (effectCondition.type) {
      case "SWEETタイプ":
        if (sceneData.type !== "SWEETタイプ") return false;
        break;

      case "COOLタイプ":
        if (sceneData.type !== "COOLタイプ") return false;
        break;

      case "POPタイプ":
        if (sceneData.type !== "POPタイプ") return false;
        break;

      default:
        break;
    }
  }

  // レアリティ条件
  if (effectCondition.rarityNum !== undefined) {
    const rarityNum =
      sceneData.rarity === "Luv"
        ? 7
        : sceneData.rarity === "UR"
        ? 7
        : sceneData.rarity === "SSR"
        ? 6
        : 5;
    if (effectCondition.rarityNum > rarityNum) return false;
  }

  // コスト条件
  if (effectCondition.cost !== undefined) {
    const cost = returnNumber(sceneData.cost);
    if (effectCondition.cost > cost) return false;
  }

  // 声援Lv条件
  if (effectCondition.skillLv !== undefined) {
    const skillLv = returnNumber(sceneData.skillLv);
    if (effectCondition.skillLv > skillLv) return false;
  }

  // 学年条件
  if (effectCondition.grade !== undefined) {
    if (effectCondition.grade !== sceneData.grade) return false;
  }

  return true;
};
