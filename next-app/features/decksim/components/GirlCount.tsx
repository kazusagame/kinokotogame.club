import { useId } from "react";

import { EventId } from "@/features/decksim/data/eventData";
import { DeckSimulatorGirlCount } from "@/features/decksim/type-definitions/DeckSimulatorGirlCount";

export function GirlCount({
  eventId,
  girlCount,
  handleCloseModal,
}: {
  eventId: EventId;
  girlCount: DeckSimulatorGirlCount | undefined;
  handleCloseModal: () => void;
}) {
  const modalId = useId();

  // costにキーが存在しなければガールは未登録とみなす
  const isValidGirlCount =
    girlCount !== undefined &&
    (Object.keys(girlCount.attack.cost).length > 0 ||
      Object.keys(girlCount.defense.cost).length > 0);

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
          {isValidGirlCount ? (
            <div className="flex flex-col gap-4 mt-6">
              <h2 className="text-lg font-bold">センバツ内ガール集計結果</h2>
              <hr className="border-gray-300" />
              {eventId === "raid-second" ? (
                <>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-bold">攻援センバツ</h2>
                    <RarityTable
                      girlCount={girlCount}
                      eventId={eventId}
                      attackOrDefense="attack"
                    />
                    <CostTable
                      girlCount={girlCount}
                      eventId={eventId}
                      attackOrDefense="attack"
                    />
                    <SkillLvTable
                      girlCount={girlCount}
                      eventId={eventId}
                      attackOrDefense="attack"
                    />
                    <GradeTable
                      girlCount={girlCount}
                      eventId={eventId}
                      attackOrDefense="attack"
                    />
                    <ClubMatchTable
                      girlCount={girlCount}
                      eventId={eventId}
                      attackOrDefense="attack"
                    />
                    <LimitBreakTable
                      girlCount={girlCount}
                      eventId={eventId}
                      attackOrDefense="attack"
                    />
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-bold">守援センバツ</h2>
                    <RarityTable
                      girlCount={girlCount}
                      eventId={eventId}
                      attackOrDefense="defense"
                    />
                    <CostTable
                      girlCount={girlCount}
                      eventId={eventId}
                      attackOrDefense="defense"
                    />
                    <SkillLvTable
                      girlCount={girlCount}
                      eventId={eventId}
                      attackOrDefense="defense"
                    />
                    <GradeTable
                      girlCount={girlCount}
                      eventId={eventId}
                      attackOrDefense="defense"
                    />
                    <ClubMatchTable
                      girlCount={girlCount}
                      eventId={eventId}
                      attackOrDefense="defense"
                    />
                    <LimitBreakTable
                      girlCount={girlCount}
                      eventId={eventId}
                      attackOrDefense="defense"
                    />
                  </div>
                </>
              ) : eventId === "championship-defense" ? (
                <div className="flex flex-col gap-4">
                  <RarityTable
                    girlCount={girlCount}
                    eventId={eventId}
                    attackOrDefense="defense"
                  />
                  <CostTable
                    girlCount={girlCount}
                    eventId={eventId}
                    attackOrDefense="defense"
                  />
                  <SkillLvTable
                    girlCount={girlCount}
                    eventId={eventId}
                    attackOrDefense="defense"
                  />
                  <GradeTable
                    girlCount={girlCount}
                    eventId={eventId}
                    attackOrDefense="defense"
                  />
                  <ClubMatchTable
                    girlCount={girlCount}
                    eventId={eventId}
                    attackOrDefense="defense"
                  />
                  <LimitBreakTable
                    girlCount={girlCount}
                    eventId={eventId}
                    attackOrDefense="defense"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <RarityTable
                    girlCount={girlCount}
                    eventId={eventId}
                    attackOrDefense="attack"
                  />
                  <CostTable
                    girlCount={girlCount}
                    eventId={eventId}
                    attackOrDefense="attack"
                  />
                  <SkillLvTable
                    girlCount={girlCount}
                    eventId={eventId}
                    attackOrDefense="attack"
                  />
                  <GradeTable
                    girlCount={girlCount}
                    eventId={eventId}
                    attackOrDefense="attack"
                  />
                  {eventId !== "tower" &&
                    eventId !== "divrace" &&
                    eventId !== "board" && (
                      <ClubMatchTable
                        girlCount={girlCount}
                        eventId={eventId}
                        attackOrDefense="attack"
                      />
                    )}
                  <LimitBreakTable
                    girlCount={girlCount}
                    eventId={eventId}
                    attackOrDefense="attack"
                  />
                </div>
              )}
            </div>
          ) : (
            <p className="mt-6 text-center text-gray-600 italic">
              ガールを登録していくとこちらに集計結果が表示されます。
            </p>
          )}
        </form>
      </div>
      <div className="modal-backdrop" onClick={() => handleCloseModal()}>
        <button>close</button>
      </div>
    </dialog>
  );
}

