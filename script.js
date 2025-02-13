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
    try {
        const output = document.getElementById('output');
        output.style.transform = 'rotateX(90deg)';
        output.style.opacity = '0';
        output.innerHTML = '<span style="color: #999;">正在生成祝福语...</span>';
        
        setTimeout(() => {
            const category = blessings[type];
            const randomIndex = Math.floor(Math.random() * category.length);
            output.innerHTML = category[randomIndex];
            output.style.transform = 'rotateX(0deg)';
            output.style.opacity = '1';
            output.classList.add('animate');
            setTimeout(() => output.classList.remove('animate'), 500);
        }, 200);
    } catch (error) {
        console.error('生成祝福语时出错:', error);
        output.innerHTML = '抱歉，生成祝福语时出现错误，请重试。';
    }
}

function copyToClipboard() {
    const text = document.getElementById('output').innerText;
    if (text) {
        navigator.clipboard.writeText(text).then(() => {
            alert('祝福语已复制到剪贴板！');
        }).catch(() => {
            alert('复制失败，请手动复制。');
        });
    } else {
        alert('请先生成祝福语！');
    }
}

function shareBlessing() {
    const text = document.getElementById('output').innerText;
    if (!text) {
        alert('请先生成祝福语！');
        return;
    }
    
    // 创建分享弹窗
    const shareUrl = 'https://newyear-puce.vercel.app/';
    const shareTitle = '春节祝福';
    const shareText = encodeURIComponent(`${text}\n\n来自春节祝福生成器：${shareUrl}`);
    
    // 创建分享弹窗的HTML
    const shareDialog = document.createElement('div');
    shareDialog.className = 'share-dialog';
    shareDialog.innerHTML = `
        <div class="share-content">
            <h3>分享到</h3>
            <div class="share-buttons">
                <button onclick="window.open('http://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${shareText}', '_blank', 'width=600,height=500')">
                    <img src="https://api.iconify.design/simple-icons:sinaweibo.svg?color=%23e6162d" alt="微博">
                    微博
                </button>
                <button onclick="shareToWechat()">
                    <img src="https://api.iconify.design/simple-icons:wechat.svg?color=%2307c160" alt="微信">
                    微信
                </button>
                <button onclick="window.open('https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}&desc=${shareText}', '_blank', 'width=600,height=500')">
                    <img src="https://api.iconify.design/simple-icons:tencentqq.svg?color=%23eb1923" alt="QQ">
                    QQ
                </button>
            </div>
            <button class="close-button" onclick="this.parentElement.parentElement.remove()">关闭</button>
        </div>
    `;
    document.body.appendChild(shareDialog);
}

// 微信分享处理函数
function shareToWechat() {
    const text = document.getElementById('output').innerText;
    const shareUrl = 'https://newyear-puce.vercel.app/';
    
    // 如果已经存在二维码弹窗，先移除
    const existingDialog = document.querySelector('.qr-dialog');
    if (existingDialog) {
        existingDialog.remove();
    }

    // 创建二维码弹窗
    const qrDialog = document.createElement('div');
    qrDialog.className = 'qr-dialog';
    qrDialog.innerHTML = `
        <div class="qr-content">
            <h3>微信分享说明</h3>
            <p class="share-tip">1. 点击右上角菜单按钮</p>
            <p class="share-tip">2. 点击"分享给朋友"或"分享到朋友圈"</p>
            <div class="share-text">
                <p>${text}</p>
                <p class="share-source">来自春节祝福生成器：${shareUrl}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()">关闭</button>
        </div>
    `;
    document.body.appendChild(qrDialog);
}

// 页面加载完成后自动生成一条传统祝福
window.onload = () => generateBlessing('traditional');

// 添加按钮点击波纹效果
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => ripple.remove(), 600);
    });
});