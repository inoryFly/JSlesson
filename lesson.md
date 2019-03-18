<h1 align="center">React高阶组件</h1>

## 背景知识
<div>
　　在开始讲述高阶组件前，我们先来回顾高阶函数的定义：接收函数作为输入，或者输出另一个函数的一类函数，被称作高阶函数。常见的高阶函数如：debounce防抖函数。<br/>
　　<strong>高阶组件本质上也是一个函数，并不是一个组件。</strong>对于高阶组件，它描述的便是接受React组件作为输入，输出一个新的React组件的组件。
</div>

## 使用场景及使用方法
<div>
　　高阶组件实用性很高，应用场景广泛，上到注入props成为受控组件，下到减少冗余代码。其调用也很简单，主要有两种方式：  <br/>
<ol>
　　<li>
　　高阶函数方式：

    ```typescript
        let NewComponent1=hocWrapped(OldComponent)
        let NewComponent2=hocWrapped(perhapsParams)(OldComponent)
    ```
这时候 <strong>hocWrapped</strong>已经变成了一个高阶函数，只不过返回的是一个高阶组件。这种形式大量出现在第三方库中，如dva中的connect就是一个典型: 
> connect([mapStateToProps])(OldComponent)
</li>
    <li>
    修饰器模式：

    ```typescript
        @hocWrapped
        class OldComponent extends Component{/* Code */}
    ```
        
带有参数的时候:

    ```typescript
        @hocWrapped(perhapsParams)
        class OldComponent extends Component{/* Code */}
    ```
    装饰器模式即允许向一个现有的对象添加新的功能，同时又不改变其结构，属于包装模式的一种。同时，有多个装饰器的时候，会像剥洋葱一样，从内到外进入，然后由内到外执行。

    ```typescript
        @hocWrapped1   //secondAction
        @hocWrapped2  //firstAction
        class OldComponent extends Component{/* Code */}
    ```
等价于：
> 
</li>

</div>

## 书写形式

  ### 1.属性代理
