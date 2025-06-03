import { DeckSimulatorData } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorData";
import { IntermediateResults } from "@/components/decksim/simulator/typeDefinition/DeckSimulatorIntermediateResults";

export const calcEventSpecialNormalBattle = ({
  inputData,
  intermediateResults,
}: {
  inputData: DeckSimulatorData;
  intermediateResults: IntermediateResults;
}) => {
  const isWinBonus =
    inputData.eventSpecial?.["normal-battle"]?.isWinBonus ?? true;

  let { minPower, expPower, maxPower } =
    intermediateResults.totalPerformance.attack;

  minPower = Math.ceil((minPower ?? 0) * (1 + (isWinBonus ? 0.1 : 0)));
  expPower = Math.ceil((expPower ?? 0) * (1 + (isWinBonus ? 0.1 : 0)));
  maxPower = Math.ceil((maxPower ?? 0) * (1 + (isWinBonus ? 0.1 : 0)));

  // イベント固有補正後の数値を反映しなおす
  intermediateResults.totalPerformance.attack = {
    minPower,
    expPower,
    maxPower,
  };
};
