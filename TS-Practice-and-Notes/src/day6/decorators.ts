function Logger(logString: string) {
  console.log("logger outer");

  return function (_: Function) {
    console.log(logString);
    console.log("logger inner");
  };
}

function withTemplate(template: string, hookId: string) {
  console.log("template outer");
  return function<T extends {new(...args: any[]):{name:string}}> (oldClass: T) {
    // we can run the code below when the class is instantiated
    return class extends oldClass {
      constructor(..._: any[]) {
      // constructor(...args: any[]) {
        super();
        console.log("template inner");
        const hookEl = document.getElementById(hookId);
        // const p = new oldClass();
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@Logger("I'm logging") // executes the inner fn
@withTemplate("<h1>Hello</h1>", "app") // returns the inner fn
class Person {
  name = "Richard";

  constructor() {
    console.log("creating person");
  }
}

const person1 = new Person(); // extends the innermost class

console.log(person1);

// 1. decorators runs when the class is first defined, not when it is instantiated

// 2. property decorators
function Log(target: any, prop: string | symbol) {
  console.log("prop decor");
  console.log(target, prop);
}

function Log2(
  target: any,
  prop: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log("accessor decor");
  console.log(target);
  console.log(prop);
  console.log(descriptor);
}

function Log3(
  target: any,
  prop: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log("method decor");
  console.log(target);
  console.log(prop);
  console.log(descriptor);
}

function Log4(target: any, prop: string | symbol, position: number) {
  console.log("param decor");
  console.log(target);
  console.log(prop);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }

  get price() {
    return this._price;
  }
}

const p1 = new Product("Book", 10);
// p1.price = 20;
// console.log(p1.price);
// console.log(p1.getPriceWithTax(0.5));

console.log('------------------------------------------------------');

function Autobind(_:any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjustedDescriptor;
}

class Printer{
  message = 'hello world';

  @Autobind
  showMessage(){
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);

// validation decorator
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[];
  };
}

const registerValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registerValidators[target.constructor.name] = {
    ...registerValidators[target.constructor.name],
    [propName]: ['required']
  }
}

function PositiveNumber(target: any, propName: string) {
  registerValidators[target.constructor.name] = {
    ...registerValidators[target.constructor.name],
    [propName]: ['positive']
  }
}

function validate(obj: any) {
  const objValidatorConfig = registerValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          // return !!obj[prop];
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          // return obj[prop] > 0;
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course{
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value; // + converts to number

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('Invalid input, please try again');
    return;
  }
  console.log(createdCourse);

});