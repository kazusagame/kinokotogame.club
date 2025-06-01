'use strict';

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

  // 行削除、行追加
  setClickRowButtonEvents();

  // ツールチップを追加
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
    let pageid = $("body").prop("id");
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

      let savedata = { lastUpdate: currentdate, data: DATA_ARRAY };
      let convertdata = JSON.stringify(savedata, undefined, 1);
      localStorage.setItem($(this)[0].dataset.deckid, convertdata);

      if (savedata.lastUpdate) {
        $(this).parent().find(".date").text(savedata.lastUpdate);
      }
      if (savedata.data["calc-result"].min) {
        $(this).parent().find(".min").text(savedata.data["calc-result"].min);
      } else {
        $(this).parent().find(".min").text("0");
      }
      if (savedata.data["calc-result"].exp) {
        $(this).parent().find(".exp").text(savedata.data["calc-result"].exp);
      } else {
        $(this).parent().find(".exp").text("0");
      }
      if (savedata.data["calc-result"].max) {
        $(this).parent().find(".max").text(savedata.data["calc-result"].max);
      } else {
        $(this).parent().find(".max").text("0");
      }
      if (savedata.data["calc-result"]["clubcup-skilleffect"]) {
        $(this)
          .parent()
          .find(".clubcup-skilleffect")
          .text(savedata.data["calc-result"]["clubcup-skilleffect"].toFixed(1));
      } else {
        $(this).parent().find(".clubcup-skilleffect").text("0");
      }

      if (pageid === "raid-second-attack" || pageid === "raid-second-defence") {
        let pairloaddata = localStorage.getItem($(this)[0].dataset.pairdeckid);
        if (!pairloaddata) {
          $(this).parent().find(".sum").text("---");
        } else {
          let pairafterconvert = JSON.parse(pairloaddata);
          if (
            savedata.data["calc-result"]["exp"].includes("pt") &&
            pairafterconvert.data["calc-result"]["exp"].includes("pt")
          ) {
            const pairA = Number(
              savedata.data["calc-result"].exp
                .replace(/\,/g, "")
                .replace(/ pt/g, "")
            );
            const pairB = Number(
              pairafterconvert.data["calc-result"].exp
                .replace(/\,/g, "")
                .replace(/ pt/g, "")
            );
            $(this)
              .parent()
              .find(".sum")
              .text(`${(pairA + pairB).toLocaleString()} pt`);
          } else if (
            !savedata.data["calc-result"]["exp"].includes("pt") &&
            !pairafterconvert.data["calc-result"]["exp"].includes("pt")
          ) {
            const pairA = Number(
              savedata.data["calc-result"].exp.replace(/\,/g, "")
            );
            const pairB = Number(
              pairafterconvert.data["calc-result"].exp.replace(/\,/g, "")
            );
            $(this)
              .parent()
              .find(".sum")
              .text(`${(pairA + pairB).toLocaleString()}`);
          } else {
            $(this).parent().find(".sum").text("---");
          }
        }
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
      let deckid = $(this)[0].dataset.deckid;
      reader.readAsText(file);
      reader.onload = function () {
        let loaddata = JSON.parse(reader.result);
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
    let id = $(this)[0].dataset.id;
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
      let loaddata = localStorage.getItem($(this)[0].dataset.deckid);
      if (loaddata) {
        const parsedData = JSON.parse(loaddata);

        // バージョンプロパティが存在する場合、新版のデータのため読み込みをスキップする
        if (parsedData && parsedData.version) return;

        DATA_ARRAY = parsedData.data;
        restoreFormData();
      }
    }
  });
}

