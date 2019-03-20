<h1 align="center">React高阶组件</h1>

## 背景知识
<div>
　　在开始讲述高阶组件前，我们先来回顾高阶函数的定义：接收函数作为输入，或者输出另一个函数的一类函数，被称作高阶函数。<br/>

>  let higerFunc:(fn:Function)=>Function

<strong>高阶组件本质上也是一个函数，并不是一个组件。</strong>对于高阶组件，它描述的便是接受React组件作为输入，输出一个新的React组件的组件。
>  let Hoc1:(WrappedComponent:React.Component)=>React.Component 

带有参数的时候：

>  let Hoc2:(...resetParams:Array\<any\>)=>(WrappedComponent:React.Component)=>React.Component
</div>

## 使用场景及使用方法
<div>
　　高阶组件实用性很高，应用场景广泛，上到注入props成为受控组件、抽象state，下到减少冗余代码和渲染劫持。其调用也很简单，主要有两种方式：  <br/>
<ol>
　　<li>
　　高阶函数方式：

```typescript
        let NewComponent1=hocWrapped(WrappedComponent)
        let NewComponent2=hocWrapped(perhapsParams)(WrappedComponent)
```
这时候 <strong>hocWrapped</strong>已经变成了一个高阶函数，只不过返回的是一个高阶组件。这种形式大量出现在第三方库中，如dva中的connect就是一个典型: 
> connect([mapStateToProps])(WrappedComponent)
</li>
<li>
    修饰器模式：

```typescript
        @hocWrapped
        class WrappedComponent extends Component{/* Code */}
```        
带有参数的时候:

```typescript
        @hocWrapped(perhapsParams)
        class WrappedComponent extends Component{/* Code */}
```
装饰器模式即允许向一个现有的对象添加新的功能，同时又不改变其结构，属于包装模式的一种。同时，有多个装饰器的时候，会像剥洋葱一样，从内到外进入，然后由内到外执行。

```typescript
        @hocWrapped1   //secondAction
        @hocWrapped2  //firstAction
        class WrappedComponent extends Component{/* Code */}
```
</li>
</div>

## 与父组件的区别
<div>
　　从逻辑的执行流程上来看，高阶组件确实和父组件比较相像，但是高阶组件强调的是逻辑的抽象。高阶组件是一个函数，函数关注的是逻辑；父组件是一个组件，组件主要关注的是UI/DOM。如果逻辑是与DOM直接相关的，那么这部分逻辑适合放到父组件中实现；如果逻辑是与DOM不直接相关的，那么这部分逻辑适合使用高阶组件抽象，如数据校验、请求发送等。

```typescript
        {React.Children.map(children, child => {
          return React.cloneElement(child, null, React.Children.map(child.props.children, childs => {
            return React.cloneElement(childs, { stationid: this.state.stationid,
                type:this.state.type,
                allrangePickerValue:this.state.rangePickerValue
            });
          }));
        })}
```
</div>

## 书写形式

### 1.属性代理

本来传给<strong>WrappedComponent</strong>的props,在hoc中都接受到了，也就是属性代理。借此，我们可以做一些操作：
- 操作props
  比如说添加自定义事件，属性
- refs获取组件实例
- 抽离state。这里不是通过ref获取state， 而是通过 { props, 回调函数 } 传递给wrappedComponent组件，通过回调函数获取state。这里用的比较多的就是react处理表单的时候，比如说antd的<strong>Form.create()</strong>,通常react在处理表单的时候，一般使用的是受控组件（文档），即把input都做成受控的，改变value的时候，用onChange事件同步到state中。
```typescript
       const HocWrap=(WrappedComponent)=>{
               return class Hoc extends Component{
                       state={
                               pagenumber:0,
                               pagesize:10
                       }
                       //注意这里的生命周期,不会覆盖被包裹的组件生命周期
                       componentWillUnmount(){
                               /** Code 
                               such as clear datas
                               **/
                       }
                       componentDidMount(){
                               this.refresh()
                       }
                       refresh(){
                               /** Code 
                               such as table datas request
                               **/
                       }
                      
                       onChangePagination=(page, pageSize) =>{
                               this.setState({
                                       pagenumber:page -1,
                                       pagesize:pageSize
                               },()=>{
                                       this.refresh()
                               })
                       }
                       render(){
                               const {pagenumber,pagesize}=this.state
                               const newProps={
                                       onChangePagination:this.onChangePagination,
                                       pagenumber,pagesize
                               }
                               return <WrappedComponent {...this.props}  {...newProps}/>
                       }
               }
       }
```  

### 2.反向继承
跟属性代理的方式不同的是，反向继承采用同过去继承wrappedComponent。本来是一种嵌套的关系，结果反向继承采返回的组件却继承了WrappedComponent，这看起来是一种反转的关系。
通过继承WrappedComponent，除了一些静态方法，包括生命周期，state，各种function，我们都可以得到。但是值得注意的是，我们可以通过高阶组件来给wrappedComponent创建新的生命周期挂钩方法，但是需要调用<strong>super[lifecycleHook]</strong>防止破坏wrappedComponent。
- 渲染劫持
- 操作state

```typescript
        const HocII=WrappedComponent=>{
                return class exens extends WrappedComponent{
                        //注意，需要手动
                        componentDidMount(){
                                /** public Code **/
                                super.componentDidMount()
                        }
                        render(){
                                        if(this.props.isLoading){
                                               return <LoadingComponents />
                                        } else {
                                                return super.render()
                                        }
                        }
                }
        }
```


## 注意事项
- 不要在组件的render方法中使用高阶组件，尽量也不要在组件的其他生命周期方法中使用高阶组件。因为高阶组件每次都会返回一个新的组件，在render中使用会导致每次渲染出来的组件都不相等（===），于是每次render，组件都会卸载（unmount），然后重新挂载（mount），既影响了效率，又丢失了组件及其子组件的状态。高阶组件最适合使用的地方是在组件定义的外部，这样就不会受到组件生命周期的影响了。
- 如果需要使用被包装组件的静态方法，那么必须手动拷贝这些静态方法。因为高阶组件返回的新组件，是不包含被包装组件的静态方法。
- Refs不会被传递给被包装组件。尽管在定义高阶组件时，我们会把所有的属性都传递给被包装组件，但是ref并不会传递给被包装组件，因为ref根本不属于React组件的属性。如果你在高阶组件的返回组件中定义了ref，那么它指向的是这个返回的新组件，而不是内部被包装的组件。如果你希望获取被包装组件的引用，你可以把ref的回调函数定义成一个普通属性（给它一个ref以外的名字）。

```typescript
        const HocWrap=WrappedComponent=>{
                return class Hoc extends Component{
                        render(){
                                let newprops = {
                                        ref:this.props.getInstance
                                }
                                return <WrappedComponent {...this.props} {...newprops}/>
                        }
                }
        }
```

在16.4之后可以通过给定的<strong>forwardedRef</strong>进行转发：

```typescript
        const HocWrap=WrappedComponent=>{
                class Hoc extends Component{
                        render(){
                                let {forwardedRef,...reset}=this.props
                                return <WrappedComponent {...reset} ref={forwardedRef}/>
                        }
                }
                return React.forwardRef((props,ref)=><Hoc {...props} forwardRef={ref}>)
        }
```
