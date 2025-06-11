import {
  BONUS_DATA_PER_EVENT,
  ClubcupSkillEffectMap,
} from "@/features/decksim/data/bonusData";
import TdDataCell from "@/features/decksim/components/manual/TdDataCell";

export default function BonusEventUniqueClubcup() {
  const skillEffectMap = BONUS_DATA_PER_EVENT.clubcup.eventUniqueBonus!
    .skillEffect.value as ClubcupSkillEffectMap;
  return (
    <>
      <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-4 before:rounded before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[10px]">
        部活対抗！勧誘★グランプリ
      </h2>
      <div className="mb-6 md:pl-4 leading-7">
        <h3 className="text-lg mt-4 mb-2">声援効果</h3>
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
              <TdDataCell value={skillEffectMap.Luv.lv10} />
              <TdDataCell value={skillEffectMap.Luv.lv11} />
              <TdDataCell value={skillEffectMap.Luv.lv12} />
              <TdDataCell value={skillEffectMap.Luv.lv13} />
              <TdDataCell value={skillEffectMap.Luv.lv14} />
              <TdDataCell value={skillEffectMap.Luv.lv15} />
              <TdDataCell value={skillEffectMap.Luv.lv16} />
              <TdDataCell value={skillEffectMap.Luv.lv17} />
              <TdDataCell value={skillEffectMap.Luv.lv18} />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td>UR</td>
              <TdDataCell value={skillEffectMap.UR.lv10} />
              <TdDataCell value={skillEffectMap.UR.lv11} />
              <TdDataCell value={skillEffectMap.UR.lv12} />
              <TdDataCell value={skillEffectMap.UR.lv13} />
              <TdDataCell value={skillEffectMap.UR.lv14} />
              <TdDataCell value={skillEffectMap.UR.lv15} />
              <TdDataCell value={skillEffectMap.UR.lv16} />
              <TdDataCell value={skillEffectMap.UR.lv17} />
              <TdDataCell value={skillEffectMap.UR.lv18} />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td>SSR</td>
              <TdDataCell value={skillEffectMap.SSR.lv10} />
              <TdDataCell value={skillEffectMap.SSR.lv11} />
              <TdDataCell value={skillEffectMap.SSR.lv12} />
              <TdDataCell value={skillEffectMap.SSR.lv13} />
              <TdDataCell value={skillEffectMap.SSR.lv14} />
              <TdDataCell value={skillEffectMap.SSR.lv15} />
              <TdDataCell value={skillEffectMap.SSR.lv16} />
              <TdDataCell value={skillEffectMap.SSR.lv17} />
              <TdDataCell value={skillEffectMap.SSR.lv18} />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td>SR</td>
              <TdDataCell value={skillEffectMap.SR.lv10} />
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
