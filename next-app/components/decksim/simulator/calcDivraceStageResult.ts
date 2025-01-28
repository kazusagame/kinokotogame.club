import {
  DivraceStageData,
  DivraceStageResult,
} from "@/components/decksim/simulator/useDivraceStageData";

import {
  baseStageData,
  challengeStageData,
} from "@/components/decksim/data/divraceStageData";

const divideUseSpecialALot = ({
  hp,
  damage,
  aimCountReward,
  count,
}: {
  hp: number;
  damage: number;
  aimCountReward: boolean;
  count: number;
}): {
  candyNum: number;
  normalNum: number;
  specialNum: number;
} => {
  const itemDict = {
    candyNum: 0,
    normalNum: 0,
    specialNum: 0,
  };
  const requiredHeartNum = Math.ceil(hp / damage);

  if (aimCountReward) {
    // 回数制限値を超えてしまう場合
    if (Math.ceil(requiredHeartNum / 6) > count) {
      itemDict.normalNum = count;
    } else {
      itemDict.normalNum = requiredHeartNum / 6;
      const remainder = requiredHeartNum % 6;
      if (remainder > 4) {
        // 余りが4以上ならば元気炭酸
        itemDict.normalNum += 1;
      } else if (itemDict.normalNum + remainder <= count) {
        // 余りは飴でも回数制限値以内ならば飴
        itemDict.candyNum += remainder;
      } else {
        // 余りは飴では回数制限をオーバーするならば元気炭酸
        itemDict.normalNum += 1;
      }
    }
  } else {
    itemDict.normalNum = requiredHeartNum / 6;
    const remainder = requiredHeartNum % 6;
    if (remainder > 4) {
      itemDict.normalNum += 1;
    } else {
      itemDict.candyNum += remainder;
    }
  }

  return itemDict;
};

const divideUseSpecialALittle = ({
  hp,
  damage,
  aimCountReward,
  count,
}: {
  hp: number;
  damage: number;
  aimCountReward: boolean;
  count: number;
}): {
  candyNum: number;
  normalNum: number;
  specialNum: number;
} => {
  const itemDict = {
    candyNum: 0,
    normalNum: 0,
    specialNum: 0,
  };
  const requiredHeartNum = Math.ceil(hp / damage);

  if (aimCountReward) {
    // 回数制限値を超えてしまう場合
    if (Math.ceil(requiredHeartNum / 6) > count) {
      itemDict.normalNum = count;
    } else {
      itemDict.normalNum = requiredHeartNum / 6;
      const remainder = requiredHeartNum % 6;
      if (remainder > 4) {
        // 余りが4以上ならば元気炭酸
        itemDict.normalNum += 1;
      } else if (itemDict.normalNum + remainder <= count) {
        // 余りは飴でも回数制限値以内ならば飴
        itemDict.candyNum += remainder;
      } else {
        // 余りは飴では回数制限をオーバーするならば元気炭酸
        itemDict.normalNum += 1;
      }
    }
  } else {
    itemDict.normalNum = requiredHeartNum / 6;
    const remainder = requiredHeartNum % 6;
    if (remainder > 4) {
      itemDict.normalNum += 1;
    } else {
      itemDict.candyNum += remainder;
    }
  }

  return itemDict;
};

const divideDoNotUseSpecial = ({
  hp,
  damage,
  aimCountReward,
  count,
}: {
  hp: number;
  damage: number;
  aimCountReward: boolean;
  count: number;
}): {
  candyNum: number;
  normalNum: number;
  specialNum: number;
} => {
  const itemDict = {
    candyNum: 0,
    normalNum: 0,
    specialNum: 0,
  };
  const requiredHeartNum = Math.ceil(hp / damage);

  if (aimCountReward) {
    // 回数制限値を超えてしまう場合
    if (Math.ceil(requiredHeartNum / 6) > count) {
      itemDict.normalNum = count;
    } else {
      itemDict.normalNum = requiredHeartNum / 6;
      const remainder = requiredHeartNum % 6;
      if (remainder > 4) {
        // 余りが4以上ならば元気炭酸
        itemDict.normalNum += 1;
      } else if (itemDict.normalNum + remainder <= count) {
        // 余りは飴でも回数制限値以内ならば飴
        itemDict.candyNum += remainder;
      } else {
        // 余りは飴では回数制限をオーバーするならば元気炭酸
        itemDict.normalNum += 1;
      }
    }
  } else {
    itemDict.normalNum = requiredHeartNum / 6;
    const remainder = requiredHeartNum % 6;
    if (remainder > 4) {
      itemDict.normalNum += 1;
    } else {
      itemDict.candyNum += remainder;
    }
  }

  return itemDict;
};

const calcBaseStage = ({
  data,
  summary,
}: {
  data: DivraceStageData;
  summary: DivraceStageResult;
}) => {
  const {
    candyDamage,
    patternSelect,
    clearStageLevel,
    endlessStageCount,
    aimCountRewardDict,
  } = data.base;
};

const calcChallengeStage = ({
  data,
  summary,
}: {
  data: DivraceStageData;
  summary: DivraceStageResult;
}) => {
  const {
    candyDamage,
    patternSelect,
    clearStageLevel,
    endlessStageCount,
    aimCountRewardDict,
  } = data.challenge;
};

export const calcDivraceStageResult = ({
  data,
  summary,
}: {
  data: DivraceStageData;
  summary: DivraceStageResult;
}) => {
  calcBaseStage({ data, summary });
  calcChallengeStage({ data, summary });
};
