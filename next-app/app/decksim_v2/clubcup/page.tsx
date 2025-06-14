import type { Metadata } from "next";
import ArticleFooter from "@/components/ArticleFooter";
import DeckSimulator from "@/features/decksim/components/DeckSimulator";

export const metadata: Metadata = {
  title: "部活対抗！勧誘★グランプリ - センバツシミュレーター - きのことゲーム部",
  description:
    "ガールフレンド(仮)のセンバツシミュレーターWeb版の部活対抗！勧誘★グランプリ用のページです。ガールの応援力などを入力していくことで発揮値や獲得ポイントの予想値を算出します。",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto mb-6">
        <DeckSimulator eventId="clubcup" />
      </div>
      <ArticleFooter />
    </>
  );
}
