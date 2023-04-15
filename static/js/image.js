const sliderW = document.getElementById('slider-width');
const sliderValueW = document.getElementById('slider-value-width');

const sliderH = document.getElementById('slider-height');
const sliderValueH = document.getElementById('slider-value-height');

sliderW.addEventListener('input', () => {
    sliderValueW.textContent = sliderW.value;
});

sliderH.addEventListener('input', () => {
    sliderValueH.textContent = sliderH.value;
});

// 获取所有标签按钮和内容项
const imageTabs = document.querySelectorAll("nav button");
const imageContentItems = document.querySelectorAll(".content-item");

// 为每个标签按钮添加点击事件监听器
imageTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        // 隐藏所有内容项
        imageContentItems.forEach((item) => {
            item.classList.add("hidden");
        });

        // 显示与点击的标签对应的内容项
        imageContentItems[index].classList.remove("hidden");
    });
});

let prompt_detail = []

document.addEventListener('DOMContentLoaded', function () {
    // 获取所有类名为 my-class 的元素
    var myElements = document.getElementsByClassName('PromptItem');
    // 给每个元素添加 click 事件监听器
    for (var i = 0; i < myElements.length; i++) {
        myElements[i].addEventListener('click', function (event) {
            let leaf = event.currentTarget.getElementsByClassName("leaf_span");

            // 在控制台输出点击事件
            console.log('Clicked element:', leaf[0].textContent);
            if (prompt_detail.includes(leaf[0].textContent)) {

                const index = prompt_detail.indexOf(leaf[0].textContent);

                if (index !== -1) {
                    prompt_detail.splice(index, 1);
                }

            } else {
                prompt_detail.push(leaf[0].textContent);
            }

            let detail = document.getElementById("prompt-detail");
            detail.textContent = prompt_detail.join(', ');
            // 执行你想要的事件操作
            // ...
        });
    }
});