import type { Metadata } from "next";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleFooter from "@/components/ArticleFooter";

import EpisodeSearch from "@/features/archives/episode/components/EpisodeSearch";

export const metadata: Metadata = {
  title: "エピソード検索 - アーカイブス - きのことゲーム部",
  description: "ガールフレンド(仮)の思い出の記録 - エピソード検索",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto px-2 md:px-6">
        <ArticleHeader />
        <section className="mt-4 mb-8">
          <h1 className="text-2xl my-4">エピソード検索</h1>
          <p className="leading-7">
            ・ガールを選択して検索ボタンをタップすると、そのガールが登場するエピソードをデータベースから検索して表示します。
            <br />
            ・最終更新日: 2025年04月26日
          </p>
        </section>
        <EpisodeSearch />
        <section className="my-8 leading-7">
          <p>
            本ページに記載のデータはガールフレンド(仮)のゲーム内から引用しています。
            <br />
            データの著作権は株式会社サイバーエージェントに帰属します。
          </p>
        </section>
      </div>
      <ArticleFooter />
    </>
  );
}
