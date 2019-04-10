## 1.基础介绍

　　项目开发中，我们时常需要考虑到用户在使用产品时产生的各种各样的交互事件，比如滚动、点击等等，这些行为都是前端DOM事件的组成部分，不同的DOM事件触发的行为与效果都不一样。本章将带领大家初步认识DOM事件。

## 2.DOM级别与事件

　　DOM级别一共分为4个：DOM0级，DOM1级，DOM2级，DOM3级。其中所谓的DOM0级指的是IE4和Netscape 4.0这些浏览器最初支持的DHTML。DOM1级由由两个模块组成：DOM核心和DOM HTML。剩余的都是对之前的做出扩展。而DOM事件分为3个级别：DOM0级事件处理，DOM2级事件处理和DOM3级事件处理。

### 1.DOM0级事件

在介绍之前我们先来看一段代码：
```html
    <div id="test">点我测试</div>
    <script>
        let test=document.querySelector("#test")
        test.onclick=function (){
            alert("我就是事件处理程序")
        }
    </script>
```
从上可知，DOM0级事件就是将要执行的代码以函数的形式传入事件处理属性中。我们可以通过为事件属性添加<strong>null</strong>来进行解绑
这种事件处理方式缺点：无法对同一事件处理属性添加多个处理函数，后面添加的处理函数会覆盖之前的。

### 2.DOM2级事件

DOM2级事件是对DOM0级事件的扩展，允许我们添加多个事件处理函数
```html
    <button id="button">点我</button>
    <script>
        let btn=document.querySelector("#button")
        function fn(){
            alert("我是DOM2级事件")
        }
        function fn1(){
            alert("我也会执行")
        }
        btn.addEventListener('click',fn,false)
        btn.addEventListener('click',fn1,false)
        // btn.removeEventListener('click',fn,false) 解绑
    </script>
```
DOM2级事件定义了<strong>addEventListener</strong>和<strong>removeEventListener</strong>两个方法，分别用来绑定和解绑事件，方法中包含3个参数，分别是绑定的事件处理属性名称（不包含on）、处理函数和是否在捕获时执行事件处理函数。
IE8级以下版本不支持addEventListener和removeEventListener，需要用attachEvent和detachEvent来实现：
```typescript
    //注：IE8级以下版本只支持冒泡事件
    btn.attachEvent('onclick',fn) //绑定事件
    btn.detachEvent('onclick',fn) //解绑事件
```
因此，为了兼容现代浏览器与IE浏览器，我们需要对浏览器进行一次判断：
```typescript
    function addEvent(type,el,fn){
        if(window.addEventListener){
            addEvent=function(type,el,fn){
                el.addEventListener(type,fn,false)
            }
        }else{
            addEvent=function(type,el,fn){
                el.attachEvent('on'+type,fn)
            }
        }
        addEvent(type,el,fn)
    }
```

### 3.DOM3级事件

DOM3级事件在DOM2级事件的基础上添加了更多的事件，全部类型如下：
   - UI事件，当用户与页面上的元素交互时触发，如：load、scroll
   - 焦点事件，当元素获得或失去焦点时触发，如：blur、focus
   - 鼠标事件，当用户通过鼠标在页面执行操作时触发如：dbclick、mouseup
   - 滚轮事件，当使用鼠标滚轮或类似设备时触发，如：mousewheel
   - 文本事件，当在文档中输入文本时触发，如：textInput
   - 键盘事件，当用户通过键盘在页面上执行操作时触发，如：keydown、keypress
   - 合成事件，当为IME（输入法编辑器）输入字符时触发，如：compositionstart
   - 变动事件，当底层DOM结构发生变化时触发，如：DOMsubtreeModified。
   
同时，DOM3级事件也允许我们使用自定义的事件。关于自定义事件我们将在下面讲解

## 3.自定义事件
可以在<strong>document</strong>对象上使用Event创建新的比较简单的事件：
```typescript
    let ev=new Event("look",{"bubbles":false,cancelable:false})
    document.dispatchEvent(ev)
    //事件可以在任何元素触发，不仅仅是documnet
    // addEvent("look",myDiv,fn)
    // myDiv.dispatchEvent(ev)
```
Event接受两个参数，第一个参数是创建事件的名称，第二个参数为可选参数，对事件进行初始化配置，为一个字典，接受以下字段：
- "bubbles",Boolean类型，默认值为false,表示该事件是否冒泡
- "cancelable",Boolean类型，默认值为false,表示该事件能否被取消
- "composed"，Boolean类型，默认值为false,指示事件是否会在<a href="https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/%E5%BD%B1%E5%AD%90_DOM">影子DOM</a>根节点之外触发侦听器。
还有一种创建事件的方法，是使用<strong>Event</strong>的<strong>createEvent</strong>方法:
```typescript
    let ev=document.createEvent('Event')

    ev.initEvent('click',true,false)
    addEvent('click',myDiv,fn)
    myDiv.dispatchEvent(ev)
```
这种方法不推荐，貌似initEvent即将被废弃，而<strong>createEvent</strong>创建的事件又必须使用<strong>initEvent</strong>初始化，所以就比较尴尬。