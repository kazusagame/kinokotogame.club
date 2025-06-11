import type { Metadata } from "next";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleFooter from "@/components/ArticleFooter";
import PetitMatching from "@/features/archives/petit-matching/components/PetitMatching";

export const metadata: Metadata = {
  title: "ぷち合わせモドキ - アーカイブス - きのことゲーム部",
  description: "どこかで見たような神経衰弱ゲームです。",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto px-2 md:px-6 lg:max-w-screen-lg">
        <ArticleHeader />
        <PetitMatching />
      </div>
      <ArticleFooter />
    </>
  );
}
