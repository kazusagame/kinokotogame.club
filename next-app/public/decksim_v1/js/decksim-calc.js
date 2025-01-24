'use strict';

let DATA_ARRAY = {
  "calc-result" : {min : '0', exp : '0', max : '0', "clubcup-skilleffect" : 0, "memo" : ""}, "main-scenes" : {}, "main-skill" : {}, "sub-scenes" : {}, "sub-switch" : {},
  "precious-scenes" : {}, "petit-girls" : {}, "deck-bonus" : {}, "player-data" : {},
};

function calcTotalPerformance() {
  let min = 0;
  let exp = 0;
  let max = 0;
  let pageid = $('body').prop('id')

  if (pageid === 'clubcup') {
    DATA_ARRAY['calc-result']['clubcup-skilleffect'] = 0;
  }

  // プレシャスシーン 効果表示値保管庫
  let precious_accumulate_value = {};
  for (let i = 0 ; i < MAX_PRECIOUS_SCENES ; i++ ) {
    precious_accumulate_value[String(i+1)] = 0;
  }

  // プレシャスシーン
  let precious_array  = preparePreciousArray();
  // ぷちセンバツ
  let [petit_power, petit_effects_array] = preparePetitArray();
  // センバツボーナス
  let deckbonus_array = prepareDeckBonusArray();
  // プレイヤーデータ
  let playerdata_array = preparePlayerDataArray();

  // 主
  let [min_main, exp_dif_main, max_dif_main, precious_accumulate_value_main, power_array_main] =
    calcMainGirlsPerformance(precious_array, petit_effects_array, deckbonus_array, playerdata_array, true);

  // 副
  let [min_sub, exp_dif_sub, max_dif_sub, precious_accumulate_value_sub, power_array_sub] =
    calcSubGirlsPerformance(precious_array, petit_effects_array, deckbonus_array, playerdata_array, true);

  for (let i = 0 ; i < MAX_PRECIOUS_SCENES ; i++ ) {
    precious_accumulate_value[String(i+1)] = precious_accumulate_value_main[String(i+1)] + precious_accumulate_value_sub[String(i+1)];
  }

  // 主 声援
  let [min_main_skill, exp_dif_main_skill, max_dif_main_skill] =
    calcMainGirlsSkillPerformance(power_array_main, power_array_sub);

  // 副 声援
  let [min_switch_skill, exp_dif_switch_skill, max_dif_switch_skill] =
    calcSwitchGirlsSkillPerformance(power_array_main, power_array_sub);

  // ぷち
  let min_petit;
  if ((pageid === 'raid-first') || (pageid === 'raid-second-attack') || (pageid === 'raid-mega') ||
      (pageid === 'raidwar') || (pageid === 'clubcup') || (pageid === 'championship') ||
      (pageid === 'tower') || (pageid === 'divrace') || (pageid === 'board') || (pageid === 'normal-battle')) {
    min_petit = Math.ceil(petit_power.attack * BONUS_RATE_ARRAY[pageid]['petit-girls']['base'] / 100);
  } else if ((pageid === 'raid-second-defence') || (pageid === 'championship-defence')) {
    min_petit = Math.ceil(petit_power.defence * BONUS_RATE_ARRAY[pageid]['petit-girls']['base'] / 100);
  } else {
    min_petit = Math.ceil(petit_power.attack * BONUS_RATE_ARRAY[pageid]['petit-girls']['base'] / 100);
  }

  // SP応援ガール
  let min_spgirls = 0;
  if (!isNaN(Number(playerdata_array.spgirls.replaceAll(",", "")))) {
    min_spgirls = Math.ceil(Number(playerdata_array.spgirls.replaceAll(",", "")));
  }
  if ((pageid === 'raid-second-defence') || (pageid === 'clubcup') || (pageid === 'tower') || (pageid === 'championship-defence')) {
    min_spgirls = 0;
  } else if ((pageid === 'championship') && (playerdata_array["appealType"] === "battle")) {
    min_spgirls = 0;
  }

  // 攻コスト補正
  let attack_cost_multiplier;
  if ((pageid === 'raid-first') || (pageid === 'raid-mega') || (pageid === 'raidwar')) {
    attack_cost_multiplier = Number(playerdata_array.attackcost) / 100;
  } else if ((pageid === 'raid-second-attack') || (pageid === 'raid-second-defence')) {
    attack_cost_multiplier = Number(playerdata_array.attackcost) / 200;
  } else {
    attack_cost_multiplier = 1;
  }

  // レイドメガ悪男 守備力デバフ
  let defence_debuff_multiplier;
  if (pageid === 'raid-mega') {
    if (Number(playerdata_array.megadebuff) > 50) {
      defence_debuff_multiplier = 2;
    } else if (Number(playerdata_array.megadebuff) < -100) {
      defence_debuff_multiplier = 0.5;
    } else {
      defence_debuff_multiplier = 1 / (1 - (Number(playerdata_array.megadebuff) / 100));
    }
  } else {
    defence_debuff_multiplier = 1;
  }

  // 対抗戦 勝利後ボーナス
  let clubcup_winbonus_multiplier;
  if ((pageid === 'clubcup') || (pageid === 'normal-battle')) {
    if (playerdata_array.clubcupwinbonus === true) {
      clubcup_winbonus_multiplier = 1 + BONUS_VALUE_ARRAY['clubcupspecial']['winbonus'] / 100;
    } else {
      clubcup_winbonus_multiplier = 1;
    }
  } else {
    clubcup_winbonus_multiplier = 1;
  }

  // たすけて！マイヒーロー コンボ補正
  let combo_raid = 0;
  if ((pageid === 'raid-first') || (pageid === 'raid-second-attack') || (pageid === 'raid-second-defence')) {
    combo_raid += BONUS_VALUE_ARRAY['raidspecial']['combo'][playerdata_array["combo-raid"]];
  }

  // おねがい★ハンターズ コンボ補正
  let combo_raidwar = 0;
  if (pageid === 'raidwar') {
    combo_raidwar += BONUS_VALUE_ARRAY['raidwarSpecial']['combo'][playerdata_array["combo-raidwar"]];
  }

  // おねがい★ハンターズ 攻援力UP
  let raidwar_buff = 0;
  if ((pageid === 'raidwar') && (playerdata_array["raidwartype"] === "SSR")) {
    // 攻援力UPは150%まで
    if (playerdata_array["raidwarBuff"] > 150) {
      raidwar_buff = 1.5;
    } else if (playerdata_array["raidwarBuff"] < 0) {
      raidwar_buff = 0;
    } else {
      raidwar_buff = playerdata_array["raidwarBuff"] / 100;
    }
  }

  // おねがい★ハンターズ ダメージ声援
  let raidwar_damage = 0;
  if ((pageid === 'raidwar') && (playerdata_array["raidwartype"] === "SSR")) {
    if (playerdata_array["raidwarDamage"] < 0) {
      raidwar_damage = 0;
    } else {
      raidwar_damage = playerdata_array["raidwarDamage"] / 100;
    }
  }

  // たすけて！マイヒーロー / おねがい★ハンターズ / カリスマ決定戦 アタック種別
  let number_of_heart = 1;
  if ((pageid === 'raid-first') || (pageid === 'raid-second-attack') || (pageid === 'raid-second-defence') || (pageid === 'raid-mega')) {
    number_of_heart = Number(BONUS_VALUE_ARRAY['raidspecial']['heart'][playerdata_array["number-of-heart"]]);
  } else if (pageid === 'raidwar') {
    number_of_heart = Number(BONUS_VALUE_ARRAY['raidwarSpecial']['heart'][playerdata_array["number-of-heart"]]);
  } else if (pageid === 'championship') {
    number_of_heart = Number(BONUS_VALUE_ARRAY['championshipSpecial']['heart'][playerdata_array["appealType"]][playerdata_array["appealHearts"]]);
    if ((playerdata_array["appealType"] === "time-normal") || (playerdata_array["appealType"] === "time-rare")) {
      if (playerdata_array["appealTensionMax"] === true) {
        number_of_heart *= Number(BONUS_VALUE_ARRAY['championshipSpecial']['tensionMax']);
      }
    }
  }

  // おねがい★ハンターズ / カリスマ決定戦  アタック回数
  let attack_count = 1;
  if (pageid === 'raidwar') {
    if (playerdata_array["attack-count"] > 0) {
      attack_count = Number(playerdata_array["attack-count"]);
    }
  } else if (pageid === 'championship') {
    if ((playerdata_array["appealType"] === "time-normal") || (playerdata_array["appealType"] === "time-rare")) {
      attack_count = Number(playerdata_array["appealTurns"]);
    }
  }

  //全体系補正値乗算
  min = Math.ceil(((min_main + min_sub + min_main_skill + min_switch_skill + min_petit)
                 * attack_cost_multiplier * defence_debuff_multiplier * clubcup_winbonus_multiplier
                 * (1 + combo_raid) + min_spgirls) * (1 + combo_raidwar) * (1 + raidwar_buff)
                 * (number_of_heart * attack_count + raidwar_damage));
  exp = min + Math.ceil(((exp_dif_main + exp_dif_sub + exp_dif_main_skill + exp_dif_switch_skill)
                 * attack_cost_multiplier * defence_debuff_multiplier * clubcup_winbonus_multiplier
                 * (1 + combo_raid)) * (1 + combo_raidwar) * (1 + raidwar_buff)
                 * (number_of_heart * attack_count + raidwar_damage));
  max = min + Math.ceil(((max_dif_main + max_dif_sub + max_dif_main_skill + max_dif_switch_skill)
                 * attack_cost_multiplier * defence_debuff_multiplier * clubcup_winbonus_multiplier
                 * (1 + combo_raid)) * (1 + combo_raidwar) * (1 + raidwar_buff)
                 * (number_of_heart * attack_count + raidwar_damage));

  // 全国高校生課外活動コンテスト用 風向きアイテム用 特殊処理
  if (pageid === "divrace") {

    // 効果値 計算
    const data_set = {
      "petit-girl" : min_petit,
      "limitbreak" : {
        "exp" : exp_dif_main + exp_dif_sub,
        "max" : max_dif_main + max_dif_sub
      },
      "skill-effect" : {
        "min" : min_main_skill + min_switch_skill,
        "exp" : exp_dif_main_skill + exp_dif_switch_skill,
        "max" : max_dif_main_skill + max_dif_switch_skill
      },
      "power_array_main" : power_array_main,
      "power_array_sub" : power_array_sub,
      "precious_array" : precious_array,
      "petit_effects_array" : petit_effects_array,
      "deckbonus_array" : deckbonus_array,
      "playerdata_array" : playerdata_array
    }
    const divrace_special_item_effects = calcDivraceSpecialItemEffects(data_set);

    // 効果値 一覧表示
    displayDivraceSpecialItemEffects(divrace_special_item_effects);

    // 選択した風向きアイテム分の効果値を加算
    const [total_used_effect_min, total_used_effect_exp, total_used_effect_max] = calcDivraceSpecialItemUsed(divrace_special_item_effects, DATA_ARRAY['special-item']);
    min += total_used_effect_min;
    exp += total_used_effect_exp;
    max += total_used_effect_max;

    // 選択した風向きアイテムによるガール個別の効果値集計と表示
    const [difMainArray, difSubArray] = calcDivraceSpecialItemUsedPerGirl(divrace_special_item_effects, DATA_ARRAY['special-item']);
    displayDivraceSpecialItemEffectsPerGirl(difMainArray, difSubArray);
  }

  // 散策♪聖櫻ワールド用 天気効果/マス効果用 特殊処理
  if (pageid === "board") {

    // 効果値 計算
    const data_set = {
      "petit-girl" : min_petit,
      "limitbreak" : {
        "exp" : exp_dif_main + exp_dif_sub,
        "max" : max_dif_main + max_dif_sub
      },
      "skill-effect" : {
        "min" : min_main_skill + min_switch_skill,
        "exp" : exp_dif_main_skill + exp_dif_switch_skill,
        "max" : max_dif_main_skill + max_dif_switch_skill
      },
      "power_array_main" : power_array_main,
      "power_array_sub" : power_array_sub,
      "precious_array" : precious_array,
      "petit_effects_array" : petit_effects_array,
      "deckbonus_array" : deckbonus_array,
      "playerdata_array" : playerdata_array
    }

    const result_dict = calcBoardSpecialEffects(data_set);

    // 効果値 一覧表示
    displayBoardSpecialEffects(result_dict);

    // 効果値を加算
    min += result_dict.total_effect_min;
    exp += result_dict.total_effect_exp;
    max += result_dict.total_effect_max;

    // ガール個別の効果値表示
    displayBoardSpecialEffectsPerGirl(result_dict);
  }

  let min_converted = "";
  let exp_converted = "";
  let max_converted = "";

  // ポイントに変換が指定されている場合はコンバートを行う
  if (playerdata_array["point-converter"]) {
    if ((pageid === 'raid-first') || (pageid === 'raid-second-attack') || (pageid === 'raid-second-defence') || (pageid === 'raid-mega')) {
      let pointMultiplier = POINT_RATE_ARRAY[pageid];
      // 部員お助けの場合はポイント1.2倍
      if (playerdata_array["assist-members"]) pointMultiplier *= 1.2;

      min_converted = `${Math.ceil(min * pointMultiplier / 1000).toLocaleString()} pt`;
      exp_converted = `${Math.ceil(exp * pointMultiplier / 1000).toLocaleString()} pt`;
      max_converted = `${Math.ceil(max * pointMultiplier / 1000).toLocaleString()} pt`;
    } else if (pageid === 'raidwar') {
      const pointMultiplier = POINT_RATE_ARRAY[pageid][playerdata_array["raidwartype"]];
      min_converted = `${Math.ceil(min * pointMultiplier / 1000).toLocaleString()} pt`;
      exp_converted = `${Math.ceil(exp * pointMultiplier / 1000).toLocaleString()} pt`;
      max_converted = `${Math.ceil(max * pointMultiplier / 1000).toLocaleString()} pt`;
    } else if (pageid === 'clubcup') {
      let pointMultiplier = 10000;

      // 炭酸本数
      pointMultiplier *= POINT_RATE_ARRAY["clubcup"]["bottle"][playerdata_array["clubcupBottle"]];

      // 勧誘ptUp (%)
      let ptUpPercent = 0;
      if (playerdata_array["clubcupPointUp"] > 200) {
        ptUpPercent = 200;
      } else if (playerdata_array["clubcupPointUp"] > 0) {
        ptUpPercent = Number(playerdata_array["clubcupPointUp"]);
      }
      // 自身が部長か副部長の時、pt 5% アップ
      if ((playerdata_array["position"] === "leader") || (playerdata_array["position"] === "subleader")) {
        ptUpPercent += POINT_RATE_ARRAY["clubcup"]["leaders"] * 100;
      }
      // 相手が部長か副部長の時、pt 5% アップ
      if (playerdata_array["clubcupRivalLeaders"] === true) {
        ptUpPercent += POINT_RATE_ARRAY["clubcup"]["leaders"] * 100;
      }
      pointMultiplier *= (1 + ptUpPercent/100);

      // SP応援 (%)
      let spPercent = 0;
      if (playerdata_array["clubcupSpPercent"] > 0) {
        spPercent = playerdata_array["clubcupSpPercent"];
      }
      pointMultiplier *= (1 + spPercent/100);

      // 声援効果Up (自分)
      pointMultiplier *= (1 + DATA_ARRAY['calc-result']['clubcup-skilleffect']/100);

      // 声援効果Down (相手)
      let skillDown = 0;
      if (playerdata_array["clubcupRivalSkillDown"] > 100) {
        skillDown = 100;
      } else if (playerdata_array["clubcupRivalSkillDown"] > 0) {
        skillDown = playerdata_array["clubcupRivalSkillDown"];
      }
      pointMultiplier *= (1 - skillDown/100);

      // 攻コスト補正
      if (playerdata_array["attackcost"] < 1) {
        pointMultiplier *= Math.pow(1, 0.3);
      } else {
        pointMultiplier *= Math.pow(playerdata_array["attackcost"], 0.3);
      }

      // SP応援 固定値
      let spFix = 0;
      if (playerdata_array["clubcupSpFixPt"] > 0) {
        if ((playerdata_array["clubcupBottle"] === "1") || (playerdata_array["clubcupBottle"] === "3")) {
          spFix = playerdata_array["clubcupSpFixPt"] * POINT_RATE_ARRAY["clubcup"]["bottle"][playerdata_array["clubcupBottle"]];
        }
      }

      min_converted = `${Math.ceil(Math.pow(min, 0.5) * pointMultiplier / 33333 + spFix).toLocaleString()} pt`;
      exp_converted = `${Math.ceil(Math.pow(exp, 0.5) * pointMultiplier / 33333 + spFix).toLocaleString()} pt`;
      max_converted = `${Math.ceil(Math.pow(max, 0.5) * pointMultiplier / 33333 + spFix).toLocaleString()} pt`;
    } else if (pageid === 'championship') {
      if (playerdata_array["appealType"] === "battle") {
        min_converted = `${Math.ceil(min / 10000).toLocaleString()} pt`;
        exp_converted = `${Math.ceil(exp / 10000).toLocaleString()} pt`;
        max_converted = `${Math.ceil(max / 10000).toLocaleString()} pt`;
      } else { /* "time-normal" or "time-rare" */
        const pointMultiplier = POINT_RATE_ARRAY[pageid][playerdata_array["appealType"]];
        min_converted = `${Math.ceil(min * pointMultiplier / 33333).toLocaleString()} pt`;
        exp_converted = `${Math.ceil(exp * pointMultiplier / 33333).toLocaleString()} pt`;
        max_converted = `${Math.ceil(max * pointMultiplier / 33333).toLocaleString()} pt`;
      }
    }
  } else {
    min_converted = min.toLocaleString();
    exp_converted = exp.toLocaleString();
    max_converted = max.toLocaleString();
  }

  // 計算結果を更新
  $('#min-current').text(min_converted);
  $('#exp-current').text(exp_converted);
  $('#max-current').text(max_converted);
  // DATA_ARRAYに格納
  DATA_ARRAY["calc-result"].min = min_converted;
  DATA_ARRAY["calc-result"].exp = exp_converted;
  DATA_ARRAY["calc-result"].max = max_converted;

  // 全国高校生課外活動コンテスト / 散策♪聖櫻ワールド用 ハート6 & 15 計算結果更新
  if (pageid === "divrace" || pageid === 'board') {
    $('#min-current-6').text((min*6).toLocaleString());
    $('#exp-current-6').text((exp*6).toLocaleString());
    $('#max-current-6').text((max*6).toLocaleString());
    $('#min-current-15').text((min*15).toLocaleString());
    $('#exp-current-15').text((exp*15).toLocaleString());
    $('#max-current-15').text((max*15).toLocaleString());
  }

  for (let i = 0 ; i < MAX_PRECIOUS_SCENES ; i++) {
    $(`#precious-scenes-${i+1} .precious-effect`).text(precious_accumulate_value[String(i+1)].toLocaleString());
  }

  if (pageid === 'clubcup') {
    $('#clubcup-skilleffect-current').text(DATA_ARRAY['calc-result']['clubcup-skilleffect'].toFixed(1));

    addTweetButton(`${EVENT_NAME_CONVERT[pageid]} のセンバツシミュレーションの結果は
最小値: ${min_converted} / 期待値: ${exp_converted} / 最大値: ${max_converted} / 声援効果: ${DATA_ARRAY['calc-result']['clubcup-skilleffect'].toFixed(1)} % でした！`, `https://kinokotogame.club/decksim/${pageid}/`);
  } else {
    addTweetButton(`${EVENT_NAME_CONVERT[pageid]} のセンバツシミュレーションの結果は
最小値: ${min_converted} / 期待値: ${exp_converted} / 最大値: ${max_converted}でした！`, `https://kinokotogame.club/decksim/${pageid}/`);
  }
}

