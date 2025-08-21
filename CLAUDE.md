# Claude クソゲー集プロジェクト

## プロジェクト概要
Claudeで作成されたレトロゲーム集のコレクションです。各ゲームはHTML5 CanvasとJavaScriptで実装されており、Vercelで自動デプロイされます。

## プロジェクト構造
```
claude-kusoge/
├── index.html          # メインランディングページ
├── gradius/            # Gradius風シューティングゲーム
├── mario/              # Mario風アクションゲーム
├── update-index.js     # index.html自動更新スクリプト
├── deploy.js           # 自動デプロイスクリプト
└── package.json        # npmスクリプト定義
```

## よくあるタスク

### デプロイメント
新しいゲームを追加した後や既存のゲームを更新した後に実行:
```bash
node deploy.js
```

### index.htmlの更新
新しいゲームディレクトリを追加した後にメインページのリンクを更新:
```bash
node update-index.js
```

### ローカル開発
ローカルでサーバーを起動してテスト:
```bash
npm run dev
```

### 新しいゲームの追加
1. 新しいディレクトリを作成（例: `tetris/`）
2. そのディレクトリに `index.html` を作成
3. `node update-index.js` を実行してメインページを更新
4. `node deploy.js` を実行してデプロイ

### トラブルシューティング
- **デプロイエラー**: Gitの状態を確認 (`git status`)
- **リンクが表示されない**: `update-index.js` を実行
- **ローカルテスト**: ブラウザで `index.html` を直接開く

## デプロイフロー
1. `update-index.js` がゲームディレクトリを自動検出
2. `index.html` を最新のゲームリンクで更新
3. Git add, commit, push を実行
4. Vercelが自動的にデプロイを開始