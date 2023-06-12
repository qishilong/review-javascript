// 方法一
// 初始化
const init = () => {
    const divNormal = document.querySelector('.normal');
    const divEnlargement = document.querySelector('.enlargement');
    const divContainer = document.querySelector('.container');
    const divNormalStyle = getComputedStyle(divNormal);
    const divEnlargementStyle = getComputedStyle(divEnlargement)

    // 页面配置
    const config = {
        smallBgPath: './images/mouse.jpg',  // 小图路径
        bigBgPath: './images/mouseBigSize.jpg', // 大图路径
        divNormal: divNormal,   // 小图 div DOM 元素
        divEnlargement: divEnlargement, // 大图 div DOM 元素
        divContainer: divContainer, // 可移动的div
        smallImgSize: {
            // 因为小图在小 div 中的布局是 left top/100% 100%，也就是 contain，所以小图片的尺寸和小 div 的大小相同
            width: parseFloat(divNormalStyle.width),
            height: parseFloat(divNormalStyle.height)
        },
        divEnlargementSize: {
            // 大的 div 的尺寸
            width: parseFloat(divEnlargementStyle.width),
            height: parseFloat(divEnlargementStyle.height)
        },
        bigImgSize: {
            // 大图尺寸，大图尺寸无法通过 getComputedStyle 方法获取，暂时只能写死
            width: 800,
            height: 800
        }
    }
    // 计算可移动的 div 的宽高
    config.containerSize = {
        width: config.divEnlargementSize.width / config.bigImgSize.width * config.smallImgSize.width,
        height: config.divEnlargementSize.height / config.bigImgSize.height * config.smallImgSize.height
    }

    // 初始化 div 背景
    const initDivBg = () => {
        config.divNormal.style.background = `url(${config.smallBgPath}) no-repeat left top/contain`;
        config.divEnlargement.style.background = `url(${config.bigBgPath}) no-repeat`;
    }

    // 初始化可移动 div 的宽高
    const initDivContainer = () => {
        config.divContainer.style.width = config.containerSize.width + 'px';
        config.divContainer.style.height = config.containerSize.height + 'px';
    }

    // 初始化小 div 的的鼠标移动事件
    const initNormalDivFn = () => {
        config.divNormal.onmouseenter = () => {
            config.divContainer.style.display = 'block';
            config.divEnlargement.style.display = 'block';
        }
        config.divNormal.onmouseleave = () => {
            config.divContainer.style.display = 'none';
            config.divEnlargement.style.display = 'none';
        }

        /**
         * 根据鼠标事件参数，得到鼠标在 divNormal 中的坐标
         * @param {MouseEvent} e 
         */
        const getOffset = (e) => {
            if (e.target === config.divNormal) {
                // 事件源是 divNormal
                return {
                    x: e.offsetX,
                    y: e.offsetY
                };
            } else {
                // 事件源是 divContainer
                const divContainerStyle = getComputedStyle(divContainer);
                return {
                    x: parseFloat(divContainerStyle.left) + e.offsetX + 1, // 加 1 是因为边框
                    y: parseFloat(divContainerStyle.top) + e.offsetY + 1
                }
            }
        }

        // 根据鼠标在 divNormal 中的位置，设置 divContainer 的坐标
        const setPositionDivContainer = (offset) => {
            let left = offset.x - config.containerSize.width / 2;
            let top = offset.y - config.containerSize.height / 2;

            if (left < 0) {
                left = 0
            }
            if (top < 0) {
                top = 0
            }
            if (left > config.smallImgSize.width - config.containerSize.width) {
                left = config.smallImgSize.width - config.containerSize.width;
            }
            if (top > config.smallImgSize.height - config.containerSize.height) {
                top = config.smallImgSize.height - config.containerSize.height;
            }

            config.divContainer.style.top = top + 'px';
            config.divContainer.style.left = left + 'px'
        }

        // 设置大图背景图位置
        const setDivEnlargementBgImgPosition = () => {
            const divContainerStyle = getComputedStyle(config.divContainer);
            const left = parseFloat(divContainerStyle.left);
            const top = parseFloat(divContainerStyle.top);
            const bgLeft = left / config.smallImgSize.width * config.bigImgSize.width;
            const bgTop = top / config.smallImgSize.height * config.bigImgSize.height;
            config.divEnlargement.style.backgroundPosition = `-${bgLeft}px -${bgTop}px`;
        }

        config.divNormal.onmousemove = (e) => {
            const offset = getOffset(e);
            setPositionDivContainer(offset);
            setDivEnlargementBgImgPosition()
        }
    }

    initNormalDivFn()
    initDivBg()
    initDivContainer()
}

init()

// 方法二
/**
 * 初始化
 */
