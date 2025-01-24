import type { Metadata } from "next";
import ArticleHeader from "@/components/common/ArticleHeader";
import ArticleFooter from "@/components/common/ArticleFooter";
import MenuGrid from "@/components/common/MenuGrid";
import MenuCard, { MenuCardProps } from "@/components/common/MenuCard";

export const metadata: Metadata = {
  title: "アーカイブス - きのことゲーム部",
  description: "ガールフレンド(仮)の記録などを保管しているページです。",
};

export default function Page() {
  const miniGamesMenuList: MenuCardProps[] = [
    {
      id: 1,
      title: ["キャラソート"],
      path: "./gfsort/",
      img: "/image/menu/51_gfsort.png",
      width: 640,
      height: 460,
      imgAlt: "キャラソートへのリンク",
    },
    {
      id: 2,
      title: ["キャラ名", "タイピング", "（外部サイト）"],
      path: "https://ankey.io/wordbooks/chpg0pa23akg02q3e0ng/",
      img: "/image/menu/52_gftyping.png",
      width: 640,
      height: 460,
      imgAlt: "キャラ名タイピングへのリンク",
      isNewTab: true,
      isNoReferrer: true,
    },
    {
      id: 3,
      title: ["ぷち合わせ", "モドキ"],
      path: "./petit-matching/",
      img: "/image/menu/33_petit-matching.png",
      width: 640,
      height: 460,
      imgAlt: "ぷち合わせモドキへのリンク",
    },
  ];

  const episodeMenuList: MenuCardProps[] = [
    {
      id: 1,
      title: ["ガール名", "エピソード", "検索"],
      path: "./episode-search/",
      img: "/image/menu/35_episode.png",
      width: 640,
      height: 460,
      imgAlt: "ガール名エピソード検索へのリンク",
    },
    {
      id: 2,
      title: ["聖櫻エリア"],
      path: "./seio-area/",
      img: "/image/menu/31_seio-area.png",
      width: 640,
      height: 460,
      imgAlt: "聖櫻エリアへのリンク",
    },
    {
      id: 3,
      title: ["聖櫻ストーリー"],
      path: "./seio-story/",
      img: "/image/menu/34_seio-story.png",
      width: 640,
      height: 460,
      imgAlt: "聖櫻ストーリーへのリンク",
    },
    {
      id: 4,
      title: ["たすけて！", "マイヒーロー", "エピソード"],
      path: "./raid-episode/",
      img: "/image/menu/35_episode.png",
      width: 640,
      height: 460,
      imgAlt: "たすけて！マイヒーローエピソードへのリンク",
    },
    {
      id: 5,
      title: ["聖櫻学園物語", "エピソード"],
      path: "./story-episode/",
      img: "/image/menu/35_episode.png",
      width: 640,
      height: 460,
      imgAlt: "聖櫻学園物語エピソードへのリンク",
    },
    {
      id: 6,
      title: ["2人だけの", "ストーリー"],
      path: "./romance/",
      img: "/image/menu/35_episode.png",
      width: 640,
      height: 460,
      imgAlt: "2人だけのストーリーへのリンク",
    },
    {
      id: 7,
      title: ["聖櫻学園劇場"],
      path: "./theater/",
      img: "/image/menu/35_episode.png",
      width: 640,
      height: 460,
      imgAlt: "聖櫻学園劇場へのリンク",
    },
    {
      id: 8,
      title: ["その他", "エピソード"],
      path: "./episode-etc/",
      img: "/image/menu/35_episode.png",
      width: 640,
      height: 460,
      imgAlt: "その他エピソードへのリンク",
    },
  ];

  const eventMenuList: MenuCardProps[] = [
    {
      id: 1,
      title: ["全国高校生", "課外活動", "コンテスト"],
      path: "./divrace/",
      img: "/image/menu/32_divrace.png",
      width: 640,
      height: 460,
      imgAlt: "全国高校生課外活動コンテストへのリンク",
    },
    {
      id: 2,
      title: ["散策♪", "聖櫻ワールド"],
      path: "./board/",
      img: "/image/menu/32_divrace.png",
      width: 640,
      height: 460,
      imgAlt: "散策♪聖櫻ワールドへのリンク",
    },
  ];

  return (
    <>
      <div className="container mx-auto mb-6 px-2 md:px-6 lg:max-w-screen-lg">
        <ArticleHeader />
        <h1 className="text-2xl my-4">ガールフレンド(仮) 諸々</h1>

        <h2 className="text-xl mt-6 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
          ミニゲーム
        </h2>
        <MenuGrid>
          {miniGamesMenuList.map((menuCard) => {
            return <MenuCard key={menuCard.id} {...menuCard} />;
          })}
        </MenuGrid>

        <h2 className="text-xl mt-6 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
          エピソード集
        </h2>
        <MenuGrid>
          {episodeMenuList.map((menuCard) => {
            return <MenuCard key={menuCard.id} {...menuCard} />;
          })}
        </MenuGrid>

        <h2 className="text-xl mt-6 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
          過去のイベント情報
        </h2>
        <MenuGrid>
          {eventMenuList.map((menuCard) => {
            return <MenuCard key={menuCard.id} {...menuCard} />;
          })}
        </MenuGrid>
      </div>
      <ArticleFooter />
    </>
  );
}
