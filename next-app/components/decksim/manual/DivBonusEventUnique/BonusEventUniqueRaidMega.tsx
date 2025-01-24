import {
  BONUS_DATA_PER_EVENT,
  RaidTypeAdvantageMegaBonusMap,
} from "@/components/decksim/data/bonusData";
import TdDataCell from "@/components/decksim/manual/TdDataCell";

export default function BonusEventUniqueRaidMega() {
  const typeAdvantageBonusMap = BONUS_DATA_PER_EVENT.raidMega.eventUniqueBonus!
    .typeAdvantage.value as RaidTypeAdvantageMegaBonusMap;
  return (
    <>
      <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-4 before:rounded before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[10px]">
        たすけて！マイヒーロー メガ悪男
      </h2>
      <div className="mb-6 md:pl-4 leading-7">
        <h3 className="text-lg mt-4 mb-2">有利/不利タイプ補正</h3>
        <table className="table table-xs md:table-md w-auto text-base whitespace-nowrap">
          <thead>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <th rowSpan={2} colSpan={3}></th>
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
              <td rowSpan={9} className="align-top">ガールのタイプ</td>
              <td rowSpan={3} className="align-top">SWEET</td>
              <td>シーン</td>
              <TdDataCell value={typeAdvantageBonusMap.normal.sweet.scenes} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.sweet.sweet.scenes} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.cool.sweet.scenes} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.pop.sweet.scenes} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td>ストラップ</td>
              <TdDataCell value={typeAdvantageBonusMap.normal.sweet.strap} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.sweet.sweet.strap} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.cool.sweet.strap} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.pop.sweet.strap} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td>プレシャスシーン</td>
              <TdDataCell value={typeAdvantageBonusMap.normal.sweet.precious} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.sweet.sweet.precious} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.cool.sweet.precious} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.pop.sweet.precious} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td rowSpan={3} className="align-top">COOL</td>
              <td>シーン</td>
              <TdDataCell value={typeAdvantageBonusMap.normal.cool.scenes} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.sweet.cool.scenes} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.cool.cool.scenes} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.pop.cool.scenes} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td>ストラップ</td>
              <TdDataCell value={typeAdvantageBonusMap.normal.cool.strap} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.sweet.cool.strap} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.cool.cool.strap} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.pop.cool.strap} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td>プレシャスシーン</td>
              <TdDataCell value={typeAdvantageBonusMap.normal.cool.precious} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.sweet.cool.precious} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.cool.cool.precious} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.pop.cool.precious} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td rowSpan={3} className="align-top">POP</td>
              <td>シーン</td>
              <TdDataCell value={typeAdvantageBonusMap.normal.pop.scenes} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.sweet.pop.scenes} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.cool.pop.scenes} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.pop.pop.scenes} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td>ストラップ</td>
              <TdDataCell value={typeAdvantageBonusMap.normal.pop.strap} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.sweet.pop.strap} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.cool.pop.strap} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.pop.pop.strap} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td>プレシャスシーン</td>
              <TdDataCell value={typeAdvantageBonusMap.normal.pop.precious} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.sweet.pop.precious} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.cool.pop.precious} isBgOff />
              <TdDataCell value={typeAdvantageBonusMap.pop.pop.precious} isBgOff />
            </tr>
          </tbody>
        </table>
        <div className="mt-2 md:pl-4">
          <p className="text-sm/relaxed">
            ※ プレシャスシーンの場合は基礎とデートボーナス分には適用しない。
          </p>
        </div>
      </div>
    </>
  );
}
