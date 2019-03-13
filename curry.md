## 1.简单介绍

-       在计算机科学中，柯里化（英语：Currying），又译为卡瑞化或加里化，是把接受多个参数的函数变换成接受  
    一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术

## 2.简单实现
```typescript
    let testCurry:(fn:Function)=>Function=function(fn){
        let args=[].slice.call(arguments,1)
        return function(){
            return fn.apply(this,args.concat([].slice.call(arguments)))
        }
    }
```

## 3.提高适用性--降低适用范围
-    例如：一般性得封装ajax，需要传递请求方式，请求数据,请求地址，以及其它配置
```typescript
    let ajaxFunc=function(type,url,data){
        let ajxhr=new XMLHttpRequest()
        ajxhr.open(type, url, true);
        ajxhr.send(data);
    }
```
-    调用得时候则是：
```typescript
    ajaxFunc("post","test.com","name=inory")
```
-    如果我们使用了curry进行简化调用：
```typescript
    let post=testCurry(ajaxFunc,"post")
```
-    现在调用则变得简单：
```typescript
    post("test.com","name=inory")
```
     尽管调用变得简单了，但是函数也不能执行get等方法了，如果想要使用get方法，要么如下调用：
```typescript
    ajaxFunc("get","test.com","name=inory")
```
     要么再执行一遍curry函数：
```typescript
    let get=testCurry(ajaxFunc,"get")
```

## 4.延迟执行
-   假设我们有下面一个函数:
```typescript
    let commonFunc:(...resetParams:Array<number>)=>number=function(){
        let total=0;
        for(let i=0;i<arguments.length;i++){
            total +=arguments[i]
        }
        return total
    }
    commonFunc(1,2)
```
    这个函数一次性无论输入多少个参数，都会立即执行，但是，有些时候我们的参数不是一次性获取的，那么我们就可以使用上curry函数了：
```typescript
        let curry2:(fn:Function,...resetParams:Array<number>)=>Function=function(fn){
            let args=[].slice.call(arguments,1)
            let len:number=fn.length
            return function(){
                if(len != arguments.length){
                    args=args.concat([].slice.call(arguments))
                    return curry2(fn,...args)
                }else{
                    return fn.apply(this,args)
                }
            }
        }
```
    我们可以这样来调用：
>   let resultFunc=curry2(commonFunc,1,2)  
此时函数只存储了参数，并没有进行相应的计算操作，如果再接受一个参数就需要马上执行的话，代码如下：
>   resultFunc(2)()
