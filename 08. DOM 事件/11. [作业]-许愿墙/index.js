
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
    document: document.documentElement
};
config.maxPaperTop = config.vHeight - config.paperHeight - 100;
config.maxPaperLeft = config.vWidth - config.paperWidth;

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
    div.style.top = getRandom(0, config.maxPaperTop) + 'px';
    div.style.left = getRandom(0, config.maxPaperTop) + 'px';
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

window.onmousedown = (e) => {
    const div = getDivElement(e.target);
    if (!div) {
        return;
    }
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
        if (newLeft > config.maxPaperLeft) {
            newLeft = config.maxPaperLeft;
        }
        if (newTop < 0) {
            newTop = 0;
        }
        if (newTop > config.maxPaperTop) {
            newTop = config.maxPaperTop;
        }

        div.style.top = newTop + 'px';
        div.style.left = newLeft + 'px';
    }
    window.onmouseup = window.onmouseleave = () => {
        window.onmousemove = null;
    }
}

initWishPaper();


