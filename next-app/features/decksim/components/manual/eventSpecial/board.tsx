import Image from "next-export-optimize-images/image";

export function BoardSpecialManual() {
  return (
    <section className="">
      <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
        イベント固有（散策♪聖櫻ワールド）
      </h2>
      <Image
        src="/image/decksim/deckSimulator/54_board_special_1.png"
        alt="イベント固有（散策♪聖櫻ワールド）の登録画面 その1"
        width={504}
        height={395}
        className="mt-4 mb-2 ml-4 w-1/2"
      />
      <div className="my-2 md:pl-4">
        <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
          <tbody>
            <tr>
              <td className="whitespace-nowrap">SP応援効果</td>
              <td>SP応援効果の合計値を入力します。</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">現在の天気</td>
              <td>
                聖櫻ワールド内での現在の天気を選択します。
                <br />
                選択された天気に応じて下の表中にその天気が持つ効果名や、効果の数値、
                センバツの設定に基づいて計算された実際の効果期待値が表示されます。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Image
        src="/image/decksim/deckSimulator/55_board_special_2.png"
        alt="イベント固有（散策♪聖櫻ワールド）の登録画面 その2"
        width={488}
        height={744}
        className="mt-4 mb-2 ml-4 w-1/2"
      />
      <div className="my-2 md:pl-4">
        <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
          マス効果の一覧が表形式で表示されています。
          <br />
          現在のマス効果に合わせて数値欄を設定すると、センバツの設定に基づいて
          計算された実際の効果期待値が表示されます。
        </p>
      </div>
      <Image
        src="/image/decksim/deckSimulator/56_board_special_3.png"
        alt="イベント固有（散策♪聖櫻ワールド）の登録画面 その3"
        width={433}
        height={509}
        className="mt-4 mb-2 ml-4 w-1/2"
      />
      <div className="my-2 md:pl-4">
        <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
          <tbody>
            <tr>
              <td className="whitespace-nowrap">合計ボーナス効果</td>
              <td>
                天気効果とマス効果を合算した♡1あたりのボーナス効果を自動で表示します。
                <br />
                ゲーム中で実際にアタックを行った際に表示されるボーナス効果の数値が
                この範囲に入っていればこのシミュレーターは機能しています。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">マス効果を一覧から取得</td>
              <td>
                こちらはマス効果の数値を手動で入力する手間を省くための機能です。
                ただし、まだテスト前のため期待した動作にならないかもしれません。
                <br />
                ゲーム中のステージ効果 → マス効果で表示されているマス効果の一覧を
                コピーして貼り付けます。その次に取得ボタンを押すと解析が行われて、
                上のマス効果の表に各効果値が自動で入力された状態になります。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
