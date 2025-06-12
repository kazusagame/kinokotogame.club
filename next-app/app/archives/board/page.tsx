import { useId } from "react";
import type { Metadata } from "next";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleFooter from "@/components/ArticleFooter";
import BoardTable from "@/features/archives/board/components/BoardTable";
import BoardMap from "@/features/archives/board/components/BoardMap";

import withBasePath from "@/lib/withBasePath";

export const metadata: Metadata = {
  title: "散策♪聖櫻ワールド - アーカイブス - きのことゲーム部",
  description: "ガールフレンド(仮)の思い出の記録 - 散策♪聖櫻ワールド",
};

export default function Page() {
  const checkboxId = useId();
  return (
    <>
      <div className="container mx-auto px-2 md:px-6">
        <ArticleHeader />
        <section className="mt-4 mb-8">
          <h1 className="text-2xl my-4">散策♪聖櫻ワールド</h1>
          <p className="leading-7">
            ・表の見出しをタップすると並べ替えが出来ます。
            <br />
            ・PCの場合はShiftキーを押しながらクリックすると複数行で並べ替えが出来ます。
            <br />
            ・検索欄に文字列を入力すると表示する行の絞り込みが出来ます。
          </p>
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            ランキング ごほうび表
          </h2>

          <section>
            <h3 className="text-lg mt-4 mb-2 pl-4 relative before:w-2 before:h-4 before:bg-secondary before:inline-block before:absolute before:left-0 before:top-2 before:rounded">
              総合ランキング
            </h3>
            <BoardTable
              title="2024/11 開催時"
              jsonFileName={withBasePath("/json/board/reward_total_202411.json")}
              tableType="boardRewardTotal202411"
              tableSize="xs"
              initialColumnPinning={{ left: ["rank"] }}
            />
            <BoardTable
              title="2024/05 開催時"
              jsonFileName={withBasePath("/json/board/reward_total_202405.json")}
              tableType="boardRewardTotal202405"
              tableSize="xs"
              initialColumnPinning={{ left: ["rank"] }}
            />
          </section>

          <section>
            <h3 className="text-lg mt-4 mb-2 pl-4 relative before:w-2 before:h-4 before:bg-secondary before:inline-block before:absolute before:left-0 before:top-2 before:rounded">
              ラウンドランキング
            </h3>
            <BoardTable
              title="2024/11 開催時"
              jsonFileName={withBasePath("/json/board/reward_round_202411.json")}
              tableType="boardRewardRound202411"
              tableSize="xs"
              initialColumnPinning={{ left: ["rank"] }}
            />
            <BoardTable
              title="2024/05 開催時"
              jsonFileName={withBasePath("/json/board/reward_round_202405.json")}
              tableType="boardRewardRound202405"
              tableSize="xs"
              initialColumnPinning={{ left: ["rank"] }}
            />
          </section>

          <section>
            <h3 className="text-lg mt-4 mb-2 pl-4 relative before:w-2 before:h-4 before:bg-secondary before:inline-block before:absolute before:left-0 before:top-2 before:rounded">
              行動回数ランキング
            </h3>
            <BoardTable
              title="2024/11 開催時"
              jsonFileName={withBasePath("/json/board/reward_count_202411.json")}
              tableType="boardRewardCount202411"
              tableSize="xs"
              initialColumnPinning={{ left: ["rank"] }}
            />
            <BoardTable
              title="2024/05 開催時"
              jsonFileName={withBasePath("/json/board/reward_count_202405.json")}
              tableType="boardRewardCount202405"
              tableSize="xs"
              initialColumnPinning={{ left: ["rank"] }}
            />
          </section>
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            散策pt ごほうび表
          </h2>
          <BoardTable
            title="2024/11 開催時"
            jsonFileName={withBasePath("/json/board/point_202411.json")}
            tableType="boardPoint"
            tableSize="xs"
            disableColumnFilter
          />
          <BoardTable
            title="2024/05 開催時"
            jsonFileName={withBasePath("/json/board/point_202405.json")}
            tableType="boardPoint"
            tableSize="xs"
            disableColumnFilter
          />
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            ステージクリア ごほうび表
          </h2>
          <BoardTable
            title="2024/11 開催時"
            jsonFileName={withBasePath("/json/board/stage_202411.json")}
            tableType="boardStage"
            tableSize="xs"
            disableColumnFilter
            disablePagination
            initialColumnPinning={{ left: ["lv"] }}
          />
          <BoardTable
            title="2024/05 開催時"
            jsonFileName={withBasePath("/json/board/stage_202405.json")}
            tableType="boardStage"
            tableSize="xs"
            disableColumnFilter
            disablePagination
            initialColumnPinning={{ left: ["lv"] }}
          />
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            すごろくマップ
          </h2>
          <div className="collapse collapse-arrow border border-base-300 bg-base-200 my-2">
            <input type="checkbox" id={`${checkboxId}-202411`} />
            <div className="collapse-title text-xl">2024/11 開催時</div>
            <div className="collapse-content overflow-x-auto">
              <BoardMap
                title="Lv.1 教室"
                jsonFileName={withBasePath("/json/board/map_Lv1_202411.json")}
              />
              <BoardMap
                title="Lv.2 中庭"
                jsonFileName={withBasePath("/json/board/map_Lv2_202411.json")}
              />
              <BoardMap
                title="Lv.3 体育館"
                jsonFileName={withBasePath("/json/board/map_Lv3_202411.json")}
              />
              <BoardMap
                title="Lv.4 グラウンド"
                jsonFileName={withBasePath("/json/board/map_Lv4_202411.json")}
              />
            </div>
          </div>
          <div className="collapse collapse-arrow border border-base-300 bg-base-200 my-2">
            <input type="checkbox" id={`${checkboxId}-202405`} />
            <div className="collapse-title text-xl">2024/05 開催時</div>
            <div className="collapse-content overflow-x-auto">
              <BoardMap
                title="Lv.1 校門"
                jsonFileName={withBasePath("/json/board/map_Lv1_202405.json")}
              />
              <BoardMap
                title="Lv.2 教室"
                jsonFileName={withBasePath("/json/board/map_Lv2_202405.json")}
              />
              <BoardMap
                title="Lv.3 中庭"
                jsonFileName={withBasePath("/json/board/map_Lv3_202405.json")}
              />
            </div>
          </div>
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            攻援力UP/DOWN マス効果
          </h2>
          <BoardTable
            title="2024/05 および 2024/11 開催時"
            jsonFileName={withBasePath("/json/board/effect_202405.json")}
            tableType="boardEffect"
            tableSize="xs"
            disableColumnFilter
            initialColumnPinning={{ left: ["effect"] }}
          />
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            キューピッドマスで出会えるガール
          </h2>
          <BoardTable
            title="2024/11 開催時"
            jsonFileName={withBasePath("/json/board/cupid_202411.json")}
            tableType="boardCupid"
            tableSize="xs"
            disableColumnFilter
            disablePagination
          />
          <BoardTable
            title="2024/05 開催時"
            jsonFileName={withBasePath("/json/board/cupid_202405.json")}
            tableType="boardCupid"
            tableSize="xs"
            disableColumnFilter
            disablePagination
          />
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            アイテムマスで貰えるアイテム
          </h2>
          <BoardTable
            title="2024/11 開催時"
            jsonFileName={withBasePath("/json/board/item_202411.json")}
            tableType="boardItem"
            tableSize="xs"
            pageSize={11}
            disableColumnFilter
            disablePagination
          />
          <BoardTable
            title="2024/05 開催時"
            jsonFileName={withBasePath("/json/board/item_202405.json")}
            tableType="boardItem"
            tableSize="xs"
            disableColumnFilter
            disablePagination
          />
        </section>

        <section className="my-8 leading-7">
          <p>
            本ページに記載のデータはガールフレンド(仮)のゲーム内から引用しています。
            <br />
            データの著作権は株式会社サイバーエージェントに帰属します。
          </p>
        </section>
      </div>
      <ArticleFooter />
    </>
  );
}
