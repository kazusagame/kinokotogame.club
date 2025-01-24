"use strict";

jQuery(function () {
  insertTitle();
  insertForm();
  setEvents();
  preloadSavedata();
  insertChangeLog();
  calcTotalPerformance(); // 初回表示用に追加。
});

function insertForm() {
  let pageid = $("body").prop("id");
  let max_main = 0,
    max_sub = 0,
    max_switch = 0;

  if (pageid === "raid-mega") {
    max_main = MAX_MAIN_GIRLS;
    max_sub = MAX_SUB_GIRLS_MEGA;
    max_switch = MAX_SWITCH_GIRLS_MEGA;
  } else if (pageid === "championship" || pageid === "championship-defence") {
    max_main = MAX_MAIN_GIRLS_CHAMP;
    max_sub = MAX_SUB_GIRLS_CHAMP;
    max_switch = MAX_SWITCH_GIRLS;
  } else if (pageid === "divrace") {
    max_main = MAX_MAIN_GIRLS_DIVRACE;
    max_sub = MAX_SUB_GIRLS_DIVRACE;
    max_switch = MAX_SWITCH_GIRLS;
  } else {
    max_main = MAX_MAIN_GIRLS;
    max_sub = MAX_SUB_GIRLS;
    max_switch = MAX_SWITCH_GIRLS;
  }

  mainGirlsForm(max_main);
  subGirlsForm(max_sub, max_switch);
  preciousScenesForm(MAX_PRECIOUS_SCENES);
  petitGirlsForm(MAX_PETIT_GIRLS);
  deckBonusForm();
  playerDataForm();
  modeSelectorForm();

  if (pageid === "divrace") {
    eventSpecialForm_divrace();
    DATA_ARRAY["special-item"] ?? (DATA_ARRAY["special-item"] = {});
  } else if (pageid === "board") {
    eventSpecialForm_board();
    DATA_ARRAY["event-special"] ?? (DATA_ARRAY["event-special"] = {});
  }
}

function insertTitle() {
  let pageid = $("body").prop("id");

  let appendhtml = `
  <div class="simtype selectmark">
  <select name="simtype" class="simtype">
  <option value="raid-first" data-url="/decksim_v1/raid-first/index.html">たすけて！マイヒーロー 前半</option>
  <option value="raid-second-attack" data-url="/decksim_v1/raid-second-attack/index.html">たすけて！マイヒーロー 後半攻援</option>
  <option value="raid-second-defence" data-url="/decksim_v1/raid-second-defence/index.html">たすけて！マイヒーロー 後半守援</option>
  <option value="raid-mega" data-url="/decksim_v1/raid-mega/index.html">たすけて！マイヒーロー メガ悪男</option>
  <option value="raidwar" data-url="/decksim_v1/raidwar/index.html">おねがい★ハンターズ</option>
  <option value="raidwar-skill" data-url="/decksim_v1/raidwar-skill/index.html">おねがい★ハンターズ ハンター声援</option>
  <option value="clubcup" data-url="/decksim_v1/clubcup/index.html">部活対抗！勧誘★グランプリ</option>
  <option value="championship" data-url="/decksim_v1/championship/index.html">聖櫻学園★カリスマ決定戦 攻援</option>
  <option value="championship-defence" data-url="/decksim_v1/championship-defence/index.html">聖櫻学園★カリスマ決定戦 守援</option>
  <option value="tower" data-url="/decksim_v1/tower/index.html">聖櫻学園ﾒﾓﾘｱﾙｽﾄｰﾘｰ & 聖櫻ｽﾄｰﾘｰ 兼用</option>
  <option value="divrace" data-url="/decksim_v1/divrace/index.html">全国高校生課外活動コンテスト</option>
  <option value="board" data-url="/decksim_v1/board/index.html">散策♪聖櫻ワールド</option>
  <option value="normal-battle" data-url="/decksim_v1/normal-battle/index.html">通常バトル</option>
  <option value="backpage" data-url="/decksim/">1つ前のページに戻る</option>
  </select>
  </div>`;
  $("#simtitle").append(appendhtml);
  $("#simtitle select").val(pageid);
}

