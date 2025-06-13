import { DeckSimulatorEventId } from "@/features/decksim/data/eventData";
import {
  DeckSimulatorData,
  DeckSimulatorCommonData,
  SceneParameters,
} from "@/features/decksim/type-definitions/DeckSimulatorData";
import {
  IntermediateResults,
  PowerDict,
  EffectMatrix,
} from "@/features/decksim/type-definitions/DeckSimulatorIntermediateResults";

import {
  BONUS_DATA_COMMON,
  BONUS_DATA_PER_EVENT,
  ClubcupSkillEffectMap,
} from "@/features/decksim/data/bonusData";

import { setDeepValue } from "@/lib/setDeepValue";
import { returnNumber } from "@/lib/returnNumber";

import { MAX_SKILL_LEVEL } from "@/features/decksim/data/skillData";

const initEffectMatrix: EffectMatrix = {
  base: { scenePower: 0, strapEffect: 0, preciousEffect: 0 },
  typeMatch: { scenePower: 0, strapEffect: 0, preciousEffect: 0 },
  clubMatch: { scenePower: 0, strapEffect: 0, preciousEffect: 0 },
  clubItem: { scenePower: 0, strapEffect: 0, preciousEffect: 0 },
  clubPosition: { scenePower: 0, strapEffect: 0, preciousEffect: 0 },
  deck: { scenePower: 0, strapEffect: 0, preciousEffect: 0 },
  date: { scenePower: 0, strapEffect: 0, preciousEffect: 0 },
  touch: { scenePower: 0, strapEffect: 0, preciousEffect: 0 },
  birthday: { scenePower: 0, strapEffect: 0, preciousEffect: 0 },
  mensCologne: { scenePower: 0, strapEffect: 0, preciousEffect: 0 },
  petitEffects: { scenePower: 0, strapEffect: 0, preciousEffect: 0 },
  limitBreak: { scenePower: 0, strapEffect: 0, preciousEffect: 0 },
};

export const createEffectMatrix = ({
  inputData,
  commonData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  commonData: DeckSimulatorCommonData;
  intermediateResults: IntermediateResults;
}) => {
  const eventId = inputData.dataType;

  // 主セン/副セン、攻援/守援 のシーンごとに各ボーナス値のマトリックスを作成する
  (["mainScenes", "subScenes"] as const).forEach((mainOrSub) => {
    (["attack", "defense"] as const).forEach((attackOrDefense) => {
      const scenesData = inputData[mainOrSub][attackOrDefense] ?? {};

      Object.entries(scenesData).forEach(([key, sceneData]) => {
        const effectMatrix = structuredClone(initEffectMatrix);
        const preciousTotal =
          intermediateResults[mainOrSub][attackOrDefense]?.[Number(key)]
            ?.preciousSceneEffect?.total ?? 0;

        // base
        effectMatrix.base = calcBasePowerDict({
          eventId,
          mainOrSub,
          sceneData,
          preciousTotal,
        });

        // typeMatch
        effectMatrix.typeMatch = calcTypeMatchPowerDict({
          eventId,
          mainOrSub,
          attackOrDefense,
          sceneData,
          preciousTotal,
          commonData,
        });

        // clubMatch
        effectMatrix.clubMatch = calcClubMatchPowerDict({
          eventId,
          mainOrSub,
          attackOrDefense,
          sceneData,
          preciousTotal,
        });

        // clubItem
        effectMatrix.clubItem = calcClubItemPowerDict({
          eventId,
          mainOrSub,
          attackOrDefense,
          sceneData,
          preciousTotal,
          commonData,
          petitGirlsEffects: intermediateResults.petitGirls.effects?.clubItem,
        });

        // clubPosition
        effectMatrix.clubPosition = calcClubPositionPowerDict({
          eventId,
          mainOrSub,
          attackOrDefense,
          sceneData,
          preciousTotal,
          commonData,
        });

        // deck
        effectMatrix.deck = calcDeckBonusPowerDict({
          eventId,
          mainOrSub,
          attackOrDefense,
          sceneData,
          preciousTotal,
          deckBonus: intermediateResults.deckBonus,
        });

        // date
        effectMatrix.date = calcDatePowerDict({
          eventId,
          mainOrSub,
          attackOrDefense,
          sceneData,
          preciousTotal,
        });

        // touch
        effectMatrix.touch = calcTouchPowerDict({
          eventId,
          mainOrSub,
          attackOrDefense,
          sceneData,
          preciousTotal,
        });

        // birthday
        effectMatrix.birthday = calcBirthdayPowerDict({
          eventId,
          mainOrSub,
          attackOrDefense,
          sceneData,
          preciousTotal,
        });

        // mensCologne
        effectMatrix.mensCologne = calcMensColognePowerDict({
          eventId,
          mainOrSub,
          sceneData,
          preciousTotal,
          commonData,
        });

        // petitEffects
        effectMatrix.petitEffects = calcPetitEffectsPowerDict({
          eventId,
          mainOrSub,
          attackOrDefense,
          sceneData,
          preciousTotal,
          petitGirlsEffects: intermediateResults.petitGirls.effects,
        });

        // limitBreak
        effectMatrix.limitBreak = calcLimitBreakPowerDict({
          eventId,
          mainOrSub,
          attackOrDefense,
          sceneData,
          preciousTotal,
        });

        setDeepValue(
          intermediateResults,
          `${mainOrSub}.${attackOrDefense}.${key}.effectMatrix`,
          effectMatrix
        );

        //対抗戦用 声援効果値設定処理
        if (eventId === "clubcup") {
          const skillEffectDict = BONUS_DATA_PER_EVENT.clubcup.eventUniqueBonus!
            .skillEffect.value as ClubcupSkillEffectMap;
          let skillLv = returnNumber(sceneData.skillLv);
          if (skillLv < 1) skillLv = 1;
          if (skillLv > MAX_SKILL_LEVEL) skillLv = MAX_SKILL_LEVEL;

          const skillEffectValue =
            skillEffectDict[sceneData.rarity][`lv${skillLv}`] ?? 0;

          setDeepValue(
            intermediateResults,
            `${mainOrSub}.${attackOrDefense}.${key}.skillEffect`,
            skillEffectValue
          );
        }
      });
    });
  });
};

