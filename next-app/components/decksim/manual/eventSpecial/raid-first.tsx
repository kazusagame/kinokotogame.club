import Image from "next-export-optimize-images/image";

export function RaidFirstSpecialManual() {
  return (
    <section className="">
      <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
        イベント固有（たすけて！マイヒーロー 前半）
      </h2>
      <Image
        src="/image/decksim/deckSimulator/51_raidwar_special.png"
        alt="イベント固有（たすけて！マイヒーロー 前半）の登録画面"
        width={604}
        height={443}
        className="mt-4 mb-2 ml-4 w-1/2"
      />
      <div className="my-2 md:pl-4">
        <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
          <tbody>
            <tr>
              <td className="whitespace-nowrap">SP応援効果</td>
              <td>
                SP応援効果の合計値を入力します。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">捕獲相手</td>
              <td>
                捕獲相手が夜行性激レアか通常の超レアかを選択します。
                夜行性激レアではハンター声援センバツが使用されるため、
                攻援力UPとダメージ声援の効果が可算されます。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">アタック種別 / アタック回数</td>
              <td>
                どのアイテムで何回アタックを行った場合の発揮値を計算するのかを選択します。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">コンボ数</td>
              <td>
                アタック時のコンボ数を選択します。
                炭酸を使用する場合はアタックの前にコンボ数に加算されます。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">攻援力UP</td>
              <td>
                夜行性激レア捕獲時の攻援力UPバフの数値を入力します。上限は 150 ％ です。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">声援ダメージ合計</td>
              <td>
                夜行性激レア捕獲時に、選択したアタック種別と回数で発揮する
                ハンター声援センバツ内の声援ダメージの合計値を入力します。
                手動で計算するのが面倒な場合は、ハンター声援センバツシミュレーターの
                ページも参考にしてみてください。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">結果を獲得ポイントで表示する</td>
              <td>
                チェックを入れると計算結果が発揮値表示から獲得ポイント表示に変わります。
                ただし、実際のゲーム中では残りのHPを上回る分はポイントになりません。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