function setRawLoadEvents() {
  $('input[type="button"].load_raw').on("click", function () {
    let pageid = $("body").prop("id");
    if (window.localStorage) {
      let loaddata = localStorage.getItem($(this)[0].dataset.deckid);
      if (loaddata) {
        let type = EVENT_NAME_CONVERT[pageid];
        let id = $(this)[0].dataset.deckid.split("-");
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

        // バージョンプロパティが存在する場合、新版のデータのため読み込みをスキップする
        if (parsedata && parsedata.version) return;

        // memoオブジェクトが未登録の場合は予め作っておく
        if (parsedata["data"]?.["calc-result"]?.["memo"] === undefined) {
          // parsedata["data"]["calc-result"] = { "memo" : "" };
          parsedata["data"]["calc-result"]["memo"] = "";
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
    let pageid = $("body").prop("id");
    let loadbutton = $('input[type="button"].load');
    for (let index = 0; index < loadbutton.length; index++) {
      let loaddata = localStorage.getItem(loadbutton[index].dataset.deckid);
      if (!loaddata) {
        continue;
      }
      let afterconvert = JSON.parse(loaddata);

      // バージョンプロパティが存在する場合、新版のデータのため読み込みをスキップする
      if (afterconvert && afterconvert.version) continue;

      if (afterconvert.lastUpdate) {
        $(`#date-history-${index + 1}`).text(afterconvert.lastUpdate);
      }
      if (afterconvert.data["calc-result"].min) {
        $(`#min-history-${index + 1}`).text(
          afterconvert.data["calc-result"].min
        );
      } else {
        $(`#min-history-${index + 1}`).text("0");
      }
      if (afterconvert.data["calc-result"].exp) {
        $(`#exp-history-${index + 1}`).text(
          afterconvert.data["calc-result"].exp
        );
      } else {
        $(`#exp-history-${index + 1}`).text("0");
      }
      if (afterconvert.data["calc-result"].max) {
        $(`#max-history-${index + 1}`).text(
          afterconvert.data["calc-result"].max
        );
      } else {
        $(`#max-history-${index + 1}`).text("0");
      }

      if (pageid === "raid-second-attack" || pageid === "raid-second-defence") {
        let pairloaddata = localStorage.getItem(
          loadbutton[index].dataset.pairdeckid
        );
        if (!pairloaddata) {
          $(`#sum-history-${index + 1}`).text("---");
          continue;
        }
        let pairafterconvert = JSON.parse(pairloaddata);
        if (
          afterconvert.data["calc-result"]["exp"].includes("pt") &&
          pairafterconvert.data["calc-result"]["exp"].includes("pt")
        ) {
          const pairA = Number(
            afterconvert.data["calc-result"].exp
              .replace(/\,/g, "")
              .replace(/ pt/g, "")
          );
          const pairB = Number(
            pairafterconvert.data["calc-result"].exp
              .replace(/\,/g, "")
              .replace(/ pt/g, "")
          );
          $(`#sum-history-${index + 1}`).text(
            `${(pairA + pairB).toLocaleString()} pt`
          );
        } else if (
          !afterconvert.data["calc-result"]["exp"].includes("pt") &&
          !pairafterconvert.data["calc-result"]["exp"].includes("pt")
        ) {
          const pairA = Number(
            afterconvert.data["calc-result"].exp.replace(/\,/g, "")
          );
          const pairB = Number(
            pairafterconvert.data["calc-result"].exp.replace(/\,/g, "")
          );
          $(`#sum-history-${index + 1}`).text(
            `${(pairA + pairB).toLocaleString()}`
          );
        } else {
          $(`#sum-history-${index + 1}`).text("---");
        }
      }

      if (pageid === "clubcup") {
        if (afterconvert.data["calc-result"]["clubcup-skilleffect"]) {
          $(`#clubcup-skilleffect-history-${index + 1}`).text(
            afterconvert.data["calc-result"]["clubcup-skilleffect"].toFixed(1)
          );
        } else {
          $(`#clubcup-skilleffect-history-${index + 1}`).text("0");
        }
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
  $("select.type").on("change", function () {
    $(this).removeClass("Pop Sweet Cool All").addClass($(this).val());
  });
  $("select.skill").on("change", function () {
    $(this).removeClass("Pop Sweet Cool All").addClass($(this).val());
  });
  $("select.skilltype").on("change", function () {
    $(this).removeClass("Pop Sweet Cool All").addClass($(this).val());
  });
  $("select.name.precious").on("change", function () {
    $(this)
      .removeClass("Pop Sweet Cool All")
      .addClass(PRECIOS_SCENES[$(this).val()].type);
  });
  $("select.effect.petit").on("change", function () {
    $(this)
      .removeClass("Pop Sweet Cool All")
      .addClass(PETIT_GIRLS_EFFECTS[$(this).val()].type);
  });
  $("select.raidtype").on("change", function () {
    $(this).removeClass("Pop Sweet Cool Normal").addClass($(this).val());
  });
  $("select.simtype").on("change", function () {
    location.href = $("select.simtype option:selected").data("url");
  });
  $(".precious-filter").on("change", function () {
    updatePreciousSelection($(this).parent().parent()[0]);
  });
  $("select.appealType").on("change", function () {
    $("div.InvalidByAppealType")
      .removeClass("battle time-normal time-rare")
      .addClass($(this).val());
  });
  $("input.point-converter").on("change", function () {
    $("div.InvalidByPointConverter")
      .removeClass("false true")
      .addClass(String($(this).prop("checked")));
  });
  $("select#player-data-raidwartype").on("change", function () {
    let flg = $(this).val() === "SSR" ? true : false;
    $("div.InvalidByRaidwarType")
      .removeClass("false true")
      .addClass(String(flg));
  });
  $("div#event-special-0 select.weather").on("change", function () {
    const effect_list = BOARD_WEATHER_LIST?.[this.value]?.["effect-list"];

    // 前回より天気が少ないなどの理由で該当する天気が無い場合はskip
    if (!effect_list) return;

    for (let i = 0; i < MAX_WEATHER_EFFECT; i++) {
      $(`#event-special-weather-${i + 1} .name`).text(effect_list[i]["name"]);
      $(`#event-special-weather-${i + 1} .rate`).text(
        effect_list[i]["rate"] + " %"
      );
    }
  });
}

function setUpdateEvents() {
  $(".inputdata").on("change", function () {
    updateDataArray($(this)[0]);
  });
}

function updateDataArray(element) {
  const method_convert = {
    apower: "value",
    strap: "value",
    type: "value",
    rarity: "value",
    cost: "value",
    skilllv: "value",
    grade: "value",
    club: "checked",
    date: "checked",
    touch: "checked",
    birth: "checked",
    limit: "checked",
    best: "checked",
    special: "checked",
    valid: "checked",
    "skill-1": "value",
    "skill-2": "value",
    "skill-3": "value",
    "skill-4": "value",
    "skill-5": "value",
    "skill-6": "value",
    name: "value",
    star: "value",
    count: "value",
    attack: "value",
    defence: "value",
    "effect-1": "value",
    "effect-2": "value",
    "effect-3": "value",
    "effect-4": "value",
    effect: "value",
    lv: "value",
    position: "value",
    attackcost: "value",
    "menscologne-sweet": "value",
    "menscologne-cool": "value",
    "menscologne-pop": "value",
    "clubitem-sweet": "checked",
    "clubitem-cool": "checked",
    "clubitem-pop": "checked",
    spgirls: "value",
    "multiply-1": "value",
    "multiply-2": "value",
    raidtype: "value",
    raidwartype: "value",
    megabuff: "value",
    megadebuff: "value",
    clubcupbuff: "value",
    clubcupwinbonus: "checked",
    stage: "value",
    "number-of-heart": "value",
    "attack-count": "value",
    "combo-raid": "value",
    "combo-raidwar": "value",
    raidwarBuff: "value",
    raidwarDamage: "value",
    clubcupBottle: "value",
    clubcupSpPercent: "value",
    clubcupSpFixPt: "value",
    clubcupRivalSkillDown: "value",
    clubcupRivalLeaders: "checked",
    clubcupPointUp: "value",
    appealType: "value",
    appealHearts: "value",
    appealTensionMax: "checked",
    appealTurns: "value",
    "point-converter": "checked",
    "assist-members": "checked",
    attack_i: "value",
    skilltype: "value",
    skillrate: "value",
    weather: "value",
    rate: "value",
  };

  let section = element.dataset.section;
  let index = element.dataset.index;
  let type = element.dataset.type;
  let method = method_convert[type];

  // 上位のオブジェクトがまだ無い場合は生成する
  if (!DATA_ARRAY[section][index]) {
    DATA_ARRAY[section][index] = {};
  }

  DATA_ARRAY[section][index][type] = element[method];

  calcTotalPerformance();
}

function restoreFormData() {
  const pageid = $("body").prop("id");

  const method_convert = {
    apower: "value",
    strap: "value",
    type: "value",
    rarity: "value",
    cost: "value",
    skilllv: "value",
    grade: "value",
    club: "checked",
    date: "checked",
    touch: "checked",
    birth: "checked",
    limit: "checked",
    best: "checked",
    special: "checked",
    valid: "checked",
    "skill-1": "value",
    "skill-2": "value",
    "skill-3": "value",
    "skill-4": "value",
    "skill-5": "value",
    "skill-6": "value",
    name: "value",
    star: "value",
    count: "value",
    attack: "value",
    defence: "value",
    "effect-1": "value",
    "effect-2": "value",
    "effect-3": "value",
    "effect-4": "value",
    effect: "value",
    lv: "value",
    position: "value",
    attackcost: "value",
    "menscologne-sweet": "value",
    "menscologne-cool": "value",
    "menscologne-pop": "value",
    "clubitem-sweet": "checked",
    "clubitem-cool": "checked",
    "clubitem-pop": "checked",
    spgirls: "value",
    "multiply-1": "value",
    "multiply-2": "value",
    raidtype: "value",
    raidwartype: "value",
    megabuff: "value",
    megadebuff: "value",
    clubcupbuff: "value",
    clubcupwinbonus: "checked",
    stage: "value",
    "number-of-heart": "value",
    "attack-count": "value",
    "combo-raid": "value",
    "combo-raidwar": "value",
    raidwarBuff: "value",
    raidwarDamage: "value",
    clubcupBottle: "value",
    clubcupSpPercent: "value",
    clubcupSpFixPt: "value",
    clubcupRivalSkillDown: "value",
    clubcupRivalLeaders: "checked",
    clubcupPointUp: "value",
    appealType: "value",
    appealHearts: "value",
    appealTensionMax: "checked",
    appealTurns: "value",
    "point-converter": "checked",
    "assist-members": "checked",
    attack_i: "value",
    skilltype: "value",
    skillrate: "value",
    weather: "value",
    rate: "value",
  };

  let keys_array = [
    "main-scenes",
    "main-skill",
    "sub-scenes",
    "sub-switch",
    "precious-scenes",
    "petit-girls",
    "deck-bonus",
    "player-data",
  ];
  if (pageid === "divrace") {
    keys_array.push("special-item");
  } else if (pageid === "board") {
    keys_array.push("event-special");
  }

  //全フォームを削除し初期値で再生成
  $("#main-scenes").empty();
  $("#sub-scenes").empty();
  $("#precious-scenes").empty();
  $("#petit-girls").empty();
  $("#deck-bonus").empty();
  $("#player-data").empty();
  $("#mode-selector").empty();
  $("#special-item").empty();
  $("#event-special").empty();
  insertForm();

  //要素変更イベントを再設定
  setChangeEvents();

  // 行削除、行追加イベントを再設定
  setClickRowButtonEvents();

  // ツールチップを再設定
  setTooltips();

  if (DATA_ARRAY["calc-result"].min) {
    $("#min-current").text(DATA_ARRAY["calc-result"].min);
  } else {
    $("#min-current").text("0");
  }
  if (DATA_ARRAY["calc-result"].exp) {
    $("#exp-current").text(DATA_ARRAY["calc-result"].exp);
  } else {
    $("#exp-current").text("0");
  }
  if (DATA_ARRAY["calc-result"].max) {
    $("#max-current").text(DATA_ARRAY["calc-result"].max);
  } else {
    $("#max-current").text("0");
  }

  keys_array.forEach((element) => {
    let outerkeys = Object.keys(DATA_ARRAY[element]);

    for (let i = 0; i < outerkeys.length; i++) {
      let innerkeys = Object.keys(DATA_ARRAY[element][outerkeys[i]]);

      for (let j = 0; j < innerkeys.length; j++) {
        let innervalue = DATA_ARRAY[element][outerkeys[i]][innerkeys[j]];
        let method = method_convert[innerkeys[j]];
        if (method === "value") {
          $(`#${element}-${outerkeys[i]} .inputdata.${innerkeys[j]}`)
            .val(innervalue)
            .trigger("change");
        } else if (method === "checked") {
          $(`#${element}-${outerkeys[i]} .inputdata.${innerkeys[j]}`)
            .prop("checked", innervalue)
            .trigger("change");
        }
      }
    }
  });

  //DataArrayの更新イベントを再設定
  setUpdateEvents();

  //再計算
  calcTotalPerformance();
}

function setClickRowButtonEvents() {
  $('input[type="button"].rowadd').on("click", function () {
    let pageid = $("body").prop("id");
    let type = $(this)[0].dataset.type;
    let row = $(this)[0].dataset.row;

    let num;
    if (
      (type === "main-scenes" || type === "main-skill") &&
      (pageid === "championship" || pageid === "championship-defence")
    ) {
      num = MAX_MAIN_GIRLS_CHAMP;
    } else if (
      (type === "main-scenes" || type === "main-skill") &&
      pageid === "divrace"
    ) {
      num = MAX_MAIN_GIRLS_DIVRACE;
    } else if (type === "main-scenes" || type === "main-skill") {
      num = MAX_MAIN_GIRLS;
    } else if (type === "sub-scenes" && pageid === "raid-mega") {
      num = MAX_SUB_GIRLS_MEGA;
    } else if (
      type === "sub-scenes" &&
      (pageid === "championship" || pageid === "championship-defence")
    ) {
      num = MAX_SUB_GIRLS_CHAMP;
    } else if (type === "sub-scenes" && pageid === "divrace") {
      num = MAX_SUB_GIRLS_DIVRACE;
    } else if (type === "sub-scenes") {
      num = MAX_SUB_GIRLS;
    } else if (type === "sub-switch") {
      num = MAX_SWITCH_GIRLS;
    }

    for (let i = num; i > Number(row); i--) {
      if (DATA_ARRAY[type][String(i - 1)]) {
        DATA_ARRAY[type][String(i)] = DATA_ARRAY[type][String(i - 1)];
      } else {
        delete DATA_ARRAY[type][String(i)];
      }
    }
    delete DATA_ARRAY[type][row];

    restoreFormData();
  });

  $('input[type="button"].rowdelete').on("click", function () {
    let pageid = $("body").prop("id");
    let type = $(this)[0].dataset.type;
    let row = $(this)[0].dataset.row;

    let num;
    if (
      (type === "main-scenes" || type === "main-skill") &&
      (pageid === "championship" || pageid === "championship-defence")
    ) {
      num = MAX_MAIN_GIRLS_CHAMP;
    } else if (
      (type === "main-scenes" || type === "main-skill") &&
      pageid === "divrace"
    ) {
      num = MAX_MAIN_GIRLS_DIVRACE;
    } else if (type === "main-scenes" || type === "main-skill") {
      num = MAX_MAIN_GIRLS;
    } else if (type === "sub-scenes" && pageid === "raid-mega") {
      num = MAX_SUB_GIRLS_MEGA;
    } else if (
      type === "sub-scenes" &&
      (pageid === "championship" || pageid === "championship-defence")
    ) {
      num = MAX_SUB_GIRLS_CHAMP;
    } else if (type === "sub-scenes" && pageid === "divrace") {
      num = MAX_SUB_GIRLS_DIVRACE;
    } else if (type === "sub-scenes") {
      num = MAX_SUB_GIRLS;
    } else if (type === "sub-switch") {
      num = MAX_SWITCH_GIRLS;
    }

    for (let i = Number(row); i < num; i++) {
      if (DATA_ARRAY[type][String(i + 1)]) {
        DATA_ARRAY[type][String(i)] = DATA_ARRAY[type][String(i + 1)];
      } else {
        delete DATA_ARRAY[type][String(i)];
      }
    }
    delete DATA_ARRAY[type][num];

    restoreFormData();
  });

  $('input[type="button"].rowUp').on("click", function () {
    let type = $(this)[0].dataset.type;
    let row = $(this)[0].dataset.row;

    // 一番上のガールの場合は何もしない
    if (Number(row) === 1) return;

    exchangeData(type, row, "Up");

    // 主センバツの場合はガールと声援の両方を移動する
    let combiType = "";
    if (type === "main-scenes") combiType = "main-skill";
    if (type === "main-skill") combiType = "main-scenes";
    if (combiType !== "") {
      exchangeData(combiType, row, "Up");
    }

    restoreFormData();
  });

  $('input[type="button"].rowDown').on("click", function () {
    let pageid = $("body").prop("id");
    let type = $(this)[0].dataset.type;
    let row = $(this)[0].dataset.row;

    let num;
    if (
      (type === "main-scenes" || type === "main-skill") &&
      (pageid === "championship" || pageid === "championship-defence")
    ) {
      num = MAX_MAIN_GIRLS_CHAMP;
    } else if (
      (type === "main-scenes" || type === "main-skill") &&
      pageid === "divrace"
    ) {
      num = MAX_MAIN_GIRLS_DIVRACE;
    } else if (type === "main-scenes" || type === "main-skill") {
      num = MAX_MAIN_GIRLS;
    } else if (type === "sub-scenes" && pageid === "raid-mega") {
      num = MAX_SUB_GIRLS_MEGA;
    } else if (
      type === "sub-scenes" &&
      (pageid === "championship" || pageid === "championship-defence")
    ) {
      num = MAX_SUB_GIRLS_CHAMP;
    } else if (type === "sub-scenes" && pageid === "divrace") {
      num = MAX_SUB_GIRLS_DIVRACE;
    } else if (type === "sub-scenes") {
      num = MAX_SUB_GIRLS;
    } else if (type === "sub-switch") {
      num = MAX_SWITCH_GIRLS;
    }

    // 一番下のガールの場合は何もしない
    if (Number(row) === num) return;

    exchangeData(type, row, "Down");

    // 主センバツの場合はガールと声援の両方を移動する
    let combiType = "";
    if (type === "main-scenes") combiType = "main-skill";
    if (type === "main-skill") combiType = "main-scenes";
    if (combiType !== "") {
      exchangeData(combiType, row, "Down");
    }

    restoreFormData();
  });
}

function exchangeData(type, row, direction) {
  let diff = 0;
  if (direction === "Up") {
    diff = -1;
  } else {
    /* direction === "Down" */
    diff = 1;
  }

  const temp = DATA_ARRAY[type][row];

  // 移動前のデータが存在する場合は移動する。存在しない場合は現在のデータ削除のみ行う。
  if (DATA_ARRAY[type][String(Number(row) + diff)]) {
    DATA_ARRAY[type][row] = DATA_ARRAY[type][String(Number(row) + diff)];
  } else {
    delete DATA_ARRAY[type][row];
  }

  // クリック行のデータが存在する場合は移動する。存在しない場合は削除のみ行う。
  if (temp) {
    DATA_ARRAY[type][String(Number(row) + diff)] = temp;
  } else {
    delete DATA_ARRAY[type][String(Number(row) + diff)];
  }
}

function setTooltips() {
  if (typeof tippy === "function") {
    for (const index in TOOL_TIPS_LIST) {
      const element = TOOL_TIPS_LIST[index]["element"];
      const content = TOOL_TIPS_LIST[index]["content"];

      tippy(element, {
        content: content,
      });
    }
  }
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
        } else if (loaddata.data && loaddata.data.success === true) {
          // 期待したテキストっぽい感じなら更新処理へ(コンテスト用)
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
  $('input[type="file"]#rawData_BoardSpecial').on("change", function () {
    if (window.localStorage && window.File && window.FileReader) {
      let file = $(this)[0].files[0];
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function () {
        const loaddata = JSON.parse(reader.result);
        if (loaddata.data) {
          // dataの中身の確認は呼び出した関数の中で実施
          importRawData_BoardSpecial(loaddata);
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
  const fetchedPromise = Promise.all([
    importRawData_MainScene(loaddata),
    importRawData_MainSkill(loaddata),
    importRawData_SubScene(loaddata),
    importRawData_SubSwitch(loaddata),
    importRawData_PreciousScene(loaddata),
    importRawData_PetitGirl(loaddata),
    importRawData_DeckBonus(loaddata),
    importRawData_AttackCost(loaddata),
  ]);

  fetchedPromise
    .then(() => {
      // 更新されたデータに基づいてフォームを再生成する
      restoreFormData();
    })
    .catch((error) => {
      console.log(
        `kinokotogame.club: ファイルの取得に失敗しました。「${error}」`
      );
    });
}

async function importRawData_MainScene(loaddata) {
  const pageid = $("body").prop("id");
  const playerClubType = $('select[name="playerClub"]').val();
  const girl_1 = $("#specialGirl-1").val();
  const girl_2 = $("#specialGirl-2").val();

  let frontDeckList;
  if (pageid === "championship" || pageid === "championship-defence") {
    frontDeckList = loaddata["data"]?.["frontCards"];
  } else if (pageid === "raid-second-attack") {
    frontDeckList = loaddata["data"]?.["attackDeckMap"]?.["frontDeckList"];
  } else if (pageid === "raid-second-defence") {
    frontDeckList = loaddata["data"]?.["defenceDeckMap"]?.["frontDeckList"];
  } else if (pageid === "divrace") {
    frontDeckList =
      loaddata["data"]?.["defaultDeck"]?.["divraceDeckBean"]?.["frontDeckList"];
  } else {
    frontDeckList = loaddata["data"]?.["frontDeckList"];
  }

  if (Array.isArray(frontDeckList)) {
    // 上位オブジェクトの生成と初期化
    DATA_ARRAY["main-scenes"] = {};
    frontDeckList.forEach((element, outerIndex) => {
      DATA_ARRAY["main-scenes"][String(outerIndex + 1)] = {};

      const cardName = element["cardName"];
      const cardNameExcludedTheme = cardName.replace(/\[.*\]/, "");
      let apower, strap;
      if (pageid === "championship-defence") {
        apower = element["baseDefenseRating"];
        if (element["wearDeckCardBean"]) {
          strap = element["wearDeckCardBean"]["defenceEffectValue"];
        } else {
          strap = 0;
        }
      } else if (pageid === "raid-second-defence") {
        apower = element["baseDefenceRating"];
        if (element["wearDeckCardBean"]) {
          strap = element["wearDeckCardBean"]["defenceEffectValue"];
        } else {
          strap = 0;
        }
      } else {
        apower = element["baseAttackRating"];
        if (element["wearDeckCardBean"]) {
          strap = element["wearDeckCardBean"]["attackEffectValue"];
        } else {
          strap = 0;
        }
      }

      let type;
      if (element["sphereName"] === "POP" || element["sphereId"] === 3) {
        type = "Pop";
      } else if (
        element["sphereName"] === "SWEET" ||
        element["sphereId"] === 2
      ) {
        type = "Sweet";
      } else {
        /* (element['sphereName'] === 'COOL') || (element['sphereId'] === 1) */
        type = "Cool";
      }

      let rarity;
      if (element["limitbreakCount"] > 100) {
        rarity = "Luv";
      } else if (element["rarityShortName"] === "UR") {
        rarity = "UR";
      } else if (element["rarityShortName"] === "SSR") {
        rarity = "SSR";
      } else {
        /* element['rarityShortName'] === 'SR' もしくは HR以下 */
        rarity = "SR";
      }

      let cost;
      if (pageid === "championship" || pageid === "championship-defence") {
        cost = "27";
      } else {
        cost = element["power"];
      }

      const skilllv = element["skillLevel"];

      let grade;
      const gradeNumber =
        NAME_TO_PROFILE_CONVERT?.[cardNameExcludedTheme]?.["grade"];
      if (gradeNumber === undefined || gradeNumber === "---") {
        grade = "etc";
      } else {
        grade = gradeNumber.at(0);
      }

      let club;
      const clubTypeNumber =
        NAME_TO_CLUBTYPE_CONVERT?.[cardNameExcludedTheme]?.["clubTypeNumber"];
      if (clubTypeNumber === undefined || clubTypeNumber === "---") {
        club = false;
      } else if (clubTypeNumber === playerClubType) {
        club = true;
      } else {
        club = false;
      }

      let date;
      if (pageid === "championship" || pageid === "championship-defence") {
        date = element["dateFlg"];
      } else {
        date = element["dateBonus"];
      }

      let touch;
      if (pageid === "championship" || pageid === "championship-defence") {
        touch = element["touchFlg"];
      } else {
        if (element["touchBonusRating"] > 0) {
          touch = true;
        } else {
          touch = false;
        }
      }

      let birth;
      if (pageid === "championship" || pageid === "championship-defence") {
        birth = element["birthdayFlg"];
      } else {
        birth = element["birthdayBonus"];
      }

      let limit;
      if (element["limitbreakCount"] > 0) {
        limit = true;
      } else {
        limit = false;
      }

      let best;
      if (pageid === "championship" || pageid === "championship-defence") {
        best = false;
      } else {
        best = element["leader"];
      }

      let special;
      if (girl_1 && cardNameExcludedTheme.includes(girl_1)) {
        special = true;
      } else if (girl_2 && cardNameExcludedTheme.includes(girl_2)) {
        special = true;
      } else {
        special = false;
      }

      DATA_ARRAY["main-scenes"][String(outerIndex + 1)]["apower"] = apower;
      DATA_ARRAY["main-scenes"][String(outerIndex + 1)]["strap"] = strap;
      DATA_ARRAY["main-scenes"][String(outerIndex + 1)]["type"] = type;
      DATA_ARRAY["main-scenes"][String(outerIndex + 1)]["rarity"] = rarity;
      DATA_ARRAY["main-scenes"][String(outerIndex + 1)]["cost"] = cost;
      DATA_ARRAY["main-scenes"][String(outerIndex + 1)]["skilllv"] = skilllv;
      DATA_ARRAY["main-scenes"][String(outerIndex + 1)]["grade"] = grade;
      DATA_ARRAY["main-scenes"][String(outerIndex + 1)]["club"] = club;
      DATA_ARRAY["main-scenes"][String(outerIndex + 1)]["date"] = date;
      DATA_ARRAY["main-scenes"][String(outerIndex + 1)]["touch"] = touch;
      DATA_ARRAY["main-scenes"][String(outerIndex + 1)]["birth"] = birth;
      DATA_ARRAY["main-scenes"][String(outerIndex + 1)]["limit"] = limit;
      DATA_ARRAY["main-scenes"][String(outerIndex + 1)]["best"] = best;
      DATA_ARRAY["main-scenes"][String(outerIndex + 1)]["special"] = special;
    });
  }

  return true;
}

async function importRawData_MainSkill(loaddata) {
  const pageid = $("body").prop("id");
  let max_main = 0;
  if (pageid === "championship" || pageid === "championship-defence") {
    max_main = MAX_MAIN_GIRLS_CHAMP;
  } else if (pageid === "divrace") {
    max_main = MAX_MAIN_GIRLS_DIVRACE;
  } else {
    max_main = MAX_MAIN_GIRLS;
  }

  let frontDeckList;
  if (pageid === "championship" || pageid === "championship-defence") {
    frontDeckList = loaddata["data"]?.["frontCards"];
  } else if (pageid === "raid-second-attack") {
    frontDeckList = loaddata["data"]?.["attackDeckMap"]?.["frontDeckList"];
  } else if (pageid === "raid-second-defence") {
    frontDeckList = loaddata["data"]?.["defenceDeckMap"]?.["frontDeckList"];
  } else if (pageid === "divrace") {
    frontDeckList =
      loaddata["data"]?.["defaultDeck"]?.["divraceDeckBean"]?.["frontDeckList"];
  } else {
    frontDeckList = loaddata["data"]?.["frontDeckList"];
  }

  if (Array.isArray(frontDeckList)) {
    // 上位オブジェクトの生成と初期化
    DATA_ARRAY["main-skill"] = {};
    for (let i = 0; i < max_main; i++) {
      DATA_ARRAY["main-skill"][String(i + 1)] = { valid: false };
    }

    frontDeckList.forEach((element, outerIndex) => {
      let skillEffect;
      if (
        pageid === "divrace" &&
        element["divraceSkillList"] &&
        element["divraceSkillList"].length !== 0
      ) {
        skillEffect = element["divraceSkillList"]?.[0]?.["description"];
      } else if (element["skillList"]) {
        skillEffect = element["skillList"]?.[0]?.["description"];
      } else {
        return;
      }

      if (skillEffect && !skillEffect.includes("DOWN")) {
        let skill_1;
        if (skillEffect.includes("POP")) {
          skill_1 = "Pop";
        } else if (skillEffect.includes("SWEET")) {
          skill_1 = "Sweet";
        } else if (skillEffect.includes("COOL")) {
          skill_1 = "Cool";
        } else {
          skill_1 = "All";
        }

        let skill_2;
        if (
          !skillEffect.includes("主ｾﾝﾊﾞﾂ") &&
          !skillEffect.includes("副ｾﾝﾊﾞﾂ")
        ) {
          skill_2 = "main";
        } else if (
          !skillEffect.includes("主ｾﾝﾊﾞﾂ") &&
          skillEffect.includes("副ｾﾝﾊﾞﾂ")
        ) {
          skill_2 = "sub";
        } else if (
          skillEffect.includes("主ｾﾝﾊﾞﾂ") &&
          !skillEffect.includes("副ｾﾝﾊﾞﾂ")
        ) {
          skill_2 = "main";
        } else {
          skill_2 = "both";
        }

        let skill_3;
        const regex = skillEffect.match(/副ｾﾝﾊﾞﾂ(上位)?[0-9]+人/);
        if (!regex) {
          skill_3 = 0;
        } else {
          skill_3 = regex[0].replace(/(副ｾﾝﾊﾞﾂ|上位|人)/g, "");
        }

        let skill_4;
        if (skillEffect.includes("攻援")) {
          skill_4 = "attack";
        } else if (skillEffect.includes("守援")) {
          skill_4 = "defence";
        } else {
          /* 攻守 */
          skill_4 = "both";
        }

        let skill_5;
        if (skillEffect.includes("ｽｰﾊﾟｰ特大～")) {
          skill_5 = "49";
        } else if (skillEffect.includes("特大～")) {
          skill_5 = "42";
        } else if (skillEffect.includes("大～")) {
          skill_5 = "34";
        } else if (skillEffect.includes("中～")) {
          skill_5 = "29";
        } else if (skillEffect.includes("超ｽｰﾊﾟｰ特大")) {
          skill_5 = "55";
        } else if (skillEffect.includes("超スーパー特大")) {
          skill_5 = "55";
        } else if (skillEffect.includes("ｽｰﾊﾟｰ特大++")) {
          skill_5 = "49";
        } else if (skillEffect.includes("スーパー特大++")) {
          skill_5 = "49";
        } else if (skillEffect.includes("ｽｰﾊﾟｰ特大+")) {
          skill_5 = "44";
        } else if (skillEffect.includes("スーパー特大+")) {
          skill_5 = "44";
        } else if (skillEffect.includes("ｽｰﾊﾟｰ特大")) {
          skill_5 = "42";
        } else if (skillEffect.includes("スーパー特大")) {
          skill_5 = "42";
        } else if (skillEffect.includes("特大++")) {
          skill_5 = "38";
        } else if (skillEffect.includes("特大+")) {
          skill_5 = "36";
        } else if (skillEffect.includes("特大")) {
          skill_5 = "34";
        } else if (skillEffect.includes("大")) {
          skill_5 = "29";
        } else if (skillEffect.includes("中++")) {
          skill_5 = "27";
        } else if (skillEffect.includes("中+")) {
          skill_5 = "25";
        } else if (skillEffect.includes("中")) {
          skill_5 = "24";
        } else {
          skill_5 = "24";
        }

        let skill_6;
        if (skillEffect.includes("+5")) {
          skill_6 = "5";
        } else if (skillEffect.includes("+4")) {
          skill_6 = "4";
        } else if (skillEffect.includes("+3")) {
          skill_6 = "3";
        } else if (skillEffect.includes("+2")) {
          skill_6 = "2";
        } else if (skillEffect.includes("+1")) {
          skill_6 = "1";
        } else {
          skill_6 = "0";
        }

        DATA_ARRAY["main-skill"][String(outerIndex + 1)]["valid"] = true;
        DATA_ARRAY["main-skill"][String(outerIndex + 1)]["skill-1"] = skill_1;
        DATA_ARRAY["main-skill"][String(outerIndex + 1)]["skill-2"] = skill_2;
        DATA_ARRAY["main-skill"][String(outerIndex + 1)]["skill-3"] = skill_3;
        DATA_ARRAY["main-skill"][String(outerIndex + 1)]["skill-4"] = skill_4;
        DATA_ARRAY["main-skill"][String(outerIndex + 1)]["skill-5"] = skill_5;
        DATA_ARRAY["main-skill"][String(outerIndex + 1)]["skill-6"] = skill_6;
      }
    });
  }

  return true;
}

async function importRawData_SubScene(loaddata) {
  const pageid = $("body").prop("id");
  const playerClubType = $('select[name="playerClub"]').val();
  const girl_1 = $("#specialGirl-1").val();
  const girl_2 = $("#specialGirl-2").val();

  let subDeckList;
  if (pageid === "championship" || pageid === "championship-defence") {
    subDeckList = loaddata["data"]?.["subCards"];
  } else if (pageid === "raid-second-attack") {
    subDeckList = loaddata["data"]?.["attackDeckMap"]?.["subDeckList"];
  } else if (pageid === "raid-second-defence") {
    subDeckList = loaddata["data"]?.["defenceDeckMap"]?.["subDeckList"];
  } else if (pageid === "divrace") {
    subDeckList =
      loaddata["data"]?.["defaultDeck"]?.["divraceDeckBean"]?.["subDeckList"];
  } else {
    subDeckList = loaddata["data"]?.["subDeckList"];
  }

  if (Array.isArray(subDeckList)) {
    // 上位オブジェクトの生成と初期化
    DATA_ARRAY["sub-scenes"] = {};
    subDeckList.forEach((element, outerIndex) => {
      DATA_ARRAY["sub-scenes"][String(outerIndex + 1)] = {};

      const cardName = element["cardName"];
      const cardNameExcludedTheme = cardName.replace(/\[.*\]/, "");
      let apower, strap;
      if (pageid === "championship-defence") {
        apower = element["baseDefenseRating"];
        strap = 0;
      } else if (pageid === "raid-second-defence") {
        apower = element["baseDefenceRating"];
        strap = 0;
      } else {
        apower = element["baseAttackRating"];
        strap = 0;
      }

      let type;
      if (element["sphereName"] === "POP" || element["sphereId"] === 3) {
        type = "Pop";
      } else if (
        element["sphereName"] === "SWEET" ||
        element["sphereId"] === 2
      ) {
        type = "Sweet";
      } else {
        /* (element['sphereName'] === 'COOL') || (element['sphereId'] === 1) */
        type = "Cool";
      }

      let rarity;
      if (element["limitbreakCount"] > 100) {
        rarity = "Luv";
      } else if (element["rarityShortName"] === "UR") {
        rarity = "UR";
      } else if (element["rarityShortName"] === "SSR") {
        rarity = "SSR";
      } else {
        /* element['rarityShortName'] === 'SR' もしくは HR以下 */
        rarity = "SR";
      }

      let cost;
      if (pageid === "championship" || pageid === "championship-defence") {
        cost = "27";
      } else {
        cost = element["power"];
      }

      const skilllv = element["skillLevel"];

      let grade;
      const gradeNumber =
        NAME_TO_PROFILE_CONVERT?.[cardNameExcludedTheme]?.["grade"];
      if (gradeNumber === undefined || gradeNumber === "---") {
        grade = "etc";
      } else {
        grade = gradeNumber.at(0);
      }

      let club;
      const clubTypeNumber =
        NAME_TO_CLUBTYPE_CONVERT?.[cardNameExcludedTheme]?.["clubTypeNumber"];
      if (clubTypeNumber === undefined || clubTypeNumber === "---") {
        club = false;
      } else if (clubTypeNumber === playerClubType) {
        club = true;
      } else {
        club = false;
      }

      let date;
      if (pageid === "championship" || pageid === "championship-defence") {
        date = element["dateFlg"];
      } else {
        date = element["dateBonus"];
      }

      let touch = false;
      /*
      if (element['touchBonusRating'] > 0) {
        touch = true;
      } else {
        touch = false;
      }
      */

      let birth;
      if (pageid === "championship" || pageid === "championship-defence") {
        birth = element["birthdayFlg"];
      } else {
        birth = element["birthdayBonus"];
      }

      let limit;
      if (element["limitbreakCount"] > 0) {
        limit = true;
      } else {
        limit = false;
      }

      let best;
      if (pageid === "championship" || pageid === "championship-defence") {
        best = false;
      } else {
        best = element["leader"];
      }

      let special;
      if (girl_1 && cardNameExcludedTheme.includes(girl_1)) {
        special = true;
      } else if (girl_2 && cardNameExcludedTheme.includes(girl_2)) {
        special = true;
      } else {
        special = false;
      }

      DATA_ARRAY["sub-scenes"][String(outerIndex + 1)]["apower"] = apower;
      DATA_ARRAY["sub-scenes"][String(outerIndex + 1)]["strap"] = strap;
      DATA_ARRAY["sub-scenes"][String(outerIndex + 1)]["type"] = type;
      DATA_ARRAY["sub-scenes"][String(outerIndex + 1)]["rarity"] = rarity;
      DATA_ARRAY["sub-scenes"][String(outerIndex + 1)]["cost"] = cost;
      DATA_ARRAY["sub-scenes"][String(outerIndex + 1)]["skilllv"] = skilllv;
      DATA_ARRAY["sub-scenes"][String(outerIndex + 1)]["grade"] = grade;
      DATA_ARRAY["sub-scenes"][String(outerIndex + 1)]["club"] = club;
      DATA_ARRAY["sub-scenes"][String(outerIndex + 1)]["date"] = date;
      DATA_ARRAY["sub-scenes"][String(outerIndex + 1)]["touch"] = touch;
      DATA_ARRAY["sub-scenes"][String(outerIndex + 1)]["birth"] = birth;
      DATA_ARRAY["sub-scenes"][String(outerIndex + 1)]["limit"] = limit;
      DATA_ARRAY["sub-scenes"][String(outerIndex + 1)]["best"] = best;
      DATA_ARRAY["sub-scenes"][String(outerIndex + 1)]["special"] = special;
    });
  }

  return true;
}

async function importRawData_SubSwitch(loaddata) {
  const pageid = $("body").prop("id");

  let subDeckList;
  if (pageid === "championship" || pageid === "championship-defence") {
    subDeckList = loaddata["data"]?.["subCards"];
  } else if (pageid === "raid-second-attack") {
    subDeckList = loaddata["data"]?.["attackDeckMap"]?.["subDeckList"];
  } else if (pageid === "raid-second-defence") {
    subDeckList = loaddata["data"]?.["defenceDeckMap"]?.["subDeckList"];
  } else if (pageid === "divrace") {
    subDeckList =
      loaddata["data"]?.["defaultDeck"]?.["divraceDeckBean"]?.["subDeckList"];
  } else {
    subDeckList = loaddata["data"]?.["subDeckList"];
  }

  if (Array.isArray(subDeckList)) {
    // 上位オブジェクトの生成と初期化
    DATA_ARRAY["sub-switch"] = {};
    for (let i = 0; i < MAX_SWITCH_GIRLS; i++) {
      DATA_ARRAY["sub-switch"][String(i + 1)] = { valid: false };
    }

    let switchIndex = 0;
    subDeckList.forEach((element, outerIndex) => {
      let isSwitchBack;
      if (pageid === "championship" || pageid === "championship-defence") {
        isSwitchBack = element["cardType"] === "EFFECTIVE_MIRROR_BACK";
      } else {
        isSwitchBack =
          element["isMirrorGirl"] === true &&
          element["isMirrorFront"] === false;
      }

      if (isSwitchBack === true && switchIndex < 5) {
        let skillEffect;
        if (pageid === "raid-mega") {
          return;
        } else if (element["skillList"]) {
          skillEffect = element["skillList"]?.[0]?.["description"];
        } else {
          return;
        }

        if (skillEffect && !skillEffect.includes("DOWN")) {
          let skill_1;
          if (skillEffect.includes("POP")) {
            skill_1 = "Pop";
          } else if (skillEffect.includes("SWEET")) {
            skill_1 = "Sweet";
          } else if (skillEffect.includes("COOL")) {
            skill_1 = "Cool";
          } else {
            skill_1 = "All";
          }

          let skill_2;
          if (
            !skillEffect.includes("主ｾﾝﾊﾞﾂ") &&
            !skillEffect.includes("副ｾﾝﾊﾞﾂ")
          ) {
            skill_2 = "main";
          } else if (
            !skillEffect.includes("主ｾﾝﾊﾞﾂ") &&
            skillEffect.includes("副ｾﾝﾊﾞﾂ")
          ) {
            skill_2 = "sub";
          } else if (
            skillEffect.includes("主ｾﾝﾊﾞﾂ") &&
            !skillEffect.includes("副ｾﾝﾊﾞﾂ")
          ) {
            skill_2 = "main";
          } else {
            skill_2 = "both";
          }

          let skill_3;
          const regex = skillEffect.match(/副ｾﾝﾊﾞﾂ(上位)?[0-9]+人/);
          if (!regex) {
            skill_3 = 0;
          } else {
            skill_3 = regex[0].replace(/(副ｾﾝﾊﾞﾂ|上位|人)/g, "");
          }

          let skill_4;
          if (skillEffect.includes("攻援")) {
            skill_4 = "attack";
          } else if (skillEffect.includes("守援")) {
            skill_4 = "defence";
          } else {
            /* 攻守 */
            skill_4 = "both";
          }

          let skill_5;
          if (skillEffect.includes("中～")) {
            skill_5 = "29";
          } else if (skillEffect.includes("特大")) {
            skill_5 = "34";
          } else if (skillEffect.includes("大")) {
            skill_5 = "29";
          } else if (skillEffect.includes("中")) {
            skill_5 = "24";
          } else {
            skill_5 = "24";
          }

          DATA_ARRAY["sub-switch"][String(switchIndex + 1)]["valid"] = true;
          DATA_ARRAY["sub-switch"][String(switchIndex + 1)]["skilllv"] =
            element["skillLevel"];
          DATA_ARRAY["sub-switch"][String(switchIndex + 1)]["skill-1"] =
            skill_1;
          DATA_ARRAY["sub-switch"][String(switchIndex + 1)]["skill-2"] =
            skill_2;
          DATA_ARRAY["sub-switch"][String(switchIndex + 1)]["skill-3"] =
            skill_3;
          DATA_ARRAY["sub-switch"][String(switchIndex + 1)]["skill-4"] =
            skill_4;
          DATA_ARRAY["sub-switch"][String(switchIndex + 1)]["skill-5"] =
            skill_5;

          switchIndex = switchIndex + 1;
        }
      }
    });
  }

  return true;
}

async function importRawData_PreciousScene(loaddata) {
  const pageid = $("body").prop("id");

  let deckPreciousBeanList;
  if (pageid === "championship" || pageid === "championship-defence") {
    deckPreciousBeanList = loaddata["data"]?.["preciousList"];
  } else if (pageid === "raid-second-attack") {
    deckPreciousBeanList =
      loaddata["data"]?.["attackDeckMap"]?.["precious"]?.[
        "deckPreciousBeanList"
      ];
  } else if (pageid === "raid-second-defence") {
    deckPreciousBeanList =
      loaddata["data"]?.["defenceDeckMap"]?.["precious"]?.[
        "deckPreciousBeanList"
      ];
  } else if (pageid === "divrace") {
    deckPreciousBeanList =
      loaddata["data"]?.["defaultDeck"]?.["divraceDeckBean"]?.["precious"]?.[
        "deckPreciousBeanList"
      ];
  } else {
    deckPreciousBeanList =
      loaddata["data"]?.["precious"]?.["deckPreciousBeanList"];
  }

  if (Array.isArray(deckPreciousBeanList)) {
    // 上位オブジェクトの生成と初期化
    DATA_ARRAY["precious-scenes"]["1"] = { valid: false };
    DATA_ARRAY["precious-scenes"]["2"] = { valid: false };
    DATA_ARRAY["precious-scenes"]["3"] = { valid: false };

    deckPreciousBeanList.forEach((element, outerIndex) => {
      // constデータに登録済みのプレシャスシーンの場合だけデータを更新する
      if (PRECIOS_SCENES[element["preciousId"]]) {
        DATA_ARRAY["precious-scenes"][String(outerIndex + 1)]["valid"] = true;
        DATA_ARRAY["precious-scenes"][String(outerIndex + 1)]["name"] =
          element["preciousId"];
        DATA_ARRAY["precious-scenes"][String(outerIndex + 1)]["star"] =
          element["level"];
      }
    });
  }

  return true;
}

async function importRawData_PetitGirl(loaddata) {
  const pageid = $("body").prop("id");

  if (pageid === "championship" || pageid === "championship-defence") {
    const petitgirlDeckBean = loaddata["data"]?.["petitgirlDeckBean"];
    if (petitgirlDeckBean) {
      // 上位オブジェクトの生成と初期化
      DATA_ARRAY["petit-girls"]["0"] = {};
      DATA_ARRAY["petit-girls"]["0"]["attack"] =
        petitgirlDeckBean["petitgirlTotalAttackRating"] -
        petitgirlDeckBean["petitgirlTotalAttackCardEffect"];
      DATA_ARRAY["petit-girls"]["0"]["defence"] =
        petitgirlDeckBean["petitgirlTotalDefenseRating"] -
        petitgirlDeckBean["petitgirlTotalDefenseCardEffect"];
    }
  } else if (pageid === "divrace") {
    const deckRatingInfo =
      loaddata["data"]?.["defaultDeck"]?.["deckRatingInfo"];
    if (deckRatingInfo) {
      // 上位オブジェクトの生成と初期化
      DATA_ARRAY["petit-girls"]["0"] = {};
      DATA_ARRAY["petit-girls"]["0"]["attack"] =
        deckRatingInfo["attackRatingByPetitgirl"];
      DATA_ARRAY["petit-girls"]["0"]["defence"] =
        deckRatingInfo["defenceRatingByPetitgirl"];
    }
  } else {
    const deckRatingInfo = loaddata["data"]?.["deckRatingInfo"];
    if (deckRatingInfo) {
      // 上位オブジェクトの生成と初期化
      DATA_ARRAY["petit-girls"]["0"] = {};
      DATA_ARRAY["petit-girls"]["0"]["attack"] =
        deckRatingInfo["attackRatingByPetitgirl"];
      DATA_ARRAY["petit-girls"]["0"]["defence"] =
        deckRatingInfo["defenceRatingByPetitgirl"];
    }
  }

  let mainPetitgirls;
  if (pageid === "championship" || pageid === "championship-defence") {
    mainPetitgirls =
      loaddata["data"]?.["petitgirlDeckBean"]?.["mainPetitgirls"];
  } else if (pageid === "divrace") {
    mainPetitgirls = loaddata["data"]?.["defaultDeck"]?.["mainPetitgirls"];
  } else {
    mainPetitgirls = loaddata["data"]?.["mainPetitgirls"];
  }

  if (Array.isArray(mainPetitgirls)) {
    // 上位オブジェクトの生成と初期化
    DATA_ARRAY["petit-girls"]["1"] = {
      "effect-1": "255",
      "effect-2": "255",
      "effect-3": "255",
      "effect-4": "255",
    };
    DATA_ARRAY["petit-girls"]["2"] = {
      "effect-1": "255",
      "effect-2": "255",
      "effect-3": "255",
      "effect-4": "255",
    };
    DATA_ARRAY["petit-girls"]["3"] = {
      "effect-1": "255",
      "effect-2": "255",
      "effect-3": "255",
      "effect-4": "255",
    };

    mainPetitgirls.forEach((element, outerIndex) => {
      element["effects"].forEach((effect, innerIndex) => {
        let effect_no =
          PETIT_GIRLS_EFFECTS_REVERSE?.[effect["effectName"]]?.["number"];
        if (effect_no === undefined) effect_no = "255";
        DATA_ARRAY["petit-girls"][String(outerIndex + 1)][
          `effect-${String(innerIndex + 1)}`
        ] = effect_no;
      });
    });
  }

  return true;
}

async function importRawData_DeckBonus(loaddata) {
  const pageid = $("body").prop("id");

  let deckBonusList;
  if (pageid === "championship" || pageid === "championship-defence") {
    deckBonusList = loaddata["data"]?.["deckAdvantages"];
  } else if (pageid === "raid-second-attack") {
    deckBonusList = loaddata["data"]?.["attackDeckMap"]?.["deckBonusList"];
  } else if (pageid === "raid-second-defence") {
    deckBonusList = loaddata["data"]?.["defenceDeckMap"]?.["deckBonusList"];
  } else if (pageid === "divrace") {
    deckBonusList =
      loaddata["data"]?.["defaultDeck"]?.["divraceDeckBean"]?.["deckBonusList"];
  } else {
    deckBonusList = loaddata["data"]?.["deckBonusList"];
  }

  if (Array.isArray(deckBonusList)) {
    // 上位オブジェクトの生成と初期化
    for (let index = 0; index < 7; index++) {
      DATA_ARRAY["deck-bonus"][String(index + 1)] = { lv: "Lv0" };
    }
    let deckBonusIndex = 0;
    deckBonusList.forEach((element, index) => {
      let name;
      let desc;
      let lv;
      if (pageid === "championship" || pageid === "championship-defence") {
        name = element["MDeckBonus"]["deckBonusName"];
        desc = element["MDeckBonus"]["description"];
        lv = element["deckBonusLevel"];
      } else {
        name = element["mDeckBonus"]["deckBonusName"];
        desc = element["mDeckBonus"]["description"];
        lv = element["mDeckBonusLv"];
      }

      let effect;
      if (desc.includes("攻援")) {
        effect = "attack";
      } else if (desc.includes("守援")) {
        effect = "defence";
      } else {
        effect = "both";
      }

      if (name === "シャイニング★スプラッシュ") {
        DATA_ARRAY["deck-bonus"]["6"]["lv"] = `Lv${String(lv)}`;
        DATA_ARRAY["deck-bonus"]["6"]["effect"] = effect;
      } else if (name === "Precious★Friend") {
        DATA_ARRAY["deck-bonus"]["7"]["lv"] = `Lv${String(lv)}`;
        DATA_ARRAY["deck-bonus"]["7"]["effect"] = effect;
      } else {
        DATA_ARRAY["deck-bonus"][String(deckBonusIndex + 1)][
          "lv"
        ] = `Lv${String(lv)}`;
        DATA_ARRAY["deck-bonus"][String(deckBonusIndex + 1)]["effect"] = effect;
        deckBonusIndex++;
      }
    });
  }

  return true;
}

async function importRawData_AttackCost(loaddata) {
  const pageid = $("body").prop("id");

  let maxAttackCost;
  if (pageid === "championship" || pageid === "championship-defence") {
    // カリスマには攻コスト(最大)のデータなし
    return true;
  } else if (pageid === "divrace") {
    // コンテストには攻コスト(最大)のデータなし
    return true;
  } else if (
    pageid === "raid-second-attack" ||
    pageid === "raid-second-defence"
  ) {
    maxAttackCost = loaddata["data"]?.["attackDeckMap"]?.["maxPower"];
  } else {
    maxAttackCost = loaddata["data"]?.["maxPower"];
  }

  if (maxAttackCost) {
    // 上位オブジェクトが未生成の場合は先に生成しておく。
    if (DATA_ARRAY["player-data"]["1"] === undefined) {
      DATA_ARRAY["player-data"]["1"] = {};
    }
    DATA_ARRAY["player-data"]["1"]["attackcost"] = maxAttackCost;
  }

  return true;
}

function updatePreciousSelection(element) {
  const type = $(element).find("select.type").val();
  const rarity = $(element).find("select.rarity").val();
  const effect = $(element).find("select.effect").val();

  const nameElement = $(element).find("select.name");

  // フィルターの前にまず選択肢を空にする。
  nameElement.empty();

  let appendhtml = "";
  let FirstChoise = "0";
  let FirstChoiceFlag = 0;
  for (let p in PRECIOS_SCENES) {
    if (type !== "unselected" && type !== PRECIOS_SCENES[p].type) {
      continue;
    }
    if (rarity !== "unselected" && rarity !== PRECIOS_SCENES[p].rarity) {
      continue;
    }
    if (effect !== "unselected" && effect !== PRECIOS_SCENES[p].effect) {
      continue;
    }

    // フィルターに引っかからなければ選択肢リストに再度追加する。
    if (FirstChoiceFlag === 0) {
      FirstChoise = p;
      FirstChoiceFlag = 1;
    }
    appendhtml += `<option value="${p}" class="${PRECIOS_SCENES[p].type}">${PRECIOS_SCENES[p].name}</option>`;
  }

  // 選択肢リストを追加。
  nameElement.append(appendhtml);

  // 念のため再ソート。
  let options = nameElement.find("option");
  options.detach().sort(function (a, b) {
    let an = Number($(a).val());
    let bn = Number($(b).val());
    return an > bn ? 1 : an < bn ? -1 : 0;
  });
  options.appendTo(nameElement);

  // 選択肢リストの先頭のものを設定し、数値更新のためにchangeイベントを発火する。
  if (FirstChoise !== "0") {
    nameElement.val(FirstChoise).trigger("change");
  }
}

function importRawData_BoardSpecial(loaddata) {
  const fetchedPromise = Promise.all([
    importRawData_Weather(loaddata),
    importRawData_Space(loaddata),
  ]);
  fetchedPromise
    .then(() => {
      // 更新されたデータに基づいてフォームを再生成する
      restoreFormData();
    })
    .catch((error) => {
      console.log(
        `kinokotogame.club: ファイルの取得に失敗しました。「${error}」`
      );
    });
}

async function importRawData_Weather(loaddata) {
  const pageid = $("body").prop("id");
  if (pageid !== "board") return true;

  let weather;
  if (loaddata.data?.weather?.currentIndex) {
    weather =
      loaddata.data?.weather?.weatherBeanList[
        loaddata.data.weather.currentIndex
      ].name;
  } else if (loaddata.data?.redrawBean?.weatherBean) {
    weather = loaddata.data.redrawBean.weatherBean.name;
  }

  if (weather && BOARD_WEATHER_ID_CONVERT?.[weather]) {
    // 上位オブジェクトの生成と初期化
    DATA_ARRAY["event-special"]["0"] = {};
    DATA_ARRAY["event-special"]["0"]["weather"] =
      BOARD_WEATHER_ID_CONVERT[weather];
  }

  return true;
}

async function importRawData_Space(loaddata) {
  const pageid = $("body").prop("id");
  if (pageid !== "board") return true;

  let space;
  if (loaddata.data?.surface?.spaceEffectBeanList) {
    space = loaddata.data.surface.spaceEffectBeanList;
  } else if (loaddata.data?.redrawBean?.spaceEffectBeanList) {
    space = loaddata.data.redrawBean.spaceEffectBeanList;
  } else if (loaddata.data?.spaceEffectBeanList) {
    space = loaddata.data.spaceEffectBeanList;
  }

  if (space) {
    // 上位オブジェクトの生成と初期化
    for (let i = 0; i < MAX_SPACE_EFFECT; i++) {
      DATA_ARRAY["event-special"][String(i + 1)] = {};
    }

    space.forEach((effect) => {
      const key = BOARD_SPACE_EFFECT_CONVERT?.[effect.description];
      DATA_ARRAY["event-special"][key]["rate"] = String(
        effect.effectRate / 100
      );
    });
  }

  return true;
}
