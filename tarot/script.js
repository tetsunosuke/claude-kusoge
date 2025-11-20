const tarotDeck = [
    { id: 0, name: "The Fool", nameJa: "愚者", icon: "🤡", meaningUp: "自由、始まり、冒険、無邪気、可能性", meaningRev: "無計画、軽率、愚行、逃避" },
    { id: 1, name: "The Magician", nameJa: "魔術師", icon: "🪄", meaningUp: "創造、自信、スキル、意志、手腕", meaningRev: "混迷、スランプ、裏切り、優柔不断" },
    { id: 2, name: "The High Priestess", nameJa: "女教皇", icon: "🌙", meaningUp: "知性、神秘、静寂、洞察力", meaningRev: "神経質、悲観、無気力、孤立" },
    { id: 3, name: "The Empress", nameJa: "女帝", icon: "👑", meaningUp: "豊穣、母性、繁栄、情熱、包容力", meaningRev: "浪費、嫉妬、怠惰、過保護" },
    { id: 4, name: "The Emperor", nameJa: "皇帝", icon: "🤴", meaningUp: "支配、安定、責任感、実行力", meaningRev: "横暴、未熟、意志薄弱、過信" },
    { id: 5, name: "The Hierophant", nameJa: "法王", icon: "⛪", meaningUp: "慈悲、連帯、協調性、信頼、法", meaningRev: "束縛、不信感、独りよがり、虚栄" },
    { id: 6, name: "The Lovers", nameJa: "恋人", icon: "❤️", meaningUp: "情熱、選択、調和、共感、絆", meaningRev: "誘惑、不調和、離別、空回り" },
    { id: 7, name: "The Chariot", nameJa: "戦車", icon: "🛒", meaningUp: "勝利、征服、行動力、前進", meaningRev: "暴走、挫折、焦り、好戦的" },
    { id: 8, name: "Strength", nameJa: "力", icon: "🦁", meaningUp: "力量、不屈、忍耐、自制心", meaningRev: "甘え、無気力、人任せ、優柔不断" },
    { id: 9, name: "The Hermit", nameJa: "隠者", icon: "🕯️", meaningUp: "深慮、探求、悟り、思慮分別", meaningRev: "閉鎖的、陰湿、疎外感、偏屈" },
    { id: 10, name: "Wheel of Fortune", nameJa: "運命の輪", icon: "🎡", meaningUp: "転機、好機、進展、宿命", meaningRev: "悪化、すれ違い、不運、降格" },
    { id: 11, name: "Justice", nameJa: "正義", icon: "⚖️", meaningUp: "公正、均衡、誠実、正当性", meaningRev: "不正、偏見、不均衡、一方通行" },
    { id: 12, name: "The Hanged Man", nameJa: "吊るされた男", icon: "🧘", meaningUp: "奉仕、試練、着実、抑制", meaningRev: "徒労、痩せ我慢、自暴自棄" },
    { id: 13, name: "Death", nameJa: "死神", icon: "💀", meaningUp: "終末、清算、離別、再出発", meaningRev: "再生、起死回生、未練、停滞" },
    { id: 14, name: "Temperance", nameJa: "節制", icon: "🥛", meaningUp: "調和、自制、献身、管理", meaningRev: "浪費、消耗、不均衡、生活の乱れ" },
    { id: 15, name: "The Devil", nameJa: "悪魔", icon: "😈", meaningUp: "誘惑、束縛、堕落、執着", meaningRev: "回復、覚醒、断ち切る" },
    { id: 16, name: "The Tower", nameJa: "塔", icon: "⚡", meaningUp: "崩壊、災害、悲劇、急変", meaningRev: "緊迫、誤解、不幸中、再建" },
    { id: 17, name: "The Star", nameJa: "星", icon: "⭐", meaningUp: "希望、ひらめき、願い、憧れ", meaningRev: "失望、無気力、高望み" },
    { id: 18, name: "The Moon", nameJa: "月", icon: "🌔", meaningUp: "不安、曖昧、胸騒ぎ、幻影", meaningRev: "回復、徐々に好転、真実" },
    { id: 19, name: "The Sun", nameJa: "太陽", icon: "☀️", meaningUp: "成功、誕生、祝福、約束された未来", meaningRev: "不調、延期、中止、見込み違い" },
    { id: 20, name: "Judgement", nameJa: "審判", icon: "🎺", meaningUp: "復活、結果、改善、覚醒", meaningRev: "悔恨、行き詰まり、悪い知らせ" },
    { id: 21, name: "The World", nameJa: "世界", icon: "🌍", meaningUp: "完成、完全、達成、旅立ち", meaningRev: "未完成、中途半端、遅延" }
];

const positions = {
    1: "現状",
    2: "障害・対策",
    3: "顕在意識（目標）",
    4: "潜在意識（本心）",
    5: "過去",
    6: "未来",
    7: "本人の立場",
    8: "周囲の状況",
    9: "願望・恐れ",
    10: "最終結果"
};