function mainGirlsForm(num) {
  let pageid = $("body").prop("id");
  let appendhtml = "<h2>主センバツ</h2>";
  appendhtml += `<div class="x-scroll-container">`;

  for (let index = 0; index < num; index++) {
    if (index % 10 === 0) {
      appendhtml += `
      <div class="heading main scenes">
      <div class="rowadd"></div>
      <div class="rowdelete"></div>
      <div class="rowUp"></div>
      <div class="rowDown"></div>
      <div class="number"></div>`;

      if (
        pageid === "raid-second-defence" ||
        pageid === "championship-defence"
      ) {
        appendhtml += `<div class="apower"><p class="inform-tooltips">守援力</p></div>`;
      } else {
        appendhtml += `<div class="apower"><p class="inform-tooltips">攻援力</p></div>`;
      }

      appendhtml += `
        <div class="strap"><p class="inform-tooltips">ストラップ</p></div>
        <div class="type">タイプ</div>
        <div class="rarity">レアリティ</div>
        <div class="cost">コスト</div>
        <div class="skilllv">声援Lv</div>`;
      if (pageid === "board") {
        appendhtml += `<div class="grade"><p class="inform-tooltips">学年</p></div>`;
      }
      appendhtml += `
        <div class="club"><p class="inform-tooltips">部活一致</p></div>
        <div class="date"><p class="inform-tooltips">デート中</p></div>
        <div class="touch"><p class="inform-tooltips">タッチ中</p></div>
        <div class="birth"><p class="inform-tooltips">誕生日</p></div>
        <div class="limit"><p class="inform-tooltips">Ex進展</p></div>
        <div class="best"><p class="inform-tooltips">本命ガール</p></div>`;

      if (pageid === "divrace") {
        appendhtml += `<div class="special"><p class="inform-tooltips">予選ガール</p></div>`;
      } else {
        appendhtml += `<div class="special"><p class="inform-tooltips">有利ガール</p></div>`;
      }

      appendhtml += `
        <div class="result-1"><p class="inform-tooltips">補正後個人</p></div>
        <div class="result-2">← 小さい順</div>`;

      if (pageid === "clubcup") {
        appendhtml += `<div class="clubcup-skilleffect"><p class="inform-tooltips">声援効果</p></div>`;
      }
      if (pageid === "divrace") {
        appendhtml += `
          <div class="result-event-sp-1"><p class="inform-tooltips">風向き加算後</p></div>
          <div class="result-event-sp-2">← 小さい順</div>`;
      }
      if (pageid === "board") {
        appendhtml += `
          <div class="result-event-sp-1"><p class="inform-tooltips">マス/天気加算</p></div>
          <div class="result-event-sp-2">← 小さい順</div>`;
      }
      if (pageid === "normal-battle") {
        appendhtml += `
          <div class="result-event-sp-1"><p class="inform-tooltips">コスト比</p></div>
          <div class="result-event-sp-2">← 小さい順</div>`;
      }

      appendhtml += `</div>`;
    }

    appendhtml += `
      <div class="body main scenes" id="main-scenes-${index + 1}">
        <div class="rowadd">
          <input type='button' class="rowadd" value='行追加' data-type="main-scenes" data-row=${
            index + 1
          }>
        </div>
        <div class="rowdelete">
          <input type='button' class="rowdelete" value='行削除' data-type="main-scenes" data-row=${
            index + 1
          }>
        </div>
        <div class="rowUp">
          <input type='button' class="rowUp" value='▲' data-type="main-scenes" data-row=${
            index + 1
          }>
        </div>
        <div class="rowDown">
          <input type='button' class="rowDown" value='▼' data-type="main-scenes" data-row=${
            index + 1
          }>
        </div>
        <div class="number">${index + 1}</div>`;
    appendhtml += `
        <input type="number" name="main-scenes-${
          index + 1
        }-apower" class="apower inputdata" placeholder="例:30000" data-section="main-scenes" data-index="${
      index + 1
    }" data-type="apower">
        <input type="number" name="main-scenes-${
          index + 1
        }-strap" class="strap inputdata" placeholder="例:36000" data-section="main-scenes" data-index="${
      index + 1
    }" data-type="strap">
        <div class="type selectmark">
          <select name="main-scenes-${
            index + 1
          }-type" class="type Pop inputdata" data-section="main-scenes" data-index="${
      index + 1
    }" data-type="type">
            <option value="Pop" class="Pop">Pop</option>
            <option value="Sweet" class="Sweet">Sweet</option>
            <option value="Cool" class="Cool">Cool</option>
          </select>
        </div>
        <div class="rarity selectmark">
          <select name="main-scenes-${
            index + 1
          }-rarity" class="rarity inputdata" data-section="main-scenes" data-index="${
      index + 1
    }" data-type="rarity">
            <option value="SSR">SSR</option>
            <option value="UR">UR</option>
            <option value="Luv">ラブリー</option>
            <option value="SR">SR</option>
          </select>
        </div>
        <input type="number" name="main-scenes-${
          index + 1
        }-cost" class="cost inputdata" value="27" data-section="main-scenes" data-index="${
      index + 1
    }" data-type="cost">
        <input type="number" name="main-scenes-${
          index + 1
        }-skilllv" class="skilllv inputdata" value="${INIT_SKILL_LEVEL}" data-section="main-scenes" data-index="${
      index + 1
    }" data-type="skilllv">`;

    if (pageid === "board") {
      appendhtml += `
          <div class="grade selectmark">
            <select name="main-scenes-${
              index + 1
            }-grade" class="grade inputdata" data-section="main-scenes" data-index="${
        index + 1
      }" data-type="grade">
              <option value="1">1年生</option>
              <option value="2">2年生</option>
              <option value="3">3年生</option>
              <option value="etc">その他</option>
            </select>
          </div>`;
    }

    appendhtml += `
        <div class="club custom-checkbox">
          <label><input type="checkbox" name="main-scenes-${
            index + 1
          }-club" class="club inputdata" value="" data-section="main-scenes" data-index="${
      index + 1
    }" data-type="club"><span></span></label>
        </div>
        <div class="date custom-checkbox">
          <label><input type="checkbox" name="main-scenes-${
            index + 1
          }-date" class="date inputdata" value="" data-section="main-scenes" data-index="${
      index + 1
    }" data-type="date"><span></span></label>
        </div>
        <div class="touch custom-checkbox">
          <label><input type="checkbox" name="main-scenes-${
            index + 1
          }-touch" class="touch inputdata" value="" data-section="main-scenes" data-index="${
      index + 1
    }" data-type="touch"><span></span></label>
        </div>
        <div class="birth custom-checkbox">
          <label><input type="checkbox" name="main-scenes-${
            index + 1
          }-birth" class="birth inputdata" value="" data-section="main-scenes" data-index="${
      index + 1
    }" data-type="birth"><span></span></label>
        </div>
        <div class="limit custom-checkbox">
          <label><input type="checkbox" name="main-scenes-${
            index + 1
          }-limit" class="limit inputdata" value="" data-section="main-scenes" data-index="${
      index + 1
    }" data-type="limit"><span></span></label>
        </div>
        <div class="best custom-checkbox">
          <label><input type="checkbox" name="main-scenes-${
            index + 1
          }-best" class="best inputdata" value="" data-section="main-scenes" data-index="${
      index + 1
    }" data-type="best"><span></span></label>
        </div>
        <div class="special custom-checkbox">
          <label><input type="checkbox" name="main-scenes-${
            index + 1
          }-special" class="special inputdata" value="" data-section="main-scenes" data-index="${
      index + 1
    }" data-type="special"><span></span></label>
        </div>
        <div class="result-1">0</div>
        <div class="result-2">-</div>`;

    if (pageid === "clubcup") {
      appendhtml += `<div class="clubcup-skilleffect">0 %</div>`;
    }
    if (
      pageid === "divrace" ||
      pageid === "board" ||
      pageid === "normal-battle"
    ) {
      appendhtml += `
          <div class="result-event-sp-1">0</div>
          <div class="result-event-sp-2">-</div>`;
    }

    appendhtml += `</div>`;
  }
  appendhtml += `</div>`;

  appendhtml += `<div class="x-scroll-container">`;
  for (let index = 0; index < num; index++) {
    if (index % 10 === 0) {
      appendhtml += `
        <div class="heading main skill">
        <div class="rowadd"></div>
        <div class="rowdelete"></div>
        <div class="rowUp"></div>
        <div class="rowDown"></div>
        <div class="number"></div>
        <div class="valid"><p class="inform-tooltips">有無</p></div>
        <div class="skill skill-1"><p class="inform-tooltips">声援対象1</p></div>
        <div class="skill skill-2"><p class="inform-tooltips">声援対象2</p></div>
        <div class="skill skill-3"><p class="inform-tooltips">対象副人数</p></div>
        <div class="skill skill-4">声援効果1</div>
        <div class="skill skill-5 wide">声援効果2</div>
        <div class="skill skill-6"><p class="inform-tooltips">声援変更</p></div>
        <div class="skill-effect"><p class="inform-tooltips">効果値</p></div>
        <div class="s70"></div>
        <div class="skill-total"><p class="inform-tooltips">発動時合計</p></div>
        <div class="skill-chance"><p class="inform-tooltips">発動率</p></div>`;

      if (pageid === "clubcup") {
        appendhtml += `<div class="clubcup-skilleffect"><p class="inform-tooltips">声援効果</p></div>`;
      }

      appendhtml += `</div>`;
    }

    appendhtml += `
    <div class="body main skill" id="main-skill-${index + 1}">
      <div class="rowadd">
        <input type='button' class="rowadd" value='行追加' data-type="main-skill" data-row=${
          index + 1
        }>
      </div>
      <div class="rowdelete">
        <input type='button' class="rowdelete" value='行削除' data-type="main-skill" data-row=${
          index + 1
        }>
      </div>
      <div class="rowUp">
        <input type='button' class="rowUp" value='▲' data-type="main-skill" data-row=${
          index + 1
        }>
      </div>
      <div class="rowDown">
        <input type='button' class="rowDown" value='▼' data-type="main-skill" data-row=${
          index + 1
        }>
      </div>
      <div class="number">${index + 1}</div>
      <div class="valid custom-checkbox">
        <label><input type="checkbox" name="main-scenes-${
          index + 1
        }-valid" class="valid inputdata" checked data-section="main-skill" data-index="${
      index + 1
    }" data-type="valid"><span></span></label>
      </div>
      <div class="skill selectmark">
        <select name="main-scenes-${
          index + 1
        }-skill-1" class="skill Pop inputdata skill-1" data-section="main-skill" data-index="${
      index + 1
    }" data-type="skill-1">
          <option value="Pop" class="Pop">Pop</option>
          <option value="Sweet" class="Sweet">Sweet</option>
          <option value="Cool" class="Cool">Cool</option>
          <option value="All" class="All">全タイプ</option>
        </select>
      </div>
      <div class="skill selectmark">
        <select name="main-scenes-${
          index + 1
        }-skill-2" class="skill inputdata skill-2" data-section="main-skill" data-index="${
      index + 1
    }" data-type="skill-2">
          <option value="both">主＋副</option>
          <option value="main">主のみ</option>
          <option value="sub">副のみ</option>
        </select>
      </div>
      <div class="skill">
        <input type="number" name="main-scenes-${
          index + 1
        }-skill-3" class="skill inputdata skill-3" value="1" data-section="main-skill" data-index="${
      index + 1
    }" data-type="skill-3">
      </div>
      <div class="skill selectmark">
        <select name="main-scenes-${
          index + 1
        }-skill-4" class="skill inputdata skill-4" data-section="main-skill" data-index="${
      index + 1
    }" data-type="skill-4">
          <option value="attack">攻</option>
          <option value="defence">守</option>
          <option value="both">攻守</option>
        </select>
      </div>
      <div class="skill wide selectmark">
        <select name="main-scenes-${
          index + 1
        }-skill-5" class="skill inputdata skill-5" data-section="main-skill" data-index="${
      index + 1
    }" data-type="skill-5">
          <option value="55">超スーパー特大UP</option>
          <option value="49">スーパー特大++UP</option>>
          <option value="44">スーパー特大+UP</option>>
          <option value="42">スーパー特大UP</option>
          <option value="38">特大++UP</option>
          <option value="36">特大+UP</option>
          <option value="34">特大UP</option>
          <option value="29">大UP</option>
          <option value="27">中++UP</option>
          <option value="25">中+UP</option>
          <option value="24">中UP</option>
        </select>
      </div>
      <div class="skill selectmark">
        <select name="main-scenes-${
          index + 1
        }-skill-6" class="skill inputdata skill-6" data-section="main-skill" data-index="${
      index + 1
    }" data-type="skill-6">
          <option value="0">  </option>
          <option value="1">+1</option>
          <option value="2">+2</option>
          <option value="3">+3</option>
          <option value="4">+4</option>
          <option value="5">+5</option>
        </select>
      </div>
      <div class="skill-effect">50 %</div>
      <div class="s70"></div>
      <div class="skill-total">0</div>`;

    if (
      pageid === "raid-first" ||
      pageid === "raid-mega" ||
      pageid === "championship" ||
      pageid === "championship-defence"
    ) {
      appendhtml += `<div class="skill-chance">${SKILL_CHANCE_MAINLIMIT_5[index]} %</div>`;
    } else if (pageid === "clubcup") {
      appendhtml += `<div class="skill-chance">${SKILL_CHANCE_MAINLIMIT_5_ALWAYS[index]} %</div>`;
    } else if (
      pageid === "raid-second-attack" ||
      pageid === "raid-second-defence"
    ) {
      appendhtml += `<div class="skill-chance">${SKILL_CHANCE_MAINLIMIT_3_ALWAYS[index]} %</div>`;
    } else {
      // "raidwar" || "tower" || "divrace" || "board"
      appendhtml += `<div class="skill-chance">${SKILL_CHANCE_MAINLIMIT_3[index]} %</div>`;
    }

    if (pageid === "clubcup") {
      appendhtml += `<div class="clubcup-skilleffect">0 %</div>`;
    }

    appendhtml += `</div>`;
  }
  appendhtml += `</div>`;

  $("#main-scenes").append(appendhtml);
}

