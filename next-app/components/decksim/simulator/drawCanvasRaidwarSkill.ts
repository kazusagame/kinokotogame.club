import { roundRect, ngRect } from "@/lib/canvasShapes";
import { RaidwarSkillData } from "@/components/decksim/simulator/useRaidwarSkillData";

import { notoSansJp } from "@/lib/fonts";

interface Props {
  data: RaidwarSkillData;
  ctx: CanvasRenderingContext2D;
}

const CANVAS_SETTING = {
  COLUMN_BLANK: 22,
  COLUMN_BAND: 46,
  ROW_BLANK: 4,
  ROW_BAND: 8,
  MAX_HEART: 250,
};

type ColorKey =
  | "textMain"
  | "borderColorMain"
  | "borderColorRed"
  | "borderColorBlue"
  | "borderColorGray"
  | "backgroundDamage"
  | "backgroundBuf"
  | "backgroundNgRect";

type ColorMode = "lightMode" | "darkMode";

const CANVAS_COLORS: {
  [K in ColorMode]: { [K in ColorKey]: string };
} = {
  lightMode: {
    textMain: "#000000",
    borderColorMain: "#000000",
    borderColorRed: "#b20000",
    borderColorBlue: "#0300b2",
    borderColorGray: "#606060",
    backgroundDamage: "#ffa92948",
    backgroundBuf: "#ff9dbe48",
    backgroundNgRect: "#80808060",
  },
  darkMode: {
    textMain: "#e6e6e6",
    borderColorMain: "#e6e6e6",
    borderColorRed: "#fabea7",
    borderColorBlue: "#c6cfff",
    borderColorGray: "#a0a0a0",
    backgroundDamage: "#ffa92948",
    backgroundBuf: "#ff9dbe48",
    backgroundNgRect: "#80808060",
  },
} as const;

export const drawCanvasRaidwarSkill = ({ data, ctx }: Props) => {
  const { heartArray, damageArray } = createHeartArray({ data });

  drawHeartMark({ ctx });
  drawLeader({ ctx, data, heartArray, damageArray });
  drawHelper({ ctx, data, heartArray, damageArray });
  drawMember({ ctx, data, heartArray, damageArray });
  drawLines({ ctx, heartArray, damageArray });
};

function drawHeartMark({ ctx }: { ctx: CanvasRenderingContext2D }) {
  ctx.fillStyle = getThemeColor("textMain");
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.font = `12px ${notoSansJp.style.fontFamily}`;
  ctx.fillText(
    `♥`,
    CANVAS_SETTING.COLUMN_BLANK * 1,
    CANVAS_SETTING.ROW_BAND * 2
  );
}

