import { GameMode } from "./GameModeSelector";

export interface GameData {
  lstMember: number[][]; // 対戦リスト表（マージソート分割後）
  parent: number[]; // 各対戦リストの分割前の親ノード番号
  cmp1: number; // 現在の対戦リストのインデックス(左)
  cmp2: number; // 現在の対戦リストのインデックス(右)
  head1: number; // 対戦リスト中の現在のガールのインデックス(左)
  head2: number; // 対戦リスト中の現在のガールのインデックス(右)
  equal: number[]; // 引き分け結果の保存場所
  rec: number[]; // 現在のリストvsリストのマージ結果の一時保存場所
  nrec: number; // recの現在の最老インデックス
  numQuestion: number; // 現在の対戦番号
  totalSize: number; // 全体ソート数
  finishSize: number; // 完了ソート数
  selectHistory: number[][]; // 選択履歴
}
export const INITIAL_GAME_DATA: GameData = {
  lstMember: [],
  parent: [],
  cmp1: 0,
  cmp2: 0,
  head1: 0,
  head2: 0,
  equal: [],
  rec: [],
  nrec: 0,
  numQuestion: 1,
  totalSize: 0,
  finishSize: 0,
  selectHistory: [],
} as const;

// ゲームデータの初期化
export const initializeGameData = (
  sortTargetNameList: (string | number)[],
  gameMode: GameMode
): GameData => {
  const {
    lstMember,
    parent,
    head1,
    head2,
    nrec,
    numQuestion,
    finishSize,
    selectHistory,
  } = structuredClone(INITIAL_GAME_DATA);
  let { rec, cmp1, cmp2, equal, totalSize } =
    structuredClone(INITIAL_GAME_DATA);

  const indexList = sortTargetNameList.map((_, i) => i);
  // 対戦順をランダム化する
  if (gameMode.config.Randomize === true) {
    for (let i = indexList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexList[i], indexList[j]] = [indexList[j], indexList[i]];
    }
  }
  lstMember[0] = indexList;
  parent[0] = -1;
  equal = Array(indexList.length).fill(-1);
  rec = Array(indexList.length).fill(0);

  // 対戦マップの作成
  // 要素数が２以上なら２分割し、分割された配列をlstMemberの最後に加える
  let n = 1;
  for (let i = 0; i < lstMember.length; i++) {
    if (lstMember[i].length >= 2) {
      const mid = Math.ceil(lstMember[i].length / 2);
      lstMember[n] = lstMember[i].slice(0, mid);
      totalSize += lstMember[n].length;
      parent[n] = i;
      n++;
      lstMember[n] = lstMember[i].slice(mid, lstMember[i].length);
      totalSize += lstMember[n].length;
      parent[n] = i;
      n++;
    }
  }
  // 最初の対戦カード
  cmp1 = lstMember.length - 2;
  cmp2 = lstMember.length - 1;

  return {
    lstMember,
    parent,
    cmp1,
    cmp2,
    head1,
    head2,
    equal,
    rec,
    nrec,
    numQuestion,
    totalSize,
    finishSize,
    selectHistory,
  };
};

