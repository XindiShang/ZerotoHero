**描述**
写出一个程序，接受一个正浮点数值，输出该数值的近似整数值。如果小数点后数值大于等于 0.5 ,向上取整；小于 0.5 ，则向下取整。

数据范围：保证输入的数字在 32 位浮点数范围内

**输入描述**：
输入一个正浮点数值

**输出描述：**
输出该数值的近似整数值

**示例1**
```
输入：
5.5
输出：
6
说明：
0.5>=0.5，所以5.5需要向上取整为6  
```
第一次 (超时)
```js
function nearestWholeNumber(num) {
    let result;
    let numStr = num + '';
    let indexOfDot = numStr.indexOf('.');
    let numAfterDot = numStr.slice(indexOfDot)[1];
    numAfterDot < 5? result = Math.floor(num) : result = Math.ceil(num);
    console.log(result);
}

nearestWholeNumber(readline())
```

### refactored v1
```js
function nearestWholeNumber(strNum) {
    let result;
    let num = parseFloat(strNum);
    // Math.trunc截取整数部分
    let float = num - Math.trunc(num);
    float < 0.5? result = Math.floor(num) : result = Math.ceil(num);
    console.log(result);
}

nearestWholeNumber(readline())
```

### refactored v2
```js
function nearestWholeNumber(strNum) {
    let num = parseFloat(strNum);
    // 给数字加上0.5，之后取整，就可以得出四舍五入的整数部分
    let result = parseInt(num + 0.5);
    console.log(result);
}

nearestWholeNumber(readline())
```

### 心得
1. 用Math去处理数字，用原先的数减去整数部分得到小数，之后做判断