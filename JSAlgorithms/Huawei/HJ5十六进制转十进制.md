**描述**
写出一个程序，接受一个十六进制的数，输出该数值的十进制表示。

数据范围：保证结果在 1 &lt n &lt2**31 - 1
 
**输入描述：**
输入一个十六进制的数值字符串。

**输出描述：**
输出该数值的十进制字符串。不同组的测试用例用\n隔开。

**示例1**

```
输入：
0xAA
复制
输出：
170
```

### 题解
```js
const table = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
};

function hexToDecimal(str) {
  str = str.substring(2);
  let len = str.length;
  let result = 0;
  let num;
  for (let i = len - 1; i >= 0; i--) {
    num = parseInt(table[str[len - 1 - i]]);
    result += num * 16 ** i;
  }
  console.log(result);
  return result + "";
}

hexToDecimal(readline());


```

### refactored
```js
function hexToDecimal(str) {
  let result = parseInt(str); // 相当于parseInt(str, 16);
  console.log(result);
  return result;
}

hexToDecimal(readline());
```

### 心得
1. 使用parseInt()转换。parseInt(string, radix)  解析一个字符串并返回指定基数的十进制整数，radix 是 2-36 之间的整数，表示被解析字符串的基数。radix 可选：从 2 到 36，表示字符串的基数。例如指定 16 表示被解析值是十六进制数。请注意，10 不是默认值！文章后面的描述解释了当参数 radix 不传时该函数的具体行为。
2. parseInt()的string可以以‘0x'开头，表示以十六进制解析。
3. substring()的beginIndex是被包括在内的，如果不填endIndex默认截到字符串末尾。