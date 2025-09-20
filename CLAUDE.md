# CLAUDE.md

このファイルは、このリポジトリで作業する際にClaude Code (claude.ai/code) へのガイダンスを提供します。

## コマンド

### ビルド
```bash
npm run build          # CommonJSとESMモジュールの両方をビルド
npm run build:common   # CommonJSモジュールのみをビルド
npm run build:esm      # ESMモジュールのみをビルド
```

### テスト
```bash
npm test              # Jestで全てのテストを実行
npm run test          # 上記と同じ
```

### ドキュメント
```bash
npm run doc           # docs/typedoc/ にTypeDocドキュメントを生成
```

### 開発ワークフロー
```bash
npm run prepare       # 自動的にビルドを実行（npm installで実行される）
```

## プロジェクト構成

AttrPathは、文字列記法を使用してJavaScriptオブジェクトの属性パスを安全に辿るためのTypeScriptライブラリです。コアアーキテクチャは以下で構成されています：

### コアコンポーネント

**AttrPath (src/index.ts)** - 静的メソッドを持つメインAPIクラス：
- `traverse(target, path, default_value?)` - オブジェクトパスを安全にナビゲート
- `update(target, path, value)` - 特定のパスで値を更新
- `is_valid(path)` - パス構文を検証

**パーサーシステム (src/parser.ts)**：
- `AttributeParser` - 属性パス文字列のメインパーサー
- `FormulaParser` - 数式表現の拡張パーサー
- `BaseParser` - 共有パーサー機能
- `TokenType` - パーシング用のトークンタイプを定義するEnum

**ハンドラーシステム (src/handler.ts)**：
- `ValueHandler` - パス走査中に値を抽出
- `Updater` - パス走査中に値を更新
- `BaseHandler` - ハンドラー実装の抽象ベース

**ストリーム処理 (src/stream.ts)**：
- `ParserStream` - パス解析のための文字ストリーム処理

**ユーティリティ (src/base.ts)**：
- 型チェックユーティリティ（`isNumber`、`isContainer`、`isValue`）

### パス構文

ライブラリは複雑なパス表現をサポートします：
- オブジェクトプロパティ：`.property` または `['property']`
- 配列インデックス：`[0]` または `[index]`
- 混合パス：`.children.john.hobby[1].name`
- ドット付きキー：`['children.john']`

### ビルドシステム

デュアルモジュールサポート：
- **CommonJS**：`tsconfig.json`を使用して`dist/`にビルド
- **ESM**：`tsconfig.esm.json`を使用して`dist/esm/`にビルド

両方のビルドにはTypeScript宣言とソースマップが含まれます。

### テスト

- **フレームワーク**：ts-jest transformerを使用したJest
- **カバレッジ**：`docs/coverage/`に出力で有効
- **テストファイル**：`src/test.ts`に配置
- **設定**：`jest.config.ts`

テストスイートは、コアAPI、パーシングロジック、および安全な走査のエッジケースをカバーしています。