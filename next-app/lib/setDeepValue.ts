// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = { [key: string]: any };
type Primitive = string | number | boolean;

/**
 * 参照渡しされたオブジェクト内の該当プロパティに値を設定する。
 * 存在しない上位プロパティは生成する。
 *
 * @export
 * @param {AnyObject} obj
 * @param {string} path chapter.section.titleなど
 * @param {Primitive | { [key: string]: Primitive }} value
 */
export function setDeepValue(
  obj: AnyObject,
  path: string,
  value: Primitive | { [key: string]: Primitive }
): void {
  const keys = path.split(".");
  if (keys.length === 0) return;

  const lastKey = keys.pop()!;
  const target = keys.reduce((acc, key) => {
    if (!(key in acc)) acc[key] = {};
    return acc[key];
  }, obj);

  target[lastKey] = value;
}
