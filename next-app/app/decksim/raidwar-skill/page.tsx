import type { Metadata } from "next";
import ArticleFooter from "@/components/ArticleFooter";
import RaidwarSkillSimulator from "@/features/decksim/components/RaidwarSkillSimulator";

export const metadata: Metadata = {
  title:
    "おねがい★ハンターズ ハンター声援センバツ - センバツシミュレーター - きのことゲーム部",
  description:
    "ガールフレンド(仮)のセンバツシミュレーターWeb版のおねがい★ハンターズ ハンター声援センバツ用のページです。必要ハート数やダメージ数値を入力していくことで声援発動のタイムラインが期待通りか確認が出来ます。",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto mb-6">
        <RaidwarSkillSimulator />
      </div>
      <ArticleFooter />
    </>
  );
}
