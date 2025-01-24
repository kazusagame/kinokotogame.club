'use strict';

function calcBoardSpecialEffects(data_set) {
  let result = {
    total_effect_min: 0,
    total_effect_exp: 0,
    total_effect_max: 0,
  };

  result["per_girl"] = {
    main: Array(MAX_MAIN_GIRLS).fill(0),
    sub: Array(MAX_SUB_GIRLS).fill(0),
  };

  // ガール単位効果のUP/DOWN量を積算する
  // マイナスが100%を超えた場合にのちほど調整する用
  let limitter = {
    main: Array(MAX_MAIN_GIRLS).fill(0),
    sub: Array(MAX_SUB_GIRLS).fill(0),
  };
  // ぷちセンバツ単位のUP/DOWN量を積算する
  // マイナスが100%を超えた場合にのちほど調整する用
  let petit_limitter = 0;

  // 天気効果
  result["weather"] = {
    effect_sum: Array(MAX_WEATHER_EFFECT).fill({ min: 0, exp: 0, max: 0 }),
  };
  let weatherId = 0;
  if (DATA_ARRAY["event-special"]?.["0"]?.["weather"]) {
    weatherId = Number(DATA_ARRAY["event-special"]?.["0"]?.["weather"]);
  }
  // 前回より天気が少ないなどの理由で該当する天気が無い場合は天気なしで上書き
  if (!BOARD_WEATHER_LIST[weatherId]) {
    weatherId = 0;
  }
  BOARD_WEATHER_LIST[weatherId]["effect-list"].forEach((e, i) => {
    switch (e.effect) {
      case "girl": {
        const r = calcBoardSpecialEffects_Girl(data_set, e, e.rate);
        result["weather"]["effect_sum"][i] = {
          min: r.min,
          exp: r.exp,
          max: r.max,
        };
        r.per_girl_main.forEach((value, index) => {
          result["per_girl"]["main"][index] += value;
          limitter["main"][index] += value;
        });
        r.per_girl_sub.forEach((value, index) => {
          result["per_girl"]["sub"][index] += value;
          limitter["sub"][index] += value;
        });
        break;
      }
      case "petit-girl": {
        const r = calcBoardSpecialEffects_PetitGirl(data_set, e, e.rate);
        result["weather"]["effect_sum"][i] = {
          min: r.min,
          exp: r.exp,
          max: r.max,
        };
        petit_limitter += r.exp;
        break;
      }
      case "petit-effect": {
        const r = calcBoardSpecialEffects_PetitEffect(data_set, e, e.rate);
        result["weather"]["effect_sum"][i] = {
          min: r.min,
          exp: r.exp,
          max: r.max,
        };
        r.per_girl_main.forEach((value, index) => {
          result["per_girl"]["main"][index] += value;
        });
        r.per_girl_sub.forEach((value, index) => {
          result["per_girl"]["sub"][index] += value;
        });
        break;
      }
      case "petit-skill": {
        const r = calcBoardSpecialEffects_PetitSkill(data_set, e, e.rate);
        result["weather"]["effect_sum"][i] = {
          min: r.min,
          exp: r.exp,
          max: r.max,
        };
        break;
      }
      case "skill-effect": {
        const r = calcBoardSpecialEffects_SkillEffect(data_set, e, e.rate);
        result["weather"]["effect_sum"][i] = {
          min: r.min,
          exp: r.exp,
          max: r.max,
        };
        break;
      }
      case "deckbonus": {
        const r = calcBoardSpecialEffects_DeckBonus(data_set, e, e.rate);
        result["weather"]["effect_sum"][i] = {
          min: r.min,
          exp: r.exp,
          max: r.max,
        };
        r.per_girl_main.forEach((value, index) => {
          result["per_girl"]["main"][index] += value;
        });
        r.per_girl_sub.forEach((value, index) => {
          result["per_girl"]["sub"][index] += value;
        });
        break;
      }
      case "spgirls": {
        const v = Math.ceil(
          (Number(data_set.playerdata_array.spgirls) * e.rate) / 100
        );
        result["weather"]["effect_sum"][i] = {
          min: v,
          exp: v,
          max: v,
        };
        break;
      }
      case "invalid": {
        result["weather"]["effect_sum"][i] = {
          min: 0,
          exp: 0,
          max: 0,
        };
        break;
      }
    }
  });

  // マス効果
  result["space"] = {
    effect_sum: Array(MAX_SPACE_EFFECT).fill({ min: 0, exp: 0, max: 0 }),
  };
  BOARD_SPACE_EFFECT_LIST.forEach((e, i) => {
    let rate = 0;
    if (DATA_ARRAY["event-special"]?.[String(i + 1)]?.["rate"]) {
      rate = Number(DATA_ARRAY["event-special"][String(i + 1)]["rate"]);
    }
    if (rate < -100) {
      rate = -100;
    }
    switch (e.effect) {
      case "girl": {
        const r = calcBoardSpecialEffects_Girl(data_set, e, rate);
        result["space"]["effect_sum"][i] = {
          min: r.min,
          exp: r.exp,
          max: r.max,
        };
        r.per_girl_main.forEach((value, index) => {
          result["per_girl"]["main"][index] += value;
          limitter["main"][index] += value;
        });
        r.per_girl_sub.forEach((value, index) => {
          result["per_girl"]["sub"][index] += value;
          limitter["sub"][index] += value;
        });
        break;
      }
      case "petit-girl": {
        const r = calcBoardSpecialEffects_PetitGirl(data_set, e, rate);
        result["space"]["effect_sum"][i] = {
          min: r.min,
          exp: r.exp,
          max: r.max,
        };
        petit_limitter += r.exp;
        break;
      }
      case "petit-effect": {
        const r = calcBoardSpecialEffects_PetitEffect(data_set, e, rate);
        result["space"]["effect_sum"][i] = {
          min: r.min,
          exp: r.exp,
          max: r.max,
        };
        r.per_girl_main.forEach((value, index) => {
          result["per_girl"]["main"][index] += value;
        });
        r.per_girl_sub.forEach((value, index) => {
          result["per_girl"]["sub"][index] += value;
        });
        break;
      }
      case "petit-skill": {
        const r = calcBoardSpecialEffects_PetitSkill(data_set, e, rate);
        result["space"]["effect_sum"][i] = {
          min: r.min,
          exp: r.exp,
          max: r.max,
        };
        break;
      }
      case "skill-effect": {
        const r = calcBoardSpecialEffects_SkillEffect(data_set, e, rate);
        result["space"]["effect_sum"][i] = {
          min: r.min,
          exp: r.exp,
          max: r.max,
        };
        break;
      }
      case "deckbonus": {
        const r = calcBoardSpecialEffects_DeckBonus(data_set, e, rate);
        result["space"]["effect_sum"][i] = {
          min: r.min,
          exp: r.exp,
          max: r.max,
        };
        r.per_girl_main.forEach((value, index) => {
          result["per_girl"]["main"][index] += value;
        });
        r.per_girl_sub.forEach((value, index) => {
          result["per_girl"]["sub"][index] += value;
        });
        break;
      }
      case "spgirls": {
        const v = Math.ceil(
          (Number(data_set.playerdata_array.spgirls) * rate) / 100
        );
        result["space"]["effect_sum"][i] = {
          min: v,
          exp: v,
          max: v,
        };
        break;
      }
      case "invalid": {
        result["space"]["effect_sum"][i] = {
          min: 0,
          exp: 0,
          max: 0,
        };
        break;
      }
    }
  });

  // 合計効果値の計算
  result.weather.effect_sum.forEach((e) => {
    result.total_effect_min += e.min;
    result.total_effect_exp += e.exp;
    result.total_effect_max += e.max;
  });
  result.space.effect_sum.forEach((e) => {
    result.total_effect_min += e.min;
    result.total_effect_exp += e.exp;
    result.total_effect_max += e.max;
  });

  // ガール単位にマイナス100%を超えた場合の下限リミッター
  limitter.main.forEach((v, i) => {
    if (v >= 0) return; // プラスになっていれば何もしない
    let temp_sum = 0;
    for (let j = 0; j < 3; j++) {
      temp_sum += data_set.power_array_main.All[i][j];
    }
    if (v + temp_sum < 0) {
      const over = Math.ceil(v + temp_sum);
      result["per_girl"]["main"][i] -= over;
      result.total_effect_min -= over;
      result.total_effect_exp -= over;
      result.total_effect_max -= over;
    }
  });
  limitter.sub.forEach((v, i) => {
    if (v >= 0) return; // プラスになっていれば何もしない
    let temp_sum = 0;
    for (let j = 0; j < 3; j++) {
      temp_sum += data_set.power_array_sub.All[i][j];
    }
    if (v + temp_sum * 0.8 < 0) {
      // 副は8掛けで計算
      const over = Math.ceil(v + temp_sum * 0.8);
      result["per_girl"]["sub"][i] -= over;
      result.total_effect_min -= over;
      result.total_effect_exp -= over;
      result.total_effect_max -= over;
    }
  });

  //ぷちセンバツ単位にマイナス100%を超えた場合の下限リミッター
  const detail_array = createPetitDetailArray();
  let temp_min = 0;
  for (let i = 0; i < 3; i++) {
    const p_a = detail_array[i]["attack"]["Pop"];
    const s_a = detail_array[i]["attack"]["Sweet"];
    const c_a = detail_array[i]["attack"]["Cool"];
    temp_min += p_a + s_a + c_a;
  }
  if (petit_limitter + temp_min < 0) {
    const over = Math.ceil(petit_limitter + temp_min);
    result.total_effect_min -= over;
    result.total_effect_exp -= over;
    result.total_effect_max -= over;
  }

  return result;
}