function subGirlsForm(num, max_switch) {
  let pageid = $("body").prop("id");
  let appendhtml = "<h2>副センバツ</h2>";
  appendhtml += `<div class="x-scroll-container">`;

  for (let index = 0; index < num; index++) {
    if (index % 10 === 0) {
      appendhtml += `
      <div class="heading sub">
        <div class="rowadd"></div>
        <div class="rowdelete"></div>
        <div class="rowUp"></div>
        <div class="rowDown"></div>
        <div class="number"></div>`;

      if (
        pageid === "raid-second-defence" ||
        pageid === "championship-defence"
      ) {
        appendhtml += `<div class="apower"><p class="inform-tooltips">守援力</p></div>`;
      } else {
        appendhtml += `<div class="apower"><p class="inform-tooltips">攻援力</p></div>`;
      }

      appendhtml += `
          <div class="strap">ストラップ</div>
          <div class="type">タイプ</div>
          <div class="rarity">レアリティ</p></div>
          <div class="cost">コスト</div>
          <div class="skilllv">声援Lv</div>`;
      if (pageid === "board") {
        appendhtml += `<div class="grade"><p class="inform-tooltips">学年</p></div>`;
      }
      appendhtml += `
          <div class="club"><p class="inform-tooltips">部活一致</p></div>
          <div class="date"><p class="inform-tooltips">デート中</p></div>
          <div class="touch"><p class="inform-tooltips">タッチ中</p></div>
          <div class="birth"><p class="inform-tooltips">誕生日</p></div>
          <div class="limit"><p class="inform-tooltips">Ex進展</p></div>
          <div class="best"><p class="inform-tooltips">本命ガール</p></div>`;

      if (pageid === "divrace") {
        appendhtml += `<div class="special"><p class="inform-tooltips">予選ガール</p></div>`;
      } else {
        appendhtml += `<div class="special"><p class="inform-tooltips">有利ガール</p></div>`;
      }

      appendhtml += `
        <div class="result-1"><p class="inform-tooltips">補正後個人</p></div>
        <div class="result-2">← 小さい順</div>`;

      if (pageid === "clubcup") {
        appendhtml += `<div class="clubcup-skilleffect"><p class="inform-tooltips">声援効果</p></div>`;
      }
      if (pageid === "divrace") {
        appendhtml += `
          <div class="result-event-sp-1"><p class="inform-tooltips">風向き加算後</p></div>
          <div class="result-event-sp-2">← 小さい順</div>`;
      }
      if (pageid === "board") {
        appendhtml += `
          <div class="result-event-sp-1"><p class="inform-tooltips">マス/天気加算</p></div>
          <div class="result-event-sp-2">← 小さい順</div>`;
      }
      if (pageid === "normal-battle") {
        appendhtml += `
          <div class="result-event-sp-1"><p class="inform-tooltips">コスト比</p></div>
          <div class="result-event-sp-2">← 小さい順</div>`;
      }

      appendhtml += `</div>`;
    }

    appendhtml += `
    <div class="body sub" id="sub-scenes-${index + 1}">
      <div class="rowadd">
        <input type='button' class="rowadd" value='行追加' data-type="sub-scenes" data-row=${
          index + 1
        }>
      </div>
      <div class="rowdelete">
        <input type='button' class="rowdelete" value='行削除' data-type="sub-scenes" data-row=${
          index + 1
        }>
      </div>
      <div class="rowUp">
        <input type='button' class="rowUp" value='▲' data-type="sub-scenes" data-row=${
          index + 1
        }>
      </div>
      <div class="rowDown">
        <input type='button' class="rowDown" value='▼' data-type="sub-scenes" data-row=${
          index + 1
        }>
      </div>
      <div class="number">${index + 1}</div>
      <input type="number" name="sub-scenes-${
        index + 1
      }-apower" class="apower inputdata" placeholder="例:30000" data-section="sub-scenes" data-index="${
      index + 1
    }" data-type="apower">
      <input type="number" name="sub-scenes-${
        index + 1
      }-strap" class="strap inputdata" value="0" readonly data-section="sub-scenes" data-index="${
      index + 1
    }" data-type="strap">
      <div class="type selectmark">
        <select name="sub-scenes-${
          index + 1
        }-type" class="type Pop inputdata" data-section="sub-scenes" data-index="${
      index + 1
    }" data-type="type">
          <option value="Pop" class="Pop">Pop</option>
          <option value="Sweet" class="Sweet">Sweet</option>
          <option value="Cool" class="Cool">Cool</option>
        </select>
      </div>
      <div class="rarity selectmark">
        <select name="sub-scenes-${
          index + 1
        }-rarity" class="rarity inputdata" data-section="sub-scenes" data-index="${
      index + 1
    }" data-type="rarity">
          <option value="SSR">SSR</option>
          <option value="UR">UR</option>
          <option value="Luv">ラブリー</option>
          <option value="SR">SR</option>
        </select>
      </div>
      <input type="number" name="sub-scenes-${
        index + 1
      }-cost" class="cost inputdata" value="27" data-section="sub-scenes" data-index="${
      index + 1
    }" data-type="cost">
      <input type="number" name="sub-scenes-${
        index + 1
      }-skilllv" class="skilllv inputdata"  value="${INIT_SKILL_LEVEL}" data-section="sub-scenes" data-index="${
      index + 1
    }" data-type="skilllv">`;

    if (pageid === "board") {
      appendhtml += `
        <div class="grade selectmark">
          <select name="sub-scenes-${
            index + 1
          }-grade" class="grade inputdata" data-section="sub-scenes" data-index="${
        index + 1
      }" data-type="grade">
            <option value="1">1年生</option>
            <option value="2">2年生</option>
            <option value="3">3年生</option>
            <option value="etc">その他</option>
          </select>
        </div>`;
    }

    appendhtml += `
      <div class="club custom-checkbox">
        <label><input type="checkbox" name="sub-scenes-${
          index + 1
        }-club" class="club inputdata" value="" data-section="sub-scenes" data-index="${
      index + 1
    }" data-type="club"><span></span></label>
      </div>
      <div class="date custom-checkbox">
        <label><input type="checkbox" name="sub-scenes-${
          index + 1
        }-date" class="date inputdata" value="" data-section="sub-scenes" data-index="${
      index + 1
    }" data-type="date"><span></span></label>
      </div>
      <div class="touch custom-checkbox">
        <label><input type="checkbox" name="sub-scenes-${
          index + 1
        }-touch" class="touch inputdata" value="" data-section="sub-scenes" data-index="${
      index + 1
    }" data-type="touch"><span></span></label>
      </div>
      <div class="birth custom-checkbox">
        <label><input type="checkbox" name="sub-scenes-${
          index + 1
        }-birth" class="birth inputdata" value="" data-section="sub-scenes" data-index="${
      index + 1
    }" data-type="birth"><span></span></label>
      </div>
      <div class="limit custom-checkbox">
        <label><input type="checkbox" name="sub-scenes-${
          index + 1
        }-limit" class="limit inputdata" value="" data-section="sub-scenes" data-index="${
      index + 1
    }" data-type="limit"><span></span></label>
      </div>
      <div class="best custom-checkbox">
        <label><input type="checkbox" name="sub-scenes-${
          index + 1
        }-best" class="best inputdata" value="" data-section="sub-scenes" data-index="${
      index + 1
    }" data-type="best"><span></span></label>
      </div>
      <div class="special custom-checkbox">
        <label><input type="checkbox" name="sub-scenes-${
          index + 1
        }-special" class="special inputdata" value="" data-section="sub-scenes" data-index="${
      index + 1
    }" data-type="special"><span></span></label>
      </div>
      <div class="result-1">0</div>
      <div class="result-2">-</div>`;

    if (pageid === "clubcup") {
      appendhtml += `<div class="clubcup-skilleffect">0 %</div>`;
    }
    if (
      pageid === "divrace" ||
      pageid === "board" ||
      pageid === "normal-battle"
    ) {
      appendhtml += `
        <div class="result-event-sp-1">0</div>
        <div class="result-event-sp-2">-</div>`;
    }

    appendhtml += `</div>`;
  }
  appendhtml += `</div>`;

  appendhtml += `
  <h2 class="mt-40px">
    副センバツ内のスイッチOFFガール
  </h2>
  `;
  appendhtml += `<div class="x-scroll-container">`;

  for (let index = 0; index < max_switch; index++) {
    if (index % 10 === 0) {
      appendhtml += `
      <div class="heading switch">
        <div class="rowadd"></div>
        <div class="rowdelete"></div>
        <div class="rowUp"></div>
        <div class="rowDown"></div>
        <div class="number"></div>
        <div class="valid"><p class="inform-tooltips">有無</p></div>
        <div class="skilllv">声援Lv</div>
        <div class="skill skill-1"><p class="inform-tooltips">声援対象1</p></div>
        <div class="skill skill-2"><p class="inform-tooltips">声援対象2</p></div>
        <div class="skill skill-3"><p class="inform-tooltips">対象副人数</p></div>
        <div class="skill skill-4">声援効果1</div>
        <div class="skill skill-5 wide">声援効果2</div>
        <div class="skill-effect"><p class="inform-tooltips">効果値</p></div>
        <div class="s100"></div>
        <div class="skill-total"><p class="inform-tooltips">発動時合計</p></div>
        <div class="skill-chance"><p class="inform-tooltips">発動率</p></div>`;

      if (pageid === "clubcup") {
        appendhtml += `<div class="clubcup-skilleffect"><p class="inform-tooltips">声援効果</p></div>`;
      }

      appendhtml += `</div>`;
    }

    appendhtml += `
    <div class="body switch" id="sub-switch-${index + 1}">
      <div class="rowadd">
        <input type='button' class="rowadd" value='行追加' data-type="sub-switch" data-row=${
          index + 1
        }>
      </div>
      <div class="rowdelete">
        <input type='button' class="rowdelete" value='行削除' data-type="sub-switch" data-row=${
          index + 1
        }>
      </div>
      <div class="rowUp">
        <input type='button' class="rowUp" value='▲' data-type="sub-switch" data-row=${
          index + 1
        }>
      </div>
      <div class="rowDown">
        <input type='button' class="rowDown" value='▼' data-type="sub-switch" data-row=${
          index + 1
        }>
      </div>
      <div class="number">${index + 1}</div>
      <div class="valid custom-checkbox"><label>
    `;
    // デフォルトでは若番から2人まで有効にチェック
    if (index < 2) {
      appendhtml += `<input type="checkbox" name="sub-switch-${
        index + 1
      }-valid" class="valid inputdata" checked data-section="sub-switch" data-index="${
        index + 1
      }" data-type="valid">`;
    } else {
      appendhtml += `<input type="checkbox" name="sub-switch-${
        index + 1
      }-valid" class="valid inputdata" data-section="sub-switch" data-index="${
        index + 1
      }" data-type="valid">`;
    }
    appendhtml += `
      <span></span></label></div>
      <input type="number" name="sub-switch-${
        index + 1
      }-skilllv" class="skilllv inputdata" value="${INIT_SKILL_LEVEL}" data-section="sub-switch" data-index="${
      index + 1
    }" data-type="skilllv">
      <div class="skill selectmark">
        <select name="sub-switch-${
          index + 1
        }-skill-1" class="skill Pop inputdata skill-1" data-section="sub-switch" data-index="${
      index + 1
    }" data-type="skill-1">
          <option value="Pop" class="Pop">Pop</option>
          <option value="Sweet" class="Sweet">Sweet</option>
          <option value="Cool" class="Cool">Cool</option>
          <option value="All" class="All">全タイプ</option>
        </select>
      </div>
      <div class="skill selectmark">
        <select name="sub-switch-${
          index + 1
        }-skill-2" class="skill inputdata skill-2" data-section="sub-switch" data-index="${
      index + 1
    }" data-type="skill-2">
          <option value="main">主のみ</option>
          <option value="sub">副のみ</option>
          <option value="both">主＋副</option>
        </select>
      </div>
      <div class="skill">
        <input type="number" name="sub-switch-${
          index + 1
        }-skill-3" class="skill inputdata skill-3" value="0" data-section="sub-switch" data-index="${
      index + 1
    }" data-type="skill-3">
      </div>
      <div class="skill selectmark">
        <select name="sub-switch-${
          index + 1
        }-skill-4" class="skill inputdata skill-4" data-section="sub-switch" data-index="${
      index + 1
    }" data-type="skill-4">
          <option value="attack">攻</option>
          <option value="defence">守</option>
          <option value="both">攻守</option>
        </select>
      </div>
      <div class="skill wide selectmark">
        <select name="sub-switch-${
          index + 1
        }-skill-5" class="skill inputdata skill-5" data-section="sub-switch" data-index="${
      index + 1
    }" data-type="skill-5">
          <option value="34">特大UP</option>
          <option value="29">大UP</option>
          <option value="24">中UP</option>
        </select>
      </div>
    `;
    // デフォルトでは若番から2人まで有効にチェック
    if (index < 2) {
      appendhtml += `<div class="skill-effect">29 %</div>`;
    } else {
      appendhtml += `<div class="skill-effect Red"> 0 %</div>`;
    }
    appendhtml += `
      <div class="s100"></div>
      <div class="skill-total">0</div>`;

    if (
      pageid === "raid-second-attack" ||
      pageid === "raid-second-defence" ||
      pageid === "clubcup"
    ) {
      if (SKILL_CHANCE_SWITCHLIMIT_2_ALWAYS[index] === "  0.00") {
        appendhtml += `<div class="skill-chance Red">${SKILL_CHANCE_SWITCHLIMIT_2_ALWAYS[index]} %</div>`;
      } else {
        appendhtml += `<div class="skill-chance">${SKILL_CHANCE_SWITCHLIMIT_2_ALWAYS[index]} %</div>`;
      }
    } else if (pageid === "raid-mega") {
      if (SKILL_CHANCE_SWITCHLIMIT_0[index] === "  0.00") {
        appendhtml += `<div class="skill-chance Red">${SKILL_CHANCE_SWITCHLIMIT_0[index]} %</div>`;
      } else {
        appendhtml += `<div class="skill-chance">${SKILL_CHANCE_SWITCHLIMIT_0[index]} %</div>`;
      }
    } else {
      appendhtml += `<div class="skill-chance">${SKILL_CHANCE_SWITCHLIMIT_2[index]} %</div>`;
    }

    if (pageid === "clubcup") {
      appendhtml += `<div class="clubcup-skilleffect">0 %</div>`;
    }

    appendhtml += `</div>`;
  }
  appendhtml += `</div>`;

  $("#sub-scenes").append(appendhtml);
}

