import { DeckSimulatorData } from "@/components/decksim/simulator/useDeckSimulatorData";
import { IntermediateResults } from "@/components/decksim/simulator/calculator/IntermediateResults";

import { SelectPreciousSceneParameters } from "@/components/decksim/simulator/calculator/IntermediateResults";

export const calcPreciousSceneEffects = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  // 攻援/守援センバツごと x プレシャスシーンごとに、実際の効果値を算出する
  (["attack", "defense"] as const).forEach((type) => {
    const data = intermediateResults["preciousScenes"]?.[type] ?? {};
    const scenesKeys = Object.keys(data).filter(
      (key) => key !== "limitBreakCount"
    );
    const limitBreakCount = data.limitBreakCount!;

    scenesKeys.forEach((key) => {
      const sceneParameters = data[Number(key)];
      calcEachPreciousScene({
        inputData,
        intermediateResults,
        type,
        sceneNum: Number(key),
        sceneParameters,
        limitBreakCount,
      });
    });
  });
};

const calcEachPreciousScene = ({
  inputData,
  intermediateResults,
  type,
  sceneNum,
  sceneParameters,
  limitBreakCount,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
  type: "attack" | "defense";
  sceneNum: number;
  sceneParameters: SelectPreciousSceneParameters;
  limitBreakCount: { main: number; sub: number };
}) => {
  // aaa
};

const calcEachScene = ({

}: {
  sceneData: DeckSimulatorData
}) => {
  // aa
};
