import { DeckSimulatorData } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { IntermediateResults } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorIntermediateResults";

import { DIVRACE_ITEMS_DATA } from "@/components/decksim/data/divraceItemData";

import { calcEventGimmickEffect } from "@/components/decksim/simulator/calculator/eventSpecial/calcEventGimmickEffect";

import { returnNumber } from "@/lib/returnNumber";
import { setDeepValue } from "@/lib/setDeepValue";

export const calcEventSpecialDivrace = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  const stageName =
    inputData.eventSpecial.divrace?.stage ?? "チャレンジステージ";

  const specialGirlsEffect = returnNumber(
    inputData.eventSpecial.divrace?.specialGirlsEffect ?? 0
  );

  // 風向きアイテム
  const validItemEffect = {
    minPower: 0,
    expPower: 0,
    maxPower: 0,
  };
  // アイテムごとの補正後効果値を保管する
  const itemsKeyPowerArray: number[][] = [];

  Object.entries(DIVRACE_ITEMS_DATA).forEach(([key, effect]) => {
    const baseResult = calcEventGimmickEffect({
      effectType: effect.effectType,
      effectValue: effect.effectValue,
      effectCondition: effect.condition,
      inputData,
      intermediateResults,
      isGimmickDiffAdd:
        stageName === "ベースステージ" &&
        inputData.eventSpecial.divrace?.item?.[Number(key)]?.isValid === true
          ? true
          : false,
    });
    const challengeResult = calcEventGimmickEffect({
      effectType: effect.effectType,
      effectValue: effect.effectValue * 1.1,
      effectCondition: effect.condition,
      inputData,
      intermediateResults,
      isGimmickDiffAdd:
        stageName === "チャレンジステージ" &&
        inputData.eventSpecial.divrace?.item?.[Number(key)]?.isValid === true
          ? true
          : false,
    });

    // アイテム使用中であれば最終結果に加算する
    if (inputData.eventSpecial.divrace?.item?.[Number(key)]?.isValid) {
      if (stageName === "ベースステージ") {
        validItemEffect.minPower += baseResult.minPower;
        validItemEffect.expPower += baseResult.expPower;
        validItemEffect.maxPower += baseResult.maxPower;
      } else {
        validItemEffect.minPower += challengeResult.minPower;
        validItemEffect.expPower += challengeResult.expPower;
        validItemEffect.maxPower += challengeResult.maxPower;
      }
    }

    // 表示用と並べ替え用に補正後効果値の保管
    itemsKeyPowerArray.push([
      Number(key),
      baseResult.expPower,
      challengeResult.expPower,
    ]);
  });

  // 効果値を降順で並べ替えて効果期待値とその順番を設定する
  const sortedArray = itemsKeyPowerArray.sort(
    ([_1, _2, a], [__1, __2, b]) => b - a
  );
  sortedArray.forEach(([key, baseStage, challengeStage], index) => {
    const value = {
      baseStage,
      challengeStage,
      descOrder: index + 1,
    };
    setDeepValue(
      intermediateResults,
      `divraceSpecial.itemEffect.${key}`,
      value
    );
  });

  let limiterOver = 0;

  // ガール単位の下限リミット処理（-100%が重なっても0以下にはならない）
  // ついでにeventGimmickTotalPowerとeventGimmickTotalAscOrderを設定
  {
    (["mainScenes", "subScenes"] as const).forEach((mainOrSub) => {
      // シーンごとの補正後効果値を保管する
      const keyPowerArray: number[][] = [];

      const scenesData = intermediateResults[mainOrSub]["attack"] ?? {};
      const keys = Object.keys(scenesData).filter(
        (key) => key !== "basePowerArray"
      );

      keys.forEach((key) => {
        const basePowerDict = intermediateResults[mainOrSub]["attack"][
          Number(key)
        ]?.effectMatrix?.["base"] ?? {
          scenePower: 0,
          strapEffect: 0,
          preciousEffect: 0,
        };
        const baseTotalPower =
          basePowerDict.scenePower +
          basePowerDict.strapEffect +
          basePowerDict.preciousEffect;

        const { estimatedPower, eventGimmickDiff } = scenesData[Number(key)];
        let baseDiff = eventGimmickDiff?.base ?? 0;
        const deckDiff = eventGimmickDiff?.deck ?? 0;
        const limitBreakDiff = eventGimmickDiff?.limitBreak ?? 0;
        const petitEffectsDiff = eventGimmickDiff?.petitEffects ?? 0;

        // 複数のデバフが重なっても攻援力の100% を超える分は帳消しにするため
        // limiterOverに加算
        if (baseTotalPower + baseDiff < 0) {
          limiterOver -= baseTotalPower + baseDiff;
          // 差し引きゼロになるように上書き。
          baseDiff = -baseTotalPower;
        }

        const eventGimmickTotalPower =
          (estimatedPower ?? 0) +
          baseDiff +
          deckDiff +
          limitBreakDiff +
          petitEffectsDiff;

        // 表示用と並べ替え用に補正後効果値の保管
        keyPowerArray.push([Number(key), eventGimmickTotalPower]);
      });

      // 効果値を昇順で並べ替えてeventGimmickTotalPowerとその順番を設定する
      const sortedArray = keyPowerArray.sort(([_, a], [__, b]) => a - b);
      sortedArray.forEach(([key, power], index) => {
        intermediateResults[mainOrSub]["attack"][
          Number(key)
        ].eventGimmickTotalPower = power;
        intermediateResults[mainOrSub]["attack"][
          Number(key)
        ].eventGimmickTotalAscOrder = index + 1;
      });
    });
  }

  // ぷちセンバツの下限リミット処理。0を下回る場合は limiterOverに加算。
  {
    const detailMap = intermediateResults.petitGirls.details ?? {};
    const beforeTotalAttack = returnNumber(
      inputData.petitGirls.totalPower.attack
    );
    const beforeBase = Object.values(detailMap).reduce((sum, value) => {
      return (
        sum +
        value.attackTotal.SWEETタイプ +
        value.attackTotal.COOLタイプ +
        value.attackTotal.POPタイプ
      );
    }, 0);
    const beforeSkill = beforeTotalAttack - beforeBase;

    const baseEffect =
      intermediateResults.petitGirls.eventGimmickDiff?.base ?? 0;
    const skillEffect =
      intermediateResults.petitGirls.eventGimmickDiff?.skill ?? 0;

    const afterBase = beforeBase + baseEffect;
    const afterSkill = beforeSkill + skillEffect;

    if (afterBase < 0) {
      limiterOver -= afterBase;
    }
    if (afterSkill < 0) {
      limiterOver -= afterSkill;
    }
  }

  // 声援の下限リミット簡易処理。0を下回る場合は limiterOverに加算。
  // 声援のeventGimmickTotalPowerを設定。
  // 本来であればmin/exp/maxを別個に計算するべきだが、
  // 100%を超えるのはほぼないと思われるのでOK
  (["mainSkills", "subSwitches"] as const).forEach((mainOrSub) => {
    const skillsData = intermediateResults[mainOrSub]["attack"] ?? {};

    Object.entries(skillsData).forEach(
      ([key, { estimatedPower, eventGimmickDiff }]) => {
        const total = (estimatedPower ?? 0) + (eventGimmickDiff ?? 0);
        if (total < 0) {
          limiterOver -= total;
          intermediateResults[mainOrSub]["attack"][
            Number(key)
          ].eventGimmickTotalPower = 0;
        } else {
          intermediateResults[mainOrSub]["attack"][
            Number(key)
          ].eventGimmickTotalPower = total;
        }
      }
    );
  });

  let { minPower, expPower, maxPower } =
    intermediateResults.totalPerformance.attack;

  minPower =
    (minPower ?? 0) +
    specialGirlsEffect +
    validItemEffect.minPower +
    limiterOver;
  expPower =
    (expPower ?? 0) +
    specialGirlsEffect +
    validItemEffect.expPower +
    limiterOver;
  maxPower =
    (maxPower ?? 0) +
    specialGirlsEffect +
    validItemEffect.maxPower +
    limiterOver;

  // イベント固有補正後の数値を反映しなおす
  intermediateResults.totalPerformance.attack = {
    minPower,
    expPower,
    maxPower,
  };
};
