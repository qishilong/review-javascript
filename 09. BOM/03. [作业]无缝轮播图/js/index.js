class Slideshow {
    /**
     * Creates an instance of Slideshow.
     * @param {*} imgArr 图片数组
     * @param {*} imgNumber 图片数量
     * @param {*} imgWidth 每张图片的宽度
     * @param {*} imgHeight 每张图片的高度
     * @param {*} dotWidth 小圆点的宽度
     * @param {*} dotHeight 小圆点的高度
     * @param {*} doms  涉及的 DOM 对象
     * @param {*} style  涉及的 DOM 对象的自定义样式
     * @param {*} timer 运动的计时器配置
     * @param {*} currentIndex  //实际的图片索引，0 ~ imgNumber-1
     * @param {*} autoTimer  //自动轮播的计时器配置
     * @memberof Slideshow
     */
    constructor(
        imgArr,
        imgNumber,
        imgWidth,
        imgHeight,
        dotWidth,
        dotHeight,
        doms,
        style,
        timer,
        currentIndex,
        autoTimer
    ) {
        this.imgArr = imgArr;
        this.imgNumber = imgNumber;
        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        this.dotWidth = dotWidth;
        this.dotHeight = dotHeight;
        this.doms = doms;
        this.style = style;
        this.timer = timer;
        this.currentIndex = currentIndex;
        this.autoTimer = null;  // 自动移动的计时器 id
        this.autoTimer = autoTimer;
        // 总距离
        this.totalWidth = this.imgNumber * this.imgWidth;
        this.init();
        this.registerEventFn();
    }

    // 初始化 banner
    initBanner = () => {
        this.doms.divBanner.style.width = this.imgWidth + 'px';
        this.doms.divBanner.style.height = this.imgHeight + 'px';
    }

    // 初始化 images
    initImages = () => {
        this.doms.divImages.style.width = this.imgWidth * (this.imgNumber + 2) + 'px';
        this.doms.divImages.style.height = this.imgHeight + 'px';

        // 设置图片的初始位置
        const left = (-this.currentIndex - 1) * this.imgWidth;
        this.doms.divImages.style.marginLeft = left + 'px';
    }

    // 初始化 img
    initImg = () => {
        const frag = document.createDocumentFragment();
        this.imgArr = [this.imgArr[this.imgNumber - 1], ...this.imgArr, this.imgArr[0]];
        for (const src of this.imgArr) {
            const a = document.createElement('a')
            const img = document.createElement('img');
            img.src = src;
            img.style.height = this.imgHeight;
            img.style.width = this.imgWidth;
            a.appendChild(img)
            frag.appendChild(a);
        }
        this.doms.divImages.appendChild(frag);
        // const children = this.doms.divImages.children;
        // const firstImg = children[0], lastImg = children[children.length - 1];
        // const newLastImg = firstImg.clone(true);   // 深度克隆
        // this.doms.divImages.appendChild(newLastImg);
        // const newFirstImg = lastImg.clone(true);
        // this.doms.divImages.insertBefore(newFirstImg, firstImg);
    }

    // 初始化左右箭头样式
    initArrowSpan = () => {
        const frag = document.createDocumentFragment();

    }

    // 判断小原点是否是活跃状态
    judgeDotIsActive = () => {
        const dotsChildren = this.doms.divDots.children;
        for (let i = 0; i < this.imgNumber; i++) {
            if (i === this.currentIndex) {
                dotsChildren[i].className = 'active';
            } else {
                dotsChildren[i].className = '';
            }
        }
    }

    // 初始化 dots
    initDots = () => {
        this.doms.divDots.style.width = (this.dotWidth + 6) * this.imgNumber + 'px';
        const frag = document.createDocumentFragment()
        for (let i = 0; i < this.imgNumber; i++) {
            const span = document.createElement('span');
            span.style.width = this.dotWidth;
            span.style.height = this.dotHeight;
            frag.appendChild(span)
        }
        this.doms.divDots.appendChild(frag);
        this.judgeDotIsActive();
    }

    init = () => {
        this.initBanner();
        this.initImages();
        this.initImg();
        this.initDots();
    }

    /**
     * 切换到某个图片的索引
     * @param {*} index 要切换的目标索引
     * @param {*} direction 方向 'left' 'right' [轮播图箭头的方向]
     * @memberof Slideshow
     */
    switchTo = (index, direction) => {
        if (index === this.currentIndex) {
            return;
        }
        if (!direction) {
            direction = 'right';
        }

        // 停止计时器
        const stopAnimate = () => {
            clearInterval(this.timer.id);
            this.timer.id = null;
        }

        // 新的 currentIndex
        this.currentIndex = index;
        // 重新设置小圆点状态
        this.judgeDotIsActive();

        // 最终的 marginLeft
        const newMarginLeft = (-index - 1) * this.imgWidth;

        // 逐步改变 marginLeft
        const animationSwitch = () => {
            // 如果之前有动画，先停止之前的动画
            if (this.timer.id) {
                stopAnimate()
            }

            /** 
             * 任务步骤：
             * 1. 计算运动的次数
             * 2. 计算总距离
             * 3. 计算每次运动的改变的距离
             * 4. 改变 marginLeft
            */
            // 1. 计算运动的次数
            const totalNumber = Math.ceil(this.timer.total / this.timer.duration);
            // 当前运动的次数
            let currentNumber = 0;
            // 2. 计算总距离
            let marginLeft = parseFloat(getComputedStyle(this.doms.divImages).marginLeft),
                distance = null;

            // 判断改变的距离
            if (direction === 'right') {
                if (newMarginLeft < marginLeft) {
                    distance = newMarginLeft - marginLeft;
                } else {
                    distance = -(this.totalWidth - Math.abs(newMarginLeft - marginLeft));
                }
            } else {
                if (newMarginLeft > marginLeft) {
                    distance = newMarginLeft - marginLeft;
                } else {
                    distance = this.totalWidth - Math.abs(newMarginLeft - marginLeft);
                }
            }

            // 3. 计算每次改变的距离
            const everyDistance = distance / totalNumber;

            this.timer.id = setInterval(() => {
                // 改变 divImages 的 marginLeft
                marginLeft += everyDistance;
                if (direction === 'right' && Math.abs(marginLeft) > this.totalWidth) {
                    marginLeft += this.totalWidth;
                } else if (direction === 'left' && Math.abs(marginLeft) < this.imgWidth) {
                    marginLeft -= this.totalWidth;
                }
                this.doms.divImages.style.marginLeft = marginLeft + 'px';
                currentNumber++;
                if (currentNumber === totalNumber) {
                    stopAnimate();
                }
            }, this.timer.duration)
        }

        animationSwitch();
    }

    // 注册点击事件、鼠标移入移出事件
    registerEventFn = () => {

        const toLeft = () => {
            let index = this.currentIndex - 1;
            if (index < 0) {
                index = this.imgNumber - 1;
            }
            this.switchTo(index, 'left');
        }

        const toRight = () => {
            const index = (this.currentIndex + 1) % this.imgNumber;
            this.switchTo(index, 'right');
        }
        this.doms.divArrow.onclick = (e) => {
            if (e.target.classList.contains('left')) {
                toLeft()
            } else if (e.target.classList.contains('right')) {
                toRight()
            }
        }
        this.doms.divDots.onclick = (e) => {
            if (e.target.tagName === 'SPAN') {
                const index = Array.from(this.doms.divDots.children).indexOf(e.target);
                this.switchTo(index, index > this.currentIndex ? 'right' : 'left');
            }
        }

        this.autoTimer.id = setInterval(toRight, this.autoTimer.duration);

        this.doms.divBanner.onmouseenter = () => {
            clearInterval(this.autoTimer.id);
            this.autoTimer.id = null;
        }

        this.doms.divBanner.onmouseleave = () => {
            if (this.autoTimer.id) {
                return;
            }
            this.autoTimer.id = setInterval(toRight, this.autoTimer.duration);
        }
    }
}

const config = {
    imgArr: ['./images/1.png', './images/2.png', './images/3.png', './images/4.png', './images/5.png'],
    imgNumber: 5,
    imgWidth: 564,
    imgHeight: 315,
    dotWidth: 8,
    dotHeight: 8,
    doms: {
        divBanner: document.querySelector(".banner"),
        divImages: document.querySelector(".banner .images"),
        divDots: document.querySelector(".banner .dots"),
        divArrow: document.querySelector(".banner .arrow")
    },
    style: {
        divBannerStyle: '',
        divImagesStyle: '',
        divDotsStyle: '',
        divArrowStyle: ''
    },
    timer: {
        duration: 16, //运动间隔的时间，单位毫秒
        total: 300, //运动的总时间，单位毫秒
        id: null //计时器id
    },
    currentIndex: 0,
    autoTimer: {
        id: null,   // 自动轮播计时器 id 
        duration: 2000  // 自动轮播时间间隔
    }
}

const slideshow = new Slideshow(
    config.imgArr,
    config.imgNumber,
    config.imgWidth,
    config.imgHeight,
    config.dotWidth,
    config.dotHeight,
    config.doms,
    config.style,
    config.timer,
    config.currentIndex,
    config.autoTimer
)

