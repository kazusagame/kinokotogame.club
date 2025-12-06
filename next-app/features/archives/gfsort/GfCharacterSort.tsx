"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next-export-optimize-images/image";
import ImageRemote from "next/image";

const imageLoader = ({ src }: { src: string }) => {
  return src;
};

import useGameModeStatusData from "./useGameModeStatusData";
import useConditionalKeyPress from "@/lib/hooks/useConditionalKeyPress";

import GameModeSelector, { GameMode } from "./GameModeSelector";
import { CHARACTER_DATA, checkHasFullBodyImage } from "./characterData";
import { GameData } from "./characterSortAlgorithm";

export default function GfCharacterSort() {
  const restartViewPoint = useRef<HTMLDivElement>(null);
  const {
    gameMode,
    gameStatus,
    gameData,
    sortTargetNameList,
    handleChangeGameMode,
    handleClickStartButton,
    handleClickLikeGirl,
    handleClickRestartButton,
  } = useGameModeStatusData(restartViewPoint);

  useConditionalKeyPress(
    ["4", "A", "a"],
    () => handleClickLikeGirl(-1),
    gameStatus === "inProgress"
  );
  useConditionalKeyPress(
    ["6", "D", "d"],
    () => handleClickLikeGirl(1),
    gameStatus === "inProgress"
  );
  useConditionalKeyPress(
    ["8", "W", "w"],
    () => handleClickLikeGirl(0),
    gameStatus === "inProgress"
  );
  useConditionalKeyPress(
    ["2", "S", "s"],
    () => handleClickLikeGirl(2),
    gameStatus === "inProgress"
  );

  return (
    <>
      <div ref={restartViewPoint} className="h-1 mb-2" />
      {gameStatus === "new" ? (
        <section className="flex justify-center md:px-4">
          <div className="flex flex-col gap-6 items-center rounded-xl bg-base-200 p-6 w-fit">
            <GameModeSelector
              gameMode={gameMode}
              onChangeGameMode={handleChangeGameMode}
            />
            <p>ソート対象数： {sortTargetNameList.length}</p>
            <button
              className="btn btn-primary rounded-md"
              onClick={handleClickStartButton}
            >
              ソート開始
            </button>
          </div>
        </section>
      ) : null}
      {gameStatus === "inProgress" ? (
        <CharacterSelect
          sortTargetNameList={sortTargetNameList}
          gameMode={gameMode}
          gameData={gameData}
          onClickLikeGirl={handleClickLikeGirl}
        />
      ) : null}
      {gameStatus === "completed" ? (
        <ResultTable
          sortTargetNameList={sortTargetNameList}
          gameData={gameData}
        />
      ) : null}
      {gameStatus !== "new" ? (
        <>
          <section className="flex justify-center mt-16 mb-8">
            <button
              className="btn btn-secondary rounded-md"
              onClick={handleClickRestartButton}
            >
              もう一回最初から
            </button>
          </section>
        </>
      ) : null}
      <section className="my-8 leading-7 md:px-4">
        <h2>使用方法</h2>
        <ul>
          <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
            ソート開始ボタンを押すとキャラソートを開始します。
          </li>
          <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
            好きな方（または引き分け）をクリックやタップで選択してください。
          </li>

          <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
            [除外] を選択するとその2人はソートの対象外になります。
          </li>
          <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
            パソコンの場合はキーボードの WASD もしくは テンキーの 8426
            でも選択が可能です。
          </li>
        </ul>
      </section>
      <section className="my-8 leading-7 md:px-4">
        <h2>スクリプト配布元</h2>
        <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
          <Link
            href="http://marineturtle.sakura.ne.jp/script/sort/hpsort/mergesort_exp.html"
            target="_blank"
            rel="noreferrer"
            className="link ml-2 mr-2"
          >
            其の疾きこと亀の如く
          </Link>
          (リンク切れ)
        </p>
        <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
          <Link
            href="http://garufuresort.web.fc2.com/"
            target="_blank"
            rel="noreferrer"
            className="link ml-2 mr-2"
          >
            ガルフレソート（仮）
          </Link>
          (リンク切れ)
        </p>
        <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
          <Link
            href="http://5bit.web.fc2.com/gfsort/index.html"
            target="_blank"
            rel="noreferrer"
            className="link ml-2 mr-2"
          >
            ガルフレソート（仮）立ち絵Ver.
          </Link>
        </p>
      </section>
      <section className="my-8 leading-7 md:px-4">
        <p>
          本ページに表示される画像データはガールフレンド(仮)のゲーム内から引用しています。
          <br />
          画像データの著作権は株式会社サイバーエージェントに帰属します。
        </p>
      </section>
    </>
  );
}

