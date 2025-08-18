import type { Metadata } from "next";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleFooter from "@/components/ArticleFooter";

import EpisodeTable from "@/features/archives/episode/components/EpisodeTable";

import withBasePath from "@/lib/withBasePath";

export const metadata: Metadata = {
  title: "その他 エピソード - アーカイブス - きのことゲーム部",
  description: "ガールフレンド(仮)の思い出の記録 - その他エピソード",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto px-2 md:px-6">
        <ArticleHeader />
        <section className="mt-4 mb-8">
          <h1 className="text-2xl my-4">その他エピソード</h1>
          <p className="leading-7">
            ・表の見出しをタップすると並べ替えが出来ます。
            <br />
            ・PCの場合はShiftキーを押しながらクリックすると複数行で並べ替えが出来ます。
            <br />
            ・検索欄に文字列を入力すると表示する行の絞り込みが出来ます。
            <br />
            ・最終更新日: 2025年08月18日
          </p>
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            記念ストーリー
          </h2>
          <EpisodeTable
            title="開く / 閉じる"
            jsonFileName={withBasePath("/json/episode-etc/election-1.json")}
            tableType="general"
            tableSize="xs"
          />
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            幼少期エピソード
          </h2>
          <EpisodeTable
            title="開く / 閉じる"
            jsonFileName={withBasePath("/json/episode-etc/election-2.json")}
            tableType="general"
            tableSize="xs"
          />
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            コラボ
          </h2>
          <EpisodeTable
            title="開く / 閉じる"
            jsonFileName={withBasePath("/json/episode-etc/collabo.json")}
            tableType="collabo"
            tableSize="xs"
          />
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            ズバッとお悩み解決隊
          </h2>
          <EpisodeTable
            title="開く / 閉じる"
            jsonFileName={withBasePath("/json/episode-etc/tactics.json")}
            tableType="general"
            tableSize="xs"
          />
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            テスト勉強
          </h2>
          <EpisodeTable
            title="開く / 閉じる"
            jsonFileName={withBasePath("/json/episode-etc/study.json")}
            tableType="general"
            tableSize="xs"
            pageSize={11}
            disablePagination
          />
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            一ノ瀬友恵エピソード
          </h2>
          <EpisodeTable
            title="開く / 閉じる"
            jsonFileName={withBasePath("/json/episode-etc/ichinose-episode.json")}
            tableType="ichinose"
            tableSize="xs"
            disablePagination
          />
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            がーるふれんど(かり)
          </h2>
          <EpisodeTable
            title="開く / 閉じる"
            jsonFileName={withBasePath("/json/episode-etc/april2019.json")}
            tableType="general"
            tableSize="xs"
            disablePagination
          />
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            ガールフレンド(母)
          </h2>
          <EpisodeTable
            title="開く / 閉じる"
            jsonFileName={withBasePath("/json/episode-etc/april2018.json")}
            tableType="general"
            tableSize="xs"
            disablePagination
          />
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            クリスマスエピソード
          </h2>
          <EpisodeTable
            title="開く / 閉じる"
            jsonFileName={withBasePath("/json/episode-etc/xmas.json")}
            tableType="general"
            tableSize="xs"
            disablePagination
          />
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            アニメサイドストーリー
          </h2>
          <EpisodeTable
            title="開く / 閉じる"
            jsonFileName={withBasePath("/json/episode-etc/anime-side-story.json")}
            tableType="animeSideStory"
            tableSize="xs"
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
