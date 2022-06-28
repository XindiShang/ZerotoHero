// 1. intersection types
type Admin = {
  name: string,
  privileges: string[];
};

type Employee = {
  name: string,
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
};

type Combined = string | number;
type Numeric = number | boolean;

type Universal = Combined & Numeric;

// 2. type guards
// using typeof

// function overloads (other ways of calling the function)
function add1(a: number, b: number): number;
function add1(a: string, b: string): string;
function add1(a: string, b: number): string;
function add1(a: number, b: string): string;
function add1(a: Combined, b: Combined) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

// add1 has 3 overloads
const result1 = add1('Jane', 'Doe');
// error: Property 'split' does not exist on type 'string | number'.
result1.split(' ');

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(employee: UnknownEmployee) {
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
  drive(){
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo...' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // error: Property 'loadCargo' does not exist on type 'Vehicle'
  // vehicle.loadCargo(1000);

  // fix 
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000); // Loading cargo...1000
  }
}

// 3. discriminated unions
interface Bird {
  type: 'bird'; // literal type 'bird', not value assignment
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
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
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
userInputElement.value = 'Hi there!';
// exclamation mark is used to make sure that the type will never be null

// index types
interface ErrorContainer { // email: 'Not a valid email.' username: 'Must start with a character.'
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email.',
  username: 'Must start with a character.',
};

// optional chaining
const fetchedData = {
  id: '123abc',
  name: 'John',
  job: { title: 'CEO', description: 'My own company' },
}

console.log(fetchedData?.job?.title);

// nullish coalescing
const userInput = '';
// const storedData = userInput || 'Default';
const storedData = userInput ?? 'Default';
console.log(storedData); // empty string printed in console

// targeting null or undefined only, not an empty string