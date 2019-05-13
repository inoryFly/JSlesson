# 1.前述

    本章只是单纯的记录css遗忘的属性，说来惭愧，做前端的css竟然会这样垃圾，js也写不好。（都用谷歌试过代码效果了）

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

<strong>block</strong>(块级元素):
都行


### 2.grid布局初识

基本设置：
```css
    /*父元素设置display就行*/
    .parent{
        display:grid;
        grid-template-columns:n1 n2 n3 …;/*设置王忠的空间长度，百分比或分数；有几个值，就有几个列*/
        grid-template-rows:n1 n2 n3 …;/*同上，有几个值就有几行*/
    }
```
另外，你也可以明确的命名行或列：
```css
    .parent{
        display:grid;
        grid-template-columns:[first] 40px [line2] 50px [line3] 60px;
        grid-template-rows:[row1-start] 20px [row2-start] 30px;
    }
```
一行/列可能会有多个名字，如下：
```css
    .parent{
        display:grid;
        grid-template-columns:[first] 40px [first-end second-start] 60px;
    }
```
如果定义包含重复的部分，可以是用<span style="color:red">repeat()</span>符号来简化:
```css
    .parent{
        display:grid;
        grid-template-columns:repeat(2,150px [myname]) 100px;/* 定义了三列,前两列名字都叫myname*/
    }
```
设置单位为<span style="color:red">fr</span>网格会允许您设置的网格轨道大小为网格容器的自由空间的一小部分,例如,这会将每个项目设置为容器宽度的三分之一：
```css
    .parent{
        display:grid;
        grid-template-columns:1fr 1fr 1fr;
    }
```
可用空间是在任何非弹性项目之后计算的,在这个例子中,fr单元可用空间的总量不包括100px:
```css
    .parent{
        display:grid;
        width:700px;
        grid-template-columns:1fr 1fr 1fr 100px;
    }
```
可以通过<span style="color:red">grid-area</span>属性指定网格空间的名称来定义网格模板:
- anyStr:指定的网格空间名称
- .:表示一个空的网格单元
- none:没有定义网格空间
```css
    .parent{
        display:grid;
        grid-template-columns:repeat(4,100px);
        grid-template-rows:repeat(3,50px);
        grid-template-areas:
            "hear hear hear hear"
            "main main . slidebar"
            "footer footer footer"
    }
    .child1{
        grid-area:hear;
    }
    .child2{
        grid-area:main;
    }
```
注意：当你使用这种语法时, 空间两端的行实际上是自动命名的,如果你的网格空间名字是foo,那么这个空间的起始行和起始列的名字就是foo-start,最后一列和最后一行就是foo-end;
以上3种属性可以简写：
```css
    .parent{
        display:grid;
        grid-template:none | subgrid | <rows> <areas>/<columns>;
    }
```
由于<span style="color:red">grid-template</span>不会重置隐式网格属性<span style="color:red">(grid-auto-columns, grid-auto-rows, grid-auto-flow)</span>,这可能是您在大多数情况下所要做的,所以建议使用<span style="color:red">grid</span>属而不是<span style="color:red">grid-template</span>。
我们可以通过属性指定网格线的大小值：
```css
    .parent{
        display:grid;
        grid-template-columns:repeat(4,100px);
        grid-template-rows:repeat(3,50px);
        grid-column-gap:10px;/*每列的网格线*/
        grid-row-gap:15px;/*每行的网格线*/
         /*grid-gap:<row> <column>;上面两种的缩写*/
    }
```
注意：<span style="color:red">fr</span>的计算把网格线的宽度也排除了。
利用属性设置行轴对齐，适用于所有网格容器内的网格项目，值：
- start:对齐到网格左端;
- end: 对齐到网格右端；
- center:将网格区域中心的内容对齐；
- stretch:填充网格区域的整个宽度(默认值)
```css
    .parent{
        display:grid;
        grid-template-columns:repeat(4,100px);
        grid-template-rows:repeat(3,50px);
        justify-items:end;
    }
```
既然有了按行轴对齐，当然也有按列咯，值与行一样，属性名不同而已：(没试出效果，姿势不对？？？)
```css
    .parent{
        align-items:center;
    }
```
