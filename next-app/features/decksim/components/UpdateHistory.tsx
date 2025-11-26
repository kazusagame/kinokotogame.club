import { useId } from "react";

export function UpdateHistory({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) {
  const modalId = useId();
  const historyList = [
    {
      date: "2025/11/26",
      desc: "散策♪聖櫻ワールドの天気データを2025年11月版に差し替え。",
    },
    {
      date: "2025/11/16",
      desc: "プレシャスシーンに[高鳴る鼓動]真白透子を追加。",
    },
    {
      date: "2025/11/02",
      desc: "プレシャスシーンに[私好みに]上条るい、[13周年]メモリアルを追加。[アツい展開]姫島木乃子の減衰係数を変更。",
    },
    {
      date: "2025/09/27",
      desc: "フレンドぷちガールちゃんのレアリティUR周りの数値を一部差し替え。",
    },
    {
      date: "2025/09/21",
      desc: "全国高校生課外活動コンテストの風向きアイテムのデータを2025年9月版に差し替え。",
    },
    {
      date: "2025/08/30",
      desc: "ぷちセンバツの応援力効果をレアリティ設定からLv選択式に変更。プレシャスシーンに[アツい展開]姫島木乃子を暫定値で追加。",
    },
    {
      date: "2025/08/18",
      desc: "プレシャスシーンに[総選挙2024]メモリアルを追加。",
    },
    {
      date: "2025/07/18",
      desc: "プレシャスシーンに[伝えたくて]玉井麗巳を追加。[勘違いﾊﾟﾆｯｸ]加賀美茉莉の減衰係数を変更。",
    },
    {
      date: "2025/07/01",
      desc: "声援データに単タイプ、主+副1、攻守超スーパー特大UPを追加。",
    },
    {
      date: "2025/06/26",
      desc: "散策♪聖櫻ワールドの天気データを2025年6月版に差し替え。",
    },
    {
      date: "2025/06/13",
      desc: "リニューアル版でのたすけて！マイヒーロー、全国高校生課外活動コンテスト用のページを追加。",
    },
    {
      date: "2025/06/08",
      desc: "リニューアル版での部活対抗！勧誘★グランプリと聖櫻学園★カリスマ決定戦、聖櫻学園メモリアルストーリー、散策♪聖櫻ワールド、通常バトル用のページを追加。",
    },
    {
      date: "2025/06/01",
      desc: "リニューアル版でのおねがい★ハンターズ用のページを追加。",
    },
  ];

  return (
    <dialog id={modalId} className="modal modal-open" open>
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => handleCloseModal()}
          >
            ✕
          </button>
          <div className="flex flex-col gap-6 mt-6">
            <h2 className="text-lg font-bold">更新履歴</h2>
            <table className="table table-xs md:table-md w-auto mt-2">
              <thead>
                <tr>
                  <th className="p-1 md:p-2">更新日</th>
                  <th className="p-1 md:p-2 min-w-20">内容</th>
                </tr>
              </thead>
              <tbody>
                {historyList.map(({ date, desc }) => (
                  <tr key={date}>
                    <td className="p-1 md:p-2">{date}</td>
                    <td className="p-1 md:p-2 min-w-20">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={() => handleCloseModal()}>
        <button>close</button>
      </div>
    </dialog>
  );
}
