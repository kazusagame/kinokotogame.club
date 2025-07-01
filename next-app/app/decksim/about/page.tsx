import type { Metadata } from "next";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleFooter from "@/components/ArticleFooter";

import { DeckSimulatorHowToUse } from "@/features/decksim/components/manual/DeckSimulatorHowToUse";

export const metadata: Metadata = {
  title: "使用方法 - センバツシミュレーター - きのことゲーム部",
  description:
    "ガールフレンド(仮)のセンバツシミュレーターWeb版の使用方法を説明しているページです。",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto mb-6 px-2 md:px-6 lg:max-w-screen-lg">
        <ArticleHeader />
        <DeckSimulatorHowToUse />
      </div>
      <ArticleFooter />
    </>
  );
}
