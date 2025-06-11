import type { Metadata } from "next";
import TopHeader from "@/components/TopHeader";
import ArticleFooter from "@/components/ArticleFooter";
import MenuGrid from "@/components/MenuGrid";
import MenuCard, { MenuCardProps } from "@/components/MenuCard";

export const metadata: Metadata = {
  title: "きのことゲーム部",
  description:
    "ガールフレンド(仮)の非公認ファンサイトです。センバツシミュレーターなど。",
};

export default function Page() {
  const menuList: MenuCardProps[] = [
    {
      id: 1,
      title: ["センバツ", "シミュレーター"],
      path: "/decksim/",
      img: "/image/menu/18_decksim_common.png",
      width: 640,
      height: 460,
      imgAlt: "センバツシミュレーターへのリンク",
    },
    {
      id: 2,
      title: ["アーカイブス"],
      path: "/archives/",
      img: "/image/menu/99_blank.png",
      width: 640,
      height: 460,
      imgAlt: "アーカイブスへのリンク",
    },
  ];

  return (
    <>
      <div className="container mx-auto px-2 md:px-6 lg:max-w-screen-lg">
        <TopHeader />
        <h1 className="text-2xl my-2">お品書き</h1>
        <MenuGrid>
          {menuList.map((menuCard) => {
            return <MenuCard key={menuCard.id} {...menuCard} />;
          })}
        </MenuGrid>
      </div>
      <ArticleFooter isAbsoluteBottom />
    </>
  );
}
