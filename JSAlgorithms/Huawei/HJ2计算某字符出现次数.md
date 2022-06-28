**描述**  
写出一个程序，接受一个由字母、数字和空格组成的字符串，和一个字符，然后输出输入字符串中该字符的出现次数。（不区分大小写字母）

数据范围： 1≤n≤1000<br>

**输入描述：**  
第一行输入一个由字母和数字以及空格组成的字符串，第二行输入一个字符。

**输出描述：**  
输出输入字符串中含有该字符的个数。（不区分大小写字母）

**示例1**  
```
输入：
ABCabc
A
复制
输出：
2
```

### 题解
```js
function calcFrequency(str, target) {
    let counter = {};
    for (let letter of str) {
        let key = letter.toUpperCase();
        counter[key] = (counter[key] || 0) + 1;
    }
    // 考虑target不存在字符串的情况
    let result = counter[target.toUpperCase()];
    
    return result? result : 0;
}

const testStr = readline();
const testTgt = readline();
console.log(calcFrequency(testStr, testTgt))
```

### 心得
1. 牛客网：realine分别调用读取用户输入
2. frequency counter在更新频率时，使用(counter[key] || 0) + 1， 不要用counter[key]++