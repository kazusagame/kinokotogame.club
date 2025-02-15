import type { Metadata } from "next";
import Link from "next/link";
import ArticleHeader from "@/components/common/ArticleHeader";
import ArticleFooter from "@/components/common/ArticleFooter";
import MenuGrid from "@/components/common/MenuGrid";
import MenuCard, { MenuCardProps } from "@/components/common/MenuCard";

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
        <h1 className="text-2xl mt-4">お知らせ</h1>
        <div className="my-4 md:pl-4 max-w-screen-sm">
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
              <span>
                → いくつかのパターンでの実際の効果値。★4の時の最大効果値。
              </span>
            </div>
          </div>

          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            旧版のシミュレーターへのリンク
          </h2>
          <div className="leading-7">
            <p className="md:pl-4">
              <Link
                href="/decksim_v1/raidwar-skill/index.html"
                className="link"
              >
                おねがい★ハンターズ ハンター声援センバツ
              </Link>
            </p>
            <p className="md:px-4 mt-4">
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
        </div>
      </div>
      <ArticleFooter />
    </>
  );
}
