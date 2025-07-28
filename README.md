# CSV Table React Application

CSV ファイルを読み込んでテーブル形式で表示し、検索・ソート機能を提供する React アプリケーションです。

## 機能

- 📊 CSV ファイルの読み込みとテーブル表示
- 🔍 リアルタイム検索機能（全項目対応）
- 📈 各列でのソート機能（昇順/降順）
- 🎨 モダンな UI/UX デザイン
- 📱 レスポンシブ対応

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone git@github.com:Matsudo-S/sample_csv_react.git
cd sample_csv_react
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. アプリケーションの起動

```bash
npm start
```

ブラウザで `http://localhost:3000` にアクセスしてアプリケーションを確認できます。

## 使用技術

- **React 19.1.0** - UI ライブラリ
- **React Router DOM 7.7.1** - ルーティング
- **PapaParse** - CSV パースライブラリ
- **Create React App** - 開発環境

## ファイル構成

```
src/
├── components/
│   ├── CsvTable/
│   │   ├── CsvTable.jsx    # CSVテーブル表示コンポーネント
│   │   └── CsvTable.css    # テーブルスタイル
│   ├── Header/
│   │   └── Header.jsx      # ヘッダーコンポーネント
│   └── Home/
│       ├── Home.js         # ホームページ
│       └── Home.css        # ホームページスタイル
├── App.js                  # メインアプリケーション
└── index.js               # エントリーポイント

public/
└── sample.csv             # サンプルCSVファイル
```

## セキュリティ注意事項

現在のバージョンには一部のセキュリティ脆弱性が含まれています。本番環境で使用する場合は、以下のコマンドで修正することを推奨します：

```bash
npm audit fix --force
```

ただし、このコマンドは破壊的変更を含む可能性があるため、事前にバックアップを取ることをお勧めします。

## カスタマイズ

### CSV ファイルの変更

`public/sample.csv` を編集することで、表示するデータを変更できます。

### スタイルの変更

`src/components/CsvTable/CsvTable.css` を編集することで、テーブルの見た目をカスタマイズできます。

## ライセンス

MIT License
