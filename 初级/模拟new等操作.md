## 1.new操作符做了什么

- 创建了一个全新的对象
- 这个对象会被执行<span style="color:red">__proto__</span>链接
- 生成的新对象会绑定到函数调用的this
- 通过new创建的每个对象将最终被<span style="color:red">__proto__</span>链接到这个函数的<span style="color:red">prototype</span>对象上
- 如果函数没有返回对象类型<span style="color:red">Object</span>(包含Function,Array,Date,RegExg,Error)，那么new表达式中的函数调用会自动返回这个新的对象。

## 2.模拟代码（new）
```javascript
function simulationNew(originObj){
    if(typeof originObj !='function'){
        throw "function simulationNew first param must be a function"
    }
    let newObj=Object.create(originObj.prototype)
    let arg=[].slice.call(arguments,1)
    let originResult=originObj.apply(newObj,arg)
    let flag=false
    if(originResult){
        if(typeof originResult =='object' || typeof originResult=='function'){
            return originResult
        }
    }
    return newObj
}
```

## 3.bind做了什么

    简单来说，就是绑定了this。bind方法会创建一个新函数，当这个新函数被调用时，bind的第一个参数将作为它运行时的this,之后的一系列参数将会在传递的实参前传入作为它的参数。

## 4.模拟代码（bind）

```javascript
    Function.prototype.bind=Function.prototype.bind||function(context){
        var that=this
        let args=[].slice.call(arguments,1)
        return function(){
            let final=args.concat([].slice.call(arguments))
            return that.apply(context,final)
        }
    }
```