const calcBasePowerDict = ({
  eventId,
  mainOrSub,
  sceneData,
  preciousTotal,
}: {
  eventId: DeckSimulatorEventId;
  mainOrSub: "mainScenes" | "subScenes";
  sceneData: SceneParameters;
  preciousTotal: number;
}): PowerDict => {
  const keyName = "base";
  const powerDict: PowerDict = {
    scenePower: 0,
    strapEffect: 0,
    preciousEffect: 0,
  };
  const effectiveRate = BONUS_DATA_PER_EVENT[eventId];
  const bonusValue = 100;

  if (mainOrSub === "mainScenes") {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.mainScenes[keyName]) /
      100;
    powerDict.strapEffect =
      (((returnNumber(sceneData.strap) * bonusValue) / 100) *
        effectiveRate.mainStrap[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.mainPrecious[keyName]) /
      100;
  } else {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.subScenes[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.subPrecious[keyName]) /
      100;
  }

  return powerDict;
};

const calcTypeMatchPowerDict = ({
  eventId,
  mainOrSub,
  attackOrDefense,
  sceneData,
  preciousTotal,
  commonData,
}: {
  eventId: DeckSimulatorEventId;
  mainOrSub: "mainScenes" | "subScenes";
  attackOrDefense: "attack" | "defense";
  sceneData: SceneParameters;
  preciousTotal: number;
  commonData: DeckSimulatorCommonData;
}): PowerDict => {
  const keyName = "typeMatch";
  const powerDict: PowerDict = {
    scenePower: 0,
    strapEffect: 0,
    preciousEffect: 0,
  };
  const effectiveRate = BONUS_DATA_PER_EVENT[eventId];
  const bonusValue = BONUS_DATA_COMMON.typeMatch[attackOrDefense];

  // タイプ不一致時は 0 のまま return
  if (sceneData.type !== commonData.playerData.playerType) {
    return powerDict;
  }

  if (mainOrSub === "mainScenes") {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.mainScenes[keyName]) /
      100;
    powerDict.strapEffect =
      (((returnNumber(sceneData.strap) * bonusValue) / 100) *
        effectiveRate.mainStrap[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.mainPrecious[keyName]) /
      100;
  } else {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.subScenes[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.subPrecious[keyName]) /
      100;
  }

  return powerDict;
};

