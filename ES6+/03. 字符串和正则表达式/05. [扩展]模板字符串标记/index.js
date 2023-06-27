// const container = document.getElementById("container");
// const txt = document.getElementById("txt");
// const btn = document.getElementById("btn");

// btn.onclick = function(){
//     container.innerHTML = safe`<p>
//         ${txt.value}
//     </p>
//     <h1>
//         ${txt.value}
//     </h1>
//     `;
// }

// function safe(parts){
//     const values = Array.prototype.slice.apply(arguments).slice(1);
//     let str = "";
//     for (let i = 0; i < values.length; i++) {
//         const v = values[i].replace(/</g, "&lt;").replace(/>/g, "&gt;");
//         str += parts[i] + v;
//         if (i === values.length - 1) {
//             str += parts[i + 1];
//         }
//     }
//     return str;
// }


// const value1 = '一段话';
// const value2 = '一句话';

// const text = myTag` 这是${value1}, 这是${value2}。`

// function myTag(...args) {
//     const values = Array.prototype.slice.call(arguments).slice(1);
//     const length = values.length;
//     let str = '';
//     for (let i = 0; i < length; i++) {
//         const element = values[i];
//         str += `${args[0][i]}: ${element}`;
//         if (i === length - 1) {
//             str += args[0][i + 1];
//         }
//     }
//     return str;
// }

// console.log(text)


const text = document.getElementById('txt');
const btn = document.getElementById('btn');
const container = document.getElementById('container');

btn.onclick = () => {
    container.innerHTML = safe`<p>
        ${text.value}
    </p>`
}

/**
 * 对内容做安全性格式化处理
 * @param {*} args
 */
function safe(...args) {
    console.log(args, 11)
    const value = Array.prototype.slice.call(arguments).slice(1);
    const length = value.length;
    let str = '';
    for (let i = 0; i < length; i++) {
        const format = value[i].replace(/</g, '&lt').replace(/>/g, '&gt');
        str += args[0][i] + format;
        if (i === length - 1) {
            str += args[0][i + 1];
        }
    }
    return str;
}