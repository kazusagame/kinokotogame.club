import {
  DeckSimulatorData,
  DeckSimulatorCommonData,
} from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
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
} from "@/components/decksim/simulator/typeDefinition/DeckSimulatorRawData";

import { PETIT_GIRLS_EFFECTS_NAME_TO_ID } from "@/components/decksim/data/petitGirlsEffectData";

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
    // handleMainScene({nextData, rawData, loadCondition}),
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
  let attackFrontDeckList: RawDataMainScene[] | undefined = undefined;
  let defenceFrontDeckList: RawDataMainScene[] | undefined = undefined;
  if (eventId === "raid-second") {
    attackFrontDeckList = (rawData as RawDataRaidSecond)?.data?.attackDeckMap
      ?.frontDeckList;
    defenceFrontDeckList = (rawData as RawDataRaidSecond)?.data?.defenceDeckMap
      ?.frontDeckList;
  } else if (eventId === "championship") {
    attackFrontDeckList = (rawData as RawDataChampionship)?.data?.frontCards;
  } else if (eventId === "championship-defense") {
    defenceFrontDeckList = (rawData as RawDataChampionship)?.data?.frontCards;
  } else if (eventId === "divrace") {
    attackFrontDeckList = (rawData as RawDataDivrace)?.data?.defaultDeck
      ?.divraceDeckBean?.frontDeckList;
  } else {
    attackFrontDeckList = (rawData as RawDataNormalDeck)?.data?.frontDeckList;
  }

  // 攻援
  let skillIndex = 1;
  if (Array.isArray(attackFrontDeckList) && attackFrontDeckList.length > 0) {
    attackFrontDeckList.forEach((element) => {
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
        const type = isIncludeAttack ? "攻" : isIncludeDefence ? "守" : "攻守";

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

        setDeepValue(nextData, `mainSkills.attack.${skillIndex}`, {
          skillLv: String(element["skillLevel"] ?? 1),
          target: target,
          range: range,
          subRange: subRange,
          type: type,
          strength: strength,
        });
        skillIndex++;
      }
    });
  }

  // 守援
  skillIndex = 1;
  if (Array.isArray(defenceFrontDeckList) && defenceFrontDeckList.length > 0) {
    defenceFrontDeckList.forEach((element) => {
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
        const type = isIncludeAttack ? "攻" : isIncludeDefence ? "守" : "攻守";

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

        setDeepValue(nextData, `mainSkills.defense.${skillIndex}`, {
          skillLv: String(element["skillLevel"] ?? 1),
          target: target,
          range: range,
          subRange: subRange,
          type: type,
          strength: strength,
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
  let attackSubDeckList: RawDataSubScene[] | undefined = undefined;
  let defenceSubDeckList: RawDataSubScene[] | undefined = undefined;
  if (eventId === "raid-second") {
    attackSubDeckList = (rawData as RawDataRaidSecond)?.data?.attackDeckMap
      ?.subDeckList;
    defenceSubDeckList = (rawData as RawDataRaidSecond)?.data?.defenceDeckMap
      ?.subDeckList;
  } else if (eventId === "championship") {
    attackSubDeckList = (rawData as RawDataChampionship)?.data?.subCards;
  } else if (eventId === "championship-defense") {
    defenceSubDeckList = (rawData as RawDataChampionship)?.data?.subCards;
  } else if (eventId === "divrace") {
    attackSubDeckList = (rawData as RawDataDivrace)?.data?.defaultDeck
      ?.divraceDeckBean?.subDeckList;
  } else {
    attackSubDeckList = (rawData as RawDataNormalDeck)?.data?.subDeckList;
  }

  // 攻援
  let sceneIndex = 1;
  if (Array.isArray(attackSubDeckList) && attackSubDeckList.length > 0) {
    attackSubDeckList.forEach((element) => {
      const cardName = element["cardName"].replace(/\[.*\]/g, "");

  // type: "SWEETタイプ" | "COOLタイプ" | "POPタイプ";
  // rarity: "Luv" | "UR" | "SSR" | "SR";
  // cost: string;
  // skillLv: string;
  // grade: "1年" | "2年" | "3年" | "その他";
  // isClubMatch: boolean;
  // isDate: boolean;
  // isTouch: boolean;
  // isBirthday: boolean;
  // isLimitBreak: boolean;
  // isBestFriend: boolean;
  // isSpecial: boolean;

      setDeepValue(nextData, `subScenes.attack.${sceneIndex}`, {
        basePower: String(element["baseAttackRating"]) ?? "0",
        type: type,
        rarity: rarity,
        cost: cost,
        skillLv: String(element["skillLevel"] ?? 1),
        grade: grade,
        isClubMatch: isClubMatch,
        isDate: isDate,
        isTouch: isTouch,
        isBirthday: isBirthday,
        isLimitBreak: isLimitBreak,
        isBestFriend: isBestFriend,
        isSpecial: isSpecial,
      });
      sceneIndex++;
    });
  }

  // 守援
  sceneIndex = 1;
  if (Array.isArray(defenceSubDeckList) && defenceSubDeckList.length > 0) {
    defenceSubDeckList.forEach((element) => {
      // 声援効果名から各パラメータを読み取る
      const description = element?.["skillList"]?.[0]?.["description"] ?? "";
      if (description && !description.includes("DOWN")) {
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
        const type = isIncludeAttack ? "攻" : isIncludeDefence ? "守" : "攻守";

        const strength = description.includes("中～")
          ? "大"
          : description.includes("特大")
          ? "特大"
          : description.includes("大")
          ? "大"
          : description.includes("中")
          ? "中"
          : "中";

        setDeepValue(nextData, `subScenes.defense.${sceneIndex}`, {
          skillLv: String(element["skillLevel"] ?? 1),
          target: target,
          range: range,
          subRange: subRange,
          type: type,
          strength: strength,
        });
        sceneIndex++;
      }
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
  let attackSubDeckList: RawDataSubScene[] | undefined = undefined;
  let defenceSubDeckList: RawDataSubScene[] | undefined = undefined;
  if (eventId === "raid-second") {
    attackSubDeckList = (rawData as RawDataRaidSecond)?.data?.attackDeckMap
      ?.subDeckList;
    defenceSubDeckList = (rawData as RawDataRaidSecond)?.data?.defenceDeckMap
      ?.subDeckList;
  } else if (eventId === "championship") {
    attackSubDeckList = (rawData as RawDataChampionship)?.data?.subCards;
  } else if (eventId === "championship-defense") {
    defenceSubDeckList = (rawData as RawDataChampionship)?.data?.subCards;
  } else if (eventId === "divrace") {
    attackSubDeckList = (rawData as RawDataDivrace)?.data?.defaultDeck
      ?.divraceDeckBean?.subDeckList;
  } else {
    attackSubDeckList = (rawData as RawDataNormalDeck)?.data?.subDeckList;
  }

  // 攻援
  let switchOffIndex = 1;
  if (Array.isArray(attackSubDeckList) && attackSubDeckList.length > 0) {
    attackSubDeckList.forEach((element) => {
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
        const type = isIncludeAttack ? "攻" : isIncludeDefence ? "守" : "攻守";

        const strength = description.includes("中～")
          ? "大"
          : description.includes("特大")
          ? "特大"
          : description.includes("大")
          ? "大"
          : description.includes("中")
          ? "中"
          : "中";

        setDeepValue(nextData, `subSwitches.attack.${switchOffIndex}`, {
          skillLv: String(element["skillLevel"] ?? 1),
          target: target,
          range: range,
          subRange: subRange,
          type: type,
          strength: strength,
        });
        switchOffIndex++;
      }
    });
  }

  // 守援
  switchOffIndex = 1;
  if (Array.isArray(defenceSubDeckList) && defenceSubDeckList.length > 0) {
    defenceSubDeckList.forEach((element) => {
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
        const type = isIncludeAttack ? "攻" : isIncludeDefence ? "守" : "攻守";

        const strength = description.includes("中～")
          ? "大"
          : description.includes("特大")
          ? "特大"
          : description.includes("大")
          ? "大"
          : description.includes("中")
          ? "中"
          : "中";

        setDeepValue(nextData, `subSwitches.defense.${switchOffIndex}`, {
          skillLv: String(element["skillLevel"] ?? 1),
          target: target,
          range: range,
          subRange: subRange,
          type: type,
          strength: strength,
        });
        switchOffIndex++;
      }
    });
  }
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
  let attackDeckPreciousBeanList: RawDataPreciousScene[] | undefined =
    undefined;
  let defenceDeckPreciousBeanList: RawDataPreciousScene[] | undefined =
    undefined;
  if (eventId === "raid-second") {
    attackDeckPreciousBeanList = (rawData as RawDataRaidSecond)?.data
      ?.attackDeckMap?.precious?.deckPreciousBeanList;
    defenceDeckPreciousBeanList = (rawData as RawDataRaidSecond)?.data
      ?.defenceDeckMap?.precious?.deckPreciousBeanList;
  } else if (eventId === "championship") {
    attackDeckPreciousBeanList = (rawData as RawDataChampionship)?.data
      ?.preciousList;
  } else if (eventId === "championship-defense") {
    defenceDeckPreciousBeanList = (rawData as RawDataChampionship)?.data
      ?.preciousList;
  } else if (eventId === "divrace") {
    attackDeckPreciousBeanList = (rawData as RawDataDivrace)?.data?.defaultDeck
      ?.divraceDeckBean?.precious?.deckPreciousBeanList;
  } else {
    attackDeckPreciousBeanList = (rawData as RawDataNormalDeck)?.data?.precious
      ?.deckPreciousBeanList;
  }

  // 攻援
  if (
    Array.isArray(attackDeckPreciousBeanList) &&
    attackDeckPreciousBeanList.length > 0
  ) {
    attackDeckPreciousBeanList.forEach((element, index) => {
      const preciousId = element["preciousId"];
      const rarity = element["level"];

      setDeepValue(nextData, `preciousScenes.attack.${index + 1}`, {
        id: String(preciousId),
        rarity: String(rarity),
      });
    });
  }

  // 守援
  if (
    Array.isArray(defenceDeckPreciousBeanList) &&
    defenceDeckPreciousBeanList.length > 0
  ) {
    defenceDeckPreciousBeanList.forEach((element, index) => {
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
    let deckBonusIndex = 0;
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

      let effect: "攻" | "守" | "攻守" = "攻守";
      if (desc.includes("攻援")) {
        effect = "攻";
      } else if (desc.includes("守援")) {
        effect = "守";
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
