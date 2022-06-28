**描述**
功能:输入一个正整数，按照从小到大的顺序输出它的所有质因子（重复的也要列举）（如180的质因子为2 2 3 3 5 ）


数据范围： 1 &lt 2 * 10^{9} + 14 

**输入描述**：
输入一个整数

**输出描述：**
按照从小到大的顺序输出它的所有质数的因子，以空格隔开。

**示例1**
```
输入：
180
复制
输出：
2 2 3 3 5
```

### 题解第一次 (超时)
```js
// 在测试2000000014时超时
function primeFactors(num) {
  let result = [];
  while (num > 1) {
    for (let i = 2; i <= num; i++) {
      if (num % i === 0) {
        result.push(i);
        num = num / i;
        break;
      }
    }
  }
  let resultStr = result.join(" ");
  console.log(resultStr);
}

primeFactors(readline());
```
## refactored v1 (超时)
```js
function primeFactors(num) {
  let result = [];
  let i = 2;
  while (num >= i) {
    if (num % i === 0) {
      num = num / i;
      result.push(i);
    } else {
      i++;
    }
  }
  
  let resultStr = result.join(" ");
  console.log(resultStr);
}

primeFactors(readline());
```

### refactored (通过)
```js
function primeFactors(num) {
  let result = [];
  let i = 2;
  // 需要加上i * i < num，并且在循环结束后加上最后一个质因子
  while (num >= i && i * i <= num) {
    if (num % i === 0) {
      num = num / i;
      result.push(i);
    } else {
      i++;
    }
  }
  if (num !== 1) {
    result.push(num);
  }
  let resultStr = result.join(" ");
  console.log(resultStr);
}

primeFactors(readline());
```

### 心得
1. 第二种方法，需要再额外判断i * i &lt num, 否则会出现死循环。并且在循环结束后加上最后一个质因子。
2. 基于第一种方法进行改进，因为找到第一个质因子i是最小质因子，不需要每次再从2开始判断。