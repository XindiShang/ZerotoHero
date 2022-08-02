# JavaScript in Depth

### 1. logic operators

#### 1.1 ?? operator (nullish coalescing)

- ?? is a ES2020 feature that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.

```JavaScript
// use ?? instead of ||
// ?? will return the first non-null value, whereas || will treat values like 0 and '' as falsy value and return it
const foo = null ?? 'default string';
console.log(foo);
// expected output: "default string"

const baz = 0 ?? 42;
console.log(baz);
// expected output: 0
```