function preparePreciousArray() {

  let precious_array = { "1" : { valid : false, name : "50", star : "5", count : "0" },
                         "2" : { valid : false, name : "44", star : "5", count : "0" },
                         "3" : { valid : false, name : "37", star : "5", count : "0" } };

  let element = 'precious-scenes';
  let outerkeys = Object.keys(DATA_ARRAY[element]);

  for (let i = 0 ; i < outerkeys.length ; i++ ) {
    let innerkeys = Object.keys(DATA_ARRAY[element][outerkeys[i]]);

    for (let j = 0 ; j < innerkeys.length ; j++ ) {
      precious_array[outerkeys[i]][innerkeys[j]] = DATA_ARRAY[element][outerkeys[i]][innerkeys[j]];
    }
  }

  return precious_array;
}

function preparePetitArray() {
  let petit_power = { attack : 0, defence : 0 };
  let petit_effects_array = { type : { All :   { attack : 0, defence : 0, both : 0 },
                                       Pop :   { attack : 0, defence : 0, both : 0 },
                                       Sweet : { attack : 0, defence : 0, both : 0 },
                                       Cool :  { attack : 0, defence : 0, both : 0 } },
                              best : { All : { both : 0 } },
                              date : { All : { both : 0 } },
                              touch : { All : { both : 0 } },
                              birth : { All : { both : 0 } },
                              clubitem : { Pop : { both : 0 }, Sweet : { both : 0 }, Cool :  { both : 0 } }
                            };

  let element = 'petit-girls';
  let innerkeys;

  if (DATA_ARRAY[element]["0"]) { innerkeys = Object.keys(DATA_ARRAY[element]["0"]); }
  else { innerkeys = []; }
  for (let i = 0 ; i < innerkeys.length ; i++ ) {
    petit_power[innerkeys[i]] = DATA_ARRAY[element]["0"][innerkeys[i]];
  }

  for (let i = 0 ; i < MAX_PETIT_GIRLS ; i++ ) {
    let temparray = { "effect-1" : "18", "effect-2" : "66", "effect-3" : "64", "effect-4" : "198" };

    if (DATA_ARRAY[element][String(i+1)]) { innerkeys = Object.keys(DATA_ARRAY[element][String(i+1)]); }
    else { innerkeys = []; }

    for (let j = 0 ; j < innerkeys.length ; j++ ) {
        temparray[innerkeys[j]] = DATA_ARRAY[element][String(i+1)][innerkeys[j]];
    }

    innerkeys = Object.keys(temparray);
    for (let j = 0 ; j < innerkeys.length ; j++ ) {
      let k = PETIT_GIRLS_EFFECTS[temparray[innerkeys[j]]];
      if (k.condition === "invalid") { continue; }
      petit_effects_array[k.condition][k.type][k.effect] += k.lvmax;
    }
  }

  return [petit_power, petit_effects_array];
}

function prepareDeckBonusArray() {
  let deckbonus_array = { attack : 0, defence : 0, both : 0};

  let element = 'deck-bonus';
  let outerkeys = Object.keys(DATA_ARRAY[element]);

  let temparray = { "1" : { lv : "Lv8", effect : "attack", type : "normal" }, "2" : { lv : "Lv5", effect : "attack", type : "normal" },
                    "3" : { lv : "Lv5", effect : "attack", type : "normal" }, "4" : { lv : "Lv5", effect : "attack", type : "normal" },
                    "5" : { lv : "Lv5", effect : "attack", type : "normal" },
                    "6" : { lv : "Lv5", effect : "both"  , type : "shine"  }, "7" : { lv : "Lv3", effect : "both"  , type : "precious" } };

  for (let i = 0 ; i < outerkeys.length ; i++ ) {
    let innerkeys = Object.keys(DATA_ARRAY[element][outerkeys[i]]);

    for (let j = 0 ; j < innerkeys.length ; j++ ) {
      temparray[outerkeys[i]][innerkeys[j]] = DATA_ARRAY[element][outerkeys[i]][innerkeys[j]];
    }
  }

  outerkeys = Object.keys(temparray);
  for (let i = 0 ; i < outerkeys.length ; i++ ) {
    deckbonus_array[temparray[outerkeys[i]].effect] += BONUS_VALUE_ARRAY.deck[temparray[outerkeys[i]].type][temparray[outerkeys[i]].effect][temparray[outerkeys[i]].lv];
  }

  return deckbonus_array;
}

function preparePlayerDataArray() {

  let playerdata_array = { type : "Pop", position : "leader", attackcost : 2000,
                          "menscologne-pop" : 0, "menscologne-sweet" : 0, "menscologne-cool" : 0,
                          "clubitem-pop" : true, "clubitem-sweet" : true, "clubitem-cool" : true,
                          spgirls : "0", "multiply-1" : 1, "multiply-2" : 1,
                          "raidtype" : "Normal", "raidwartype" : "SSR",
                          "megabuff" : 100, "megadebuff" : 50, "clubcupbuff" : 50, "clubcupwinbonus" : true,
                          "number-of-heart" : "1", "attack-count" : 1, "combo-raid" : "0", "combo-raidwar" : "50",
                          "raidwarBuff" : 150, "raidwarDamage" : 0,
                          "clubcupBottle" : "1", "clubcupSpPercent" : 0, "clubcupSpFixPt" : 0,
                          "clubcupRivalSkillDown" : 0, "clubcupRivalLeaders" : false, "clubcupPointUp" : 200,
                          "appealType" : "time-rare", "appealHearts" : "5", "appealTensionMax" : true, "appealTurns" : "5",
                          "point-converter" : false, "assist-members" : false,
                        };

  let element = 'player-data';
  let outerkeys = Object.keys(DATA_ARRAY[element]);

  for (let i = 0 ; i < outerkeys.length ; i++ ) {
    let innerkeys = Object.keys(DATA_ARRAY[element][outerkeys[i]]);

    for (let j = 0 ; j < innerkeys.length ; j++ ) {
      playerdata_array[innerkeys[j]] = DATA_ARRAY[element][outerkeys[i]][innerkeys[j]];
    }
  }

  return playerdata_array;
}

