import { DeckSimulatorData } from "@/features/decksim/type-definitions/DeckSimulatorData";
import {
  RawDataDeckSimulator,
  RawDataNormalDeck,
  RawDataRaidSecond,
  RawDataChampionship,
  RawDataDivrace,
  RawDataMainScene,
  RawDataSubScene,
  RawDataPreciousScene,
  RawDataPetitGirl,
  RawDataDeckBonus,
} from "@/features/decksim/type-definitions/DeckSimulatorRawData";

import { NAME_TO_PROFILE_CONVERT } from "@/lib/girlsProfile";
import { DeckSimulatorEventId } from "@/features/decksim/data/eventData";
import { PETIT_GIRLS_EFFECTS_NAME_TO_ID } from "@/features/decksim/data/petitGirlsEffectData";

import { setDeepValue } from "@/lib/setDeepValue";

export const importDeckSimulatorRawData = ({
  nextData,
  rawData,
  loadCondition,
}: {
  nextData: DeckSimulatorData;
  rawData: RawDataDeckSimulator;
  loadCondition: {
    clubType: string;
    specialGirlName1: string;
    specialGirlName2: string;
  };
}) => {
  switch (nextData.dataType) {
    case "raid-second":
      handleRawData({
        nextData,
        rawData: rawData as RawDataRaidSecond,
        loadCondition,
      });
      break;

    case "championship":
      handleRawData({
        nextData,
        rawData: rawData as RawDataChampionship,
        loadCondition,
      });
      break;

    case "divrace":
      handleRawData({
        nextData,
        rawData: rawData as RawDataDivrace,
        loadCondition,
      });
      break;

    default:
      handleRawData({
        nextData,
        rawData: rawData as RawDataNormalDeck,
        loadCondition,
      });
      break;
  }
};

const handleRawData = ({
  nextData,
  rawData,
  loadCondition,
}: {
  nextData: DeckSimulatorData;
  rawData:
    | RawDataNormalDeck
    | RawDataRaidSecond
    | RawDataChampionship
    | RawDataDivrace;
  loadCondition: {
    clubType: string;
    specialGirlName1: string;
    specialGirlName2: string;
  };
}) => {
  Promise.all([
    handleMainScene({ nextData, rawData, loadCondition }),
    handleMainSkill({ nextData, rawData }),
    handleSubScene({ nextData, rawData, loadCondition }),
    handleSubSwitch({ nextData, rawData }),
    handlePreciousScene({ nextData, rawData }),
    handlePetitGirl({ nextData, rawData }),
    handleDeckBonus({ nextData, rawData }),
  ])
    // .then(() => {
    //   console.log("kinokotogame.club: 生データからの復旧に成功しました。");
    // })
    .catch((error) => {
      console.error(
        `kinokotogame.club: 生データからの復旧に失敗しました。「${error}」`
      );
    });
};

