import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  FirestoreError,
  QuerySnapshot,
} from "firebase/firestore";

import { database as db } from "@/lib/firebase/initialize";

/**
 * @class Firestoreからデータのダウンロードを行うクラス
 */
class DatabaseLoader {
  private collectionId: string;
  private profileId: number;

  /**
   * @constructor
   * @param {{
   *     collectionId: string;
   *     profileId: number;
   *   }} param0
   * @param {string} param0.collectionId - Collection名およびテーブルを挿入するID名
   * @param {number} param0.profileId - 検索対象のプロフィールID
   */
  constructor({
    collectionId,
    profileId,
  }: {
    collectionId: string;
    profileId: number;
  }) {
    this.collectionId = collectionId;
    this.profileId = profileId;
  }

  /**
   * Firestore DBへのクエリを行い、結果に基づいてPromise<QuerySnapshot>を返す
   *
   * @returns {Promise<QuerySnapshot>} - 成功/失敗
   */
  query(): Promise<QuerySnapshot> {
    return new Promise(async (resolve, reject) => {
      const q = query(
        collection(db, this.collectionId),
        where("MainCharacterIds", "array-contains", this.profileId),
        orderBy("ScenarioId")
      );
      try {
        const data = await getDocs(q);
        return resolve(data);
      } catch (e) {
        let error = new Error("予期せぬエラーが発生しました");
        if (e instanceof FirestoreError && e.code === "resource-exhausted") {
          error = new Error(
            "外部データベースの使用量が本日の上限に到達しました。"
          );
        }
        return reject(error);
      }
    });
  }
}

interface SearchProps {
  COLLECTION_LIST: string[];
  profileId: number;
}

interface ResultProps {
  status: "success" | "fail";
  reason?: "string";
  data?: { [K: string]: string | number | number[] }[];
}

/**
 * firebase firestoreへのエピソードクエリをまとめて受け取り、リザルトをまとめて返す
 *
 * @export
 * @param {SearchProps} param0
 * @param {string[]} param0.COLLECTION_LIST 検索対象とするコレクションIDの配列
 * @param {number} param0.profileId ガールのプロフィールID
 */
export async function searchEpisode({
  COLLECTION_LIST,
  profileId,
}: SearchProps): Promise<ResultProps[]> {
  const promises = COLLECTION_LIST.map((collectionId) => {
    const loader = new DatabaseLoader({ collectionId, profileId });
    return loader.query();
  });

  const allResults = await Promise.allSettled(promises);
  const res: ResultProps[] = [];
  for (const result of allResults) {
    if (result["status"] === "fulfilled") {
      const tempData: { [K: string]: string | number }[] = [];
      result["value"].forEach((doc) => {
        const docData = doc.data();
        tempData.push(docData);
      });
      res.push({
        status: "success",
        data: tempData,
      });
    } else {
      res.push({
        status: "fail",
        reason: result["reason"],
      });
    }
  }
  return res;
}
