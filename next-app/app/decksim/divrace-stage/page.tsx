import type { Metadata } from "next";
import ArticleFooter from "@/components/common/ArticleFooter";
import DivraceStageSimulator from "@/components/decksim/simulator/DivraceStageSimulator";

export const metadata: Metadata = {
  title:
    "全国高校生課外活動コンテスト本選 ステージシミュ - センバツシミュレーター - きのことゲーム部",
  description:
    "ガールフレンド(仮)のセンバツシミュレーターWeb版の全国高校生課外活動コンテストの本選ステージシミュ用のページです。飴1個の火力やステージの設定を行うとサポートの推奨パターンや必要になる炭酸本数を算出します。",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto mb-6">
        <DivraceStageSimulator />
      </div>
      <ArticleFooter />
    </>
  );
}
