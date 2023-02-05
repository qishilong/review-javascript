// 1.
// let star = ""
// for (let i = 0; i < 100; i++) {
//     star += "*"
// }
// console.log(star)

// 2. 
// let star = "";
// for (let i = 1; i <= 15; i++) {
//     star += "*";
//     if (i % 5 === 0) {
//         star += "\n"
//     }
// }
// console.log(star)

// 3.
// let star = "";
// for (let i = 1; i <= 5; i++) {
//     for (let j = 1; j <= i; j++) {
//         star += "*"
//     }
//     star += "\n"
// }
// console.log(star)

// 4.
// let star = "", max = 5;
// for (let i = 1; i <= max; i++) {
//     for (let j = max - 1; j >= i; j--) {
//         star += " "
//     }
//     for (let a = 2 * i - 1; a > 0; a--) {
//         star += "*"
//     }
//     star += "\n"
// }
// console.log(star)

// 5.
// for (let i = 1; i <= 100; i++) {
//     console.log(i)
// }

// 6.
// for (let i = 1; i <= 100; i++) {
//     if (i % 2 !== 0) {
//         console.log(i)
//     }
// }

// 7. 
// let sum = null;
// for (let i = 1; i <= 100; i++) {
//     sum += i
// }
// console.log(sum)

// 8.
// let sum = null;
// for (let i = 1; i <= 100; i++) {
//     if (i % 2 !== 0) {
//         sum += i
//     }
// }
// console.log(sum)

// 9.
// let product = 1;
// for (let i = 1; i <= 10; i++) {
//     product *= i
// }
// console.log(product)

// 10.
// let number = 233, primeNumberFlag = 0;
// for (let i = 1; i <= 233; i++) {
//     if (number % i === 0) {
//         primeNumberFlag++
//     }
// }
// if (primeNumberFlag === 2) {
//     console.log("是素数")
// } else {
//     console.log("不是素数")
// }

// 11.
// for (let i = 1; i <= 100; i++) {
//     let primeNumberFlag = false
//     for (let j = 2; j <= i - 1; j++) {
//         if (i % j === 0) {
//             // console.log(i, j)
//             primeNumberFlag = true
//             break
//         }
//     }
//     if (i > 1 && !primeNumberFlag) {
//         console.log(i)
//     }
// }

// 12.
// let sum = null;
// for (let i = 1; i <= 100; i++) {
//     let primeNumberFlag = false;
//     for (let j = 2; j <= i - 1; j++) {
//         if (i % j === 0) {
//             primeNumberFlag = true;
//             break
//         }
//     }
//     if (i > 1 && !primeNumberFlag) {
//         sum += i
//     }
// }
// console.log(sum)

// 13.
// let min = 1, max = 9, a = ""
// for (let i = min; i <= max; i++) {
//     for (let j = 1; j <= i; j++) {
//         a += `${j}*${i}=${j * i} `
//     }
//     a += "\n"
// }
// console.log(a)

// 14.
// console.log("游戏开始")
// let pcPunch = "", round = 1, playerScore = 0, pcScore = 0;
// while (true) {
//     console.log(`==============第${round}轮==============`)
//     console.log(`系统: ${pcScore}分, 玩家: ${playerScore}分`)
//     let playerPunch = prompt("请出拳（剪刀石头布）")
//     round++

//     if (playerPunch === null) {
//         break
//     }

//     if (playerPunch !== "剪刀" && playerPunch !== "石头" && playerPunch !== "布") {
//         console.log("出拳无效，请重新出拳")
//         continue;
//     }

//     // 开始判断输赢
//     let randomNumber = Math.random();
//     if (randomNumber < 0.3333) {
//         pcPunch = "剪刀"
//     } else if (randomNumber > 0.3333 && randomNumber < 0.6666) {
//         pcPunch = "石头"
//     } else {
//         pcPunch = "布"
//     }

//     console.log(`玩家出拳: ${playerPunch}`)
//     console.log(`系统出拳: ${pcPunch}`)

//     if (playerPunch === "剪刀" && pcPunch === "布" || playerPunch === "石头" && pcPunch === "剪刀" || playerPunch === "布" && pcPunch === "石头") {
//         playerScore++
//         console.log("玩家胜利")
//     } else if (pcPunch === playerPunch) {
//         console.log("平局")
//     } else {
//         pcScore++
//         console.log("系统胜利")
//     }
// }

// console.log("==============游戏结束=============")
// console.log(`系统: ${pcScore}分, 玩家: ${playerScore}分`)
