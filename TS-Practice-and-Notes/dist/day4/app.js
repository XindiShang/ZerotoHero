"use strict";
var _a;
const e1 = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date(),
};
function add1(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
// add1 has 3 overloads
const result1 = add1('Jane', 'Doe');
// error: Property 'split' does not exist on type 'string | number'.
result1.split(' ');
function printEmployeeInfo(employee) {
    console.log(employee.name);
    // error: Property 'privileges' does not exist on type 'Employee'
    // console.log(employee.privileges);
    // fix: use 'in'
    if ('privileges' in employee) {
        console.log(employee.privileges);
    }
}
// instanceof operator
class Car {
    drive() {
        console.log('Driving...');
    }
}
class Truck {
    drive() {
        console.log('Driving a truck...');
    }
    loadCargo(amount) {
        console.log('Loading cargo...' + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    // error: Property 'loadCargo' does not exist on type 'Vehicle'
    // vehicle.loadCargo(1000);
    // fix 
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000); // Loading cargo...1000
    }
}
function moveAnimal(animal) {
    // error: Property 'flyingSpeed' does not exist on type 'Animal'
    // console.log(animal.flyingSpeed);
    // fix: use shared property 'type'
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log(`Moving at speed ${speed}`);
}
moveAnimal({ type: 'bird', flyingSpeed: 10 });
// type casting
const paragraph = document.getElementById('cute-paragraph');
// 1. tag
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
// 2. as keyword
const userInputElement = document.getElementById('user-input');
userInputElement.value = 'Hi there!';
const errorBag = {
    email: 'Not a valid email.',
    username: 'Must start with a character.',
};
// optional chaining
const fetchedData = {
    id: '123abc',
    name: 'John',
    job: { title: 'CEO', description: 'My own company' },
};
console.log((_a = fetchedData === null || fetchedData === void 0 ? void 0 : fetchedData.job) === null || _a === void 0 ? void 0 : _a.title);
// nullish coalescing
const userInput = '';
// const storedData = userInput || 'Default';
const storedData = userInput !== null && userInput !== void 0 ? userInput : 'Default';
console.log(storedData); // empty string printed in console
// targeting null or undefined only, not an empty string