const calcClubMatchPowerDict = ({
  eventId,
  mainOrSub,
  attackOrDefense,
  sceneData,
  preciousTotal,
}: {
  eventId: DeckSimulatorEventId;
  mainOrSub: "mainScenes" | "subScenes";
  attackOrDefense: "attack" | "defense";
  sceneData: SceneParameters;
  preciousTotal: number;
}): PowerDict => {
  const keyName = "clubMatch";
  const powerDict: PowerDict = {
    scenePower: 0,
    strapEffect: 0,
    preciousEffect: 0,
  };
  const effectiveRate = BONUS_DATA_PER_EVENT[eventId];
  const bonusValue = BONUS_DATA_COMMON.clubMatch[attackOrDefense];

  // 部活タイプ不一致時は 0 のまま return
  if (!sceneData.isClubMatch) {
    return powerDict;
  }

  if (mainOrSub === "mainScenes") {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.mainScenes[keyName]) /
      100;
    powerDict.strapEffect =
      (((returnNumber(sceneData.strap) * bonusValue) / 100) *
        effectiveRate.mainStrap[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.mainPrecious[keyName]) /
      100;
  } else {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.subScenes[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.subPrecious[keyName]) /
      100;
  }

  return powerDict;
};

const calcClubItemPowerDict = ({
  eventId,
  mainOrSub,
  attackOrDefense,
  sceneData,
  preciousTotal,
  commonData,
  petitGirlsEffects,
}: {
  eventId: DeckSimulatorEventId;
  mainOrSub: "mainScenes" | "subScenes";
  attackOrDefense: "attack" | "defense";
  sceneData: SceneParameters;
  preciousTotal: number;
  commonData: DeckSimulatorCommonData;
  petitGirlsEffects?: NonNullable<
    IntermediateResults["petitGirls"]["effects"]
  >["clubItem"];
}): PowerDict => {
  const keyName = "clubItem";
  const powerDict: PowerDict = {
    scenePower: 0,
    strapEffect: 0,
    preciousEffect: 0,
  };
  const effectiveRate = BONUS_DATA_PER_EVENT[eventId];
  let bonusValue = BONUS_DATA_COMMON.clubItem[attackOrDefense];

  // シーンのタイプの部活備品未購入時は 0 のまま return
  const sceneType = sceneData.type;
  if (
    sceneType === "SWEETタイプ" &&
    commonData.playerData.clubItem.sweet.isValid === false
  ) {
    return powerDict;
  } else if (
    sceneType === "COOLタイプ" &&
    commonData.playerData.clubItem.cool.isValid === false
  ) {
    return powerDict;
  } else if (
    sceneType === "POPタイプ" &&
    commonData.playerData.clubItem.pop.isValid === false
  ) {
    return powerDict;
  }

  // bonusValue に ぷちガールちゃんの応援力効果を加算する
  if (petitGirlsEffects) {
    let effectValue = 0;
    if (sceneType === "SWEETタイプ") {
      effectValue =
        (petitGirlsEffects?.sweet?.both ?? 0) +
        (petitGirlsEffects?.sweet?.[attackOrDefense] ?? 0);
    } else if (sceneType === "COOLタイプ") {
      effectValue =
        (petitGirlsEffects?.cool?.both ?? 0) +
        (petitGirlsEffects?.cool?.[attackOrDefense] ?? 0);
    } else if (sceneType === "POPタイプ") {
      effectValue =
        (petitGirlsEffects?.pop?.both ?? 0) +
        (petitGirlsEffects?.pop?.[attackOrDefense] ?? 0);
    }
    bonusValue = bonusValue * (1 + effectValue / 100);
  }

  if (mainOrSub === "mainScenes") {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.mainScenes[keyName]) /
      100;
    powerDict.strapEffect =
      (((returnNumber(sceneData.strap) * bonusValue) / 100) *
        effectiveRate.mainStrap[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.mainPrecious[keyName]) /
      100;
  } else {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.subScenes[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.subPrecious[keyName]) /
      100;
  }

  return powerDict;
};