function preciousScenesForm(num) {
  let appendhtml = "<h2>プレシャスシーン</h2>";

  for (let index = 0; index < num; index++) {
    if (index % 10 === 0) {
      appendhtml += `
        <div class="heading precious">
          <div class="number"></div>
          <div class="valid"><p class="inform-tooltips">有無</p></div>
          <div class="type"><p class="inform-tooltips">効果対象</p></div>
          <div class="rarity"><p class="inform-tooltips">初期星</p></div>
          <div class="effect"><p class="inform-tooltips">攻/守</p></div>
          <div class="name dwide">名称</div>
          <div class="star">星</div>
          <div class="count"><p class="inform-tooltips">人数</p></div>
          <div class="precious-effect"><p class="inform-tooltips">表示近似値</p></div>
        </div>
        `;
    }

    appendhtml += `
    <div class="body precious" id="precious-scenes-${index + 1}">
      <div class="number">${index + 1}</div>
      <div class="valid custom-checkbox">
        <label><input type="checkbox" name="precious-scenes-${
          index + 1
        }-valid" class="valid precious inputdata" data-section="precious-scenes" data-index="${
      index + 1
    }" data-type="valid"><span></span></label>
      </div>
      <div class="type selectmark">
        <select name="precious-scenes-${
          index + 1
        }-type" class="type precious-filter">
          <option value="unselected" selected>未選択</option>
          <option value="All">全タイプ</option>
          <option value="Pop">Pop</option>
          <option value="Sweet">Sweet</option>
          <option value="Cool">Cool</option>
        </select>
      </div>
      <div class="rarity selectmark">
        <select name="precious-scenes-${
          index + 1
        }-rarity" class="rarity precious-filter">
          <option value="unselected" selected>未選択</option>
          <option value="3">星3</option>
          <option value="2">星2</option>
          <option value="1">星1</option>
        </select>
      </div>
      <div class="effect selectmark">
        <select name="precious-scenes-${
          index + 1
        }-effect" class="effect precious-filter">
          <option value="unselected" selected>未選択</option>
          <option value="attack">攻援</option>
          <option value="defence">守援</option>
          <option value="both">攻守</option>
        </select>
      </div>
      <div class="name dwide selectmark">
        <select name="precious-scenes-${index + 1}-name" id="precious-scenes-${
      index + 1
    }-name" class="name precious Pop inputdata" data-section="precious-scenes" data-index="${
      index + 1
    }" data-type="name">
    `;
    appendhtml += addPreciousSceneOptions();
    appendhtml += `
        </select>
      </div>
      <div class="star selectmark">
        <select name="precious-scenes-${
          index + 1
        }-star" class="star precious inputdata" data-section="precious-scenes" data-index="${
      index + 1
    }" data-type="star">
          <option value="6">星6</option>
          <option value="5" selected>星5</option>
          <option value="4">星4</option>
          <option value="3">星3</option>
          <option value="2">星2</option>
          <option value="1">星1</option>
        </select>
      </div>
      <div class="count">
        <input type="number" name="precious-scenes-${
          index + 1
        }-count" class="count precious inputdata" value="" placeholder="" data-section="precious-scenes" data-index="${
      index + 1
    }" data-type="count">
      </div>
      <div class="precious-effect">0</div>
    </div>
    `;
  }

  $("#precious-scenes").append(appendhtml);

  for (let i = 0; i < MAX_PRECIOUS_SCENES; i++) {
    sortOptions(`#precious-scenes-${i + 1}-name`);
    $(`#precious-scenes-${i + 1}-name`).val(INIT_PRECIOS_SCENES[i]);
  }
}

function addPreciousSceneOptions() {
  let outputhtml;

  for (let p in PRECIOS_SCENES) {
    outputhtml += `<option value="${p}" class="${PRECIOS_SCENES[p].type}">${PRECIOS_SCENES[p].name}</option>`;
  }

  return outputhtml;
}

function petitGirlsForm(num) {
  let pageid = $("body").prop("id");
  let appendhtml = "<h2>ぷちセンバツ</h2>";

  appendhtml += `
  <div class="heading petit">
    <div class="attack"><p class="inform-tooltips">総攻援</p></div>
    <div class="defence"><p class="inform-tooltips">総守援</p></div>
  </div>

  <div class="body petit" id="petit-girls-0">
    <input type="number" name="petit-girls-attack" class="attack inputdata" placeholder="例:1000000" data-section="petit-girls" data-index="0" data-type="attack">
    <input type="number" name="petit-girls-defence" class="defence inputdata" placeholder="例:1000000" data-section="petit-girls" data-index="0" data-type="defence">
  </div>`;

  if (pageid === "board") {
    appendhtml += addPetitGirlsDetailForm_BoardSpecial();
  }

  appendhtml += `
  <div class="heading petit effect">
    <div class="number"></div>
    <div class="effect"><p class="inform-tooltips">応援力効果1</p></div>
    <div class="effect"><p class="inform-tooltips">応援力効果2</p></div>
    <div class="effect"><p class="inform-tooltips">応援力効果3</p></div>
    <div class="effect"><p class="inform-tooltips">応援力効果4</p></div>
  </div>
  `;

  for (let index = 0; index < num; index++) {
    appendhtml += `
    <div class="body petit effect" id="petit-girls-${index + 1}">
    <div class="number">${index + 1}</div>
    `;

    for (let column = 0; column < 4; column++) {
      appendhtml += `<div class="effect selectmark">`;
      appendhtml += `<select name="petit-girls-effect-${index + 1}-${
        column + 1
      }" id="petit-girls-effect-${index + 1}-${
        column + 1
      }" class="petit effect inputdata effect-${
        column + 1
      }" data-section="petit-girls" data-index="${
        index + 1
      }" data-type="effect-${column + 1}">`;
      appendhtml += addPetitGirlsEffect();
      appendhtml += `</select>`;
      appendhtml += `</div>`;
    }

    appendhtml += `
    </div>
    `;
  }

  $("#petit-girls").append(appendhtml);

  for (let i = 0; i < MAX_PETIT_GIRLS; i++) {
    for (let j = 0; j < 4; j++) {
      sortOptions(`#petit-girls-effect-${i + 1}-${j + 1}`);
      $(`#petit-girls-effect-${i + 1}-${j + 1}`).val(
        INIT_PETIT_GIRLS_EFFECTS[j]
      );
      $(`#petit-girls-effect-${i + 1}-${j + 1}`).addClass(
        PETIT_GIRLS_EFFECTS[$(`#petit-girls-effect-${i + 1}-${j + 1}`).val()]
          .type
      );
    }
  }
}

