"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(logString) {
    console.log("logger outer");
    return function (_) {
        console.log(logString);
        console.log("logger inner");
    };
}
function withTemplate(template, hookId) {
    console.log("template outer");
    return function (oldClass) {
        // we can run the code below when the class is instantiated
        return class extends oldClass {
            constructor(..._) {
                // constructor(...args: any[]) {
                super();
                console.log("template inner");
                const hookEl = document.getElementById(hookId);
                // const p = new oldClass();
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").textContent = this.name;
                }
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = "Richard";
        console.log("creating person");
    }
};
Person = __decorate([
    Logger("I'm logging") // executes the inner fn
    ,
    withTemplate("<h1>Hello</h1>", "app") // returns the inner fn
], Person);
const person1 = new Person(); // extends the innermost class
console.log(person1);
// 1. decorators runs when the class is first defined, not when it is instantiated
// 2. property decorators
function Log(target, prop) {
    console.log("prop decor");
    console.log(target, prop);
}
function Log2(target, prop, descriptor) {
    console.log("accessor decor");
    console.log(target);
    console.log(prop);
    console.log(descriptor);
}
function Log3(target, prop, descriptor) {
    console.log("method decor");
    console.log(target);
    console.log(prop);
    console.log(descriptor);
}
function Log4(target, prop, position) {
    console.log("param decor");
    console.log(target);
    console.log(prop);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("Invalid price");
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
    get price() {
        return this._price;
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
const p1 = new Product("Book", 10);
// p1.price = 20;
// console.log(p1.price);
// console.log(p1.getPriceWithTax(0.5));
console.log('------------------------------------------------------');
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjustedDescriptor;
}
class Printer {
    constructor() {
        this.message = 'hello world';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector('button');
button.addEventListener('click', p.showMessage);
const registerValidators = {};
function Required(target, propName) {
    registerValidators[target.constructor.name] = Object.assign(Object.assign({}, registerValidators[target.constructor.name]), { [propName]: ['required'] });
}
function PositiveNumber(target, propName) {
    registerValidators[target.constructor.name] = Object.assign(Object.assign({}, registerValidators[target.constructor.name]), { [propName]: ['positive'] });
}
function validate(obj) {
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
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleEl = document.getElementById('title');
    const priceEl = document.getElementById('price');
    const title = titleEl.value;
    const price = +priceEl.value; // + converts to number
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert('Invalid input, please try again');
        return;
    }
    console.log(createdCourse);
});