function RarityTable({
  girlCount,
  eventId,
  attackOrDefense,
}: {
  girlCount: DeckSimulatorGirlCount;
  eventId: EventId;
  attackOrDefense: "attack" | "defense";
}) {
  return (
    <div className="flex flex-col">
      <h3 className="text-md font-bold">レアリティ別</h3>
      <table className="table table-xs md:table-md w-auto">
        <thead>
          <tr>
            <th className="p-1 md:p-2 w-16"></th>
            <th className="p-1 md:p-2 text-center">SWEETタイプ</th>
            <th className="p-1 md:p-2 text-center">COOLタイプ</th>
            <th className="p-1 md:p-2 text-center">POPタイプ</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(girlCount[attackOrDefense].rarity).map(
            ([rarity, count]) => {
              if (
                count.SWEETタイプ === 0 &&
                count.COOLタイプ === 0 &&
                count.POPタイプ === 0
              ) {
                return null;
              }
              return (
                <tr key={rarity}>
                  <td className="p-1 md:p-2 text-center">{rarity}</td>
                  <td className="p-1 md:p-2 text-center">
                    {count.SWEETタイプ}
                  </td>
                  <td className="p-1 md:p-2 text-center">{count.COOLタイプ}</td>
                  <td className="p-1 md:p-2 text-center">{count.POPタイプ}</td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </div>
  );
}

function CostTable({
  girlCount,
  eventId,
  attackOrDefense,
}: {
  girlCount: DeckSimulatorGirlCount;
  eventId: EventId;
  attackOrDefense: "attack" | "defense";
}) {
  const sortedCostsDesc = Object.keys(girlCount[attackOrDefense].cost)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="flex flex-col">
      <h3 className="text-md font-bold">コスト別</h3>
      <table className="table table-xs md:table-md w-auto">
        <thead>
          <tr>
            <th className="p-1 md:p-2 w-16"></th>
            <th className="p-1 md:p-2 text-center">SWEETタイプ</th>
            <th className="p-1 md:p-2 text-center">COOLタイプ</th>
            <th className="p-1 md:p-2 text-center">POPタイプ</th>
          </tr>
        </thead>
        <tbody>
          {sortedCostsDesc.map((cost) => {
            const count = girlCount[attackOrDefense].cost[cost];

            if (
              count.SWEETタイプ === 0 &&
              count.COOLタイプ === 0 &&
              count.POPタイプ === 0
            ) {
              return null;
            }
            return (
              <tr key={cost}>
                <td className="p-1 md:p-2 text-center">{cost}</td>
                <td className="p-1 md:p-2 text-center">{count.SWEETタイプ}</td>
                <td className="p-1 md:p-2 text-center">{count.COOLタイプ}</td>
                <td className="p-1 md:p-2 text-center">{count.POPタイプ}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SkillLvTable({
  girlCount,
  eventId,
  attackOrDefense,
}: {
  girlCount: DeckSimulatorGirlCount;
  eventId: EventId;
  attackOrDefense: "attack" | "defense";
}) {
  const sortedSkillLvDesc = Object.keys(girlCount[attackOrDefense].skillLv)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="flex flex-col">
      <h3 className="text-md font-bold">声援レベル別</h3>
      <table className="table table-xs md:table-md w-auto">
        <thead>
          <tr>
            <th className="p-1 md:p-2 w-16"></th>
            <th className="p-1 md:p-2 text-center">SWEETタイプ</th>
            <th className="p-1 md:p-2 text-center">COOLタイプ</th>
            <th className="p-1 md:p-2 text-center">POPタイプ</th>
          </tr>
        </thead>
        <tbody>
          {sortedSkillLvDesc.map((skillLv) => {
            const count = girlCount[attackOrDefense].skillLv[skillLv];

            if (
              count.SWEETタイプ === 0 &&
              count.COOLタイプ === 0 &&
              count.POPタイプ === 0
            ) {
              return null;
            }
            return (
              <tr key={skillLv}>
                <td className="p-1 md:p-2 text-center">{skillLv}</td>
                <td className="p-1 md:p-2 text-center">{count.SWEETタイプ}</td>
                <td className="p-1 md:p-2 text-center">{count.COOLタイプ}</td>
                <td className="p-1 md:p-2 text-center">{count.POPタイプ}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function GradeTable({
  girlCount,
  eventId,
  attackOrDefense,
}: {
  girlCount: DeckSimulatorGirlCount;
  eventId: EventId;
  attackOrDefense: "attack" | "defense";
}) {
  return (
    <div className="flex flex-col">
      <h3 className="text-md font-bold">学年別</h3>
      <table className="table table-xs md:table-md w-auto">
        <thead>
          <tr>
            <th className="p-1 md:p-2 w-16"></th>
            <th className="p-1 md:p-2 text-center">SWEETタイプ</th>
            <th className="p-1 md:p-2 text-center">COOLタイプ</th>
            <th className="p-1 md:p-2 text-center">POPタイプ</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(girlCount[attackOrDefense].grade).map(
            ([grade, count]) => {
              return (
                <tr key={grade}>
                  <td className="p-1 md:p-2 text-center">{grade}</td>
                  <td className="p-1 md:p-2 text-center">
                    {count.SWEETタイプ}
                  </td>
                  <td className="p-1 md:p-2 text-center">{count.COOLタイプ}</td>
                  <td className="p-1 md:p-2 text-center">{count.POPタイプ}</td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </div>
  );
}

function ClubMatchTable({
  girlCount,
  eventId,
  attackOrDefense,
}: {
  girlCount: DeckSimulatorGirlCount;
  eventId: EventId;
  attackOrDefense: "attack" | "defense";
}) {
  return (
    <div className="flex flex-col">
      <h3 className="text-md font-bold">部活</h3>
      <table className="table table-xs md:table-md w-auto">
        <thead>
          <tr>
            <th className="p-1 md:p-2 w-16"></th>
            <th className="p-1 md:p-2 text-center">SWEETタイプ</th>
            <th className="p-1 md:p-2 text-center">COOLタイプ</th>
            <th className="p-1 md:p-2 text-center">POPタイプ</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(girlCount[attackOrDefense].isClubMatch).map(
            ([isClubMatch, count]) => {
              return (
                <tr key={isClubMatch}>
                  <td className="p-1 md:p-2 text-center">
                    {isClubMatch === "true" ? "一致" : "不一致"}
                  </td>
                  <td className="p-1 md:p-2 text-center">
                    {count.SWEETタイプ}
                  </td>
                  <td className="p-1 md:p-2 text-center">{count.COOLタイプ}</td>
                  <td className="p-1 md:p-2 text-center">{count.POPタイプ}</td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
      {(eventId === "clubcup" ||
        eventId === "championship" ||
        eventId === "championship-defense" ||
        eventId === "normal-battle") && (
        <p className="mx-4 mt-2 text-xs text-gray-600">
          こちらは部活一致ボーナスの有無の関係で主センバツのみの集計結果です。
        </p>
      )}
    </div>
  );
}

function LimitBreakTable({
  girlCount,
  eventId,
  attackOrDefense,
}: {
  girlCount: DeckSimulatorGirlCount;
  eventId: EventId;
  attackOrDefense: "attack" | "defense";
}) {
  return (
    <div className="flex flex-col">
      <h3 className="text-md font-bold">Ex進展</h3>
      <table className="table table-xs md:table-md w-auto">
        <thead>
          <tr>
            <th className="p-1 md:p-2 w-16"></th>
            <th className="p-1 md:p-2 text-center">SWEETタイプ</th>
            <th className="p-1 md:p-2 text-center">COOLタイプ</th>
            <th className="p-1 md:p-2 text-center">POPタイプ</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(girlCount[attackOrDefense].isLimitBreak).map(
            ([isLimitBreak, count]) => {
              return (
                <tr key={isLimitBreak}>
                  <td className="p-1 md:p-2 text-center">
                    {isLimitBreak === "true" ? "進展済" : "未進展"}
                  </td>
                  <td className="p-1 md:p-2 text-center">
                    {count.SWEETタイプ}
                  </td>
                  <td className="p-1 md:p-2 text-center">{count.COOLタイプ}</td>
                  <td className="p-1 md:p-2 text-center">{count.POPタイプ}</td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
      <p className="mx-4 mt-2 text-xs text-gray-600">
        ラブリー進展ガール（レアリティ：Luv）もここではEx進展済みとしてカウントします。
      </p>
    </div>
  );
}