const handleMainScene = async ({
  nextData,
  rawData,
  loadCondition,
}: {
  nextData: DeckSimulatorData;
  rawData:
    | RawDataNormalDeck
    | RawDataRaidSecond
    | RawDataChampionship
    | RawDataDivrace;
  loadCondition: {
    clubType: string;
    specialGirlName1: string;
    specialGirlName2: string;
  };
}) => {
  const eventId = nextData.dataType;

  // イベントごとの副センバツリストを取得する
  let attackDeckList: RawDataMainScene[] | undefined = undefined;
  let defenseDeckList: RawDataMainScene[] | undefined = undefined;
  if (eventId === "raid-second") {
    attackDeckList = (rawData as RawDataRaidSecond)?.data?.attackDeckMap
      ?.frontDeckList;
    defenseDeckList = (rawData as RawDataRaidSecond)?.data?.defenceDeckMap
      ?.frontDeckList;
  } else if (eventId === "championship") {
    attackDeckList = (rawData as RawDataChampionship)?.data?.frontCards;
  } else if (eventId === "championship-defense") {
    defenseDeckList = (rawData as RawDataChampionship)?.data?.frontCards;
  } else if (eventId === "divrace") {
    attackDeckList = (rawData as RawDataDivrace)?.data?.defaultDeck
      ?.divraceDeckBean?.frontDeckList;
  } else {
    attackDeckList = (rawData as RawDataNormalDeck)?.data?.frontDeckList;
  }

  // 攻援
  let sceneIndex = 1;
  if (Array.isArray(attackDeckList) && attackDeckList.length > 0) {
    attackDeckList.forEach((element) => {
      const {
        basePower,
        strap,
        type,
        rarity,
        cost,
        skillLv,
        grade,
        isClubMatch,
        isDate,
        isTouch,
        isBirthday,
        isLimitBreak,
        isBestFriend,
        isSpecial,
      } = parseSceneParameter({
        element,
        loadCondition,
        eventId,
        deckType: "攻援",
      });

      setDeepValue(nextData, `mainScenes.attack.${sceneIndex}`, {
        basePower,
        strap,
        type,
        rarity,
        cost,
        skillLv,
        grade,
        isClubMatch,
        isDate,
        isTouch,
        isBirthday,
        isLimitBreak,
        isBestFriend,
        isSpecial,
      });
      sceneIndex++;
    });
  }

  // 守援
  sceneIndex = 1;
  if (Array.isArray(defenseDeckList) && defenseDeckList.length > 0) {
    defenseDeckList.forEach((element) => {
      const {
        basePower,
        strap,
        type,
        rarity,
        cost,
        skillLv,
        grade,
        isClubMatch,
        isDate,
        isTouch,
        isBirthday,
        isLimitBreak,
        isBestFriend,
        isSpecial,
      } = parseSceneParameter({
        element,
        loadCondition,
        eventId,
        deckType: "守援",
      });

      setDeepValue(nextData, `mainScenes.defense.${sceneIndex}`, {
        basePower,
        strap,
        type,
        rarity,
        cost,
        skillLv,
        grade,
        isClubMatch,
        isDate,
        isTouch,
        isBirthday,
        isLimitBreak,
        isBestFriend,
        isSpecial,
      });
      sceneIndex++;
    });
  }
};

const handleMainSkill = async ({
  nextData,
  rawData,
}: {
  nextData: DeckSimulatorData;
  rawData:
    | RawDataNormalDeck
    | RawDataRaidSecond
    | RawDataChampionship
    | RawDataDivrace;
}) => {
  const eventId = nextData.dataType;

  // イベントごとの主センバツリストを取得する
  let attackDeckList: RawDataMainScene[] | undefined = undefined;
  let defenseDeckList: RawDataMainScene[] | undefined = undefined;
  if (eventId === "raid-second") {
    attackDeckList = (rawData as RawDataRaidSecond)?.data?.attackDeckMap
      ?.frontDeckList;
    defenseDeckList = (rawData as RawDataRaidSecond)?.data?.defenceDeckMap
      ?.frontDeckList;
  } else if (eventId === "championship") {
    attackDeckList = (rawData as RawDataChampionship)?.data?.frontCards;
  } else if (eventId === "championship-defense") {
    defenseDeckList = (rawData as RawDataChampionship)?.data?.frontCards;
  } else if (eventId === "divrace") {
    attackDeckList = (rawData as RawDataDivrace)?.data?.defaultDeck
      ?.divraceDeckBean?.frontDeckList;
  } else {
    attackDeckList = (rawData as RawDataNormalDeck)?.data?.frontDeckList;
  }

  // 攻援
  let skillIndex = 1;
  if (Array.isArray(attackDeckList) && attackDeckList.length > 0) {
    attackDeckList.forEach((element) => {
      let description = "";
      if (eventId === "divrace") {
        description =
          element?.["divraceSkillList"]?.[0]?.["description"] ??
          element?.["skillList"]?.[0]?.["description"] ??
          "";
      } else {
        description = element?.["skillList"]?.[0]?.["description"] ?? "";
      }

      // 声援効果名から各パラメータを読み取る
      if (description && !description.includes("DOWN")) {
        const { target, range, subRange, type, strength } = parseSkillParameter(
          { description }
        );

        setDeepValue(nextData, `mainSkills.attack.${skillIndex}`, {
          skillLv: String(element["skillLevel"] ?? 1),
          target,
          range,
          subRange,
          type,
          strength,
        });
        skillIndex++;
      }
    });
  }

  // 守援
  skillIndex = 1;
  if (Array.isArray(defenseDeckList) && defenseDeckList.length > 0) {
    defenseDeckList.forEach((element) => {
      let description = "";
      if (eventId === "divrace") {
        description =
          element?.["divraceSkillList"]?.[0]?.["description"] ??
          element?.["skillList"]?.[0]?.["description"] ??
          "";
      } else {
        description = element?.["skillList"]?.[0]?.["description"] ?? "";
      }

      // 声援効果名から各パラメータを読み取る
      if (description && !description.includes("DOWN")) {
        const { target, range, subRange, type, strength } = parseSkillParameter(
          { description }
        );

        setDeepValue(nextData, `mainSkills.defense.${skillIndex}`, {
          skillLv: String(element["skillLevel"] ?? 1),
          target,
          range,
          subRange,
          type,
          strength,
        });
        skillIndex++;
      }
    });
  }
};

