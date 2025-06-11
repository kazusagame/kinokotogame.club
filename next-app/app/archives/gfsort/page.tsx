import type { Metadata } from "next";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleFooter from "@/components/ArticleFooter";
import GfCharacterSort from "@/features/archives/gfsort/GfCharacterSort";

export const metadata: Metadata = {
  title: "ガールフレンド(仮) キャラソート - アーカイブス - きのことゲーム部",
  description: "ガールフレンド(仮)の登場キャラクターでソートを作成します。",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto px-2 lg:max-w-screen-lg">
        <ArticleHeader />
        <section className="mt-4 mb-8 md:px-4">
          <h1 className="text-2xl my-4">
            <span className="whitespace-nowrap">ガールフレンド(仮)</span>{" "}
            <span className="whitespace-nowrap">キャラソート</span>
          </h1>
          <p className="leading-7">・最終更新日: 2024年12月27日</p>
        </section>
        <GfCharacterSort />
      </div>
      <ArticleFooter />
    </>
  );
}
