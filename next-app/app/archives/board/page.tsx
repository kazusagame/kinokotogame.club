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
  const eventList = [
    {
      title: "2026/02 開催時 (story)",
      id: "202602",
      mapList: ["教室", "グラウンド", "体育館", "公園"],
    },
    {
      title: "2025/11 開催時",
      id: "202511",
      mapList: ["教室", "体育館", "グラウンド", "森園神社"],
    },
    {
      title: "2025/06 開催時 (story)",
      id: "202506",
      mapList: ["教室", "中庭", "体育館", "グラウンド"],
    },
    {
      title: "2024/11 開催時",
      id: "202411",
      mapList: ["教室", "中庭", "体育館", "グラウンド"],
    },
    {
      title: "2024/05 開催時",
      id: "202405",
      mapList: ["校門", "教室", "中庭"],
    },
  ];

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
            {eventList.map((event) => (
              <div key={event.id} className="ml-4">
                <BoardTable
                  title={event.title}
                  jsonFileName={withBasePath(
                    `/json/board/reward_total_${event.id}.json`,
                  )}
                  tableType={`boardRewardTotal${event.id}`}
                  tableSize="xs"
                  initialColumnPinning={{ left: ["rank"] }}
                />
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-lg mt-4 mb-2 pl-4 relative before:w-2 before:h-4 before:bg-secondary before:inline-block before:absolute before:left-0 before:top-2 before:rounded">
              ラウンドランキング
            </h3>
            {eventList.map((event) => (
              <div key={event.id} className="ml-4">
                <BoardTable
                  title={event.title}
                  jsonFileName={withBasePath(
                    `/json/board/reward_round_${event.id}.json`,
                  )}
                  tableType={`boardRewardRound${event.id}`}
                  tableSize="xs"
                  initialColumnPinning={{ left: ["rank"] }}
                />
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-lg mt-4 mb-2 pl-4 relative before:w-2 before:h-4 before:bg-secondary before:inline-block before:absolute before:left-0 before:top-2 before:rounded">
              行動回数ランキング
            </h3>
            <div className="ml-4">
              <BoardTable
                title="2024/11 ～ 現在"
                jsonFileName={withBasePath(
                  "/json/board/reward_count_202411.json",
                )}
                tableType="boardRewardCount202411"
                tableSize="xs"
                initialColumnPinning={{ left: ["rank"] }}
              />
            </div>
            <div className="ml-4">
              <BoardTable
                title="2024/05 開催時"
                jsonFileName={withBasePath(
                  "/json/board/reward_count_202405.json",
                )}
                tableType="boardRewardCount202405"
                tableSize="xs"
                initialColumnPinning={{ left: ["rank"] }}
              />
            </div>
          </section>
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            散策pt ごほうび表
          </h2>
          {eventList.map((event) => (
            <div key={event.id} className="ml-4">
              <BoardTable
                title={event.title}
                jsonFileName={withBasePath(
                  `/json/board/point_${event.id}.json`,
                )}
                tableType="boardPoint"
                tableSize="xs"
                disableColumnFilter
              />
            </div>
          ))}
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            ステージクリア ごほうび表
          </h2>
          {eventList.map((event) => (
            <div key={event.id} className="ml-4">
              <BoardTable
                title={event.title}
                jsonFileName={withBasePath(
                  `/json/board/stage_${event.id}.json`,
                )}
                tableType="boardStage"
                tableSize="xs"
                disableColumnFilter
                disablePagination
                initialColumnPinning={{ left: ["lv"] }}
              />
            </div>
          ))}
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            すごろくマップ
          </h2>
          {eventList.map((event) => (
            <div
              key={event.id}
              className="collapse collapse-arrow border border-base-300 bg-base-200 my-2"
            >
              <input type="checkbox" id={`${checkboxId}-${event.id}`} />
              <div className="collapse-title text-xl">{event.title}</div>
              <div className="collapse-content overflow-x-auto">
                {event.mapList.map((map, index) => (
                  <BoardMap
                    key={map}
                    title={`Lv.${index + 1} ${map}`}
                    jsonFileName={withBasePath(
                      `/json/board/map_Lv${index + 1}_${event.id}.json`,
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            攻援力UP/DOWN マス効果
          </h2>
          <BoardTable
            title="2024/05 ～ 現在"
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
          {eventList.map((event) => (
            <div key={event.id} className="ml-4">
              <BoardTable
                title={event.title}
                jsonFileName={withBasePath(
                  `/json/board/cupid_${event.id}.json`,
                )}
                tableType="boardCupid"
                tableSize="xs"
                disableColumnFilter
                disablePagination
              />
            </div>
          ))}
        </section>

        <section className="my-8">
          <h2 className="text-xl mt-4 mb-2 pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-1">
            アイテムマスで貰えるアイテム
          </h2>
          {eventList.map((event) => (
            <div key={event.id} className="ml-4">
              <BoardTable
                title={event.title}
                jsonFileName={withBasePath(`/json/board/item_${event.id}.json`)}
                tableType="boardItem"
                tableSize="xs"
                pageSize={11}
                disableColumnFilter
                disablePagination
              />
            </div>
          ))}
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
