import Image from "next-export-optimize-images/image";

export function DeckSimulatorHowToUse() {
  return (
    <section className="flex flex-col gap-4 my-2 px-2 md:px-4 leading-7 sm:max-w-screen-sm">
      <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
        本ページのシミュレーターは、ゲーム側でそのセンバツを使用する前に、期待したタイムラインの通りにハンター声援センバツの声援が発動するかどうかや、アタック毎のダメージ声援の合計値を確認できることを目標に作成しています。
      </p>
      <div className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
        <Image
          src="/image/decksim/raidwarSkill/01_attackPattern.png"
          alt="アタックパターン選択の画像"
          width={362}
          height={330}
          className="w-1/3 mb-2"
        />
        <p>
          まずはアタックパターンを選択します。ここでは夜行性に対してどのようなパターンで捕獲を試みるのかを選びます。
        </p>
      </div>
      <div className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
        <Image
          src="/image/decksim/raidwarSkill/02_deck.png"
          alt="ハンター声援センバツの画像"
          width={756}
          height={257}
          className="w-full mb-2"
        />
        <p>
          次にハンター声援センバツグループのデータを入力していきます。
          ダメージ系声援の場合は攻援力の何%分のダメージなのかと、発動に必要なハート数を入力します。
          能力UP系声援の場合はダメージ%欄は空欄のままか、もしくは{" 0 "}
          にしてハート数を入力します。
        </p>
        <p>
          助っ人欄 (班員からレンタルする予定のガール) は省略可です。
          また、確実にそこまでは発動しないメンバーも省略できます。
        </p>
      </div>
      <div className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
        <Image
          src="/image/decksim/raidwarSkill/03_timeline.png"
          alt="タイムラインの画像"
          width={750}
          height={357}
          className="w-full mb-2"
        />
        <p>
          ここまでに入力したデータに基づいて画像のようなタイムラインが形成されます。
        </p>
        <p>
          時系列は上から下の順になっています。
          横の破線は選択したアタックパターンに基づいて描写します。
          この線はどのタイミングで声援発動の判定が行われるのかを表しています。
        </p>
        <p>
          各ガールの声援の発動に必要なハートの充足状況は四角形で表されています。
          四角形の下辺に到達した時点で発動条件を満たしたことになります。
        </p>
        <p>
          右側にはアタック毎に飴何個分のダメージを与えられるのかを表示していています。
          区間は1つ前のアタックからの差分値で、合計はその時点でのトータルのダメージ数値です。左側はダメージ声援の合計%値で、右側はさらに飴や炭酸などによる通常のアタック分も加算した数値です。
        </p>
      </div>
      <div className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-primary before:inline-block before:absolute before:left-0 before:top-[12px]">
        <Image
          src="/image/decksim/raidwarSkill/04_ngPattern.png"
          alt="NGパターンの画像"
          width={270}
          height={157}
          className="w-1/3 mb-2"
        />
        <p>
          パターンによってはタイムライン中にこのようなバツ印が表示されることがあります。
          これはその箇所でハートの繰り越しあふれが発生している状態を表しています。
          1回のアタックで発動できる声援はラインごとに最大1つまでというゲーム側の仕様を再現したものであり、なるべくこの表示が出ないようなセンバツ構成になるとハートの無駄が少ないです。
        </p>
      </div>
    </section>
  );
}