function calcBoardSpecialEffects_Girl(data_set, effect, rate) {
  let main = Array(MAX_MAIN_GIRLS).fill(0);
  let sub = Array(MAX_SUB_GIRLS).fill(0);

  // 対象判定パターンの作成
  let conditions = {
    "pre-select": false,
    higherrarity: 1,
    type: "All",
    highercost: 1,
    higherskilllv: 1,
    grade: "All",
  };
  for (const [key, value] of Object.entries(effect.condition)) {
    conditions[key] = value;
  }

  // 主
  for (let i = 0; i < MAX_MAIN_GIRLS; i++) {
    const result = calcBoardSpecialEffects_ConditionChecker(
      "main-scenes",
      i,
      conditions
    );
    if (result) {
      let temp_sum = 0;
      for (let j = 0; j < 3; j++) {
        temp_sum += data_set.power_array_main.All[i][j];
      }
      main[i] = Math.ceil((temp_sum * rate) / 100);
    }
  }

  // 副
  for (let i = 0; i < MAX_SUB_GIRLS; i++) {
    const result = calcBoardSpecialEffects_ConditionChecker(
      "sub-scenes",
      i,
      conditions
    );
    if (result) {
      let temp_sum = 0;
      for (let j = 0; j < 3; j++) {
        temp_sum += data_set.power_array_sub.All[i][j];
      }
      sub[i] = Math.ceil((temp_sum * 0.8 * rate) / 100); // 副は8掛け
    }
  }

  const result = {};
  result.min =
    main.reduce((sum, value) => sum + value, 0) +
    sub.reduce((sum, value) => sum + value, 0);
  result.exp = result.min;
  result.max = result.min;
  result.per_girl_main = main;
  result.per_girl_sub = sub;

  return result;
}

