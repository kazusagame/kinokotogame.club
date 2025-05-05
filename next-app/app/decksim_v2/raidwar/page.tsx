import type { Metadata } from "next";
import ArticleFooter from "@/components/common/ArticleFooter";
import DeckSimulator from "@/components/decksim/simulator/DeckSimulator";

export const metadata: Metadata = {
  title: "おねがい★ハンターズ - センバツシミュレーター - きのことゲーム部",
  description:
    "ガールフレンド(仮)のセンバツシミュレーターWeb版のおねがい★ハンターズ用のページです。ガールの応援力などを入力していくことで発揮値や獲得ポイントの予想値を算出します。",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto mb-6">
        <DeckSimulator eventId="raidwar" />
      </div>
      <ArticleFooter />
    </>
  );
}