function calcMainGirlsPerformance(precious_array, petit_effects_array, deckbonus_array, playerdata_array, displayUpdateFlg) {
  let innerkeys, innervalue;
  let min = 0, exp_dif = 0, max_dif = 0, value = 0;
  let pageid = $('body').prop('id')

  let max_main = 0;
  if ((pageid === "championship") || (pageid === "championship-defence")) {
    max_main = MAX_MAIN_GIRLS_CHAMP;
  } else if (pageid === "divrace") {
    max_main = MAX_MAIN_GIRLS_DIVRACE;
  } else {
    max_main = MAX_MAIN_GIRLS;
  }

  let effect_type;
  if ((pageid === 'raid-second-defence') || (pageid === 'championship-defence')) {
    effect_type = 'defence';
  } else {
    effect_type = 'attack';
  }

  // 声援計算用 応援力保管庫
  let power_array = { All : [], Pop : [], Sweet : [], Cool : [] };

  // 順位表示用 補正値個人保管庫
  let result_array = [];
  let result_array_NormalBattle = [];

  let precious_accumulate_value = {};
  for (let i = 0 ; i < MAX_PRECIOUS_SCENES ; i++ ) {
    precious_accumulate_value[String(i+1)] = 0;
  }

  let element = 'main-scenes';
  let bonusratearray_scenes = BONUS_RATE_ARRAY[pageid]['main-scenes'];
  let bonusratearray_strap = BONUS_RATE_ARRAY[pageid]['main-strap'];
  let bonusratearray_precious = BONUS_RATE_ARRAY[pageid]['main-precious'];

  for (let i = 0 ; i < max_main ; i++ ) {
    let temparray = { apower : 0, strap : 0, type : 'Pop', rarity : 'SSR',
                      cost : '27', skilllv : String(INIT_SKILL_LEVEL), grade : '1', club : false,
                      date : false, touch : false, birth : false, limit : false,
                      best : false, special : false };
    let solo_min = 0;
    let solo_exp_dif = 0;
    let solo_max_dif = 0;

    if (DATA_ARRAY[element][String(i+1)]) { innerkeys = Object.keys(DATA_ARRAY[element][String(i+1)]); }
    else { innerkeys = []; }

    for (let j = 0 ; j < innerkeys.length ; j++ ) {
      innervalue = DATA_ARRAY[element][String(i+1)][innerkeys[j]];
      temparray[innerkeys[j]] = innervalue;
    }

    if (temparray.apower < 1) {
      $(`#main-scenes-${String(i+1)} .result-1`).text((0).toLocaleString());
      result_array.push(0);
      result_array_NormalBattle.push(0);
      power_array['All'].push([0, 0, 0,
        { towersp : temparray.special, skilllv : temparray.skilllv,
          rarity : temparray.rarity, raidtypebonus : [] }
      ]);
      power_array[temparray.type].push([0, 0, 0,
        { towersp : temparray.special, skilllv : temparray.skilllv,
          rarity : temparray.rarity, raidtypebonus : [] }
      ]);
      continue;
    }
    let precious_value = calcPreciousValue(temparray, "main", precious_array);
    let precious_sum = 0;
    for (let j = 0 ; j < precious_value.length ; j++ ) {
      precious_sum += precious_value[j];
      precious_accumulate_value[String(j+1)] += precious_value[j];
    }

    let mega_multiplier_scenes = 1;
    let maga_multiplier_strap = 1;
    let maga_multiplier_precious = 1;
    let attack_buff_multiplier = 1;
    if (pageid === 'raid-mega') {
      if (Number(playerdata_array.megabuff) > 100) {
        attack_buff_multiplier = 2;
      } else if (Number(playerdata_array.megabuff) < -100) {
        attack_buff_multiplier = 0;
      } else {
        attack_buff_multiplier = 1 + (Number(playerdata_array.megabuff) / 100);
      }
      mega_multiplier_scenes = (1 + (BONUS_VALUE_ARRAY.raidspecial.mega[effect_type][playerdata_array['raidtype']][temparray.type]['scenes'] / 100)) * attack_buff_multiplier;
      maga_multiplier_strap = (1 + (BONUS_VALUE_ARRAY.raidspecial.mega[effect_type][playerdata_array['raidtype']][temparray.type]['strap'] / 100)) * attack_buff_multiplier;
      maga_multiplier_precious = 1 + (BONUS_VALUE_ARRAY.raidspecial.mega[effect_type][playerdata_array['raidtype']][temparray.type]['precious'] / 100);
    }

    solo_min += Math.ceil(Number(temparray.apower) * bonusratearray_scenes.base / 100 * mega_multiplier_scenes);
    solo_min += Math.ceil(Number(temparray.strap) * bonusratearray_strap.base / 100 * maga_multiplier_strap);
    solo_min += Math.ceil(Number(precious_sum) * bonusratearray_precious.base / 100);

    if (temparray.type === playerdata_array.type) {
      value = BONUS_VALUE_ARRAY.typematch[effect_type];
      solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.typematch / 100 * mega_multiplier_scenes);
      solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.typematch / 100 * maga_multiplier_strap);
      solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.typematch / 100 * maga_multiplier_precious);
    }

    if (temparray.club) {
      value = BONUS_VALUE_ARRAY.clubmatch[effect_type];
      solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.clubmatch / 100 * mega_multiplier_scenes);
      solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.clubmatch / 100 * maga_multiplier_strap);
      solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.clubmatch / 100 * maga_multiplier_precious);
    }

    if (playerdata_array[`clubitem-${temparray['type'].toLowerCase()}`] === true) {
      value = BONUS_VALUE_ARRAY.clubitem[effect_type];
      value *= 1 + (petit_effects_array.clubitem[temparray.type].both / 100);

      solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.clubitem / 100 * mega_multiplier_scenes);
      solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.clubitem / 100 * maga_multiplier_strap);
      solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.clubitem / 100 * maga_multiplier_precious);
    }

    value = BONUS_VALUE_ARRAY.clubposition[effect_type][playerdata_array.position];
    solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.clubposition / 100 * mega_multiplier_scenes);
    solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.clubposition / 100 * maga_multiplier_strap);
    solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.clubposition / 100 * maga_multiplier_precious);

    value = deckbonus_array[effect_type] + deckbonus_array['both'];
    solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.deck / 100 * mega_multiplier_scenes);
    solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.deck / 100 * maga_multiplier_strap);
    solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.deck / 100 * maga_multiplier_precious);

    if (temparray.date) {
      value = BONUS_VALUE_ARRAY.date[effect_type][temparray.rarity];
      solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.date / 100 * mega_multiplier_scenes);
      solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.date / 100 * maga_multiplier_strap);
      solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.date / 100)

      for (let j = 0 ; j < precious_value.length ; j++ ) {
        precious_accumulate_value[String(j+1)] += Math.ceil(precious_value[j] * value / 100);
      }
    }

    if (temparray.touch) {
      value = BONUS_VALUE_ARRAY.touch[effect_type];
      solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.touch / 100 * mega_multiplier_scenes);
      solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.touch / 100 * maga_multiplier_strap);
      solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.touch / 100 * maga_multiplier_precious);
    }

    if (temparray.birth) {
      value = BONUS_VALUE_ARRAY.birthday[effect_type];
      solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.birthday / 100 * mega_multiplier_scenes);
      solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.birthday / 100 * maga_multiplier_strap);
      solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.birthday / 100 * maga_multiplier_precious);
    }

    value = playerdata_array[`menscologne-${temparray['type'].toLowerCase()}`]
    value *= 0.2;
    solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.menscologne / 100 * mega_multiplier_scenes);
    solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.menscologne / 100 * maga_multiplier_strap);
    solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.menscologne / 100 * maga_multiplier_precious);

    value = petit_effects_array["type"]["All"][effect_type] + petit_effects_array["type"]["All"]["both"];
    value += petit_effects_array["type"][temparray.type][effect_type] + petit_effects_array["type"][temparray.type]["both"];
    if (temparray.best) { value += petit_effects_array["best"]["All"]["both"]; }
    if (temparray.date) { value += petit_effects_array["date"]["All"]["both"]; }
    if (temparray.birth) { value += petit_effects_array["birth"]["All"]["both"]; }
    if (temparray.touch) { value += petit_effects_array["touch"]["All"]["both"]; }
    solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.petit_effects / 100 * mega_multiplier_scenes);
    solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.petit_effects / 100 * maga_multiplier_strap);
    solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.petit_effects / 100 * maga_multiplier_precious);

    if (temparray.limit) {
      value = BONUS_VALUE_ARRAY.limitbreak[effect_type];
      solo_exp_dif += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.limitbreak / 100 * BONUS_VALUE_ARRAY.limitbreak.probability / 100 * mega_multiplier_scenes);
      solo_exp_dif += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.limitbreak / 100 * BONUS_VALUE_ARRAY.limitbreak.probability / 100 * maga_multiplier_strap);
      solo_exp_dif += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.limitbreak / 100 * BONUS_VALUE_ARRAY.limitbreak.probability / 100 * maga_multiplier_precious);
      solo_max_dif += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.limitbreak / 100 * mega_multiplier_scenes);
      solo_max_dif += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.limitbreak / 100 * maga_multiplier_strap);
      solo_max_dif += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.limitbreak / 100 * maga_multiplier_precious);
    }

    let raidtypebonus = [];
    if ((pageid === "tower") && (temparray.special)) {
      let skilllv_r = 0;
      if (temparray.skilllv < 10) { skilllv_r = 10; }
      else if (temparray.skilllv > MAX_SKILL_LEVEL) { skilllv_r = MAX_SKILL_LEVEL; }
      else { skilllv_r = temparray.skilllv; }
      value = BONUS_VALUE_ARRAY.towerspecial[effect_type][temparray.rarity][String(skilllv_r)];
      solo_min = Math.ceil(solo_min * (1 + value / 100));
      solo_exp_dif = Math.ceil(solo_exp_dif * (1 + value / 100));
      solo_max_dif = Math.ceil(solo_max_dif * (1 + value / 100));
    } else if ((pageid === "raid-first") || (pageid === "raid-second-attack") || (pageid === "raid-second-defence")) {
      raidtypebonus[0] = 1 + (BONUS_VALUE_ARRAY.raidspecial.superrare[effect_type][playerdata_array['raidtype']][temparray.type] / 100);
      solo_min = Math.ceil(solo_min * raidtypebonus[0]);
      solo_exp_dif = Math.ceil(solo_exp_dif * raidtypebonus[0]);
      solo_max_dif = Math.ceil(solo_max_dif * raidtypebonus[0]);
    } else if (pageid === "raid-mega") {
      raidtypebonus[0] = (1 + (BONUS_VALUE_ARRAY.raidspecial.mega[effect_type][playerdata_array['raidtype']][temparray.type]['scenes'] / 100)) * attack_buff_multiplier;
      raidtypebonus[1] = (1 + (BONUS_VALUE_ARRAY.raidspecial.mega[effect_type][playerdata_array['raidtype']][temparray.type]['strap'] / 100)) * attack_buff_multiplier;
      raidtypebonus[2] = 1 + (BONUS_VALUE_ARRAY.raidspecial.mega[effect_type][playerdata_array['raidtype']][temparray.type]['precious'] / 100);
    } else if (pageid === "clubcup") {
      let clubcupbuf = Number(playerdata_array['clubcupbuff']);
      if (clubcupbuf < 0) { clubcupbuf = 0; }
      else if (clubcupbuf > 50) { clubcupbuf = 50; }
      value = deckbonus_array[effect_type] + deckbonus_array['both'];

      solo_min += Math.ceil(Number(temparray.apower) * bonusratearray_scenes.base / 100 * clubcupbuf / 100);
      solo_min += Math.ceil(Number(temparray.strap) * bonusratearray_strap.base / 100 * clubcupbuf / 100);
      solo_min += Math.ceil(Number(precious_sum) * bonusratearray_precious.base / 100 * clubcupbuf / 100);

      solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.deck / 100 * clubcupbuf / 100);
      solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.deck / 100 * clubcupbuf / 100);
      solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.deck / 100 * clubcupbuf / 100);
    }

    power_array['All'].push([
      Number(temparray.apower),
      Number(temparray.strap),
      precious_sum,
      { towersp : temparray.special, skilllv : temparray.skilllv, rarity : temparray.rarity, raidtypebonus : raidtypebonus }
    ]);
    power_array[temparray.type].push([
      Number(temparray.apower),
      Number(temparray.strap),
      precious_sum,
      { towersp : temparray.special, skilllv : temparray.skilllv, rarity : temparray.rarity, raidtypebonus : raidtypebonus }
    ]);

    min += solo_min;
    exp_dif += solo_exp_dif;
    max_dif += solo_max_dif;

    if (displayUpdateFlg === true) {
      $(`#main-scenes-${String(i+1)} .result-1`).text((solo_min + solo_exp_dif).toLocaleString());
      result_array.push((solo_min + solo_exp_dif));
    }

    if (pageid === 'clubcup') {
      let skilllv_r = 0;
      if (temparray.skilllv < 1) { skilllv_r = 1; }
      else if (temparray.skilllv > MAX_SKILL_LEVEL) { skilllv_r = MAX_SKILL_LEVEL; }
      else { skilllv_r = temparray.skilllv; }
      $(`#main-scenes-${String(i+1)} .clubcup-skilleffect`).text(`${CLUBCUP_SKILL_EFFECT[temparray.rarity][skilllv_r].toFixed(1)} %`);
      DATA_ARRAY['calc-result']['clubcup-skilleffect'] += CLUBCUP_SKILL_EFFECT[temparray.rarity][skilllv_r];
    }

    if (pageid === 'normal-battle') {
      let ratio;
      if (temparray.cost < 1) {
        ratio = 0;
      } else {
        ratio = Math.round((solo_min + solo_exp_dif) / temparray.cost);
      }

      $(`#main-scenes-${String(i+1)} .result-event-sp-1`).text(ratio.toLocaleString());
      result_array_NormalBattle.push(ratio);
    }
  }
  if (displayUpdateFlg === true) {
    displayMainGirlsRaking(result_array, false);
  }
  if (pageid === 'normal-battle') {
    displayMainGirlsRaking(result_array_NormalBattle, true);
  }
  return [min, exp_dif, max_dif, precious_accumulate_value, power_array];
}

function displayMainGirlsRaking(array, SpFlg) {
  let zero_count = 0;
  const sorted = array.slice().sort((a, b) => a - b)
  for (let i = 0 ; i < sorted.length ; i++) {
    if (sorted[i] === 0) zero_count++;
    else break;
  }

  if (SpFlg === false) {
    for (let i in array) {
      if (array[i] === 0) {
        $(`#main-scenes-${String(Number(i)+1)} .result-2`).text('-');
      } else {
        const rank = sorted.indexOf(array[i]) + 1 - zero_count;
        $(`#main-scenes-${String(Number(i)+1)} .result-2`).text(rank);
      }
    }
  } else {
    for (let i in array) {
      if (array[i] === 0) {
        $(`#main-scenes-${String(Number(i)+1)} .result-event-sp-2`).text('-');
      } else {
        const rank = sorted.indexOf(array[i]) + 1 - zero_count;
        $(`#main-scenes-${String(Number(i)+1)} .result-event-sp-2`).text(rank);
      }
    }
  }
}

