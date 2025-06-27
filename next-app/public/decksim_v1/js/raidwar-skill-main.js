"use strict";

let DATA_ARRAY = {
  general: {},
  leader: {},
  helper: {},
  member: {},
  "calc-result": { memo: "" },
};

const EVENT_NAME_CONVERT = {
  "raid-first": "たすけて！マイヒーロー 前半",
  "raid-second-attack": "たすけて！マイヒーロー 後半攻援",
  "raid-second-defence": "たすけて！マイヒーロー 後半守援",
  "raid-mega": "たすけて！マイヒーロー メガ悪男",
  raidwar: "おねがい★ハンターズ",
  "raidwar-skill": "おねがい★ハンターズ ハンター声援",
  clubcup: "部活対抗！勧誘★グランプリ",
  championship: "聖櫻学園★カリスマ決定戦 攻援",
  "championship-defence": "聖櫻学園★カリスマ決定戦 守援",
  tower: "聖櫻学園メモリアルストーリー",
  divrace: "全国高校生課外活動コンテスト",
  board: "散策♪聖櫻ワールド",
  "normal-battle": "通常バトル",
};

jQuery(function () {
  insertTitle();
  insertTools();
  insertForm();
  insertCanvas();
  setEvents();
  preloadSavedata();
  insertChangeLog();
});

function insertTitle() {
  let pageid = $("body").prop("id");

  let appendhtml = `
    <div class="simtype selectmark">
    <select name="simtype" class="simtype">
    <option value="raid-first" data-url="../raid-first/index.html">たすけて！マイヒーロー 前半</option>
    <option value="raid-second-attack" data-url="../raid-second-attack/index.html">たすけて！マイヒーロー 後半攻援</option>
    <option value="raid-second-defence" data-url="../raid-second-defence/index.html">たすけて！マイヒーロー 後半守援</option>
    <option value="raid-mega" data-url="../raid-mega/index.html">たすけて！マイヒーロー メガ悪男</option>
    <option value="raidwar" data-url="../raidwar/index.html">おねがい★ハンターズ</option>
    <option value="raidwar-skill" data-url="../raidwar-skill/index.html">おねがい★ハンターズ ハンター声援</option>
    <option value="clubcup" data-url="../clubcup/index.html">部活対抗！勧誘★グランプリ</option>
    <option value="championship" data-url="../championship/index.html">聖櫻学園★カリスマ決定戦 攻援</option>
    <option value="championship-defence" data-url="../championship-defence/index.html">聖櫻学園★カリスマ決定戦 守援</option>
    <option value="tower" data-url="../tower/index.html">聖櫻学園ﾒﾓﾘｱﾙｽﾄｰﾘｰ & 聖櫻ｽﾄｰﾘｰ 兼用</option>
    <option value="divrace" data-url="../divrace/index.html">全国高校生課外活動コンテスト</option>
    <option value="board" data-url="../board/index.html">散策♪聖櫻ワールド</option>
    <option value="normal-battle" data-url="../normal-battle/index.html">通常バトル</option>
    <option value="backpage" data-url="../../decksim/">1つ前のページに戻る</option>
    </select>
    </div>`;
  $("#simtitle").append(appendhtml);
  $("#simtitle select").val(pageid);
}

function insertTools() {
  let appendhtml = `
        <div class="heading"><p class="inform-tooltips">[順序変更]</p></div>
        <div class="selectmark">
            <select id="position-before">`;
  appendhtml += addPositionOptions();
  appendhtml += `
            </select>
        </div>
        <span> を </span>
        <div class="selectmark">
            <select id="position-after">`;
  appendhtml += addPositionOptions();
  appendhtml += `
            </select>
            </div>
            <span> に </span>
            <input type='button' id='do-exchange' value='移動する'>
    `;
  $("#exchange").append(appendhtml);
}

function addPositionOptions() {
  let outputhtml;
  for (let i = 0; i < 49; i++) {
    outputhtml += `<option value="${i + 1}">[${i + 1}]</option>`;
  }
  return outputhtml;
}

