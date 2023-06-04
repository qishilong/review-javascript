const initGame = () => {
    // 游戏配置
    const gameConfig = {
        width: 500,
        height: 500,
        imgUrl: './image/lol.png',  // 图片路径，注意：相对的是页面路径
        rows: 3, // 行数
        cols: 3, // 列数
        wrapper: document.getElementById('game'),   // 游戏的容器对象
        isOver: false, // 游戏是否结束
    }

    // 每一个小方块的宽高
    gameConfig.pieceWidth = gameConfig.width / gameConfig.rows;
    gameConfig.pieceHeight = gameConfig.height / gameConfig.cols;

    // 小方块的数量
    gameConfig.pieceNumber = gameConfig.cols * gameConfig.rows;

    // 游戏结束后出现的提示信息配置
    const messageConfig = {
        width: gameConfig.width,
        height: gameConfig.pieceHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        btnWidth: gameConfig.width / 2,
        btnHeight: gameConfig.pieceHeight / 3,
        fontSize: '30px'
    }

    // 判断是否相等函数
    const isEqual = (n1, n2) => parseInt(n1) === parseInt(n2);

    // 小方块的构造函数
    class Block {
        /**
         * left: 小方块当前的横坐标
         * top: 小方块当前的纵坐标
         * isVisible：小方块是否可见
         */
        constructor(left, top, isVisible) {
            this.left = left;
            this.top = top;
            this.isVisible = isVisible;
            this.correctLeft = this.left;   // 正确的横坐标
            this.correctTop = this.top; // 正确的纵坐标
            this.dom = document.createElement('div');
            this.dom.style.height = gameConfig.pieceHeight + 'px';
            this.dom.style.width = gameConfig.pieceWidth + 'px';
            this.dom.style.background = `url(${gameConfig.imgUrl}) -${this.correctLeft}px -${this.correctTop}px`;
            this.dom.style.position = 'absolute';
            this.dom.style.border = '1px solid #fff';
            this.dom.style.boxSizing = 'border-box';
            this.dom.style.cursor = 'pointer';
            this.dom.style.transition = '0.5s'; //css属性变化的时候，在0.5秒中内完成
            if (!isVisible) {
                this.dom.style.display = 'none'
            };
            this.show = function () {
                //根据当前的left、top，重新设置div的位置
                this.dom.style.left = this.left + "px";
                this.dom.style.top = this.top + "px";
            }
            this.show();
            gameConfig.wrapper.appendChild(this.dom)
        }

        // 判断当前方块是否在正确嘚位置上
        judgeCorrect() {
            return isEqual(this.left, this.correctLeft) && isEqual(this.top, this.correctTop);
        }
    }



    // 小方块数组
    const blocks = [];

    // 初始化游戏对象
    const gameWrapper = () => {
        gameConfig.wrapper.style.height = gameConfig.height + 'px';
        gameConfig.wrapper.style.width = gameConfig.width + 'px';
        gameConfig.wrapper.style.border = '2px solid #ccc';
        gameConfig.wrapper.style.position = 'relative';
    }

    // 初始化小方块数组
    const initBlockArray = () => {
        for (let i = 0; i < gameConfig.rows; i++) {
            let isVisible = true;
            for (let j = 0; j < gameConfig.cols; j++) {
                if (i === gameConfig.rows - 1 && j === gameConfig.cols - 1) {
                    isVisible = false;
                }
                blocks.push(new Block(j * gameConfig.pieceWidth, i * gameConfig.pieceHeight, isVisible))
            }
        }
    }

    // 小方块位置交换
    const exchange = (origin, target) => {
        // 方法一
        [origin.top, target.top] = [target.top, origin.top];
        [origin.left, target.left] = [target.left, origin.left];

        // 方法二
        // let temp = origin.left;
        // origin.left = target.left;
        // target.left = temp;

        // temp = origin.top;
        // origin.top = target.top;
        // target.top = temp;

        origin.show();
        target.show();
    }

    // 获取随机数
    const getRandom = (min, max) => {
        return Math.floor(Math.random() * (max + 1 - min) + min)
    }

    // 小方块数组洗牌
    const blocksArrayShuffle = () => {
        const length = blocks.length
        for (let i = 0; i < length - 1; i++) {
            // 随机产生一个下标
            const index = getRandom(0, blocks.length - 2);
            // 交换
            exchange(blocks[i], blocks[index]);
        }
    }

    // 判断游戏是否胜利
    const isWin = () => {
        const wrong = blocks.filter(item => !item.judgeCorrect())
        if (wrong.length === 0) {
            gameConfig.isOver = true;
            blocks.forEach(item => {
                item.dom.style.border = 'none';
                item.dom.style.display = 'block';
            })
            const messageDiv = document.createElement('div'),
                p = document.createElement('p'),
                restart = document.createElement('button'),
                body = document.getElementsByTagName('body')[0];
            messageDiv.style.height = messageConfig.height;
            messageDiv.style.width = messageConfig.width;
            messageDiv.style.display = messageConfig.display;
            messageDiv.style.flexDirection = messageConfig.flexDirection;
            messageDiv.style.alignItems = messageConfig.alignItems;
            messageDiv.style.fontSize = messageConfig.fontSize;
            messageDiv.style.justifyContent = messageConfig.justifyContent;
            p.innerHTML = '恭喜你，游戏胜利！'
            restart.innerText = '重新开始'
            restart.style.height = messageConfig.btnHeight;
            restart.style.width = messageConfig.btnWidth;
            restart.onclick = () => {
                body.innerHTML = `
                    <div id="game"></div>
                    <script src='./script/index.js'></script>
                `;
                initGame();
            };
            messageDiv.appendChild(p);
            messageDiv.appendChild(restart);
            body.appendChild(messageDiv);
        }
    }

    // 小方块点击事件
    const blockClickFn = () => {
        // 找到空白的小方块
        // filter 返回的是一个数组，应该使用 find 
        // const blankBlock = blocks.filter(item => item.isVisible === false);
        var blankBlock = blocks.find(item => !item.isVisible);

        blocks.forEach(item => {
            item.dom.onclick = () => {
                if (gameConfig.isOver) {
                    return;
                }

                // 交换当前方块和看不见的方块的坐标位置
                if (item.top === blankBlock.top && isEqual(Math.abs(item.left - blankBlock.left), gameConfig.pieceWidth) || item.left === blankBlock.left && isEqual(Math.abs(item.top - blankBlock.top), gameConfig.pieceHeight)) {
                    exchange(item, blankBlock);
                }

                // 判断是否胜利
                isWin();

                // //交换当前方块和看不见的方块的坐标位置
                // exchange(item, blankBlock);
                // //游戏结束判定
                // isWin();
            }
        })
    }

    // 1. 初始化游戏对象
    gameWrapper()

    /**
     * 2. 初始化小方块数组
     *      a. 准备好一个数组，数组的每一项是一个对象，记录了每个小方块的详细信息
     *      b. 数组洗牌
     */
    // a. 准备好一个数组，数组的每一项是一个对象，记录了每个小方块的详细信息
    initBlockArray();
    // b. 数组洗牌
    blocksArrayShuffle();

    // 3. 注册点击事件
    blockClickFn();
}

initGame();