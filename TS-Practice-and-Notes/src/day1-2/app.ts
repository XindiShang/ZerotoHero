// core types
// 1. type inference
function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  const result = n1 + n2;
  if (showResult) {
    console.log(phrase + result);
  } else {
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

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

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
let favoriteActivities: string[];
favoriteActivities = ["Sports"];

console.log(person.name);

if (person.role === 0) console.log("admin");

// tuple （array with fixed length and type)
// enum: syntax enum {NEW, OLD}

// union type: number | string
// literal type: specific demonstration of core type, like 'admin'
// type alias

type Combinable = number | string;
type ConversionType = "number" | "string";

function combine(
  input1: Combinable,
  input2: Combinable,
  conversionType: ConversionType
): () => Combinable {
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    conversionType === "number"
  ) {
    return function () {
      console.log("num: " + (+input1 + +input2));
      return +input1 + +input2;
    };
  } else {
    return function () {
      console.log("str: " + input1 + input2);
      return input1.toString() + input2.toString();
    };
  }
}

// const combination = combine(1, '4', 'number');
// combination()

// function return types & void
function newAdd(n1: number, n2: number): number {
  return n1 + n2;
}

// void means that function doesn't return anything
// In TypeScript, undefined can't be assigned to the return value of a function
function printResult2(num: number): void {
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
const coordinates: { x: number; y: number } = JSON.parse(json);

let foo = JSON.parse('{"value":10}'); // typescript has no idea what will be returned, so it can't check  for correct property inferences
console.log(foo);

let words = ["one", "two", "three"];
let foundWord: boolean;

words.forEach((el) => {
  if (el === "two") {
    foundWord = true;
  }
});

// variable whose type cannot be inferred correctly
let numbers = [-10, -1, 12];
let positiveNumber: boolean | number = false;

numbers.forEach(n => {
  if (n > 0) {
    positiveNumber = n;
  }
})

// functions
const logNumber: (integer: number) => void = (i: number) => {
  console.log(i);
}