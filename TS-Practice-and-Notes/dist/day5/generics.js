"use strict";
// generics
// // 1. what
// // 1.1 array
// // const names = ['Richard', 'Jared'];
// // error:  Generic type 'Array<T>' requires 1 type argument(s).
// // const names: Array = [];
// const names: Array<string> = []; // === string[]
// names[0].charAt(0); // we can use string methods because of generics
// // 1.2 promise
// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Done.");
//   }, 2000);
// });
// promise.then(data => {
//   data.substring(0, 1); // use generics to get additional information and better type support
// })
// 2. generic functions & classes
// function merge(objA: object, objB: object) {
//   return Object.assign(objA, objB);
// }
// const mergedObj = merge({ name: "Richard" }, { age: 30 });
// error: Property 'name' does not exist on type 'object'
// mergedObj.name;
// add constraints
function merge(objA, objB) {
    return Object.assign(objA, objB); // returns T & U
}
// mergedObj and mergedObj2 have different types
const mergedObj = merge({ name: "Richard" }, { age: 30 });
const mergedObj2 = merge({ name: "Erlich", achievements: ["Aviato"] }, { age: 32 });
mergedObj.name; // "Richard"
function countAndDescribe(element) {
    let descriptionText = "Got no value";
    // add an interface Lengthy to ensure element has a length property
    if (element.length === 1) {
        descriptionText = `Got 1 element`;
    }
    else if (element.length > 1) {
        descriptionText = `Got ${element.length} elements`;
    }
    return [element, descriptionText];
}
console.log(countAndDescribe("Hi there!")); // ['Hi there!', 'Got 9 elements']
console.log(countAndDescribe([1, 2, 3])); // [Array(3), 'Got 3 elements']
// key of constraint
// function extractAndConvert(obj: object, key: string) {
//   // error: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
//   return 'value: ' + obj[key]
// }
// fix: using 'keyof'
function extractAndConvert(obj, key) {
    return "value: " + obj[key];
}
// provide a 'name' key to the first argument
extractAndConvert({ name: "Dinesh" }, "name");
// generic classes
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Dinesh");
textStorage.addItem("Erlich");
textStorage.removeItem("Dinesh");
console.log(textStorage.getItems()); // ['Erlich']
// why use generic class? because it's flexible and still offers type support. In this case, we can store either string or number in storage
const numberStorage = new DataStorage();
numberStorage.addItem(1);
numberStorage.addItem(2);
numberStorage.removeItem(1);
console.log(numberStorage.getItems()); // [2]
// problem:
const objStorage = new DataStorage();
// objStorage.addItem({ name: 'Dinesh' });
// objStorage.addItem({ name: 'Erlich' });
// // ...
// objStorage.removeItem({ name: 'Dinesh' });
console.log(objStorage.getItems()); // [{ name: 'Dinesh' }]
// the logic in removeItem only works well for primitives. But with objects, indexOf will return -1, and splice(-1, 1) will delete the last element of the array
// fix: First, change logic by adding extra type checking, Second, pass by reference using the same variable
const dinesh = { name: "Dinesh" };
objStorage.addItem(dinesh);
objStorage.addItem({ name: "Erlich" });
objStorage.removeItem(dinesh);
console.log(objStorage.getItems()); // [{ name: 'Erlich' }]
// partial means the variable in the end will turn into the assigned type
// it will treat all the properties of the assigned type as optional
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.date = date;
    // coerce the variable to become type CourseGoal
    return courseGoal;
}
// 4.2 Readonly
const piedPipers = ['Richard', 'Jared', 'Gilfoyle'];
// error: these two methods don't exist on type 'readonly string[]'
// piedPipers.push('Erlich');
// piedPipers.pop();