function drawLeader({
  ctx,
  data,
  heartArray,
  damageArray,
}: {
  ctx: CanvasRenderingContext2D;
  data: RaidwarSkillData;
  heartArray: number[];
  damageArray: number[];
}) {
  ctx.fillStyle = getThemeColor("textMain");
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.font = `12px ${notoSansJp.style.fontFamily}`;
  ctx.fillText(
    `リーダー`,
    CANVAS_SETTING.COLUMN_BLANK * 2 + CANVAS_SETTING.COLUMN_BAND * 0.5,
    CANVAS_SETTING.ROW_BAND * 2
  );

  const leader = data.leader[1];
  if (!leader) {
    return;
  } else if (!leader.heartNum || leader.heartNum < 1) {
    return;
  }

  const pointArray: number[][] = [];
  for (let i = 0; i < heartArray.length; i++) {
    if (i === 0) {
      const start = CANVAS_SETTING.ROW_BAND * 2;
      const length =
        leader.heartNum * CANVAS_SETTING.ROW_BAND +
        (leader.heartNum - 1) * CANVAS_SETTING.ROW_BLANK;

      const carryOver = 0;
      let carry = heartArray[0] - leader.heartNum;
      if (carry < 0) {
        carry = 0;
      }
      pointArray.push([start, length, carry, carryOver]);
    } else {
      const start =
        pointArray[i - 1][0] + pointArray[i - 1][1] + CANVAS_SETTING.ROW_BLANK;
      let length =
        leader.heartNum * 2 * CANVAS_SETTING.ROW_BAND +
        (leader.heartNum * 2 - 1) * CANVAS_SETTING.ROW_BLANK;

      // 繰り越し数の限界のため長さを水増し
      let carryOver = pointArray[i - 1][2] - (leader.heartNum * 2 - 1);
      if (carryOver > 0) {
        length +=
          carryOver * (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK);
      } else {
        carryOver = 0;
      }
      let carry =
        pointArray[i - 1][2] +
        (heartArray[1] - heartArray[0]) -
        leader.heartNum * 2 -
        carryOver;
      if (carry < 0) {
        carry = 0;
      }
      pointArray.push([start, length, carry, carryOver]);
    }
  }

  pointArray.forEach((element) => {
    const fillColor =
      leader.damage && leader.damage !== 0
        ? getThemeColor("backgroundDamage")
        : getThemeColor("backgroundBuf");
    roundRect({
      ctx: ctx,
      x: CANVAS_SETTING.COLUMN_BLANK * 2,
      y: element[0],
      xDiff: CANVAS_SETTING.COLUMN_BAND,
      yDiff: element[1],
      rad: 5,
      strokeColor: getThemeColor("borderColorRed"),
      fillColor: fillColor,
    });

    if (element[3] > 0) {
      ngRect({
        ctx: ctx,
        x: CANVAS_SETTING.COLUMN_BLANK * 2 + 3,
        y:
          element[0] +
          element[1] -
          (element[3] + 1) *
            (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK) +
          2,
        xDiff: CANVAS_SETTING.COLUMN_BAND - 6,
        yDiff:
          element[3] * (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK) - 4,
        strokeColor: getThemeColor("borderColorMain"),
        fillColor: getThemeColor("backgroundNgRect"),
      });
    }

    if (leader.damage && leader.damage !== 0) {
      ctx.fillStyle = getThemeColor("textMain");
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.font = `12px ${notoSansJp.style.fontFamily}`;
      ctx.fillText(
        `${leader.damage} %`,
        CANVAS_SETTING.COLUMN_BLANK * 2 + CANVAS_SETTING.COLUMN_BAND * 0.5,
        element[0] + element[1] + 2
      );

      const endPoint =
        (element[0] +
          element[1] -
          CANVAS_SETTING.ROW_BAND * 2 +
          CANVAS_SETTING.ROW_BLANK) /
        (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK);
      const attackCount = heartArray.findIndex(
        (element) => element >= endPoint
      );
      damageArray[attackCount] += Number(leader.damage);
    }
  });
}

