interface menuProps {
  onCloseClick: () => void;
  onResetButton: () => void;
  onModeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  gameMode: string;
  imageMode: string;
  boardMode: string;
}

export default function Menu(props: menuProps) {
  let gameModeVal = "0";
  if (props.gameMode === "endless") {
    gameModeVal = "0";
  } else if (props.gameMode === "challenge") {
    gameModeVal = "100";
  }

  let imageModeVal = "0";
  if (props.imageMode === "origin") {
    imageModeVal = "0";
  } else if (props.imageMode === "cat") {
    imageModeVal = "50";
  } else if (props.imageMode === "dog") {
    imageModeVal = "100";
  }

  let boardModeVal = "0";
  if (props.boardMode === "3x3") {
    boardModeVal = "0";
  } else if (props.boardMode === "4x4") {
    boardModeVal = "50";
  } else if (props.boardMode === "5x5") {
    boardModeVal = "100";
  }

  return (
    <div
      className="fixed inset-0 flex flex-col justify-center items-center bg-gray-500 bg-opacity-50"
      onClick={props.onCloseClick}
    >
      <div
        className="max-w-sm w-2/3 h-auto rounded bg-base-100 flex flex-col"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          className="block bg-red-500 hover:bg-red-700 text-white font-bold px-2.5 py-1 border border-red-700 rounded ml-auto mr-3 mt-3 mb-2"
          onClick={props.onCloseClick}
        >
          ×
        </button>

        <div className="flex flex-col justify-center my-3">
          <label
            htmlFor="gameMode"
            className="ml-4 before:inline-block before:bg-red-500 before:w-3 before:h-3 before:mr-1.5"
          >
            ゲームモード
          </label>
          <input
            type="range"
            id="gameMode"
            name="gameMode"
            min="0"
            max="100"
            defaultValue={gameModeVal}
            step="100"
            onChange={props.onModeChange}
            list="gameModeValues"
            className="w-3/4 mx-auto mt-2"
          />

          <datalist id="gameModeValues">
            <option value="0"></option>
            <option value="100"></option>
          </datalist>

          <ul
            className="flex justify-between w-4/5 mx-auto mt-1 px-1"
          >
            <li>通常</li>
            <li>挑戦</li>
          </ul>
        </div>

        <div className="flex flex-col justify-center my-3">
          <label
            htmlFor="imageMode"
            className="ml-4 before:inline-block before:bg-red-500 before:w-3 before:h-3 before:mr-1.5"
          >
            絵柄
          </label>
          <input
            type="range"
            id="imageMode"
            name="imageMode"
            min="0"
            max="100"
            defaultValue={imageModeVal}
            step="50"
            onChange={props.onModeChange}
            list="imageModeValues"
            className="w-3/4 mx-auto mt-2"
          />

          <datalist id="imageModeValues">
            <option value="0"></option>
            <option value="50"></option>
            <option value="100"></option>
          </datalist>

          <ul
            className="flex justify-between w-4/5 mx-auto mt-1 px-1"
          >
            <li>素</li>
            <li>猫</li>
            <li>犬</li>
          </ul>
        </div>

        <div className="flex flex-col justify-center my-3">
          <label
            htmlFor="boardMode"
            className="ml-4 before:inline-block before:bg-red-500 before:w-3 before:h-3 before:mr-1.5"
          >
            ボードサイズ
          </label>
          <input
            type="range"
            id="boardMode"
            name="boardMode"
            min="0"
            max="100"
            defaultValue={boardModeVal}
            step="50"
            onChange={props.onModeChange}
            list="boardModeValues"
            className="w-3/4 mx-auto mt-2"
          />

          <datalist id="boardModeValues">
            <option value="0"></option>
            <option value="50"></option>
            <option value="100"></option>
          </datalist>

          <ul
            className="flex justify-between w-4/5 mx-auto mt-1 px-1"
          >
            <li>３</li>
            <li>４</li>
            <li>５</li>
          </ul>
        </div>

        <button
          className="block bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 border border-blue-700 rounded ml-auto mr-auto mt-6 mb-6"
          onClick={props.onResetButton}
        >
          ゲーム初期化
        </button>
      </div>
    </div>
  );
}
