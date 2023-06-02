const hashCode = (s) => {
    let h;
    for (let i = 0; i < s.length; i++) {
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    }
    return h;
}

const resultValue = hashCode('002931');

console.log(resultValue % 8);