function drawHelper({
  ctx,
  data,
  heartArray,
  damageArray,
}: {
  ctx: CanvasRenderingContext2D;
  data: RaidwarSkillData;
  heartArray: number[];
  damageArray: number[];
}) {
  ctx.fillStyle = getThemeColor("textMain");
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.font = `12px ${notoSansJp.style.fontFamily}`;
  ctx.fillText(
    `助っ人`,
    CANVAS_SETTING.COLUMN_BLANK * 7 + CANVAS_SETTING.COLUMN_BAND * 5.5,
    CANVAS_SETTING.ROW_BAND * 2
  );

  const helper = data.helper[1];
  if (!helper) {
    return;
  } else if (!helper.heartNum || helper.heartNum < 1) {
    return;
  }

  const pointArray: number[][] = [];
  for (let i = 0; i < heartArray.length; i++) {
    if (i === 0) {
      const start = CANVAS_SETTING.ROW_BAND * 2;
      const length =
        helper.heartNum * CANVAS_SETTING.ROW_BAND +
        (helper.heartNum - 1) * CANVAS_SETTING.ROW_BLANK;

      const carryOver = 0;
      let carry = heartArray[0] - helper.heartNum;
      if (carry < 0) {
        carry = 0;
      }
      pointArray.push([start, length, carry, carryOver]);
    } else {
      const start =
        pointArray[i - 1][0] + pointArray[i - 1][1] + CANVAS_SETTING.ROW_BLANK;
      let length =
        helper.heartNum * 2 * CANVAS_SETTING.ROW_BAND +
        (helper.heartNum * 2 - 1) * CANVAS_SETTING.ROW_BLANK;

      // 繰り越し数の限界のため長さを水増し
      let carryOver = pointArray[i - 1][2] - (helper.heartNum * 2 - 1);
      if (carryOver > 0) {
        length +=
          carryOver * (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK);
      } else {
        carryOver = 0;
      }
      let carry =
        pointArray[i - 1][2] +
        (heartArray[1] - heartArray[0]) -
        helper.heartNum * 2 -
        carryOver;
      if (carry < 0) {
        carry = 0;
      }
      pointArray.push([start, length, carry, carryOver]);
    }
  }

  pointArray.forEach((element) => {
    const fillColor =
      helper.damage && helper.damage !== 0
        ? getThemeColor("backgroundDamage")
        : getThemeColor("backgroundBuf");
    roundRect({
      ctx: ctx,
      x: CANVAS_SETTING.COLUMN_BLANK * 7 + CANVAS_SETTING.COLUMN_BAND * 5,
      y: element[0],
      xDiff: CANVAS_SETTING.COLUMN_BAND,
      yDiff: element[1],
      rad: 5,
      strokeColor: getThemeColor("borderColorBlue"),
      fillColor: fillColor,
    });

    if (element[3] > 0) {
      ngRect({
        ctx: ctx,
        x: CANVAS_SETTING.COLUMN_BLANK * 7 + CANVAS_SETTING.COLUMN_BAND * 5 + 3,
        y:
          element[0] +
          element[1] -
          (element[3] + 1) *
            (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK) +
          2,
        xDiff: CANVAS_SETTING.COLUMN_BAND - 6,
        yDiff:
          element[3] * (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK) - 4,
        strokeColor: getThemeColor("borderColorMain"),
        fillColor: getThemeColor("backgroundNgRect"),
      });
    }

    if (helper.damage && helper.damage !== 0) {
      ctx.fillStyle = getThemeColor("textMain");
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.font = `12px ${notoSansJp.style.fontFamily}`;
      ctx.fillText(
        `${helper.damage} %`,
        CANVAS_SETTING.COLUMN_BLANK * 7 + CANVAS_SETTING.COLUMN_BAND * 5.5,
        element[0] + element[1] + 2
      );

      const endPoint =
        (element[0] +
          element[1] -
          CANVAS_SETTING.ROW_BAND * 2 +
          CANVAS_SETTING.ROW_BLANK) /
        (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK);
      const attackCount = heartArray.findIndex(
        (element) => element >= endPoint
      );
      damageArray[attackCount] += Number(helper.damage);
    }
  });
}

