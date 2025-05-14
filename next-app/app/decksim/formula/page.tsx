import { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";

import ArticleHeader from "@/components/common/ArticleHeader";
import ArticleFooter from "@/components/common/ArticleFooter";
import SkillProbabilityTable from "@/components/decksim/manual/SkillProbabilityTable";
import BonusEffectiveRateTable from "@/components/decksim/manual/BonusEffectiveRateTable";
import { DeckSimulatorEventId } from "@/components/decksim/data/eventData";

export const metadata: Metadata = {
  title: "計算式 - センバツシミュレーター - きのことゲーム部",
  description:
    "ガールフレンド(仮)のセンバツシミュレーターWeb版の計算式のページです。各イベントごとの発揮値算出式を記載しています。",
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
              本サイトのシミュレーターで使用している発揮値計算式を記載するページです。
              <br />
              あくまで検証結果からの推定であり、実際にゲーム内で使用されている計算式とは異なる可能性が高いです。予めご承知おきください。
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
            <LinkButton url="#raid-first" text="たすけて！マイヒーロー 前半 超レア" />
            <LinkButton url="#raid-second" text="たすけて！マイヒーロー 後半 超レア" />
            <LinkButton url="#raid-mega" text="たすけて！マイヒーロー メガ悪男" />
            <LinkButton url="#raidwar" text="おねがい★ハンターズ" />
            <LinkButton url="#clubcup" text="部活対抗！勧誘★グランプリ" />
            <LinkButton url="#championship" text="聖櫻学園★カリスマ決定戦" />
            <LinkButton url="#tower" text="聖櫻学園メモリアルストーリー" />
            <LinkButton url="#divrace" text="全国高校生課外活動コンテスト" />
            <LinkButton url="#board" text="散策♪聖櫻ワールド" />
            <LinkButton url="#normal-battle" text="通常バトル" />
          </div>
        </section>

        <FormulaSection
          title="たすけて！マイヒーロー 前半 超レア"
          eventId="raid-first"
          comments={[
            "主センバツ：リーダー(1番左)は声援の発動率が 100 % なので声援が一番強い子にする。他は声援が強い順に並べる必要はない。",
            "副センバツへの声援に掛かる補正値はハンターズと同じ 80 % 。",
            "最大攻コストが 650 未満の場合は別の補正が掛かるため計算式が異なります(シミュ未対応)。",
          ]}
        >
          {/* prettier-ignore */}
          <div className="md:pl-4 py-2 whitespace-nowrap">
            <div className="px-4 py-2 bg-base-200 rounded-md w-fit">
              <p>
                ( <span className="text-red-500 border-b border-b-red-500">
                Σ( 攻援力 × ( <span className="font-bold italic">A</span>
                {" "}＋ <span className="font-bold italic">B</span> 合計 )
                {" "}× ( 1 ＋ <span className="font-bold italic">C</span> ) )</span>
              </p>
              <p className="pl-4">× 攻コスト補正(最大/100)</p>
              <p className="pl-4">× (1 ＋ コンボ補正) ＋ SP応援効果 )</p>
              <p>× ハート数補正(1、6、12)</p>
            </div>
            <p className="text-xs pl-4 mt-2">
              ※<span className="text-red-500">赤字部分</span> はガール毎に計算して合計する
            </p>
          </div>
        </FormulaSection>

        <FormulaSection
          title="たすけて！マイヒーロー 後半 超レア"
          eventId="raid-second"
          comments={[
            "声援の発動の仕方が特殊。主センバツを声援が強い順に並べる必要はない。",
            "副センバツへの声援に掛かる補正値はハンターズと同じ 80 % 。",
            "最大攻コストが 650 未満の場合は別の補正が掛かるため計算式が異なります(シミュ未対応)。",
          ]}
        >
          {/* prettier-ignore */}
          <div className="md:pl-4 py-2 whitespace-nowrap">
            <div className="px-4 py-2 bg-base-200 rounded-md w-fit">
              <p>
                ( ( <span className="font-bold italic">攻援センバツ発揮値</span>
                {" ＋ "}<span className="font-bold italic">守援センバツ発揮値</span> )
              </p>
              <p className="pl-4">× 攻コスト補正(最大/200)</p>
              <p className="pl-4">× (1 ＋ コンボ補正) ＋ SP応援効果 )</p>
              <p>× ハート数補正(1、6、12)</p>
              <p className="mt-2">
                <span className="font-bold italic">攻援センバツ発揮値</span>
                <span className="mx-2">{" = "}</span>
                <span className="text-red-500 border-b border-b-red-500">
                Σ( 攻援力 × ( <span className="font-bold italic">A</span>
                {" "}＋ <span className="font-bold italic">B</span> 合計 )
                {" "}× ( 1 ＋ <span className="font-bold italic">C</span> ) )
                </span>
              </p>
              <p className="mt-2">
                <span className="font-bold italic">守援センバツ発揮値</span>
                <span className="mx-2">{" = "}</span>
                <span className="text-red-500 border-b border-b-red-500">
                Σ( 守援力 × ( <span className="font-bold italic">A</span>
                {" "}＋ <span className="font-bold italic">B</span> 合計 )
                {" "}× ( 1 ＋ <span className="font-bold italic">C</span> ) )
                </span>
              </p>
            </div>
            <p className="text-xs pl-4 mt-2">
              ※<span className="text-red-500">赤字部分</span> はガール毎に計算して合計する
            </p>
          </div>
        </FormulaSection>

        <FormulaSection
          title="たすけて！マイヒーロー メガ悪男"
          eventId="raid-mega"
          comments={[
            "主センバツ：リーダー(1番左)は声援の発動率が 100 % なので声援が一番強い子にする。他は声援が強い順に並べる必要はない。",
            "副センバツ：プレシャスシーン以外の効果は無し。",
            "ヒーロー声援による攻援力UPは 100% が上限。守備力DOWNは 50% が上限。多めに積むと悪男のイヤガラセ分を相殺できる。",
          ]}
        >
          {/* prettier-ignore */}
          <div className="md:pl-4 py-2 whitespace-nowrap">
            <div className="px-4 py-2 bg-base-200 rounded-md w-fit">
              <p>
                ( <span className="text-red-500 border-b border-b-red-500">
                Σ( 攻援力 × ( <span className="font-bold italic">A</span>
                {" "}＋ <span className="font-bold italic">B</span> 合計 )
                {" "}× ( 1 ＋ <span className="font-bold italic">C</span> ) )</span>
              </p>
              <p className="pl-4">× 攻コスト補正(最大/100)</p>
              <p className="pl-4">
                × ( 1 ＋ <span className="font-bold italic">D</span> ){" "}
                × ( 1 / ( 1 － <span className="font-bold italic">E</span> ) )
              </p>
              <p className="pl-4">＋ SP応援効果 )</p>
              <p>× ハート数補正(1、6、12)</p>
            </div>
            <p className="text-xs pl-4 mt-2">
              ※<span className="text-red-500">赤字部分</span> はガール毎に計算して合計する
            </p>
          </div>
        </FormulaSection>

        <FormulaSection
          title="おねがい★ハンターズ"
          eventId="raidwar"
          comments={[
            "主センバツ：リーダー(1番左)は声援の発動率が 100 % なので声援が一番強い子にする。左から声援が強い順に並べる。",
          ]}
        >
          {/* prettier-ignore */}
          <div className="md:pl-4 py-2 whitespace-nowrap">
            <div className="px-4 py-2 bg-base-200 rounded-md w-fit">
              <p>
                ( <span className="text-red-500 border-b border-b-red-500">
                Σ( 攻援力 × ( <span className="font-bold italic">A</span>
                {" "}＋ <span className="font-bold italic">B</span> 合計 ) )</span>
                {" "}× 攻コスト補正(最大/100)
              </p>
              <p className="pl-4">＋ SP応援効果 ＋ サポートぷちガールちゃん効果 )</p>
              <p>× (1 ＋ コンボ補正(～200%))</p>
              <p>× (1 ＋ ハンター声援 攻援力UP(～150%))</p>
              <p>× ハート数補正(1、6、12)</p>
            </div>
            <p className="text-xs pl-4 mt-2">
              ※<span className="text-red-500">赤字部分</span> はガール毎に計算して合計する
            </p>
          </div>
        </FormulaSection>

        <FormulaSection
          title="部活対抗！勧誘★グランプリ"
          eventId="clubcup"
          comments={[
            "基本的には発揮値よりも声援効果値の方を重視したセンバツの方が獲得勧誘ptは増えやすい。",
            "声援の発動の仕方が特殊。",
            "ストラップとプレシャスシーンの効果分に声援が掛からない。そのため、主センバツに掛かる声援は他のイベントよりも弱体化する。発揮値と声援効果の両面で副センバツに掛かる声援の方が有利。",
          ]}
        >
          {/* prettier-ignore */}
          <div className="md:pl-4 py-2 whitespace-nowrap">
            <div className="px-4 py-2 bg-base-200 rounded-md w-fit">
              <p>
                ( <span className="text-red-500 border-b border-b-red-500">
                Σ( 攻援力 × ( <span className="font-bold italic">A</span>
                {" "}＋ <span className="font-bold italic">B</span> 合計 ) )</span>
              </p>
              <p className="pl-4">
                ＋ <span className="text-red-500 border-b border-b-red-500">
                Σ( 攻援力 × ( <span className="font-bold italic">A</span> ＋ センバツボーナス ) )</span>
                {" "}× <span className="font-bold italic">C</span> )
              </p>
              <p>× (1 ＋ 勝利後ボーナス(10%))</p>
            </div>
            <p className="text-xs pl-4 mt-2">
              ※<span className="text-red-500">赤字部分</span> はガール毎に計算して合計する
            </p>
          </div>
          <h2 className="text-lg mt-4">獲得pt計算式 (全力勧誘)</h2>
          {/* prettier-ignore */}
          <div className="md:pl-4 py-2 whitespace-nowrap">
            <div className="px-4 py-2 bg-base-200 rounded-md w-fit">
              <p>( (発揮値 ^ 0.5) × (最大攻コスト ^ 0.3) × 0.3</p>
              <p className="pl-4">× (1 ＋ 勧誘ptUPボーナス(~ 200%) ＋ 攻撃側が部長or副部長(5 %) ＋ 守備側が部長or副部長(5 %))</p>
              <p className="pl-4">× (1 ＋ 攻撃側声援効果(%)) × (1 － 守備側声援効果(%))</p>
              <p className="pl-4">× (1 ＋ SP応援効果(割合効果%)) ＋ SP応援効果(固定値) )</p>
              <p>× 炭酸本数倍率(1、3)</p>
            </div>
          </div>
        </FormulaSection>

        <FormulaSection
          title="聖櫻学園★カリスマ決定戦"
          eventId="championship"
          comments={[
            "主センバツ：リーダー(左上)は声援の発動率が 100 % なので声援が一番強い子にする。左上から声援が強い順に並べる。",
            "アピールタイムの攻援/守援は、正確には主センバツのガール10人に対して、副センバツ/ぷちセンバツ/SP応援効果/部員呼出の合計値の1/10ずつが加算されているイメージ。",
            "部員呼出(→アピールタイム中の攻コスト消費)は、部員の本命ガールの応援力を参照している。",
          ]}
        >
          {/* prettier-ignore */}
          <div className="md:pl-4 py-2 whitespace-nowrap">
            <p>アピール対決 攻援：</p>
            <div className="px-4 py-2 bg-base-200 rounded-md w-fit">
              <p>
                <span className="text-red-500 border-b border-b-red-500">
                Σ( 攻援力 × ( <span className="font-bold italic">A</span>
                {" "}＋ <span className="font-bold italic">B</span> 合計 ) )</span>
              </p>
              <p>× ハート数補正(100% ～ 350%)</p>
            </div>
            <p className="mt-2">アピールタイム 攻援：</p>
            <div className="px-4 py-2 bg-base-200 rounded-md w-fit">
              <p>
                ( <span className="text-red-500 border-b border-b-red-500">
                Σ( 攻援力 × ( <span className="font-bold italic">A</span>
                {" "}＋ <span className="font-bold italic">B</span> 合計 ) )</span>
                {" "}＋ SP応援効果 ＋ 部員呼出 )
              </p>
              <p>× ( 1 ＋ テンションゲージMAX(100%) )</p>
              <p>× ハート数補正(100% ～ 650%)</p>
            </div>
            <p className="mt-2">アピールタイム 守援：</p>
            <div className="px-4 py-2 bg-base-200 rounded-md w-fit">
              <p>
                ( <span className="text-red-500 border-b border-b-red-500">
                Σ( 守援力 × ( <span className="font-bold italic">A</span>
                {" "}＋ <span className="font-bold italic">B</span> 合計 ) )</span>
                {" "}＋ SP応援効果 ＋ 部員呼出 )
              </p>
              <p>× ハート数補正(100% ～ 650%)</p>
            </div>
            <p className="text-xs pl-4 mt-2">
              ※<span className="text-red-500">赤字部分</span> はガール毎に計算して合計する
            </p>
          </div>
        </FormulaSection>

        <FormulaSection
          title="聖櫻学園メモリアルストーリー"
          eventId="tower"
          comments={[
            "主センバツ：リーダー(1番左)は声援の発動率が 100 % なので声援が一番強い子にする。左から声援が強い順に並べる。",
            "【聖櫻ストーリー】は有利なガールが設定されていないことを除いて計算式が同じ。",
          ]}
        >
          {/* prettier-ignore */}
          <div className="md:pl-4 py-2 whitespace-nowrap">
            <div className="px-4 py-2 bg-base-200 rounded-md w-fit">
              <p>
                <span className="text-red-500 border-b border-b-red-500">
                Σ( 攻援力 × ( <span className="font-bold italic">A</span>
                {" "}＋ <span className="font-bold italic">B</span> 合計 )
                {" "}× ( 1 ＋ <span className="font-bold italic">C</span> ) )</span>
              </p>
            </div>
            <p className="text-xs pl-4 mt-2">
              ※<span className="text-red-500">赤字部分</span> はガール毎に計算して合計する
            </p>
          </div>
        </FormulaSection>

        <FormulaSection
          title="全国高校生課外活動コンテスト"
          eventId="divrace"
          comments={[
            "主センバツ：リーダー(1番左)は声援の発動率が 100 % なので声援が一番強い子にする。左から声援が強い順に並べる。",
          ]}
        >
          {/* prettier-ignore */}
          <div className="md:pl-4 py-2 whitespace-nowrap">
            <div className="px-4 py-2 bg-base-200 rounded-md w-fit">
              <p>
                ( <span className="text-red-500 border-b border-b-red-500">
                Σ( 攻援力 × ( <span className="font-bold italic">A</span>
                {" "}＋ <span className="font-bold italic">B</span> 合計 ) )</span>
                {" "}＋ SP応援効果 ＋ 風向きアイテム効果 )
              </p>
              <p>× ハート数補正(1、6、15)</p>
            </div>
            <p className="text-xs pl-4 mt-2">
              ※<span className="text-red-500">赤字部分</span> はガール毎に計算して合計する
            </p>
          </div>
        </FormulaSection>

        <FormulaSection
          title="散策♪聖櫻ワールド"
          eventId="board"
          comments={[
            "主センバツ：リーダー(1番左)は声援の発動率が 100 % なので声援が一番強い子にする。左から声援が強い順に並べる。",
          ]}
        >
          {/* prettier-ignore */}
          <div className="md:pl-4 py-2 whitespace-nowrap">
            <div className="px-4 py-2 bg-base-200 rounded-md w-fit">
              <p>
                ( <span className="text-red-500 border-b border-b-red-500">
                Σ( 攻援力 × ( <span className="font-bold italic">A</span>
                {" "}＋ <span className="font-bold italic">B</span> 合計 ) )</span>
                {" "}＋ SP応援効果 ＋ マス効果 ＋ 天気効果 )
              </p>
              <p>× ハート数補正(1、6、15)</p>
            </div>
            <p className="text-xs pl-4 mt-2">
              ※<span className="text-red-500">赤字部分</span> はガール毎に計算して合計する
            </p>
          </div>
        </FormulaSection>

        <FormulaSection
          title="通常バトル"
          eventId="normal-battle"
          comments={[
            "主センバツ：リーダー(1番左)は声援の発動率が 100 % なので声援が一番強い子にする。左から声援が強い順に並べる。",
          ]}
        >
          {/* prettier-ignore */}
          <div className="md:pl-4 py-2 whitespace-nowrap">
            <div className="px-4 py-2 bg-base-200 rounded-md w-fit">
              <p>
                <span className="text-red-500 border-b border-b-red-500">
                Σ( 攻援力 × ( <span className="font-bold italic">A</span>
                {" "}＋ <span className="font-bold italic">B</span> 合計 ) )</span>
                {" "}× (1 ＋ 勝利後ボーナス(10%))
              </p>
            </div>
            <p className="text-xs pl-4 mt-2">
              ※<span className="text-red-500">赤字部分</span> はガール毎に計算して合計する
            </p>
          </div>
        </FormulaSection>
      </div>
      <ArticleFooter />
    </>
  );
}

function FormulaSection({
  title,
  eventId,
  comments,
  children,
}: {
  title: string;
  eventId: DeckSimulatorEventId;
  comments: string[];
  children: ReactNode;
}) {
  return (
    <section className="mt-4 mb-8 md:pl-4" id={eventId}>
      <h2 className="text-2xl/relaxed pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[10px]">
        {title}
      </h2>
      <div className="my-4 md:pl-4 leading-7">
        <h2 className="text-lg">発揮値計算式</h2>
        {children}

        <h2 className="text-lg mt-4">ボーナス有効率</h2>
        <BonusEffectiveRateTable eventId={eventId} />

        <h2 className="text-lg mt-4">声援</h2>
        <SkillProbabilityTable eventId={eventId} />

        <h2 className="text-lg mt-4">補足</h2>
        <div className="md:pl-4 py-2">
          {comments.map((c, i) => (
            <p
              key={i}
              className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]"
            >
              {c}
            </p>
          ))}
        </div>
      </div>
    </section>
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
