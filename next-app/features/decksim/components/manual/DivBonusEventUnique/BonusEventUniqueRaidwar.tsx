import {
  BONUS_DATA_PER_EVENT,
  RaidwarComboMap,
} from "@/features/decksim/data/bonusData";
import TdDataCell from "@/features/decksim/components/manual/TdDataCell";

export default function BonusEventUniqueRaidwar() {
  const comboBonusMap = BONUS_DATA_PER_EVENT.raidwar.eventUniqueBonus!.combo
    .value as RaidwarComboMap;
  return (
    <>
      <h2 className="text-xl/relaxed pl-4 relative before:w-2 before:h-4 before:rounded before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[10px]">
        おねがい★ハンターズ
      </h2>
      <div className="mb-6 md:pl-4 leading-7">
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
              <td className="text-center">6</td>
              <TdDataCell value={comboBonusMap[6]} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td className="text-center">12</td>
              <TdDataCell value={comboBonusMap[12]} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td className="text-center">18</td>
              <TdDataCell value={comboBonusMap[18]} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td className="text-center">24</td>
              <TdDataCell value={comboBonusMap[24]} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td className="text-center">30</td>
              <TdDataCell value={comboBonusMap[30]} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td className="text-center">36</td>
              <TdDataCell value={comboBonusMap[36]} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td className="text-center">42</td>
              <TdDataCell value={comboBonusMap[42]} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td className="text-center">48</td>
              <TdDataCell value={comboBonusMap[48]} isBgOff />
            </tr>
            <tr className="odd:bg-base-200 even:bg-base-300">
              <td className="text-center">50 ～ </td>
              <TdDataCell value={comboBonusMap[50]} isBgOff />
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
