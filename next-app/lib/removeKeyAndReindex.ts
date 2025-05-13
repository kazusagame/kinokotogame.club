/**
 * プロパティが数値のオブジェクトから指定したキーを除外し、残りのプロパティを1からの連番キーに変換する関数
 *
 * @param obj プロパティが数値のオブジェクト
 * @param keyToRemove number 除外するキー
 * @returns 変換後のオブジェクト
 */
export function removeKeyAndReindex(
  obj: { [K: number]: unknown },
  keyToRemove: number
): { [K: number]: unknown } {

  // 対象のキーを除いた値の配列を作る（元の順序で）
  const values = Object.keys(obj)
    .map(Number)
    .sort((a, b) => a - b) // 数値として昇順に並べる
    .filter((key) => key !== keyToRemove)
    .map((key) => obj[key]);

  // 値を1からの連番キーに変換して新しいオブジェクトを作成
  const newObj: { [K: number]: unknown } = {};
  values.forEach((value, index) => {
    newObj[index + 1] = value;
  });

  return newObj;
}
