import type { Metadata } from "next";
import ArticleHeader from "@/components/common/ArticleHeader";
import ArticleFooter from "@/components/common/ArticleFooter";
import PetitMatching from "@/components/article/petitMatching/PetitMatching";

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