const handleSubScene = async ({
  nextData,
  rawData,
  loadCondition,
}: {
  nextData: DeckSimulatorData;
  rawData:
    | RawDataNormalDeck
    | RawDataRaidSecond
    | RawDataChampionship
    | RawDataDivrace;
  loadCondition: {
    clubType: string;
    specialGirlName1: string;
    specialGirlName2: string;
  };
}) => {
  const eventId = nextData.dataType;

  // イベントごとの副センバツリストを取得する
  let attackDeckList: RawDataSubScene[] | undefined = undefined;
  let defenceDeckList: RawDataSubScene[] | undefined = undefined;
  if (eventId === "raid-second") {
    attackDeckList = (rawData as RawDataRaidSecond)?.data?.attackDeckMap
      ?.subDeckList;
    defenceDeckList = (rawData as RawDataRaidSecond)?.data?.defenceDeckMap
      ?.subDeckList;
  } else if (eventId === "championship") {
    attackDeckList = (rawData as RawDataChampionship)?.data?.subCards;
  } else if (eventId === "championship-defense") {
    defenceDeckList = (rawData as RawDataChampionship)?.data?.subCards;
  } else if (eventId === "divrace") {
    attackDeckList = (rawData as RawDataDivrace)?.data?.defaultDeck
      ?.divraceDeckBean?.subDeckList;
  } else {
    attackDeckList = (rawData as RawDataNormalDeck)?.data?.subDeckList;
  }

  // 攻援
  let sceneIndex = 1;
  if (Array.isArray(attackDeckList) && attackDeckList.length > 0) {
    attackDeckList.forEach((element) => {
      const {
        basePower,
        strap,
        type,
        rarity,
        cost,
        skillLv,
        grade,
        isClubMatch,
        isDate,
        isTouch,
        isBirthday,
        isLimitBreak,
        isBestFriend,
        isSpecial,
      } = parseSceneParameter({
        element,
        loadCondition,
        eventId,
        deckType: "攻援",
      });

      setDeepValue(nextData, `subScenes.attack.${sceneIndex}`, {
        basePower,
        strap,
        type,
        rarity,
        cost,
        skillLv,
        grade,
        isClubMatch,
        isDate,
        isTouch,
        isBirthday,
        isLimitBreak,
        isBestFriend,
        isSpecial,
      });
      sceneIndex++;
    });
  }

  // 守援
  sceneIndex = 1;
  if (Array.isArray(defenceDeckList) && defenceDeckList.length > 0) {
    defenceDeckList.forEach((element) => {
      const {
        basePower,
        strap,
        type,
        rarity,
        cost,
        skillLv,
        grade,
        isClubMatch,
        isDate,
        isTouch,
        isBirthday,
        isLimitBreak,
        isBestFriend,
        isSpecial,
      } = parseSceneParameter({
        element,
        loadCondition,
        eventId,
        deckType: "守援",
      });

      setDeepValue(nextData, `subScenes.defense.${sceneIndex}`, {
        basePower,
        strap,
        type,
        rarity,
        cost,
        skillLv,
        grade,
        isClubMatch,
        isDate,
        isTouch,
        isBirthday,
        isLimitBreak,
        isBestFriend,
        isSpecial,
      });
      sceneIndex++;
    });
  }
};