function drawMember({
  ctx,
  data,
  heartArray,
  damageArray,
}: {
  ctx: CanvasRenderingContext2D;
  data: RaidwarSkillData;
  heartArray: number[];
  damageArray: number[];
}) {
  ctx.fillStyle = getThemeColor("textMain");
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.font = `12px ${notoSansJp.style.fontFamily}`;
  for (let i = 0; i < 4; i++) {
    ctx.fillText(
      `メンバー${i + 1}`,
      CANVAS_SETTING.COLUMN_BLANK * (i + 3) +
        CANVAS_SETTING.COLUMN_BAND * (i + 1.5),
      CANVAS_SETTING.ROW_BAND * 2
    );
  }

  const sumHeartColumn = [0, 0, 0, 0];
  let baseLine = 0;
  let blankFlg = 0;
  let heartArrayIndex = 0;

  do {
    for (let i = 0; i < 49; i++) {
      // heartArrayが空になったら強制終了
      if (heartArray.length - heartArrayIndex <= 0) {
        blankFlg = 1;
        break;
      }

      const member = data["member"][i + 1];
      // ハート数が空白かマイナスのメンバに到達したら強制終了
      if (!member) {
        blankFlg = 1;
        break;
      } else if (!member.heartNum || member.heartNum < 1) {
        blankFlg = 1;
        break;
      }

      // このメンバーが入る位置を決定する。ベースライン以下の欄があるところ。
      const next_position = sumHeartColumn.findIndex(
        (element) => element <= baseLine
      );

      let carryOver =
        baseLine - sumHeartColumn[next_position] - (member.heartNum - 1);
      if (carryOver < 0) {
        carryOver = 0;
      }

      const x =
        CANVAS_SETTING.COLUMN_BLANK * 3 +
        CANVAS_SETTING.COLUMN_BAND +
        next_position *
          (CANVAS_SETTING.COLUMN_BLANK + CANVAS_SETTING.COLUMN_BAND);
      const y =
        CANVAS_SETTING.ROW_BAND * 2 +
        sumHeartColumn[next_position] *
          (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK);
      const height =
        member.heartNum * CANVAS_SETTING.ROW_BAND +
        (member.heartNum - 1) * CANVAS_SETTING.ROW_BLANK +
        carryOver * (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK);

      const fillColor =
        member.damage && member.damage !== 0
          ? getThemeColor("backgroundDamage")
          : getThemeColor("backgroundBuf");
      roundRect({
        ctx: ctx,
        x: x,
        y: y,
        xDiff: CANVAS_SETTING.COLUMN_BAND,
        yDiff: height,
        rad: 5,
        strokeColor: getThemeColor("borderColorMain"),
        fillColor: fillColor,
      });
      if (carryOver !== 0) {
        ngRect({
          ctx: ctx,
          x: x + 3,
          y:
            y +
            height -
            (carryOver + 1) *
              (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK) +
            2,
          xDiff: CANVAS_SETTING.COLUMN_BAND - 6,
          yDiff:
            carryOver * (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK) -
            4,
          strokeColor: getThemeColor("borderColorMain"),
          fillColor: getThemeColor("backgroundNgRect"),
        });
      }
      if (member.damage && member.damage !== 0) {
        ctx.fillStyle = getThemeColor("textMain");
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.font = `12px ${notoSansJp.style.fontFamily}`;
        ctx.fillText(
          `${member.damage} %`,
          x + CANVAS_SETTING.COLUMN_BAND / 2,
          y + height + 2
        );

        const endPoint =
          (y +
            height -
            CANVAS_SETTING.ROW_BAND * 2 +
            CANVAS_SETTING.ROW_BLANK) /
          (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK);
        const attackCount = heartArray.findIndex(
          (element) => element >= endPoint
        );
        damageArray[attackCount] += Number(member.damage);
      }
      ctx.fillStyle = getThemeColor("textMain");
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.font = `12px ${notoSansJp.style.fontFamily}`;
      ctx.fillText(`[ ${i + 1} ]`, x + CANVAS_SETTING.COLUMN_BAND / 2, y + 2);

      sumHeartColumn[next_position] += Number(member.heartNum) + carryOver;

      // 現在のベースライン内に次のメンバーが入れる位置が無い場合はベースラインを上げる。
      while (
        sumHeartColumn.findIndex((element) => element <= baseLine) === -1
      ) {
        let addHeart;
        if (baseLine === 0) {
          addHeart = heartArray[heartArrayIndex];
        } else {
          addHeart =
            heartArray[heartArrayIndex] - heartArray[heartArrayIndex - 1];
        }
        baseLine += addHeart;
        heartArrayIndex++;

        // 次のハート数が空の場合はwhileから抜ける
        if (heartArray[heartArrayIndex] === undefined) {
          blankFlg = 1;
          break;
        }
      }
    }
  } while (blankFlg === 0 && baseLine < CANVAS_SETTING.MAX_HEART);
}

