**描述**\
计算字符串最后一个单词的长度，单词以空格隔开，字符串长度小于5000。（注：字符串末尾不以空格为结尾）
**输入描述：**  
输入一行，代表要计算的字符串，非空，长度小于5000。

**输出描述：**  
输出一个整数，表示输入字符串最后一个单词的长度。

**示例1**  

```
输入：
hello nowcoder
复制
输出：
8
复制
说明：
最后一个单词为nowcoder，长度为8 
```

### 题解
```js
function lenOfLastWord(str) {
    let arr = str.split(' ');
    let lastWord = arr[arr.length - 1];
    return lastWord.length;
}

const line = readline();
console.log(lenOfLastWord(line));
```

### 心得
1. 好久没刷题split竟然用成了split[' ']，吐血 = =
2. 牛客网竟然还需要用户自己调用realine，然后打印，真的有点麻烦
