import type { Metadata } from "next";
import ArticleFooter from "@/components/ArticleFooter";
import DeckSimulator from "@/features/decksim/components/DeckSimulator";

export const metadata: Metadata = {
  title: "たすけて！マイヒーロー 後半 - センバツシミュレーター - きのことゲーム部",
  description:
    "ガールフレンド(仮)のセンバツシミュレーターWeb版のたすけて！マイヒーロー 後半用のページです。ガールの応援力などを入力していくことで発揮値や獲得ポイントの予想値を算出します。",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto mb-6">
        <DeckSimulator eventId="raid-second" />
      </div>
      <ArticleFooter />
    </>
  );
}