function calcSubGirlsPerformance(precious_array, petit_effects_array, deckbonus_array, playerdata_array, displayUpdateFlg) {
  let innerkeys, innervalue;
  let min = 0, exp_dif = 0, max_dif = 0, value = 0;
  let pageid = $('body').prop('id')

  let effect_type;
  if ((pageid === 'raid-second-defence') || (pageid === 'championship-defence')) {
    effect_type = 'defence';
  } else {
    effect_type = 'attack';
  }
  // 声援計算用 応援力保管庫
  let power_array = { All : [], Pop : [], Sweet : [], Cool : [] };

  // 順位表示用 補正値個人保管庫
  let result_array = [];
  let result_array_NormalBattle = [];

  let precious_accumulate_value = {};
  for (let i = 0 ; i < MAX_PRECIOUS_SCENES ; i++ ) {
    precious_accumulate_value[String(i+1)] = 0;
  }

  let element = 'sub-scenes';
  let bonusratearray_scenes = BONUS_RATE_ARRAY[pageid]['sub-scenes'];
  let bonusratearray_strap = BONUS_RATE_ARRAY[pageid]['sub-strap'];
  let bonusratearray_precious = BONUS_RATE_ARRAY[pageid]['sub-precious'];

  let max_sub = 0;

  if (pageid === "raid-mega") {
    max_sub = MAX_SUB_GIRLS_MEGA;
  } else if ((pageid === "championship") || (pageid === "championship-defence")) {
    max_sub = MAX_SUB_GIRLS_CHAMP;
  } else if (pageid === "divrace") {
    max_sub = MAX_SUB_GIRLS_DIVRACE;
  } else {
    max_sub = MAX_SUB_GIRLS;
  }

  for (let i = 0 ; i < max_sub ; i++ ) {
    let temparray = { apower : 0, strap : 0, type : 'Pop', rarity : 'SSR',
                      cost : '27', skilllv : String(INIT_SKILL_LEVEL), grade : '1', club : false,
                      date : false, touch : false, birth : false, limit : false,
                      best : false, special : false };
    let solo_min = 0;
    let solo_exp_dif = 0;
    let solo_max_dif = 0;

    if (DATA_ARRAY[element][String(i+1)]) { innerkeys = Object.keys(DATA_ARRAY[element][String(i+1)]); }
    else { innerkeys = []; }

    for (let j = 0 ; j < innerkeys.length ; j++ ) {
      innervalue = DATA_ARRAY[element][String(i+1)][innerkeys[j]];
      temparray[innerkeys[j]] = innervalue;
    }

    if ((temparray.apower < 1) || (pageid === "raid-mega")) {
      $(`#sub-scenes-${String(i+1)} .result-1`).text((0).toLocaleString());
      result_array.push(0);
      result_array_NormalBattle.push(0);
      power_array['All'].push([0, 0, 0,
        { towersp : temparray.special, skilllv : temparray.skilllv,
          rarity : temparray.rarity, raidtypebonus : [] }
      ]);
      power_array[temparray.type].push([0, 0, 0,
        { towersp : temparray.special, skilllv : temparray.skilllv,
          rarity : temparray.rarity, raidtypebonus : [] }
      ]);

      continue;
    }
    let precious_value = calcPreciousValue(temparray, "sub", precious_array);
    let precious_sum = 0;
    for (let j = 0 ; j < precious_value.length ; j++ ) {
      precious_sum += precious_value[j];
      precious_accumulate_value[String(j+1)] += precious_value[j];
    }

    solo_min += Math.ceil(Number(temparray.apower) * bonusratearray_scenes.base / 100);
    solo_min += Math.ceil(Number(temparray.strap) * bonusratearray_strap.base / 100);
    solo_min += Math.ceil(Number(precious_sum) * bonusratearray_precious.base / 100);

    if (temparray.type === playerdata_array.type) {
      value = BONUS_VALUE_ARRAY.typematch[effect_type];
      solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.typematch / 100);
      solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.typematch / 100);
      solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.typematch / 100);
    }

    if (temparray.club) {
      value = BONUS_VALUE_ARRAY.clubmatch[effect_type];
      solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.clubmatch / 100);
      solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.clubmatch / 100);
      solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.clubmatch / 100);
    }

    if (playerdata_array[`clubitem-${temparray['type'].toLowerCase()}`] === true) {
      value = BONUS_VALUE_ARRAY.clubitem[effect_type];
      value *= 1 + (petit_effects_array.clubitem[temparray.type].both / 100);

      solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.clubitem / 100);
      solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.clubitem / 100);
      solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.clubitem / 100);
    }

    value = BONUS_VALUE_ARRAY.clubposition[effect_type][playerdata_array.position];
    solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.clubposition / 100);
    solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.clubposition / 100);
    solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.clubposition / 100);

    value = deckbonus_array[effect_type] + deckbonus_array['both'];
    solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.deck / 100);
    solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.deck / 100);
    solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.deck / 100);

    if (temparray.date) {
      value = BONUS_VALUE_ARRAY.date[effect_type][temparray.rarity];
      solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.date / 100);
      solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.date / 100);
      solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.date / 100);

      for (let j = 0 ; j < precious_value.length ; j++ ) {
        precious_accumulate_value[String(j+1)] += Math.ceil(precious_value[j] * value / 100);
      }
    }

    if (temparray.touch) {
      value = BONUS_VALUE_ARRAY.touch[effect_type];
      solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.touch / 100);
      solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.touch / 100);
      solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.touch / 100);
    }

    if (temparray.birth) {
      value = BONUS_VALUE_ARRAY.birthday[effect_type];
      solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.birthday / 100);
      solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.birthday / 100);
      solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.birthday / 100);
    }

    value = playerdata_array[`menscologne-${temparray['type'].toLowerCase()}`]
    value *= 0.2;
    solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.menscologne / 100);
    solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.menscologne / 100);
    solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.menscologne / 100);

    value = petit_effects_array["type"]["All"][effect_type] + petit_effects_array["type"]["All"]["both"];
    value += petit_effects_array["type"][temparray.type][effect_type] + petit_effects_array["type"][temparray.type]["both"];
    if (temparray.best) { value += petit_effects_array["best"]["All"]["both"]; }
    if (temparray.date) { value += petit_effects_array["date"]["All"]["both"]; }
    if (temparray.birth) { value += petit_effects_array["birth"]["All"]["both"]; }
    if (temparray.touch) { value += petit_effects_array["touch"]["All"]["both"]; }
    solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.petit_effects / 100);
    solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.petit_effects / 100);
    solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.petit_effects / 100);

    if (temparray.limit) {
      value = BONUS_VALUE_ARRAY.limitbreak[effect_type];
      solo_exp_dif += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.limitbreak / 100 * BONUS_VALUE_ARRAY.limitbreak.probability / 100);
      solo_exp_dif += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.limitbreak / 100 * BONUS_VALUE_ARRAY.limitbreak.probability / 100);
      solo_exp_dif += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.limitbreak / 100 * BONUS_VALUE_ARRAY.limitbreak.probability / 100);
      solo_max_dif += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.limitbreak / 100);
      solo_max_dif += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.limitbreak / 100);
      solo_max_dif += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.limitbreak / 100);
    }

    let raidtypebonus = [];
    if ((pageid === "tower") && (temparray.special)) {
      let skilllv_r = 0;
      if (temparray.skilllv < 10) { skilllv_r = 10; }
      else if (temparray.skilllv > MAX_SKILL_LEVEL) { skilllv_r = MAX_SKILL_LEVEL; }
      else { skilllv_r = temparray.skilllv; }
      value = BONUS_VALUE_ARRAY.towerspecial[effect_type][temparray.rarity][String(skilllv_r)];
      solo_min = Math.ceil(solo_min * (1 + value / 100));
      solo_exp_dif = Math.ceil(solo_exp_dif * (1 + value / 100));
      solo_max_dif = Math.ceil(solo_max_dif * (1 + value / 100));
    } else if ((pageid === "raid-first") || (pageid === "raid-second-attack") || (pageid === "raid-second-defence")) {
      raidtypebonus[0] = 1 + (BONUS_VALUE_ARRAY.raidspecial.superrare[effect_type][playerdata_array['raidtype']][temparray.type] / 100);
      solo_min = Math.ceil(solo_min * raidtypebonus[0]);
      solo_exp_dif = Math.ceil(solo_exp_dif * raidtypebonus[0]);
      solo_max_dif = Math.ceil(solo_max_dif * raidtypebonus[0]);
    } else if (pageid === "clubcup") {
      let clubcupbuf = Number(playerdata_array['clubcupbuff']);
      if (clubcupbuf < 0) { clubcupbuf = 0; }
      else if (clubcupbuf > 50) { clubcupbuf = 50; }
      value = deckbonus_array[effect_type] + deckbonus_array['both'];

      solo_min += Math.ceil(Number(temparray.apower) * bonusratearray_scenes.base / 100 * clubcupbuf / 100);
      solo_min += Math.ceil(Number(temparray.strap) * bonusratearray_strap.base / 100 * clubcupbuf / 100);
      solo_min += Math.ceil(Number(precious_sum) * bonusratearray_precious.base / 100 * clubcupbuf / 100);

      solo_min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.deck / 100 * clubcupbuf / 100);
      solo_min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.deck / 100 * clubcupbuf / 100);
      solo_min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.deck / 100 * clubcupbuf / 100);
    }

    power_array['All'].push([
      Number(temparray.apower),
      Number(temparray.strap),
      precious_sum,
      { towersp : temparray.special, skilllv : temparray.skilllv, rarity : temparray.rarity, raidtypebonus : raidtypebonus }
    ]);
    power_array[temparray.type].push([
      Number(temparray.apower),
      Number(temparray.strap),
      precious_sum,
      { towersp : temparray.special, skilllv : temparray.skilllv, rarity : temparray.rarity, raidtypebonus : raidtypebonus }
    ]);

    min += solo_min;
    exp_dif += solo_exp_dif;
    max_dif += solo_max_dif;

    if (displayUpdateFlg === true) {
      $(`#sub-scenes-${String(i+1)} .result-1`).text((solo_min + solo_exp_dif).toLocaleString());
      result_array.push((solo_min + solo_exp_dif));
    }

    if (pageid === 'clubcup') {
      let skilllv_r = 0;
      if (temparray.skilllv < 1) { skilllv_r = 1; }
      else if (temparray.skilllv > MAX_SKILL_LEVEL) { skilllv_r = MAX_SKILL_LEVEL; }
      else { skilllv_r = temparray.skilllv; }
      $(`#sub-scenes-${String(i+1)} .clubcup-skilleffect`).text(`${CLUBCUP_SKILL_EFFECT[temparray.rarity][skilllv_r].toFixed(1)} %`);
      DATA_ARRAY['calc-result']['clubcup-skilleffect'] += CLUBCUP_SKILL_EFFECT[temparray.rarity][skilllv_r];
    }

    if (pageid === 'normal-battle') {
      let ratio;
      if (temparray.cost < 1) {
        ratio = 0;
      } else {
        ratio = Math.round((solo_min + solo_exp_dif) / temparray.cost);
      }

      $(`#sub-scenes-${String(i+1)} .result-event-sp-1`).text(ratio.toLocaleString());
      result_array_NormalBattle.push(ratio);
    }
  }
  if (displayUpdateFlg === true) {
    displaySubGirlsRaking(result_array, false);
  }
  if (pageid === 'normal-battle') {
    displaySubGirlsRaking(result_array_NormalBattle, true);
  }
  return [min, exp_dif, max_dif, precious_accumulate_value, power_array];
}

function displaySubGirlsRaking(array, SpFlg) {
  let zero_count = 0;
  const sorted = array.slice().sort((a, b) => a - b)
  for (let i = 0 ; i < sorted.length ; i++) {
    if (sorted[i] === 0) zero_count++;
    else break;
  }

  if (SpFlg === false) {
    for (let i in array) {
      if (array[i] === 0) {
        $(`#sub-scenes-${String(Number(i)+1)} .result-2`).text('-');
      } else {
        const rank = sorted.indexOf(array[i]) + 1 - zero_count;
        $(`#sub-scenes-${String(Number(i)+1)} .result-2`).text(rank);
      }
    }
  } else {
    for (let i in array) {
      if (array[i] === 0) {
        $(`#sub-scenes-${String(Number(i)+1)} .result-event-sp-2`).text('-');
      } else {
        const rank = sorted.indexOf(array[i]) + 1 - zero_count;
        $(`#sub-scenes-${String(Number(i)+1)} .result-event-sp-2`).text(rank);
      }
    }
  }
}

function calcMainGirlsSkillPerformance(power_array_main, power_array_sub) {

  let min = 0, exp_dif = 0, max_dif = 0;
  let pageid = $('body').prop('id')
  let skill_array = prepareSkillArray('main');
  let sum_value = [];

  let max_main = 0;
  if ((pageid === "championship") || (pageid === "championship-defence")) {
    max_main = MAX_MAIN_GIRLS_CHAMP;
  } else if (pageid === "divrace") {
    max_main = MAX_MAIN_GIRLS_DIVRACE;
  } else {
    max_main = MAX_MAIN_GIRLS;
  }

  for (let i = 0 ; i < max_main ; i++) {
    sum_value.push(0);
    let solo_value = 0;
    if (skill_array[String(i+1)]["valid"] === 0) {
      continue;
    } else if (skill_array[String(i+1)]["effectivevalue"] === 0) {
      continue;
    } else {
      let target_type = skill_array[String(i+1)]["skill-1"];
      if (skill_array[String(i+1)]["skill-2"] === "main") {
        solo_value += subcalcSkillPerformance(power_array_main[target_type], max_main,
          skill_array[String(i+1)]["effectivevalue"], "main");
      } else if (skill_array[String(i+1)]["skill-2"] === "sub") {
        solo_value += subcalcSkillPerformance(power_array_sub[target_type], skill_array[String(i+1)]["skill-3"],
          skill_array[String(i+1)]["effectivevalue"], "sub");
      } else if (skill_array[String(i+1)]["skill-2"] === "both") {
        solo_value += subcalcSkillPerformance(power_array_main[target_type], max_main,
          skill_array[String(i+1)]["effectivevalue"], "main");
        solo_value += subcalcSkillPerformance(power_array_sub[target_type], skill_array[String(i+1)]["skill-3"],
          skill_array[String(i+1)]["effectivevalue"], "sub");
      }
    }
    sum_value[i] = solo_value;
  }

  // ソートする前に表示の更新に利用
  for (let i = 0 ; i < max_main ; i++) {
    if (skill_array[String(i+1)]["effectivevalue"] === 0) {
      $(`#main-skill-${String(i+1)} .skill-effect`).addClass('Red');
    } else {
      $(`#main-skill-${String(i+1)} .skill-effect`).removeClass('Red');
    }
    $(`#main-skill-${String(i+1)} .skill-effect`).text(`${skill_array[String(i+1)]["effectivevalue"]} %`);
    $(`#main-skill-${String(i+1)} .skill-total`).text(sum_value[i].toLocaleString());
    if (pageid === 'clubcup') {
      $(`#main-skill-${String(i+1)} .clubcup-skilleffect`).text(`${(sum_value[i]/5000).toFixed(1)} %`);
      DATA_ARRAY['calc-result']['clubcup-skilleffect'] += sum_value[i]/5000;
    }
  }
  let maxskillnum;
  if ((pageid === "raid-second-attack") || (pageid === "raid-second-defence") || (pageid === "raidwar") || (pageid === "tower") || (pageid === 'normal-battle')) {
    maxskillnum = 3;
  } else if ((pageid === "raid-first") || (pageid === "raid-mega") || (pageid === "clubcup") || (pageid === "championship") || (pageid === "championship-defence")) {
    maxskillnum = 5;
  } else {
    maxskillnum = 3;
  }
  if ((pageid === "raid-second-attack") || (pageid === "raid-second-defence")) {
    let clone = Array.from(sum_value);
    let first = clone.sort((a,b) => b - a)[0];
    let second = clone.sort((a,b) => b - a)[1];
    let third = clone.sort((a,b) => b - a)[2];

    let limit = 3;
    for (let i = 0 ; i < max_main ; i++) {
      if ((sum_value[i] === first) && sum_value[i] !== 0) {
        if (limit > 0) {
          min += sum_value[i];
          $(`#main-skill-${String(i+1)} .skill-chance`).text(`100 %`);
          $(`#main-skill-${String(i+1)} .skill-chance`).removeClass('Red');
          limit -= 1;
          first = 0;
        } else {
          $(`#main-skill-${String(i+1)} .skill-chance`).text(`0 %`);
          $(`#main-skill-${String(i+1)} .skill-chance`).addClass('Red');
        }
      } else if ((sum_value[i] === second) && (sum_value[i] !== 0)) {
        if (limit > 0) {
          min += sum_value[i];
          $(`#main-skill-${String(i+1)} .skill-chance`).text(`100 %`);
          $(`#main-skill-${String(i+1)} .skill-chance`).removeClass('Red');
          limit -= 1;
          second = 0;
        } else {
          $(`#main-skill-${String(i+1)} .skill-chance`).text(`0 %`);
          $(`#main-skill-${String(i+1)} .skill-chance`).addClass('Red');
        }
      } else if ((sum_value[i] === third) && (sum_value[i] !== 0)) {
        if (limit > 0) {
          min += sum_value[i];
          $(`#main-skill-${String(i+1)} .skill-chance`).text(`100 %`);
          $(`#main-skill-${String(i+1)} .skill-chance`).removeClass('Red');
          limit -= 1;
          third = 0;
        } else {
          $(`#main-skill-${String(i+1)} .skill-chance`).text(`0 %`);
          $(`#main-skill-${String(i+1)} .skill-chance`).addClass('Red');
        }
      } else {
        $(`#main-skill-${String(i+1)} .skill-chance`).text(`0 %`);
        $(`#main-skill-${String(i+1)} .skill-chance`).addClass('Red');
      }
    }

  } else {
    for (let i = 0 ; i < max_main ; i++) {
      if (skill_array[String(i+1)]["chance"] === 100) {
        min += sum_value[i];
      } else {
        exp_dif += Math.ceil(sum_value[i] * skill_array[String(i+1)]["chance"] / 100);
      }
    }
    sum_value.sort((a,b) => b - a);
    for (let i = 0 ; i < maxskillnum ; i++) {
      max_dif += sum_value[i];
    }
    max_dif -= min;
  }

  return [min, exp_dif, max_dif];

}