/* 聖櫻ワールド用 ぷちセンバツの詳細入力フォームを作成する */
function addPetitGirlsDetailForm_BoardSpecial() {
  let temphtml = "";
  const GROUP_LIST = ["左", "真ん中", "右"];

  for (let i = 0; i < MAX_PETIT_GIRLS; i++) {
    temphtml += `
      <div class="petit-girls-detail">
        <h3>グループ${String(i + 1)} (${GROUP_LIST[i]}) 詳細</h3>
        <div class="heading petit">
          <div class="attack_i"><p class="inform-tooltips">攻援力</p></div>
          <div class="type"><p class="inform-tooltips">タイプ</p></div>
          <div class="skill"><p class="inform-tooltips">スキル効果</p></div>
        </div>`;
    temphtml += `
        <div id="petit-girls-${
          String(i + 1) + "0"
        }" class="body petit petit-main">
          <input type="number" name="petit-girls-${
            String(i + 1) + "0"
          }-attack_i" class="attack_i inputdata" placeholder="例:20000" data-section="petit-girls" data-index=${
      String(i + 1) + "0"
    } data-type="attack_i">
          <div class="type selectmark">
            <select name="petit-girls-${
              String(i + 1) + "0"
            }-type" class="type inputdata Pop" data-section="petit-girls" data-index=${
      String(i + 1) + "0"
    } data-type="type">
              <option value="Pop" class="Pop">Pop</option>
              <option value="Sweet" class="Sweet">Sweet</option>
              <option value="Cool" class="Cool">Cool</option>
            </select>
          </div>
          <div class="skilltype selectmark">
            <select name="petit-girls-${
              String(i + 1) + "0"
            }-skilltype" class="skilltype inputdata Pop" data-section="petit-girls" data-index=${
      String(i + 1) + "0"
    } data-type="skilltype">
              <option value="Pop" class="Pop">Pop</option>
              <option value="Sweet" class="Sweet">Sweet</option>
              <option value="Cool" class="Cool">Cool</option>
              <option value="All" class="All">全タイプ</option>
            </select>
          </div>
          <div class="skillrate">
            <input type="number" name="petit-girls-${
              String(i + 1) + "0"
            }-skillrate" class="skillrate inputdata" data-section="petit-girls" data-index=${
      String(i + 1) + "0"
    } data-type="skillrate" value="0">
          </div>
        </div>`;
    for (let j = 0; j < MAX_PETIT_GIRLS_SUB_SKILL; j++) {
      temphtml += `
          <div id="petit-girls-${
            String(i + 1) + String(j + 1)
          }" class="body petit petit-sub">
            <input type="number" name="petit-girls-${
              String(i + 1) + String(j + 1)
            }-attack_i" class="attack_i inputdata" placeholder="例:20000" data-section="petit-girls" data-index=${
        String(i + 1) + String(j + 1)
      } data-type="attack_i">
            <div class="type selectmark">
              <select name="petit-girls-${
                String(i + 1) + String(j + 1)
              }-type" class="type inputdata Pop" data-section="petit-girls" data-index=${
        String(i + 1) + String(j + 1)
      } data-type="type">
                <option value="Pop" class="Pop">Pop</option>
                <option value="Sweet" class="Sweet">Sweet</option>
                <option value="Cool" class="Cool">Cool</option>
              </select>
            </div>
            <div class="skilltype selectmark">
              <select name="petit-girls-${
                String(i + 1) + String(j + 1)
              }-skilltype" class="skilltype inputdata Pop" data-section="petit-girls" data-index=${
        String(i + 1) + String(j + 1)
      } data-type="skilltype">
                <option value="Pop" class="Pop">Pop</option>
                <option value="Sweet" class="Sweet">Sweet</option>
                <option value="Cool" class="Cool">Cool</option>
                <option value="All" class="All">全タイプ</option>
              </select>
            </div>
            <div class="skillrate">
              <input type="number" name="petit-girls-${
                String(i + 1) + String(j + 1)
              }-skillrate" class="skillrate inputdata" data-section="petit-girls" data-index=${
        String(i + 1) + String(j + 1)
      } data-type="skillrate" value="0">
            </div>
          </div>`;
    }
    for (let j = 0; j < MAX_PETIT_GIRLS_SUB_NORMAL; j++) {
      temphtml += `
          <div id="petit-girls-${
            String(i + 1) + String(j + 4)
          }" class="body petit petit-sub">
            <input type="number" name="petit-girls-${
              String(i + 1) + String(j + 4)
            }-attack_i" class="attack_i inputdata" placeholder="例:20000" data-section="petit-girls" data-index=${
        String(i + 1) + String(j + 4)
      } data-type="attack_i">
            <div class="type selectmark">
              <select name="petit-girls-${
                String(i + 1) + String(j + 4)
              }-type" class="type inputdata Pop" data-section="petit-girls" data-index=${
        String(i + 1) + String(j + 4)
      } data-type="type">
                <option value="Pop" class="Pop">Pop</option>
                <option value="Sweet" class="Sweet">Sweet</option>
                <option value="Cool" class="Cool">Cool</option>
              </select>
            </div>
            <div class="skilltype invalid">
              <select name="petit-girls-${
                String(i + 1) + String(j + 4)
              }-skilltype" class="skilltype inputdata invalid" data-section="petit-girls" data-index=${
        String(i + 1) + String(j + 4)
      } data-type="skilltype">
                <option value="invalid" selected>―</option>
              </select>
            </div>
            <div class="skillrate invalid">
              <input type="text" name="petit-girls-${
                String(i + 1) + String(j + 4)
              }-skillrate" class="skillrate inputdata invalid" data-section="petit-girls" data-index=${
        String(i + 1) + String(j + 4)
      } data-type="skillrate" value="―" readonly>
            </div>
          </div>`;
    }

    temphtml += `
      </div>`;
  }
  return temphtml;
}

function addPetitGirlsEffect() {
  let outputhtml;

  for (let p in PETIT_GIRLS_EFFECTS) {
    outputhtml += `<option value="${p}" class="${PETIT_GIRLS_EFFECTS[p].type}">${PETIT_GIRLS_EFFECTS[p].name}</option>`;
  }

  return outputhtml;
}

function deckBonusForm() {
  let array = [
    "normal",
    "normal",
    "normal",
    "normal",
    "normal",
    "shine",
    "precious",
  ];

  let appendhtml = "<h2>センバツボーナス</h2>";
  appendhtml += `<div>`;

  appendhtml += `
  <div class="heading deck-bonus">
    <div class="deck-bonus">通常1</div>
    <div class="deck-bonus">通常2</div>
    <div class="deck-bonus">通常3</div>
    <div class="deck-bonus">通常4</div>
    <div class="deck-bonus">通常5</div>
    <div class="deck-bonus">シャイニング★スプラッシュ</div>
    <div class="deck-bonus">Precious★Friend</div>
  </div>`;

  appendhtml += `<div class="body deck-bonus" id="deck-bonus">`;
  for (let index = 0; index < 7; index++) {
    appendhtml += `<div id="deck-bonus-${index + 1}">`;
    appendhtml += `<div class="deck-bonus selectmark">`;
    appendhtml += `<select name="deck-bonus-${index + 1}-1" id="deck-bonus-${
      index + 1
    }-1" class="deck-bonus inputdata lv" data-section="deck-bonus" data-index="${
      index + 1
    }" data-type="lv">`;
    appendhtml += addDeckBonusLvLists(array[index]);
    appendhtml += `</select>`;
    appendhtml += `</div>`;
    appendhtml += `<div class="deck-bonus selectmark">`;
    appendhtml += `<select name="deck-bonus-${index + 1}-2" id="deck-bonus-${
      index + 1
    }-2" class="deck-bonus inputdata effect" data-section="deck-bonus" data-index="${
      index + 1
    }" data-type="effect">`;
    appendhtml += addDeckBonusEffectLists(array[index]);
    appendhtml += `</select>`;
    appendhtml += `</div>`;
    appendhtml += `</div>`;
  }
  appendhtml += `</div>`;
  appendhtml += `</div>`;

  $("#deck-bonus").append(appendhtml);
  for (let i = 0; i < 7; i++) {
    $(`#deck-bonus-${i + 1}-1`).val(INIT_DECKBONUS[i][0]);
    $(`#deck-bonus-${i + 1}-2`).val(INIT_DECKBONUS[i][1]);
  }
}

function addDeckBonusLvLists(effect) {
  let outputhtml;

  for (let p in BONUS_VALUE_ARRAY["deck"][effect]["both"]) {
    if (p === "Lv0") {
      outputhtml += `<option value="${p}" class="deck-bonus">---</option>`;
    } else {
      outputhtml += `<option value="${p}" class="deck-bonus">${p}</option>`;
    }
  }

  return outputhtml;
}

function addDeckBonusEffectLists(effect) {
  let outputhtml;
  let array = [
    ["attack", "攻"],
    ["defence", "守"],
    ["both", "攻守"],
  ];

  for (let p in array) {
    if (
      (effect === "shine" || effect === "precious") &&
      array[p][0] !== "both"
    ) {
      continue;
    } else {
      outputhtml += `<option value="${array[p][0]}" class="deck-bonus">${array[p][1]}</option>`;
    }
  }

  return outputhtml;
}

