import {
  DeckSimulatorData,
  DeckSimulatorCommonData,
  DeckSimulatorResult,
} from "@/components/decksim/simulator/useDeckSimulatorData";

// import {
//   baseStageData,
//   challengeStageData,
// } from "@/components/decksim/data/divraceStageData";

// const divideUseSpecialALot = ({
//   hp,
//   damage,
//   aimCountReward,
//   count,
// }: {
//   hp: number;
//   damage: number;
//   aimCountReward: boolean;
//   count: number;
// }): {
//   candyNum: number;
//   normalNum: number;
//   specialNum: number;
// } => {
//   const itemDict = {
//     candyNum: 0,
//     normalNum: 0,
//     specialNum: 0,
//   };
//   const requiredHeartNum = Math.ceil(hp / damage);

//   if (aimCountReward) {
//     // 回数制限値を超えてしまう場合
//     if (Math.ceil(requiredHeartNum / 15) > count) {
//       itemDict.specialNum = count;
//     } else {
//       let specialNum = Math.floor(requiredHeartNum / 15);
//       let normalNum = 0;
//       let candyNum = 0;
//       const remainder = requiredHeartNum % 15;
//       const limit = count - specialNum;

//       if (remainder > 10) {
//         // 余りが10超えならば熱中炭酸
//         specialNum += 1;
//       } else if (remainder > 6 && remainder - 6 > limit - 1) {
//         // 余りが6超えで、元気炭酸1個+飴では制限回数以内にクリアできないならば熱中炭酸
//         specialNum += 1;
//       } else if (remainder > 6) {
//         // 余りが6越えで、元気炭酸1個+飴で制限回数以内にクリアできるならその組み合わせ
//         normalNum += 1;
//         candyNum += remainder - 6;
//       } else if (remainder > 4) {
//         // 余りが4越えでならば元気炭酸
//         normalNum += 1;
//       } else if (remainder > limit) {
//         // 残りを飴だけだと制限回数以内にクリアできないなら元気炭酸
//         normalNum += 1;
//       } else {
//         // 残りは飴だけでクリアできる場合は飴
//         candyNum += remainder;
//       }

//       itemDict.specialNum = specialNum;
//       itemDict.normalNum = normalNum;
//       itemDict.candyNum = candyNum;
//     }
//   } else {
//     itemDict.specialNum = Math.floor(requiredHeartNum / 15);
//     const remainder = requiredHeartNum % 15;
//     if (remainder > 10) {
//       itemDict.specialNum += 1;
//     } else if (remainder > 6) {
//       itemDict.normalNum += 1;
//       itemDict.candyNum += remainder - 6;
//     } else if (remainder > 4) {
//       itemDict.normalNum += 1;
//     } else {
//       itemDict.candyNum += remainder;
//     }
//   }

//   return itemDict;
// };

// const divideUseSpecialALittle = ({
//   hp,
//   damage,
//   aimCountReward,
//   count,
// }: {
//   hp: number;
//   damage: number;
//   aimCountReward: boolean;
//   count: number;
// }): {
//   candyNum: number;
//   normalNum: number;
//   specialNum: number;
// } => {
//   const itemDict = {
//     candyNum: 0,
//     normalNum: 0,
//     specialNum: 0,
//   };
//   const requiredHeartNum = Math.ceil(hp / damage);

//   if (aimCountReward) {
//     // 回数制限値を超えてしまう場合
//     if (Math.ceil(requiredHeartNum / 15) > count) {
//       itemDict.specialNum = count;
//     } else {
//       for (let specialNum = 0; specialNum <= count; specialNum++) {
//         const remainderA = requiredHeartNum - specialNum * 15;
//         const limitA = count - specialNum;

//         // 残りの回数をすべて元気炭酸に注ぎ込んでも届かない場合は次へ
//         if (remainderA > limitA * 6) continue;

//         for (let normalNum = 0; normalNum <= limitA; normalNum++) {
//           const remainderB = remainderA - normalNum * 6;
//           const limitB = limitA - normalNum;

//           // 残りの回数をすべて飴に注ぎ込んでも届かない場合は次へ
//           if (remainderB > limitB) continue;

//           // 既にremainderがマイナスの場合は飴は既に不要なので0
//           const candyNum = remainderB > 0 ? remainderB : 0;

//           // ここまで到達できれば条件をクリアしているので登録してbreak
//           itemDict.specialNum = specialNum;
//           itemDict.normalNum = normalNum;
//           itemDict.candyNum = candyNum;
//           break;
//         }

//         // 内側のループで登録済みなのでbreak
//         break;
//       }
//     }
//   } else {
//     itemDict.normalNum = Math.floor(requiredHeartNum / 6);
//     const remainder = requiredHeartNum % 6;
//     if (remainder > 4) {
//       itemDict.normalNum += 1;
//     } else {
//       itemDict.candyNum += remainder;
//     }
//   }

//   return itemDict;
// };

// const divideDoNotUseSpecial = ({
//   hp,
//   damage,
//   aimCountReward,
//   count,
// }: {
//   hp: number;
//   damage: number;
//   aimCountReward: boolean;
//   count: number;
// }): {
//   candyNum: number;
//   normalNum: number;
//   specialNum: number;
// } => {
//   const itemDict = {
//     candyNum: 0,
//     normalNum: 0,
//     specialNum: 0,
//   };
//   const requiredHeartNum = Math.ceil(hp / damage);