function calcBoardSpecialEffects_PetitGirl(data_set, effect, rate) {
  let temp_min = 0;

  if (Object.keys(effect.condition).length === 0) {
    /* 総攻援に直接掛かる場合 */
    temp_min = Math.ceil((data_set["petit-girl"] * rate) / 100);
  } else {
    for (const [key, value] of Object.entries(effect.condition)) {
      /* 現時点ではtypeの指定がある場合のみを想定 */
      if (key === "type") {
        let sum = 0;
        /* ぶちセンバツ詳細を参照してtypeが一致したものだけsumに加算する */
        for (let i = 1; i < 4; i++) {
          for (let j = 0; j < 10; j++) {
            let attack =
              DATA_ARRAY["petit-girls"]?.[String(i) + String(j)]?.["attack_i"];
            if (!attack) attack = 0;
            let type =
              DATA_ARRAY["petit-girls"]?.[String(i) + String(j)]?.["type"];
            if (!type) type = "Pop";
            if (value === type || value === "All") {
              sum += Number(attack);
            }
          }
        }
        temp_min = Math.ceil((sum * rate) / 100);
      }
    }
  }

  const result = {};
  result.min = temp_min;
  result.exp = temp_min;
  result.max = temp_min;

  return result;
}

function calcBoardSpecialEffects_PetitEffect(data_set, effect, rate) {
  let main = Array(MAX_MAIN_GIRLS).fill(0);
  let sub = Array(MAX_SUB_GIRLS).fill(0);

  let mod_petit_effects_array = Object.assign(
    {},
    JSON.parse(JSON.stringify(data_set["petit_effects_array"]))
  );
  mod_petit_effects_array["type"]["All"]["attack"] *= 1 + rate / 100;
  mod_petit_effects_array["type"]["All"]["defence"] *= 1 + rate / 100;
  mod_petit_effects_array["type"]["All"]["both"] *= 1 + rate / 100;
  mod_petit_effects_array["type"]["Pop"]["attack"] *= 1 + rate / 100;
  mod_petit_effects_array["type"]["Pop"]["defence"] *= 1 + rate / 100;
  mod_petit_effects_array["type"]["Pop"]["both"] *= 1 + rate / 100;
  mod_petit_effects_array["type"]["Sweet"]["attack"] *= 1 + rate / 100;
  mod_petit_effects_array["type"]["Sweet"]["defence"] *= 1 + rate / 100;
  mod_petit_effects_array["type"]["Sweet"]["both"] *= 1 + rate / 100;
  mod_petit_effects_array["type"]["Cool"]["attack"] *= 1 + rate / 100;
  mod_petit_effects_array["type"]["Cool"]["defence"] *= 1 + rate / 100;
  mod_petit_effects_array["type"]["Cool"]["both"] *= 1 + rate / 100;
  mod_petit_effects_array["best"]["All"]["both"] *= 1 + rate / 100;
  mod_petit_effects_array["date"]["All"]["both"] *= 1 + rate / 100;
  mod_petit_effects_array["touch"]["All"]["both"] *= 1 + rate / 100;
  mod_petit_effects_array["birth"]["All"]["both"] *= 1 + rate / 100;
  mod_petit_effects_array["clubitem"]["Pop"]["both"] *= 1 + rate / 100;
  mod_petit_effects_array["clubitem"]["Sweet"]["both"] *= 1 + rate / 100;
  mod_petit_effects_array["clubitem"]["Cool"]["both"] *= 1 + rate / 100;

  let temp_min = 0;
  let temp_exp = 0;
  let temp_max = 0;

  // 主
  for (let i = 0; i < MAX_MAIN_GIRLS; i++) {
    const [min_before, exp_dif_before, max_dif_before] =
      calcMainGirlsPerformancePerGirl(
        i,
        data_set["precious_array"],
        data_set["petit_effects_array"],
        data_set["deckbonus_array"],
        data_set["playerdata_array"]
      );
    const [min_after, exp_dif_after, max_dif_after] =
      calcMainGirlsPerformancePerGirl(
        i,
        data_set["precious_array"],
        mod_petit_effects_array,
        data_set["deckbonus_array"],
        data_set["playerdata_array"]
      );
    temp_min += Math.ceil(min_after - min_before);
    temp_exp += Math.ceil(
      min_after + exp_dif_after - (min_before + exp_dif_before)
    );
    temp_max += Math.ceil(
      min_after + max_dif_after - (min_before + max_dif_before)
    );
    main[i] = Math.ceil(
      min_after + exp_dif_after - (min_before + exp_dif_before)
    );
  }

  // 副
  for (let i = 0; i < MAX_SUB_GIRLS; i++) {
    const [min_before, exp_dif_before, max_dif_before] =
      calcSubGirlsPerformancePerGirl(
        i,
        data_set["precious_array"],
        data_set["petit_effects_array"],
        data_set["deckbonus_array"],
        data_set["playerdata_array"]
      );
    const [min_after, exp_dif_after, max_dif_after] =
      calcSubGirlsPerformancePerGirl(
        i,
        data_set["precious_array"],
        mod_petit_effects_array,
        data_set["deckbonus_array"],
        data_set["playerdata_array"]
      );
    temp_min += Math.ceil(min_after - min_before);
    temp_exp += Math.ceil(
      min_after + exp_dif_after - (min_before + exp_dif_before)
    );
    temp_max += Math.ceil(
      min_after + max_dif_after - (min_before + max_dif_before)
    );
    sub[i] = Math.ceil(
      min_after + exp_dif_after - (min_before + exp_dif_before)
    );
  }

  const result = {};
  result.min = temp_min;
  result.exp = temp_exp;
  result.max = temp_max;
  result.per_girl_main = main;
  result.per_girl_sub = sub;

  return result;
}

