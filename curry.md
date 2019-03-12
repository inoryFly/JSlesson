## 1.简单介绍

    在计算机科学中，柯里化（英语：Currying），又译为卡瑞化或加里化，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术

## 1.简单实现
    ```bash
        let test:(fn:Function)=>Function=function(fn){
            let args=[].slice.call(arguments,1)
            return function(){
                return fn.apply(this,args.concat([].slice.call(arguments)))
            }
        }
    ```