function drawLines({
  ctx,
  heartArray,
  damageArray,
}: {
  ctx: CanvasRenderingContext2D;
  heartArray: number[];
  damageArray: number[];
}) {
  let sumSkill = 0;
  let sumAll = 0;
  heartArray.forEach((v, i) => {
    const x =
      CANVAS_SETTING.COLUMN_BLANK * 7.5 + CANVAS_SETTING.COLUMN_BAND * 6;
    const y =
      CANVAS_SETTING.ROW_BAND * 2 +
      CANVAS_SETTING.ROW_BAND * v +
      CANVAS_SETTING.ROW_BLANK * (v - 1) +
      CANVAS_SETTING.ROW_BLANK / 2;

    const heartDiff =
      i === 0 ? heartArray[i] : heartArray[i] - heartArray[i - 1];
    const nextHeart = heartArray[i + 1] - heartArray[i];

    ctx.beginPath();
    ctx.strokeStyle = getThemeColor("borderColorGray");
    ctx.setLineDash([5, 5]);
    ctx.moveTo(CANVAS_SETTING.COLUMN_BLANK * 1.5, y);
    ctx.lineTo(
      CANVAS_SETTING.COLUMN_BLANK * 7.5 + CANVAS_SETTING.COLUMN_BAND * 6.1,
      y
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = getThemeColor("textMain");
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.font = `12px ${notoSansJp.style.fontFamily}`;
    ctx.fillText(`${v}`, CANVAS_SETTING.COLUMN_BLANK * 1.3, y);
    ctx.textAlign = "left";
    ctx.fillText(`${i + 1} 回目`, x + CANVAS_SETTING.COLUMN_BLANK * 0.5, y);

    // 飴パンの場合は 100 % で計算、炭酸は ハート × 150 %
    const multiply = heartDiff === 1 ? 100 : 150;
    if (isNaN(nextHeart) || nextHeart > 1) {
      ctx.textAlign = "left";
      ctx.fillText(
        `区間: ${damageArray[i]} %  (${
          damageArray[i] + heartDiff * multiply
        } %)`,
        x + CANVAS_SETTING.COLUMN_BLANK * 0.5,
        y + 14
      );
      ctx.textAlign = "left";
      ctx.fillText(
        `合計: ${sumSkill + damageArray[i]} %  (${
          sumAll + damageArray[i] + heartDiff * multiply
        } %)`,
        x + CANVAS_SETTING.COLUMN_BLANK * 0.5,
        y + 28
      );
    }
    sumSkill += damageArray[i];
    sumAll += damageArray[i] + heartDiff * multiply;
  });
}

function createHeartArray({ data }: { data: RaidwarSkillData }): {
  heartArray: number[];
  damageArray: number[];
} {
  const heartNumSpecial = 8;
  const heartNumNormal = 4;
  const heartNumCandy = 1;

  const heartArray: number[] = [];
  const { patternSelect, customPattern } = data.settings;

  if (patternSelect !== "custom") {
    let totalHeartNum = 0;

    // 初回
    if (patternSelect === "specialOnly") {
      heartArray.push(heartNumSpecial);
      totalHeartNum += heartNumSpecial;
    } else if (
      patternSelect === "specialAfterNormal" ||
      patternSelect === "normalOnly"
    ) {
      heartArray.push(heartNumNormal);
      totalHeartNum += heartNumNormal;
    } else {
      heartArray.push(heartNumCandy);
      totalHeartNum += heartNumCandy;
    }

    // 2回目以降
    while (totalHeartNum < CANVAS_SETTING.MAX_HEART) {
      if (
        patternSelect === "normalOnly" ||
        patternSelect === "normalAfterCandy"
      ) {
        heartArray.push(totalHeartNum + heartNumNormal);
        totalHeartNum += heartNumNormal;
      } else {
        heartArray.push(totalHeartNum + heartNumSpecial);
        totalHeartNum += heartNumSpecial;
      }
    }
  } else {
    let totalHeartNum = 0;
    for (let i = 0; i < customPattern.length; i++) {
      if (customPattern.charAt(i) === "C" || customPattern.charAt(i) === "c") {
        heartArray.push(totalHeartNum + heartNumCandy);
        totalHeartNum += heartNumCandy;
      } else if (
        customPattern.charAt(i) === "N" ||
        customPattern.charAt(i) === "n"
      ) {
        heartArray.push(totalHeartNum + heartNumNormal);
        totalHeartNum += heartNumNormal;
      } else if (
        customPattern.charAt(i) === "S" ||
        customPattern.charAt(i) === "s"
      ) {
        heartArray.push(totalHeartNum + heartNumSpecial);
        totalHeartNum += heartNumSpecial;
      } else {
        break;
      }
    }
  }

  const damageArray: number[] = Array(heartArray.length).fill(0);

  return { heartArray: heartArray, damageArray: damageArray };
}

const getThemeColor = (type: ColorKey) => {
  if (document.querySelector("html")?.dataset?.theme === "cupcake") {
    return CANVAS_COLORS["lightMode"][type];
  } else {
    return CANVAS_COLORS["darkMode"][type];
  }
};

export const calcRaidwarSkillResult = ({
  data,
}: {
  data: RaidwarSkillData;
}) => {
  const { heartArray, damageArray } = createHeartArray({ data });

  // 解読するのが面倒だったため、canvas描写部分を除いて関数をコピーしている。
  calcLeader({ data, heartArray, damageArray });
  calcHelper({ data, heartArray, damageArray });
  calcMember({ data, heartArray, damageArray });

  return { damageArray };
};

function calcLeader({
  data,
  heartArray,
  damageArray,
}: {
  data: RaidwarSkillData;
  heartArray: number[];
  damageArray: number[];
}) {
  const leader = data.leader[1];
  if (!leader) {
    return;
  } else if (!leader.heartNum || leader.heartNum < 1) {
    return;
  }

  const pointArray: number[][] = [];
  for (let i = 0; i < heartArray.length; i++) {
    if (i === 0) {
      const start = CANVAS_SETTING.ROW_BAND * 2;
      const length =
        leader.heartNum * CANVAS_SETTING.ROW_BAND +
        (leader.heartNum - 1) * CANVAS_SETTING.ROW_BLANK;

      const carryOver = 0;
      let carry = heartArray[0] - leader.heartNum;
      if (carry < 0) {
        carry = 0;
      }
      pointArray.push([start, length, carry, carryOver]);
    } else {
      const start =
        pointArray[i - 1][0] + pointArray[i - 1][1] + CANVAS_SETTING.ROW_BLANK;
      let length =
        leader.heartNum * 2 * CANVAS_SETTING.ROW_BAND +
        (leader.heartNum * 2 - 1) * CANVAS_SETTING.ROW_BLANK;

      // 繰り越し数の限界のため長さを水増し
      let carryOver = pointArray[i - 1][2] - (leader.heartNum * 2 - 1);
      if (carryOver > 0) {
        length +=
          carryOver * (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK);
      } else {
        carryOver = 0;
      }
      let carry =
        pointArray[i - 1][2] +
        (heartArray[1] - heartArray[0]) -
        leader.heartNum * 2 -
        carryOver;
      if (carry < 0) {
        carry = 0;
      }
      pointArray.push([start, length, carry, carryOver]);
    }
  }

  pointArray.forEach((element) => {
    if (leader.damage && leader.damage !== 0) {
      const endPoint =
        (element[0] +
          element[1] -
          CANVAS_SETTING.ROW_BAND * 2 +
          CANVAS_SETTING.ROW_BLANK) /
        (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK);
      const attackCount = heartArray.findIndex(
        (element) => element >= endPoint
      );
      damageArray[attackCount] += Number(leader.damage);
    }
  });
}

function calcHelper({
  data,
  heartArray,
  damageArray,
}: {
  data: RaidwarSkillData;
  heartArray: number[];
  damageArray: number[];
}) {
  const helper = data.helper[1];
  if (!helper) {
    return;
  } else if (!helper.heartNum || helper.heartNum < 1) {
    return;
  }

  const pointArray: number[][] = [];
  for (let i = 0; i < heartArray.length; i++) {
    if (i === 0) {
      const start = CANVAS_SETTING.ROW_BAND * 2;
      const length =
        helper.heartNum * CANVAS_SETTING.ROW_BAND +
        (helper.heartNum - 1) * CANVAS_SETTING.ROW_BLANK;

      const carryOver = 0;
      let carry = heartArray[0] - helper.heartNum;
      if (carry < 0) {
        carry = 0;
      }
      pointArray.push([start, length, carry, carryOver]);
    } else {
      const start =
        pointArray[i - 1][0] + pointArray[i - 1][1] + CANVAS_SETTING.ROW_BLANK;
      let length =
        helper.heartNum * 2 * CANVAS_SETTING.ROW_BAND +
        (helper.heartNum * 2 - 1) * CANVAS_SETTING.ROW_BLANK;

      // 繰り越し数の限界のため長さを水増し
      let carryOver = pointArray[i - 1][2] - (helper.heartNum * 2 - 1);
      if (carryOver > 0) {
        length +=
          carryOver * (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK);
      } else {
        carryOver = 0;
      }
      let carry =
        pointArray[i - 1][2] +
        (heartArray[1] - heartArray[0]) -
        helper.heartNum * 2 -
        carryOver;
      if (carry < 0) {
        carry = 0;
      }
      pointArray.push([start, length, carry, carryOver]);
    }
  }

  pointArray.forEach((element) => {
    if (helper.damage && helper.damage !== 0) {
      const endPoint =
        (element[0] +
          element[1] -
          CANVAS_SETTING.ROW_BAND * 2 +
          CANVAS_SETTING.ROW_BLANK) /
        (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK);
      const attackCount = heartArray.findIndex(
        (element) => element >= endPoint
      );
      damageArray[attackCount] += Number(helper.damage);
    }
  });
}

function calcMember({
  data,
  heartArray,
  damageArray,
}: {
  data: RaidwarSkillData;
  heartArray: number[];
  damageArray: number[];
}) {
  const sumHeartColumn = [0, 0, 0, 0];
  let baseLine = 0;
  let blankFlg = 0;
  let heartArrayIndex = 0;

  do {
    for (let i = 0; i < 49; i++) {
      // heartArrayが空になったら強制終了
      if (heartArray.length - heartArrayIndex <= 0) {
        blankFlg = 1;
        break;
      }

      const member = data["member"][i + 1];
      // ハート数が空白かマイナスのメンバに到達したら強制終了
      if (!member) {
        blankFlg = 1;
        break;
      } else if (!member.heartNum || member.heartNum < 1) {
        blankFlg = 1;
        break;
      }

      // このメンバーが入る位置を決定する。ベースライン以下の欄があるところ。
      const next_position = sumHeartColumn.findIndex(
        (element) => element <= baseLine
      );

      let carryOver =
        baseLine - sumHeartColumn[next_position] - (member.heartNum - 1);
      if (carryOver < 0) {
        carryOver = 0;
      }
      const y =
        CANVAS_SETTING.ROW_BAND * 2 +
        sumHeartColumn[next_position] *
          (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK);
      const height =
        member.heartNum * CANVAS_SETTING.ROW_BAND +
        (member.heartNum - 1) * CANVAS_SETTING.ROW_BLANK +
        carryOver * (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK);

      if (member.damage && member.damage !== 0) {
        const endPoint =
          (y +
            height -
            CANVAS_SETTING.ROW_BAND * 2 +
            CANVAS_SETTING.ROW_BLANK) /
          (CANVAS_SETTING.ROW_BAND + CANVAS_SETTING.ROW_BLANK);
        const attackCount = heartArray.findIndex(
          (element) => element >= endPoint
        );
        damageArray[attackCount] += Number(member.damage);
      }
      sumHeartColumn[next_position] += Number(member.heartNum) + carryOver;

      // 現在のベースライン内に次のメンバーが入れる位置が無い場合はベースラインを上げる。
      while (
        sumHeartColumn.findIndex((element) => element <= baseLine) === -1
      ) {
        let addHeart;
        if (baseLine === 0) {
          addHeart = heartArray[heartArrayIndex];
        } else {
          addHeart =
            heartArray[heartArrayIndex] - heartArray[heartArrayIndex - 1];
        }
        baseLine += addHeart;
        heartArrayIndex++;

        // 次のハート数が空の場合はwhileから抜ける
        if (heartArray[heartArrayIndex] === undefined) {
          blankFlg = 1;
          break;
        }
      }
    }
  } while (blankFlg === 0 && baseLine < CANVAS_SETTING.MAX_HEART);
}
