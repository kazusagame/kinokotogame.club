import Image from "next-export-optimize-images/image";
import withBasePath from "@/lib/withBasePath";

export function ChampionshipSpecialManual() {
  return (
    <section className="">
      <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
        イベント固有（聖櫻学園★カリスマ決定戦 攻援）
      </h2>
      <Image
        src={withBasePath("/image/decksim/deckSimulator/53_championship_special.png")}
        alt="イベント固有（聖櫻学園★カリスマ決定戦 攻援）の登録画面"
        width={423}
        height={383}
        className="mt-4 mb-2 ml-4 w-1/2"
      />
      <div className="my-2 md:pl-4">
        <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
          <tbody>
            <tr>
              <td className="whitespace-nowrap">アピール種別</td>
              <td>
                他のプレイヤーとのアピール対決か、ガールが相手のアピールタイムかを選択します。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">ハート数</td>
              <td>
                アタック数に使用するハート数を選択します。アピール対決かアピールタイムかでダメージ倍率が異なります。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">テンションゲージMAX中</td>
              <td>
                テンションゲージMAXの10分間、攻援力+100%効果の発揮中はチェックを入れます。
                アピール種別がアピールタイムの場合のみ効果があります。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">ターン数</td>
              <td>
                アピールタイム中のターン数を選択します。
                基本は最大ターン数である5のままで大丈夫ですが、ハート数が少な目の場合は
                5ターン目まで主センバツの体力が持たずに火力が維持できない場合があります。
              </td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">SP応援効果（攻援）</td>
              <td>
                SP応援効果の攻援の合計値を入力します。
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