function calcBoardSpecialEffects_PetitSkill(data_set, effect, rate) {
  const detail_array = createPetitDetailArray();

  let temp_min = 0;
  for (let i = 0; i < 3; i++) {
    const p_a = detail_array[i]["attack"]["Pop"];
    const p_s =
      (detail_array[i]["skill"]["Pop"] + detail_array[i]["skill"]["All"]) / 100;
    const s_a = detail_array[i]["attack"]["Sweet"];
    const s_s =
      (detail_array[i]["skill"]["Sweet"] + detail_array[i]["skill"]["All"]) /
      100;
    const c_a = detail_array[i]["attack"]["Cool"];
    const c_s =
      (detail_array[i]["skill"]["Cool"] + detail_array[i]["skill"]["All"]) /
      100;
    temp_min += Math.ceil(((p_a * p_s + s_a * s_s + c_a * c_s) * rate) / 100);
  }

  const result = {};
  result.min = temp_min;
  result.exp = temp_min;
  result.max = temp_min;

  return result;
}

function calcBoardSpecialEffects_SkillEffect(data_set, effect, rate) {
  const result = {};
  result.min = Math.ceil((data_set["skill-effect"]["min"] * rate) / 100);
  result.exp =
    result.min + Math.ceil((data_set["skill-effect"]["exp"] * rate) / 100);
  result.max =
    result.min + Math.ceil((data_set["skill-effect"]["max"] * rate) / 100);

  return result;
}