const handleSubSwitch = async ({
  nextData,
  rawData,
}: {
  nextData: DeckSimulatorData;
  rawData:
    | RawDataNormalDeck
    | RawDataRaidSecond
    | RawDataChampionship
    | RawDataDivrace;
}) => {
  const eventId = nextData.dataType;

  // イベントごとの副センバツリストを取得する
  let attackDeckList: RawDataSubScene[] | undefined = undefined;
  let defenceDeckList: RawDataSubScene[] | undefined = undefined;
  if (eventId === "raid-second") {
    attackDeckList = (rawData as RawDataRaidSecond)?.data?.attackDeckMap
      ?.subDeckList;
    defenceDeckList = (rawData as RawDataRaidSecond)?.data?.defenceDeckMap
      ?.subDeckList;
  } else if (eventId === "championship") {
    attackDeckList = (rawData as RawDataChampionship)?.data?.subCards;
  } else if (eventId === "championship-defense") {
    defenceDeckList = (rawData as RawDataChampionship)?.data?.subCards;
  } else if (eventId === "divrace") {
    attackDeckList = (rawData as RawDataDivrace)?.data?.defaultDeck
      ?.divraceDeckBean?.subDeckList;
  } else {
    attackDeckList = (rawData as RawDataNormalDeck)?.data?.subDeckList;
  }

  // 攻援
  let switchOffIndex = 1;
  if (Array.isArray(attackDeckList) && attackDeckList.length > 0) {
    attackDeckList.forEach((element) => {
      let isSwitchBack: boolean = false;
      if (eventId === "championship" || eventId === "championship-defense") {
        isSwitchBack = element["cardType"] === "EFFECTIVE_MIRROR_BACK";
      } else {
        isSwitchBack =
          element["isMirrorGirl"] === true &&
          element["isMirrorFront"] === false;
      }

      // スイッチOFFカードでなければreturn
      if (!isSwitchBack) {
        return;
      }

      // 声援効果名から各パラメータを読み取る
      const description = element?.["skillList"]?.[0]?.["description"] ?? "";
      if (description && !description.includes("DOWN")) {
        const { target, range, subRange, type, strength } = parseSkillParameter(
          { description }
        );

        setDeepValue(nextData, `subSwitches.attack.${switchOffIndex}`, {
          skillLv: String(element["skillLevel"] ?? 1),
          target,
          range,
          subRange,
          type,
          strength,
        });
        switchOffIndex++;
      }
    });
  }

  // 守援
  switchOffIndex = 1;
  if (Array.isArray(defenceDeckList) && defenceDeckList.length > 0) {
    defenceDeckList.forEach((element) => {
      let isSwitchBack: boolean = false;
      if (eventId === "championship" || eventId === "championship-defense") {
        isSwitchBack = element["cardType"] === "EFFECTIVE_MIRROR_BACK";
      } else {
        isSwitchBack =
          element["isMirrorGirl"] === true &&
          element["isMirrorFront"] === false;
      }

      // スイッチOFFカードでなければreturn
      if (!isSwitchBack) {
        return;
      }

      // 声援効果名から各パラメータを読み取る
      const description = element?.["skillList"]?.[0]?.["description"] ?? "";
      if (description && !description.includes("DOWN")) {
        const { target, range, subRange, type, strength } = parseSkillParameter(
          { description }
        );

        setDeepValue(nextData, `subSwitches.defense.${switchOffIndex}`, {
          skillLv: String(element["skillLevel"] ?? 1),
          target,
          range,
          subRange,
          type,
          strength,
        });
        switchOffIndex++;
      }
    });
  }
};

