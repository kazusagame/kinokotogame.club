import { SKILL_DATA_PER_EVENT, SKILL_RATE_DATA } from "@/components/decksim/data/skillData";
import { DeckSimulatorEventId } from "@/components/decksim/data/eventData";
import {
  DeckSimulatorData,
  SceneParameters,
} from "@/components/decksim/simulator/useDeckSimulatorData";
import {
  IntermediateResults,
} from "@/components/decksim/simulator/calculator/IntermediateResults";

import { setDeepValue } from "@/lib/setDeepValue";
import { returnNumber } from "@/lib/returnNumber";

export const calcSkillEffects = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  // 攻援/守援センバツごと x 声援ごとに、実際の効果値を算出する

}