function calcSwitchGirlsSkillPerformance(power_array_main, power_array_sub) {

  let min = 0, exp_dif = 0, max_dif = 0;
  let pageid = $('body').prop('id')
  let skill_array = prepareSkillArray('sub');
  let sum_value = [];

  let max_main = 0;
  if ((pageid === "championship") || (pageid === "championship-defence")) {
    max_main = MAX_MAIN_GIRLS_CHAMP;
  } else if (pageid === "divrace") {
    max_main = MAX_MAIN_GIRLS_DIVRACE;
  } else {
    max_main = MAX_MAIN_GIRLS;
  }

  for (let i = 0 ; i < MAX_SWITCH_GIRLS ; i++) {
    sum_value.push(0);
    let solo_value = 0;
    if (skill_array[String(i+1)]["valid"] === 0) {
      continue;
    } else if (skill_array[String(i+1)]["effectivevalue"] === 0) {
      continue;
    } else {
      let target_type = skill_array[String(i+1)]["skill-1"];
      if (skill_array[String(i+1)]["skill-2"] === "main") {
        solo_value += subcalcSkillPerformance(power_array_main[target_type], max_main,
          skill_array[String(i+1)]["effectivevalue"], "main");
      } else if (skill_array[String(i+1)]["skill-2"] === "sub") {
        solo_value += subcalcSkillPerformance(power_array_sub[target_type], skill_array[String(i+1)]["skill-3"],
          skill_array[String(i+1)]["effectivevalue"], "sub");
      } else if (skill_array[String(i+1)]["skill-2"] === "both") {
        solo_value += subcalcSkillPerformance(power_array_main[target_type], max_main,
          skill_array[String(i+1)]["effectivevalue"], "main");
        solo_value += subcalcSkillPerformance(power_array_sub[target_type], skill_array[String(i+1)]["skill-3"],
          skill_array[String(i+1)]["effectivevalue"], "sub");
      }
    }
    sum_value[i] = solo_value;
  }

  // ソートする前に表示の更新に利用
  for (let i = 0 ; i < MAX_SWITCH_GIRLS ; i++) {
    if (skill_array[String(i+1)]["effectivevalue"] === 0) {
      $(`#sub-switch-${String(i+1)} .skill-effect`).addClass('Red');
    } else {
      $(`#sub-switch-${String(i+1)} .skill-effect`).removeClass('Red');
    }
    $(`#sub-switch-${String(i+1)} .skill-effect`).text(`${skill_array[String(i+1)]["effectivevalue"]} %`);
    $(`#sub-switch-${String(i+1)} .skill-total`).text(sum_value[i].toLocaleString());
    if (pageid === 'clubcup') {
      $(`#sub-switch-${String(i+1)} .clubcup-skilleffect`).text(`${(sum_value[i]/5000).toFixed(1)} %`);
      DATA_ARRAY['calc-result']['clubcup-skilleffect'] += sum_value[i]/5000;
    }
  }

  for (let i = 0 ; i < MAX_SWITCH_GIRLS ; i++) {
    if (skill_array[String(i+1)]["chance"] === 100) {
      min += sum_value[i];
    } else {
      exp_dif += Math.ceil(sum_value[i] * skill_array[String(i+1)]["chance"] / 100);
    }
  }
  let maxskillnum;
  if ((pageid === "raid-mega")) {
    maxskillnum = 0;
  } else {
    maxskillnum = 2;
  }

  sum_value.sort((a,b) => b - a);
  for (let i = 0 ; i < maxskillnum ; i++) {
    max_dif += sum_value[i];
  }
  max_dif -= min;

  return [min, exp_dif, max_dif];
}

function subcalcSkillPerformance(power_array, num, effective, range) {
  let pageid = $('body').prop('id')

  let effect_type;
  if ((pageid === 'raid-second-defence') || (pageid === 'championship-defence')) {
    effect_type = 'defence';
  } else {
    effect_type = 'attack';
  }

  let rate_array = [ BONUS_RATE_ARRAY[pageid][`${range}-scenes`]['skill'],
                     BONUS_RATE_ARRAY[pageid][`${range}-strap`]['skill'],
                     BONUS_RATE_ARRAY[pageid][`${range}-precious`]['skill'] ];

  let solo_value = 0;

  for (let j = 0 ; j < num ; j++) {
    let temp = power_array[j];

    // 声援の対象となるガールがもう存在しない場合はbreak
    if (!temp) { break; }

    let value = 0;
    for (let k = 0 ; k < 3 ; k++) {
      value += Math.ceil(Number(temp[k]) * effective / 100 * rate_array[k] / 100);
    }
    if ((pageid === "tower") && (temp[3]["towersp"] === true)) {
      let skilllv_r = 0;
      if (temp[3]["skilllv"] < 10) { skilllv_r = 10; }
      else if (temp[3]["skilllv"] > MAX_SKILL_LEVEL) { skilllv_r = MAX_SKILL_LEVEL; }
      else { skilllv_r = temp[3]["skilllv"]; }
      let bonus = BONUS_VALUE_ARRAY["towerspecial"][effect_type][temp[3]["rarity"]][String(skilllv_r)];
      value = Math.ceil(value * (1 + bonus / 100));
    } else if ((pageid === "raid-first") || (pageid === "raid-second-attack") || (pageid === "raid-second-defence")) {
      // 攻援力/守援力が0の場合は除く
      if (temp[3]["raidtypebonus"].length !== 0) {
        value = Math.ceil(value * temp[3]["raidtypebonus"][0]);
      }
    } else if (pageid === "raid-mega") {
      // 攻援力/守援力が0の場合は除く
      if (temp[3]["raidtypebonus"].length !== 0) {
        value = Math.ceil(Number(temp[0]) * effective / 100 * rate_array[0] / 100 * temp[3]["raidtypebonus"][0]);
        value += Math.ceil(Number(temp[1]) * effective / 100 * rate_array[1] / 100 * temp[3]["raidtypebonus"][1]);
        value += Math.ceil(Number(temp[2]) * effective / 100 * rate_array[2] / 100 * temp[3]["raidtypebonus"][2]);
      }
    }

    solo_value += value;
    }

  return solo_value;
}

function prepareSkillArray(range) {

  let pageid = $('body').prop('id')
  let skill_array = {};
  let inner_array = {};

  if (range === 'main') {
    inner_array = { valid : true, skilllv : String(INIT_SKILL_LEVEL), "skill-1" : "Pop", "skill-2" : "both", "skill-3" : '1',
                    "skill-4" : "attack", "skill-5" : "55", "skill-6" : "0", effectivevalue : 0, chance : 0 };
  } else if (range === 'sub') {
    inner_array = { valid : false, skilllv : String(INIT_SKILL_LEVEL), "skill-1" : "Pop", "skill-2" : "main", "skill-3" : '0',
                    "skill-4" : "attack", "skill-5" : "34", "skill-6" : "0", effectivevalue : 0, chance : 0 };
  } else {
    return {};
  }

  let num;
  let element;
  if ((range === 'main') && ((pageid === 'championship') || (pageid === "championship-defence"))) {
    num = MAX_MAIN_GIRLS_CHAMP;
    element = 'main-skill';
  } else if ((range === 'main') && (pageid === 'divrace')) {
    num = MAX_MAIN_GIRLS_DIVRACE;
    element = 'main-skill';
  } else if (range === 'main') {
    num = MAX_MAIN_GIRLS;
    element = 'main-skill';
  } else if (range === 'sub') {
    num = MAX_SWITCH_GIRLS;
    element = 'sub-switch';
  }

  // 初期化
  for (let i = 0 ; i < num ; i++ ) {
    skill_array[String(i+1)] = {};

    for(let p in inner_array) {
      skill_array[String(i+1)][p] = inner_array[p];
    }

    if ((range === 'sub') && (i < 2)) { skill_array[String(i+1)]["valid"] = true; }
    if (range === 'main') {
      if (DATA_ARRAY['main-scenes'][String(i+1)]) {
        if (DATA_ARRAY['main-scenes'][String(i+1)]["skilllv"]) {
          skill_array[String(i+1)]["skilllv"] = DATA_ARRAY['main-scenes'][String(i+1)]["skilllv"];
        }
      }
    }
  }

  // データ移植
  let outerkeys = Object.keys(DATA_ARRAY[element]);
  for (let i = 0 ; i < outerkeys.length ; i++ ) {
    let innerkeys = Object.keys(DATA_ARRAY[element][outerkeys[i]]);
    for (let j = 0 ; j < innerkeys.length ; j++ ) {
      skill_array[outerkeys[i]][innerkeys[j]] = DATA_ARRAY[element][outerkeys[i]][innerkeys[j]];
    }
  }

  // 効果値算出
  for (let i = 0 ; i < num ; i++) {
    let value = 0;

    if (skill_array[String(i+1)]["valid"] === false) {
      value = 0;
    } else if (Number(skill_array[String(i+1)]["skilllv"]) < 1) {
      value = 0;
    } else if (Number(skill_array[String(i+1)]["skill-3"]) < 0) {
      value = 0;
    } else if ((skill_array[String(i+1)]["skill-4"] === "defence") && ((pageid !== "raid-second-defence") && (pageid !== "championship-defence"))) {
      value = 0;
    } else if ((skill_array[String(i+1)]["skill-4"] === "attack") && ((pageid === "raid-second-defence") || (pageid === "championship-defence"))) {
      value = 0;
    } else {
      let data_index = ['0','0','0','0','0'];

      //0 ... 単ﾀｲﾌﾟ(0) or 全ﾀｲﾌﾟ(1)
      if (skill_array[String(i+1)]["skill-1"] !== "All") { data_index[0] = 0; }
      if (skill_array[String(i+1)]["skill-1"] === "All") { data_index[0] = 1; }
      else { data_index[0] = 0; }

      //1 ... 主+副(0) or 主(1) or 副(2)
      if (skill_array[String(i+1)]["skill-2"] === "both") { data_index[1] = 0; }
      else if (skill_array[String(i+1)]["skill-2"] === "main") { data_index[1] = 1; }
      else if (skill_array[String(i+1)]["skill-2"] === "sub") { data_index[1] = 2; }
      else { data_index[1] = 0; }

      //2 ... 0(0) or 1(1) or 2以上(2)
      if (Number(skill_array[String(i+1)]["skill-3"]) === 0) { data_index[2] = 0; }
      else if (Number(skill_array[String(i+1)]["skill-3"]) === 1) { data_index[2] = 1; }
      else if (Number(skill_array[String(i+1)]["skill-3"]) > 1) { data_index[2] = 2; }
      else { data_index[2] = 0; }

      //3 ... 攻(0) or 守(1) or 攻守(2)
      if (skill_array[String(i+1)]["skill-4"] === "attack") { data_index[3] = 0; }
      else if (skill_array[String(i+1)]["skill-4"] === "defence") { data_index[3] = 1; }
      else if (skill_array[String(i+1)]["skill-4"] === "both") { data_index[3] = 2; }
      else { data_index[3] = 0; }

      //4 ... 中UP(0) / 中+UP(1) / 大UP(2) / 特大UP(3) / 特大+UP(4) /
      //      ｽｰﾊﾟｰ特大UP(5) / ｽｰﾊﾟｰ特大+UP(6) / ｽｰﾊﾟｰ特大++UP(7) / 超ｽｰﾊﾟｰ特大UP(8)
      //      中++UP(9) / 特大++UP(10)
      if (skill_array[String(i+1)]["skill-5"] === "24") { data_index[4] = 0; }
      else if (skill_array[String(i+1)]["skill-5"] === "25") { data_index[4] = 1; }
      else if (skill_array[String(i+1)]["skill-5"] === "29") { data_index[4] = 2; }
      else if (skill_array[String(i+1)]["skill-5"] === "34") { data_index[4] = 3; }
      else if (skill_array[String(i+1)]["skill-5"] === "36") { data_index[4] = 4; }
      else if (skill_array[String(i+1)]["skill-5"] === "42") { data_index[4] = 5; }
      else if (skill_array[String(i+1)]["skill-5"] === "44") { data_index[4] = 6; }
      else if (skill_array[String(i+1)]["skill-5"] === "49") { data_index[4] = 7; }
      else if (skill_array[String(i+1)]["skill-5"] === "55") { data_index[4] = 8; }
      else if (skill_array[String(i+1)]["skill-5"] === "27") { data_index[4] = 9; }
      else if (skill_array[String(i+1)]["skill-5"] === "38") { data_index[4] = 10; }
      else { data_index[4] = 0; }

      value = SKILL_MATRIX[data_index[0]][data_index[1]][data_index[2]][data_index[3]][data_index[4]];

      if (value !== 0) {
        // 声援Lv補正
        value = value - 15 + Number(skill_array[String(i+1)]["skilllv"]);
        // 声援変更補正;
        value = value + Number(skill_array[String(i+1)]["skill-6"]);
      }
    }
    skill_array[String(i+1)]["effectivevalue"] = value;
  }

  // 発動率算出
  let chance_table;
  if (range === 'main') {
    if ((pageid === "raid-first") || (pageid === "raid-mega") || (pageid === "championship") || (pageid === "championship-defence")) {
      chance_table = SKILL_CHANCE_MAINLIMIT_5;
    } else if (pageid === 'clubcup') {
      chance_table = SKILL_CHANCE_MAINLIMIT_5_ALWAYS;
    } else if ((pageid === "raid-second-attack") || (pageid === "raid-second-defence")) {
      chance_table = SKILL_CHANCE_MAINLIMIT_3_ALWAYS;
    } else { // "raidwar" || "tower" || "divrace" || "board" || "normal-battle"
      chance_table = SKILL_CHANCE_MAINLIMIT_3;
    }
  } else if (range === 'sub') {
    if ((pageid === 'raid-second-attack') || (pageid === 'raid-second-defence') || (pageid === 'clubcup')) {
      chance_table = SKILL_CHANCE_SWITCHLIMIT_2_ALWAYS;
    } else if (pageid === 'raid-mega') {
      chance_table = SKILL_CHANCE_SWITCHLIMIT_0;
    } else {
      chance_table = SKILL_CHANCE_SWITCHLIMIT_2;
    }
  }

  for (let i = 0 ; i < num ; i++) {
    skill_array[String(i+1)]["chance"] = Number(chance_table[i]);
  }

  return skill_array;
}

function calcPreciousValue(array, position, precious) {
  let value = [];
  let top, bottom = 1;
  let pageid = $('body').prop('id');

  for (let i = 0; i < MAX_PRECIOUS_SCENES; i++) {
    value.push(0);
    if (array.apower < 1) { continue; }

    let scenedata = PRECIOS_SCENES[precious[String(i+1)].name];
    let condition, threshold, range, type, effect, format, max, factor;
    let star = `${precious[String(i+1)].star}`;

    condition = scenedata['condition'];
    threshold = scenedata['threshold'];
    range = scenedata['range'];
    type = scenedata['type'];
    effect = scenedata['effect'];
    format = scenedata['format'];
    max = scenedata[`star${star}max`];
    factor = scenedata['factor'];

    if ((star === '6') && (scenedata['star6'] === undefined)) {
      max = scenedata[`star5max`];
    } else if (star === '6') {
      if (scenedata['star6']['threshold'] !== undefined) {
        threshold = scenedata['star6']['threshold'];
      }
      if (scenedata['star6']['effect'] !== undefined) {
        effect = scenedata['star6']['effect'];
      }
      if (scenedata['star6']['max'] !== undefined) {
        max = scenedata['star6']['max'];
      }
      if (scenedata['star6']['factor'] !== undefined) {
        factor = scenedata['star6']['factor'];
      }
      if (scenedata['star6']['eventlist'] !== undefined) {
        // 指定イベント以外では効果値を 0 で上書きする
        if (!scenedata['star6']['eventlist'].includes(pageid)) {
          max = 0;
        }
      }
    }

    if (precious[String(i+1)].valid === false) {
      continue;
    } else if ((type !== array.type) && (type !== "All")) {
      continue;
    } else if ((range !== position) && (range !== "both")) {
      continue;
    }

    if (((pageid === 'raid-second-defence') || (pageid === "championship-defence")) && (effect === "attack")) {
      continue;
    } else if (((pageid === 'raid-first') || (pageid === 'raid-second-attack') || (pageid === 'raid-mega') ||
                (pageid === 'raidwar') || (pageid === 'clubcup') || (pageid === 'championship') ||
                (pageid === 'tower') || (pageid === 'divrace') || (pageid === 'board') || (pageid === 'normal-battle'))
              && (effect === "defence")) {
      continue;
    }

    if (condition === "highercost") {
      top    = array.cost;
      bottom = threshold;
    } else if (condition === "higherrarity") {
      top    = RARITY_TO_NUM_ARRAY[array.rarity];
      bottom = threshold;
    } else if (condition === "higherskilllv") {
      top    = array.skilllv;
      bottom = threshold;
    } else if (condition === "fewergirls") {
      top    = threshold;
      bottom = Number(precious[String(i+1)]['count']);
    } else if (condition === "moregirls") {
      top    = Number(precious[String(i+1)]['count']) === 0 ? threshold : Number(precious[String(i+1)]['count']);
      bottom = threshold;
    } else if (condition === "morelimitbreak") {
      top    = Number(precious[String(i+1)]['count']) === 0 ? threshold : Number(precious[String(i+1)]['count']);
      bottom = threshold;
    } else if (condition === "absolute") {
      top    = 1;
      bottom = 1;
    } else {
      continue;
    }

    if (format === "percent") {
      if ((bottom === '') || (bottom < 1)) {
        value[i] += Math.ceil(array.apower * max / 100);
        value[i] += Math.ceil(array.strap * max / 100);
      } else if (top > bottom) {
        value[i] += Math.ceil(array.apower * max / 100);
        value[i] += Math.ceil(array.strap * max / 100);
      } else {
        value[i] += Math.ceil(array.apower * (top / bottom) ** factor * max / 100);
        value[i] += Math.ceil(array.strap * (top / bottom) ** factor * max / 100);
      }
    } else if (format === "fix") {
      if ((bottom === '') || (bottom < 1)) {
        value[i] += Math.ceil(max);
      } else if (top > bottom) {
        value[i] += Math.ceil(max);
      } else {
        value[i] += Math.ceil((top / bottom) ** factor * max);
      }
    }
  }

  return value;
}

