class MySet {
    #data = [];
    constructor(iterator = []) {
        if (iterator === null) {
            return this.#data;
        }
        if (typeof iterator[Symbol.iterator] !== 'function') {
            throw new TypeError(`${typeof iterator} ${iterator} is not iterable (cannot read property Symbol(Symbol.iterator))`);
        }
        for (const item of iterator) {
            this.add(item);
        }
    }

    add(data) {
        if (!this.has(data)) {
            this.#data.push(data)
        }
    }

    has(data) {
        for (const item of this.#data) {
            if (this.#isEqual(data, item)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 判断两个数是否相等，并保证 +0 和 -0 相等
     * @param {*} origin
     * @param {*} target
     * @return {*} 
     * @memberof MySet
     */
    #isEqual(origin, target) {
        if (origin === 0 && target === 0) {
            return true;
        }
        return Object.is(origin, target);
    }

    get size() {
        return this.#data.length;
    }

    delete(data) {
        const length = this.#data.length;
        for (let i = 0; i < length; i++) {
            const element = this.#data[i];
            if (this.#isEqual(data, element)) {
                this.#data.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    clear() {
        this.#data.length = 0;
    }

    *[Symbol.iterator]() {
        for (const item of this.#data) {
            yield item;
        }
    }

    forEach(callback) {
        for (const item of this.#data) {
            callback(item, item, this);
        }
    }

}