function CharacterSelect({
  sortTargetNameList,
  gameMode,
  gameData,
  onClickLikeGirl,
}: {
  sortTargetNameList: (keyof typeof CHARACTER_DATA)[];
  gameMode: GameMode;
  gameData: GameData;
  onClickLikeGirl: (flag: number) => void;
}) {
  const leftGirlName =
    sortTargetNameList[gameData.lstMember[gameData.cmp1][gameData.head1]];
  const leftGirlProfileId = CHARACTER_DATA[leftGirlName]["profileId"];
  const rightGirlName =
    sortTargetNameList[gameData.lstMember[gameData.cmp2][gameData.head2]];
  const rightGirlProfileId = CHARACTER_DATA[rightGirlName]["profileId"];

  let leftDirPath = "/image/characterSort/";
  let rightDirPath = "/image/characterSort/";
  if (gameMode.config.FullBodyImage === true) {
    if (checkHasFullBodyImage(leftGirlProfileId)) {
      leftDirPath = "/image/characterSort/fullBodyImage/";
    }
    if (checkHasFullBodyImage(rightGirlProfileId)) {
      rightDirPath = "/image/characterSort/fullBodyImage/";
    }
  }

  let percent = Math.floor((gameData.finishSize * 100) / gameData.totalSize);
  if (percent > 99) {
    percent = 99;
  }

  return (
    <section className="flex flex-col gap-4 items-center">
      <div className="flex flex-col">
        <div className="text-center">{`Battle No.${gameData.numQuestion}`}</div>
        <div className="text-center"> {`${percent}% sorted.`}</div>
      </div>
      <div className="flex gap-2 justify-center w-full max-w-3xl">
        <div
          className="flex flex-col gap-2 items-center w-2/5 cursor-pointer"
          onClick={() => onClickLikeGirl(-1)}
        >
          <div className="flex items-center h-12">{leftGirlName}</div>
          <div className="w-full h-[500px] relative">
            {/* デプロイ先がgithubの場合は本番環境から直リンする */}
            {process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github" ? (
              <ImageRemote
                src={`https://kinokotogame.mods.jp/public${leftDirPath}${leftGirlProfileId}.png`}
                alt={leftGirlName}
                className="object-cover object-[center_bottom]"
                fill
                sizes="50vw"
                loader={imageLoader}
              />
            ) : (
              <Image
                src={`${leftDirPath}${leftGirlProfileId}.png`}
                alt={leftGirlName}
                className="object-cover object-[center_bottom]"
                fill
                sizes="50vw"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-start w-1/6 h-auto">
          <div className="h-12" />
          <div className="flex flex-col gap-16 justify-end h-[500px]">
            <button
              className="btn btn-primary rounded-md h-1/4 text-base"
              onClick={() => onClickLikeGirl(0)}
            >
              引き分け
            </button>
            <button
              className="btn btn-primary rounded-md h-1/4 text-base mb-8"
              onClick={() => onClickLikeGirl(2)}
            >
              除外
            </button>
          </div>
        </div>
        <div
          className="flex flex-col gap-2 items-center w-2/5 cursor-pointer"
          onClick={() => onClickLikeGirl(1)}
        >
          <div className="flex items-center h-12">{rightGirlName}</div>
          <div className="w-full h-[500px] relative">
            {/* デプロイ先がgithubの場合は本番環境から直リンする */}
            {process.env.NEXT_PUBLIC_DEPLOY_TARGET === "github" ? (
              <ImageRemote
                src={`https://kinokotogame.mods.jp/public${rightDirPath}${rightGirlProfileId}.png`}
                alt={rightGirlName}
                className="object-cover object-[center_bottom]"
                fill
                sizes="50vw"
                loader={imageLoader}
              />
            ) : (
              <Image
                src={`${rightDirPath}${rightGirlProfileId}.png`}
                alt={rightGirlName}
                className="object-cover object-[center_bottom]"
                fill
                sizes="50vw"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultTable({
  sortTargetNameList,
  gameData,
}: {
  sortTargetNameList: (keyof typeof CHARACTER_DATA)[];
  gameData: GameData;
}) {
  const resultArray: {
    ranking: number;
    name: string | number;
    type: string;
    grade: string;
  }[] = [];
  let ranking = 1; // 順位
  let sameRank = 1; // 同順調整用

  const resultList = gameData.lstMember[0];
  const equalList = gameData.equal;
  const selectHistory = gameData.selectHistory;
  for (let i = 0; i < resultList.length; i++) {
    const name = sortTargetNameList[resultList[i]];
    const type = CHARACTER_DATA[name]["type"];
    const grade = CHARACTER_DATA[name]["grade"];
    resultArray.push({ ranking, name, type, grade });

    if (equalList[resultList[i]] === resultList[i + 1]) {
      sameRank++;
    } else {
      ranking += sameRank;
      sameRank = 1;
    }
  }

  return (
    <section className="flex flex-col items-center md:p-4 w-full">
      <div className="border border-base-300 rounded-xl bg-base-200 p-4 w-full max-w-md">
        <h2 className="mb-4">ソート結果</h2>
        <table className="table table-xs md:table-md">
          <thead>
            <tr>
              <td className="text-center px-2 py-1">順位</td>
              <td className="text-center px-2 py-1">名前</td>
              <td className="text-center px-2 py-1">属性</td>
              <td className="text-center px-2 py-1">学年</td>
            </tr>
          </thead>
          <tbody>
            {resultArray.map((result, index) => (
              <tr key={index} className="odd:bg-base-200 even:bg-base-300">
                <td className="text-right px-2 py-1 whitespace-nowrap">
                  {result.ranking} 位
                </td>
                <td className="p-1 md:p-2">{result.name}</td>
                <td
                  className={
                    result.type === "POP"
                      ? "text-center px-2 py-1 bg-pop"
                      : result.type === "COOL"
                      ? "text-center px-2 py-1 bg-cool"
                      : result.type === "SWEET"
                      ? "text-center px-2 py-1 bg-sweet"
                      : "text-center px-2 py-1"
                  }
                >
                  {result.type}
                </td>
                <td className="text-center px-2 py-1">{result.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="collapse collapse-arrow border border-base-300 bg-base-200 mt-8  w-full max-w-md">
        <input type="checkbox" id="selectHistory" />
        <div className="collapse-title">選択履歴</div>
        <div className="collapse-content">
          <table className="table table-xs md:table-md">
            <thead>
              <tr>
                <td className="text-center px-2 py-1">No.</td>
                <td className="text-center px-2 py-1">ガール(左)</td>
                <td className="text-center px-2 py-1 min-w-20">選択</td>
                <td className="text-center px-2 py-1">ガール(右)</td>
              </tr>
            </thead>
            <tbody>
              {selectHistory.map((history, index) => (
                <tr key={index} className="odd:bg-base-200 even:bg-base-300">
                  <td className="text-right px-2 py-1">{history[0]}</td>
                  <td className="text-right px-2 py-1">
                    {sortTargetNameList[history[2]]}
                  </td>
                  {history[1] === -1 ? (
                    <td className="text-left px-1 py-1">Like!</td>
                  ) : history[1] === 0 ? (
                    <td className="text-center px-2 py-1">引き分け</td>
                  ) : history[1] === 1 ? (
                    <td className="text-right px-1 py-1">Like!</td>
                  ) : (
                    <td className="text-center px-2 py-1">除外</td>
                  )}
                  <td className="text-left px-2 py-1">
                    {sortTargetNameList[history[3]]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