const calcClubPositionPowerDict = ({
  eventId,
  mainOrSub,
  attackOrDefense,
  sceneData,
  preciousTotal,
  commonData,
}: {
  eventId: DeckSimulatorEventId;
  mainOrSub: "mainScenes" | "subScenes";
  attackOrDefense: "attack" | "defense";
  sceneData: SceneParameters;
  preciousTotal: number;
  commonData: DeckSimulatorCommonData;
}): PowerDict => {
  const keyName = "clubPosition";
  const powerDict: PowerDict = {
    scenePower: 0,
    strapEffect: 0,
    preciousEffect: 0,
  };
  const effectiveRate = BONUS_DATA_PER_EVENT[eventId];

  const position = commonData.playerData.clubPosition;
  const bonusValue = BONUS_DATA_COMMON.clubPosition[attackOrDefense][position];

  if (mainOrSub === "mainScenes") {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.mainScenes[keyName]) /
      100;
    powerDict.strapEffect =
      (((returnNumber(sceneData.strap) * bonusValue) / 100) *
        effectiveRate.mainStrap[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.mainPrecious[keyName]) /
      100;
  } else {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.subScenes[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.subPrecious[keyName]) /
      100;
  }

  return powerDict;
};

export const calcDeckBonusPowerDict = ({
  eventId,
  mainOrSub,
  attackOrDefense,
  sceneData,
  preciousTotal,
  deckBonus,
}: {
  eventId: DeckSimulatorEventId;
  mainOrSub: "mainScenes" | "subScenes";
  attackOrDefense: "attack" | "defense";
  sceneData: SceneParameters;
  preciousTotal: number;
  deckBonus: IntermediateResults["deckBonus"];
}): PowerDict => {
  const keyName = "deck";
  const powerDict: PowerDict = {
    scenePower: 0,
    strapEffect: 0,
    preciousEffect: 0,
  };
  const effectiveRate = BONUS_DATA_PER_EVENT[eventId];

  const bonusValue =
    attackOrDefense === "attack"
      ? ((deckBonus.attack ?? 0) + (deckBonus.both ?? 0))
      : ((deckBonus.defense ?? 0) + (deckBonus.both ?? 0))

  if (mainOrSub === "mainScenes") {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.mainScenes[keyName]) /
      100;
    powerDict.strapEffect =
      (((returnNumber(sceneData.strap) * bonusValue) / 100) *
        effectiveRate.mainStrap[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.mainPrecious[keyName]) /
      100;
  } else {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.subScenes[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.subPrecious[keyName]) /
      100;
  }

  return powerDict;
};

const calcDatePowerDict = ({
  eventId,
  mainOrSub,
  attackOrDefense,
  sceneData,
  preciousTotal,
}: {
  eventId: DeckSimulatorEventId;
  mainOrSub: "mainScenes" | "subScenes";
  attackOrDefense: "attack" | "defense";
  sceneData: SceneParameters;
  preciousTotal: number;
}): PowerDict => {
  const keyName = "date";
  const powerDict: PowerDict = {
    scenePower: 0,
    strapEffect: 0,
    preciousEffect: 0,
  };
  const effectiveRate = BONUS_DATA_PER_EVENT[eventId];
  const bonusValue = BONUS_DATA_COMMON.date[attackOrDefense][sceneData.rarity];

  // 未デート時は 0 のまま return
  if (!sceneData.isDate) {
    return powerDict;
  }

  if (mainOrSub === "mainScenes") {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.mainScenes[keyName]) /
      100;
    powerDict.strapEffect =
      (((returnNumber(sceneData.strap) * bonusValue) / 100) *
        effectiveRate.mainStrap[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.mainPrecious[keyName]) /
      100;
  } else {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.subScenes[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.subPrecious[keyName]) /
      100;
  }

  return powerDict;
};

const calcTouchPowerDict = ({
  eventId,
  mainOrSub,
  attackOrDefense,
  sceneData,
  preciousTotal,
}: {
  eventId: DeckSimulatorEventId;
  mainOrSub: "mainScenes" | "subScenes";
  attackOrDefense: "attack" | "defense";
  sceneData: SceneParameters;
  preciousTotal: number;
}): PowerDict => {
  const keyName = "touch";
  const powerDict: PowerDict = {
    scenePower: 0,
    strapEffect: 0,
    preciousEffect: 0,
  };
  const effectiveRate = BONUS_DATA_PER_EVENT[eventId];
  const bonusValue = BONUS_DATA_COMMON.touch[attackOrDefense];

  // 未タッチ時は 0 のまま return
  if (!sceneData.isTouch) {
    return powerDict;
  }

  if (mainOrSub === "mainScenes") {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.mainScenes[keyName]) /
      100;
    powerDict.strapEffect =
      (((returnNumber(sceneData.strap) * bonusValue) / 100) *
        effectiveRate.mainStrap[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.mainPrecious[keyName]) /
      100;
  } else {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.subScenes[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.subPrecious[keyName]) /
      100;
  }

  return powerDict;
};

