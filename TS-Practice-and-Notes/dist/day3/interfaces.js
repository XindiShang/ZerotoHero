"use strict";
// type Person = {
//   name: string;
//   age: number;
//   greet(phrase: string): void;
// }
// 1. used for type checking
let user1;
user1 = {
    name: "Max",
    age: 30,
    greet(phrase) {
        console.log(phrase + " " + this.name);
    },
};
user1.greet("Hi there - I am"); // Hi there - I am Max
// tell the GoodPerson class to follow the NicePerson interface
class GoodPerson {
    constructor(name) {
        this.age = 30;
        this.name = name;
    }
    greet(phrase) {
        console.log(phrase + " " + this.name);
    }
    help() {
        console.log("I can help!");
    }
}
let guy;
guy = new GoodPerson("Guy");
guy.greet("Hi there - I am"); // Hi there - I am Guy
guy.help(); // I can help
class Tesla {
    constructor(name) {
        this.battery = "molten salt";
        if (name) {
            this.model = name;
        }
        else {
            this.model = "Tesla";
        }
    }
    drive() {
        console.log(`${this.model} is driving.`);
    }
    check() {
        console.log(`${this.model} has ${this.battery}.`);
    }
}
const model3 = new Tesla();
model3.drive();
model3.check();
let myAdd;
myAdd = (n1, n2) => {
    return n1 + n2;
};
