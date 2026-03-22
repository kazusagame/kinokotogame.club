import { useId } from "react";
import { updateHistoryList } from "@/features/decksim/updateHistoryLIst";

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
                {updateHistoryList.map(({ date, desc }) => (
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
