import type { Metadata } from "next";
import ArticleHeader from "@/components/common/ArticleHeader";
import ArticleFooter from "@/components/common/ArticleFooter";

import EpisodeTable from "@/components/article/episode/EpisodeTable";

export const metadata: Metadata = {
  title: "聖櫻エリア - アーカイブス - きのことゲーム部",
  description: "ガールフレンド(仮)の思い出の記録 - 聖櫻エリア",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto px-2 md:px-6 lg:max-w-screen-lg">
        <ArticleHeader />
        <section className="mt-4 mb-8">
          <h1 className="text-2xl my-4">聖櫻エリア 会話集</h1>
          <p className="leading-7">
            ・表の見出しをタップすると並べ替えが出来ます。
            <br />
            ・PCの場合はShiftキーを押しながらクリックすると複数行で並べ替えが出来ます。
            <br />
            ・検索欄に文字列を入力すると表示する行の絞り込みが出来ます。
            <br />
            ・最終更新日: 2024年11月24日
          </p>
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            会話 一覧
          </h2>
          <EpisodeTable
            title="開く / 閉じる"
            jsonFileName="/json/seio-area/scenario.json"
            tableType="seioArea"
            tableSize="xs"
            pageSize={5}
            initialColumnVisibility={{ Type: false }}
          />
        </section>

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
