import Image from "next-export-optimize-images/image";
import withBasePath from "@/lib/withBasePath";

export function ClubcupSpecialManual() {
  return (
    <section className="">
      <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
        イベント固有（部活対抗！勧誘★グランプリ）
      </h2>
      <Image
        src={withBasePath("/image/decksim/deckSimulator/52_clubcup_special.png")}
        alt="イベント固有（部活対抗！勧誘★グランプリ）の登録画面"
        width={518}
        height={489}
        className="mt-4 mb-2 ml-4 w-1/2"
      />
      <div className="my-2 md:pl-4">
        <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
          <tbody>
            <tr>
              <td className="whitespace-nowrap">攻援力UP</td>
              <td>
                コンボや、マイク、部長の喝の効果による攻援力UPボーナスの数値を入力します。
                上限は 50 ％ です。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">勝利後ボーナス</td>
              <td>
                誰かとのバトル勝利後に10分間、発生する攻援力ボーナス（10%）を加算する場合はチェックを入れます。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">結果を獲得ポイントで表示する</td>
              <td>
                チェックを入れると計算結果が発揮値表示から獲得ポイント表示に変わります。
                以降の選択は獲得ポイント表示のときにだけ使用されます。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">勧誘ptUP</td>
              <td>
                コンボや、看板、部長の喝、ハッスルの効果による勧誘ptUPボーナスの数値を入力します。
                上限は 200 ％ です。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">炭酸本数</td>
              <td>
                1本での全力勧誘か3本での全力勧誘×3かを選択します。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">SP応援効果</td>
              <td>
                SP応援効果の合計値について割合部分と固定値部分をそれぞれ入力します。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">対戦相手が部長or副部長</td>
              <td>
                対戦相手に部長もしくは副部長を想定する場合はチェックを入れます。
                獲得ptに少しだけボーナスが入ります。
                プレイヤー自身の役職を選択したい場合は、その他タブにある
                【プレイヤーデータ・部活データ】から変更してください。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">対戦相手の声援効果 Down率</td>
              <td>
                対戦相手の声援効果 Down率を入力します。数値が大きいほど獲得ptが下がります。
                何か想定したいDown率がある場合は入力してください。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
