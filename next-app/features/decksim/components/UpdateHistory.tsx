import { useId } from "react";

export function UpdateHistory({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) {
  const modalId = useId();
  const historyList = [
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
