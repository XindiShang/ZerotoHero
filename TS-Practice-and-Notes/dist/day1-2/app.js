"use strict";
// core types
// 1. type inference
function add(n1, n2, showResult, phrase) {
    const result = n1 + n2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return result;
    }
}
let number1 = 10;
const number2 = 20;
const printResult = true;
const resultPhrase = "Result is: ";
const result = add(number1, number2, printResult, resultPhrase);
console.log(result);
// object
// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string];
// }
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
const person = {
    name: "Max",
    age: 27,
    hobbies: ["Sports", "Cooking"],
    // enum
    role: Role.ADMIN,
};
// person.role.push("admin"); // push is an exception when defining tuple with ts
// person.role[1] = 10;
//array
let favoriteActivities;
favoriteActivities = ["Sports"];
console.log(person.name);
if (person.role === 0)
    console.log("admin");
function combine(input1, input2, conversionType) {
    if ((typeof input1 === "number" && typeof input2 === "number") ||
        conversionType === "number") {
        return function () {
            console.log("num: " + (+input1 + +input2));
            return +input1 + +input2;
        };
    }
    else {
        return function () {
            console.log("str: " + input1 + input2);
            return input1.toString() + input2.toString();
        };
    }
}
// const combination = combine(1, '4', 'number');
// combination()
// function return types & void
function newAdd(n1, n2) {
    return n1 + n2;
}
// void means that function doesn't return anything
// In TypeScript, undefined can't be assigned to the return value of a function
function printResult2(num) {
    console.log("Result: " + num);
}
// Function can be a type in ts
// To specify the returned function type, use () => type. For example: (a: number, b: number) => number
function greet() {
    console.log("hello");
}
// destructuring
const movies = ["free guy", "lord of the rings", "e.t."];
// array destructuring is based on ORDER
// let [m1, m2, ...others] = movies;
// object destructuring is based on KEY NAME
// error: Property 'm1' does not exist on type 'string[]'
// let {m1, m2} = movies
const json = '{"x":10, "y":20}';
const coordinates = JSON.parse(json);
let foo = JSON.parse('{"value":10}'); // typescript has no idea what will be returned, so it can't check  for correct property inferences
console.log(foo);
let words = ["one", "two", "three"];
let foundWord;
words.forEach((el) => {
    if (el === "two") {
        foundWord = true;
    }
});
// variable whose type cannot be inferred correctly
let numbers = [-10, -1, 12];
let positiveNumber = false;
numbers.forEach(n => {
    if (n > 0) {
        positiveNumber = n;
    }
});
// functions
const logNumber = (i) => {
    console.log(i);
};
