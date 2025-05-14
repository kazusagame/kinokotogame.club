import { DeckSimulatorEventId } from "@/components/decksim/data/eventData";
import {
  BONUS_DATA_PER_EVENT,
  BonusList,
  EventUniqueBonus,
} from "@/components/decksim/data/bonusData";

interface Props {
  eventId: DeckSimulatorEventId;
}

export default function BonusEffectiveRateTable({ eventId }: Props) {
  const bonusData = BONUS_DATA_PER_EVENT[eventId];
  return (
    <div className="md:pl-4 py-2">
      <table className="table table-xs md:table-md w-auto text-base whitespace-nowrap">
        <thead>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <th rowSpan={2}></th>
            <th className="text-lg font-bold italic border-l border-base-content">
              A
            </th>
            <th
              colSpan={12}
              className="text-lg font-bold italic border-l border-base-content"
            >
              B
            </th>
            {bonusData.eventUniqueBonus &&
              Object.values(bonusData.eventUniqueBonus).map(
                (v, i) =>
                  v.formulaVariable && (
                    <th
                      key={i}
                      className="text-lg font-bold italic border-l border-base-content"
                    >
                      {v.formulaVariable}
                    </th>
                  )
              )}
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <th className="text-center border-l border-base-content">基礎</th>
            <th className="text-center border-l border-base-content">
              タイプ一致
            </th>
            <th className="text-center">部活一致</th>
            <th className="text-center">部活設備</th>
            <th className="text-center">部活役職</th>
            <th className="text-center">センバツ</th>
            <th className="text-center">デート</th>
            <th className="text-center">タッチ</th>
            <th className="text-center">誕生日</th>
            <th className="text-center">コロン</th>
            <th className="text-center">ぷち効果</th>
            <th className="text-center">Ex進展</th>
            <th className="text-center">声援</th>
            {bonusData.eventUniqueBonus &&
              Object.values(bonusData.eventUniqueBonus).map(
                (v, i) =>
                  v.formulaVariable && (
                    <th
                      key={i}
                      className="text-center border-l border-base-content"
                    >
                      {v.formulaDisplayName}
                    </th>
                  )
              )}
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <th>(有効率 100 % 時のボーナス値)</th>
            <th className="text-center border-l border-base-content">
              (100 %)
            </th>
            <th className="text-center border-l border-base-content">(5 %)</th>
            <th className="text-center">(10 %)</th>
            <th className="text-center">(~ 9.2 %)</th>
            <th className="text-center">(~ 5 %)</th>
            <th className="text-center">(~ 156 %)</th>
            <th className="text-center">(~ 100 %)</th>
            <th className="text-center">(20 %)</th>
            <th className="text-center">(20 %)</th>
            <th className="text-center">(~ 20 %)</th>
            <th className="text-center">(~ 60 %)</th>
            <th className="text-center">(3 %)</th>
            <th className="text-center"></th>
            {bonusData.eventUniqueBonus &&
              Object.values(bonusData.eventUniqueBonus).map(
                (v, i) =>
                  v.formulaVariable && (
                    <th
                      key={i}
                      className="text-center border-l border-base-content"
                    >
                      {v.formulaDisplayValue}
                    </th>
                  )
              )}
          </tr>
        </thead>
        <tbody>
          <TrDataRow
            title={"主センバツ　ガール"}
            keyName="mainScenes"
            bonusList={bonusData.mainScenes}
            eventUniqueBonus={bonusData.eventUniqueBonus}
          />
          <TrDataRow
            title={"主センバツ　ストラップ"}
            keyName="mainStrap"
            bonusList={bonusData.mainStrap}
            eventUniqueBonus={bonusData.eventUniqueBonus}
          />
          <TrDataRow
            title={"主センバツ　プレシャス"}
            keyName="mainPrecious"
            bonusList={bonusData.mainPrecious}
            eventUniqueBonus={bonusData.eventUniqueBonus}
          />
          <TrDataRow
            title={"副センバツ　ガール"}
            keyName="subScenes"
            bonusList={bonusData.subScenes}
            eventUniqueBonus={bonusData.eventUniqueBonus}
          />
          <TrDataRow
            title={"副センバツ　プレシャス"}
            keyName="subPrecious"
            bonusList={bonusData.subPrecious}
            eventUniqueBonus={bonusData.eventUniqueBonus}
          />
          <TrDataRow
            title={"ぶちセンバツ"}
            keyName="petitGirls"
            bonusList={bonusData.petitGirls}
            eventUniqueBonus={bonusData.eventUniqueBonus}
          />
        </tbody>
      </table>
      {bonusData.annotations && (
        <div className="mt-2 md:pl-4">
          {bonusData.annotations.map((c, i) => (
            <p key={i} className="text-sm/relaxed">
              {`※ ${c}`}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function TdDataCell({
  value,
  isLeftBorder,
}: {
  value: number;
  isLeftBorder?: boolean;
}) {
  let borderCss = "";
  if (isLeftBorder) {
    borderCss = "border-l border-base-content";
  }
  let bgCss = "";
  if (value <= 0) {
    bgCss = "bg-invalid";
  }

  return <td className={`text-right ${borderCss} ${bgCss}`}>{`${value} %`}</td>;
}

function TrDataRow({
  title,
  keyName,
  bonusList,
  eventUniqueBonus,
}: {
  title: string;
  keyName:
    | "mainScenes"
    | "mainStrap"
    | "mainPrecious"
    | "subScenes"
    | "subPrecious"
    | "petitGirls";
  bonusList: BonusList;
  eventUniqueBonus: { [K: string]: EventUniqueBonus } | undefined;
}) {
  return (
    <tr className="odd:bg-base-300 even:bg-base-200">
      <td>{title}</td>
      <TdDataCell value={bonusList.base} isLeftBorder />
      <TdDataCell value={bonusList.typeMatch} isLeftBorder />
      <TdDataCell value={bonusList.clubMatch} />
      <TdDataCell value={bonusList.clubItem} />
      <TdDataCell value={bonusList.clubPosition} />
      <TdDataCell value={bonusList.deck} />
      <TdDataCell value={bonusList.date} />
      <TdDataCell value={bonusList.touch} />
      <TdDataCell value={bonusList.birthday} />
      <TdDataCell value={bonusList.mensCologne} />
      <TdDataCell value={bonusList.petitEffects} />
      <TdDataCell value={bonusList.limitBreak} />
      <TdDataCell value={bonusList.skill} />
      {eventUniqueBonus &&
        Object.values(eventUniqueBonus).map(
          (v, i) =>
            v[keyName] !== undefined && (
              <TdDataCell key={i} value={v[keyName]} isLeftBorder />
            )
        )}
    </tr>
  );
}