function addTweetButton(text, url) {
  $('#tweet-area').empty();
  twttr.widgets.createShareButton(
    url,
    document.getElementById("tweet-area"),
    {
      text: text
    }
  );
}

function calcDivraceSpecialItemEffects(data_set) {
  let result = [];
  let array_for_sort = [];

  for (const index in DIVRACE_ITEM_LIST) {
    result[index] = {
      "effect-base-detail-per-girl-main" : Array(MAX_MAIN_GIRLS_DIVRACE).fill(0),
      "effect-base-detail-per-girl-sub" : Array(MAX_SUB_GIRLS_DIVRACE).fill(0),
      "effect-challenge-detail-per-girl-main" : Array(MAX_MAIN_GIRLS_DIVRACE).fill(0),
      "effect-challenge-detail-per-girl-sub" : Array(MAX_SUB_GIRLS_DIVRACE).fill(0),
    };

    if (DIVRACE_ITEM_LIST[index]["effect"] === "petit-girl") {
      const temp_min_base = Math.ceil(data_set["petit-girl"] * DIVRACE_ITEM_LIST[index]["value"] / 100);
      const temp_min_challenge = Math.ceil(data_set["petit-girl"] * DIVRACE_ITEM_LIST[index]["value"] * 1.1 / 100);

      result[index]["effect-base-min"] = temp_min_base;
      result[index]["effect-base-exp"] = temp_min_base;
      result[index]["effect-base-max"] = temp_min_base;
      result[index]["effect-challenge-min"] = temp_min_challenge;
      result[index]["effect-challenge-exp"] = temp_min_challenge;
      result[index]["effect-challenge-max"] = temp_min_challenge;

      array_for_sort.push(temp_min_challenge);

    } else if (DIVRACE_ITEM_LIST[index]["effect"] === "limitbreak") {

      let temp_min_base = 0;
      let temp_exp_base = 0;
      let temp_max_base = 0;
      let temp_min_challenge = 0;
      let temp_exp_challenge = 0;
      let temp_max_challenge = 0;

      // 主
      for (let j = 0 ; j < MAX_MAIN_GIRLS_DIVRACE ; j++) {
        const [min_before, exp_dif_before, max_dif_before] =
    calcMainGirlsPerformancePerGirl(j, data_set["precious_array"], data_set["petit_effects_array"], data_set["deckbonus_array"], data_set["playerdata_array"]);

        //ゲーム動作に合わせて "効果が26倍 (2500％UP)" に設定
        temp_exp_base += Math.ceil(exp_dif_before * (DIVRACE_ITEM_LIST[index]["value"]) / 100);
        temp_max_base += Math.ceil(max_dif_before * (DIVRACE_ITEM_LIST[index]["value"]) / 100);
        temp_exp_challenge += Math.ceil((exp_dif_before * (DIVRACE_ITEM_LIST[index]["value"]) / 100) * 1.1);
        temp_max_challenge += Math.ceil((max_dif_before * (DIVRACE_ITEM_LIST[index]["value"]) / 100) * 1.1);

        result[index]["effect-base-detail-per-girl-main"][j] = Math.ceil(exp_dif_before * (DIVRACE_ITEM_LIST[index]["value"]) / 100);
        result[index]["effect-challenge-detail-per-girl-main"][j] = Math.ceil((exp_dif_before * (DIVRACE_ITEM_LIST[index]["value"]) / 100) * 1.1);
      }

      // 副
      for (let j = 0 ; j < MAX_SUB_GIRLS_DIVRACE ; j++) {
        const [min_before, exp_dif_before, max_dif_before] =
    calcSubGirlsPerformancePerGirl(j, data_set["precious_array"], data_set["petit_effects_array"], data_set["deckbonus_array"], data_set["playerdata_array"]);

        //ゲーム動作に合わせて "効果が26倍 (2500％UP)" に設定
        temp_exp_base += Math.ceil(exp_dif_before * (DIVRACE_ITEM_LIST[index]["value"]) / 100);
        temp_max_base += Math.ceil(max_dif_before * (DIVRACE_ITEM_LIST[index]["value"]) / 100);
        temp_exp_challenge += Math.ceil((exp_dif_before * (DIVRACE_ITEM_LIST[index]["value"]) / 100) * 1.1);
        temp_max_challenge += Math.ceil((max_dif_before * (DIVRACE_ITEM_LIST[index]["value"]) / 100) * 1.1);

        result[index]["effect-base-detail-per-girl-sub"][j] = Math.ceil(exp_dif_before * (DIVRACE_ITEM_LIST[index]["value"]) / 100);
        result[index]["effect-challenge-detail-per-girl-sub"][j] = Math.ceil((exp_dif_before * (DIVRACE_ITEM_LIST[index]["value"]) / 100) * 1.1);
      }

      result[index]["effect-base-min"] = temp_min_base;
      result[index]["effect-base-exp"] = temp_exp_base;
      result[index]["effect-base-max"] = temp_max_base;
      result[index]["effect-challenge-min"] = temp_min_challenge;
      result[index]["effect-challenge-exp"] = temp_exp_challenge;
      result[index]["effect-challenge-max"] = temp_max_challenge;

      array_for_sort.push(temp_exp_challenge);

    } else if (DIVRACE_ITEM_LIST[index]["effect"] === "skill-effect") {
      const temp_min_base = Math.ceil(data_set["skill-effect"]["min"] * DIVRACE_ITEM_LIST[index]["value"] / 100);
      const temp_exp_base = temp_min_base + Math.ceil(data_set["skill-effect"]["exp"] * DIVRACE_ITEM_LIST[index]["value"] / 100);
      const temp_max_base = temp_min_base + Math.ceil(data_set["skill-effect"]["max"] * DIVRACE_ITEM_LIST[index]["value"] / 100);
      const temp_min_challenge = Math.ceil(data_set["skill-effect"]["min"] * DIVRACE_ITEM_LIST[index]["value"] * 1.1 / 100);
      const temp_exp_challenge = temp_min_challenge + Math.ceil(data_set["skill-effect"]["exp"] * DIVRACE_ITEM_LIST[index]["value"] * 1.1 / 100);
      const temp_max_challenge = temp_min_challenge + Math.ceil(data_set["skill-effect"]["max"] * DIVRACE_ITEM_LIST[index]["value"] * 1.1 / 100);

      result[index]["effect-base-min"] = temp_min_base;
      result[index]["effect-base-exp"] = temp_exp_base;
      result[index]["effect-base-max"] = temp_max_base;
      result[index]["effect-challenge-min"] = temp_min_challenge;
      result[index]["effect-challenge-exp"] = temp_exp_challenge;
      result[index]["effect-challenge-max"] = temp_max_challenge;

      array_for_sort.push(temp_exp_challenge);

    } else if (DIVRACE_ITEM_LIST[index]["effect"] === "deckbonus") {
      const bonus_value = DIVRACE_ITEM_LIST[index]["value"] / 100;

      let mod_deckbonus_array = Object.assign({}, JSON.parse(JSON.stringify(data_set["deckbonus_array"])));
      mod_deckbonus_array["attack"] *= 1 + bonus_value;
      mod_deckbonus_array["defence"] *= 1 + bonus_value;
      mod_deckbonus_array["both"] *= 1 + bonus_value;

      let temp_min_base = 0;
      let temp_exp_base = 0;
      let temp_max_base = 0;
      let temp_min_challenge = 0;
      let temp_exp_challenge = 0;
      let temp_max_challenge = 0;

      // 主
      for (let j = 0 ; j < MAX_MAIN_GIRLS_DIVRACE ; j++) {
        const [min_before, exp_dif_before, max_dif_before] =
    calcMainGirlsPerformancePerGirl(j, data_set["precious_array"], data_set["petit_effects_array"], data_set["deckbonus_array"], data_set["playerdata_array"]);
        const [min_after, exp_dif_after, max_dif_after] =
    calcMainGirlsPerformancePerGirl(j, data_set["precious_array"], data_set["petit_effects_array"], mod_deckbonus_array, data_set["playerdata_array"]);

        temp_min_base += Math.ceil(min_after - min_before);
        temp_exp_base += Math.ceil((min_after + exp_dif_after) - (min_before + exp_dif_before));
        temp_max_base += Math.ceil((min_after + max_dif_after) - (min_before + max_dif_before));

        temp_min_challenge += Math.ceil((min_after - min_before) * 1.1);
        temp_exp_challenge += Math.ceil(((min_after + exp_dif_after) - (min_before + exp_dif_before)) * 1.1);
        temp_max_challenge += Math.ceil(((min_after + max_dif_after) - (min_before + max_dif_before)) * 1.1);

        result[index]["effect-base-detail-per-girl-main"][j] = Math.ceil((min_after + exp_dif_after) - (min_before + exp_dif_before));
        result[index]["effect-challenge-detail-per-girl-main"][j] = Math.ceil(((min_after + exp_dif_after) - (min_before + exp_dif_before)) * 1.1);
      }

      // 副
      for (let j = 0 ; j < MAX_SUB_GIRLS_DIVRACE ; j++) {
        const [min_before, exp_dif_before, max_dif_before] =
    calcSubGirlsPerformancePerGirl(j, data_set["precious_array"], data_set["petit_effects_array"], data_set["deckbonus_array"], data_set["playerdata_array"]);
        const [min_after, exp_dif_after, max_dif_after] =
    calcSubGirlsPerformancePerGirl(j, data_set["precious_array"], data_set["petit_effects_array"], mod_deckbonus_array, data_set["playerdata_array"]);

        temp_min_base += Math.ceil(min_after - min_before);
        temp_exp_base += Math.ceil((min_after + exp_dif_after) - (min_before + exp_dif_before));
        temp_max_base += Math.ceil((min_after + max_dif_after) - (min_before + max_dif_before));

        temp_min_challenge += Math.ceil((min_after - min_before) * 1.1);
        temp_exp_challenge += Math.ceil(((min_after + exp_dif_after) - (min_before + exp_dif_before)) * 1.1);
        temp_max_challenge += Math.ceil(((min_after + max_dif_after) - (min_before + max_dif_before)) * 1.1);

        result[index]["effect-base-detail-per-girl-sub"][j] = Math.ceil((min_after + exp_dif_after) - (min_before + exp_dif_before));
        result[index]["effect-challenge-detail-per-girl-sub"][j] = Math.ceil(((min_after + exp_dif_after) - (min_before + exp_dif_before)) * 1.1);
      }

      result[index]["effect-base-min"] = temp_min_base;
      result[index]["effect-base-exp"] = temp_exp_base;
      result[index]["effect-base-max"] = temp_max_base;
      result[index]["effect-challenge-min"] = temp_min_challenge;
      result[index]["effect-challenge-exp"] = temp_exp_challenge;
      result[index]["effect-challenge-max"] = temp_max_challenge;

      array_for_sort.push(temp_exp_challenge);

    } else if (DIVRACE_ITEM_LIST[index]["effect"] === "petit-effect") {
      const bonus_value = DIVRACE_ITEM_LIST[index]["value"] / 100;

      let mod_petit_effects_array = Object.assign({}, JSON.parse(JSON.stringify(data_set["petit_effects_array"])));
      mod_petit_effects_array["type"]["All"]["attack"] *= 1 + bonus_value;
      mod_petit_effects_array["type"]["All"]["defence"] *= 1 + bonus_value;
      mod_petit_effects_array["type"]["All"]["both"] *= 1 + bonus_value;
      mod_petit_effects_array["type"]["Pop"]["attack"] *= 1 + bonus_value;
      mod_petit_effects_array["type"]["Pop"]["defence"] *= 1 + bonus_value;
      mod_petit_effects_array["type"]["Pop"]["both"] *= 1 + bonus_value;
      mod_petit_effects_array["type"]["Sweet"]["attack"] *= 1 + bonus_value;
      mod_petit_effects_array["type"]["Sweet"]["defence"] *= 1 + bonus_value;
      mod_petit_effects_array["type"]["Sweet"]["both"] *= 1 + bonus_value;
      mod_petit_effects_array["type"]["Cool"]["attack"] *= 1 + bonus_value;
      mod_petit_effects_array["type"]["Cool"]["defence"] *= 1 + bonus_value;
      mod_petit_effects_array["type"]["Cool"]["both"] *= 1 + bonus_value;
      mod_petit_effects_array["best"]["All"]["both"] *= 1 + bonus_value;
      mod_petit_effects_array["date"]["All"]["both"] *= 1 + bonus_value;
      mod_petit_effects_array["touch"]["All"]["both"] *= 1 + bonus_value;
      mod_petit_effects_array["birth"]["All"]["both"] *= 1 + bonus_value;
      mod_petit_effects_array["clubitem"]["Pop"]["both"] *= 1 + bonus_value;
      mod_petit_effects_array["clubitem"]["Sweet"]["both"] *= 1 + bonus_value;
      mod_petit_effects_array["clubitem"]["Cool"]["both"] *= 1 + bonus_value;

      let temp_min_base = 0;
      let temp_exp_base = 0;
      let temp_max_base = 0;
      let temp_min_challenge = 0;
      let temp_exp_challenge = 0;
      let temp_max_challenge = 0;

      // 主
      for (let j = 0 ; j < MAX_MAIN_GIRLS_DIVRACE ; j++) {
        const [min_before, exp_dif_before, max_dif_before] =
    calcMainGirlsPerformancePerGirl(j, data_set["precious_array"], data_set["petit_effects_array"], data_set["deckbonus_array"], data_set["playerdata_array"]);
        const [min_after, exp_dif_after, max_dif_after] =
    calcMainGirlsPerformancePerGirl(j, data_set["precious_array"], mod_petit_effects_array, data_set["deckbonus_array"], data_set["playerdata_array"]);

        temp_min_base += Math.ceil(min_after - min_before);
        temp_exp_base += Math.ceil((min_after + exp_dif_after) - (min_before + exp_dif_before));
        temp_max_base += Math.ceil((min_after + max_dif_after) - (min_before + max_dif_before));

        temp_min_challenge += Math.ceil((min_after - min_before) * 1.1);
        temp_exp_challenge += Math.ceil(((min_after + exp_dif_after) - (min_before + exp_dif_before)) * 1.1);
        temp_max_challenge += Math.ceil(((min_after + max_dif_after) - (min_before + max_dif_before)) * 1.1);

        result[index]["effect-base-detail-per-girl-main"][j] = Math.ceil((min_after + exp_dif_after) - (min_before + exp_dif_before));
        result[index]["effect-challenge-detail-per-girl-main"][j] = Math.ceil(((min_after + exp_dif_after) - (min_before + exp_dif_before)) * 1.1);
      }

      // 副
      for (let j = 0 ; j < MAX_SUB_GIRLS_DIVRACE ; j++) {
        const [min_before, exp_dif_before, max_dif_before] =
    calcSubGirlsPerformancePerGirl(j, data_set["precious_array"], data_set["petit_effects_array"], data_set["deckbonus_array"], data_set["playerdata_array"]);
        const [min_after, exp_dif_after, max_dif_after] =
    calcSubGirlsPerformancePerGirl(j, data_set["precious_array"], mod_petit_effects_array, data_set["deckbonus_array"], data_set["playerdata_array"]);

        temp_min_base += Math.ceil(min_after - min_before);
        temp_exp_base += Math.ceil((min_after + exp_dif_after) - (min_before + exp_dif_before));
        temp_max_base += Math.ceil((min_after + max_dif_after) - (min_before + max_dif_before));

        temp_min_challenge += Math.ceil((min_after - min_before) * 1.1);
        temp_exp_challenge += Math.ceil(((min_after + exp_dif_after) - (min_before + exp_dif_before)) * 1.1);
        temp_max_challenge += Math.ceil(((min_after + max_dif_after) - (min_before + max_dif_before)) * 1.1);

        result[index]["effect-base-detail-per-girl-sub"][j] = Math.ceil((min_after + exp_dif_after) - (min_before + exp_dif_before));
        result[index]["effect-challenge-detail-per-girl-sub"][j] = Math.ceil(((min_after + exp_dif_after) - (min_before + exp_dif_before)) * 1.1);
      }

      result[index]["effect-base-min"] = temp_min_base;
      result[index]["effect-base-exp"] = temp_exp_base;
      result[index]["effect-base-max"] = temp_max_base;
      result[index]["effect-challenge-min"] = temp_min_challenge;
      result[index]["effect-challenge-exp"] = temp_exp_challenge;
      result[index]["effect-challenge-max"] = temp_max_challenge;

      array_for_sort.push(temp_exp_challenge);

    } else if (DIVRACE_ITEM_LIST[index]["effect"] === "girl") {
      const bonus_value = DIVRACE_ITEM_LIST[index]["value"] / 100;

      let conditions = {};
      conditions["pre-select"] = (DIVRACE_ITEM_LIST[index]["condition"]["pre-select"]) ? DIVRACE_ITEM_LIST[index]["condition"]["pre-select"] : false;
      conditions["higherrarity"] = (DIVRACE_ITEM_LIST[index]["condition"]["higherrarity"]) ? DIVRACE_ITEM_LIST[index]["condition"]["higherrarity"] : 1;
      conditions["type"] = (DIVRACE_ITEM_LIST[index]["condition"]["type"]) ? DIVRACE_ITEM_LIST[index]["condition"]["type"] : "All";
      conditions["highercost"] = (DIVRACE_ITEM_LIST[index]["condition"]["highercost"]) ? DIVRACE_ITEM_LIST[index]["condition"]["highercost"] : 1;
      conditions["higherskilllv"] = (DIVRACE_ITEM_LIST[index]["condition"]["higherskilllv"]) ? DIVRACE_ITEM_LIST[index]["condition"]["higherskilllv"] : 1;

      let temp_min_base = 0;
      let temp_min_challenge = 0;

      // 主
      for (let j = 0 ; j < MAX_MAIN_GIRLS_DIVRACE ; j++) {
        const effect = calcDivraceSpecialItemConditionChecker("main-scenes", j, conditions, data_set["precious_array"]) * bonus_value;
        temp_min_base += Math.ceil(effect);
        temp_min_challenge += Math.ceil(effect * 1.1);
        result[index]["effect-base-detail-per-girl-main"][j] = Math.ceil(effect);
        result[index]["effect-challenge-detail-per-girl-main"][j] = Math.ceil(effect * 1.1);
      }

      // 副
      for (let j = 0 ; j < MAX_SUB_GIRLS_DIVRACE ; j++) {
        const effect = calcDivraceSpecialItemConditionChecker("sub-scenes", j, conditions, data_set["precious_array"]) * bonus_value * 0.8;
        temp_min_base += Math.ceil(effect);
        temp_min_challenge += Math.ceil(effect * 1.1);
        result[index]["effect-base-detail-per-girl-sub"][j] = Math.ceil(effect);
        result[index]["effect-challenge-detail-per-girl-sub"][j] = Math.ceil(effect * 1.1);
      }

      result[index]["effect-base-min"] = temp_min_base;
      result[index]["effect-base-exp"] = temp_min_base;
      result[index]["effect-base-max"] = temp_min_base;
      result[index]["effect-challenge-min"] = temp_min_challenge
      result[index]["effect-challenge-exp"] = temp_min_challenge
      result[index]["effect-challenge-max"] = temp_min_challenge

      array_for_sort.push(temp_min_challenge);

    } else {
      array_for_sort.push(0);
    }

  }

  // 効果が大きい順を更新
  const sorted = array_for_sort.slice().sort((a, b) => b - a)
  for (const index in array_for_sort) {
    if (array_for_sort[index] === 0) {
      result[index]["effect-sort"] = "-";
    } else {
      result[index]["effect-sort"] = sorted.indexOf(array_for_sort[index]) + 1;
    }
  }

  return result;
}

