import {
  BONUS_DATA_PER_EVENT,
  TowerSpecialGirls,
} from "@/features/decksim/data/bonusData";
import TdDataCell from "@/features/decksim/components/manual/TdDataCell";

export default function BonusEventUniqueTower() {
  const specialGirls = BONUS_DATA_PER_EVENT.tower.eventUniqueBonus!.specialGirls
    .value as TowerSpecialGirls;
  return (
    <>
      <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-4 before:rounded before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[10px]">
        聖櫻学園メモリアルストーリー
      </h2>
      <div className="mb-6 md:pl-4 leading-7">
        <h3 className="text-lg mt-4 mb-2">有利なガールボーナス</h3>
        <table className="table table-xs md:table-md w-auto text-base whitespace-nowrap">
          <thead>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <th colSpan={2} rowSpan={2}></th>
              <th colSpan={9} className="text-center">
                声援Lv
              </th>
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <th className="text-center">Lv10</th>
              <th className="text-center">Lv11</th>
              <th className="text-center">Lv12</th>
              <th className="text-center">Lv13</th>
              <th className="text-center">Lv14</th>
              <th className="text-center">Lv15</th>
              <th className="text-center">Lv16</th>
              <th className="text-center">Lv17</th>
              <th className="text-center">Lv18</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td rowSpan={4} className="align-top">
                レアリティ
              </td>
              <td>ラブリー進展</td>
              <TdDataCell value={specialGirls.Luv.lv10} />
              <TdDataCell value={specialGirls.Luv.lv11} />
              <TdDataCell value={specialGirls.Luv.lv12} />
              <TdDataCell value={specialGirls.Luv.lv13} />
              <TdDataCell value={specialGirls.Luv.lv14} />
              <TdDataCell value={specialGirls.Luv.lv15} />
              <TdDataCell value={specialGirls.Luv.lv16} />
              <TdDataCell value={specialGirls.Luv.lv17} />
              <TdDataCell value={specialGirls.Luv.lv18} />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td>UR</td>
              <TdDataCell value={specialGirls.UR.lv10} />
              <TdDataCell value={specialGirls.UR.lv11} />
              <TdDataCell value={specialGirls.UR.lv12} />
              <TdDataCell value={specialGirls.UR.lv13} />
              <TdDataCell value={specialGirls.UR.lv14} />
              <TdDataCell value={specialGirls.UR.lv15} />
              <TdDataCell value={specialGirls.UR.lv16} />
              <TdDataCell value={specialGirls.UR.lv17} />
              <TdDataCell value={specialGirls.UR.lv18} />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td>SSR</td>
              <TdDataCell value={specialGirls.SSR.lv10} />
              <TdDataCell value={specialGirls.SSR.lv11} />
              <TdDataCell value={specialGirls.SSR.lv12} />
              <TdDataCell value={specialGirls.SSR.lv13} />
              <TdDataCell value={specialGirls.SSR.lv14} />
              <TdDataCell value={specialGirls.SSR.lv15} />
              <TdDataCell value={specialGirls.SSR.lv16} />
              <TdDataCell value={specialGirls.SSR.lv17} />
              <TdDataCell value={specialGirls.SSR.lv18} />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td>SR</td>
              <TdDataCell value={specialGirls.SR.lv10} />
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
