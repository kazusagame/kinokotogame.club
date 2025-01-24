import { useEffect } from "react";

/**
 * useConditionalKeyPress - 特定のキーイベントをリッスンし、条件に応じてコールバックを実行するカスタムフック。
 *
 * @param targetKey - リッスンするキーのリスト
 * @param callback - キーが押されたときに実行される関数
 * @param isActive - リスニングを有効にするかどうかを制御するフラグ
 */
export default function useConditionalKeyPress(
  targetKey: string[],
  callback: (event: KeyboardEvent) => void,
  isActive: boolean
): void {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (targetKey.includes(event.key)) {
        callback(event);
      }
    };

    window.addEventListener("keyup", handleKeyDown);
    return () => {
      window.removeEventListener("keyup", handleKeyDown);
    };
  }, [targetKey, callback, isActive]);
}
