// const a = (something: number | string) => {
//     return something.toString() // 访问变量中的共有属性是没有问题的，但是只访问变量中单一联合类型的属性会出问题
// }

// console.log(a(111))


// interface Info {
//     name: string;
//     age: number;
//     stature: number;
//     weight?: number;
//     // [propName: string]: string;
// }

// const person: Info = {
//     name: "John",
//     age: 11,
//     stature: 12,
//     weight: 11,
// }


// interface Person {
//     readonly name: string;
//     // age?: number;
//     [propName: string]: string | number;
// }

// let tom: Person = {
//     name: 'Tom',
//     age: 25,
//     gender: 'male',
//     stature: 100,
//     weight: 120,
//     length: "100"
// };

// // tom.name = "fafa"
// // tom.age = 100

// // const array: any[] = ["1", 1, { age: "2", stature: { name: 2 } }, function (a) { }, Symbol(1)]

// function fn(param1: string, param2: number): string {
//     return param1 + param2;
// }
// // fn("1", 1)

// function reverse(x: number): number;
// function reverse(x: string): string;
// function reverse(x: number | string): number | string | void {
//     if (typeof x === "string") {
//         return x.split("").reverse().join("")
//     } else if (typeof x === "number") {
//         return Number(x.toString().split("").reverse().join(""))
//     }
// }

// console.log(typeof reverse("fadsfads"))


interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

// function isFish(animal: Cat | Fish) {
//     if (typeof (animal as Fish).swim === 'function') {
//         return true;
//     }
//     return false;
// }

// function swim(animal: Cat | Fish) {
//     (animal as Fish).swim()
// }

// const tom: Cat = {
//     name: "Tom",
//     run() { console.log("run") }
// }

// swim(tom)

/* It's declaring a global variable. */
// window.foo = 1
// (window as any).foo = 1;
// console.log((window as any).foo)

interface Animal {
    name: string;
    swim(): void
}

// interface Cat {
//     name: string;
//     run(): void;
// }

// interface Cat extends Animal {
//     run(): void;
// }

// const tom: Cat = {
//     name: "cat",
//     run() { console.log("run") },
//     swim() { console.log("swim") }
// }

// let animal: Animal = tom
// console.log(animal)

// function swap<T, U>(value: [T, U]): [U, T] {
//     return [value[1], value[0]]
// }

// console.log(swap(["1", 1]))

// function increase<T>(number: number, value: T): Array<T> {
//     let result: T[] = [];
//     for (let i = 0; i < number; i++) {
//         result[i] = value
//     }
//     return result
// }
// console.log(increase(3, "11"))


// function genericity<T extends U, U>(target: T, source: U): T {
//     for (const key in source) {
//         target[key] = (<T>source)[key]
//     }
//     return target;
// }

// let x = { a: 10, b: 11, c: 12, d: 13 }

// console.log(genericity(x, { a: 1, b: 2 }))

// declare const a = 1;
// console.log(a)

// declare const jquery = function (dom) {
//     return document.querySelector("dom")
// }