//   if (aimCountReward) {
//     // 回数制限値を超えてしまう場合
//     if (Math.ceil(requiredHeartNum / 6) > count) {
//       itemDict.normalNum = count;
//     } else {
//       itemDict.normalNum = Math.floor(requiredHeartNum / 6);
//       const remainder = requiredHeartNum % 6;
//       if (remainder > 4) {
//         // 余りが4超えならば元気炭酸
//         itemDict.normalNum += 1;
//       } else if (itemDict.normalNum + remainder <= count) {
//         // 余りは飴でも回数制限値以内ならば飴
//         itemDict.candyNum += remainder;
//       } else {
//         // 余りは飴では回数制限をオーバーするならば元気炭酸
//         itemDict.normalNum += 1;
//       }
//     }
//   } else {
//     itemDict.normalNum = Math.floor(requiredHeartNum / 6);
//     const remainder = requiredHeartNum % 6;
//     if (remainder > 4) {
//       itemDict.normalNum += 1;
//     } else {
//       itemDict.candyNum += remainder;
//     }
//   }

//   return itemDict;
// };

// const calcBaseStage = ({
//   data,
//   summary,
// }: {
//   data: DivraceStageData;
//   summary: DivraceStageResult;
// }) => {
//   const {
//     candyDamage,
//     patternSelect,
//     clearStageLevel,
//     endlessStageCount,
//     aimCountRewardDict,
//   } = data.base;

//   // number型であることを以下で保証
//   if (typeof candyDamage !== "number") return;
//   if (typeof endlessStageCount !== "number") return;

//   for (let level = 1; level <= clearStageLevel; level++) {
//     const { hp, count, pt, trustA, trustB } = baseStageData[level - 1];
//     let result = { candyNum: 0, normalNum: 0, specialNum: 0 };

//     if (patternSelect === "useSpecialALot") {
//       result = divideUseSpecialALot({
//         hp,
//         damage: candyDamage,
//         aimCountReward: aimCountRewardDict[level],
//         count,
//       });
//     } else if (patternSelect === "useSpecialALittle") {
//       result = divideUseSpecialALittle({
//         hp,
//         damage: candyDamage,
//         aimCountReward: aimCountRewardDict[level],
//         count,
//       });
//     } else if (patternSelect === "doNotUseSpecial") {
//       result = divideDoNotUseSpecial({
//         hp,
//         damage: candyDamage,
//         aimCountReward: aimCountRewardDict[level],
//         count,
//       });
//     }

//     const multiplier =
//       level === 31 && endlessStageCount >= 1 ? endlessStageCount : 1;

//     const { candyNum, normalNum, specialNum } = result;
//     const totalNum = candyNum + normalNum + specialNum;
//     summary.summaries.base[level] = {
//       candyNum,
//       normalNum,
//       specialNum,
//       totalDamage: candyDamage * (candyNum + normalNum * 6 + specialNum * 15),
//     };
//     summary.summaries.base.totalPoint += pt * multiplier;
//     summary.summaries.base.totalTrust +=
//       totalNum <= count ? (trustA + trustB) * multiplier : trustA * multiplier;
//     summary.summaries.base.totalCandy += candyNum * multiplier;
//     summary.summaries.base.totalNormal += normalNum * multiplier;
//     summary.summaries.base.totalSpecial += specialNum * multiplier;
//   }
// };

// const calcChallengeStage = ({
//   data,
//   summary,
// }: {
//   data: DivraceStageData;
//   summary: DivraceStageResult;
// }) => {
//   const {
//     candyDamage,
//     patternSelect,
//     clearStageLevel,
//     endlessStageCount,
//     aimCountRewardDict,
//   } = data.challenge;

//   // number型であることを以下で保証
//   if (typeof candyDamage !== "number") return;
//   if (typeof endlessStageCount !== "number") return;

//   for (let level = 1; level <= clearStageLevel; level++) {
//     const { hp, count, pt, trust } = challengeStageData[level - 1];
//     let result = { candyNum: 0, normalNum: 0, specialNum: 0 };

//     if (patternSelect === "useSpecialALot") {
//       result = divideUseSpecialALot({
//         hp,
//         damage: candyDamage,
//         aimCountReward: aimCountRewardDict[level],
//         count,
//       });
//     } else if (patternSelect === "useSpecialALittle") {
//       result = divideUseSpecialALittle({
//         hp,
//         damage: candyDamage,
//         aimCountReward: aimCountRewardDict[level],
//         count,
//       });
//     } else if (patternSelect === "doNotUseSpecial") {
//       result = divideDoNotUseSpecial({
//         hp,
//         damage: candyDamage,
//         aimCountReward: aimCountRewardDict[level],
//         count,
//       });
//     }

//     const multiplier =
//       level === 31 && endlessStageCount >= 1 ? endlessStageCount : 1;

//     const { candyNum, normalNum, specialNum } = result;
//     summary.summaries.challenge[level] = {
//       candyNum,
//       normalNum,
//       specialNum,
//       totalDamage: candyDamage * (candyNum + normalNum * 6 + specialNum * 15),
//     };
//     summary.summaries.challenge.totalPoint += pt * multiplier;
//     summary.summaries.challenge.totalTrust += trust * multiplier;
//     summary.summaries.challenge.totalCandy += candyNum * multiplier;
//     summary.summaries.challenge.totalNormal += normalNum * multiplier;
//     summary.summaries.challenge.totalSpecial += specialNum * multiplier;
//   }
// };

export const calcDeckSimulatorResult = ({
  data,
  commonData,
  summary,
}: {
  data: DeckSimulatorData;
  commonData: DeckSimulatorCommonData;
  summary: DeckSimulatorResult;
}) => {
  // calcBaseStage({ data, summary });
  // calcChallengeStage({ data, summary });
};
