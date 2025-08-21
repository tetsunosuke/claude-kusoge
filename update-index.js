const fs = require('fs');
const path = require('path');

function updateIndexHtml() {
    const rootDir = __dirname;
    const indexPath = path.join(rootDir, 'index.html');
    
    // ゲームディレクトリを探す
    const gameDirectories = fs.readdirSync(rootDir)
        .filter(item => {
            const itemPath = path.join(rootDir, item);
            return fs.statSync(itemPath).isDirectory() && 
                   fs.existsSync(path.join(itemPath, 'index.html')) &&
                   !item.startsWith('.') &&
                   item !== 'node_modules';
        });
    
    console.log('発見されたゲームディレクトリ:', gameDirectories);
    
    // ゲーム名のマッピング
    const gameNames = {
        'gradius': '🚀 Gradius風シューティング',
        'mario': '🍄 Mario風アクション',
        'tetris': '🧩 Tetris風パズル',
        'pacman': '👻 Pac-Man風',
        'breakout': '🏓 Breakout風',
        'snake': '🐍 Snake風',
        'frogger': '🐸 Frogger風',
        'invaders': '👾 Space Invaders風'
    };
    
    // ゲームリンクを生成
    const gameLinks = gameDirectories
        .map(dir => {
            const displayName = gameNames[dir] || `🎮 ${dir.charAt(0).toUpperCase() + dir.slice(1)}`;
            return `        <a href="./${dir}/" class="game-link">${displayName}</a>`;
        })
        .join('\n');
    
    // index.htmlテンプレート
    const indexContent = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Claude クソゲー集</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            background-color: #000;
            color: #00ff00;
            margin: 0;
            padding: 20px;
            text-align: center;
        }
        h1 {
            font-size: 2.5em;
            margin-bottom: 30px;
            text-shadow: 0 0 10px #00ff00;
        }
        .games-container {
            max-width: 600px;
            margin: 0 auto;
        }
        .game-link {
            display: block;
            background-color: #001100;
            border: 2px solid #00ff00;
            color: #00ff00;
            text-decoration: none;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            transition: all 0.3s ease;
            font-size: 1.2em;
        }
        .game-link:hover {
            background-color: #00ff00;
            color: #000;
            box-shadow: 0 0 20px #00ff00;
        }
        .footer {
            margin-top: 50px;
            font-size: 0.8em;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <h1>🎮 Claude クソゲー集 🎮</h1>
    <div class="games-container">
        <!-- ゲームリンクは自動生成されます -->
${gameLinks}
    </div>
    <div class="footer">
        <p>Claudeで作成されたレトロゲーム集</p>
        <p>最終更新: ${new Date().toLocaleString('ja-JP')}</p>
    </div>
</body>
</html>`;
    
    // index.htmlを更新
    fs.writeFileSync(indexPath, indexContent, 'utf8');
    console.log('index.htmlを更新しました');
    console.log(`${gameDirectories.length}個のゲームが見つかりました`);
}

if (require.main === module) {
    updateIndexHtml();
}

module.exports = { updateIndexHtml };