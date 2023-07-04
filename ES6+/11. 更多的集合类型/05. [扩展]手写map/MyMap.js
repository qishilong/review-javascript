class MyMap {
    #data = [];
    constructor(iterator = []) {
        if (iterator === null) {
            return this.#data;
        }
        if (typeof iterator[Symbol.iterator] !== 'function') {
            throw new TypeError(`${typeof iterator} ${iterator} is not iterable (cannot read property Symbol(Symbol.iterator))`)
        }
        for (const item of iterator) {
            // item 也得是一个可迭代对象
            if (typeof item[Symbol.iterator] !== 'function') {
                throw new TypeError(`Iterator value ${item} is not an entry object（你提供的${item}不是一个可迭代的对象）`)
            }
            const iterator = item[Symbol.iterator]();
            const key = iterator.next().value;
            const value = iterator.next().value;
            this.set(key, value);
        }
    }

    set(key, value) {
        const obj = this.#getObj(key);
        if (obj) {
            // 修改
            obj.value = value;
        } else {
            this.#data.push({
                key,
                value
            })
        }
    }

    get(key) {
        const obj = this.#getObj(key);
        if (obj) {
            return obj.value;
        }
        return undefined;
    }

    has(key) {
        return !!this.#getObj(key)
    }

    delete(key) {
        const length = this.#data.length
        for (let i = 0; i < length; i++) {
            const element = this.#data[i];
            if (this.#isEqual(key, element.key)) {
                this.#data.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    clear() {
        this.#data.length = 0;
    }

    get size() {
        return this.#data.length
    }

    *[Symbol.iterator]() {
        for (const item of this.#data) {
            yield [item.key, item.value];
        }
    }

    forEach(callback) {
        for (const item of this.#data) {
            callback(item.value, item.key, this)
        }
    }

    #getObj(key) {
        for (const item of this.#data) {
            if (this.#isEqual(key, item.key)) {
                return item;
            }
        }
    }

    /**
     * 比较两个值是否相等，使用 Object.is() 比较，但是 +0 和 -0 相等
     * @param {*} origin
     * @param {*} target
     * @return {*} 
     * @memberof MyMap
     */
    #isEqual(origin, target) {
        if (origin === 0 && target === 0) {
            return true;
        }
        return Object.is(origin, target);
    }
}