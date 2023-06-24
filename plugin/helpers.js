if (!this.myPlugin) {
    this.myPlugin = {};
}

this.myPlugin.inherit = (function () {
    const Temp = function () { };
    return function (son, father) {
        Temp.prototype = father.prototype;
        son.prototype = new Temp();
        son.prototype.constructor = son;
        son.prototype.uber = father.prototype;
        // 更方便的写法
        // son.prototype.uber = father;
        // 这样写之后可以直接调用父类的构造函数
    }
}())

// 将 obj2 混合到 obj1 产生新的对象
this.myPlugin.mixin = function (obj1, obj2) {
    // 方法一
    // const newObj = {};

    // // 复制 obj2 的属性
    // for (const key in obj2) {
    //     newObj[key] = obj2[key];
    // }

    // // 找到 obj1 中有但 obj2 中没有的属性
    // for (const key in obj1) {
    //     if (!(key in obj2)) {
    //         newObj[key] = obj1[key];
    //     }
    // }

    // return newObj;

    // 方法二
    return Object.assign({}, obj1, obj2)
}

/**
 * 是否深度克隆一个对象
 * @param {boolean} 是否深度克隆
 */
this.myPlugin.clone = function (obj, deep) {
    if (Array.isArray(obj)) {
        if (deep) {
            // 深度克隆
            const newArr = [];
            for (const item of obj) {
                newArr.push(this.clone(item, deep));
            }
            return newArr;
        } else {
            return obj.slice(); // 复制数组
        }
    } else if (typeof obj === 'object') {
        const newObj = {};
        for (const key in obj) {
            if (deep) {
                // 深度克隆
                newObj[key] = this.clone(obj[key], deep);
            } else {
                newObj[key] = obj[key]
            }
        }
        return newObj;
    } else {
        // 函数、原始类型
        return obj; // 递归终止条件
    }
}

// 函数防抖
this.myPlugin.debounce = function (callback, duration) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);    // 清除之前的计时器
        }
        const args = arguments; // 用闭包保存参数数组
        timer = setTimeout(function () {
            callback.apply(null, args)
        }, duration)
    }
}

/**
 * 函数节流
 * @param {callback} 回调函数
 * @param {time} 间隔时间
 * @param {immediately} 是否立即执行
 */
this.myPlugin.throttle = function (callback, time, immediately) {
    if (immediately === undefined) {
        immediately = true;
    }

    if (immediately) {
        let date = null;
        return function () {
            if (!date || Date.now() - date >= time) {   // 之前没有计时 或者 距离上次执行的时间已经超过规定的值
                callback.apply(null, arguments)
                date = Date.now();  // 保存这一次执行时的时间戳
            }
        }
    } else {
        let timer = null;
        return function () {
            if (timer) {
                return;
            }
            const args = arguments;
            timer = setTimeout(function () {
                callback.apply(null, args);
                timer = null;
            }, time)
        }
    }
}

/**
 * 函数柯里化
 * 在函数式编程中，科里化最重要的作用是把多参函数变为单参函数
 */
this.myPlugin.curry = function (func) {
    // 得到从下标为 1 开始的参数
    const args = Array.prototype.slice.call(arguments, 1)
    const that = this;
    return function () {
        // 当前调用函数的参数
        const currentArgs = Array.from(arguments);
        const totalArgs = args.concat(currentArgs);
        if (totalArgs.length >= func.length) {
            // 参数数量够了，可以执行函数了
            return func.apply(null, totalArgs);
        } else {
            // 参数数量仍然不够
            totalArgs.unshift(func);
            return that.curry.apply(that, totalArgs);
        }
    }
}

// 函数管道
this.myPlugin.pipe = function () {
    const args = Array.from(arguments);
    return function (value) {
        // 方法一
        // for (const item of args) {
        //     value = item(value);
        // }
        // return value;

        // 方法二
        return args.reduce(function (result, func) {
            return func(result);
        }, value)
    }
}