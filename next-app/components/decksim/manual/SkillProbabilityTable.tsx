import { EventType } from "@/components/decksim/data/eventData";
import { SKILL_DATA_PER_EVENT } from "@/components/decksim/data/skillData";

interface Props {
  eventType: EventType;
}

export default function SkillProbabilityTable({ eventType }: Props) {
  const skillData = SKILL_DATA_PER_EVENT[eventType];
  return (
    <div className="md:pl-4 py-2">
      <table className="table table-xs md:table-md w-auto text-base whitespace-nowrap">
        <thead>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <th rowSpan={2}></th>
            <th rowSpan={2} className="text-center">
              最大発動数
            </th>
            <th colSpan={10}>発動率</th>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <th className="text-center">1番目 (リーダー)</th>
            <th className="text-center">2番目</th>
            <th className="text-center">3番目</th>
            <th className="text-center">4番目</th>
            <th className="text-center">5番目</th>
            <th className="text-center">6番目</th>
            <th className="text-center">7番目</th>
            <th className="text-center">8番目</th>
            <th className="text-center">9番目</th>
            <th className="text-center">10番目</th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td>主センバツ</td>
            <td className="text-center">{`${skillData.skillMaxNumMain} 人`}</td>
            {skillData.skillProbabilityMain.map((r, i) => (
              <TdDataCell key={i} value={r} />
            ))}
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td>副センバツ (スイッチOFF)</td>
            <td className="text-center">{`${skillData.skillMaxNumSubSwitchOff} 人`}</td>
            {skillData.skillProbabilitySubSwitchOff.map((r, i) => (
              <TdDataCell key={i} value={r} />
            ))}
          </tr>
        </tbody>
      </table>
      {skillData.annotations && (
        <div className="mt-2 md:pl-4">
          {skillData.annotations.map((c, i) => (
            <p key={i} className="text-sm/relaxed">
              {`※ ${c}`}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
function TdDataCell({ value }: { value: number }) {
  let bgCss = "";
  if (value <= 0) {
    bgCss = "bg-invalid";
  }

  return (
    <td className={`text-right ${bgCss}`}>{`${value.toLocaleString("ja-JP", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })} %`}</td>
  );
}
