/**
 * 数値を表す文字を数値(number型)で返す
 *
 * @param value 数値または数値文字列（null, undefined, NaN, 空文字なども処理）
 * @param fallback null, undefined, NaN のときの数値 (省略時は0)
 * @returns 数値
 */
export function returnNumber(
  value: string | number | null | undefined,
  fallback: number = 0,
): number {
  let parsed: number;

  if (typeof value === "string") {
    const cleaned = value.replace(/,/g, "").trim();
    parsed = Number(cleaned);
  } else {
    parsed = value ?? NaN;
  }

  if (isNaN(parsed)) {
    return fallback;
  }

  return parsed;
}
