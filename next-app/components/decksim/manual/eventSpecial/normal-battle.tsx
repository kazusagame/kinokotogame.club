export function NormalBattleSpecialManual() {
  return (
    <section className="">
      <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
        イベント固有（通常バトル）
      </h2>
      <div className="my-2 md:pl-4">
        <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
          <tbody>
            <tr>
              <td className="whitespace-nowrap">勝利後ボーナス</td>
              <td>
                誰かとのバトル勝利後に10分間、発生する攻援力ボーナス（10%）を加算する場合はチェックを入れます。
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
