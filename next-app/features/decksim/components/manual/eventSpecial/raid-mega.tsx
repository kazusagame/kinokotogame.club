import Image from "next-export-optimize-images/image";
import withBasePath from "@/lib/withBasePath";

export function RaidMegaSpecialManual() {
  return (
    <section className="">
      <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
        イベント固有（たすけて！マイヒーロー メガ悪男）
      </h2>
      <Image
        src={withBasePath("/image/decksim/deckSimulator/59_raid-mega_special.png")}
        alt="イベント固有（たすけて！マイヒーロー メガ悪男）の登録画面"
        width={371}
        height={377}
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
              <td className="whitespace-nowrap">攻援力UP</td>
              <td>
                ヒーロー声援によるガールの攻援力UP合計値を指定します。上限は 100 % です。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">守備力DOWN</td>
              <td>
                ヒーロー声援によるメガ悪男の守備力DOWN合計値を指定します。上限は 50 % です。
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