const parseSceneParameter = ({
  element,
  loadCondition,
  eventId,
  deckType,
}: {
  element: RawDataMainScene | RawDataSubScene;
  loadCondition: {
    clubType: string;
    specialGirlName1: string;
    specialGirlName2: string;
  };
  eventId: DeckSimulatorEventId;
  deckType: "攻援" | "守援";
}): {
  basePower: string;
  strap?: string;
  type: "SWEETタイプ" | "COOLタイプ" | "POPタイプ";
  rarity: "Luv" | "UR" | "SSR" | "SR";
  cost: string;
  skillLv: string;
  grade: "1年生" | "2年生" | "3年生" | "その他";
  isClubMatch: boolean;
  isDate: boolean;
  isTouch: boolean;
  isBirthday: boolean;
  isLimitBreak: boolean;
  isBestFriend: boolean;
  isSpecial: boolean;
} => {
  // シーン名からキャラクター名を取得する
  // テーマ部分を除去して、アネットはフルネームに変更。
  const characterName = element["cardName"].replace(/\[.*\]/g, "").replace("アネット・O・唐澤", "アネット・オルガ・唐澤");

  const basePowerNum =
    eventId === "raid-second" && deckType === "守援"
      ? element["baseDefenceRating"] ?? 0
      : eventId === "championship-defense"
      ? element["baseDefenseRating"] ?? 0
      : element["baseAttackRating"] ?? 0;
  const basePower = String(basePowerNum);

  const strapNum =
    eventId === "raid-second" && deckType === "守援"
      ? element["wearDeckCardBean"]?.["defenceEffectValue"] ?? 0
      : eventId === "championship-defense"
      ? element["wearDeckCardBean"]?.["defenceEffectValue"] ?? 0
      : element["wearDeckCardBean"]?.["attackEffectValue"] ?? 0;
  const strap = String(strapNum);

  const type =
    element["sphereName"] === "SWEET" || element["sphereId"] === 2
      ? "SWEETタイプ"
      : element["sphereName"] === "COOL" || element["sphereId"] === 1
      ? "COOLタイプ"
      : "POPタイプ";

  const rarity =
    element["limitbreakCount"] > 100
      ? "Luv"
      : element["rarityShortName"] === "UR"
      ? "UR"
      : element["rarityShortName"] === "SSR"
      ? "SSR"
      : "SR";

  const costNum =
    eventId === "championship" || eventId === "championship-defense"
      ? 30
      : element["power"] ?? 30;
  const cost = String(costNum);

  const skillLvNum = element["skillLevel"] ?? 1;
  const skillLv = String(skillLvNum);

  const gradeStr = NAME_TO_PROFILE_CONVERT?.[characterName]?.grade ?? "---";
  const grade = gradeStr !== "---" ? gradeStr : "その他";

  const clubType = NAME_TO_PROFILE_CONVERT?.[characterName]?.clubType ?? "設定なし";
  const isClubMatch = clubType === loadCondition.clubType ? true : false;

  const isDate =
    eventId === "championship" || eventId === "championship-defense"
      ? element["dateFlg"] ?? false
      : element["dateBonus"] ?? false;

  const isTouch =
    eventId === "championship" || eventId === "championship-defense"
      ? element["touchFlg"] ?? false
      : element["touchBonusRating"] && element["touchBonusRating"] > 0
      ? true
      : false;

  const isBirthday =
    eventId === "championship" || eventId === "championship-defense"
      ? element["birthdayFlg"] ?? false
      : element["birthdayBonus"] ?? false;

  const isLimitBreak = element["limitbreakCount"] > 0 ? true : false;

  const isBestFriend =
    eventId === "championship" || eventId === "championship-defense"
      ? false
      : element["leader"] ?? false;

  const isSpecial =
    loadCondition.specialGirlName1 &&
    characterName.includes(loadCondition.specialGirlName1)
      ? true
      : loadCondition.specialGirlName2 &&
        characterName.includes(loadCondition.specialGirlName2)
      ? true
      : false;

  return {
    basePower,
    strap,
    type,
    rarity,
    cost,
    skillLv,
    grade,
    isClubMatch,
    isDate,
    isTouch,
    isBirthday,
    isLimitBreak,
    isBestFriend,
    isSpecial,
  };
};

