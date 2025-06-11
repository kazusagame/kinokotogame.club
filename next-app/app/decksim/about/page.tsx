import type { Metadata } from "next";
import Image from "next-export-optimize-images/image";
import withBasePath from "@/lib/withBasePath";
import ArticleHeader from "@/components/ArticleHeader";
import ArticleFooter from "@/components/ArticleFooter";

export const metadata: Metadata = {
  title: "使用方法 - センバツシミュレーター - きのことゲーム部",
  description:
    "ガールフレンド(仮)のセンバツシミュレーターWeb版の使用方法を説明しているページです。",
};

export default function Page() {
  return (
    <>
      <div className="container mx-auto mb-6 px-2 md:px-6 lg:max-w-screen-lg">
        <ArticleHeader />
        <section className="mt-4 mb-8 md:pl-4">
          <h2 className="text-2xl/relaxed pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[10px]">
            本サイトのセンバツシミュレーターの特徴
          </h2>
          <div className="my-4 md:pl-4 leading-7">
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              このセンバツシミュレーターは、センバツのデータを入力していくことで実際にゲーム側でそのセンバツを使用する前に予想発揮値が確認できることを目標に作成しています。
            </p>
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              一般的なWebブラウザ上で動作します。
              また、パソコンなどの横長の画面での使用を想定しています。
              (動作確認環境：Chrome, Firefox)
            </p>
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              数値の計算はすべてお使いの端末側で行います。
              そのため、お使いの環境によっては動作が重くなる場合があります。
            </p>
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              データの保存はWebブラウザの中 (ローカルストレージ領域)
              に行います。
            </p>
          </div>
        </section>
        <section className="mt-4 mb-8 md:pl-4">
          <h2 className="text-2xl/relaxed pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[10px]">
            ツール部
          </h2>
          <Image
            src={withBasePath("/image/decksim/71_tools.png")}
            alt="ツール部の画像"
            width={1559}
            height={156}
            className="mt-4 ml-4 w-5/6"
          />
          <div className="my-4 md:pl-4 leading-7">
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              発揮値の計算結果が表示される以外にもデータの保存といったツールが設置されています。計算結果はデータ部に変更があるたびに自動で更新されます。
            </p>
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              保存データはイベントで個別になっています。保存ボタンを押すと現在のデータ部の入力をその番号に保存します。読出ボタンを押すとその番号の保存データをデータ部に読み出します。
            </p>
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              Webブラウザ内のローカルストレージ領域に保存するため、開発ツールから手動でクリアした場合などの理由でデータは消える場合があります。
              （→バックアップの手段は後述）
            </p>
            <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
              <tbody>
                <tr>
                  <td className="whitespace-nowrap">最小値</td>
                  <td>
                    声援の発動が主センバツのリーダーのみで かつ
                    Ex進展ボーナスが全員未発動時の数値です。
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">期待値</td>
                  <td>
                    発動率を考慮して計算した数値です。実際の結果で平均を取るとこの数値付近になる(はず)。
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">最大値</td>
                  <td>
                    声援の発動数が最大で かつ
                    Ex進展ボーナスが全員発動時の数値です。（声援の最大発動数はイベントによって異なります）
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="mt-4 mb-8 md:pl-4">
          <h2 className="text-2xl/relaxed pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[10px]">
            データ部
          </h2>
          <h2 className="text-2xl/relaxed pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[10px]">
            主センバツ / 副センバツ
          </h2>
          <Image
            src={withBasePath("/image/decksim/72_girls.png")}
            alt="主センバツ/副センバツの画像"
            width={1551}
            height={211}
            className="mt-4 ml-4 w-5/6"
          />
          <div className="my-4 md:pl-4 leading-7">
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              各ガールのデータを頑張って入力していきます。
              <br />
              レアリティやコストは基本的にはプレシャスシーンの計算用のため、該当するプレシャスシーンを使用していない場合は省略可です。副センバツの声援Lvについても同様。
              <br />
              （対抗戦や全国高校生課外活動コンテストなど一部例外があります）
            </p>
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              濃い目の灰色や斜線が入っている箇所はそのイベントの計算では考慮されないため入力は不要です。
            </p>
            <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
              <tbody>
                <tr>
                  <td className="whitespace-nowrap">攻援力/守援力</td>
                  <td>
                    諸々のボーナスを加減算する前の元々の数値を入力します。誕生日や副センバツ補正などもここでは考慮する前の、各シーンの素の数値を入力します。
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">ストラップ</td>
                  <td>
                    フラワーストラップの場合も％ではなく実際の効果値を入力します。
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">部活一致</td>
                  <td>自身と部活が一致するガールの場合はチェックを入れる。</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">デート中</td>
                  <td>デート中のガールの場合はチェックを入れる。</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">タッチ中</td>
                  <td>
                    タッチボーナスが発動する予定のガールの場合はチェックを入れる。
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">誕生日</td>
                  <td>その日が誕生日のガールの場合はチェックを入れる。</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">Ex進展</td>
                  <td>
                    Ex進展済み もしくは
                    ラブリー進展済みのガールの場合はチェックを入れる。
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">補正後個人</td>
                  <td>
                    【声援を除いて】各種ボーナスや各種効果を反映した計算後の数値を自動で表示します。基本的にはこの数値が大きいガールほど効果が高いです。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="mt-4 mb-8 md:pl-4">
          <h2 className="text-2xl/relaxed pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[10px]">
            声援
          </h2>
          <Image
            src={withBasePath("/image/decksim/73_skill.png")}
            alt="声援の画像"
            width={1570}
            height={188}
            className="mt-4 ml-4 w-5/6"
          />
          <div className="my-4 md:pl-4 leading-7">
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              主センバツのガールや、副センバツ内のスイッチOFFガールの声援詳細を入力します。
            </p>
            <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
              <tbody>
                <tr>
                  <td className="whitespace-nowrap">声援対象1</td>
                  <td>
                    どのタイプのガールに掛かる声援かを選択します。(声援の説明内に
                    POP も SWEET も COOL も無ければ All (全タイプが対象) です)
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">声援対象2</td>
                  <td>
                    その声援が掛かる対象が主センバツだけか副センバツだけかもしくはその両方かを選択します。(声援の説明内に
                    主センバツ も 副センバツ も無ければ主センバツのみが対象です)
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">対象副人数</td>
                  <td>
                    声援対象2が 副のみ か 主＋副
                    の場合に、副センバツの上位何人に効果が掛かるかを入力します。
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">声援効果1</td>
                  <td>効果が攻援か守援かもしくはその両方かを選択します。</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">声援効果2</td>
                  <td>効果の強度を選択します。</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">声援変更</td>
                  <td>
                    （一部の古いURガールのみが対象）声援変更を行って効果値が上昇している場合はその数値を選択します。
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">効果値</td>
                  <td>
                    入力した声援Lvや声援内容から自動で算出した声援効果の数値を表示します。
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">発動時合計</td>
                  <td>
                    その声援が発動したときの効果合計値を算出して表示します。
                    計算式は「声援が掛かる対象の応援力 × 効果値 × 対象人数 ×
                    補正」です。
                    基本的にはこの数値が大きい声援ほど効果が高いです。
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">発動率</td>
                  <td>
                    その声援が発動する確率を自動で表示します。声援の同時発動数には制限があるため、老番のガールほど発動率は低くなります。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="mt-4 mb-8 md:pl-4">
          <h2 className="text-2xl/relaxed pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[10px]">
            プレシャスシーン
          </h2>
          <Image
            src={withBasePath("/image/decksim/74_precious.png")}
            alt="プレシャスシーンの画像"
            width={968}
            height={160}
            className="mt-4 ml-4 w-5/6"
          />
          <div className="my-4 md:pl-4 leading-7">
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              副センバツ画面で設定しているプレシャスシーンの詳細を入力します。
            </p>
            <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
              <tbody>
                <tr>
                  <td className="whitespace-nowrap">有無</td>
                  <td>
                    プレシャスシーンをセンバツに入れている場合はチェックを入れる。
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">効果対象</td>
                  <td rowSpan={3}>
                    フィルタリング用。選択すると名称欄では該当するシーンのみを表示します。
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">初期星</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">攻/守</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">名称</td>
                  <td>使用しているシーンを選択します。</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">星</td>
                  <td>レアリティ星の数を選択します。</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">人数</td>
                  <td>
                    人数が最大効果発揮条件になっているシーンにおいてカウント結果を入力します。未入力の場合は最大効果値を計算に使用します。
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">表示近似値</td>
                  <td>
                    主センバツおよび副センバツの入力値とプレシャスシーンの入力値から、副センバツ画面で表示される効果値の近似値を算出して表示します。人数カウント数などが合っているかどうかの確認用などに。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="mt-4 mb-8 md:pl-4">
          <h2 className="text-2xl/relaxed pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[10px]">
            ぷちセンバツ
          </h2>
          <Image
            src={withBasePath("/image/decksim/75_petit.png")}
            alt="ぷちセンバツの画像"
            width={1140}
            height={212}
            className="mt-4 ml-4 w-5/6"
          />
          <div className="my-4 md:pl-4 leading-7">
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              ぷちセンバツの詳細を入力します。
            </p>
            <table className="table table-xs md:table-md w-auto my-4 text-base bg-base-200">
              <tbody>
                <tr>
                  <td className="whitespace-nowrap">総攻援/総守援</td>
                  <td>ぷちセンバツの数値をそのまま入力する。</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap">応援力効果1～4</td>
                  <td>
                    応援力効果を選択します。経験値UPなど計算に影響を与えない効果の場合は
                    --- を選択します。
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="mt-4 mb-8 md:pl-4">
          <h2 className="text-2xl/relaxed pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[10px]">
            センバツボーナス
          </h2>
          <Image
            src={withBasePath("/image/decksim/76_deck.png")}
            alt="センバツボーナスの画像"
            width={1154}
            height={95}
            className="mt-4 ml-4 w-5/6"
          />
          <div className="my-4 md:pl-4 leading-7">
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              センバツボーナスのLvと効果を選択します。未発動の場合はLVで ---
              を選択します。
            </p>
          </div>
        </section>
        <section className="mt-4 mb-8 md:pl-4">
          <h2 className="text-2xl/relaxed pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[10px]">
            プレイヤーデータ・その他
          </h2>
          <Image
            src={withBasePath("/image/decksim/77_player.png")}
            alt="プレイヤーデータ・その他の画像"
            width={389}
            height={301}
            className="mt-4 ml-4 w-1/3"
          />
          <div className="my-4 md:pl-4 leading-7">
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              プレイヤー自身のタイプや部活内での役職、攻コストの最大値などのデータを入力します。
            </p>
          </div>
        </section>
        <section className="mt-4 mb-8 md:pl-4">
          <h2 className="text-2xl/relaxed pl-4 relative before:w-2 before:h-6 before:bg-primary before:inline-block before:absolute before:left-0 before:top-[10px]">
            保存データのバックアップ方法
          </h2>
          <Image
            src={withBasePath("/image/decksim/78_directToJson.png")}
            alt="保存データのバックアップ方法の画像"
            width={1292}
            height={209}
            className="mt-4 ml-4 w-5/6"
          />
          <div className="my-4 md:pl-4 leading-7">
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              基本的にはブラウザ内にデータを保存する作りとなっていますが、何らかの理由で消えてしまう場合に備えてバックアップを取りたい場合は最下部のこの機能が使用できます。
            </p>
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              [ファイルに保存]ボタンを押すとバックアップファイルの保存先を指定する画面が開きます。
            </p>
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              バックアップファイルで復旧する場合には、[ファイルを選択]ボタンを押すとバックアップファイルを選択する画面が開きます。
            </p>
            <p className="pl-4 relative before:w-2 before:h-2 before:rounded-full before:bg-secondary before:inline-block before:absolute before:left-0 before:top-[12px]">
              Tips:
              バックアップ方法として使用する以外にも、イベントページ間やブラウザ間でセンバツデータをコピーしたい場合にも利用可能です。
            </p>
          </div>
        </section>
      </div>
      <ArticleFooter />
    </>
  );
}