// キャラクター選択時のソートアルゴリズム本体
export const selectCharacter = (gameData: GameData, flag: number): GameData => {
  const { parent, equal, rec, totalSize, selectHistory } =
    structuredClone(gameData);
  let { lstMember, cmp1, cmp2, head1, head2, nrec, numQuestion, finishSize } =
    structuredClone(gameData);

  // 選択履歴に結果を保存
  selectHistory.push([
    numQuestion,
    flag,
    lstMember[cmp1][head1],
    lstMember[cmp2][head2],
  ]);

  switch (flag) {
    /* -1: 左を選択 */
    case -1:
      rec[nrec] = lstMember[cmp1][head1];
      head1++;
      nrec++;
      finishSize++;
      /* 次のガールが引き分けの場合は先取りして積み込む */
      while (equal[rec[nrec - 1]] != -1) {
        rec[nrec] = lstMember[cmp1][head1];
        head1++;
        nrec++;
        finishSize++;
      }
      break;

    /* 1: 右を選択 */
    case 1:
      rec[nrec] = lstMember[cmp2][head2];
      head2++;
      nrec++;
      finishSize++;
      /* 次のガールが引き分けの場合は先取りして積み込む */
      while (equal[rec[nrec - 1]] != -1) {
        rec[nrec] = lstMember[cmp2][head2];
        head2++;
        nrec++;
        finishSize++;
      }
      break;

    /* 0: 引き分けを選択 */
    case 0:
      /* 先に左側を選択結果に積み込む */
      rec[nrec] = lstMember[cmp1][head1];
      head1++;
      nrec++;
      finishSize++;
      /* 次のガールが引き分けの場合は先取りして積み込む */
      while (equal[rec[nrec - 1]] != -1) {
        rec[nrec] = lstMember[cmp1][head1];
        head1++;
        nrec++;
        finishSize++;
      }

      // 今回の引き分け結果を保存
      equal[rec[nrec - 1]] = lstMember[cmp2][head2];

      /* 次に右側を選択結果に積み込む */
      rec[nrec] = lstMember[cmp2][head2];
      head2++;
      nrec++;
      finishSize++;
      while (equal[rec[nrec - 1]] != -1) {
        rec[nrec] = lstMember[cmp2][head2];
        head2++;
        nrec++;
        finishSize++;
      }
      break;

    /* 2: 両者をリストから除外する */
    default:
      // 全ての配列リストから両者の番号を除外する
      // 2次元配列内の全ての要素を map → filter で比較して、番号がどちらか片方と一致している場合はその要素を除外する
      const newLstMember = lstMember.map((list, index) => {
        const newList = list.filter((element) => {
          if (
            element === lstMember[cmp1][head1] ||
            element === lstMember[cmp2][head2]
          ) {
            // root以外での番号除外時はfinishSizeを増やす
            if (index !== 0) {
              finishSize++;
            }
            return false;
          } else {
            return true;
          }
        });
        return newList;
      });
      lstMember = newLstMember;
      break;
  }

  // 片方のリストを走査し終えた後の処理
  if (head1 < lstMember[cmp1].length && head2 == lstMember[cmp2].length) {
    // リストcmp2が走査済 - リストcmp1の残りをコピー
    while (head1 < lstMember[cmp1].length) {
      rec[nrec] = lstMember[cmp1][head1];
      head1++;
      nrec++;
      finishSize++;
    }
  } else if (
    head1 == lstMember[cmp1].length &&
    head2 < lstMember[cmp2].length
  ) {
    // リストcmp1が走査済 - リストcmp2の残りをコピー
    while (head2 < lstMember[cmp2].length) {
      rec[nrec] = lstMember[cmp2][head2];
      head2++;
      nrec++;
      finishSize++;
    }
  }

  // 両方のリストが最後に到達した場合は親リストを更新する
  if (head1 == lstMember[cmp1].length && head2 == lstMember[cmp2].length) {
    lstMember[parent[cmp1]] = rec.slice(
      0,
      lstMember[cmp1].length + lstMember[cmp2].length
    );

    // 次のリストの比較を行う前に諸々を初期化
    lstMember.pop();
    lstMember.pop();
    cmp1 = cmp1 - 2;
    cmp2 = cmp2 - 2;
    head1 = 0;
    head2 = 0;
    rec.fill(0);
    nrec = 0;

    // 次の比較対象に空リストが含まれる場合の処理 (要繰り返し)
    while (
      cmp1 >= 1 &&
      (lstMember[cmp1].length === 0 || lstMember[cmp2].length === 0)
    ) {
      if (lstMember[cmp1].length === 0 && lstMember[cmp2].length !== 0) {
        // cmp1だけ空の場合、cmp2を親リストにコピーして次へ
        finishSize += lstMember[cmp2].length;
        lstMember[parent[cmp1]] = [...lstMember[cmp2]];
        lstMember.pop();
        lstMember.pop();
        cmp1 = cmp1 - 2;
        cmp2 = cmp2 - 2;
      } else if (lstMember[cmp1].length !== 0 && lstMember[cmp2].length === 0) {
        // cmp2だけ空の場合、cmp1を親リストにコピーして次へ
        finishSize += lstMember[cmp1].length;
        lstMember[parent[cmp1]] = [...lstMember[cmp1]];
        lstMember.pop();
        lstMember.pop();
        cmp1 = cmp1 - 2;
        cmp2 = cmp2 - 2;
      } else if (lstMember[cmp1].length === 0 && lstMember[cmp2].length === 0) {
        // 両方空の場合、親リストを空にして次へ
        lstMember[parent[cmp1]] = [];
        lstMember.pop();
        lstMember.pop();
        cmp1 = cmp1 - 2;
        cmp2 = cmp2 - 2;
      }
    }
  }
  numQuestion++;

  return {
    lstMember,
    parent,
    cmp1,
    cmp2,
    head1,
    head2,
    equal,
    rec,
    nrec,
    numQuestion,
    totalSize,
    finishSize,
    selectHistory,
  };
};
