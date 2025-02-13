const blessings = {
    traditional: [
        "爆竹声中一岁除，春风送暖入屠苏。千门万户曈曈日，总把新桃换旧符。祝新春快乐，万事如意！",
        "恭贺新禧！愿您岁岁平安，年年有余，吉祥如意，心想事成！",
        "新春到，福气照，愿您阖家欢乐，幸福安康！"
    ],
    modern: [
        "🎉新春快乐！愿你的代码永无BUG，生活充满HAPPY，新年新气象！🚀",
        "🐯虎年大吉！愿您的事业像Git分支一样稳定发展，生活像持续集成一样顺利！",
        "💻给程序员的新春祝福：愿您写的代码永远一次通过，遇到的难题都有最优解！"
    ],
    humorous: [
        "祝您新年：头发浓密不脱发，需求永远不改版，产品经理不加班！",
        "新春快乐！愿您的工资像二叉树一样增长，bug像链表一样减少！",
        "🐰兔飞猛进！愿您：左手奶茶右手炸鸡，躺着也能改需求！"
    ]
};

function generateBlessing(type) {
    const output = document.getElementById('output');
    const category = blessings[type];
    const randomIndex = Math.floor(Math.random() * category.length);
    output.innerHTML = category[randomIndex];
    output.classList.add('animate');
    setTimeout(() => output.classList.remove('animate'), 500);
}

function copyToClipboard() {
    const text = document.getElementById('output').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('祝福语已复制到剪贴板！');
    });
}

function shareBlessing() {
    const text = document.getElementById('output').innerText;
    if (navigator.share) {
        navigator.share({
            title: '春节祝福',
            text: text,
        });
    } else {
        alert('当前浏览器不支持分享功能，请手动复制分享');
    }
}