function calcBoardSpecialEffects_DeckBonus(data_set, effect, rate) {
  let main = Array(MAX_MAIN_GIRLS).fill(0);
  let sub = Array(MAX_SUB_GIRLS).fill(0);

  let mod_deckbonus_array = Object.assign(
    {},
    JSON.parse(JSON.stringify(data_set["deckbonus_array"]))
  );
  mod_deckbonus_array["attack"] *= 1 + rate / 100;
  mod_deckbonus_array["defence"] *= 1 + rate / 100;
  mod_deckbonus_array["both"] *= 1 + rate / 100;

  let temp_min = 0;
  let temp_exp = 0;
  let temp_max = 0;

  // 主
  for (let i = 0; i < MAX_MAIN_GIRLS; i++) {
    const [min_before, exp_dif_before, max_dif_before] =
      calcMainGirlsPerformancePerGirl(
        i,
        data_set["precious_array"],
        data_set["petit_effects_array"],
        data_set["deckbonus_array"],
        data_set["playerdata_array"]
      );
    const [min_after, exp_dif_after, max_dif_after] =
      calcMainGirlsPerformancePerGirl(
        i,
        data_set["precious_array"],
        data_set["petit_effects_array"],
        mod_deckbonus_array,
        data_set["playerdata_array"]
      );
    temp_min += Math.ceil(min_after - min_before);
    temp_exp += Math.ceil(
      min_after + exp_dif_after - (min_before + exp_dif_before)
    );
    temp_max += Math.ceil(
      min_after + max_dif_after - (min_before + max_dif_before)
    );
    main[i] = Math.ceil(
      min_after + exp_dif_after - (min_before + exp_dif_before)
    );
  }

  // 副
  for (let i = 0; i < MAX_SUB_GIRLS; i++) {
    const [min_before, exp_dif_before, max_dif_before] =
      calcSubGirlsPerformancePerGirl(
        i,
        data_set["precious_array"],
        data_set["petit_effects_array"],
        data_set["deckbonus_array"],
        data_set["playerdata_array"]
      );
    const [min_after, exp_dif_after, max_dif_after] =
      calcSubGirlsPerformancePerGirl(
        i,
        data_set["precious_array"],
        data_set["petit_effects_array"],
        mod_deckbonus_array,
        data_set["playerdata_array"]
      );
    temp_min += Math.ceil(min_after - min_before);
    temp_exp += Math.ceil(
      min_after + exp_dif_after - (min_before + exp_dif_before)
    );
    temp_max += Math.ceil(
      min_after + max_dif_after - (min_before + max_dif_before)
    );
    sub[i] = Math.ceil(
      min_after + exp_dif_after - (min_before + exp_dif_before)
    );
  }

  const result = {};
  result.min = temp_min;
  result.exp = temp_min;
  result.max = temp_min;
  result.per_girl_main = main;
  result.per_girl_sub = sub;

  return result;
}