const parseSkillParameter = ({
  description,
}: {
  description: string;
}): {
  target: "SWEETタイプ" | "COOLタイプ" | "POPタイプ" | "全タイプ";
  range: "主＋副" | "主のみ" | "副のみ";
  subRange: string;
  type: "攻援" | "守援" | "攻守";
  strength:
    | "中"
    | "中+"
    | "中++"
    | "大"
    | "特大"
    | "特大+"
    | "特大++"
    | "スーパー特大"
    | "スーパー特大+"
    | "スーパー特大++"
    | "超スーパー特大";
} => {
  const target = description.includes("POP")
    ? "POPタイプ"
    : description.includes("COOL")
    ? "COOLタイプ"
    : description.includes("SWEET")
    ? "SWEETタイプ"
    : "全タイプ";

  const isIncludeMain = description.includes("主ｾﾝﾊﾞﾂ");
  const isIncludeSub = description.includes("副ｾﾝﾊﾞﾂ");
  const range =
    !isIncludeMain && !isIncludeSub
      ? "主のみ"
      : !isIncludeMain && isIncludeSub
      ? "副のみ"
      : isIncludeMain && !isIncludeSub
      ? "主のみ"
      : "主＋副";

  const regexArray = description.match(/副ｾﾝﾊﾞﾂ(上位)?[0-9]+人/);
  const subRange = !regexArray
    ? "0"
    : regexArray[0].replace(/(副ｾﾝﾊﾞﾂ|上位|人)/g, "");

  const isIncludeAttack = description.includes("攻援");
  const isIncludeDefence = description.includes("守援");
  const type = isIncludeAttack ? "攻援" : isIncludeDefence ? "守援" : "攻守";

  const strength = description.includes("ｽｰﾊﾟｰ特大～")
    ? "スーパー特大++"
    : description.includes("特大～")
    ? "スーパー特大"
    : description.includes("大～")
    ? "特大"
    : description.includes("中～")
    ? "大"
    : description.includes("超ｽｰﾊﾟｰ特大")
    ? "超スーパー特大"
    : description.includes("超スーパー特大")
    ? "超スーパー特大"
    : description.includes("ｽｰﾊﾟｰ特大++")
    ? "スーパー特大++"
    : description.includes("スーパー特大++")
    ? "スーパー特大++"
    : description.includes("ｽｰﾊﾟｰ特大+")
    ? "スーパー特大+"
    : description.includes("スーパー特大+")
    ? "スーパー特大+"
    : description.includes("ｽｰﾊﾟｰ特大")
    ? "スーパー特大"
    : description.includes("スーパー特大")
    ? "スーパー特大"
    : description.includes("特大++")
    ? "特大++"
    : description.includes("特大+")
    ? "特大+"
    : description.includes("特大")
    ? "特大"
    : description.includes("大")
    ? "大"
    : description.includes("中++")
    ? "中++"
    : description.includes("中+")
    ? "中+"
    : description.includes("中")
    ? "中"
    : "中";

  return {
    target,
    range,
    subRange,
    type,
    strength,
  };
};

