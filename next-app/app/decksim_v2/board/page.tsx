import type { Metadata } from "next";
import ArticleFooter from "@/components/common/ArticleFooter";
import DeckSimulator from "@/components/decksim/simulator/DeckSimulator";

export const metadata: Metadata = {
  title: "散策♪聖櫻ワールド - センバツシミュレーター - きのことゲーム部",
  description:
    "ガールフレンド(仮)のセンバツシミュレーターWeb版の散策♪聖櫻ワールド用のページです。ガールの応援力などを入力していくことで発揮値や獲得ポイントの予想値を算出します。",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto mb-6">
        <DeckSimulator eventId="board" />
      </div>
      <ArticleFooter />
    </>
  );
}
