import type { Metadata } from "next";
import ArticleHeader from "@/components/common/ArticleHeader";
import ArticleFooter from "@/components/common/ArticleFooter";
import DivraceTable from "@/components/article/DivraceTable";

export const metadata: Metadata = {
  title: "全国高校生課外活動コンテスト - アーカイブス - きのことゲーム部",
  description:
    "ガールフレンド(仮)の思い出の記録 - 全国高校生課外活動コンテスト",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto px-2 md:px-6">
        <ArticleHeader />
        <section className="mt-4 mb-8">
          <h1 className="text-2xl my-4">全国高校生課外活動コンテスト</h1>
          <p className="leading-7">
            ・表の見出しをタップすると並べ替えが出来ます。
            <br />
            ・PCの場合はShiftキーを押しながらクリックすると複数行で並べ替えが出来ます。
            <br />
            ・検索欄に文字列を入力すると表示する行の絞り込みが出来ます。
          </p>
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            最終ランキング ごほうび表
          </h2>
          <DivraceTable
            title="第5回 (2025/03)"
            jsonFileName="/json/divrace/reward_005.json"
            tableType="divraceReward005"
            tableSize="xs"
            initialColumnPinning={{ left: ["class", "grade", "rank"] }}
          />
          <DivraceTable
            title="第4回 (2024/09)"
            jsonFileName="/json/divrace/reward_004.json"
            tableType="divraceReward004"
            tableSize="xs"
            initialColumnPinning={{ left: ["class", "grade", "rank"] }}
          />
          <DivraceTable
            title="第3回 (2024/03)"
            jsonFileName="/json/divrace/reward_003.json"
            tableType="divraceReward003"
            tableSize="xs"
            initialColumnPinning={{ left: ["class", "grade", "rank"] }}
          />
          <DivraceTable
            title="第2回 (2023/09)"
            jsonFileName="/json/divrace/reward_002.json"
            tableType="divraceReward002"
            tableSize="xs"
            initialColumnPinning={{ left: ["class", "grade", "rank"] }}
          />
          <DivraceTable
            title="第1回 (2023/03)"
            jsonFileName="/json/divrace/reward_001.json"
            tableType="divraceReward001"
            tableSize="xs"
            initialColumnPinning={{ left: ["class", "grade", "rank"] }}
          />
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            pt獲得ごほうび表
          </h2>
          <DivraceTable
            title="第5回 (2025/03)"
            jsonFileName="/json/divrace/point_005.json"
            tableType="divracePoint"
            tableSize="xs"
            disableColumnFilter
          />
          <DivraceTable
            title="第4回 (2024/09)"
            jsonFileName="/json/divrace/point_004.json"
            tableType="divracePoint"
            tableSize="xs"
            disableColumnFilter
          />
          <DivraceTable
            title="第3回 (2024/03)"
            jsonFileName="/json/divrace/point_003.json"
            tableType="divracePoint"
            tableSize="xs"
            disableColumnFilter
          />
          <DivraceTable
            title="第2回 (2023/09)"
            jsonFileName="/json/divrace/point_002.json"
            tableType="divracePoint"
            tableSize="xs"
            disableColumnFilter
          />
          <DivraceTable
            title="第1回 (2023/03)"
            jsonFileName="/json/divrace/point_001.json"
            tableType="divracePoint"
            tableSize="xs"
            disableColumnFilter
          />
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            ベースステージ表
          </h2>
          <DivraceTable
            title="第1～5回"
            jsonFileName="/json/divrace/stage_base_001.json"
            tableType="divraceStageBase"
            tableSize="xs"
            initialColumnPinning={{ left: ["lv"] }}
          />
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            チャレンジステージ表
          </h2>
          <DivraceTable
            title="第2～5回"
            jsonFileName="/json/divrace/stage_challenge_002.json"
            tableType="divraceStageChallenge"
            tableSize="xs"
            initialColumnPinning={{ left: ["lv"] }}
          />
          <DivraceTable
            title="第1回 (2023/03)"
            jsonFileName="/json/divrace/stage_challenge_001.json"
            tableType="divraceStageChallenge"
            tableSize="xs"
            initialColumnPinning={{ left: ["lv"] }}
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
