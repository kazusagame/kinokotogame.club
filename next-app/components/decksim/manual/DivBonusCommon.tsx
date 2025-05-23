import { BONUS_DATA_COMMON } from "@/components/decksim/data/bonusData";
import TdDataCell from "@/components/decksim/manual/TdDataCell";

export default function DivBonusCommon() {
  return (
    <div className="my-4 md:pl-4 leading-7">
      <table className="table table-xs md:table-md w-auto text-base whitespace-nowrap">
        <thead>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <th></th>
            <th></th>
            <th className="text-center">攻援力</th>
            <th className="text-center">守援力</th>
            <th className="text-center">備考</th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td colSpan={2}>
              <p>タイプ一致ボーナス</p>
              <p className="text-xs mt-2">
                (正式名称：タイプが一緒★相性ボーナス)
              </p>
            </td>
            <TdDataCell value={BONUS_DATA_COMMON.typeMatch.attack} />
            <TdDataCell value={BONUS_DATA_COMMON.typeMatch.defense} />
            <td></td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td colSpan={2}>
              <p>部活一致ボーナス</p>
              <p className="text-xs mt-2">
                (正式名称：部活タイプが一緒♪(部活タイプボーナス))
              </p>
            </td>
            <TdDataCell value={BONUS_DATA_COMMON.clubMatch.attack} />
            <TdDataCell value={BONUS_DATA_COMMON.clubMatch.defense} />
            <td></td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td colSpan={2}>
              <p>部活設備ボーナス</p>
              <p className="text-xs mt-2">(正式名称：部室ボーナス)</p>
            </td>
            <TdDataCell value={BONUS_DATA_COMMON.clubItem.attack} />
            <TdDataCell value={BONUS_DATA_COMMON.clubItem.defense} />
            <td></td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td rowSpan={5} className="align-top">
              <p>部活役職ボーナス</p>
              <p className="text-xs mt-2">(正式名称：応援ボーナス)</p>
            </td>
            <td>部長</td>
            <TdDataCell value={BONUS_DATA_COMMON.clubPosition.attack.leader} />
            <TdDataCell value={BONUS_DATA_COMMON.clubPosition.defense.leader} />
            <td></td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td>副部長</td>
            <TdDataCell
              value={BONUS_DATA_COMMON.clubPosition.attack.subLeader}
            />
            <TdDataCell
              value={BONUS_DATA_COMMON.clubPosition.defense.subLeader}
            />
            <td></td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td>攻キャプテン</td>
            <TdDataCell
              value={BONUS_DATA_COMMON.clubPosition.attack.attackCaptain}
            />
            <TdDataCell
              value={BONUS_DATA_COMMON.clubPosition.defense.attackCaptain}
            />
            <td></td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td>守キャプテン</td>
            <TdDataCell
              value={BONUS_DATA_COMMON.clubPosition.attack.defenseCaptain}
            />
            <TdDataCell
              value={BONUS_DATA_COMMON.clubPosition.defense.defenseCaptain}
            />
            <td></td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td>部員</td>
            <TdDataCell value={BONUS_DATA_COMMON.clubPosition.attack.member} />
            <TdDataCell value={BONUS_DATA_COMMON.clubPosition.defense.member} />
            <td></td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td rowSpan={4} className="align-top">
              デートボーナス
            </td>
            <td>ラブリー進展</td>
            <TdDataCell value={BONUS_DATA_COMMON.date.attack.Luv} />
            <TdDataCell value={BONUS_DATA_COMMON.date.defense.Luv} />
            <td></td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td>UR</td>
            <TdDataCell value={BONUS_DATA_COMMON.date.attack.UR} />
            <TdDataCell value={BONUS_DATA_COMMON.date.defense.UR} />
            <td></td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td>SSR</td>
            <TdDataCell value={BONUS_DATA_COMMON.date.attack.SSR} />
            <TdDataCell value={BONUS_DATA_COMMON.date.defense.SSR} />
            <td></td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td>SR</td>
            <TdDataCell value={BONUS_DATA_COMMON.date.attack.SR} />
            <TdDataCell value={BONUS_DATA_COMMON.date.defense.SR} />
            <td></td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td colSpan={2}>タッチボーナス</td>
            <TdDataCell value={BONUS_DATA_COMMON.touch.attack} />
            <TdDataCell value={BONUS_DATA_COMMON.touch.defense} />
            <td></td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td colSpan={2}>誕生日ボーナス</td>
            <TdDataCell value={BONUS_DATA_COMMON.birthday.attack} />
            <TdDataCell value={BONUS_DATA_COMMON.birthday.defense} />
            <td></td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td colSpan={2}>メンズコロン効果</td>
            <td className="text-right">Lv × 0.2 %</td>
            <td className="text-right">Lv × 0.2 %</td>
            <td></td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td colSpan={2}>Ex進展ボーナス</td>
            <TdDataCell value={BONUS_DATA_COMMON.limitBreak.attack} />
            <TdDataCell value={BONUS_DATA_COMMON.limitBreak.defense} />
            <td>発動率 {BONUS_DATA_COMMON.limitBreak.probability} %</td>
          </tr>
        </tbody>
      </table>

      <table className="table table-xs md:table-md w-auto text-base whitespace-nowrap mt-4">
        <thead>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <th rowSpan={2} colSpan={2}></th>
            <th colSpan={8} className="text-center">
              攻援力 / 守援力
            </th>
            <th rowSpan={2} className="text-center">
              備考
            </th>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <th className="text-center">Lv1</th>
            <th className="text-center">Lv2</th>
            <th className="text-center">Lv3</th>
            <th className="text-center">Lv4</th>
            <th className="text-center">Lv5</th>
            <th className="text-center">Lv6</th>
            <th className="text-center">Lv7</th>
            <th className="text-center">Lv8</th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td rowSpan={4} className="align-top">
              センバツボーナス
            </td>
            <td>通常</td>
            <TdDataCell value={BONUS_DATA_COMMON.deck.normal.both.lv1} />
            <TdDataCell value={BONUS_DATA_COMMON.deck.normal.both.lv2} />
            <TdDataCell value={BONUS_DATA_COMMON.deck.normal.both.lv3} />
            <TdDataCell value={BONUS_DATA_COMMON.deck.normal.both.lv4} />
            <TdDataCell value={BONUS_DATA_COMMON.deck.normal.both.lv5} />
            <TdDataCell value={BONUS_DATA_COMMON.deck.normal.both.lv6} />
            <TdDataCell value={BONUS_DATA_COMMON.deck.normal.both.lv7} />
            <TdDataCell value={BONUS_DATA_COMMON.deck.normal.both.lv8} />
            <td>攻援片面、守援片面、攻守両面の3種類がある。</td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td>シャイニング★スプラッシュ</td>
            <TdDataCell value={BONUS_DATA_COMMON.deck.shine.both.lv1} />
            <TdDataCell value={BONUS_DATA_COMMON.deck.shine.both.lv2} />
            <TdDataCell value={BONUS_DATA_COMMON.deck.shine.both.lv3} />
            <TdDataCell value={BONUS_DATA_COMMON.deck.shine.both.lv4} />
            <TdDataCell value={BONUS_DATA_COMMON.deck.shine.both.lv5} />
            <td></td>
            <td></td>
            <td></td>
            <td>キラ★ガール専用。攻守両面。</td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td>Precious★Friend</td>
            <TdDataCell value={BONUS_DATA_COMMON.deck.precious.both.lv1} />
            <TdDataCell value={BONUS_DATA_COMMON.deck.precious.both.lv2} />
            <TdDataCell value={BONUS_DATA_COMMON.deck.precious.both.lv3} />
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>レアリティSSRのフレンドぷちガールちゃん専用。攻守両面。</td>
          </tr>
          <tr className="odd:bg-base-200 even:bg-base-300">
            <td>Precious★Friend+</td>
            <TdDataCell
              value={BONUS_DATA_COMMON.deck.preciousPlus.both.lv1}
              isTemp
            />
            <TdDataCell
              value={BONUS_DATA_COMMON.deck.preciousPlus.both.lv2}
              isTemp
            />
            <TdDataCell
              value={BONUS_DATA_COMMON.deck.preciousPlus.both.lv3}
              isTemp
            />
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>レアリティURのフレンドぷちガールちゃん専用。攻守両面。</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-6">
        <span className="bg-temp px-2 py-1 mr-2">黄色</span>は暫定値
      </p>
    </div>
  );
}