// (function () {
//     const divBig = document.querySelector('.big');
//     const divSmall = document.querySelector('.small');
//     const divMove = document.querySelector('.small .move')
//     const smallImgStyle = getComputedStyle(divSmall);
//     const divBigStyle = getComputedStyle(divBig)
//     //配置
//     var config = {
//         smallBg: "images/mouse.jpg", // 小图背景路径
//         bigBg: "images/mouseBigSize.jpg", //大图背景路径
//         divBig: divBig, //大图div dom元素
//         divSmall: divSmall, //小图div dom元素
//         divMove: divMove, //可移动的div
//         smallImgSize: { //小图尺寸
//             width: parseFloat(smallImgStyle.width),
//             height: parseFloat(smallImgStyle.height)
//         },
//         divBigSize: { //大的div的尺寸
//             width: parseFloat(divBigStyle.width),
//             height: parseFloat(divBigStyle.height)
//         },
//         bigImgSize: {
//             //大图尺寸，大图尺寸无法通过 getComputedStyle 方法获取，暂时只能写死
//             width: 800,
//             height: 800
//         }
//     };
//     //计算可移动的div的宽高
//     config.moveSize = {
//         width: config.divBigSize.width / config.bigImgSize.width * config.smallImgSize.width,
//         height: config.divBigSize.height / config.bigImgSize.height * config.smallImgSize.height,
//     };

//     initDivBg();
//     initMoveDiv();
//     initDivSmallEvent();

//     /**
//      * 初始化div背景
//      */
//     function initDivBg() {
//         config.divSmall.style.background = `url("${config.smallBg}") no-repeat left top/100% 100%`;
//         config.divBig.style.background = `url("${config.bigBg}") no-repeat`;
//     }

//     /**
//      * 初始化可移动的div
//      */
//     function initMoveDiv() {
//         config.divMove.style.width = config.moveSize.width + "px";
//         config.divMove.style.height = config.moveSize.height + "px";
//     }

//     /**
//      * 初始化小图div的鼠标事件
//      */
//     function initDivSmallEvent() {
//         config.divSmall.onmouseenter = function () {
//             config.divMove.style.display = "block";
//             config.divBig.style.display = "block";
//         }
//         config.divSmall.onmouseleave = function () {
//             config.divMove.style.display = "none";
//             config.divBig.style.display = "none";
//         }

//         config.divSmall.onmousemove = function (e) {
//             var offset = getOffset(e);
//             setPosition(offset);
//             setBigBgPosition();
//         }

//         /**
//          * 设置大图背景图位置
//          */
//         function setBigBgPosition() {
//             var style = getComputedStyle(config.divMove);
//             var left = parseFloat(style.left);
//             var top = parseFloat(style.top);

//             var bgLeft = left / config.smallImgSize.width * config.bigImgSize.width;
//             var bgTop = top / config.smallImgSize.height * config.bigImgSize.height;
//             config.divBig.style.backgroundPosition = `-${bgLeft}px -${bgTop}px`;
//         }

//         /**
//          * 根据鼠标坐标，设置divMove的坐标
//          * @param {*} offset 
//          */
//         function setPosition(offset) {
//             var left = offset.x - config.moveSize.width / 2;
//             var top = offset.y - config.moveSize.height / 2;
//             // const divMoveStyle = getComputedStyle(config.divMove)
//             // console.log('offset', offset.y, offset.x)
//             // console.log('position', top, left)
//             // console.log('divMove', divMoveStyle.top, divMoveStyle.left)
//             // console.log('left+top', left, top)
//             // console.log(bigImgStyle.backgroundSize)
//             // console.log(parseFloat(divBigStyle.width))
//             // console.log(parseFloat(divBigStyle.height))
//             if (left < 0) {
//                 left = 0;
//             }
//             if (top < 0) {
//                 top = 0;
//             }
//             if (left > config.smallImgSize.width - config.moveSize.width) {
//                 left = config.smallImgSize.width - config.moveSize.width;
//             }
//             if (top > config.smallImgSize.height - config.moveSize.height) {
//                 top = config.smallImgSize.height - config.moveSize.height;
//             }
//             config.divMove.style.left = left + "px";
//             config.divMove.style.top = top + "px";
//         }

//         /**
//          * 根据鼠标事件参数，得到鼠标在divsmall中的坐标
//          * @param {MouseEvent} e 
//          */
//         function getOffset(e) {
//             if (e.target === config.divSmall) {
//                 return {
//                     x: e.offsetX,
//                     y: e.offsetY
//                 }
//             }
//             else {
//                 //事件源是divMove
//                 var style = getComputedStyle(config.divMove);
//                 var left = parseFloat(style.left);
//                 var top = parseFloat(style.top);
//                 return {
//                     x: e.offsetX + left + 1, //加1是因为边框
//                     y: e.offsetY + top + 1
//                 }
//             }
//         }
//     }
// }())