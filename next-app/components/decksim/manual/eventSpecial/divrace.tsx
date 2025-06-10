import Image from "next-export-optimize-images/image";

export function DivraceSpecialManual() {
  return (
    <section className="">
      <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
        イベント固有（全国高校生課外活動コンテスト）
      </h2>
      <Image
        src="/image/decksim/deckSimulator/57_divrace_special.png"
        alt="イベント固有（全国高校生課外活動コンテスト）の登録画面"
        width={867}
        height={772}
        className="mt-4 mb-2 ml-4 w-5/6"
      />
      <div className="my-2 md:pl-4">
        <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
          <tbody>
            <tr>
              <td className="whitespace-nowrap">SP応援効果</td>
              <td>SP応援効果の合計値を入力します。</td>
            </tr>
            <tr>
              <td className="whitespace-nowrap">風向きアイテム</td>
              <td>
                センバツの設定に基づいて計算された各アイテムの実際の効果期待値が表示されています。
                <br />
                使用中欄にチェックを入れると計算結果にそのアイテムの効果値が加算されます。
                ステージによって風向きアイテムの効果が変わるため、ステージ名も合わせて選択するようにします。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
