import { IntermediateResults } from "@/components/decksim/simulator/calculator/IntermediateResults";
import { sumPetitGirlsEffects } from "@/components/decksim/simulator/calculator/sumPetitGirlsEffects";
import { sumDeckBonus } from "@/components/decksim/simulator/calculator/sumDeckBonus";
import { setPreciousSceneParameter } from "@/components/decksim/simulator/calculator/setPreciousSceneParameter";

import { calcPreciousSceneEffects } from "@/components/decksim/simulator/calculator/calcPreciousSceneEffects";

import {
  DeckSimulatorData,
  DeckSimulatorCommonData,
  DeckSimulatorResult,
} from "@/components/decksim/simulator/useDeckSimulatorData";

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
  const intermediateResults: IntermediateResults = {};

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

  // ボーナス有効率に基づく効果値の2次元マトリックスの作成

  /* 合計計算フェイズ */
  // 2次元マトリックスの合計

  /* イベント個別計算フェイズ  */
  // 計算式のイベント個別の部分、ポイント変換も

  console.log(intermediateResults);

  summary.summaries.totalPerformance.isConvertPoint = false;
  summary.summaries.totalPerformance.attack.minPower = 1234567;
  summary.summaries.totalPerformance.attack.expPower = 1234567;
  summary.summaries.totalPerformance.attack.maxPower = 1234567;
};
