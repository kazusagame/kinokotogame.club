import type { Metadata } from "next";
import Link from "next/link";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleFooter from "@/components/ArticleFooter";
import MenuGrid from "@/components/MenuGrid";
import MenuCard, { MenuCardProps } from "@/components/MenuCard";

export const metadata: Metadata = {
  title: "センバツシミュレーター - きのことゲーム部",
  description:
    "ガールフレンド(仮)のセンバツシミュレーターWeb版です。ガールの応援力などを入力していくことで発揮値や獲得ポイントの予想値を算出します。",
};

export default function Page() {
  const eventMenuList: MenuCardProps[] = [
    {
      id: 1,
      title: ["たすけて！", "マイヒーロー", "前半"],
      path: "/decksim_v1/raid-first/index.html",
      img: "/image/menu/18_decksim_common.png",
      width: 640,
      height: 460,
      imgAlt: "たすけて！マイヒーロー 前半へのリンク",
    },
    {
      id: 2,
      title: ["たすけて！", "マイヒーロー", "後半攻援"],
      path: "/decksim_v1/raid-second-attack/index.html",
      img: "/image/menu/18_decksim_common.png",
      width: 640,
      height: 460,
      imgAlt: "たすけて！マイヒーロー 後半 攻援へのリンク",
    },
    {
      id: 3,
      title: ["たすけて！", "マイヒーロー", "後半守援"],
      path: "/decksim_v1/raid-second-defence/index.html",
      img: "/image/menu/18_decksim_common.png",
      width: 640,
      height: 460,
      imgAlt: "たすけて！マイヒーロー 後半 守援へのリンク",
    },
    {
      id: 4,
      title: ["たすけて！", "マイヒーロー", "メガ悪男"],
      path: "/decksim_v1/raid-mega/index.html",
      img: "/image/menu/18_decksim_common.png",
      width: 640,
      height: 460,
      imgAlt: "たすけて！マイヒーロー メガ悪男へのリンク",
    },
    {
      id: 5,
      title: ["おねがい★", "ハンターズ"],
      path: "/decksim_v1/raidwar/index.html",
      img: "/image/menu/18_decksim_common.png",
      width: 640,
      height: 460,
      imgAlt: "おねがい★ハンターズへのリンク",
    },
    {
      id: 6,
      title: ["おねがい★", "ハンターズ", "ハンター声援"],
      path: "./raidwar-skill/",
      img: "/image/menu/17_decksim_raidwar-skill.png",
      width: 640,
      height: 460,
      imgAlt: "おねがい★ハンターズ ハンター声援へのリンク",
    },
    {
      id: 7,
      title: ["部活対抗！", "勧誘★", "グランプリ"],
      path: "/decksim_v1/clubcup/index.html",
      img: "/image/menu/18_decksim_common.png",
      width: 640,
      height: 460,
      imgAlt: "部活対抗！勧誘★グランプリへのリンク",
    },
    {
      id: 8,
      title: ["聖櫻学園★", "カリスマ決定戦", "攻援"],
      path: "/decksim_v1/championship/index.html",
      img: "/image/menu/18_decksim_common.png",
      width: 640,
      height: 460,
      imgAlt: "聖櫻学園★カリスマ決定戦 攻援へのリンク",
    },
    {
      id: 9,
      title: ["聖櫻学園★", "カリスマ決定戦", "守援"],
      path: "/decksim_v1/championship-defence/index.html",
      img: "/image/menu/18_decksim_common.png",
      width: 640,
      height: 460,
      imgAlt: "聖櫻学園★カリスマ決定戦 守援へのリンク",
    },
    {
      id: 10,
      title: ["聖櫻学園", "メモリアル", "ストーリー"],
      path: "/decksim_v1/tower/index.html",
      img: "/image/menu/18_decksim_common.png",
      width: 640,
      height: 460,
      imgAlt: "聖櫻学園メモリアルストーリーへのリンク",
    },
    {
      id: 11,
      title: ["全国高校生", "課外活動", "コンテスト"],
      path: "/decksim_v1/divrace/index.html",
      img: "/image/menu/18_decksim_common.png",
      width: 640,
      height: 460,
      imgAlt: "全国高校生課外活動コンテストへのリンク",
    },
    {
      id: 12,
      title: ["課外活動", "コンテスト本選", "ステージシミュ"],
      path: "./divrace-stage/",
      img: "/image/menu/18_decksim_common.png",
      width: 640,
      height: 460,
      imgAlt: "全国高校生課外活動コンテスト本選 ステージシミュへのリンク",
    },
    {
      id: 13,
      title: ["散策♪", "聖櫻ワールド"],
      path: "/decksim_v1/board/index.html",
      img: "/image/menu/18_decksim_common.png",
      width: 640,
      height: 460,
      imgAlt: "散策♪聖櫻ワールドへのリンク",
    },
    {
      id: 14,
      title: ["通常バトル"],
      path: "/decksim_v1/normal-battle/index.html",
      img: "/image/menu/18_decksim_common.png",
      width: 640,
      height: 460,
      imgAlt: "通常バトルへのリンク",
    },
  ];

  const manualMenuList: MenuCardProps[] = [
    {
      id: 1,
      title: ["使用方法"],
      path: "./about/",
      img: "/image/menu/99_blank.png",
      width: 640,
      height: 460,
      imgAlt: "使用方法へのリンク",
    },
    {
      id: 2,
      title: ["設定値"],
      path: "./parameters/",
      img: "/image/menu/99_blank.png",
      width: 640,
      height: 460,
      imgAlt: "設定値へのリンク",
    },
    {
      id: 3,
      title: ["計算式"],
      path: "./formula/",
      img: "/image/menu/99_blank.png",
      width: 640,
      height: 460,
      imgAlt: "計算式へのリンク",
    },
  ];

  return (
    <>
      <div className="container mx-auto mb-6 px-2 md:px-6 lg:max-w-screen-lg">
        <ArticleHeader />
        <h1 className="text-2xl/relaxed my-4 flex flex-col">
          <span>ガールフレンド(仮)</span>
          <span>センバツシミュレーターWeb版</span>
        </h1>

        <h2 className="text-xl mt-6 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
          イベントごとのシミュレーター
        </h2>
        <p className="text-sm pl-2 md:pl-4 my-4 text-red-700 underline">
          ※ 7月上旬 に リンク先をリニューアル版に差し替えます。
          現行のバージョンも引き続きご使用いただけます。
        </p>
        <MenuGrid>
          {eventMenuList.map((menuCard) => {
            return <MenuCard key={menuCard.id} {...menuCard} />;
          })}
        </MenuGrid>

        <h2 className="text-xl mt-6 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
          使用方法など
        </h2>
        <MenuGrid>
          {manualMenuList.map((menuCard) => {
            return <MenuCard key={menuCard.id} {...menuCard} />;
          })}
        </MenuGrid>
      </div>

      <div className="container mx-auto mb-6 px-2 md:px-6 lg:max-w-screen-lg">
        <h2 className="text-2xl mt-4">お知らせ</h2>
        <div className="my-4 md:pl-4 max-w-screen-sm">
          <h2 className="text-xl mt-6 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            動作テスト中のリニューアル版について
          </h2>
          <div className="space-y-4 leading-7">
            <div className="space-y-2">
              <p className="md:pl-4">
                <Link href="/decksim_v2/raid-first/" className="link">
                  たすけて！マイヒーロー 前半
                </Link>
              </p>
              <p className="md:pl-4">
                <Link href="/decksim_v2/raid-second/" className="link">
                  たすけて！マイヒーロー 後半
                </Link>
              </p>
              <p className="md:pl-4">
                <Link href="/decksim_v2/raid-mega/" className="link">
                  たすけて！マイヒーロー メガ悪男
                </Link>
              </p>
              <p className="md:pl-4">
                <Link href="/decksim_v2/raidwar/" className="link">
                  おねがい★ハンターズ
                </Link>
              </p>
              <p className="md:pl-4">
                <Link href="/decksim_v2/clubcup/" className="link">
                  部活対抗！勧誘★グランプリ
                </Link>
              </p>
              <p className="md:pl-4">
                <Link href="/decksim_v2/championship/" className="link">
                  聖櫻学園★カリスマ決定戦 攻援
                </Link>
              </p>
              <p className="md:pl-4">
                <Link href="/decksim_v2/championship-defense/" className="link">
                  聖櫻学園★カリスマ決定戦 守援
                </Link>
              </p>
              <p className="md:pl-4">
                <Link href="/decksim_v2/tower/" className="link">
                  聖櫻学園メモリアルストーリー
                </Link>
              </p>
              <p className="md:pl-4">
                <Link href="/decksim_v2/divrace/" className="link">
                  全国高校生課外活動コンテスト
                </Link>
              </p>
              <p className="md:pl-4">
                <Link href="/decksim_v2/board/" className="link">
                  散策♪聖櫻ワールド
                </Link>
              </p>
              <p className="md:pl-4">
                <Link href="/decksim_v2/normal-battle/" className="link">
                  通常バトル
                </Link>
              </p>
            </div>
            <p className="md:px-4">
              上記は現在、動作テスト中のリニューアル版シミュレーターへのリンクです。
              <br />
              動作確認が完了したタイミングで現行バージョンからこちらに切り替わります。
              順調にいけば 7月上旬 にリンクなどの差し替えを行う予定です。
              <br />
              その際に現行バージョンへのリンクも残しますので、もしリニューアル版が
              好みに合わなければ現行バージョンを引き続きご利用ください。
            </p>
            <p className="md:px-4">
              新旧でデータの互換性はありません。
              テスト中のリニューアル版で保存したデータは現行バージョンでは存在していない扱いになります。
            </p>
            <p className="md:px-4">
              URフレンドぷちガールちゃん周りの設定はすべて暫定値が入っています。信用しないでください。
            </p>
            <p className="md:px-4">
              基本的な作りは同じですが、使い勝手が若干変わっている部分があります。
            </p>
            <ul className="md:px-4 space-y-4">
              <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                プレイヤーのタイプや部活役職、メンズコロンLvなどのプレイヤーデータが共通設定となり、1つのページでの変更がすべてのページに反映されるようになりました。
                <br />
                今までは役職が変わったりメンズコロンのLvが上がるたびに各々のページで変更が必要だったのですが、この手間が省けるようになります。
                <br />
                ただし、この変更により複数のアカウントのデータを1つのブラウザで保管するのは難しくなりますので、アカウントごとにブラウザを変えたりブラウザのプロフィール機能を使用するなどでデータの分割をお願いします。
              </li>
              <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                声援の設定において、旧バージョンのシミュレーターにあった昔のURシーンの声援変更機能の回数(+1～+5)を入力する欄は、そろそろ使用されている方も少なそうかなと思い今回除外しています。
                <br />
                +1につき声援Lv1つ分の効果になるため、もし該当するシーンを設定したい場合は声援Lvに上乗せして入力することで代用してください。
                <br />
                （例：声援Lv18の「SWEETの主ｾﾝﾊﾞﾂ全員&副ｾﾝﾊﾞﾂ1人の攻守特大UP+4」を設定したい場合は、声援Lv18
                + 4 の 声援Lv22として登録する。）
              </li>
              <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                「[成果発表会]心実&エミ」などのEx進展ガール数を効果条件に持つプレシャスシーンについて、カウント人数が自動算出になりました。「特定のガール」や「様々なガール」の効果については引き続き手動での入力が必要です。
              </li>
              <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                ぷちセンバツの設定において学年条件の応援力効果を選択肢に追加しました。
              </li>
              <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                たすけて！マイヒーロー
                後半用のセンバツは1つのページ内で攻援センバツと守援センバツの両方を設定する形式に変わりました。
              </li>
            </ul>
          </div>

          <h2 className="text-xl mt-6 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            旧版のシミュレーターへのリンク
          </h2>
          <div className="space-y-4 leading-7">
            <div className="space-y-2">
              {/* <p className="md:pl-4">
                <Link href="/decksim_v1/raid-first/index.html" className="link">
                  たすけて！マイヒーロー 前半
                </Link>
              </p>
              <p className="md:pl-4">
                <Link
                  href="/decksim_v1/raid-second-attack/index.html"
                  className="link"
                >
                  たすけて！マイヒーロー 後半 攻援
                </Link>
              </p>
              <p className="md:pl-4">
                <Link
                  href="/decksim_v1/raid-second-defence/index.html"
                  className="link"
                >
                  たすけて！マイヒーロー 後半 守援
                </Link>
              </p>
              <p className="md:pl-4">
                <Link href="/decksim_v1/raid-mega/index.html" className="link">
                  たすけて！マイヒーロー メガ悪男
                </Link>
              </p>
              <p className="md:pl-4">
                <Link href="/decksim_v1/raidwar/index.html" className="link">
                  おねがい★ハンターズ
                </Link>
              </p> */}
              <p className="md:pl-4">
                <Link
                  href="/decksim_v1/raidwar-skill/index.html"
                  className="link"
                >
                  おねがい★ハンターズ ハンター声援センバツ
                </Link>
              </p>
              {/* <p className="md:pl-4">
                <Link href="/decksim_v1/clubcup/index.html" className="link">
                  部活対抗！勧誘★グランプリ
                </Link>
              </p>
              <p className="md:pl-4">
                <Link
                  href="/decksim_v1/championship/index.html"
                  className="link"
                >
                  聖櫻学園★カリスマ決定戦 攻援
                </Link>
              </p>
              <p className="md:pl-4">
                <Link
                  href="/decksim_v1/championship-defence/index.html"
                  className="link"
                >
                  聖櫻学園★カリスマ決定戦 守援
                </Link>
              </p>
              <p className="md:pl-4">
                <Link href="/decksim_v1/tower/index.html" className="link">
                  聖櫻学園メモリアルストーリー
                </Link>
              </p>
              <p className="md:pl-4">
                <Link href="/decksim_v1/divrace/index.html" className="link">
                  全国高校生課外活動コンテスト
                </Link>
              </p>
              <p className="md:pl-4">
                <Link href="/decksim_v1/board/index.html" className="link">
                  散策♪聖櫻ワールド
                </Link>
              </p>
              <p className="md:pl-4">
                <Link
                  href="/decksim_v1/normal-battle/index.html"
                  className="link"
                >
                  通常バトル
                </Link>
              </p> */}
            </div>
            <p className="md:px-4">
              2024年の年末から少しずつサイトのリニューアルを行っております。
              <br />
              使い慣れた方を使い続けたい人もおられるかと思いますので、
              こちらに旧版へのリンクを設置しています。
            </p>
            <p className="md:px-4">
              旧版はデータ更新やバグ修正を終了しておりますのでご了承ください。
              <br />
              また、新旧でデータの互換性はありません。
              旧版で保存したデータは新しいシミュレーターでは存在していない扱いになります。
            </p>
          </div>

          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            情報募集中
          </h2>
          <div className="leading-7">
            <p className="md:px-4">
              下記のプレシャスシーンについて、情報を提供していただける方がおられましたら↓までお寄せいただけたら嬉しいです。
              <br />
              いただいた情報はシミュレーターのデータとして使わせていただきます。
            </p>
            <p className="md:pl-4">
              <Link
                href="https://twitter.com/kazusagame/"
                target="_blank"
                rel="noreferrer"
                className="mr-4 link"
              >
                Twitter@kazusagame
              </Link>
              もしくは
              <Link
                href="https://vcard.ameba.jp/profile?userId=3172893"
                target="_blank"
                rel="noreferrer"
                className="ml-4 link"
              >
                ゲーム内Id=3172893
              </Link>
            </p>
            <div className="mt-2 md:pl-4">
              <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                <span>
                  [よそ見注意]朝比奈桃子 (SWEETガールの声援Lvが高いほど攻守UP)
                </span>
              </p>
              <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                <span>
                  [きみが一番]相楽エミ (POPガールの声援Lvが高いほど攻守UP)
                </span>
              </p>
              <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                <span>
                  [幸せの共有]月隈林子 (COOLガールの声援Lvが高いほど攻守UP)
                </span>
              </p>
              <span>
                → いくつかのパターンでの実際の効果値。★4の時の最大効果値。
              </span>
            </div>
          </div>
        </div>
      </div>
      <ArticleFooter />
    </>
  );
}