function insertForm() {
  let appendhtml = `
    <div class="flex">
        <div class="mode" id="general-1">
            <div class="heading"><p class="inform-tooltips">[パターン選択]</p></div>
            <div>
                <input type="radio" class="pattern inputdata" data-section="general" data-index="1" data-type="pattern" id="special-only" name="mode" value="special-only" checked>
                <label for="special-only">本気炭酸 のみ</label>
            </div>
            <div>
                <input type="radio" class="pattern inputdata" data-section="general" data-index="1" data-type="pattern" id="normal+special" name="mode" value="normal+special">
                <label for="normal+special">初手だけ 通常炭酸 → 本気炭酸</label>
            </div>
            <div>
                <input type="radio" class="pattern inputdata" data-section="general" data-index="1" data-type="pattern" id="normal-only" name="mode" value="normal-only">
                <label for="normal-only">通常炭酸 のみ</label>
            </div>
            <div>
                <input type="radio" class="pattern inputdata" data-section="general" data-index="1" data-type="pattern" id="candy+special" name="mode" value="candy+special">
                <label for="candy+special">初手だけ 飴 → 本気炭酸</label>
            </div>
            <div>
                <input type="radio" class="pattern inputdata" data-section="general" data-index="1" data-type="pattern" id="candy+normal" name="mode" value="candy+normal">
                <label for="candy+normal">初手だけ 飴 → 通常炭酸</label>
            </div>
            <div>
                <input type="radio" class="pattern inputdata" data-section="general" data-index="1" data-type="pattern" id="custom" name="mode" value="custom">
                <label for="custom">カスタムパターン</label>
                <input type="text" class="pattern-text inputdata" data-section="general" data-index="1" data-type="pattern-text" id="pattern-text" name="text" value="" placeholder="左から順に C(飴), N(通常炭酸), S(本気炭酸) を並べていく" pattern="^[cnsCNS]+$" title="左から順に C(飴), N(通常炭酸), S(本気炭酸) を並べていく">
            </div>
        </div>
    </div>

    <div class="grid">
        <div class="solo" id="leader-1">
            <div class="heading"><p class="inform-tooltips">[リーダー]</p></div>
            <div class="heading flex">
                <div class="attack">ダメージ%</div>
                <div class="heart">ハート数</div>
            </div>
            <div class="main">
                <input type="number" name="leader-1-attack" class="attack inputdata" data-section="leader" data-index="1" data-type="attack">
                <input type="number" name="leader-1-heart" class="heart inputdata" data-section="leader" data-index="1" data-type="heart">
            </div>
        </div>
        <div class="solo" id="helper-1">
            <div class="heading"><p class="inform-tooltips">[助っ人]</p></div>
            <div class="heading flex">
                <div class="attack">ダメージ%</div>
                <div class="heart">ハート数</div>
            </div>
            <div>
                <input type="number" name="helper-1-attack" class="attack inputdata" data-section="helper" data-index="1" data-type="attack">
                <input type="number" name="helper-1-heart" class="heart inputdata" data-section="helper" data-index="1" data-type="heart">
            </div>
        </div>
    </div>
    `;
  appendhtml += `<div class="grid">`;
  for (let i = 0; i < 49; i++) {
    appendhtml += `
        <div class="solo member" id="member-${String(i + 1)}">
            <div class="heading"><p class="inform-tooltips">[ ${String(
              i + 1
            )} ]</p></div>
            <div class="heading flex">
                <div class="attack">ダメージ%</div>
                <div class="heart">ハート数</div>
            </div>
            <div class="main">
                <input type="number" name="member-${String(
                  i + 1
                )}-attack" class="attack inputdata" data-section="member" data-index="${String(
      i + 1
    )}" data-type="attack">
                <input type="number" name="member-${String(
                  i + 1
                )}-heart" class="heart inputdata" data-section="member" data-index="${String(
      i + 1
    )}" data-type="heart">
            </div>
        </div>
        `;
  }
  appendhtml += `</div>`;
  $("#form-area").append(appendhtml);
}

function insertCanvas() {
  let appendhtml = `
    <div>
        <canvas id="canvas" width="900" height="3000"></canvas>
    </div>
    `;
  $("#canvas-area").append(appendhtml);
}

function setEvents() {
  //保存ボタン
  setSaveEvents();
  setRawSaveEvents();

  //読出ボタン
  setLoadEvents();
  setRawLoadEvents();

  //メモ更新ボタン
  setMemoUpdateEvents();

  //要素変更
  setChangeEvents();

  //順序変更
  setExchangeEvents();

  // ツールチップを再設定
  setTooltips();

  //Update DataArray
  setUpdateEvents();

  //ツールバー水平スクロール可
  $(window).on("scroll", function () {
    $("#tools").css("left", -$(window).scrollLeft());
  });

  //importRawDataボタン
  setImportRawDataEvents();
}

function setSaveEvents() {
  $('input[type="button"].save').on("click", function () {
    let result;
    result =
      window.confirm(`現在の入力データ で Webブラウザ内の保存データを更新します
確認したらOKを押してください。`);
    if (window.localStorage && result) {
      let currentdate = new Date();
      currentdate = `${currentdate.getFullYear()}-${String(
        currentdate.getMonth() + 1
      ).padStart(2, "0")}-${String(currentdate.getDate()).padStart(
        2,
        "0"
      )} ${String(currentdate.getHours()).padStart(2, "0")}:${String(
        currentdate.getMinutes()
      ).padStart(2, "0")}:${String(currentdate.getSeconds()).padStart(2, "0")}`;
      const savedata = { lastUpdate: currentdate, data: DATA_ARRAY };
      const convertdata = JSON.stringify(savedata, undefined, 1);
      localStorage.setItem($(this)[0].dataset.deckid, convertdata);
      if (savedata.lastUpdate) {
        $(this).parent().find(".date").text(savedata.lastUpdate);
      }
      if (savedata["data"]?.["calc-result"]?.["memo"] !== undefined) {
        $(this)
          .parent()
          .find("textarea.memo")
          .text(savedata["data"]["calc-result"]["memo"]);
      }
    }
  });
}

function setRawSaveEvents() {
  $('input[type="file"].save_raw').on("change", function () {
    if (window.localStorage && window.File && window.FileReader) {
      let file = $(this)[0].files[0];
      let reader = new FileReader();
      const deckid = $(this)[0].dataset.deckid;
      reader.readAsText(file);
      reader.onload = function () {
        const loaddata = JSON.parse(reader.result);
        if (loaddata.lastUpdate && loaddata.data) {
          localStorage.setItem(deckid, reader.result);
          location.reload();
        }
      };
      reader.onerror = function () {
        console.log(`読出に失敗しました エラー理由：${reader.error}`);
      };
    }
  });

  $("button").on("click", function () {
    const id = $(this)[0].dataset.id;
    $(`#${id}`).click();
  });
}

