import { useId } from "react";

export function UpdateHistory({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) {
  const modalId = useId();
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
                <tr>
                  <td className="p-1 md:p-2">2025/06/15</td>
                  <td className="p-1 md:p-2 min-w-20">リニューアル版でのたすけて！マイヒーロー、全国高校生課外活動コンテスト用のページを追加。</td>
                </tr>
                <tr>
                  <td className="p-1 md:p-2">2025/06/08</td>
                  <td className="p-1 md:p-2 min-w-20">リニューアル版での部活対抗！勧誘★グランプリと聖櫻学園★カリスマ決定戦、聖櫻学園メモリアルストーリー、散策♪聖櫻ワールド、通常バトル用のページを追加。</td>
                </tr>
                <tr>
                  <td className="p-1 md:p-2">2025/06/01</td>
                  <td className="p-1 md:p-2 min-w-20">リニューアル版でのおねがい★ハンターズ用のページを追加。</td>
                </tr>
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
