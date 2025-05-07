"use client";

import Link from "next/link";
import { useState, useEffect, useRef, CSSProperties } from "react";

import Card from "./Card";
import Menu from "./Menu";
import GameOver from "./GameOver";
import History, { HistoryFormat } from "./History";
import { imageMapping } from "@/lib/petitMatching/imageMapping";

export default function PetitMatching() {
  const [cardStates, setCardStates] = useState<boolean[]>(
    Array(25).fill(false)
  );
  const [cardPairs, setCardPairs] = useState<boolean[]>(Array(25).fill(false));
  const [imageUrls, setImageUrls] = useState<string[]>(
    Array(25).fill("/image/petitMatching/06_NowLoading.png")
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [cardZoom, setCardZoom] = useState<boolean[]>(Array(25).fill(true));

  const [gameNum, setGameNum] = useState<number>(1);
  const [turn, setTurn] = useState<number>(1);
  const [target, setTarget] = useState<number>(99);

  const clickable = useRef<boolean>(true);
  const nextIsOdd = useRef<boolean>(true);
  const beforeIndex = useRef<number>(0);
  const menuChanged = useRef<boolean>(false);

  const [gameMode, setGameMode] = useState<"endless" | "challenge">("endless");
  const [imageMode, setImageMode] = useState<"origin" | "cat" | "dog">(
    "origin"
  );
  const [boardMode, setBoardMode] = useState<"3x3" | "4x4" | "5x5">("3x3");

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const [history, setHistory] = useState<HistoryFormat>({
    board3x3: { total: 0, historyArray: Array(99).fill(0) },
    board4x4: { total: 0, historyArray: Array(99).fill(0) },
    board5x5: { total: 0, historyArray: Array(99).fill(0) },
  });

  useEffect(() => {
    imageMapping(gameMode, imageMode, boardMode).then(
      (nextImageUrls: string[]) => {
        setImageUrls(nextImageUrls);
        setTimeout(() => setLoading(false), 1000);
      }
    );
  }, [gameMode, imageMode, boardMode]);

  const handleResetButton = (): void => {
    clickable.current = true;
    nextIsOdd.current = true;
    beforeIndex.current = 0;
    menuChanged.current = false;
    setCardStates(Array(25).fill(false));
    setCardPairs(Array(25).fill(false));
    setImageUrls(Array(25).fill("/image/petitMatching/06_NowLoading.png"));
    setLoading(true);
    setCardZoom(Array(25).fill(true));
    setTurn(1);
    setGameNum(1);
    setIsGameOver(false);

    const targetList = {
      board3x3: 6,
      board4x4: 14,
      board5x5: 24,
    };
    if (gameMode === "challenge") {
      setTarget(targetList[`board${boardMode}`]);
    } else {
      setTarget(99);
    }

    /* 開閉時に新しい絵柄が見えないように更新を少し遅延 */
    setTimeout(() => {
      imageMapping(gameMode, imageMode, boardMode).then(
        (nextImageUrls: string[]) => {
          setImageUrls(nextImageUrls);
          setLoading(false);
        }
      );
    }, 500);
  };

  const handleNextGame = (): void => {
    clickable.current = true;
    nextIsOdd.current = true;
    beforeIndex.current = 0;
    menuChanged.current = false;
    setCardStates(Array(25).fill(false));
    setCardPairs(Array(25).fill(false));
    setImageUrls(Array(25).fill("/image/petitMatching/06_NowLoading.png"));
    setLoading(true);
    setCardZoom(Array(25).fill(true));
    setTurn(1);
    const nextGameNum = gameNum < 999 ? gameNum + 1 : 999;
    setGameNum(nextGameNum);

    const targetList = {
      board3x3: 6,
      board4x4: 14,
      board5x5: 26,
    };
    if (gameMode === "challenge") {
      setTarget(targetList[`board${boardMode}`]);
    } else {
      setTarget(99);
    }

    /* 開閉時に新しい絵柄が見えないように更新を少し遅延 */
    setTimeout(() => {
      imageMapping(gameMode, imageMode, boardMode).then(
        (nextImageUrls: string[]) => {
          setImageUrls(nextImageUrls);
          setLoading(false);
        }
      );
    }, 500);
  };

  const handleCardClick = (index: number): void => {
    /* 誤判定防止のため、画像ローディング中は2枚目以上のオープンを抑止 */
    if (loading === true && nextIsOdd.current === false) {
      return;
    }
    /* 挑戦モードでのゲームオーバー時はそれ以降のオープンを抑止 */
    if (isGameOver === true) {
      return;
    }

    if (cardStates[index] === true) {
      const nextCardZoom = [...cardZoom];
      nextCardZoom[index] = !nextCardZoom[index];
      setCardZoom(nextCardZoom);
    } else if (cardStates[index] === false && clickable.current === true) {
      clickable.current = false;

      const nextCardStates = [...cardStates];
      nextCardStates[index] = true;
      setCardStates(nextCardStates);

      let clickableTimeout: number = 100;

      /* 偶数番の時はペア判定やクリア判定を行う */
      if (nextIsOdd.current === false) {
        if (imageUrls[beforeIndex.current] !== imageUrls[index]) {
          const timeoutCardStates = [...nextCardStates];
          timeoutCardStates[beforeIndex.current] = false;
          timeoutCardStates[index] = false;

          /* 挑戦モードでターン数がクリアノルマ数以上となった場合はゲームオーバーとする。 */
          if (gameMode === "challenge" && turn >= target) {
            setTimeout(() => {
              setCardStates(timeoutCardStates);
              setIsGameOver(true);
            }, 1500);
          } else {
            setTimeout(() => {
              const nextTurn = turn < 99 ? turn + 1 : 99;
              setTurn(nextTurn);
              setCardStates(timeoutCardStates);
            }, 1500);
            clickableTimeout = 2000;
          }
        } else {
          const nextCardPairs = [...cardPairs];
          nextCardPairs[beforeIndex.current] = true;
          nextCardPairs[index] = true;

          /* クリア判定 */
          let isGameClear: boolean = false;
          const pairedCardNum: number = nextCardPairs.filter(
            (e) => e === true
          ).length;
          if (
            (boardMode === "3x3" && pairedCardNum >= 8) ||
            (boardMode === "4x4" && pairedCardNum >= 16) ||
            (boardMode === "5x5" && pairedCardNum >= 24)
          ) {
            isGameClear = true;
          }

          /* 未クリアの場合は1秒後にターンを進める */
          /* ただし、挑戦モードでターン数がクリアノルマ数以上となった場合はゲームオーバーとする。 */
          if (isGameClear === false) {
            if (gameMode === "challenge" && turn >= target) {
              setTimeout(() => {
                setCardPairs(nextCardPairs);
                setIsGameOver(true);
              }, 1000);
              clickableTimeout = 1000;
            } else {
              setTimeout(() => {
                const nextTurn = turn < 99 ? turn + 1 : 99;
                setTurn(nextTurn);
                setCardPairs(nextCardPairs);
              }, 1000);
              clickableTimeout = 1000;
            }

            /* ゲームクリア時 */
          } else {
            const nexHistory = {
              board3x3: structuredClone(history.board3x3),
              board4x4: structuredClone(history.board4x4),
              board5x5: structuredClone(history.board5x5),
            };
            nexHistory[`board${boardMode}`].total += 1;
            nexHistory[`board${boardMode}`].historyArray[turn - 1] += 1;
            setHistory(nexHistory);

            /* ゲームモードが通常モードもしくは挑戦モードの場合は自動的に次のゲームへ以降する */
            if (gameMode === "endless" || gameMode === "challenge") {
              setTimeout(() => {
                setCardPairs(nextCardPairs);
                setTimeout(() => {
                  handleNextGame();
                }, 1000);
              }, 1000);
            }

            /* 残りの処理はハンドラの方でやるためスキップ */
            return;
          }
        }
      }

      /* 未クリア時は次のクリック時に備えて後処理 */
      nextIsOdd.current = !nextIsOdd.current;
      beforeIndex.current = index;
      setTimeout(() => {
        clickable.current = true;
      }, clickableTimeout);
    }
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);

    /* 設定変更時はメニューを閉じたときにゲームを初期化 */
    if (menuChanged.current === true) {
      handleResetButton();
    }
  };

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    let nextImageMode = imageMode;
    if (name === "imageMode") {
      if (value === "0") {
        nextImageMode = "origin";
      } else if (value === "50") {
        nextImageMode = "cat";
      } else if (value === "100") {
        nextImageMode = "dog";
      }
      setImageMode(nextImageMode);
    }

    let nextGameMode = gameMode;
    if (name === "gameMode") {
      if (value === "0") {
        nextGameMode = "endless";
      } else if (value === "100") {
        nextGameMode = "challenge";
      }
      setGameMode(nextGameMode);
    }

    let nextBoardMode = boardMode;
    if (name === "boardMode") {
      if (value === "0") {
        nextBoardMode = "3x3";
      } else if (value === "50") {
        nextBoardMode = "4x4";
      } else if (value === "100") {
        nextBoardMode = "5x5";
      }
      setBoardMode(nextBoardMode);
    }

    /* 設定変更時はメニューを閉じたときにゲームを初期化するようにフラグを立てておく */
    menuChanged.current = true;
  };

  return (
    <>
      <main
        id="root"
        className="flex flex-col items-center relative md:flex-row md:items-start md:justify-center"
      >
        <div className="max-w-sm w-full mb-4 md:mr-16">
          <GameArea
            cardStates={cardStates}
            cardPairs={cardPairs}
            imageUrls={imageUrls}
            loading={loading}
            cardZoom={cardZoom}
            gameNum={gameNum}
            turn={turn}
            target={target}
            gameMode={gameMode}
            boardMode={boardMode}
            onCardClick={handleCardClick}
            onStartButton={handleResetButton}
            onOpenMenu={handleOpenMenu}
          />
          {menuOpen ? (
            <Menu
              onCloseClick={handleCloseMenu}
              onResetButton={handleResetButton}
              onModeChange={handleModeChange}
              gameMode={gameMode}
              imageMode={imageMode}
              boardMode={boardMode}
            />
          ) : (
            ""
          )}
          {isGameOver ? (
            <GameOver onResetButton={handleResetButton} gameNum={gameNum} />
          ) : (
            ""
          )}
        </div>
        <History history={history} />
      </main>
      <footer className="text-center mt-4 mb-4">
        <div className="mb-6">
          <p>イラストや画像は下記のサイトやAPIを利用しております。</p>
          <p>イラストや画像の著作権はそれぞれに帰属します。</p>
          <div className="mt-2">
            <Link
              href="https://illustimage.com/"
              target="_blank"
              className="text-primary underline px-2"
            >
              illust image
            </Link>
            <Link
              href="https://thecatapi.com/"
              target="_blank"
              className="text-primary underline px-2"
            >
              The Cat API
            </Link>
            <Link
              href="https://thedogapi.com/"
              target="_blank"
              className="text-primary underline px-2"
            >
              The Dog API
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

const GameArea = ({
  cardStates,
  cardPairs,
  imageUrls,
  loading,
  cardZoom,
  gameNum,
  turn,
  target,
  gameMode,
  boardMode,
  onCardClick,
  onOpenMenu,
}: {
  cardStates: boolean[];
  cardPairs: boolean[];
  imageUrls: string[];
  loading: boolean;
  cardZoom: boolean[];
  gameNum: number;
  turn: number;
  target: number;
  gameMode: string;
  boardMode: string;
  onCardClick: (i: number) => void;
  onStartButton: () => void;
  onOpenMenu: (event: React.MouseEvent) => void;
}) => {
  let cols: number = 3;
  let rows: number = 3;
  let cardArray: number[] = new Array(9).fill(null).map((_, i) => i);
  if (boardMode === "3x3") {
    cols = 3;
    rows = 3;
    cardArray = new Array(9).fill(null).map((_, i) => i);
  } else if (boardMode === "4x4") {
    cols = 4;
    rows = 4;
    cardArray = new Array(16).fill(null).map((_, i) => i);
  } else if (boardMode === "5x5") {
    cols = 5;
    rows = 5;
    cardArray = new Array(25).fill(null).map((_, i) => i);
  }
  const gridCss: CSSProperties = {
    display: "grid",
    gap: `${1 / ((cols + rows) / 2 - 1)}rem`,
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
  };

  return (
    <>
      <button
        className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded ml-auto mt-4 mb-6"
        onClick={onOpenMenu}
      >
        メニュー
      </button>

      <div style={gridCss} className={"max-w-sm w-full"}>
        {cardArray.map((num) => (
          <Card
            cardState={cardStates[num]}
            cardPair={cardPairs[num]}
            imageUrl={imageUrls[num]}
            loading={loading}
            cardZoom={cardZoom[num]}
            onClick={() => onCardClick(num)}
            key={num}
          />
        ))}
      </div>

      <StatusArea
        gameNum={gameNum}
        turn={turn}
        target={target}
        gameMode={gameMode}
      />
    </>
  );
};

const StatusArea = ({
  gameNum,
  turn,
  target,
  gameMode,
}: {
  gameNum: number;
  turn: number;
  target: number;
  gameMode: string;
}) => {
  return (
    <div className="mt-4 p-1 border-2 border-base-content border-solid rounded-lg shadow-md">
      <div className="flex justify-around">
        <Turn turn={turn} />
        <div className="flex flex-wrap content-end px-1 pb-2">
          <div className="text-2xl">/</div>
        </div>
        <Target target={target} />
        <GameMessage gameNum={gameNum} gameMode={gameMode} />
      </div>
    </div>
  );
};

const Turn = ({ turn }: { turn: number }) => {
  const digitList: number[] = [
    0x1fbf0, 0x1fbf1, 0x1fbf2, 0x1fbf3, 0x1fbf4, 0x1fbf5, 0x1fbf6, 0x1fbf7,
    0x1fbf8, 0x1fbf9,
  ];

  const higherNumber = Math.floor(turn / 10);
  const lowerNumber = turn % 10;

  return (
    <div>
      <div className="text-center">ターン</div>
      <div className="font-digit text-4xl mt-2">
        {String.fromCodePoint(digitList[higherNumber])}
        {String.fromCodePoint(digitList[lowerNumber])}
      </div>
    </div>
  );
};

const GameMessage = ({
  gameNum,
  gameMode,
}: {
  gameNum: number;
  gameMode: string;
}) => {
  const digitList: number[] = [
    0x1fbf0, 0x1fbf1, 0x1fbf2, 0x1fbf3, 0x1fbf4, 0x1fbf5, 0x1fbf6, 0x1fbf7,
    0x1fbf8, 0x1fbf9,
  ];

  const higherNumber = Math.floor(gameNum / 100);
  const middleNumber = Math.floor((gameNum % 100) / 10);
  const lowerNumber = gameNum % 10;

  let gameModeName: string = "無限モード";

  if (gameMode === "endless") {
    gameModeName = "通常モード";
  } else if (gameMode === "challenge") {
    gameModeName = "挑戦モード";
  }

  return (
    <div className="ml-2">
      <div className="text-center">{gameModeName}</div>
      <div className="font-digit text-4xl mt-2">
        {String.fromCodePoint(digitList[higherNumber])}
        {String.fromCodePoint(digitList[middleNumber])}
        {String.fromCodePoint(digitList[lowerNumber])}
        <span className="text-xs ml-2">ゲーム目</span>
      </div>
    </div>
  );
};

const Target = ({ target }: { target: number }) => {
  const digitList: number[] = [
    0x1fbf0, 0x1fbf1, 0x1fbf2, 0x1fbf3, 0x1fbf4, 0x1fbf5, 0x1fbf6, 0x1fbf7,
    0x1fbf8, 0x1fbf9,
  ];

  const higherNumber = Math.floor(target / 10);
  const lowerNumber = target % 10;

  return (
    <div>
      <div className="text-center">クリア</div>
      <div className="font-digit text-4xl mt-2">
        {String.fromCodePoint(digitList[higherNumber])}
        {String.fromCodePoint(digitList[lowerNumber])}
      </div>
    </div>
  );
};