const calcBirthdayPowerDict = ({
  eventId,
  mainOrSub,
  attackOrDefense,
  sceneData,
  preciousTotal,
}: {
  eventId: DeckSimulatorEventId;
  mainOrSub: "mainScenes" | "subScenes";
  attackOrDefense: "attack" | "defense";
  sceneData: SceneParameters;
  preciousTotal: number;
}): PowerDict => {
  const keyName = "birthday";
  const powerDict: PowerDict = {
    scenePower: 0,
    strapEffect: 0,
    preciousEffect: 0,
  };
  const effectiveRate = BONUS_DATA_PER_EVENT[eventId];
  const bonusValue = BONUS_DATA_COMMON.birthday[attackOrDefense];

  // 誕生日ではない時は 0 のまま return
  if (!sceneData.isBirthday) {
    return powerDict;
  }

  if (mainOrSub === "mainScenes") {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.mainScenes[keyName]) /
      100;
    powerDict.strapEffect =
      (((returnNumber(sceneData.strap) * bonusValue) / 100) *
        effectiveRate.mainStrap[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.mainPrecious[keyName]) /
      100;
  } else {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.subScenes[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.subPrecious[keyName]) /
      100;
  }

  return powerDict;
};

const calcMensColognePowerDict = ({
  eventId,
  mainOrSub,
  sceneData,
  preciousTotal,
  commonData,
}: {
  eventId: DeckSimulatorEventId;
  mainOrSub: "mainScenes" | "subScenes";
  sceneData: SceneParameters;
  preciousTotal: number;
  commonData: DeckSimulatorCommonData;
}): PowerDict => {
  const keyName = "mensCologne";
  const powerDict: PowerDict = {
    scenePower: 0,
    strapEffect: 0,
    preciousEffect: 0,
  };
  const effectiveRate = BONUS_DATA_PER_EVENT[eventId];
  const sceneType = sceneData.type;
  const bonusValue =
    sceneType === "SWEETタイプ"
      ? returnNumber(commonData.playerData.mensCologne.sweet.level) * 0.2
      : sceneType === "COOLタイプ"
      ? returnNumber(commonData.playerData.mensCologne.cool.level) * 0.2
      : returnNumber(commonData.playerData.mensCologne.pop.level) * 0.2;

  if (mainOrSub === "mainScenes") {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.mainScenes[keyName]) /
      100;
    powerDict.strapEffect =
      (((returnNumber(sceneData.strap) * bonusValue) / 100) *
        effectiveRate.mainStrap[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.mainPrecious[keyName]) /
      100;
  } else {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.subScenes[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.subPrecious[keyName]) /
      100;
  }

  return powerDict;
};

