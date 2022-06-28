interface Person {
  // error: an interface property cannot have an initializer
  // name: string = "Max",
  name: string;
  age: number;

  greet(phrase: string): void;
}

// type Person = {
//   name: string;
//   age: number;

//   greet(phrase: string): void;
// }

// 1. used for type checking
let user1: Person;

user1 = {
  name: "Max",
  age: 30,
  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  },
};

user1.greet("Hi there - I am"); // Hi there - I am Max

// 2. why we need interfaces instead of custom types?
// interface is usually used to define the structure of an object, not implementation
// interface can be used inside a class. it can be used as a contract for the class to adhere to
interface NicePerson {
  readonly name: string;
  greet(phrase: string): void;
}

interface HelpfulPerson {
  help(): void;
}

// tell the GoodPerson class to follow the NicePerson interface
class GoodPerson implements NicePerson, HelpfulPerson {
  name: string;
  age = 30;

  constructor(name: string) {
    this.name = name;
  }

  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }

  help() {
    console.log("I can help!");
  }
}

let guy: NicePerson & HelpfulPerson;
guy = new GoodPerson("Guy");
guy.greet("Hi there - I am"); // Hi there - I am Guy
guy.help(); // I can help

// interfaces vs abstract classes
// interfaces are used to share functionality among different classes(structures), but not the implementation details
// abstract classes are usually a mixture of structure and implementation

// readonly properties
// error: Cannot assign to 'name' because it is a read-only property.
// guy.name = 'Ryan'

// extending interfaces
interface Car {
  readonly model?: string;

  drive(): void;
}

// interface can also extends from multiple interfaces
interface ElectricCar extends Car {
  readonly battery: string;
}

class Tesla implements ElectricCar {
  model?: string;
  battery = "molten salt";

  constructor(name?: string) {
    if (name) {
      this.model = name;
    } else {
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

// interfaces as function types
// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}

let myAdd: AddFn;

myAdd = (n1: number, n2: number) => {
  return n1 + n2;
}
