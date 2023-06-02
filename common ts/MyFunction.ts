// 判断一个数是不是奇数
const isOddFn = (n: number) => n % 2 !== 0;

// 判断一个数是不是素数
const isPrimeFn = (n: number) => {
    if (n < 2) {
        return false;
    }
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
};

// 对数组求和
const sumArrayFn = (arr: number[]) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += i;
    }
    return sum;
};

// 得到数组中的最大值，如果数组长度为0，则返回undefined
const getMaxOfArrayFn = (arr: number[]) => {
    if (arr.length === 0) {
        return;
    }
    let max = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= max) {
            max = arr[i];
        }
    }
    return max;
};

// 得到数组中的最小值，如果数组长度为0，则返回undefined
const getMinOfArrayFn = (arr: number[]) => {
    if (arr.length === 0) {
        return;
    }
    let min = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (min <= arr[i]) {
            min = arr[i];
        }
    }
    return min;
};

// 判断一个数组是不是稀松数组
const judgeIsLaxArrayFn = (arr: unknown[]) => {
    // 稀松数组特定：下标不连续
    for (let i = 0; i < arr.length; i++) {
        if (!(i in arr)) {
            return true;
        }
    }
    return false;
};

// 判断某年是不是闰年
// 4年以闰，百年不闰；400年一闰
const judgeIsLeapYearFn = (year: number) => year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;

// 得到某年某月的天数
const getDayOfMonthFn = (year: number, month: number) => {
    if (month === 2) {
        return judgeIsLeapYearFn(year) ? 29 : 28;
    } else if (month < 8 && isOddFn(month) || month > 8 && !isOddFn(month)) {
        return 31;
    } else {
        return 30;
    }
};

// 得到数组中出现频率最高的数字和频率
const getMostTimesOfArrayFn = (arr: unknown[]) => {
    const record: any = {};
    for (let i = 0; i < arr.length; i++) {
        let value = String(arr[i]);
        if (record[value]) {
            record[value]++;
        } else {
            record[value] = 1;
        }
    }
    const result: {
        number: number;
        frequency: number;
    } = {
        number: 0,
        frequency: 0
    };
    for (const key in record) {
        if (Object.prototype.hasOwnProperty.call(record, key)) {
            if (!result || record[key] > result.frequency) {
                result.number = +key;
                result.frequency = record[key];
            }
        }
    }
    return result;
};
