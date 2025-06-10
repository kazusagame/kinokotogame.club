import Image from "next-export-optimize-images/image";

export function RaidSecondSpecialManual() {
  return (
    <section className="">
      <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
        イベント固有（たすけて！マイヒーロー 後半）
      </h2>
      <Image
        src="/image/decksim/deckSimulator/58_raid-first-second_special.png"
        alt="イベント固有（たすけて！マイヒーロー 後半）の登録画面"
        width={373}
        height={376}
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
              <td className="whitespace-nowrap">悪男のタイプ</td>
              <td>
                悪男のタイプを選択します。
                選択した悪男のタイプに応じて各タイプのガールに有利/不利タイプ補正が加算されます。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">アタック種別</td>
              <td>
                どのアイテムでアタックを行った場合の発揮値を計算するのかを選択します。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">コンボ数</td>
              <td>
                アタック時のコンボ数を選択します。コンボ数に応じて発揮値にボーナスが加算されます。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">結果を獲得ポイントで表示する</td>
              <td>
                チェックを入れると計算結果が発揮値表示から獲得ポイント表示に変わります。
                ただし、実際のゲーム中では残りのHPを上回る分はポイントになりません。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">部員お助け</td>
              <td>
                部員がお助け依頼した超レアを相手として想定する場合はチェックを入れます。
                獲得ポイントにプラスの補正が入ります。
                「結果を獲得ポイントで表示する」にチェックを入れた場合のみ有効になります。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