let currentSpread = [];

document.addEventListener('DOMContentLoaded', () => {
    const shuffleBtn = document.getElementById('shuffle-btn');
    const resetBtn = document.getElementById('reset-btn');

    shuffleBtn.addEventListener('click', startReading);
    resetBtn.addEventListener('click', resetBoard);
});

function startReading() {
    const shuffleBtn = document.getElementById('shuffle-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultArea = document.getElementById('reading-result');
    const resultContent = document.getElementById('result-content');

    // Reset UI
    resultContent.innerHTML = '';
    resultArea.classList.remove('visible');
    resultArea.classList.add('hidden');

    // Shuffle and select 10 cards
    const shuffled = [...tarotDeck].sort(() => Math.random() - 0.5);
    currentSpread = shuffled.slice(0, 10).map(card => ({
        ...card,
        isReversed: Math.random() < 0.3 // 30% chance of reversal
    }));

    // Clear board
    document.querySelectorAll('.card-slot').forEach(slot => {
        slot.innerHTML = '';
    });

    // Deal animation
    currentSpread.forEach((cardData, index) => {
        const pos = index + 1;
        const slot = document.querySelector(`.slot-${pos}`);

        setTimeout(() => {
            const cardElement = createCardElement(cardData, pos);
            slot.appendChild(cardElement);

            // Add click event to flip
            cardElement.addEventListener('click', () => {
                if (!cardElement.classList.contains('flipped')) {
                    cardElement.classList.add('flipped');
                    showCardMeaning(cardData, pos);
                }
            });
        }, index * 300); // Delay for each card
    });

    shuffleBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';

    setTimeout(() => {
        resultArea.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        requestAnimationFrame(() => {
            resultArea.classList.add('visible');
        });
    }, 3500);
}

function createCardElement(cardData, pos) {
    const card = document.createElement('div');
    card.className = 'card';

    const front = document.createElement('div');
    front.className = `card-face card-front ${cardData.isReversed ? 'reversed' : ''}`;

    const back = document.createElement('div');
    back.className = 'card-face card-back';

    // Front content
    const arcanaNum = document.createElement('div');
    arcanaNum.className = 'card-arcana-num';
    arcanaNum.textContent = toRoman(cardData.id);

    const icon = document.createElement('div');
    icon.className = 'card-image-placeholder';
    icon.textContent = cardData.icon;

    const name = document.createElement('div');
    name.className = 'card-name';
    name.textContent = cardData.nameJa;

    const positionLabel = document.createElement('div');
    positionLabel.style.fontSize = '0.6rem';
    positionLabel.style.marginTop = 'auto';
    positionLabel.style.opacity = '0.7';
    positionLabel.textContent = cardData.isReversed ? '(逆位置)' : '(正位置)';

    front.appendChild(arcanaNum);
    front.appendChild(icon);
    front.appendChild(name);
    front.appendChild(positionLabel);

    card.appendChild(back);
    card.appendChild(front);

    return card;
}

function showCardMeaning(cardData, pos) {
    const resultContent = document.getElementById('result-content');

    // Check if this position is already shown
    if (document.getElementById(`result-pos-${pos}`)) return;

    const item = document.createElement('div');
    item.className = 'result-item';
    item.id = `result-pos-${pos}`;
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.5s ease';

    const meaning = cardData.isReversed ? cardData.meaningRev : cardData.meaningUp;
    const positionName = positions[pos];

    item.innerHTML = `
        <div class="result-pos-num">${pos}</div>
        <div class="result-text">
            <h3>${positionName}: ${cardData.nameJa} ${cardData.isReversed ? '(逆位置)' : '(正位置)'}</h3>
            <p><span class="card-meaning-highlight">${meaning}</span></p>
        </div>
    `;

    // Insert in order
    const items = resultContent.children;
    let inserted = false;
    for (let i = 0; i < items.length; i++) {
        const currentPos = parseInt(items[i].id.split('-')[2]);
        if (pos < currentPos) {
            resultContent.insertBefore(item, items[i]);
            inserted = true;
            break;
        }
    }
    if (!inserted) {
        resultContent.appendChild(item);
    }

    // Animate in
    requestAnimationFrame(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
    });
}

function resetBoard() {
    const shuffleBtn = document.getElementById('shuffle-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultArea = document.getElementById('reading-result');

    document.querySelectorAll('.card-slot').forEach(slot => {
        slot.innerHTML = '';
    });

    resultArea.classList.remove('visible');
    setTimeout(() => {
        resultArea.classList.add('hidden');
        document.getElementById('result-content').innerHTML = '';
    }, 500);

    shuffleBtn.style.display = 'inline-block';
    resetBtn.style.display = 'none';
}

function toRoman(num) {
    if (num === 0) return "0";
    const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    let roman = '', i;
    for (i in lookup) {
        while (num >= lookup[i]) {
            roman += i;
            num -= lookup[i];
        }
    }
    return roman;
}
