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
>    ajaxFunc("post","test.com","name=inory")
-    如果我们使用了curry进行简化调用：
>    let post=testCurry(ajaxFunc,"post")
-    现在调用则变得简单：
>    post("test.com","name=inory")
