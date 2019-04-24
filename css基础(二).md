# 居中为什么使用transfrom二不使用margin,top

根据在谷歌上面的performance抓取可以发现，使用transform后，页面的回流直接没有了。在频繁改变top之类的时候，效果就十分明显。但是，后面的图层合并耗时会增加，内存会越来越大，过多的渲染开销会超过性能的改善。
因此，仅当需要的时候，才会创建渲染层。
具体的可以参考<a href="https://juejin.im/post/5c32b0fb6fb9a049ac7950d9">这篇文章</a>，从浏览器渲染过程解释，非常详细。

# flex布局

1. 简单使用
```css
/*任意容器，容器里面的所有子元素自动成为容器成员，成为flex项目*/
    .box{
        display:flex;
        /*display:inline-flex; //行内元素也可以使用flex布局*/
    }
```
以下6个属性设置在容器上：
- flex-direction: 决定主轴的方向,值为--row | row-reverse | column | column-reverse
- flex-wrap: 如果一条轴线拍不下，如何换行，值为--nowrap | wrap | wrap-reverse
- flex-flow: flex-direction和flex-wrap的简写，默认值为row wrap
- justify-content: 定义了内容在主轴的对齐方式，值为--flex-start | flex-end | center | space-between | space-around
- align-items: 定义了在交叉轴上如何对齐，值为--flex-start | flex-end | center | baseline | stretch
- align-content: 定义了多跟轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。值为--flex-start | flex-end | center | space-between | space-around | stretch;

1. 项目属性

以下6个属性设置在项目上：
- order:定义项目的排列顺序。数值越小，排列越靠前，默认为0。
- flex-grow:定义项目的放大比列，默认为0，即如果存在剩余空间，也不放大。
<span style="color:red">注意</span>：如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。如果只有一个项目设置了此属性，且大于0，则这个项目会占据剩余所有的空间。
- flex-shrink:定义了项目的缩小比列，默认为1，即如果空间不足，该项目将缩小。
<span style="color:red">注意</span>：如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。(姿势没对，效果没试出来)
- flex-basis：在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大。
<span style="color:red">注意</span>：它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间
- flex：是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
<span style="color:red">注意</span>：该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
至于<strong>flex:\<intnumber\></strong>
- align-self:允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。值为--auto | flex-start | flex-end | center | baseline | stretch;默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。