import type { Metadata } from "next";
import Image from "next/image";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleFooter from "@/components/ArticleFooter";

export const metadata: Metadata = {
  title:
    "センバツ生データの活用方法 - センバツシミュレーター - きのことゲーム部",
  description:
    "ガールフレンド(仮)のセンバツシミュレーターWeb版のセンバツ生データの活用方法を説明しているページです。",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto mb-6 px-2 md:px-6 lg:max-w-screen-lg">
        <ArticleHeader />
        <div className="flex flex-col gap-4 my-2 px-2 md:px-4 leading-loose sm:max-w-screen-sm">
          <section className="">
            <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
              センバツ生データについて
            </h2>
            <div className="my-2 md:pl-4">
              <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                本サイトのシミュレーターには、センバツのデータ入力作業にかかる時間の短縮や
                ゲーム側のセンバツを更新した後の確認に使用できるように、ゲーム側のセンバツデータを
                シミュレーター側にインポートする機能が実装されています。
                <br />
                以下、ゲーム側のセンバツデータのことを「センバツ生データ」と呼称します。
              </p>
              <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                Webブラウザに送られてくるデータを "覗き見" しているだけなので
                セーフ寄りの認識ですが、要望を受けた場合などに予告なく機能削除する
                場合がございますのであらかじめご了承ください。
              </p>
              <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                以下では Windows PC + Google Chrome の環境での
                手順を紹介しています。
                <br />
                スマートフォンでも他のアプリとの組み合わせれば同様の手順で
                可能かもしれませんがここでは説明は割愛させていただきます。
                <br />
                (iPhone Safari + Web Inspector、Android + Devel Browser、など)
              </p>
            </div>
          </section>
          <section className="">
            <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
              センバツ生データの取得方法
            </h2>
            <div className="my-2 md:pl-4">
              <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                まず、データを取得したいセンバツの編集画面に移動します。主センバツの画面と副センバツの画面のどちらでも構いません。
              </p>
              <Image
                src="/image/decksim/useRawData/01_deck_edit.png"
                alt="センバツ編集画面"
                width={651}
                height={648}
                className="mt-4 mb-2 ml-4 w-1/2"
              />
              <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                次に、Google Chromeのデベロッパーツール (DevTools)
                を起動します。
                <br />
                [Google Chrome の 設定] → [その他のツール] →{"  "}
                [デベロッパー ツール] か{"  "}
                ショートカットキー (Ctrl + Shift + I)のどちらでも可能です。
              </p>
              <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                デベロッパーツールの画面で [ネットワーク]タブを選択し、 さらに
                [Fetch/XHR]フィルターを有効にします。
              </p>
              <Image
                src="/image/decksim/useRawData/02_devtools_1.png"
                alt="DevTools画面1"
                width={703}
                height={273}
                className="mt-4 mb-2 ml-4 w-1/2"
              />
              <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                この状態でページの再読み込み(リロード)を行います。リロードボタンやF5など。
                <br />
                すると、デベロッパーツール側にサーバーから送られてきたデータが表示されます。
                この内のいずれか1つがセンバツ生データになります。
                イベントによって異なりますが、"deck-search"や"get-form-skill-deck"、"api"といった
                文字列のものを "右クリック" して、 さらに [コピー] →
                [レスポンスをコピー] を選択します。
              </p>
              <Image
                src="/image/decksim/useRawData/03_devtools_2.png"
                alt="DevTools画面2"
                width={705}
                height={687}
                className="mt-4 mb-2 ml-4 w-1/2"
              />
              <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                コピーした文字列をファイルとして保存します。
                メモ帳などのテキストエディターを起動して新しいファイルに文字列を貼り付けて任意の場所に保存します。
                この際、ファイル名の拡張子の部分は [.json] になるようにします。
                また、エンコードは [UTF-8] を選択します。
                <br />
                以上でセンバツ生データの取得手順は完了です。
                デベロッパーツールは×ボタンなどで閉じます。
              </p>
              <Image
                src="/image/decksim/useRawData/04_textbook.png"
                alt="メモ帳の画面"
                width={726}
                height={152}
                className="mt-4 mb-2 ml-4 w-1/2"
              />
            </div>
          </section>
          <section className="">
            <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
              センバツシミュレーターへのインポート方法
            </h2>
            <div className="my-2 md:pl-4">
              <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                センバツシミュレーターの[外部入出力]タブを選択して、センバツ生データのインポート欄を確認します。
                <br />
                プレイヤーの部活タイプや、{"  "}
                有利ガールの名前 (聖櫻学園メモリアルストーリーのみ)、{"  "}
                予選グループのガールの名前 (全国高校生課外活動コンテストのみ)
                を入力した後に、 [ファイルを選択] をクリックします。
              </p>
              <Image
                src="/image/decksim/useRawData/05_import.png"
                alt="インポート画面"
                width={590}
                height={666}
                className="mt-4 mb-2 ml-4 w-1/2"
              />
              <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                するとファイルの選択画面になりますので、先ほど保存しておいたセンバツ生データのファイルを選択して開きます。
                インポートに成功すると自動的に[シミュレーター本体]タブに切り替わります。
                ゲーム側で取得したセンバツ生データに基づいて、シミュレーター側にガールたちやぷちセンバツの
                データが入力されてある状態になります。
              </p>
            </div>
          </section>
          <section className="">
            <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
              制限事項
            </h2>
            <div className="my-2 md:pl-4">
              <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                インポートされるのはセンバツデータだけです。
                そのため、[プレイヤーデータ・部活データ]の自身のタイプや、部活役職などは別途追加で入力する必要があります。
              </p>
              <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                聖櫻学園★カリスマ決定戦で取得したセンバツ生データからはコストのインポートが正常に行われません
                (→ 各シーンのコストのデータが存在していないため)。
                そのため、コスト依存のプレシャスシーンを使用している場合は別途追加で入力する必要があります。
              </p>
              <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
                散策♪聖櫻ワールドのぷちセンバツの{"  "}
                [ぷちガールちゃん詳細 (マス効果用)] には
                インポートが行われません。そのため、マス効果を正確に算出したい場合は
                別途追加で入力する必要があります。
              </p>
            </div>
          </section>
        </div>
      </div>
      <ArticleFooter />
    </>
  );
}
