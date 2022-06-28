**描述**  
输入一个 int 型的正整数，计算出该 int 型数据在内存中存储时 1 的个数。

数据范围：保证在 32 位整型数字范围内 <br>

**输入描述：**  
输入一个整数（int 类型）

**输出描述：**  
这个数转换成 2 进制后，输出 1 的个数

**示例 1**

```
输入：
5
输出：
2
```

**示例 2**

```
输入：
0
输出：
0
```

### 题解

```js
function countOne(num) {
  let binaryNum = num.toString(2); // radix
  let count = 0;
  for (let i = 0; i < binaryNum.length; i++) {
    if (binaryNum[i] === "1") count++;
  }
  console.log(count);
}

countOne(parseInt(readline()));
```

### 题解 2

```js
function countOne(num) {
  let binaryNum = num.toString(2); // radix
  console.log(binaryNum.match(/1/g).length);
}

countOne(parseInt(readline()));
```

### 心得

1. 记住toString可以转换成任意进制