export const calcPetitEffectsPowerDict = ({
  eventId,
  mainOrSub,
  attackOrDefense,
  sceneData,
  preciousTotal,
  petitGirlsEffects,
}: {
  eventId: DeckSimulatorEventId;
  mainOrSub: "mainScenes" | "subScenes";
  attackOrDefense: "attack" | "defense";
  sceneData: SceneParameters;
  preciousTotal: number;
  petitGirlsEffects?: IntermediateResults["petitGirls"]["effects"];
}): PowerDict => {
  const keyName = "petitEffects";
  const powerDict: PowerDict = {
    scenePower: 0,
    strapEffect: 0,
    preciousEffect: 0,
  };
  const effectiveRate = BONUS_DATA_PER_EVENT[eventId];
  let bonusValue = 0;

  // タイプ系の効果値を加算する
  const sceneType = sceneData.type;
  if (sceneType === "SWEETタイプ") {
    bonusValue +=
      (petitGirlsEffects?.type?.sweet?.[attackOrDefense] ?? 0) +
      (petitGirlsEffects?.type?.sweet?.both ?? 0);
  } else if (sceneType === "COOLタイプ") {
    bonusValue +=
      (petitGirlsEffects?.type?.cool?.[attackOrDefense] ?? 0) +
      (petitGirlsEffects?.type?.cool?.both ?? 0);
  } else if (sceneType === "POPタイプ") {
    bonusValue +=
      (petitGirlsEffects?.type?.pop?.[attackOrDefense] ?? 0) +
      (petitGirlsEffects?.type?.pop?.both ?? 0);
  }
  bonusValue +=
    (petitGirlsEffects?.type?.all?.[attackOrDefense] ?? 0) +
    (petitGirlsEffects?.type?.all?.both ?? 0);

  // 学年系の効果値を加算する
  const sceneGrade = sceneData.grade;
  if (sceneGrade === "1年生") {
    bonusValue +=
      (petitGirlsEffects?.grade?.["1年生"]?.[attackOrDefense] ?? 0) +
      (petitGirlsEffects?.grade?.["1年生"]?.both ?? 0);
  } else if (sceneGrade === "2年生") {
    bonusValue +=
      (petitGirlsEffects?.grade?.["2年生"]?.[attackOrDefense] ?? 0) +
      (petitGirlsEffects?.grade?.["2年生"]?.both ?? 0);
  } else if (sceneGrade === "3年生") {
    bonusValue +=
      (petitGirlsEffects?.grade?.["3年生"]?.[attackOrDefense] ?? 0) +
      (petitGirlsEffects?.grade?.["3年生"]?.both ?? 0);
  }

  // デート、タッチ、誕生日、本命の効果値を加算する
  if (sceneData.isDate) {
    bonusValue +=
      (petitGirlsEffects?.date?.all?.[attackOrDefense] ?? 0) +
      (petitGirlsEffects?.date?.all?.both ?? 0);
  }
  if (sceneData.isTouch) {
    bonusValue +=
      (petitGirlsEffects?.touch?.all?.[attackOrDefense] ?? 0) +
      (petitGirlsEffects?.touch?.all?.both ?? 0);
  }
  if (sceneData.isBirthday) {
    bonusValue +=
      (petitGirlsEffects?.birthday?.all?.[attackOrDefense] ?? 0) +
      (petitGirlsEffects?.birthday?.all?.both ?? 0);
  }
  if (sceneData.isBestFriend) {
    bonusValue +=
      (petitGirlsEffects?.bestFriend?.all?.[attackOrDefense] ?? 0) +
      (petitGirlsEffects?.bestFriend?.all?.both ?? 0);
  }

  if (mainOrSub === "mainScenes") {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.mainScenes[keyName]) /
      100;
    powerDict.strapEffect =
      (((returnNumber(sceneData.strap) * bonusValue) / 100) *
        effectiveRate.mainStrap[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.mainPrecious[keyName]) /
      100;
  } else {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.subScenes[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.subPrecious[keyName]) /
      100;
  }

  return powerDict;
};

export const calcLimitBreakPowerDict = ({
  eventId,
  mainOrSub,
  attackOrDefense,
  sceneData,
  preciousTotal,
}: {
  eventId: DeckSimulatorEventId;
  mainOrSub: "mainScenes" | "subScenes";
  attackOrDefense: "attack" | "defense";
  sceneData: SceneParameters;
  preciousTotal: number;
}): PowerDict => {
  const keyName = "limitBreak";
  const powerDict: PowerDict = {
    scenePower: 0,
    strapEffect: 0,
    preciousEffect: 0,
  };
  const effectiveRate = BONUS_DATA_PER_EVENT[eventId];
  const bonusValue = BONUS_DATA_COMMON.limitBreak[attackOrDefense];

  // レアリティが Luvでなく、かつEx進展済みではない場合は 0 のまま return
  if (sceneData.rarity !== "Luv" && sceneData.isLimitBreak === false) {
    return powerDict;
  }

  if (mainOrSub === "mainScenes") {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.mainScenes[keyName]) /
      100;
    powerDict.strapEffect =
      (((returnNumber(sceneData.strap) * bonusValue) / 100) *
        effectiveRate.mainStrap[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.mainPrecious[keyName]) /
      100;
  } else {
    powerDict.scenePower =
      (((returnNumber(sceneData.basePower) * bonusValue) / 100) *
        effectiveRate.subScenes[keyName]) /
      100;
    powerDict.preciousEffect =
      (((preciousTotal * bonusValue) / 100) *
        effectiveRate.subPrecious[keyName]) /
      100;
  }

  return powerDict;
};