function displayDivraceSpecialItemEffects(result_array) {

  for (const index in result_array) {
    $(`#special-item-${String(Number(index)+1)} .effect-base`).text(result_array[index]["effect-base-exp"].toLocaleString());
    $(`#special-item-${String(Number(index)+1)} .effect-challenge`).text(result_array[index]["effect-challenge-exp"].toLocaleString());
    $(`#special-item-${String(Number(index)+1)} .effect-sort`).text(result_array[index]["effect-sort"]);
  }

}

function calcDivraceSpecialItemUsed(result_array, data_array) {
  let min = 0
  let exp = 0
  let max = 0

  const outerkeys = Object.keys(data_array);

  // stage選択情報の取得
  let stage_select = "challenge";
  if ((data_array["0"]) && (data_array["0"]["stage"] === "base")) {
    stage_select = "base";
  }

  for (let i = 0 ; i < outerkeys.length ; i++ ) {

    // stage選択情報は先に取得済み
    if (outerkeys[i] === "0") {
      continue;
    }

    // 有効なアイテムの場合はリターン効果値に加算する
    if (data_array[outerkeys[i]]["valid"] === true) {
      min += result_array[String(Number(outerkeys[i])-1)][`effect-${stage_select}-min`];
      exp += result_array[String(Number(outerkeys[i])-1)][`effect-${stage_select}-exp`];
      max += result_array[String(Number(outerkeys[i])-1)][`effect-${stage_select}-max`];
    }
  }

  return [min, exp, max];
}

function calcDivraceSpecialItemConditionChecker(element, index, conditions, precious_array) {
  let pageid = $('body').prop('id');

  let temparray = { apower : 0, strap : 0, type : 'Pop', rarity : 'SSR', cost : '27', skilllv : String(INIT_SKILL_LEVEL),
                    club : false, date : false, touch : false, birth : false, limit : false, special : false };

  let innerkeys;
  if (DATA_ARRAY[element][String(index+1)]) { innerkeys = Object.keys(DATA_ARRAY[element][String(index+1)]); }
  else { innerkeys = []; }

  for (let j = 0 ; j < innerkeys.length ; j++ ) {
    temparray[innerkeys[j]] = DATA_ARRAY[element][String(index+1)][innerkeys[j]];
  }
  if (temparray.apower < 1) {
    return 0;
  }

  let precious_value = calcPreciousValue(temparray, element, precious_array);
  let precious_sum = 0;
  for (let j = 0 ; j < precious_value.length ; j++ ) {
    precious_sum += precious_value[j];
  }
  let solo_min = Number(temparray.apower) + Number(temparray.strap) + precious_sum;

  if ((conditions["pre-select"] === true) && temparray["special"] === false) {
    return 0;
  }
  if (RARITY_TO_NUM_ARRAY[temparray.rarity] < conditions["higherrarity"]) {
    return 0;
  }
  if ((conditions["type"] !== "All") && (conditions["type"] !== temparray["type"])) {
    return 0;
  }
  if (temparray["cost"] < conditions["highercost"]) {
    return 0;
  }
  if (temparray["skilllv"] < conditions["higherskilllv"]) {
    return 0;
  }

  return solo_min;
}

function calcDivraceSpecialItemUsedPerGirl(result_array, data_array) {

  let difMainArray = Array(MAX_MAIN_GIRLS_DIVRACE).fill(0);
  let difSubArray = Array(MAX_SUB_GIRLS_DIVRACE).fill(0);

  const outerkeys = Object.keys(data_array);

  // stage選択情報の取得
  let stage_select = "challenge";
  if ((data_array["0"]) && (data_array["0"]["stage"] === "base")) {
    stage_select = "base";
  }

  for (let i = 0 ; i < outerkeys.length ; i++ ) {

    // stage選択情報は先に取得済み
    if (outerkeys[i] === "0") {
      continue;
    }

    // 有効なアイテムの場合は各ガールごとの期待値を合算していく
    if (data_array[outerkeys[i]]["valid"] === true) {
      for (let j = 0; j < MAX_MAIN_GIRLS_DIVRACE; j++) {
        difMainArray[j] += result_array[String(Number(outerkeys[i])-1)][`effect-${stage_select}-detail-per-girl-main`][j];
      }
      for (let j = 0; j < MAX_SUB_GIRLS_DIVRACE; j++) {
        difSubArray[j] += result_array[String(Number(outerkeys[i])-1)][`effect-${stage_select}-detail-per-girl-sub`][j];
      }
    }
  }

  return [difMainArray, difSubArray];
}

function displayDivraceSpecialItemEffectsPerGirl(difMainArray, difSubArray) {
  let resultArrayMain = Array(MAX_MAIN_GIRLS_DIVRACE).fill(0);
  let resultArraySub = Array(MAX_SUB_GIRLS_DIVRACE).fill(0);

  // メイン、サブそれぞれの風向き加算前の数値を取得
  // 選択した風向きアイテムの効果値と合わせてArrayに加算
  for (let i = 0 ; i < MAX_MAIN_GIRLS_DIVRACE ; i++ ) {
    resultArrayMain[i] += Number($(`#main-scenes-${String(i+1)} .result-1`).text().replace(',', '')) + difMainArray[i];
  }
  for (let i = 0 ; i < MAX_SUB_GIRLS_DIVRACE ; i++ ) {
    resultArraySub[i] += Number($(`#sub-scenes-${String(i+1)} .result-1`).text().replace(',', '')) + difSubArray[i];
  }

  // 風向き加算後欄の数字表示を更新
  for (let i = 0 ; i < MAX_MAIN_GIRLS_DIVRACE ; i++ ) {
    $(`#main-scenes-${String(i+1)} .result-event-sp-1`).text(resultArrayMain[i].toLocaleString());
  }
  for (let i = 0 ; i < MAX_SUB_GIRLS_DIVRACE ; i++ ) {
    $(`#sub-scenes-${String(i+1)} .result-event-sp-1`).text(resultArraySub[i].toLocaleString());
  }

  // 風向き加算後欄の小さい順を更新
  displayMainGirlsRaking(resultArrayMain, true);
  displaySubGirlsRaking(resultArraySub, true);
}