const handlePreciousScene = async ({
  nextData,
  rawData,
}: {
  nextData: DeckSimulatorData;
  rawData:
    | RawDataNormalDeck
    | RawDataRaidSecond
    | RawDataChampionship
    | RawDataDivrace;
}) => {
  const eventId = nextData.dataType;

  // イベントごとのプレシャスシーンリストを取得する
  let attackDeckList: RawDataPreciousScene[] | undefined = undefined;
  let defenceDeckList: RawDataPreciousScene[] | undefined = undefined;
  if (eventId === "raid-second") {
    attackDeckList = (rawData as RawDataRaidSecond)?.data?.attackDeckMap
      ?.precious?.deckPreciousBeanList;
    defenceDeckList = (rawData as RawDataRaidSecond)?.data?.defenceDeckMap
      ?.precious?.deckPreciousBeanList;
  } else if (eventId === "championship") {
    attackDeckList = (rawData as RawDataChampionship)?.data?.preciousList;
  } else if (eventId === "championship-defense") {
    defenceDeckList = (rawData as RawDataChampionship)?.data?.preciousList;
  } else if (eventId === "divrace") {
    attackDeckList = (rawData as RawDataDivrace)?.data?.defaultDeck
      ?.divraceDeckBean?.precious?.deckPreciousBeanList;
  } else {
    attackDeckList = (rawData as RawDataNormalDeck)?.data?.precious
      ?.deckPreciousBeanList;
  }

  // 攻援
  if (Array.isArray(attackDeckList) && attackDeckList.length > 0) {
    attackDeckList.forEach((element, index) => {
      const preciousId = element["preciousId"];
      const rarity = element["level"];

      setDeepValue(nextData, `preciousScenes.attack.${index + 1}`, {
        id: String(preciousId),
        rarity: String(rarity),
      });
    });
  }

  // 守援
  if (Array.isArray(defenceDeckList) && defenceDeckList.length > 0) {
    defenceDeckList.forEach((element, index) => {
      const preciousId = element["preciousId"];
      const rarity = element["level"];

      setDeepValue(nextData, `preciousScenes.defense.${index + 1}`, {
        id: String(preciousId),
        rarity: String(rarity),
      });
    });
  }

  return Promise.resolve();
};

const handlePetitGirl = async ({
  nextData,
  rawData,
}: {
  nextData: DeckSimulatorData;
  rawData:
    | RawDataNormalDeck
    | RawDataRaidSecond
    | RawDataChampionship
    | RawDataDivrace;
}) => {
  const eventId = nextData.dataType;

  // 総攻援 / 総守援 の数値を取得しつつ、応援力効果のArrayを取得する
  let mainPetitgirls: RawDataPetitGirl[] | undefined = undefined;
  if (eventId === "championship" || eventId === "championship-defense") {
    nextData.petitGirls.totalPower.attack =
      ((rawData as RawDataChampionship)?.data?.petitgirlDeckBean
        ?.petitgirlTotalAttackRating ?? 0) -
      ((rawData as RawDataChampionship)?.data?.petitgirlDeckBean
        ?.petitgirlTotalAttackCardEffect ?? 0);
    nextData.petitGirls.totalPower.defense =
      ((rawData as RawDataChampionship)?.data?.petitgirlDeckBean
        ?.petitgirlTotalDefenseRating ?? 0) -
      ((rawData as RawDataChampionship)?.data?.petitgirlDeckBean
        ?.petitgirlTotalDefenseCardEffect ?? 0);
    mainPetitgirls = (rawData as RawDataChampionship)?.data?.petitgirlDeckBean
      ?.mainPetitgirls;
  } else if (eventId === "divrace") {
    nextData.petitGirls.totalPower.attack =
      (rawData as RawDataDivrace)?.data?.defaultDeck?.deckRatingInfo
        ?.attackRatingByPetitgirl ?? 0;
    nextData.petitGirls.totalPower.defense =
      (rawData as RawDataDivrace)?.data?.defaultDeck?.deckRatingInfo
        ?.defenceRatingByPetitgirl ?? 0;
    mainPetitgirls = (rawData as RawDataDivrace)?.data?.defaultDeck
      ?.mainPetitgirls;
  } else {
    nextData.petitGirls.totalPower.attack =
      (rawData as RawDataNormalDeck)?.data?.deckRatingInfo
        ?.attackRatingByPetitgirl ?? 0;
    nextData.petitGirls.totalPower.defense =
      (rawData as RawDataNormalDeck)?.data?.deckRatingInfo
        ?.defenceRatingByPetitgirl ?? 0;
    mainPetitgirls = (rawData as RawDataNormalDeck)?.data?.mainPetitgirls;
  }

  // 応援力効果のArrayから応援力効果のIDを解決して設定する
  if (Array.isArray(mainPetitgirls) && mainPetitgirls.length > 0) {
    mainPetitgirls.forEach((element, outerIndex) => {
      element["effects"].forEach((effect, innerIndex) => {
        const effectId = PETIT_GIRLS_EFFECTS_NAME_TO_ID?.[effect["effectName"]];
        if (effectId) {
          setDeepValue(
            nextData,
            `petitGirls.effects.${outerIndex + 1}.${innerIndex + 1}`,
            {
              id: String(effectId),
            }
          );
        }
      });

      // レアリティがURの時にフラグをセットする処理も暫定で入れておく
      if (element?.["rarity"]?.["rarityShortName"] === "UR") {
        setDeepValue(
          nextData,
          `petitGirls.effects.${outerIndex + 1}.isRarityUr`,
          true
        );
      }
    });
  }
  return Promise.resolve();
};