function calcBoardSpecialEffects_ConditionChecker(element, index, conditions) {
  let temparray = {
    apower: 0,
    strap: 0,
    type: "Pop",
    rarity: "SSR",
    cost: "27",
    skilllv: String(INIT_SKILL_LEVEL),
    grade: "1",
    club: false,
    date: false,
    touch: false,
    birth: false,
    limit: false,
    special: false,
  };

  let innerkeys;
  if (DATA_ARRAY[element][String(index + 1)]) {
    innerkeys = Object.keys(DATA_ARRAY[element][String(index + 1)]);
  } else {
    innerkeys = [];
  }

  for (let j = 0; j < innerkeys.length; j++) {
    temparray[innerkeys[j]] =
      DATA_ARRAY[element][String(index + 1)][innerkeys[j]];
  }
  if (temparray.apower < 1) {
    return false;
  }

  if (conditions["pre-select"] === true && temparray["special"] === false) {
    return false;
  }
  if (RARITY_TO_NUM_ARRAY[temparray.rarity] < conditions["higherrarity"]) {
    return false;
  }
  if (
    conditions["type"] !== "All" &&
    conditions["type"] !== temparray["type"]
  ) {
    return false;
  }
  if (temparray["cost"] < conditions["highercost"]) {
    return false;
  }
  if (temparray["skilllv"] < conditions["higherskilllv"]) {
    return false;
  }
  if (
    conditions["grade"] !== "All" &&
    conditions["grade"] !== temparray["grade"]
  ) {
    return false;
  }

  return true;
}

function displayBoardSpecialEffects(result_dict) {
  /* +0 を行うと -0 表示されていたのが 0 になるらしいので実施 */
  result_dict.weather.effect_sum.forEach((e, i) => {
    if (e["exp"] < 0) {
      $(`#event-special-weather-${i + 1} .effect`)
        .text((e["exp"] + 0).toLocaleString())
        .addClass("Red");
    } else {
      $(`#event-special-weather-${i + 1} .effect`)
        .text((e["exp"] + 0).toLocaleString())
        .removeClass("Red");
    }
  });

  result_dict.space.effect_sum.forEach((e, i) => {
    if (e["exp"] < 0) {
      $(`#event-special-${i + 1} .effect`)
        .text((e["exp"] + 0).toLocaleString())
        .addClass("Red");
    } else {
      $(`#event-special-${i + 1} .effect`)
        .text((e["exp"] + 0).toLocaleString())
        .removeClass("Red");
    }
  });

  // マス効果がマイナスの場合、minとmaxが逆転する場合があるため
  // 合計ボーナス効果の表示上でだけ入れ替える。
  let total_effect_min = result_dict["total_effect_min"];
  let total_effect_exp = result_dict["total_effect_exp"];
  let total_effect_max = result_dict["total_effect_max"];

  if (total_effect_min > total_effect_max) {
    [total_effect_min, total_effect_max] = [total_effect_max, total_effect_min];
  }

  if (result_dict["total_effect_min"] < 0) {
    $(`#event-special-total .min`)
      .text((total_effect_min + 0).toLocaleString())
      .addClass("Red");
  } else {
    $(`#event-special-total .min`)
      .text((total_effect_min + 0).toLocaleString())
      .removeClass("Red");
  }
  if (result_dict["total_effect_exp"] < 0) {
    $(`#event-special-total .exp`)
      .text((total_effect_exp + 0).toLocaleString())
      .addClass("Red");
  } else {
    $(`#event-special-total .exp`)
      .text((total_effect_exp + 0).toLocaleString())
      .removeClass("Red");
  }
  if (result_dict["total_effect_max"] < 0) {
    $(`#event-special-total .max`)
      .text((total_effect_max + 0).toLocaleString())
      .addClass("Red");
  } else {
    $(`#event-special-total .max`)
      .text((total_effect_max + 0).toLocaleString())
      .removeClass("Red");
  }
}

