import { useState, useMemo, RefObject } from "react";
import {
  GameMode,
  GirlGrade,
  GirlSchool,
  Config,
  GirlType,
} from "./GameModeSelector";
import { CHARACTER_DATA } from "./characterData";
import {
  INITIAL_GAME_DATA,
  initializeGameData,
  selectCharacter,
  GameData,
} from "./characterSortAlgorithm";

export default function useGameModeStatusData(
  restartViewPoint: RefObject<HTMLDivElement>
) {
  const [gameMode, setGameMode] = useState<GameMode>({
    girlType: { SWEET: true, COOL: true, POP: true, "---": true },
    girlGrade: { "1年": true, "2年": true, "3年": true, "---": true },
    girlSchool: {
      Seio: true,
      Others: true,
      Collabo: false,
      Childhood: false,
      Family: false,
      Mascot: false,
    },
    config: { Randomize: true, FullBodyImage: false },
  });
  const [gameStatus, setGameStatus] = useState<
    "new" | "inProgress" | "completed"
  >("new");
  const [gameData, setGameData] = useState<GameData>(
    structuredClone(INITIAL_GAME_DATA)
  );

  const sortTargetNameList: (keyof typeof CHARACTER_DATA)[] = useMemo(() => {
    const nameList: (keyof typeof CHARACTER_DATA)[] = [];
    for (const [key, value] of Object.entries(CHARACTER_DATA)) {
      const { type, grade, school } = value;
      let schoolFlg:
        | "Seio"
        | "Others"
        | "Collabo"
        | "Childhood"
        | "Family"
        | "Mascot" = "Seio";
      switch (school) {
        case "聖櫻学園":
          schoolFlg = "Seio";
          break;
        case "昇星高校":
        case "嵯峨椿高校":
        case "玉宮高校":
        case "鳳歌院高校":
          schoolFlg = "Others";
          break;
        case "コラボ":
          schoolFlg = "Collabo";
          break;
        case "幼少期":
          schoolFlg = "Childhood";
          break;
        case "家族":
          schoolFlg = "Family";
          break;
        case "マスコット":
          schoolFlg = "Mascot";
          break;
      }
      if (
        gameMode["girlType"][type] &&
        gameMode["girlGrade"][grade] &&
        gameMode["girlSchool"][schoolFlg]
      ) {
        nameList.push(key);
      }
    }
    return nameList;
  }, [gameMode]);

  const handleChangeGameMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextGameMode = structuredClone(gameMode);
    const name = e.currentTarget.name as keyof GameMode;
    const checked = e.currentTarget.checked;
    let value;
    switch (name) {
      case "girlType":
        value = e.currentTarget.value as GirlType;
        nextGameMode[name][value] = checked;
        break;
      case "girlGrade":
        value = e.currentTarget.value as GirlGrade;
        nextGameMode[name][value] = checked;
        break;
      case "girlSchool":
        value = e.currentTarget.value as GirlSchool;
        nextGameMode[name][value] = checked;
        break;
      case "config":
        value = e.currentTarget.value as Config;
        nextGameMode[name][value] = checked;
        break;
    }
    setGameMode(nextGameMode);
  };

  const handleClickStartButton = () => {
    // ソート対象が0人 or 1人の場合はスキップ
    if (sortTargetNameList.length === 0) {
      window.alert(`ソート対象のガールが 0名 です！`);
      return;
    }
    if (sortTargetNameList.length === 1) {
      window.alert(`ソート対象のガールが 1名 です！`);
      return;
    }

    const nextGamaData = initializeGameData(sortTargetNameList, gameMode);
    restartViewPoint?.current?.scrollIntoView();
    setGameData(nextGamaData);
    setGameStatus("inProgress");
  };
  // flag：比較結果
  // -1：左を選択
  //  0：引き分け
  //  1：右を選択
  //  2：両者をリストから除外する
  const handleClickLikeGirl = (flag: number): void => {
    const nextGamaData = selectCharacter(gameData, flag);

    // リストが一つだけになったらソート完了
    if (nextGamaData.lstMember.length === 1) {
      restartViewPoint?.current?.scrollIntoView();
      setGameStatus("completed");
    }
    setGameData(nextGamaData);
  };

  const handleClickRestartButton = () => {
    restartViewPoint?.current?.scrollIntoView();
    setGameStatus("new");
  };

  return {
    gameMode,
    gameStatus,
    gameData,
    sortTargetNameList,
    handleChangeGameMode,
    handleClickStartButton,
    handleClickLikeGirl,
    handleClickRestartButton,
  };
}
