import {
  BONUS_DATA_PER_EVENT,
  RaidTypeAdvantageSuperRareBonusMap,
  RaidComboMap,
} from "@/components/decksim/data/bonusData";
import TdDataCell from "@/components/decksim/manual/TdDataCell";

export default function BonusEventUniqueRaidSuperRare() {
  const typeAdvantageBonusMap = BONUS_DATA_PER_EVENT["raid-first"].eventUniqueBonus!
    .typeAdvantage.value as RaidTypeAdvantageSuperRareBonusMap;
  const comboBonusMap = BONUS_DATA_PER_EVENT["raid-first"].eventUniqueBonus!.combo
    .value as RaidComboMap;
  return (
    <>
      <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-4 before:rounded before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[10px]">
        たすけて！マイヒーロー 超レア (前半/後半)
      </h2>
      <div className="mb-6 md:pl-4 leading-7">
        <h3 className="text-lg mt-4 mb-2">有利/不利タイプ補正</h3>
        <table className="table table-xs md:table-md w-auto text-base whitespace-nowrap">
          <thead>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <th rowSpan={2} colSpan={2}></th>
              <th colSpan={4} className="text-center">
                悪男のタイプ
              </th>
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <th className="text-center">通常</th>
              <th className="text-center">SWEET</th>
              <th className="text-center">COOL</th>
              <th className="text-center">POP</th>
            </tr>
          </thead>
          {/* prettier-ignore */}
          <tbody>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td rowSpan={3} className="align-top">ガールのタイプ</td>
              <td>SWEET</td>
              <TdDataCell value={typeAdvantageBonusMap.normal.sweet} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.sweet.sweet} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.cool.sweet} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.pop.sweet} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td>COOL</td>
              <TdDataCell value={typeAdvantageBonusMap.normal.cool} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.sweet.cool} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.cool.cool} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.pop.cool} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td>POP</td>
              <TdDataCell value={typeAdvantageBonusMap.normal.pop} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.sweet.pop} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.cool.pop} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.pop.pop} isBgOff />
            </tr>
          </tbody>
        </table>

        <h3 className="text-lg mt-4 mb-2">コンボ補正</h3>
        <table className="table table-xs md:table-md w-auto text-base whitespace-nowrap">
          <thead>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <th>コンボ数</th>
              <th className="text-center">補正値</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td className="text-center">0</td>
              <TdDataCell value={comboBonusMap[0]} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td className="text-center">1 ～ </td>
              <TdDataCell value={comboBonusMap[1]} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td className="text-center">5 ～ </td>
              <TdDataCell value={comboBonusMap[5]} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td className="text-center">10 ～ </td>
              <TdDataCell value={comboBonusMap[10]} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td className="text-center">50 ～ </td>
              <TdDataCell value={comboBonusMap[50]} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td className="text-center">100 ～ </td>
              <TdDataCell value={comboBonusMap[100]} isBgOff />
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
