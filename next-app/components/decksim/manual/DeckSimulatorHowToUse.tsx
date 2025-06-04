import Image from "next-export-optimize-images/image";

import { DeckSimulatorEventId } from "@/components/decksim/data/eventData";

import { RaidwarSpecialManual } from "@/components/decksim/manual/eventSpecial/raidwar";
import { ClubcupSpecialManual } from "@/components/decksim/manual/eventSpecial/clubcup";
import { ChampionshipSpecialManual } from "@/components/decksim/manual/eventSpecial/championship";
import { NormalBattleSpecialManual } from "@/components/decksim/manual/eventSpecial/normal-battle";

import MenuIcon from "@mui/icons-material/Menu";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export function DeckSimulatorHowToUse({
  eventId,
}: {
  eventId: DeckSimulatorEventId;
}) {
  return (
    <div className="flex flex-col gap-4 my-2 px-2 md:px-4 leading-loose sm:max-w-screen-sm">
      <section className="">
        <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
          センバツシミュレーターについて
        </h2>
        <div className="my-2 md:pl-4">
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            このシミュレーターは、センバツのデータを入力していくことで実際にゲーム側でそのセンバツを使用する前に予想発揮値が確認できることを目標に作成しています。
          </p>
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            一般的なWebブラウザ上で動作します。
            入力が必要なデータや表示するデータの量が多いためスマートフォンよりもパソコンの方が使用に適しています。
            (動作確認環境：Chrome、Firefox)
          </p>
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            数値の計算はすべてお使いの端末側で行います。
            そのためお使いの環境によっては動作が重くなる場合があります。
          </p>
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            データの保存はWebブラウザの中 (ローカルストレージ領域) に行います。
            必要に応じてテキストファイル形式のバックアップを作成できます。
          </p>
        </div>
      </section>
      <section className="">
        <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
          ヘッダー部
        </h2>
        <Image
          src="/image/decksim/deckSimulator/01_header.png"
          alt="ヘッダー部の画像"
          width={1041}
          height={79}
          className="mt-4 mb-2 ml-4 w-5/6"
        />
        <div className="my-2 md:pl-4">
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            画面上部には発揮値の計算結果以外にもデータのロード/セーブなどの機能が設置されています。計算結果はデータ部に変更があるたびに自動で更新されます。
          </p>
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            スマートフォンなどの画面サイズが小さい環境の場合は計算結果は一部分ずつ表示され、タップするごとに切り替わります。
          </p>
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            このヘッダー部は常に画面上部に表示する設定になっていますが、
            右側のその他のメニューボタン <MenuIcon /> から変更することが可能です。
          </p>
          <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
            <tbody>
              <tr>
                <td className="whitespace-nowrap">最小値</td>
                <td>
                  声援の発動が確率 100% のガールのみで かつ
                  Ex進展ボーナスが全員未発動の時の数値です。
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">期待値</td>
                <td>
                  声援やEx進展ボーナスの発動率を考慮して計算した数値になります。ゲーム内での実際の結果で平均を取るとこの付近になるはずの数値です。
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">最大値</td>
                <td>
                  声援の発動数が最大で かつ
                  Ex進展ボーナスが全員発動した時の数値です。
                  理論値でありゲーム内でこの数値を出すことは難しいです。
                </td>
              </tr>
            </tbody>
          </table>
          <Image
            src="/image/decksim/deckSimulator/02_save_data.png"
            alt="データ保存画面"
            width={736}
            height={502}
            className="mt-4 mb-2 ml-4 w-1/2"
          />
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            保存データはイベントで個別になっています。[これを開く]ボタンを押すとその番号に保存したデータを読み出します。
            [ここに保存]ボタンを押すと現在の入力内容をその番号に保存します。
            メモ欄には保存したデータの説明などを自由に記述できます。
          </p>
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            Webブラウザ内のローカルストレージ領域に保存するため、手動でサイトデータを削除した、Webブラウザを変えたなどの理由でデータは消える場合があります。
          </p>
        </div>
      </section>
      <section className="">
        <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
          シミュレーター本体タブ
        </h2>
        <Image
          src="/image/decksim/deckSimulator/03_input_data.png"
          alt="シミュレーター本体タブの画像"
          width={1291}
          height={336}
          className="mt-4 mb-2 ml-4 w-5/6"
        />
        <div className="my-2 md:pl-4">
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            シミュレーター本体タブの中でセンバツのデータを入力していきます。
            この中でも主センバツ系/副センバツ系/その他/イベント固有系などで入力欄がタブで分割されています。
          </p>
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            イベントによっては区分が異なる場合があります。また、そのイベントでは完全に無効になる入力欄は表示されない場合もあります。
          </p>
        </div>
      </section>
      <section className="">
        <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
          主センバツ/副センバツ ガール
        </h2>
        <Image
          src="/image/decksim/deckSimulator/04_scene_parameter.png"
          alt="主センバツ/副センバツ ガール"
          width={522}
          height={574}
          className="mt-4 mb-2 ml-4 w-1/3"
        />
        <div className="my-2 md:pl-4">
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            [追加する]ボタンを押すと追加するガールのパラメーターを入力する画面が表示されます。設定した後に[決定]ボタンを押すとそのガールが追加されます。
          </p>
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            ここでのレアリティやコスト、声援Lvは基本的にはプレシャスシーンの計算用のため、該当する効果条件のプレシャスシーンを使用していない場合は入力を省略出来ます。
            <br />
            同様に、学年はぷちガールちゃんの応援力効果の計算用のため、該当する応援力効果を使用していない場合は入力を省略できます。
            <br />
            ただし、対抗戦や全国高校生課外活動コンテスト、散策♪聖櫻ワールドでのイベント固有のギミックにも
            影響がある場合は正確に入力した方が計算結果の精度が上がります。
          </p>
          <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
            <tbody>
              <tr>
                <td className="whitespace-nowrap">攻援力/守援力</td>
                <td>
                  諸々のボーナスを加減算する前の元々の数値を入力します。誕生日や副センバツ補正などもここでは考慮する前の、表示そのままの数値を入力します。
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">ストラップ</td>
                <td>
                  フラワーストラップの場合も％ではなく実際の効果値を入力します。
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">学年</td>
                <td>
                  基本的にはぷちガールちゃんの応援力効果の計算用のため、該当する応援力効果を使用していなければ入力を省略しても構いません。散策♪聖櫻ワールドではマス効果の算出にも使用します。
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">部活一致</td>
                <td>
                  プレイヤーの所属する部活と部活タイプが一致するガールの場合はチェックを入れます。
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">デート中</td>
                <td>デート中のガールの場合はチェックを入れます。</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">タッチ中</td>
                <td>
                  タッチボーナスが発動するガールの場合はチェックを入れます。
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">誕生日</td>
                <td>誕生日のガールの場合はチェックを入れます。</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">Ex進展</td>
                <td>
                  Ex進展済みのガールの場合はチェックを入れます。レアリティで Luv
                  (ラブリー進展済み) を選択した場合は自動でチェックが入ります。
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">本命ガール</td>
                <td>
                  本命ガール（自身で設定したランキング等で表示されるガール）の場合はチェックを入れます。ぷちセンバツの応援力効果に「本命ガールの攻守UP」が存在する場合にのみ計算結果に影響します。
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Image
          src="/image/decksim/deckSimulator/05_scene_list.png"
          alt="ガール一覧の画像"
          width={1058}
          height={369}
          className="mt-4 mb-2 ml-4 w-5/6"
        />
        <div className="my-2 md:pl-4">
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            登録したガールはリストに追加されていきます。
            [編集]ボタンからパラメーターの変更ができます。また、[削除]ボタンを押すとそのガールをリストから削除します。
            並べ替えは、ハンドルアイコン <DragIndicatorIcon /> をドラッグして
            入れ替えたい場所で離すことで可能です。
          </p>
          <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
            <tbody>
              <tr>
                <td className="whitespace-nowrap">補正後個人</td>
                <td>
                  【声援を除いて】各種ボーナスや各種効果による補正後の応援力を自動で表示します。基本的にはこの数値が大きいガールほど効果が高いです。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="">
        <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
          主センバツ/副センバツ 声援
        </h2>
        <Image
          src="/image/decksim/deckSimulator/06_skill_parameter.png"
          alt="主センバツ/副センバツ 声援"
          width={527}
          height={406}
          className="mt-4 mb-2 ml-4 w-1/3"
        />
        <Image
          src="/image/decksim/deckSimulator/07_skill_list.png"
          alt="主センバツ/副センバツ 声援一覧の画像"
          width={991}
          height={357}
          className="mt-4 mb-2 ml-4 w-5/6"
        />
        <div className="my-2 md:pl-4">
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            ガールと同様に[追加する]ボタンから声援のパラメーターを登録する画面が開きます。
            登録後のリスト表示についても同様です。
          </p>
          <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
            <tbody>
              <tr>
                <td className="whitespace-nowrap">対象タイプ</td>
                <td>
                  どのタイプのガールに掛かる声援かを選択します。
                  声援の説明の中に SWEETタイプ / COOLタイプ / POPタイプ のどれも
                  記載がない場合は 全タイプ が対象です。
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">対象範囲</td>
                <td>
                  声援が掛かる対象が 主センバツ か 副センバツ か もしくは
                  その両方か を 選択します。 声援の説明の中に指定がない場合は
                  主センバツ のみが対象です。
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">対象副人数</td>
                <td>
                  声援が掛かる対象が 副センバツの上位何人までか を入力します。
                  副センバツに効果が掛からない場合は入力不要です。
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">効果タイプ</td>
                <td>効果が攻援か守援かもしくはその両方かを選択します。</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">効果強度</td>
                <td>効果の強度を選択します。</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">効果値</td>
                <td>
                  入力した声援Lvや声援の内容から算出した声援効果値を自動で表示します。
                  これが 0 %
                  になる場合は、選択したパラメーターの組み合わせの効果値が
                  まだシミュレーターに登録されていません。
                  もしくは、いずれかのパラメーターの選択に誤りがあるのかも？
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">発動時合計</td>
                <td>
                  声援が発動したときの効果合計値を自動で表示します。
                  声援が掛かる対象の応援力 × 効果値 × 対象人数 × 補正。
                  基本的にはこの数値が大きい声援ほど効果が高いです。
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">発動率</td>
                <td>
                  声援が発動する確率を自動で表示します。
                  イベントによっては声援の同時発動数には制限があるため、老番のガールほど発動率は低くなります。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="">
        <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
          プレシャスシーン
        </h2>
        <Image
          src="/image/decksim/deckSimulator/08_precious_parameter.png"
          alt="プレシャスシーン"
          width={522}
          height={645}
          className="mt-4 mb-2 ml-4 w-1/3"
        />
        <Image
          src="/image/decksim/deckSimulator/09_precious_list.png"
          alt="プレシャスシーン一覧の画像"
          width={734}
          height={287}
          className="mt-4 mb-2 ml-4 w-5/6"
        />
        <div className="my-2 md:pl-4">
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            [追加する]ボタンを押すとプレシャスシーンのパラメーターを登録する画面が開きます。
            <br />
            初期レアリティや効果対象、効果タイプは選択肢に表示されるシーン名のフィルタリング用になっています。
            <br />
            シーン名やレアリティの選択後に[決定]ボタンを押すとリストに設定したシーンが追加されます。
          </p>
          <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
            <tbody>
              <tr>
                <td className="whitespace-nowrap">人数</td>
                <td>
                  最大効果発揮条件に「特定の～ガール」や「様々な～ガール」の文があるシーンにおいて、そのカウント人数を入力します。その他のシーンでは入力欄は表示されません。未入力のままの場合は最大効果発揮条件を満たしているものと見なして最大効果値を計算に使用します。
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap">表示近似値</td>
                <td>
                  主センバツおよび副センバツの入力値とプレシャスシーンの入力値から算出した効果合計値を自動で表示します。ゲーム内のセンバツ設定ページで表示される効果値と近似した値になります。正確に入力していれば誤差は1桁程度です。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="">
        <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
          センバツボーナス
        </h2>
        <Image
          src="/image/decksim/deckSimulator/10_deck_bonus.png"
          alt="センバツボーナスのデータ登録画面"
          width={387}
          height={487}
          className="mt-4 mb-2 ml-4 w-1/3"
        />
        <div className="my-2 md:pl-4">
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            センバツボーナスのLvや効果タイプを選択します。
            センバツボーナスが無効のイベントではこちらは表示されません。
          </p>
        </div>
      </section>
      <section className="">
        <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
          ぷちセンバツ
        </h2>
        <Image
          src="/image/decksim/deckSimulator/11_petit_girls.png"
          alt="ぷちセンバツのデータ登録画面"
          width={1210}
          height={442}
          className="mt-4 mb-2 ml-4 w-5/6"
        />
        <div className="my-2 md:pl-4">
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            ぷちセンバツの総攻援や総守援、ぷち主センバツ3人の応援力効果を選択します。
            経験値UPなど発揮値計算に影響を与えない効果の場合は空欄のままにします。
            <br />
            成長Lvを上限まで上げてある状態を想定して計算を行うため、まだ成長の途中で
            効果Lvが上限に到達していない場合は計算結果に誤差が発生します。
          </p>
        </div>
      </section>
      <section className="">
        <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
          プレイヤーデータ・部活データ
        </h2>
        <Image
          src="/image/decksim/deckSimulator/12_player_data.png"
          alt="プレイヤーデータ・部活データの登録画面"
          width={493}
          height={480}
          className="mt-4 mb-2 ml-4 w-1/2"
        />
        <div className="my-2 md:pl-4">
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            プレイヤー自身のタイプや部活内での役職、攻コストの最大値などのデータを入力します。
            <br />
            こちらは共通設定となっておりここでの変更は他のページでも反映されます。
          </p>
        </div>
      </section>
      <section className="">
        <h2 className="text-lg font-bold pl-4 relative before:w-2 before:h-5 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[6px]">
          外部入出力タブ
        </h2>
        <Image
          src="/image/decksim/deckSimulator/13_backup.png"
          alt="外部入出力タブの登録画面"
          width={529}
          height={264}
          className="mt-4 mb-2 ml-4 w-1/2"
        />
        <div className="my-2 md:pl-4">
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            基本的にはブラウザ内にデータを保存する作りとなっていますが、何らかの理由で
            データが消えてしまう場合に備えてバックアップを取りたい場合はこの機能が
            使用できます。
            <br />
            [バックアップファイルの取得]の各ボタンを押すとファイルの保存先を聞くウィンドウが開き、番号ごとのセーブデータのバックアップファイルを取得することが出来ます。保存データがない番号は取得が出来ません。
            <br />
            [バックアップファイルからの復旧]の各ボタンを押すとファイルの選択を行うウィンドウが開き、その番号にロードするバックアップファイルを選択することが出来ます。既にデータが存在する場合はバックアップファイルの内容で上書きされます。
          </p>
          <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
            バックアップ方法として使用する以外にも、イベントページ間やブラウザ間で
            センバツデータをコピーしたい場合にも利用可能です。
          </p>
        </div>
      </section>

      {/* イベント固有用のマニュアル読み出し */}
      {eventId === "raidwar" && <RaidwarSpecialManual />}
      {eventId === "clubcup" && <ClubcupSpecialManual />}
      {eventId === "championship" && <ChampionshipSpecialManual />}
      {eventId === "normal-battle" && <NormalBattleSpecialManual />}
    </div>
  );
}
