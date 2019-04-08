# 1.前述

    本章只是单纯的记录css遗忘的属性

# 2.查漏补缺

### 1.选取父元素下的第一个P子元素

```css
    p:first-child{background-color:red}
    p:nth-child(1){background-color:red}
    p:nth-child(-n+1){background-color:red}
```
注意：使用<strong>:nth-child</strong>时，如果里面为括号里面的参数可能性：
- <strong>-n+x</strong>这种形式，表示选择父元素下前<strong>x</strong>个<strong>p</strong>子元素。
- <strong>x/0n+x</strong>这种形式，表示选择父元素下第<strong>x</strong>个且为<strong>p</strong>的子元素

### 2.inline,inline-block,block区别

<strong>inline</strong>(行内元素):
- 不自动换行
- 设置宽高无效
- 设置上下<strong>margin</strong>和上下<strong>padding</strong>无效<br/>

<strong>inline-block</strong>(行内块元素):
- 不自动换行
- 能设置宽高
- 设置上下<strong>margin</strong>和上下<strong>padding</strong>无效<br/>

<strong>iblock</strong>(块级元素):
都行
