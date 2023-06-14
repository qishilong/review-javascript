
// const config = {
//     vHeight: document.documentElement.clientHeight,
//     vWidth: document.documentElement.clientWidth,
//     // pagerWidth: pagerStyle.width,
//     // paperHeight: pagerStyle.height,
//     input: document.querySelector('input'),
//     paper: document.querySelector('.paper')
// }
// config.paperStyle = getComputedStyle(config.paper);
// config.pagerWidth = config.paperStyle.width;
// config.pagerHeight = config.paperStyle.height;

const config = {
    container: document.querySelector('.container'),
    input: document.querySelector('input'),
    vHeight: document.documentElement.clientHeight,
    vWidth: document.documentElement.clientWidth,
    paperWidth: 170,
    paperHeight: 170,
    // 设置默认的许愿卡
    defaultWishArray: ['好好学习', '吃好吃的饭'],
    document: document.documentElement,
    zIndex: 0
};

// 不能使用下面这种方法进行简化代码，因为 document.document.clientHeight、document.documentElement.clientWidth 获取的不是实时的视口宽度
// config.maxPaperTop = config.vHeight - config.paperHeight - 100;
// config.maxPaperLeft = config.vWidth - config.paperWidth;

/**
 * 得到一个随机数，可以得到最大值
 * @param {*} min 最小值
 * @param {*} max 最大值
 */
const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) + min);
};

// 实现许愿功能
const createWishPaper = (value) => {
    const div = document.createElement('div');
    div.className = 'paper';
    div.innerHTML = `<p>${value}</p><span>X</span>`;

    // 设置 div 的随机背景色
    div.style.backgroundColor = `rgb(${getRandom(100, 200)}, ${getRandom(100, 200)}, ${getRandom(100, 200)})`;

    // 设置 div 的大小
    div.style.width = config.paperWidth + 'px';
    div.style.height = config.paperHeight + 'px';

    // 设置 div 位置
    div.style.top = getRandom(0, document.documentElement.clientHeight - config.paperHeight - 100) + 'px';
    div.style.left = getRandom(0, document.documentElement.clientWidth - config.paperWidth) + 'px';
    config.container.appendChild(div);
};

const initWishPaper = () => config.defaultWishArray.forEach((item) => createWishPaper(item));

/**
 * 得到可移动的 div
 * @param {*} dom
 * @return {*} dom
 */
const getDivElement = (dom) => {
    if (dom.className === 'paper') {
        return dom;
    } else if (dom.parentElement && dom.parentElement.className === 'paper' && dom.tagName === 'P') {
        return dom.parentElement;
    }
};

// 实现拖拽功能
window.onmousedown = (e) => {
    const div = getDivElement(e.target);
    if (!div) {
        return;
    }
    div.style.zIndex = config.zIndex;
    config.zIndex++;
    const divStyle = getComputedStyle(div);
    const divLeft = parseFloat(divStyle.left);
    const divTop = parseFloat(divStyle.top);
    const pageX = e.pageX;
    const pageY = e.pageY;
    window.onmousemove = (e) => {
        const disX = e.pageX - pageX;
        const dixY = e.pageY - pageY;
        let newLeft = divLeft + disX;
        let newTop = divTop + dixY;
        if (newLeft < 0) {
            newLeft = 0;
        }
        if (newLeft > document.documentElement.clientWidth - config.paperWidth) {
            newLeft = document.documentElement.clientWidth - config.paperWidth;
        }
        if (newTop < 0) {
            newTop = 0;
        }
        if (newTop > document.documentElement.clientHeight - config.paperHeight - 100) {
            newTop = document.documentElement.clientHeight - config.paperHeight - 100;
        }

        div.style.top = newTop + 'px';
        div.style.left = newLeft + 'px';
    }
    window.onmouseup = window.onmouseleave = () => {
        window.onmousemove = null;
    }
}

// 实现关闭功能
window.onclick = (e) => {
    if (e.target.parentElement && e.target.parentElement.className === 'paper' && e.target.tagName === 'SPAN') {
        e.target.parentElement.remove()
    }
}

config.input.onkeydown = (e) => {
    if (e.key === 'Enter') {
        if (e.target.value) {
            createWishPaper(e.target.value)
            e.target.value = ''
        }
    }
}

window.onresize = () => {
    // 重新调整所有 paper 的 top、left 值
    const disY = document.documentElement.clientHeight - config.vHeight;
    const disX = document.documentElement.clientWidth - config.vWidth;
    const children = config.container.children;
    const length = children.length;
    for (let i = 0; i < length; i++) {
        const paper = children[i];

        // 改变 paper 的 left 值
        const left = parseFloat(paper.style.left);
        const right = config.vWidth - left - config.paperWidth;
        const newLeft = left + left / (left + right) * disX;
        paper.style.left = newLeft + 'px';

        // 改变 paper 的 top 值
        const top = parseFloat(paper.style.top);
        const bottom = config.vHeight - top - config.paperHeight;
        const newTop = top + top / (top + bottom) * disY;
        paper.style.top = newTop + 'px';
    }
    config.vHeight = document.documentElement.clientHeight;
    config.vWidth = document.documentElement.clientWidth;
}

initWishPaper();


