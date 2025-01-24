export interface HistoryFormat {
  board3x3: { total: number; historyArray: number[] };
  board4x4: { total: number; historyArray: number[] };
  board5x5: { total: number; historyArray: number[] };
}

interface HistoryProps {
  history: HistoryFormat;
}

export default function History(props: HistoryProps) {
  return (
    <div className="flex flex-col justify-center items-center max-w-sm w-full mt-4 px-2 border-2 border-base-content border-solid rounded-lg shadow-md mb-4 md:mt-20">
      <h1 className="mt-1">ゲーム履歴</h1>
      <div className="w-full mx-2 mt-2 mb-4 px-2">
        <div className="w-full bg-blue-500 text-white rounded-lg flex flex-row justify-around">
          <div>ボードサイズ 3 x 3</div>
          <div>総クリア回数： {props.history.board3x3.total}</div>
        </div>
        <div className="flex justify-center mt-2">
          <table>
            <thead>
              <tr>
                <th className="px-4">ターン数</th>
                <th className="px-4">クリア回数</th>
                <th className="px-4">割合</th>
              </tr>
            </thead>
            <tbody className="text-right p-1">
              {props.history.board3x3.historyArray.map((e, i) =>
                e !== 0 ? (
                  <tr
                    key={`3x3-${i + 1}`}
                    className="odd:bg-base-100 even:bg-base-200"
                  >
                    <td className="border border-base-content border-solid px-4">
                      {i + 1}
                    </td>
                    <td className="border border-base-content border-solid px-4">
                      {e}
                    </td>
                    <td className="border border-base-content border-solid px-4">
                      {(
                        Math.round((e / props.history.board3x3.total) * 10000) /
                        100
                      ).toFixed(2)}{" "}
                      %
                    </td>
                  </tr>
                ) : (
                  ""
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full mx-2 mt-2 mb-4 px-2">
        <div className="w-full bg-blue-500 text-white rounded-lg flex flex-row justify-around">
          <div>ボードサイズ 4 x 4</div>
          <div>総クリア回数： {props.history.board4x4.total}</div>
        </div>
        <div className="flex justify-center mt-2">
          <table>
            <thead>
              <tr>
                <th className="px-4">ターン数</th>
                <th className="px-4">クリア回数</th>
                <th className="px-4">割合</th>
              </tr>
            </thead>
            <tbody className="text-right p-1">
              {props.history.board4x4.historyArray.map((e, i) =>
                e !== 0 ? (
                  <tr
                    key={`4x4-${i + 1}`}
                    className="odd:bg-base-100 even:bg-base-200"
                  >
                    <td className="border border-base-content border-solid px-4">
                      {i + 1}
                    </td>
                    <td className="border border-base-content border-solid px-4">
                      {e}
                    </td>
                    <td className="border border-base-content border-solid px-4">
                      {(
                        Math.round((e / props.history.board4x4.total) * 10000) /
                        100
                      ).toFixed(2)}{" "}
                      %
                    </td>
                  </tr>
                ) : (
                  ""
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full mx-2 mt-2 mb-4 px-2">
        <div className="w-full bg-blue-500 text-white rounded-lg flex flex-row justify-around">
          <div>ボードサイズ 5 x 5</div>
          <div>総クリア回数： {props.history.board5x5.total}</div>
        </div>
        <div className="flex justify-center mt-2">
          <table>
            <thead>
              <tr>
                <th className="px-4">ターン数</th>
                <th className="px-4">クリア回数</th>
                <th className="px-4">割合</th>
              </tr>
            </thead>
            <tbody className="text-right p-1">
              {props.history.board5x5.historyArray.map((e, i) =>
                e !== 0 ? (
                  <tr
                    key={`5x5-${i + 1}`}
                    className="odd:bg-base-100 even:bg-base-200"
                  >
                    <td className="border border-base-content border-solid px-4">
                      {i + 1}
                    </td>
                    <td className="border border-base-content border-solid px-4">
                      {e}
                    </td>
                    <td className="border border-base-content border-solid px-4">
                      {(
                        Math.round((e / props.history.board5x5.total) * 10000) /
                        100
                      ).toFixed(2)}{" "}
                      %
                    </td>
                  </tr>
                ) : (
                  ""
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
