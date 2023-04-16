const tabs = document.querySelectorAll("nav button");
const contentItems = document.querySelectorAll(".content-item");

// 为每个标签按钮添加点击事件监听器
tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        tabs.forEach((tab2, index2) => {
            tab2.classList.remove("bg-gray-600")
            tab2.classList.remove("bg-gray-900")

            if (index2 === index) {
                tabs[index].classList.add("bg-gray-600");
            } else {
                tab2.classList.add("bg-gray-900")
            }
        })

        // 隐藏所有内容项
        contentItems.forEach((item) => {
            item.classList.add("hidden");
        });

        // 显示与点击的标签对应的内容项
        contentItems[index].classList.remove("hidden");
    });
});

poems = [
    '\n' +
    '《心花》\n' +
    '\n' +
    '月亮映照着雪白的野花\n' +
    '冬天终于结束了\n' +
    '春天的阳光照在了大地上\n' +
    '但我感受到的却是心脏的痛\n' +
    '\n' +
    '每一次跳动都像一把刀\n' +
    '刺痛我的心脏\n' +
    '我无法控制这种疼痛\n' +
    '就像无法控制春天的花朵一样\n' +
    '\n' +
    '这种痛苦是如此鲜明\n' +
    '如同鲜红的血液在我的身体里流淌\n' +
    '但我知道，就像野花一样\n' +
    '我会在春天里重生\n' +
    '\n' +
    '我的心脏\n' +
    '虽然被痛苦刺伤\n' +
    '但它仍在绽放\n' +
    '像春天里的花朵一样\n' +
    '\n' +
    '这绽放的美丽\n' +
    '是痛苦之外的一种存在\n' +
    '虽然我无法完全解释\n' +
    '但它却在我的内心深处\n' +
    '\n' +
    '我抬头仰望着明亮的月亮\n' +
    '那种美丽与痛苦交织\n' +
    '就像我的心脏之花\n' +
    '绽放在春天的风中',

    '\n' +
    '《春夜》\n' +
    '\n' +
    '在这个春天的夜晚，\n' +
    '我走在雪白的路上。\n' +
    '血液在我的心脏中涌动，\n' +
    '像野花在田野中绽放。\n' +
    '\n' +
    '月亮挂在天空中，\n' +
    '照亮了我的道路。\n' +
    '我走过冰冷的溪流，\n' +
    '心中涌动着不安的情绪。\n' +
    '\n' +
    '我不断地向前走，\n' +
    '脚下的雪花在我身后飞舞。\n' +
    '我不停地想象，\n' +
    '我将要到达的未来。\n' +
    '\n' +
    '无论前方是否有障碍，\n' +
    '我都不会停下脚步。\n' +
    '我的内心像那野花一样，\n' +
    '在春天中茁壮成长。',
    '\n' +
    '《深情》\n' +
    '\n' +
    '春天，已经悄然离去\n' +
    '留下一地凄凉的残痕\n' +
    '心脏在胸腔中跳动\n' +
    '像是敲打着失落的钟声' +
    '\n' +
    '你的离开，像雪花般静默\n' +
    '落在我的心扉，慢慢融化\n' +
    '我踏上雪地，寻找你的影子\n' +
    '但脚印已被春风掩埋\n' +
    '\n' +
    '无数个夜晚，我凝视着月亮\n' +
    '试图寻找一点温暖\n' +
    '但它只是冰冷的陌生\n' +
    '让我倍感孤独和无助\n' +
    '\n' +
    '我试着逃离这份深情挂念\n' +
    '但心脏却像野花一般生长\n' +
    '在内心深处，缠绕不休\n' +
    '让我陷入无尽的矛盾与迷惘\n' +
    '\n' +
    '或许，春天终将过去\n' +
    '野花凋谢，心脏平静\n' +
    '但月亮依旧高挂天空\n' +
    '注视着我永恒的不安',
]

poetry_txts = document.getElementsByClassName("poetry")
for (let i = 0; i < poetry_txts.length; i++) {
    let txt = poetry_txts[i]
    txt.textContent = poems[i]
}