function setLoadEvents() {
  $('input[type="button"].load').on("click", function () {
    let result;
    result =
      window.confirm(`Webブラウザ内の保存データ で 現在の入力データを更新します
確認したらOKを押してください。`);
    if (window.localStorage && result) {
      const loaddata = localStorage.getItem($(this)[0].dataset.deckid);
      if (loaddata) {
        DATA_ARRAY = JSON.parse(loaddata).data;
        restoreFormData();
      }
    }
  });
}

function setRawLoadEvents() {
  $('input[type="button"].load_raw').on("click", function () {
    const pageid = $("body").prop("id");
    if (window.localStorage) {
      const loaddata = localStorage.getItem($(this)[0].dataset.deckid);
      if (loaddata) {
        const type = EVENT_NAME_CONVERT[pageid];
        const id = $(this)[0].dataset.deckid.split("-");
        let date = JSON.parse(loaddata).lastUpdate;
        date = date.replace(/ /g, "_");
        date = date.replace(/\:/g, "-");

        let blob = new Blob([loaddata], { type: "text/plain" });
        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.download = `${type}_データ${id[id.length - 1]}_${date}`;
        a.href = url;
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }
    }
  });
}

function setMemoUpdateEvents() {
  $('input[type="button"].update').on("click", function () {
    if (window.localStorage) {
      let loaddata = localStorage.getItem($(this)[0].dataset.deckid);
      if (loaddata) {
        let parsedata = JSON.parse(loaddata);

        // memoオブジェクトが未登録の場合は予め作っておく
        if (parsedata["data"]?.["calc-result"]?.["memo"] === undefined) {
          parsedata["data"]["calc-result"] = { memo: "" };
        }

        // テキストエリアから先頭50文字までを切り出して何となくエスケープしてmemoオブジェクトに上書き
        const text = $(this).next().val();
        const text_escaped = escapeText(text.slice(0, 50));
        parsedata["data"]["calc-result"]["memo"] = text_escaped;

        const savedata = {
          lastUpdate: parsedata["lastUpdate"],
          data: parsedata["data"],
        };
        const convertdata = JSON.stringify(savedata, undefined, 1);
        localStorage.setItem($(this)[0].dataset.deckid, convertdata);

        window.alert(`メモを更新しました。`);
      }
    }
  });
}

