const { execSync } = require('child_process');
const { updateIndexHtml } = require('./update-index');

function deploy() {
    console.log('🚀 デプロイプロセスを開始します...');
    
    try {
        // 1. index.htmlを更新
        console.log('📝 index.htmlを更新中...');
        updateIndexHtml();
        
        // 2. gitの状態を確認
        console.log('📊 Gitの状態を確認中...');
        try {
            const status = execSync('git status --porcelain', { encoding: 'utf8' });
            if (!status.trim()) {
                console.log('✅ 変更がありません。デプロイをスキップします。');
                return;
            }
        } catch (error) {
            console.log('⚠️  Git状態の確認に失敗しました。続行します...');
        }
        
        // 3. ファイルをステージングに追加
        console.log('📦 ファイルをステージングに追加中...');
        execSync('git add .', { stdio: 'inherit' });
        
        // 4. コミット
        const timestamp = new Date().toLocaleString('ja-JP');
        const commitMessage = `🎮 ゲーム集を更新 - ${timestamp}`;
        console.log('💾 コミット中...');
        execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
        
        // 5. プッシュ
        console.log('🌐 リモートリポジトリにプッシュ中...');
        execSync('git push origin main', { stdio: 'inherit' });
        
        console.log('✅ デプロイが完了しました！');
        console.log('🎉 Vercelで自動的にデプロイされます。');
        
    } catch (error) {
        console.error('❌ デプロイ中にエラーが発生しました:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    deploy();
}

module.exports = { deploy };