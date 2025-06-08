/**
 * 数値をロケール付きでフォーマットする
 *
 * @param value 数値または数値文字列（null, undefined, NaN, 空文字なども処理）
 * @param fallback null, undefined, NaN のときの数値 (省略時は"0")
 * @param locale ロケール（省略時は "ja-JP"）
 * @param options Intl.NumberFormatOptions（省略時は "{ style: "decimal", useGrouping: true }"）
 * @returns フォーマット済み文字列または "-"
 */
export function formatNumber(
  value: string | number | null | undefined,
  fallback: string = "0",
  locale: string = "ja-JP",
  options: Intl.NumberFormatOptions = { style: "decimal", useGrouping: true }
): string {
  let parsed: number;

  if (typeof value === "string") {
    // "" (空白)、"-" (マイナス) 一文字の場合は例外として何もしない
    // こうしないと0未満の数字を入れる際にマイナス記号から始められなくなるため
    if (value === "" || value === "-") return value;

    const cleaned = value.replace(/,/g, "").trim();
    parsed = Number(cleaned);
  } else {
    parsed = value ?? NaN;
  }

  if (isNaN(parsed)) {
    return fallback;
  }

  return parsed.toLocaleString(locale, options);
}
