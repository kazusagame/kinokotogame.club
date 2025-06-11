import type { Metadata } from "next";
import Link from "next/link";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleFooter from "@/components/ArticleFooter";

export const metadata: Metadata = {
  title: "プライバシーポリシー - きのことゲーム部",
  description: "本サイトのプライバシーポリシーを記載しています。",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto mb-6 px-2 md:px-6 lg:max-w-screen-lg">
        <ArticleHeader />
        <h1 className="text-2xl my-4">プライバシーポリシー</h1>
        <section className="mt-8 mb-8 md:pl-4">
          <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[5px]">
            本サイトで利用しているアクセス解析ツールについて
          </h2>
          <div className="my-4 md:pl-4 leading-7">
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              本サイトではGoogleのアクセス解析ツールである「Googleアナリティクス」を利用しています。
              Googleアナリティクスはトラフィックデータの収集のためにCookieを使用します。
              このトラフィックデータは匿名で収集されており個人を特定するものではありません。
            </p>
            <p className="mt-2 pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              ブラウザのCookieの設定を無効にすることでデータの収集を拒否することができます。具体的な設定方法はご利用中のブラウザのヘルプをご確認ください。もしくは、Googleが提供するオプトアウトアドオンを利用することでもGoogleアナリティクスによるデータ収集を無効化することが可能です。
            </p>
            <p className="pl-4">
              <Link
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="link text-blue-600"
              >
                Google アナリティクス オプトアウト アドオン
              </Link>
            </p>
            <p className="mt-2 pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              その他関連リンク
              <br />
              <Link
                href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="link text-blue-600"
              >
                Google アナリティクス利用規約
              </Link>
              <br />
              <Link
                href="https://policies.google.com/privacy?hl=ja"
                target="_blank"
                rel="noopener noreferrer"
                className="link text-blue-600"
              >
                Google プライバシーポリシー
              </Link>
            </p>
          </div>
        </section>
        <section className="mt-8 mb-8 md:pl-4">
          <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[5px]">
            Googleアナリティクスで収集される主なデータ
          </h2>
          <ul className="my-4 md:pl-4 leading-7 space-y-1">
            <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              ブラウザの種類・バージョン
            </li>
            <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              OSの種類
            </li>
            <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              使用端末の種類
            </li>
            <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              IPアドレス（匿名化処理済み）
            </li>
            <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              訪問日時・滞在時間
            </li>
            <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              参照元URL
            </li>
            <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              閲覧したページ・クリックしたリンク
            </li>
            <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              画面解像度
            </li>
            <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              言語設定
            </li>
            <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              市区町村レベルの地域
            </li>
          </ul>
        </section>
        <section className="mt-8 mb-8 md:pl-4">
          <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[5px]">
            アクセス解析の目的
          </h2>
          <ul className="my-4 md:pl-4 leading-7 space-y-1">
            <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              サイト利用状況の把握（アクセス数の多いページ、少ないページの確認に使用します）
            </li>
            <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              コンテンツ改善のための分析（更新の優先順位付けや、ブラウザや端末などの閲覧環境対応に使用します）
            </li>
            <li className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              技術的な問題の把握と改善（リンク切れなどのエラーを検出して修正するのに使用します）
            </li>
          </ul>
        </section>
      </div>
      <ArticleFooter />
    </>
  );
}
