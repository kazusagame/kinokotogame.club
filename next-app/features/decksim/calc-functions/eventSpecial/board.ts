import { DeckSimulatorData } from "@/features/decksim/type-definitions/DeckSimulatorData";
import { IntermediateResults } from "@/features/decksim/type-definitions/DeckSimulatorIntermediateResults";

import { BOARD_WEATHER_DATA } from "@/features/decksim/data/boardWeatherData";
import { BOARD_SPACE_DATA } from "@/features/decksim/data/boardSpaceData";

import { calcEventGimmickEffect } from "@/features/decksim/calc-functions/eventSpecial/calcEventGimmickEffect";

import { returnNumber } from "@/lib/returnNumber";
import { setDeepValue } from "@/lib/setDeepValue";

export const calcEventSpecialBoard = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  const specialGirlsEffect = returnNumber(
    inputData.eventSpecial.board?.specialGirlsEffect ?? 0
  );
  const weatherNum = returnNumber(
    inputData.eventSpecial.board?.weatherNum ?? 0
  );
  const spaceEffects = inputData.eventSpecial.board?.spaceEffects ?? {};

  // ぷちセンバツ詳細の集計を予め実施しておく
  sumPetitGirlsDetail({
    inputData,
    intermediateResults,
  });

  // 天気効果
  const weatherEffect = {
    minPower: 0,
    expPower: 0,
    maxPower: 0,
  };
  // 前回より天気が少ないなどの理由で該当する天気が無い場合は天気なしで上書き
  const currentWeather =
    BOARD_WEATHER_DATA[weatherNum] ?? BOARD_WEATHER_DATA[0];
  Object.entries(currentWeather.effectList).forEach(([key, effect]) => {
    const result = calcEventGimmickEffect({
      effectType: effect.effectType,
      effectValue: effect.effectValue,
      effectCondition: effect.condition,
      inputData,
      intermediateResults,
    });
    weatherEffect.minPower += result.minPower;
    weatherEffect.expPower += result.expPower;
    weatherEffect.maxPower += result.maxPower;
    setDeepValue(
      intermediateResults,
      `boardSpecial.weatherEffect.${key}`,
      result.expPower
    );
  });

  // マス効果
  const spaceEffect = {
    minPower: 0,
    expPower: 0,
    maxPower: 0,
  };
  Object.entries(BOARD_SPACE_DATA).forEach(([key, effect]) => {
    const result = calcEventGimmickEffect({
      effectType: effect.effectType,
      effectValue: returnNumber(spaceEffects?.[Number(key)]?.value ?? 0),
      effectCondition: effect.condition,
      inputData,
      intermediateResults,
    });
    spaceEffect.minPower += result.minPower;
    spaceEffect.expPower += result.expPower;
    spaceEffect.maxPower += result.maxPower;
    setDeepValue(
      intermediateResults,
      `boardSpecial.spaceEffect.${key}`,
      result.expPower
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
          Math.ceil(basePowerDict.scenePower) +
          Math.ceil(basePowerDict.strapEffect) +
          Math.ceil(basePowerDict.preciousEffect);

        const { estimatedPower, eventGimmickDiff } = scenesData[Number(key)];
        let baseDiff = eventGimmickDiff?.base ?? 0;
        const deckDiff = eventGimmickDiff?.deck ?? 0;
        const limitBreakDiff = eventGimmickDiff?.limitBreak ?? 0;
        const petitEffectsDiff = eventGimmickDiff?.petitEffects ?? 0;

        // 複数のデバフが重なっても攻援力の100% を超える分は帳消しにするため
        // limiterOverに加算
        if (baseTotalPower + baseDiff < 0) {
          limiterOver -= baseTotalPower + baseDiff
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
  // 天気効果とマス効果の両方でマイナスになって、かつ-100%を超えるのはほぼないと思われるので
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

  // 天気効果とマス効果を合算して合計ボーナス効果に表示
  const totalEffect = {
    minPower: weatherEffect.minPower + spaceEffect.minPower + limiterOver,
    expPower: weatherEffect.expPower + spaceEffect.expPower + limiterOver,
    maxPower: weatherEffect.maxPower + spaceEffect.maxPower + limiterOver,
  };
  // 合算結果がマイナスの場合、minとmaxが逆転するため合計ボーナス効果の表示上は入れ替えを行う。
  // あくまで合計ボーナス効果の表示上だけで必要な処置なのでtotalEffectの数値は以後参照してはいけない。
  if (totalEffect.minPower > totalEffect.maxPower) {
    const temp = totalEffect.minPower;
    totalEffect.minPower = totalEffect.maxPower;
    totalEffect.maxPower = temp;
  }
  (["minPower", "expPower", "maxPower"] as const).forEach((key) => {
    setDeepValue(
      intermediateResults,
      `boardSpecial.totalEffect.${key}`,
      totalEffect[key]
    );
  });

  let { minPower, expPower, maxPower } =
    intermediateResults.totalPerformance.attack;

  minPower =
    (minPower ?? 0) +
    specialGirlsEffect +
    weatherEffect.minPower +
    spaceEffect.minPower +
    limiterOver;
  expPower =
    (expPower ?? 0) +
    specialGirlsEffect +
    weatherEffect.expPower +
    spaceEffect.expPower +
    limiterOver;
  maxPower =
    (maxPower ?? 0) +
    specialGirlsEffect +
    weatherEffect.maxPower +
    spaceEffect.maxPower +
    limiterOver;

  // イベント固有補正後の数値を反映しなおす
  intermediateResults.totalPerformance.attack = {
    minPower,
    expPower,
    maxPower,
  };
};

/* ぷちセンバツの攻援力とスキル効果をグループごとに積算する*/
const sumPetitGirlsDetail = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  const detailMap: typeof intermediateResults.petitGirls.details = {
    1: {
      attackTotal: {
        SWEETタイプ: 0,
        COOLタイプ: 0,
        POPタイプ: 0,
      },
      skillTotal: {
        全タイプ: 0,
        SWEETタイプ: 0,
        COOLタイプ: 0,
        POPタイプ: 0,
      },
    },
    2: {
      attackTotal: {
        SWEETタイプ: 0,
        COOLタイプ: 0,
        POPタイプ: 0,
      },
      skillTotal: {
        全タイプ: 0,
        SWEETタイプ: 0,
        COOLタイプ: 0,
        POPタイプ: 0,
      },
    },
    3: {
      attackTotal: {
        SWEETタイプ: 0,
        COOLタイプ: 0,
        POPタイプ: 0,
      },
      skillTotal: {
        全タイプ: 0,
        SWEETタイプ: 0,
        COOLタイプ: 0,
        POPタイプ: 0,
      },
    },
  };

  const petitGirlsDetail = inputData.petitGirls.details;

  Object.entries(petitGirlsDetail).forEach(([outerKey, outerValue]) => {
    Object.values(outerValue).forEach((innerValue) => {
      const attack = returnNumber(innerValue.attack ?? 0);
      const type = innerValue.type ?? "SWEETタイプ";
      const skillTarget = innerValue.skillTarget ?? "SWEETタイプ";
      const skillValue = returnNumber(innerValue.skillValue ?? 0);

      detailMap[Number(outerKey)].attackTotal[type] += attack;
      detailMap[Number(outerKey)].skillTotal[skillTarget] += skillValue;
    });
  });

  intermediateResults.petitGirls.details = detailMap;
};
