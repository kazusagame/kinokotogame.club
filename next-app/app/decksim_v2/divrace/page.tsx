import type { Metadata } from "next";
import ArticleFooter from "@/components/common/ArticleFooter";
import DeckSimulator from "@/components/decksim/simulator/DeckSimulator";

export const metadata: Metadata = {
  title: "全国高校生課外活動コンテスト - センバツシミュレーター - きのことゲーム部",
  description:
    "ガールフレンド(仮)のセンバツシミュレーターWeb版の全国高校生課外活動コンテスト用のページです。ガールの応援力などを入力していくことで発揮値や獲得ポイントの予想値を算出します。",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto mb-6">
        <DeckSimulator eventId="divrace" />
      </div>
      <ArticleFooter />
    </>
  );
}
