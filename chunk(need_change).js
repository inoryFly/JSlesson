/**
 * 初级：未切分的代码块
 * 页面卡顿，半天无法渲染出来，不能做其它事
 */
let tbody = document.getElementsByTagName('tbody')[0]
let fragment = document.createDocumentFragment()
let allLines = 10000,time=100,current=100
// console.time('wd');
// for (var i = 0; i < allLines; i++) {
//     var tr = document.createElement('tr');

//     for (var j = 0; j < 10; j++) {
//         var td = document.createElement('td');

//         td.appendChild(document.createTextNode(i + ',' + j));
//         tr.appendChild(td);
//     }
//     fragment.appendChild(tr)
//     tbody.appendChild(fragment);
// }

// //wd: 871.188232421875ms
// console.timeEnd('wd');
//在浏览器中，Javascript执行与UI更新是发生在同一个进程(浏览器UI线程)中的。
//UI线程的工作基于一个简单的队列系统，任务会被保存到队列 中直到进程空闲时被提取出来执行。
//所以Javascript的执行会阻塞UI更新;反之，UI更新也会阻塞Javascript的执行。
//给用户的表现就是 浏览器在工作时短暂或长时间失去反应，用户的操作不能及时得到响应。
//而UI线程的阻塞很多时候是由于我们要在代码里进行长时间的脚本运算，超过了浏览器限 制，导致浏览器失去响应，冻结用户界面
/**
 * 进阶：利用setTimeOut切分代码块,不用setIntervel的原因很简单
 * 打开即所见，可以执行其它事情，不阻塞
 * 条件：1.数据的处理不需要按照特定的顺序
 *  2.是否必须同步处理，如果必须同步处理那么定时器不适用；
 * @param {number} number 一次执行多少条
 */

let mergeCode = function () {
    let tbody = document.getElementsByTagName('tbody')[0]
    let fragment = document.createDocumentFragment()
    console.time('wd');
    if(current<=allLines){
        for (var i = 0; i < time; i++) {
            var tr = document.createElement('tr');
    
            for (var j = 0; j < 10; j++) {
                var td = document.createElement('td');
    
                td.appendChild(document.createTextNode(i + ',' + j));
                tr.appendChild(td);
            }
            fragment.appendChild(tr)
    
        }
        tbody.appendChild(fragment);
        current+=time
        setTimeout(mergeCode,0)
    }
    console.timeEnd('wd');
}
mergeCode()

/**
 * 高阶：async+setTimeout
 */