function playerDataForm() {
  let appendhtml = "<h2>プレイヤーデータ・その他</h2>";

  appendhtml += `
    <div class="heading player-data">
      <div class="player-data type">自身のタイプ</div>
      <div class="player-data position">部活役職</div>
      <div class="player-data attackcost"><p class="inform-tooltips">攻コスト(最大)</p></div>
    </div>
    <div class="body player-data" id="player-data-1">
      <div class="player-data type selectmark">
        <select name="player-data-type" class="player-data Pop type inputdata" data-section="player-data" data-index="1" data-type="type">
          <option value="Pop" class="Pop">Pop</option>
          <option value="Sweet" class="Sweet">Sweet</option>
          <option value="Cool" class="Cool">Cool</option>
        </select>
      </div>
      <div class="player-data position selectmark">
        <select name="player-data-position" class="player-data position inputdata" data-section="player-data" data-index="1" data-type="position">
          <option value="leader">部長</option>
          <option value="subleader">副部長</option>
          <option value="attackcap">攻キャプテン</option>
          <option value="defencecap">守キャプテン</option>
          <option value="member">部員</option>
        </select>
      </div>
      <input type="number" name="player-data-attackcost" class="player-data attackcost inputdata" placeholder="例:2500" value="2000" data-section="player-data" data-index="1" data-type="attackcost">
    </div>`;

  appendhtml += `
    <div class="heading player-data">
      <div class="player-data menscologne">メンズコロンLv</div>
    </div>
    <div class="heading player-data margintopoff">
      <div class="player-data menscologne Sweet">Sweet</div>
      <div class="player-data menscologne Cool">Cool</div>
      <div class="player-data menscologne Pop">Pop</div>
    </div>
    <div class="body player-data" id="player-data-2">
      <input type="number" name="player-data-menscologne-sweet" class="player-data menscologne inputdata menscologne-sweet" placeholder="例:20" value="0" data-section="player-data" data-index="2" data-type="menscologne-sweet">
      <input type="number" name="player-data-menscologne-cool" class="player-data menscologne inputdata menscologne-cool" placeholder="例:20" value="0" data-section="player-data" data-index="2" data-type="menscologne-cool">
      <input type="number" name="player-data-menscologne-pop" class="player-data menscologne inputdata menscologne-pop" placeholder="例:20" value="0" data-section="player-data" data-index="2" data-type="menscologne-pop">
    </div>`;

  appendhtml += `
    <div class="heading player-data">
      <div class="player-data clubitem title"><p class="inform-tooltips">部活設備</p></div>
    </div>
    <div class="heading player-data margintopoff">
      <div class="player-data clubitem Sweet">ロッカー</div>
      <div class="player-data clubitem Cool">ホワイトボード</div>
      <div class="player-data clubitem Pop">テレビ</div>
    </div>
    <div class="body player-data" id="player-data-3">
      <div class="player-data clubitem custom-checkbox">
        <label><input type="checkbox" name="player-data-clubitem-sweet" class="player-data clubitem inputdata clubitem-sweet" value="" checked data-section="player-data" data-index="3" data-type="clubitem-sweet"><span></span></label>
      </div>
      <div class="player-data clubitem custom-checkbox">
        <label><input type="checkbox" name="player-data-clubitem-cool" class="player-data clubitem inputdata clubitem-cool" value="" checked data-section="player-data" data-index="3" data-type="clubitem-cool"><span></span></label>
      </div>
      <div class="player-data clubitem custom-checkbox">
        <label><input type="checkbox" name="player-data-clubitem-pop" class="player-data clubitem inputdata clubitem-pop" value="" checked data-section="player-data" data-index="3" data-type="clubitem-pop"><span></span></label>
      </div>
    </div>`;

  $("#player-data").append(appendhtml);
}

function eventSpecialForm_divrace() {
  let appendhtml = "<h2>風向きアイテム</h2>";
  appendhtml += `<div class="x-scroll-container">`;

  appendhtml += `
    <div class="heading special-item stage">
      <div class="special-item stage"><p class="inform-tooltips">ステージ名</p></div>
    </div>
    <div class="body special-item stage" id="special-item-0">
      <div class="special-item stage selectmark">
        <select name="special-item-stage" class="special-item stage inputdata" data-section="special-item" data-index="0" data-type="stage">
          <option value="base" class="stage">ベースステージ</option>
          <option value="challenge" class="stage" selected>チャレンジステージ</option>
        </select>
      </div>
    </div>`;

  appendhtml += `
    <div class="heading special-item item">
      <div class="number"></div>
      <div class="valid"><p class="inform-tooltips">有無</p></div>
      <div class="name">アイテム名</div>
      <div class="memo">説明</div>
      <div class="effect-base"><p class="inform-tooltips"><span>効果期待値</span> <span>(ベース)</span></p></div>
      <div class="effect-challenge"><p class="inform-tooltips"><span>効果期待値</span> <span>(チャレンジ)</span></p></div>
      <div class="effect-sort">← 大きい順</div>
    </div>
    `;

  for (const index in DIVRACE_ITEM_LIST) {
    appendhtml += `<div class="body special-item item" id="special-item-${
      Number(index) + 1
    }">`;
    appendhtml += `  <div class="number">${Number(index) + 1}</div>`;
    appendhtml += `  <div class="valid custom-checkbox">
      <label><input type="checkbox" name="special-item-${
        Number(index) + 1
      }-valid" class="valid special-item inputdata" data-section="special-item" data-index="${
      Number(index) + 1
    }" data-type="valid"><span></span></label></div>`;
    appendhtml += `  <div class="name">${DIVRACE_ITEM_LIST[index]["name"]}</div>`;
    appendhtml += `  <div class="memo">${DIVRACE_ITEM_LIST[index]["memo"]}</div>`;
    appendhtml += `  <div class="effect-base">0</div>`;
    appendhtml += `  <div class="effect-challenge">0</div>`;
    appendhtml += `  <div class="effect-sort">-</div>`;
    appendhtml += `</div>`;
  }
  appendhtml += `</div>`;

  $("#special-item").append(appendhtml);
}

function eventSpecialForm_board() {
  let appendhtml = '<div class="event-special-container">';

  appendhtml += '<h2 class="mt-40px">天気効果</h2>';
  appendhtml += `<div class="x-scroll-container">`;
  appendhtml += `
    <div class="heading event-special weather flex flex-row justify-left leading-loose whitespace-nowrap">
      <div class="event-special weather select w-150px h-25px p-0px-10px border-b-main"><p class="inform-tooltips">天気</p></div>
    </div>
    <div class="body event-special weather flex flex-row justify-left leading-loose whitespace-nowrap" id="event-special-0">
      <div class="event-special weather selectmark w-150px border-b-main">
        <select name="event-special-weather" class="event-special weather inputdata w-100per p-0px-10px bg-main" data-section="event-special" data-index="0" data-type="weather">`;
  appendhtml += addWeatherOptions();
  appendhtml += `
        </select>
      </div>
    </div>`;
  appendhtml += `
    <div class="heading event-special weather flex flex-row justify-left leading-loose whitespace-nowrap">
      <div class="name w-280px h-25px p-0px-10px border-b-main"><p class="inform-tooltips">効果名</p></div>
      <div class="rate w-120px h-25px p-0px-10px border-b-main"><p class="inform-tooltips">数値</p></div>
      <div class="effect w-150px h-25px p-0px-10px border-b-main"><p class="inform-tooltips">効果期待値</p></div>
    </div>
    <div class="body event-special weather">`;
  for (let i = 0; i < MAX_WEATHER_EFFECT; i++) {
    appendhtml += `
      <div class="flex flex-row justify-left leading-loose" id="event-special-weather-${
        i + 1
      }">
        <div class="name w-280px p-0px-10px border-b-main border-r-main auto">―</div>
        <div class="rate w-120px p-0px-10px border-b-main border-r-main auto text-right">0 %</div>
        <div class="effect w-150px p-0px-10px border-b-main text-right auto">0</div>
      </div>
    `;
  }
  appendhtml += `
    </div>
  </div>`;

  appendhtml += `<h2 class="mt-40px">マス効果</h2>`;
  appendhtml += `<div class="x-scroll-container">`;
  appendhtml += `
    <div class="heading event-special space flex flex-row justify-left leading-loose whitespace-nowrap">
      <div class="name w-280px h-25px p-0px-10px border-b-main">効果名</div>
      <div class="rate w-120px h-25px p-0px-10px border-b-main"><p class="inform-tooltips">数値</p></div>
      <div class="effect w-150px h-25px p-0px-10px border-b-main"><p class="inform-tooltips">効果期待値</p></div>
    </div>
    <div class="body event-special space">`;
  for (let i = 0; i < MAX_SPACE_EFFECT; i++) {
    appendhtml += `
      <div class="flex flex-row justify-left leading-loose" id="event-special-${
        i + 1
      }">
        <div class="name w-280px p-0px-10px border-b-main border-r-main">
          ${BOARD_SPACE_EFFECT_LIST[i].name}
        </div>
        <div class="rate w-120px p-0px-10px border-b-main border-r-main flex text-right   items-center">
          <input type="number" name="event-special-${
            i + 1
          }-rate" data-section="event-special" data-index="${
      i + 1
    }" data-type="rate" class="inputdata rate w-80per h-100per text-right" value=0>
          %
        </div>
        <div class="effect w-150px p-0px-10px border-b-main flex justify-end items-center auto">0</div>
      </div>`;
  }
  appendhtml += `
    </div>
  </div>`;

  appendhtml += `
    <h2 class="mt-40px">合計ボーナス効果</h2>
    <div class="heading event-special total flex flex-row justify-left leading-loose whitespace-nowrap">
      <div class="min w-150px h-25px p-0px-10px border-b-main"><p class="inform-tooltips">最小値</p></div>
      <div class="exp w-150px h-25px p-0px-10px border-b-main"><p class="inform-tooltips">期待値</p></div>
      <div class="max w-150px h-25px p-0px-10px border-b-main"><p class="inform-tooltips">最大値</p></div>
    </div>
    <div id="event-special-total" class="body event-special total flex flex-row justify-left leading-loose">
      <div class="min w-150px h-33px p-0px-10px border-b-main border-r-main text-right bg-auto">0</div>
      <div class="exp w-150px h-33px p-0px-10px border-b-main border-r-main text-right bg-auto">0</div>
      <div class="max w-150px h-33px p-0px-10px border-b-main text-right bg-auto">0</div>
    </div>
  `;

  appendhtml += `</div>`;
  $("#event-special").append(appendhtml);
}

