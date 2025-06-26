# サイト「きのことゲーム部 (kinokotogame.club)」開発環境

本リポジトリは、ガールフレンド(仮)等のゲームイベント攻略・記録・シミュレーションを支援するWebアプリ「きのことゲーム部」の開発用リポジトリです。

## 主な機能

- イベントシミュレーター（デッキ計算、スコアシミュレーション）
- イベント・エピソードアーカイブの閲覧

## 技術スタック

- Next.js (React)
- TypeScript
- Tailwind CSS
- Firebase

## 開発環境構築

1. Node.js（推奨バージョン: 18.x 以上）をインストール
2. 依存パッケージのインストール

   ```
   npm install
   ```

3. 開発サーバーの起動

   ```
   npm run dev
   ```

4. ブラウザで `http://localhost:3000` にアクセス

## ディレクトリ構成

- `/app` - 公開ディレクトリ構成
- `/components` - 共通的なUI部品
- `/features` - 各セクション用のUI部品やデータなど
- `/features/decksim/data` - シミュレーターが使用する各種定数データはこちらにあります
- `/lib` - ユーティリティ関数
- `/public` - 画像や静的ファイル

## 注意事項

- 本サイトは非公式のファンサイトです。ゲーム運営会社とは関係ありません。
- データや画像の著作権は各権利者に帰属します。

## 公開先

- GitHub Pages：https://kazusagame.github.io/kinokotogame.club/
- 本番環境：https://kinokotogame.club/

## ライセンス

このリポジトリのコードはMITライセンスで公開されています。詳細はLICENSEファイルを参照してください。