function displayBoardSpecialEffectsPerGirl(result_dict) {
  let resultArrayMain = Array(MAX_MAIN_GIRLS).fill(0);
  let resultArraySub = Array(MAX_SUB_GIRLS).fill(0);

  // メイン、サブそれぞれの効果加算前の数値を取得してArrayに加算
  for (let i = 0; i < MAX_MAIN_GIRLS; i++) {
    resultArrayMain[i] +=
      Number(
        $(`#main-scenes-${String(i + 1)} .result-1`)
          .text()
          .replace(",", "")
      ) + result_dict.per_girl.main[i];
  }
  for (let i = 0; i < MAX_SUB_GIRLS; i++) {
    resultArraySub[i] +=
      Number(
        $(`#sub-scenes-${String(i + 1)} .result-1`)
          .text()
          .replace(",", "")
      ) + result_dict.per_girl.sub[i];
  }

  // 効果加算後欄の数字表示を更新
  for (let i = 0; i < MAX_MAIN_GIRLS; i++) {
    $(`#main-scenes-${String(i + 1)} .result-event-sp-1`).text(
      resultArrayMain[i].toLocaleString()
    );
  }
  for (let i = 0; i < MAX_SUB_GIRLS; i++) {
    $(`#sub-scenes-${String(i + 1)} .result-event-sp-1`).text(
      resultArraySub[i].toLocaleString()
    );
  }

  // 効果加算後欄の小さい順を更新
  displayMainGirlsRaking(resultArrayMain, true);
  displaySubGirlsRaking(resultArraySub, true);
}

/* ぷちセンバツの攻援力とスキル効果をグループごとに積算する*/
function createPetitDetailArray() {
  let detail_array = [
    {
      attack: { Pop: 0, Sweet: 0, Cool: 0 },
      skill: { Pop: 0, Sweet: 0, Cool: 0, All: 0 },
    },
    {
      attack: { Pop: 0, Sweet: 0, Cool: 0 },
      skill: { Pop: 0, Sweet: 0, Cool: 0, All: 0 },
    },
    {
      attack: { Pop: 0, Sweet: 0, Cool: 0 },
      skill: { Pop: 0, Sweet: 0, Cool: 0, All: 0 },
    },
  ];

  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 10; j++) {
      let attack =
        DATA_ARRAY["petit-girls"]?.[String(i) + String(j)]?.["attack_i"];
      if (!attack) attack = 0;
      let type = DATA_ARRAY["petit-girls"]?.[String(i) + String(j)]?.["type"];
      if (!type) type = "Pop";
      let skilltype =
        DATA_ARRAY["petit-girls"]?.[String(i) + String(j)]?.["skilltype"];
      if (!skilltype) skilltype = "Pop";
      let skillrate =
        DATA_ARRAY["petit-girls"]?.[String(i) + String(j)]?.["skillrate"];
      if (!skillrate) skillrate = 0;

      detail_array[i - 1]["attack"][type] += Number(attack);
      detail_array[i - 1]["skill"][skilltype] += Number(skillrate);
    }
  }
  return detail_array;
}