function calcMainGirlsPerformancePerGirl(index, precious_array, petit_effects_array, deckbonus_array, playerdata_array) {
  let innerkeys, innervalue;
  let min = 0, exp_dif = 0, max_dif = 0, value = 0;
  let pageid = $('body').prop('id')

  let effect_type;
  if ((pageid === 'raid-second-defence') || (pageid === 'championship-defence')) {
    effect_type = 'defence';
  } else {
    effect_type = 'attack';
  }

  let element = 'main-scenes';
  let bonusratearray_scenes = BONUS_RATE_ARRAY[pageid]['main-scenes'];
  let bonusratearray_strap = BONUS_RATE_ARRAY[pageid]['main-strap'];
  let bonusratearray_precious = BONUS_RATE_ARRAY[pageid]['main-precious'];

  // DATA_ARRAYから対象のガールのデータを読み出してtemparrayに設定
  let temparray = { apower : 0, strap : 0, type : 'Pop', rarity : 'SSR',
                    cost : '27', skilllv : String(INIT_SKILL_LEVEL), grade : '1', club : false,
                    date : false, touch : false, birth : false, limit : false,
                    best : false, special : false };
  if (DATA_ARRAY[element][String(index+1)]) { innerkeys = Object.keys(DATA_ARRAY[element][String(index+1)]); }
  else { innerkeys = []; }
  for (let j = 0 ; j < innerkeys.length ; j++ ) {
    innervalue = DATA_ARRAY[element][String(index+1)][innerkeys[j]];
    temparray[innerkeys[j]] = innervalue;
  }

  // 未設定ならskip
  if (temparray.apower < 1) {
    return [0, 0, 0];
  }

  // プレシャスシーン効果の合計値を算出
  let precious_value = calcPreciousValue(temparray, "main", precious_array);
  let precious_sum = 0;
  for (let j = 0 ; j < precious_value.length ; j++ ) {
    precious_sum += precious_value[j];
  }

  // レイドメガの計算式に対応するための補正値を算出
  let mega_multiplier_scenes = 1;
  let maga_multiplier_strap = 1;
  let maga_multiplier_precious = 1;
  let attack_buff_multiplier = 1;
  if (pageid === 'raid-mega') {
    if (Number(playerdata_array.megabuff) > 100) {
      attack_buff_multiplier = 2;
    } else if (Number(playerdata_array.megabuff) < -100) {
      attack_buff_multiplier = 0;
    } else {
      attack_buff_multiplier = 1 + (Number(playerdata_array.megabuff) / 100);
    }
    mega_multiplier_scenes = (1 + (BONUS_VALUE_ARRAY.raidspecial.mega[effect_type][playerdata_array['raidtype']][temparray.type]['scenes'] / 100)) * attack_buff_multiplier;
    maga_multiplier_strap = (1 + (BONUS_VALUE_ARRAY.raidspecial.mega[effect_type][playerdata_array['raidtype']][temparray.type]['strap'] / 100)) * attack_buff_multiplier;
    maga_multiplier_precious = 1 + (BONUS_VALUE_ARRAY.raidspecial.mega[effect_type][playerdata_array['raidtype']][temparray.type]['precious'] / 100);
  }

  // 基礎値
  min += Math.ceil(Number(temparray.apower) * bonusratearray_scenes.base / 100 * mega_multiplier_scenes);
  min += Math.ceil(Number(temparray.strap) * bonusratearray_strap.base / 100 * maga_multiplier_strap);
  min += Math.ceil(Number(precious_sum) * bonusratearray_precious.base / 100);

  // タイプ一致
  if (temparray.type === playerdata_array.type) {
    value = BONUS_VALUE_ARRAY.typematch[effect_type];
    min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.typematch / 100 * mega_multiplier_scenes);
    min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.typematch / 100 * maga_multiplier_strap);
    min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.typematch / 100 * maga_multiplier_precious);
  }

  // 部活一致
  if (temparray.club) {
    value = BONUS_VALUE_ARRAY.clubmatch[effect_type];
    min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.clubmatch / 100 * mega_multiplier_scenes);
    min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.clubmatch / 100 * maga_multiplier_strap);
    min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.clubmatch / 100 * maga_multiplier_precious);
  }

  // 部活設備
  if (playerdata_array[`clubitem-${temparray['type'].toLowerCase()}`] === true) {
    value = BONUS_VALUE_ARRAY.clubitem[effect_type];
    value *= 1 + (petit_effects_array.clubitem[temparray.type].both / 100);
    min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.clubitem / 100 * mega_multiplier_scenes);
    min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.clubitem / 100 * maga_multiplier_strap);
    min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.clubitem / 100 * maga_multiplier_precious);
  }

  // 部活役職
  value = BONUS_VALUE_ARRAY.clubposition[effect_type][playerdata_array.position];
  min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.clubposition / 100 * mega_multiplier_scenes);
  min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.clubposition / 100 * maga_multiplier_strap);
  min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.clubposition / 100 * maga_multiplier_precious);

  // センバツボーナス
  value = deckbonus_array[effect_type] + deckbonus_array['both'];
  min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.deck / 100 * mega_multiplier_scenes);
  min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.deck / 100 * maga_multiplier_strap);
  min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.deck / 100 * maga_multiplier_precious);

  // デートボーナス
  if (temparray.date) {
    value = BONUS_VALUE_ARRAY.date[effect_type][temparray.rarity];
    min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.date / 100 * mega_multiplier_scenes);
    min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.date / 100 * maga_multiplier_strap);
    min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.date / 100)
  }

  // タッチボーナス
  if (temparray.touch) {
    value = BONUS_VALUE_ARRAY.touch[effect_type];
    min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.touch / 100 * mega_multiplier_scenes);
    min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.touch / 100 * maga_multiplier_strap);
    min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.touch / 100 * maga_multiplier_precious);
  }

  // 誕生日ボーナス
  if (temparray.birth) {
    value = BONUS_VALUE_ARRAY.birthday[effect_type];
    min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.birthday / 100 * mega_multiplier_scenes);
    min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.birthday / 100 * maga_multiplier_strap);
    min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.birthday / 100 * maga_multiplier_precious);
  }

  // メンズコロンボーナス
  value = playerdata_array[`menscologne-${temparray['type'].toLowerCase()}`]
  value *= 0.2;
  min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.menscologne / 100 * mega_multiplier_scenes);
  min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.menscologne / 100 * maga_multiplier_strap);
  min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.menscologne / 100 * maga_multiplier_precious);

  // ぷちガールちゃん応援力効果
  value = petit_effects_array["type"]["All"][effect_type] + petit_effects_array["type"]["All"]["both"];
  value += petit_effects_array["type"][temparray.type][effect_type] + petit_effects_array["type"][temparray.type]["both"];
  if (temparray.best) { value += petit_effects_array["best"]["All"]["both"]; }
  if (temparray.date) { value += petit_effects_array["date"]["All"]["both"]; }
  if (temparray.birth) { value += petit_effects_array["birth"]["All"]["both"]; }
  if (temparray.touch) { value += petit_effects_array["touch"]["All"]["both"]; }
  min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.petit_effects / 100 * mega_multiplier_scenes);
  min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.petit_effects / 100 * maga_multiplier_strap);
  min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.petit_effects / 100 * maga_multiplier_precious);

  // Ex進展ボーナス
  if (temparray.limit) {
    value = BONUS_VALUE_ARRAY.limitbreak[effect_type];
    exp_dif += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.limitbreak / 100 * BONUS_VALUE_ARRAY.limitbreak.probability / 100 * mega_multiplier_scenes);
    exp_dif += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.limitbreak / 100 * BONUS_VALUE_ARRAY.limitbreak.probability / 100 * maga_multiplier_strap);
    exp_dif += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.limitbreak / 100 * BONUS_VALUE_ARRAY.limitbreak.probability / 100 * maga_multiplier_precious);
    max_dif += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.limitbreak / 100 * mega_multiplier_scenes);
    max_dif += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.limitbreak / 100 * maga_multiplier_strap);
    max_dif += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.limitbreak / 100 * maga_multiplier_precious);
  }

  // 各イベント毎の特殊処理
  let raidtypebonus = [];
  if ((pageid === "tower") && (temparray.special)) {
    let skilllv_r = 0;
    if (temparray.skilllv < 10) { skilllv_r = 10; }
    else if (temparray.skilllv > MAX_SKILL_LEVEL) { skilllv_r = MAX_SKILL_LEVEL; }
    else { skilllv_r = temparray.skilllv; }
    value = BONUS_VALUE_ARRAY.towerspecial[effect_type][temparray.rarity][String(skilllv_r)];
    min = Math.ceil(min * (1 + value / 100));
    exp_dif = Math.ceil(exp_dif * (1 + value / 100));
    max_dif = Math.ceil(max_dif * (1 + value / 100));
  } else if ((pageid === "raid-first") || (pageid === "raid-second-attack") || (pageid === "raid-second-defence")) {
    raidtypebonus[0] = 1 + (BONUS_VALUE_ARRAY.raidspecial.superrare[effect_type][playerdata_array['raidtype']][temparray.type] / 100);
    min = Math.ceil(min * raidtypebonus[0]);
    exp_dif = Math.ceil(exp_dif * raidtypebonus[0]);
    max_dif = Math.ceil(max_dif * raidtypebonus[0]);
  } else if (pageid === "raid-mega") {
    raidtypebonus[0] = (1 + (BONUS_VALUE_ARRAY.raidspecial.mega[effect_type][playerdata_array['raidtype']][temparray.type]['scenes'] / 100)) * attack_buff_multiplier;
    raidtypebonus[1] = (1 + (BONUS_VALUE_ARRAY.raidspecial.mega[effect_type][playerdata_array['raidtype']][temparray.type]['strap'] / 100)) * attack_buff_multiplier;
    raidtypebonus[2] = 1 + (BONUS_VALUE_ARRAY.raidspecial.mega[effect_type][playerdata_array['raidtype']][temparray.type]['precious'] / 100);
  } else if (pageid === "clubcup") {
    let clubcupbuf = Number(playerdata_array['clubcupbuff']);
    if (clubcupbuf < 0) { clubcupbuf = 0; }
    else if (clubcupbuf > 50) { clubcupbuf = 50; }
    value = deckbonus_array[effect_type] + deckbonus_array['both'];
    min += Math.ceil(Number(temparray.apower) * bonusratearray_scenes.base / 100 * clubcupbuf / 100);
    min += Math.ceil(Number(temparray.strap) * bonusratearray_strap.base / 100 * clubcupbuf / 100);
    min += Math.ceil(Number(precious_sum) * bonusratearray_precious.base / 100 * clubcupbuf / 100);
    min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.deck / 100 * clubcupbuf / 100);
    min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.deck / 100 * clubcupbuf / 100);
    min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.deck / 100 * clubcupbuf / 100);
  }

  return [min, exp_dif, max_dif];
}

function calcSubGirlsPerformancePerGirl(index, precious_array, petit_effects_array, deckbonus_array, playerdata_array) {
  let innerkeys, innervalue;
  let min = 0, exp_dif = 0, max_dif = 0, value = 0;
  let pageid = $('body').prop('id')

  let effect_type;
  if ((pageid === 'raid-second-defence') || (pageid === 'championship-defence')) {
    effect_type = 'defence';
  } else {
    effect_type = 'attack';
  }

  let element = 'sub-scenes';
  let bonusratearray_scenes = BONUS_RATE_ARRAY[pageid]['sub-scenes'];
  let bonusratearray_strap = BONUS_RATE_ARRAY[pageid]['sub-strap'];
  let bonusratearray_precious = BONUS_RATE_ARRAY[pageid]['sub-precious'];

  // DATA_ARRAYから対象のガールのデータを読み出してtemparrayに設定
  let temparray = { apower : 0, strap : 0, type : 'Pop', rarity : 'SSR',
                    cost : '27', skilllv : String(INIT_SKILL_LEVEL), grade : '1', club : false,
                    date : false, touch : false, birth : false, limit : false,
                    best : false, special : false };
  if (DATA_ARRAY[element][String(index+1)]) { innerkeys = Object.keys(DATA_ARRAY[element][String(index+1)]); }
  else { innerkeys = []; }
  for (let j = 0 ; j < innerkeys.length ; j++ ) {
    innervalue = DATA_ARRAY[element][String(index+1)][innerkeys[j]];
    temparray[innerkeys[j]] = innervalue;
  }

  // 未設定ならskip
  if ((temparray.apower < 1) || (pageid === "raid-mega")) {
    return [0, 0, 0];
  }

  // プレシャスシーン効果の合計値を算出
  let precious_value = calcPreciousValue(temparray, "sub", precious_array);
  let precious_sum = 0;
  for (let j = 0 ; j < precious_value.length ; j++ ) {
    precious_sum += precious_value[j];
  }

  // 基礎値
  min += Math.ceil(Number(temparray.apower) * bonusratearray_scenes.base / 100);
  min += Math.ceil(Number(temparray.strap) * bonusratearray_strap.base / 100);
  min += Math.ceil(Number(precious_sum) * bonusratearray_precious.base / 100);

  // タイプ一致
  if (temparray.type === playerdata_array.type) {
    value = BONUS_VALUE_ARRAY.typematch[effect_type];
    min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.typematch / 100);
    min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.typematch / 100);
    min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.typematch / 100);
  }

  // 部活一致
  if (temparray.club) {
    value = BONUS_VALUE_ARRAY.clubmatch[effect_type];
    min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.clubmatch / 100);
    min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.clubmatch / 100);
    min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.clubmatch / 100);
  }

  // 部活設備
  if (playerdata_array[`clubitem-${temparray['type'].toLowerCase()}`] === true) {
    value = BONUS_VALUE_ARRAY.clubitem[effect_type];
    value *= 1 + (petit_effects_array.clubitem[temparray.type].both / 100);
    min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.clubitem / 100);
    min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.clubitem / 100);
    min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.clubitem / 100);
  }

  // 部活役職
  value = BONUS_VALUE_ARRAY.clubposition[effect_type][playerdata_array.position];
  min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.clubposition / 100);
  min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.clubposition / 100);
  min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.clubposition / 100);

  // センバツボーナス
  value = deckbonus_array[effect_type] + deckbonus_array['both'];
  min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.deck / 100);
  min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.deck / 100);
  min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.deck / 100);

  // デートボーナス
  if (temparray.date) {
    value = BONUS_VALUE_ARRAY.date[effect_type][temparray.rarity];
    min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.date / 100);
    min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.date / 100);
    min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.date / 100);
  }

  // タッチボーナス
  if (temparray.touch) {
    value = BONUS_VALUE_ARRAY.touch[effect_type];
    min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.touch / 100);
    min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.touch / 100);
    min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.touch / 100);
  }

  // 誕生日ボーナス
  if (temparray.birth) {
    value = BONUS_VALUE_ARRAY.birthday[effect_type];
    min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.birthday / 100);
    min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.birthday / 100);
    min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.birthday / 100);
  }

  // メンズコロンボーナス
  value = playerdata_array[`menscologne-${temparray['type'].toLowerCase()}`]
  value *= 0.2;
  min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.menscologne / 100);
  min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.menscologne / 100);
  min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.menscologne / 100);

  // ぷちガールちゃん応援力効果
  value = petit_effects_array["type"]["All"][effect_type] + petit_effects_array["type"]["All"]["both"];
  value += petit_effects_array["type"][temparray.type][effect_type] + petit_effects_array["type"][temparray.type]["both"];
  if (temparray.best) { value += petit_effects_array["best"]["All"]["both"]; }
  if (temparray.date) { value += petit_effects_array["date"]["All"]["both"]; }
  if (temparray.birth) { value += petit_effects_array["birth"]["All"]["both"]; }
  if (temparray.touch) { value += petit_effects_array["touch"]["All"]["both"]; }
  min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.petit_effects / 100);
  min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.petit_effects / 100);
  min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.petit_effects / 100);

  // Ex進展ボーナス
  if (temparray.limit) {
    value = BONUS_VALUE_ARRAY.limitbreak[effect_type];
    exp_dif += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.limitbreak / 100 * BONUS_VALUE_ARRAY.limitbreak.probability / 100);
    exp_dif += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.limitbreak / 100 * BONUS_VALUE_ARRAY.limitbreak.probability / 100);
    exp_dif += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.limitbreak / 100 * BONUS_VALUE_ARRAY.limitbreak.probability / 100);
    max_dif += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.limitbreak / 100);
    max_dif += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.limitbreak / 100);
    max_dif += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.limitbreak / 100);
  }

  // 各イベント毎の特殊処理
  let raidtypebonus = [];
  if ((pageid === "tower") && (temparray.special)) {
    let skilllv_r = 0;
    if (temparray.skilllv < 10) { skilllv_r = 10; }
    else if (temparray.skilllv > MAX_SKILL_LEVEL) { skilllv_r = MAX_SKILL_LEVEL; }
    else { skilllv_r = temparray.skilllv; }
    value = BONUS_VALUE_ARRAY.towerspecial[effect_type][temparray.rarity][String(skilllv_r)];
    min = Math.ceil(min * (1 + value / 100));
    exp_dif = Math.ceil(exp_dif * (1 + value / 100));
    max_dif = Math.ceil(max_dif * (1 + value / 100));
  } else if ((pageid === "raid-first") || (pageid === "raid-second-attack") || (pageid === "raid-second-defence")) {
    raidtypebonus[0] = 1 + (BONUS_VALUE_ARRAY.raidspecial.superrare[effect_type][playerdata_array['raidtype']][temparray.type] / 100);
    min = Math.ceil(min * raidtypebonus[0]);
    exp_dif = Math.ceil(exp_dif * raidtypebonus[0]);
    max_dif = Math.ceil(max_dif * raidtypebonus[0]);
  } else if (pageid === "clubcup") {
    let clubcupbuf = Number(playerdata_array['clubcupbuff']);
    if (clubcupbuf < 0) { clubcupbuf = 0; }
    else if (clubcupbuf > 50) { clubcupbuf = 50; }
    value = deckbonus_array[effect_type] + deckbonus_array['both'];
    min += Math.ceil(Number(temparray.apower) * bonusratearray_scenes.base / 100 * clubcupbuf / 100);
    min += Math.ceil(Number(temparray.strap) * bonusratearray_strap.base / 100 * clubcupbuf / 100);
    min += Math.ceil(Number(precious_sum) * bonusratearray_precious.base / 100 * clubcupbuf / 100);
    min += Math.ceil(Number(temparray.apower) * value / 100 * bonusratearray_scenes.deck / 100 * clubcupbuf / 100);
    min += Math.ceil(Number(temparray.strap) * value / 100 * bonusratearray_strap.deck / 100 * clubcupbuf / 100);
    min += Math.ceil(Number(precious_sum) * value / 100  * bonusratearray_precious.deck / 100 * clubcupbuf / 100);
  }

  return [min, exp_dif, max_dif];
}
