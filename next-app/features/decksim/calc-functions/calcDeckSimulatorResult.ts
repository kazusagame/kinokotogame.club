import { IntermediateResults } from "@/features/decksim/type-definitions/DeckSimulatorIntermediateResults";
import { sumPetitGirlsEffects } from "@/features/decksim/calc-functions/sumPetitGirlsEffects";
import { sumDeckBonus } from "@/features/decksim/calc-functions/sumDeckBonus";
import { setPreciousSceneParameter } from "@/features/decksim/calc-functions/setPreciousSceneParameter";

import { calcPreciousSceneEffects } from "@/features/decksim/calc-functions/calcPreciousSceneEffects";
import { calcSkillEffects } from "@/features/decksim/calc-functions/calcSkillEffects";
import { createEffectMatrix } from "@/features/decksim/calc-functions/createEffectMatrix";

import { sumEffectMatrix } from "@/features/decksim/calc-functions/sumEffectMatrix";
import { calcTotalPerformance } from "@/features/decksim/calc-functions/calcTotalPerformance";

import { calcEventSpecialPerformance } from "@/features/decksim/calc-functions/calcEventSpecialPerformance";

import { transferIntermediateToSummary } from "@/features/decksim/calc-functions/transferIntermediateToSummary";

import {
  DeckSimulatorData,
  DeckSimulatorCommonData,
} from "@/features/decksim/type-definitions/DeckSimulatorData";
import { DeckSimulatorResult } from "@/features/decksim/type-definitions/DeckSimulatorResult";

export const calcDeckSimulatorResult = ({
  inputData,
  commonData,
  summary,
}: {
  inputData: DeckSimulatorData;
  commonData: DeckSimulatorCommonData;
  summary: DeckSimulatorResult;
}) => {
  // 計算の途中結果を格納するオブジェクト
  const intermediateResults: IntermediateResults = {
    totalPerformance: { attack: {}, defense: {} },
    mainScenes: { attack: {}, defense: {} },
    mainSkills: { attack: {}, defense: {} },
    subScenes: { attack: {}, defense: {} },
    subSwitches: { attack: {}, defense: {} },
    preciousScenes: { attack: {}, defense: {} },
    deckBonus: {},
    petitGirls: {},
  };

  /* 準備フェイズ */
  // 応援力効果を合計する
  sumPetitGirlsEffects({ inputData, intermediateResults });

  // デッキボーナスを合計する
  sumDeckBonus({ inputData, intermediateResults });

  // プレシャスシーン用にEx進展数をカウント、プレシャスシーンの効果を確定
  setPreciousSceneParameter({ inputData, intermediateResults });

  /* 中間計算フェイズ */
  // シーン毎 × プレシャスシーン毎 の効果値を算出する
  calcPreciousSceneEffects({ inputData, intermediateResults });

  // 声援の効果値を算出する
  calcSkillEffects({ inputData, intermediateResults });

  // ボーナス有効率に基づく効果値の2次元マトリックスの作成
  // ついでに対抗戦用のシーンごとの声援効果値もセットする
  createEffectMatrix({ inputData, commonData, intermediateResults });

  /* 合計計算フェイズ */
  // ボーナス効果値の2次元マトリックスを各シーンごとに合計します
  sumEffectMatrix({ intermediateResults });

  // すべてのシーン、声援、ぷちセンバツの効果を合算してtotalPerformanceを算出します
  calcTotalPerformance({ inputData, intermediateResults });

  /* イベント個別計算フェイズ  */
  // 計算式のイベント個別の部分、ポイント変換も
  calcEventSpecialPerformance({ inputData, commonData, intermediateResults });

  // intermediate から summary に 反映
  transferIntermediateToSummary({ intermediateResults, summary });
};