function addWeatherOptions() {
  let outputhtml;
  BOARD_WEATHER_LIST.forEach((element) => {
    outputhtml += `<option value="${element.id}">${element.name}</option>`;
  });
  return outputhtml;
}

function sortOptions(query) {
  let options = $(query + " option");
  options.detach().sort(function (a, b) {
    let an = Number($(a).val());
    let bn = Number($(b).val());
    return an > bn ? 1 : an < bn ? -1 : 0;
  });
  options.appendTo(query);
}

function modeSelectorForm() {
  let pageid = $("body").prop("id");
  let appendhtml = "";

  if (
    pageid === "raid-first" ||
    pageid === "raid-second-attack" ||
    pageid === "raid-second-defence"
  ) {
    appendhtml += `
    <div class="flex flex-row" id="player-data-5">
      <label for="player-data-raidtype" class="w-120px">悪男タイプ</label>
      <div class="selectmark w-inv120px">
        <select name="player-data-raidtype" id="player-data-raidtype" class="player-data raidtype inputdata w-100per" data-section="player-data" data-index="5" data-type="raidtype">
          <option value="Normal" class="Normal">ノーマル超レア</option>
          <option value="Sweet" class="Sweet">Sweet</option>
          <option value="Cool" class="Cool">Cool</option>
          <option value="Pop" class="Pop">Pop</option>
        </select>
      </div>
    </div>`;
  }
  if (pageid === "raid-mega") {
    appendhtml += `
    <div class="flex flex-row" id="player-data-5">
      <label for="player-data-raidtype" class="w-120px">悪男タイプ</label>
      <div class="selectmark w-inv120px">
        <select name="player-data-raidtype" id="player-data-raidtype" class="player-data raidtype inputdata w-100per Sweet" data-section="player-data" data-index="5" data-type="raidtype">
          <option value="Sweet" class="Sweet">Sweet</option>
          <option value="Cool" class="Cool">Cool</option>
          <option value="Pop" class="Pop">Pop</option>
        </select>
      </div>
    </div>`;
  }
  if (pageid === "raidwar") {
    appendhtml += `
    <div class="flex flex-row w-330px" id="player-data-11">
      <label for="player-data-raidtype" class="w-100px">捕獲相手</label>
      <div class="selectmark w-inv100px">
        <select name="player-data-raidwartype" id="player-data-raidwartype" class="player-data raidwartype inputdata  w-100per" data-section="player-data" data-index="11" data-type="raidwartype">
          <option value="SSR" selected>夜行性激レア</option>
          <option value="SR-Lv50">超レア Lv50以下 (pt×2.0)</option>
          <option value="SR-Lv59">超レア Lv59 (pt×2.5)</option>
          <option value="SR-Lv64">超レア Lv64 (pt×3.0)</option>
        </select>
      </div>
    </div>`;
  }
  if (pageid === "championship") {
    appendhtml += `
    <div class="flex flex-row" id="player-data-15">
      <label for="player-data-appealType" class="w-120px">アピール種別</label>
      <div class="selectmark w-inv120px">
        <select name="player-data-appealType" id="player-data-appealType" class="player-data appealType inputdata w-100per" data-section="player-data" data-index="15" data-type="appealType">
          <option value="battle">アピール対決</option>
          <option value="time-normal">アピールタイム</option>
          <option value="time-rare" selected>レアアピールタイム</option>
        </select>
      </div>
    </div>
    <div class="flex flex-row" id="player-data-16">
      <label for="player-data-appealHearts" class="w-120px">ハート数</label>
      <div class="selectmark w-inv120px">
        <select name="player-data-appealHearts" id="player-data-appealHearts" class="player-data appealHearts inputdata w-100per" data-section="player-data" data-index="16" data-type="appealHearts">
          <option value="1">1個　(100% / 100%)</option>
          <option value="2">2個　(150% / 220%)</option>
          <option value="3">3個　(200% / 350%)</option>
          <option value="4">4個　(250% / 480%)</option>
          <option value="5" selected>5個　(350% / 650%)</option>
        </select>
      </div>
    </div>
    <div class="flex flex-row" id="player-data-17">
      <div class="custom-checkbox mr-50px InvalidByAppealType time-rare">
        <label for="player-data-appealTensionMax" class="">テンションゲージMAX</label>
        <label><input type="checkbox" name="player-data-appealTensionMax" id="player-data-appealTensionMax" class="player-data appealTensionMax inputdata" value="" checked data-section="player-data" data-index="17" data-type="appealTensionMax"><span></span></label>
      </div>
      /
      <div class="flex flex-row InvalidByAppealType time-rare">
        <label for="player-data-appealTurns" class="ml-10px">ターン数</label>
        <div class="selectmark w-50px ml-10px">
          <select name="player-data-appealTurns" id="player-data-appealTurns" class="player-data appealTurns inputdata w-50px" data-section="player-data" data-index="17" data-type="appealTurns">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5" selected>5</option>
          </select>
        </div>
      </div>
    </div>`;
  }
  if (
    pageid === "raid-first" ||
    pageid === "raid-mega" ||
    pageid === "raid-second-attack" ||
    pageid === "raid-second-defence"
  ) {
    appendhtml += `
    <div class="flex flex-row" id="player-data-7">
      <label for="number-of-heart" class="w-120px">アタック種別</label>
      <div class="selectmark w-inv120px">
        <select name="number-of-heart" id="number-of-heart" class="player-data number-of-heart inputdata w-100per" data-section="player-data" data-index="7" data-type="number-of-heart">
          <option value="1" selected>ハート1個 (元気炭酸アメ)</option>
          <option value="6">ハート6個 (元気炭酸)</option>
          <option value="12">ハート12個 (勇気炭酸)</option>
        </select>
      </div>
    </div>`;
  }
  if (pageid === "raidwar") {
    appendhtml += `
    <div class="flex flex-row" id="player-data-7">
      <div class="flex flex-row w-330px mr-5px">
        <label for="number-of-heart" class="w-100px">アタック種別</label>
        <div class="selectmark w-inv100px">
          <select name="number-of-heart" id="number-of-heart" class="player-data number-of-heart inputdata w-100per" data-section="player-data" data-index="7" data-type="number-of-heart">
            <option value="1" selected>ハート1個 (元気炭酸アメ)</option>
            <option value="6">ハート6個 (元気炭酸)</option>
            <option value="12">ハート12個 (本気炭酸)</option>
          </select>
        </div>
      </div>
      /
      <div class="ml-5px">
        <label for="player-data-attack-count" class="">回数</label>
        <input type="number" name="player-data-attack-count" id="player-data-attack-count" class="player-data attack-count inputdata w-55px" value="1" data-section="player-data" data-index="7" data-type="attack-count">
      </div>
    </div>`;
  }
  if (
    pageid === "raid-first" ||
    pageid === "raid-second-attack" ||
    pageid === "raid-second-defence"
  ) {
    appendhtml += `
    <div class="flex flex-row" id="player-data-8">
      <label for="combo-raid" class="w-120px">コンボ数</label>
      <div class="selectmark w-inv120px">
        <select name="combo-raid" id="combo-raid" class="player-data combo-raid inputdata w-100per" data-section="player-data" data-index="8" data-type="combo-raid">
          <option value="0" selected>0</option>
          <option value="1">1 ～ (×1.1)</option>
          <option value="5">5 ～ (×1.2)</option>
          <option value="10">10 ～ (×1.4)</option>
          <option value="50">50 ～ (×1.8)</option>
          <option value="100">100 ～ (×2.0)</option>
        </select>
      </div>
    </div>`;
  }
  if (pageid === "raidwar") {
    appendhtml += `
    <div class="flex flex-row w-330px" id="player-data-12">
      <label for="combo-raidwar" class="w-100px">コンボ数</label>
      <div class="selectmark w-inv100px">
        <select name="combo-raidwar" id="combo-raidwar" class="player-data combo-raidwar inputdata w-100per" data-section="player-data" data-index="12" data-type="combo-raidwar">
          <option value="0">0</option>
          <option value="6">6 (×1.3)</option>
          <option value="12">12 (×1.6)</option>
          <option value="18">18 (×1.9)</option>
          <option value="24">24 (×2.2)</option>
          <option value="30">30 (×2.4)</option>
          <option value="36">36 (×2.58)</option>
          <option value="42">42 (×2.76)</option>
          <option value="48">48 (×2.94)</option>
          <option value="50" selected>50 ～ (×3.0)</option>
        </select>
      </div>
    </div>`;
  }
  if (
    pageid === "raid-first" ||
    pageid === "raid-mega" ||
    pageid === "raid-second-attack"
  ) {
    appendhtml += `
    <div class="flex flex-row" id="player-data-4">
      <label for="player-data-spgirls" class="w-120px">SP応援効果</label>
      <input type="text" inputmode="numeric" name="player-data-spgirls" id="player-data-spgirls" class="player-data spgirls inputdata w-inv120px" value="0" data-section="player-data" data-index="4" data-type="spgirls">
    </div>`;
  }
  if (pageid === "raid-mega") {
    appendhtml += `
    <div class="flex flex-row" id="player-data-10">
      <label for="player-data-megabuff" class="mr-5px">攻援力UP</label>
      <input type="number" name="player-data-megabuff" id="player-data-megabuff" class="player-data megabuff inputdata w-60px mr-5px" value="100" data-section="player-data" data-index="10" data-type="megabuff">%
      /
      <label for="player-data-megadebuff" class="no-width ml-5px mr-5px">守備力DOWN</label>
      <input type="number" name="player-data-megadebuff" id="player-data-megadebuff" class="player-data megadebuff inputdata w-60px mr-5px" value="50" data-section="player-data" data-index="10" data-type="megadebuff">%
    </div>`;
  }
  if (pageid === "raidwar") {
    appendhtml += `
    <div class="flex flex-row InvalidByRaidwarType true" id="player-data-13">
      <label for="player-data-raidwarBuff" class="mr-5px">攻援力UP</label>
      <input type="number" name="player-data-raidwarBuff" id="player-data-raidwarBuff" class="player-data raidwarBuff inputdata w-78px mr-5px" value="150" data-section="player-data" data-index="13" data-type="raidwarBuff">%
      /
      <label for="player-data-raidwarDamage" class="ml-5px mr-5px">ダメージ声援合計</label>
      <input type="number" name="player-data-raidwarDamage" id="player-data-raidwarDamage" class="player-data raidwarDamage inputdata w-90px mr-5px" value="0" data-section="player-data" data-index="13" data-type="raidwarDamage">%
    </div>`;
  }
  if (pageid === "clubcup") {
    appendhtml += `
    <div class="flex flex-row" id="player-data-6">
      <label for="player-data-clubcupbuff" class="mr-10px">攻援力UP</label>
      <input type="number" name="player-data-clubcupbuff" id="player-data-clubcupbuff" class="player-data clubcupbuff inputdata w-60px mr-5px" value="50" data-section="player-data" data-index="6" data-type="clubcupbuff">%
      /
      <div class="custom-checkbox ml-10px">
        <label for="player-data-clubcupwinbonus">勝利後ボーナス</label>
        <label><input type="checkbox" name="player-data-clubcupwinbonus" id="player-data-clubcupwinbonus" class="player-data clubcupwinbonus inputdata" value="" checked data-section="player-data" data-index="6" data-type="clubcupwinbonus"><span></span></label>
      </div>
    </div>
    `;
  }
  if (pageid === "normal-battle") {
    appendhtml += `
    <div class="custom-checkbox w-190px mr-30px" id="player-data-14">
      <label for="player-data-clubcupwinbonus">勝利後ボーナス (10分間)</label>
      <label><input type="checkbox" name="player-data-clubcupwinbonus" id="player-data-clubcupwinbonus" class="player-data clubcupwinbonus inputdata" value="" checked data-section="player-data" data-index="14" data-type="clubcupwinbonus"><span></span></label>
    </div>`;
  }
  if (
    pageid === "raid-first" ||
    pageid === "raid-second-attack" ||
    pageid === "raid-second-defence"
  ) {
    appendhtml += `
    <div class="flex flex-row" id="player-data-9">
      <div class="mr-60px custom-checkbox">
        <label for="player-data-point-converter">ポイントに変換</label>
        <label><input type="checkbox" name="player-data-point-converter" id="player-data-point-converter" class="player-data point-converter inputdata" value="" data-section="player-data" data-index="9" data-type="point-converter"><span></span></label>
      </div>
      <div class="custom-checkbox InvalidByPointConverter false">
        <label for="player-data-assist-members">部員お助け(×1.2)</label>
        <label><input type="checkbox" name="player-data-assist-members" id="player-data-assist-members" class="player-data assist-members inputdata" value="" data-section="player-data" data-index="9" data-type="assist-members"><span></span></label>
      </div>
    </div>`;
  }
  if (pageid === "raid-mega") {
    appendhtml += `
    <div class="flex flex-row" id="player-data-9">
      <div class="mr-80px custom-checkbox">
        <label for="player-data-point-converter">ポイントに変換</label>
        <label><input type="checkbox" name="player-data-point-converter" id="player-data-point-converter" class="player-data point-converter inputdata" value="" data-section="player-data" data-index="9" data-type="point-converter"><span></span></label>
      </div>
    </div>`;
  }
  if (pageid === "raidwar") {
    appendhtml += `
    <div class="flex flex-row">
      <div class="flex flex-row" id="player-data-4">
        <label for="player-data-spgirls" class="w-100px">SP応援効果</label>
        <input type="text" inputmode="numeric" name="player-data-spgirls" id="player-data-spgirls" class="player-data spgirls inputdata w-160px mr-10px" value="0" data-section="player-data" data-index="4" data-type="spgirls">
      </div>
      /
      <div id="player-data-9">
        <div class="custom-checkbox">
          <label for="player-data-point-converter" class="ml-10px">ポイントに変換</label>
          <label><input type="checkbox" name="player-data-point-converter" id="player-data-point-converter" class="player-data point-converter inputdata" value="" data-section="player-data" data-index="9" data-type="point-converter"><span></span></label>
        </div>
      </div>
    </div>`;
  }
  if (pageid === "clubcup") {
    appendhtml += `
    <div class="flex flex-row">
      <div id="player-data-9">
        <div class="custom-checkbox mr-50px">
          <label for="player-data-point-converter" class="">ポイントに変換</label>
          <label><input type="checkbox" name="player-data-point-converter" id="player-data-point-converter" class="player-data point-converter inputdata" value="" data-section="player-data" data-index="9" data-type="point-converter"><span></span></label>
        </div>
      </div>
      /
      <div class="flex flex-row w-190px InvalidByPointConverter false" id="player-data-18">
        <label for="clubcupBottle" class="w-78px ml-10px">炭酸本数</label>
        <div class="selectmark w-inv78px">
          <select name="clubcupBottle" id="clubcupBottle" class="player-data clubcupBottle inputdata w-100per" data-section="player-data" data-index="18" data-type="clubcupBottle">
            <option value="1" selected>1本</option>
            <option value="3">3本 (×3)</option>
          </select>
        </div>
      </div>
    </div>

    <div class="flex flex-row">
      <div id="player-data-19" class="InvalidByPointConverter false">
        <label for="clubcupSpPercent" class="mr-5px">SP応援</label>
        <input type="number" name="clubcupSpPercent" id="clubcupSpPercent" class="player-data clubcupSpPercent inputdata w-65px mr-5px" value="0" data-section="player-data" data-index="19" data-type="clubcupSpPercent">%
        /
        <label for="clubcupSpFixPt" class="ml-5px mr-5px">固定値</label>
        <input type="number" name="clubcupSpFixPt" id="clubcupSpFixPt" class="player-data clubcupSpFixPt inputdata w-90px mr-5px" value="0" data-section="player-data" data-index="19" data-type="clubcupSpFixPt">pt
      </div>
    </div>

    <div class="flex flex-row">
      <div id="player-data-20" class="InvalidByPointConverter false">
        <label for="clubcupRivalSkillDown" class="mr-5px">対戦相手 声援効果 Down</label>
        <input type="number" name="clubcupRivalSkillDown" id="clubcupRivalSkillDown" class="player-data clubcupRivalSkillDown inputdata w-90px mr-5px" value="0" data-section="player-data" data-index="20" data-type="clubcupRivalSkillDown">%
      </div>
    </div>

    <div class="flex flex-row">
      <div id="player-data-21" class="custom-checkbox InvalidByPointConverter false">
        <label for="clubcupRivalLeaders" class="w-120px">対戦相手 部長/副部長</label>
        <label><input type="checkbox" name="clubcupRivalLeaders" id="clubcupRivalLeaders" class="player-data clubcupRivalLeaders inputdata" value="" data-section="player-data" data-index="21" data-type="clubcupRivalLeaders"><span></span></label>
      </div>
      <div id="player-data-22" class="ml-45px InvalidByPointConverter false">
        /
        <label for="clubcupPointUp" class="w-120px mr-5px">勧誘ptUP</label>
        <input type="number" name="clubcupPointUp" id="clubcupPointUp" class="player-data clubcupPointUp inputdata w-65px mr-5px" value="200" data-section="player-data" data-index="22" data-type="clubcupPointUp">%
      </div>
    </div>
    `;
  }
  if (pageid === "championship") {
    appendhtml += `
    <div class="flex flex-row">
      <div id="player-data-4" class="InvalidByAppealType time-rare">
        <label for="player-data-spgirls" class="mr-5px">SP応援</label>
        <input type="text" inputmode="numeric" name="player-data-spgirls" id="player-data-spgirls" class="player-data spgirls inputdata w-120px mr-10px" value="0" data-section="player-data" data-index="4" data-type="spgirls">
      </div>
      /
      <div id="player-data-9">
        <div class="custom-checkbox">
          <label for="player-data-point-converter" class="ml-10px">ポイントに変換</label>
          <label><input type="checkbox" name="player-data-point-converter" id="player-data-point-converter" class="player-data point-converter inputdata" value="" data-section="player-data" data-index="9" data-type="point-converter"><span></span></label>
        </div>
      </div>
    </div>`;
  }
  if (pageid === "divrace") {
    appendhtml += `
    <div class="flex flex-row" id="player-data-4" style="position: relative; top: 15px;">
      <label for="player-data-spgirls" class="w-100px">SP応援効果</label>
      <input type="text" inputmode="numeric" name="player-data-spgirls" id="player-data-spgirls" class="player-data spgirls inputdata w-160px" value="0" data-section="player-data" data-index="4" data-type="spgirls">
    </div>`;
  }
  if (pageid === "board") {
    appendhtml += `
    <div class="flex flex-row" id="player-data-4" style="position: relative; top: 15px;">
      <label for="player-data-spgirls" class="w-100px">SP応援効果</label>
      <input type="text" inputmode="numeric" name="player-data-spgirls" id="player-data-spgirls" class="player-data spgirls inputdata w-160px" value="0" data-section="player-data" data-index="4" data-type="spgirls">
    </div>`;
  }

  $("#mode-selector").append(appendhtml);
}
