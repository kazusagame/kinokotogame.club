import { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";

import ArticleHeader from "@/components/common/ArticleHeader";
import ArticleFooter from "@/components/common/ArticleFooter";
import DivBonusCommon from "@/components/decksim/manual/DivBonusCommon";
import DivBonusEventUnique from "@/components/decksim/manual/DivBonusEventUnique";
import BonusEffectiveRateTable from "@/components/decksim/manual/BonusEffectiveRateTable";
import DivSkillRate from "@/components/decksim/manual/DivSkillRate";
import DivPetitGirlsEffects from "@/components/decksim/manual/DivPetitGirlsEffects";
import DivPreciousScenes from "@/components/decksim/manual/DivPreciousScenes";

export const metadata: Metadata = {
  title: "設定値 - センバツシミュレーター - きのことゲーム部",
  description:
    "ガールフレンド(仮)のセンバツシミュレーターWeb版の設定値用のページです。シミュレーターで使用している各種パラメータの数値を記載しています。",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto mb-6 px-2 md:px-6">
        <ArticleHeader />
        <section className="mt-4 mb-8 md:pl-4">
          <h1 className="text-2xl/relaxed pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[10px]">
            このページについて
          </h1>
          <div className="my-4 md:pl-4 leading-7">
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              本サイトのシミュレーターで使用している各種設定値を記載するページです。
              <br />
              あくまで検証結果からの推定であり、実際にゲーム内で使用されてい数値とは異なる可能性が高いです。予めご承知おきください。
            </p>
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              誤りなどございましたら
              <Link
                href="https://twitter.com/kazusagame/"
                target="_blank"
                rel="noreferrer"
                className="mx-4 link"
              >
                Twitter@kazusagame
              </Link>
              もしくは
              <Link
                href="https://vcard.ameba.jp/profile?userId=3172893"
                target="_blank"
                rel="noreferrer"
                className="mx-4 link"
              >
                ゲーム内Id=3172893
              </Link>
              までお寄せいただけたら幸いです。
            </p>
          </div>
        </section>

        <section className="mt-4 mb-8 md:pl-4">
          <h2 className="text-2xl/relaxed pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[10px]">
            ページ内リンク
          </h2>
          {/* prettier-ignore */}
          <div className="flex flex-wrap gap-4 pt-4 md:pl-4">
            <LinkButton url="#bonusCommon" text="ボーナス値 (共通)" />
            <LinkButton url="#bonusEventUnique" text="ボーナス値 (イベント個別)" />
            <LinkButton url="#bonusRate" text="ボーナス有効率 (イベント個別)" />
            <LinkButton url="#skillRate" text="声援効果" />
            <LinkButton url="#petitGirlsEffects" text="ぷちガールちゃん 応援力効果" />
            <LinkButton url="#preciousScenes" text="プレシャスシーン" />
          </div>
        </section>
        <SectionBonus id="bonusCommon" title="ボーナス値 (共通)">
          <DivBonusCommon />
        </SectionBonus>
        <SectionBonus id="bonusEventUnique" title="ボーナス値 (イベント個別)">
          <DivBonusEventUnique />
        </SectionBonus>
        <SectionBonus id="bonusRate" title="ボーナス有効率 (イベント個別)">
          <div className="md:pl-4">
            <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-4 before:rounded before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[10px] mt-4">
              たすけて！マイヒーロー 前半 超レア
            </h2>
            <BonusEffectiveRateTable eventType="raidFirst" />
            <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-4 before:rounded before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[10px] mt-4">
              たすけて！マイヒーロー 後半 超レア
            </h2>
            <BonusEffectiveRateTable eventType="raidSecond" />
            <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-4 before:rounded before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[10px] mt-4">
              たすけて！マイヒーロー メガ悪男
            </h2>
            <BonusEffectiveRateTable eventType="raidMega" />
            <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-4 before:rounded before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[10px] mt-4">
              おねがい★ハンターズ
            </h2>
            <BonusEffectiveRateTable eventType="raidwar" />
            <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-4 before:rounded before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[10px] mt-4">
              部活対抗！勧誘★グランプリ
            </h2>
            <BonusEffectiveRateTable eventType="clubcup" />
            <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-4 before:rounded before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[10px] mt-4">
              聖櫻学園★カリスマ決定戦
            </h2>
            <BonusEffectiveRateTable eventType="championship" />
            <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-4 before:rounded before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[10px] mt-4">
              聖櫻学園メモリアルストーリー
            </h2>
            <BonusEffectiveRateTable eventType="tower" />
            <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-4 before:rounded before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[10px] mt-4">
              全国高校生課外活動コンテスト
            </h2>
            <BonusEffectiveRateTable eventType="divrace" />
            <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-4 before:rounded before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[10px] mt-4">
              散策♪聖櫻ワールド
            </h2>
            <BonusEffectiveRateTable eventType="board" />
            <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-4 before:rounded before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[10px] mt-4">
              通常バトル
            </h2>
            <BonusEffectiveRateTable eventType="normalBattle" />
          </div>
        </SectionBonus>
        <SectionBonus id="skillRate" title="声援効果">
          <DivSkillRate />
        </SectionBonus>
        <SectionBonus
          id="petitGirlsEffects"
          title="ぷちガールちゃん 応援力効果"
        >
          <p className="my-2 pl-2 text-sm">
            ※ Lvmax時の効果値(UR)は暫定値です。
          </p>
          <DivPetitGirlsEffects />
        </SectionBonus>
        <SectionBonus id="preciousScenes" title="プレシャスシーン">
          <DivPreciousScenes />
        </SectionBonus>
      </div>
      <ArticleFooter />
    </>
  );
}

function LinkButton({ url, text }: { url: string; text: string }) {
  return (
    <Link href={url}>
      <button className="btn btn-xs md:btn-md btn-primary rounded-md">
        {text}
      </button>
    </Link>
  );
}

function SectionBonus({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-4 mb-8 md:pl-4" id={id}>
      <h2 className="text-2xl/relaxed pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[10px]">
        {title}
      </h2>
      {children}
    </section>
  );
}
