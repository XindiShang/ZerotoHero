**描述**  
输入一个 int 型整数，按照从右向左的阅读顺序，返回一个不含重复数字的新的整数。
保证输入的整数最后一位不是 0 。

数据范围： 1 \le n \le 10^{8} \1≤n≤10**8<br>

**输入描述：**  
输入一个int型整数

**输出描述：**  
按照从右向左的阅读顺序，返回一个不含重复数字的新的整数

**示例1**  
```
输入：
9876673
输出：
37689
```


### 题解
```js
function reverseUnique(str) {
    let arr = [...str].reverse()
    const unique = new Set(arr);
    arr = [...unique];
    let result =''
    arr.forEach((el)=>result+=el)
    console.log(result)
}

reverseUnique(readline())
```

### 心得
1. 只有Array有reverse()方法
2. new Set()的顺序是依据插入顺序来的
3. 用扩展运算符可以将Set或String转换成Array
4. Set可以使用forEach()方法遍历