function escapeText(text) {
  const exchange_dict = {
    "&": "&#x26;",
    "'": "&#x27;",
    "<": "&#x3C;",
    ">": "&#x3E;",
    '"': "&#x42;",
    "`": "&#x60;",
  };

  const text_escaped = text.replace(
    /[&'<>"`]/g,
    (match) => exchange_dict[match]
  );

  return text_escaped;
}

function deEscapeText(text) {
  const exchange_dict = {
    "&#x26;": "&",
    "&#x27;": "'",
    "&#x3C;": "<",
    "&#x3E;": ">",
    "&#x42;": '"',
    "&#x60;": "`",
  };

  let text_escaped = text.slice(0);
  for (const key in exchange_dict) {
    if (Object.hasOwnProperty.call(exchange_dict, key)) {
      const regex = new RegExp(key, "g");
      text_escaped = text_escaped.replace(regex, exchange_dict[key]);
    }
  }

  return text_escaped;
}

function preloadSavedata() {
  if (window.localStorage) {
    const loadbutton = $('input[type="button"].load');
    for (let index = 0; index < loadbutton.length; index++) {
      const loaddata = localStorage.getItem(loadbutton[index].dataset.deckid);
      if (!loaddata) {
        continue;
      }
      const afterconvert = JSON.parse(loaddata);
      if (afterconvert.lastUpdate) {
        $(`#date-history-${index + 1}`).text(afterconvert.lastUpdate);
      }
      if (afterconvert["data"]?.["calc-result"]?.["memo"] !== undefined) {
        $(`#memo-history-${index + 1}`).text(
          deEscapeText(afterconvert["data"]["calc-result"]["memo"])
        );
      }
    }
  }
}

function setChangeEvents() {
  $("select.simtype").on("change", function () {
    location.href = $("select.simtype option:selected").data("url");
  });
}

function setUpdateEvents() {
  $(".inputdata").on("change", function () {
    updateDataArray($(this)[0]);

    // pattern-textフォームの値が変化した場合は 有効文字列のチェックも起動する。
    if ($(this).hasClass("pattern-text")) {
      $(this)[0].reportValidity();
    }
  });
}

function updateDataArray(element) {
  const method_convert = {
    attack: "value",
    heart: "value",
    pattern: "value",
    "pattern-text": "value",
  };

  const section = element.dataset.section;
  const index = element.dataset.index;
  const type = element.dataset.type;
  const method = method_convert[type];

  // 上位のオブジェクトがまだ無い場合は生成する
  if (!DATA_ARRAY[section][index]) {
    DATA_ARRAY[section][index] = {};
  }

  // pattern-text において、所定の文字列以外が含まれる場合は無効なデータとして扱う。
  const regex = new RegExp("[^cnsCNS]");
  if (type === "pattern-text" && regex.test(element[method])) {
    DATA_ARRAY[section][index][type] = "";
  } else {
    DATA_ARRAY[section][index][type] = element[method];
  }

  drawCanvas();
}

function setExchangeEvents() {
  $('input[type="button"]#do-exchange').on("click", function () {
    const before = Number($("#position-before").val());
    const after = Number($("#position-after").val());

    // 移動元と移動先が同じなら何もしない
    if (before === after) {
      return;
    }

    const temp_attack = DATA_ARRAY["member"]?.[String(before)]?.["attack"];
    const temp_heart = DATA_ARRAY["member"]?.[String(before)]?.["heart"];
    if (DATA_ARRAY["member"][String(before)]) {
      delete DATA_ARRAY["member"][String(before)];
    }
    if (before < after) {
      for (let i = before + 1; i <= after; i++) {
        if (DATA_ARRAY["member"][String(i)]) {
          DATA_ARRAY["member"][String(i - 1)] = DATA_ARRAY["member"][String(i)];
        } else {
          delete DATA_ARRAY["member"][String(i - 1)];
        }
      }
      DATA_ARRAY["member"][String(after)] = {};
      DATA_ARRAY["member"][String(after)]["attack"] = temp_attack;
      DATA_ARRAY["member"][String(after)]["heart"] = temp_heart;
    } else {
      for (let i = before - 1; i >= after; i--) {
        if (DATA_ARRAY["member"][String(i)]) {
          DATA_ARRAY["member"][String(i + 1)] = DATA_ARRAY["member"][String(i)];
        } else {
          delete DATA_ARRAY["member"][String(i + 1)];
        }
      }
      DATA_ARRAY["member"][String(after)] = {};
      DATA_ARRAY["member"][String(after)]["attack"] = temp_attack;
      DATA_ARRAY["member"][String(after)]["heart"] = temp_heart;
    }
    restoreFormData();
  });
}

function restoreFormData() {
  const method_convert = {
    attack: "value",
    heart: "value",
    pattern: "checked",
    "pattern-text": "value",
  };

  const keys_array = ["general", "leader", "helper", "member"];

  //全フォームを削除し初期値で再生成
  $("#form-area").empty();
  insertForm();

  keys_array.forEach((element) => {
    const outerkeys = Object.keys(DATA_ARRAY[element]);

    for (let i = 0; i < outerkeys.length; i++) {
      const innerkeys = Object.keys(DATA_ARRAY[element][outerkeys[i]]);

      for (let j = 0; j < innerkeys.length; j++) {
        const innervalue = DATA_ARRAY[element][outerkeys[i]][innerkeys[j]];
        const method = method_convert[innerkeys[j]];
        if (method === "value") {
          $(`#${element}-${outerkeys[i]} .inputdata.${innerkeys[j]}`)
            .val(innervalue)
            .trigger("change");
        } else if (method === "checked") {
          $(
            `#${element}-${outerkeys[i]} .inputdata.${innerkeys[j]}[value="${innervalue}"]`
          )
            .prop("checked", true)
            .trigger("change");
        }
      }
    }
  });

  // ツールチップを再設定
  setTooltips();

  //DataArrayの更新イベントを再設定
  setUpdateEvents();

  //再計算
  drawCanvas();
}

const CANVAS_CONST = {
  COLUMN_BLANK: 30,
  COLUMN_BAND: 70,
  ROW_BLANK: 6,
  ROW_BAND: 16,
  MAX_HEART: 150,
};

function drawCanvas() {
  const heart_sp = 8;
  const heart_nm = 4;
  const heart_cd = 1;
  const canvas = document.getElementById("canvas");
  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const pattern = DATA_ARRAY["general"]?.["1"]?.["pattern"]
    ? DATA_ARRAY["general"]["1"]["pattern"]
    : "special-only";
  let heart_array = [];
  let damage_array = [];

  if (pattern !== "custom") {
    for (let i = 0; i * heart_nm < CANVAS_CONST.MAX_HEART; i++) {
      if (i === 0) {
        if (pattern === "special-only") {
          heart_array.push(heart_sp);
        } else if (pattern === "normal+special" || pattern === "normal-only") {
          heart_array.push(heart_nm);
        } else {
          heart_array.push(heart_cd);
        }
      } else {
        if (pattern === "normal-only" || pattern === "candy+normal") {
          heart_array.push(heart_array[i - 1] + heart_nm);
        } else {
          heart_array.push(heart_array[i - 1] + heart_sp);
        }
      }
      damage_array.push(0);
    }
  } else {
    /* pattern === "custom" */
    const pattern_text = DATA_ARRAY["general"]?.["1"]?.["pattern-text"]
      ? DATA_ARRAY["general"]["1"]["pattern-text"]
      : "";
    for (let i = 0; i < pattern_text.length; i++) {
      if (i === 0) {
        if (pattern_text.charAt(i) === "C" || pattern_text.charAt(i) === "c") {
          heart_array.push(heart_cd);
        } else if (
          pattern_text.charAt(i) === "N" ||
          pattern_text.charAt(i) === "n"
        ) {
          heart_array.push(heart_nm);
        } else {
          /* ((pattern_text.charAt(i) === 'S') || (pattern_text.charAt(i) === 's')) */
          heart_array.push(heart_sp);
        }
      } else {
        if (pattern_text.charAt(i) === "C" || pattern_text.charAt(i) === "c") {
          heart_array.push(heart_array[i - 1] + heart_cd);
        } else if (
          pattern_text.charAt(i) === "N" ||
          pattern_text.charAt(i) === "n"
        ) {
          heart_array.push(heart_array[i - 1] + heart_nm);
        } else {
          /* ((pattern_text.charAt(i) === 'S') || (pattern_text.charAt(i) === 's')) */
          heart_array.push(heart_array[i - 1] + heart_sp);
        }
      }
      damage_array.push(0);
    }
  }

  drawLeader(ctx, heart_array, damage_array);
  drawHelper(ctx, heart_array, damage_array);
  drawMember(ctx, heart_array, damage_array);
  drawLines(ctx, heart_array, damage_array);
}

function drawLeader(ctx, heart_array, damage_array) {
  ctx.fillStyle = getThemeColor("text-main");
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.font = "16px sans-serif";
  ctx.fillText(
    `リーダー`,
    CANVAS_CONST.COLUMN_BLANK * 2 + CANVAS_CONST.COLUMN_BAND * 0.5,
    CANVAS_CONST.ROW_BAND * 1.5
  );

  const leader = DATA_ARRAY["leader"]["1"];
  if (!leader) {
    return;
  } else if (!leader.heart || leader.heart < 1) {
    return;
  }

  let point_array = [];
  for (let i = 0; i < heart_array.length; i++) {
    if (i === 0) {
      const start = CANVAS_CONST.ROW_BAND * 2;
      const length =
        leader.heart * CANVAS_CONST.ROW_BAND +
        (leader.heart - 1) * CANVAS_CONST.ROW_BLANK;

      const carry_over = 0;
      let carry = heart_array[0] - leader.heart;
      if (carry < 0) {
        carry = 0;
      }
      point_array.push([start, length, carry, carry_over]);
    } else {
      const start =
        point_array[i - 1][0] + point_array[i - 1][1] + CANVAS_CONST.ROW_BLANK;
      let length =
        leader.heart * 2 * CANVAS_CONST.ROW_BAND +
        (leader.heart * 2 - 1) * CANVAS_CONST.ROW_BLANK;

      // 繰り越し数の限界のため長さを水増し
      let carry_over = point_array[i - 1][2] - (leader.heart * 2 - 1);
      if (carry_over > 0) {
        length += carry_over * (CANVAS_CONST.ROW_BAND + CANVAS_CONST.ROW_BLANK);
      } else {
        carry_over = 0;
      }
      let carry =
        point_array[i - 1][2] +
        (heart_array[1] - heart_array[0]) -
        leader.heart * 2 -
        carry_over;
      if (carry < 0) {
        carry = 0;
      }
      point_array.push([start, length, carry, carry_over]);
    }
  }

  point_array.forEach((element) => {
    const fill_color =
      leader.attack && leader.attack !== "0"
        ? getThemeColor("background-damage")
        : getThemeColor("background-buf");
    roundRect(
      ctx,
      CANVAS_CONST.COLUMN_BLANK * 2,
      element[0],
      CANVAS_CONST.COLUMN_BAND,
      element[1],
      5,
      getThemeColor("border-color-red"),
      fill_color
    );

    if (element[3] > 0) {
      ngRect(
        ctx,
        CANVAS_CONST.COLUMN_BLANK * 2 + 3,
        element[0] +
          element[1] -
          (element[3] + 1) * (CANVAS_CONST.ROW_BAND + CANVAS_CONST.ROW_BLANK) +
          2,
        CANVAS_CONST.COLUMN_BAND - 6,
        element[3] * (CANVAS_CONST.ROW_BAND + CANVAS_CONST.ROW_BLANK) - 4
      );
    }

    if (leader.attack && leader.attack !== "0") {
      ctx.fillStyle = getThemeColor("text-main");
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.font = "16px sans-serif";
      ctx.fillText(
        `${leader.attack} %`,
        CANVAS_CONST.COLUMN_BLANK * 2 + CANVAS_CONST.COLUMN_BAND * 0.5,
        element[0] + element[1] - 2
      );

      const end_point =
        (element[0] +
          element[1] -
          CANVAS_CONST.ROW_BAND * 2 +
          CANVAS_CONST.ROW_BLANK) /
        (CANVAS_CONST.ROW_BAND + CANVAS_CONST.ROW_BLANK);
      const attack_count = heart_array.findIndex(
        (element) => element >= end_point
      );
      damage_array[attack_count] += Number(leader.attack);
    }
  });
}

function drawHelper(ctx, heart_array, damage_array) {
  ctx.fillStyle = getThemeColor("text-main");
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.font = "16px sans-serif";
  ctx.fillText(
    `助っ人`,
    CANVAS_CONST.COLUMN_BLANK * 7 + CANVAS_CONST.COLUMN_BAND * 5.5,
    CANVAS_CONST.ROW_BAND * 1.5
  );

  const helper = DATA_ARRAY["helper"]["1"];
  if (!helper) {
    return;
  } else if (!helper.heart || helper.heart < 1) {
    return;
  }

  let point_array = [];
  for (let i = 0; i < heart_array.length; i++) {
    if (i === 0) {
      const start = CANVAS_CONST.ROW_BAND * 2;
      const length =
        helper.heart * CANVAS_CONST.ROW_BAND +
        (helper.heart - 1) * CANVAS_CONST.ROW_BLANK;

      const carry_over = 0;
      let carry = heart_array[0] - helper.heart;
      if (carry < 0) {
        carry = 0;
      }
      point_array.push([start, length, carry, carry_over]);
    } else {
      const start =
        point_array[i - 1][0] + point_array[i - 1][1] + CANVAS_CONST.ROW_BLANK;
      let length =
        helper.heart * 2 * CANVAS_CONST.ROW_BAND +
        (helper.heart * 2 - 1) * CANVAS_CONST.ROW_BLANK;

      // 繰り越し数の限界のため長さを水増し
      let carry_over = point_array[i - 1][2] - (helper.heart * 2 - 1);
      if (carry_over > 0) {
        length += carry_over * (CANVAS_CONST.ROW_BAND + CANVAS_CONST.ROW_BLANK);
      } else {
        carry_over = 0;
      }
      let carry =
        point_array[i - 1][2] +
        (heart_array[1] - heart_array[0]) -
        helper.heart * 2 -
        carry_over;
      if (carry < 0) {
        carry = 0;
      }
      point_array.push([start, length, carry, carry_over]);
    }
  }

  point_array.forEach((element) => {
    const fill_color =
      helper.attack && helper.attack !== "0"
        ? getThemeColor("background-damage")
        : getThemeColor("background-buf");
    roundRect(
      ctx,
      CANVAS_CONST.COLUMN_BLANK * 7 + CANVAS_CONST.COLUMN_BAND * 5,
      element[0],
      CANVAS_CONST.COLUMN_BAND,
      element[1],
      5,
      getThemeColor("border-color-blue"),
      fill_color
    );

    if (element[3] > 0) {
      ngRect(
        ctx,
        CANVAS_CONST.COLUMN_BLANK * 7 + CANVAS_CONST.COLUMN_BAND * 5 + 3,
        element[0] +
          element[1] -
          (element[3] + 1) * (CANVAS_CONST.ROW_BAND + CANVAS_CONST.ROW_BLANK) +
          2,
        CANVAS_CONST.COLUMN_BAND - 6,
        element[3] * (CANVAS_CONST.ROW_BAND + CANVAS_CONST.ROW_BLANK) - 4
      );
    }

    if (helper.attack && helper.attack !== "0") {
      ctx.fillStyle = getThemeColor("text-main");
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.font = "16px sans-serif";
      ctx.fillText(
        `${helper.attack} %`,
        CANVAS_CONST.COLUMN_BLANK * 7 + CANVAS_CONST.COLUMN_BAND * 5.5,
        element[0] + element[1] - 2
      );

      const end_point =
        (element[0] +
          element[1] -
          CANVAS_CONST.ROW_BAND * 2 +
          CANVAS_CONST.ROW_BLANK) /
        (CANVAS_CONST.ROW_BAND + CANVAS_CONST.ROW_BLANK);
      const attack_count = heart_array.findIndex(
        (element) => element >= end_point
      );
      damage_array[attack_count] += Number(helper.attack);
    }
  });
}

function drawMember(ctx, heart_array, damage_array) {
  ctx.fillStyle = getThemeColor("text-main");
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.font = "16px sans-serif";
  for (let i = 0; i < 4; i++) {
    ctx.fillText(
      `メンバー${i + 1}`,
      CANVAS_CONST.COLUMN_BLANK * (i + 3) +
        CANVAS_CONST.COLUMN_BAND * (i + 1.5),
      CANVAS_CONST.ROW_BAND * 1.5
    );
  }

  let sum_heart_column = [0, 0, 0, 0];
  let base_line = 0;
  let blank_flg = 0;
  let heart_array_index = 0;

  do {
    for (let i = 0; i < 49; i++) {
      // heart_arrayが空になったら強制終了
      if (heart_array.length - heart_array_index <= 0) {
        blank_flg = 1;
        break;
      }

      const member = DATA_ARRAY["member"][String(i + 1)];
      // ハート数が空白かマイナスのメンバに到達したら強制終了
      if (!member) {
        blank_flg = 1;
        break;
      } else if (!member.heart || member.heart < 1) {
        blank_flg = 1;
        break;
      }

      // このメンバーが入る位置を決定する。ベースライン以下の欄があるところ。
      const next_position = sum_heart_column.findIndex(
        (element) => element <= base_line
      );

      let carry_over =
        base_line - sum_heart_column[next_position] - (member.heart - 1);
      if (carry_over < 0) {
        carry_over = 0;
      }

      const x =
        CANVAS_CONST.COLUMN_BLANK * 3 +
        CANVAS_CONST.COLUMN_BAND +
        next_position * (CANVAS_CONST.COLUMN_BLANK + CANVAS_CONST.COLUMN_BAND);
      const y =
        CANVAS_CONST.ROW_BAND * 2 +
        sum_heart_column[next_position] *
          (CANVAS_CONST.ROW_BAND + CANVAS_CONST.ROW_BLANK);
      const height =
        member.heart * CANVAS_CONST.ROW_BAND +
        (member.heart - 1) * CANVAS_CONST.ROW_BLANK +
        carry_over * (CANVAS_CONST.ROW_BAND + CANVAS_CONST.ROW_BLANK);

      const fill_color =
        member.attack && member.attack !== "0"
          ? getThemeColor("background-damage")
          : getThemeColor("background-buf");
      roundRect(
        ctx,
        x,
        y,
        CANVAS_CONST.COLUMN_BAND,
        height,
        5,
        getThemeColor("border-color-main"),
        fill_color
      );
      if (carry_over !== 0) {
        ngRect(
          ctx,
          x + 3,
          y +
            height -
            (carry_over + 1) *
              (CANVAS_CONST.ROW_BAND + CANVAS_CONST.ROW_BLANK) +
            2,
          CANVAS_CONST.COLUMN_BAND - 6,
          carry_over * (CANVAS_CONST.ROW_BAND + CANVAS_CONST.ROW_BLANK) - 4
        );
      }
      if (member.attack && member.attack !== "0") {
        ctx.fillStyle = getThemeColor("text-main");
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.font = "16px sans-serif";
        ctx.fillText(
          `${member.attack} %`,
          x + CANVAS_CONST.COLUMN_BAND / 2,
          y + height - 2
        );

        const end_point =
          (y + height - CANVAS_CONST.ROW_BAND * 2 + CANVAS_CONST.ROW_BLANK) /
          (CANVAS_CONST.ROW_BAND + CANVAS_CONST.ROW_BLANK);
        const attack_count = heart_array.findIndex(
          (element) => element >= end_point
        );
        damage_array[attack_count] += Number(member.attack);
      }
      ctx.fillStyle = getThemeColor("text-main");
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.font = "16px sans-serif";
      ctx.fillText(`[ ${i + 1} ]`, x + CANVAS_CONST.COLUMN_BAND / 2, y + 2);

      sum_heart_column[next_position] += Number(member.heart) + carry_over;

      // 現在のベースライン内に次のメンバーが入れる位置が無い場合はベースラインを上げる。
      while (
        sum_heart_column.findIndex((element) => element <= base_line) === -1
      ) {
        let add_heart;
        if (base_line === 0) {
          add_heart = heart_array[heart_array_index];
        } else {
          add_heart =
            heart_array[heart_array_index] - heart_array[heart_array_index - 1];
        }
        base_line += add_heart;
        heart_array_index++;

        // 次のハート数が空の場合はwhileから抜ける
        if (heart_array[heart_array_index] === undefined) {
          blank_flg = 1;
          break;
        }
      }
    }
  } while (blank_flg === 0 && base_line < CANVAS_CONST.MAX_HEART);
}

function drawLines(ctx, heart_array, damage_array) {
  let point_array = [];
  for (let i = 0; i < heart_array.length; i++) {
    point_array.push(
      CANVAS_CONST.ROW_BAND * 2 +
        CANVAS_CONST.ROW_BAND * heart_array[i] +
        CANVAS_CONST.ROW_BLANK * (heart_array[i] - 1) +
        CANVAS_CONST.ROW_BLANK / 2
    );
  }

  let sum_skill = 0;
  let sum_all = 0;
  point_array.forEach((element, i) => {
    const heart_dif =
      i === 0 ? heart_array[i] : heart_array[i] - heart_array[i - 1];
    const next_heart = heart_array[i + 1] - heart_array[i];
    const x = CANVAS_CONST.COLUMN_BLANK * 7.5 + CANVAS_CONST.COLUMN_BAND * 6;

    ctx.beginPath();
    ctx.strokeStyle = getThemeColor("border-color-gray");
    ctx.setLineDash([5, 5]);
    ctx.moveTo(CANVAS_CONST.COLUMN_BLANK * 1.5, element);
    ctx.lineTo(
      CANVAS_CONST.COLUMN_BLANK * 7.5 + CANVAS_CONST.COLUMN_BAND * 6.1,
      element
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = getThemeColor("text-main");
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.font = "16px sans-serif";
    ctx.fillText(`${heart_array[i]}`, CANVAS_CONST.COLUMN_BLANK * 1.3, element);
    ctx.textAlign = "left";
    ctx.fillText(`${i + 1} 回目`, x + CANVAS_CONST.COLUMN_BLANK * 0.5, element);
    ctx.textAlign = "left";

    // 飴パンの場合は 100 % で計算、炭酸は ハート × 150 %
    const multiply = heart_dif === 1 ? 100 : 150;

    if (isNaN(next_heart) || next_heart > 1) {
      ctx.fillText(
        `区間: ${damage_array[i]} %  ( ${
          damage_array[i] + heart_dif * multiply
        } % )`,
        x + CANVAS_CONST.COLUMN_BLANK * 0.5,
        element + 20
      );
      ctx.fillText(
        `合計: ${sum_skill + damage_array[i]} %  ( ${
          sum_all + damage_array[i] + heart_dif * multiply
        } % )`,
        x + CANVAS_CONST.COLUMN_BLANK * 0.5,
        element + 40
      );
    }
    sum_skill += damage_array[i];
    sum_all += damage_array[i] + heart_dif * multiply;
  });
}

function roundRect(ctx, x, y, x_dif, y_dif, rad, stroke_color, fill_color) {
  ctx.beginPath();
  ctx.strokeStyle = stroke_color;
  ctx.fillStyle = fill_color;
  ctx.setLineDash([]);
  ctx.moveTo(x, y + rad);
  ctx.arcTo(x, y + y_dif, x + rad, y + y_dif, rad);
  ctx.arcTo(x + x_dif, y + y_dif, x + x_dif, y + y_dif - rad, rad);
  ctx.arcTo(x + x_dif, y, x + x_dif - rad, y, rad);
  ctx.arcTo(x, y, x, y + rad, rad);
  ctx.stroke();
  ctx.fill();
}

function ngRect(ctx, x, y, x_dif, y_dif) {
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.fillStyle = "rgba(128, 128, 128, 0.3)";
  ctx.setLineDash([]);
  ctx.rect(x, y, x_dif, y_dif);
  ctx.stroke();
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.setLineDash([]);
  ctx.moveTo(x, y);
  ctx.lineTo(x + x_dif, y + y_dif);
  ctx.moveTo(x + x_dif, y);
  ctx.lineTo(x, y + y_dif);
  ctx.stroke();
}

function setImportRawDataEvents() {
  $('input[type="file"]#rawData').on("change", function () {
    if (window.localStorage && window.File && window.FileReader) {
      let file = $(this)[0].files[0];
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function () {
        const loaddata = JSON.parse(reader.result);
        if (loaddata.resultStatus === "success" && loaddata.data) {
          // 期待したテキストっぽい感じなら更新処理へ
          importRawData(loaddata);
        }
      };
      reader.onerror = function () {
        console.log(`読出に失敗しました エラー理由：${reader.error}`);
      };
    }

    // 同じファイルを再度読み込んだ場合に備えてvalueを空にする
    $(this).val("");
  });
}

function importRawData(loaddata) {
  const leaderType =
    loaddata["data"]?.["leaderCardBean"]?.["skillBean"]?.["type"];
  const leaderAttack =
    loaddata["data"]?.["leaderCardBean"]?.["skillBean"]?.["value"];
  const leaderHeart =
    loaddata["data"]?.["leaderCardBean"]?.["skillBean"]?.["needHeartCount"];

  if (DATA_ARRAY["leader"]["1"] === undefined) {
    DATA_ARRAY["leader"]["1"] = {};
  }
  if (leaderType === "DAMAGE" && leaderAttack !== undefined) {
    DATA_ARRAY["leader"]["1"]["attack"] = leaderAttack;
  } else {
    // "BUFF" || "PARTY_BUFF" || undifined
    DATA_ARRAY["leader"]["1"]["attack"] = "0";
  }
  if (leaderHeart !== undefined) {
    DATA_ARRAY["leader"]["1"]["heart"] = leaderHeart;
  }

  for (let i = 0; i < loaddata["data"]?.["memberCardBeans"].length; i++) {
    const memberType =
      loaddata["data"]?.["memberCardBeans"][i]["skillBean"]?.["type"];
    const memberAttack =
      loaddata["data"]?.["memberCardBeans"][i]["skillBean"]?.["value"];
    const memberHeart =
      loaddata["data"]?.["memberCardBeans"][i]["skillBean"]?.["needHeartCount"];

    if (DATA_ARRAY["member"][String(i + 1)] === undefined) {
      DATA_ARRAY["member"][String(i + 1)] = {};
    }
    if (memberType === "DAMAGE" && memberAttack !== undefined) {
      DATA_ARRAY["member"][String(i + 1)]["attack"] = memberAttack;
    } else {
      // "BUFF" || "PARTY_BUFF" || undifined
      DATA_ARRAY["member"][String(i + 1)]["attack"] = "0";
    }
    if (memberHeart !== undefined) {
      DATA_ARRAY["member"][String(i + 1)]["heart"] = memberHeart;
    }
  }

  // 更新されたデータに基づいてフォームを再生成する
  restoreFormData();
}

function setTooltips() {
  for (const index in TOOL_TIPS_LIST) {
    const element = TOOL_TIPS_LIST[index]["element"];
    const content = TOOL_TIPS_LIST[index]["content"];

    tippy(element, {
      content: content,
    });
  }
}

const TOOL_TIPS_LIST = [
  {
    element: "div#exchange > div.heading",
    content:
      "メンバーの順序を入れ替えたい場合に使用できます。移動前後の番号を入力した後に[移動する]を選択します。",
  },
  {
    element: "div#general-1 > div.heading",
    content:
      "夜行性に対してどのようなパターンでアタックを行うのかを選択します。カスタムパターンを選択する場合は右の入力欄に具体的なパターンも入力します。例えば、本気炭酸を2回使用後に飴を2回使用する場合は「SSCC」と入力します。",
  },
  {
    element: "div#leader-1 > div:nth-child(1)",
    content:
      "自分のリーダーガールのハンター声援のデータを入力します。%ダメージ声援の場合は、ダメージ%の欄にその数値を入力します。攻援力UP声援の場合はダメージ%の欄は空白のままか、0を入力します。ハート数の欄は1回目の発動に必要なハート数を入力します。",
  },
  {
    element: "div#helper-1 > div:nth-child(1)",
    content:
      "班員からレンタルする助っ人のハンター声援のデータを入力します。%ダメージ声援の場合は、ダメージ%の欄にその数値を入力します。攻援力UP声援の場合はダメージ%の欄は空白のままか、0を入力します。ハート数の欄は1回目の発動に必要なハート数を入力します。",
  },
  {
    element: "div.member > div:nth-child(1)",
    content:
      "自分のメンバーガールのハンター声援のデータを入力します。%ダメージ声援の場合は、ダメージ%の欄にその数値を入力します。攻援力UP声援の場合はダメージ%の欄は空白のままか、0を入力します。ハート数の欄は1回目の発動に必要なハート数を入力します。途中にデータ未入力のメンバーがいる場合は、そこまでの結果を表示します。",
  },
];

const CANVAS_COLORS = {
  lightMode: {
    "text-main": "#000000",
    "border-color-main": "#000000",
    "border-color-red": "#b20000",
    "border-color-blue": "#0300b2",
    "border-color-gray": "#606060",
    "background-damage": "#ffa92948",
    "background-buf": "#ff9dbe48",
  },
  darkMode: {
    "text-main": "#e6e6e6",
    "border-color-main": "#e6e6e6",
    "border-color-red": "#fabea7",
    "border-color-blue": "#c6cfff",
    "border-color-gray": "#a0a0a0",
    "background-damage": "#ffa92948",
    "background-buf": "#ff9dbe48",
  },
};

const getThemeColor = (type) => {
  if ($("html").hasClass("Dark")) {
    return CANVAS_COLORS["darkMode"][type];
  } else {
    return CANVAS_COLORS["lightMode"][type];
  }
};