const handleDeckBonus = async ({
  nextData,
  rawData,
}: {
  nextData: DeckSimulatorData;
  rawData:
    | RawDataNormalDeck
    | RawDataRaidSecond
    | RawDataChampionship
    | RawDataDivrace;
}) => {
  const eventId = nextData.dataType;

  let deckBonusList: RawDataDeckBonus[] | undefined = undefined;
  if (eventId === "raid-second") {
    deckBonusList = (rawData as RawDataRaidSecond)?.data?.attackDeckMap
      ?.deckBonusList;
  } else if (eventId === "championship" || eventId === "championship-defense") {
    deckBonusList = (rawData as RawDataChampionship)?.data?.deckAdvantages;
  } else if (eventId === "divrace") {
    deckBonusList = (rawData as RawDataDivrace)?.data?.defaultDeck
      ?.divraceDeckBean?.deckBonusList;
  } else {
    deckBonusList = (rawData as RawDataNormalDeck)?.data?.deckBonusList;
  }

  if (Array.isArray(deckBonusList) && deckBonusList.length > 0) {
    let deckBonusIndex = 1;
    deckBonusList.forEach((element) => {
      let name;
      let desc;
      let lv;
      if (eventId === "championship" || eventId === "championship-defense") {
        name = element["MDeckBonus"]["deckBonusName"];
        desc = element["MDeckBonus"]["description"];
        lv = element["deckBonusLevel"];
      } else {
        name = element["mDeckBonus"]["deckBonusName"];
        desc = element["mDeckBonus"]["description"];
        lv = element["mDeckBonusLv"];
      }

      let effect: "攻援" | "守援" | "攻守" = "攻守";
      if (desc.includes("攻援")) {
        effect = "攻援";
      } else if (desc.includes("守援")) {
        effect = "守援";
      }

      if (name === "シャイニング★スプラッシュ") {
        nextData.deckBonus.shine.level = String(lv);
      } else if (name === "Precious★Friend") {
        nextData.deckBonus.precious.level = String(lv);
      } else if (name === "Precious★Friend+") {
        nextData.deckBonus.preciousPlus.level = String(lv);
      } else {
        nextData.deckBonus.normal[deckBonusIndex] = {
          level: String(lv),
          type: effect,
        };
        deckBonusIndex++;
      }
    });
  }
  return Promise.resolve();
};
