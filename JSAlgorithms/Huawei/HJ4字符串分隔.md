**描述**  
•输入一个字符串，请按长度为8拆分每个输入字符串并进行输出；

•长度不是8整数倍的字符串请在后面补数字0，空字符串不处理。<br>
**输入描述：**  
连续输入字符串(每个字符串长度小于等于100)

**输出描述：**  
依次输出所有分割后的长度为8的新字符串

**示例1**  
```
输入：
abc
复制
输出：
abc00000
```

### 题解
```js
function divideByEight(str) {
  let len = str.length;
  let result = "";
  if (len <= 8) {
    result = printEight(str);
    console.log(result);
  } else {
    let slicedStr = "";
    for (let i = 0; i < len; i += 8) {
      slicedStr = str.slice(i, i + 8);
      result = printEight(slicedStr);
      console.log(result);
    }
  }
}

function printEight(str) {
  let result = "";
  for (let i = 0; i < 8; i++) {
    str[i] ? (result += str[i]) : (result += 0);
  }
  return result;
}

divideByEight(readline());

```

### refactored
```js
function divideByEight(str) {
    let patch = str + "00000000";
    for (let i = 8; i < patch.length; i += 8) {
      console.log(patch.substring(i - 8, i));
    }
}

divideByEight(readline());
```

### 心得
1. string.prototype.slice的的语法str.slice(beginIndex[, endIndex])。slice() 提取的新字符串包括beginIndex但不包括 endIndex
2. substring的两个参数会比较大小，判断beginIndex是否大于endIndex，小的会作为beginIndex，大的作为endIndex
3. slice的参数小于0时，会从字符串的末尾开始计算；substring的参数小于0时，会把参数设置为0
4. 因为这道题是要求输出的字符串长度是8的倍数，并在后面补充0，所以可以把起始参数i设置为8，每截取一串后，i+=8