**描述**  
数据表记录包含表索引index和数值value（int范围的正整数），请对表索引相同的记录进行合并，即将相同索引的数值进行求和运算，输出按照index值升序进行输出。

提示:
0 <= index <= 11111111
1 <= value <= 100000<br>

**输入描述：**  
先输入键值对的个数n（1 <= n <= 500）
接下来n行每行输入成对的index和value值，以空格隔开

**输出描述：**  
输出合并后的键值对（多行）

**示例1**  
```
输入：
4
0 1
0 2
1 2
3 4
复制
输出：
0 3
1 2
3 4
```
**示例2**  
```
输入：
3
0 1
0 2
8 9
复制
输出：
0 3
8 9
```

### 题解
```js
function mergeHashMap(loopTime) {
  let counter = {};
  for (let i = 0; i < loopTime; i++) {
    let pair = readline().split(' ');
    let key = parseInt(pair[0]);
    let val = parseInt(pair[1]);
    counter[key] ? (counter[key] += val) : (counter[key] = val);
  }
  for (let key in counter) {
    console.log(`${key} ${counter[key]}`);
  }
}

mergeHashMap(readline());
```

### 心得
1. 注意readline()返回的是string
2. Object.keys(obj)，不是obj.keys()