interface gameOverProps {
  onResetButton: () => void;
  gameNum: number;
}

export default function GameOver(props: gameOverProps) {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-500 bg-opacity-50">
      <div
        className="max-w-sm w-2/3 h-auto rounded bg-base-100 flex flex-col justify-center items-center"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="flex flex-col justify-center mt-4">
          <div>ゲーム終了！</div>
          <div>
            連続クリア回数は{" "}
            <span className="text-2xl text-red-700">{props.gameNum - 1}</span>{" "}
            でした！
          </div>
        </div>
        <button
          className="block bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 border border-blue-700 rounded ml-auto mr-auto mt-4 mb-3"
          onClick={props.onResetButton}
        >
          リトライ
        </button>
      </div>
    </div>
  );
}
