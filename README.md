# 组件的抽取
抽取组件的原则：
- 未来可能需要 **复用**。
- 如果该部分频繁改变时，可能把它单独抽离成一个组件，提高 **页面更新** 的效率。

## vant组件库
- 轮播图的组件。
- 时间选择组件。
- 数字键盘组件。
- 滑动单元格组件。
- 等等。
## 标签栏组件
标签栏组件是由 多个TabBarItem组件构成的。
- TabBarItem组件留了一些插槽，为了在TabBar中进行 图片和文字的填充。
- 每个TabBarItem组件 都要 接收 **path属性**，用来表示该组件是属于哪一个路由。
- 每个TabBarItem组件都有一个点击事件，来激活该路由。
## 导航栏组件
一般分为三个区域，返回 + 内容 + 确定。也是通过预留插槽实现。
## 记账金额组件
这个组件 在 **记账页**、**编辑页** 以及后面 **设置预算** 都要使用，因此出于 **复用** 的考虑，把它封装成了一个组件，对外的属性是 String类型的 金额数值，以及String类型的 颜色。

- **金额数值为什么是 String类型？**
主要是因为键盘输入是一个数字一个数字输入的，删除也是，存储为字符串处理起来较为方便。
- 存储为字符串就涉及到一个 **"异常输入" 的处理**：
	- 连续输入多个 小数点。
	- 小数点后超过两位数。
	- 整数时输入多个0。
- 每次输入时，如果有小数点，按小数点来split，取前两个位置分别作为整数和小数部分。整数部分如果小数点前没有数字或者转为数字后为0，则最后为0，小数部分则直接截取。
- 如果没有小数点，则先将字符串转为int类型，然后再转为字符串。
- 删除时，如果字符串最后一位是小数点，需要连删两位。
- 显示时，为了看上去像是金额，显示为两位小数。

颜色主要是为了区分是收入，还是支出。

同时对外提供两个方法，
- 一个是 numChange(newVal)方法，每次点击键盘都会触发，给外面的大组件 **BillBar** 传 金额的实时数值。
- 一个是 valueSend(newVal)方法，只在点击"完成"时触发一次，在设置预算时用到。
## 记账组件
考虑到 记账金额和 记账的类别 **收入支出都需要**，而且会被 **复用到编辑页面** 中，因此将 该整体又封装为一个 **BillBar** 组件。对外提供了三个属性：
- isOut：用来标记是收入还是支出，这决定了 **记账金额的样式** 以及 **分类数据**。
- billData：账单数据的初始值，在 **编辑页面** 中需要传入。
- trys：int类型，初始值为0。由于这个组件比较特殊，**所有的账单数据都存储在这个组件中，而提交操作却在这个组件外**。一旦外部发生提交操作，则trys++，该组件内部通过监听这个trys属性，来执行提交数据操作。

**预算提醒**

同时，由于 **提交数据** 发生在这个组件中，那么  **提交前进行预算提醒** 这个功能也是在这个组件内完成的。

- 首先从 **Vuex** 中拿到 首页中计算好的 **预算剩余**。
- 如果是编辑页，还要加上传入的 金额。
- 然后 再减去 当前的记账金额，得到 **本次记录后的预算剩余**。
- 只要在 **编辑支出** 并且 **预算剩余小于0**，并且 **提醒开启** 的时候，才会进行预算提醒。

## 图表组件
- 折线图 接收 x数组和 y数组 这两个属性，内部方法包括 **初始化折线图实例对象**，以及 **更新折线图** 这两个方法。
- 饼状图类似，只接收 **各分类及对应值 的对象数组** 这一个属性。
- 全局对象$echarts。
- 提供一个echarts实例挂载的容器，用ref标记。
  - 这里需要挂载到 DOM节点上，且该 **图表组件(如折现图组件)可能有多个实例**，因此无法使用id来获取DOM；如果使用class，则会拿到所有实例。
  - 往往是在需要拿到DOM节点时，通过ref拿到 **自己组件中的那个DOM节点**。
- 网络请求：
  - 用户id + 月报还是年报 + 查询时间 => 各天或各月数据(折线图) + 各类别数据(饼图)。
  - 图表依赖的数据 **是在父组件中异步请求得到的**，因此组件中需要监听这些数据的变化，来实时更新图表。

# 网络请求axios

# 存储

## vuex

- 应用
  - 预算数据 需要在 **Home页(读)** 和 **Profile页(读写)** 这两个页面中使用，因此 考虑采用 Vuex存储。

## bus

本质上就是 **发布订阅模式**。

- 应用
  - "正在加载中"页面的显示与隐藏的状态，可以通过bus来传递。


# 工程化
## webpack

# 代码的一些规范

- base.css 在 css中使用变量， @import "./asserts"是什么语法。
- vue.config.js 配置 webpack(文件夹别名)。
- DOM中使用 别名，需要加上 "~"。
- router-view 的实现原理。

- 给request再次封装，设置home.js，内部封装 对于 首页的所有请求数据。
- 将swipper封装成一个组件(放在View中的home文件夹下的childComps)，props为 url 数组。

# 遇到的困难，经验？

## 1. you may have an infinite update loop in watcher?

- 该watcher监听的那个数据，发生改变后，触发watcher方法，执行watcher中的代码。重点来了！这部分代码内很有可能会 **再次修改** 这个数据，造成无限循环。
- 解决方案：将代码内 **再次修改数据的部分**， 利用 computed 将 修改完后的结果 缓存下来。

## 2. 关于 **异步请求的数据，向子组件传递时**，子组件怎么拿到最新值？

- watch监听变化。
- ...

## 3. 数据库操作往往是异步的，"正在加载中"怎么做？

- 首先写一个 "正在加载中" 的页面，然后用 一个标志 控制它的隐藏和显示。
- 关键就在于这个标志 通过什么方式 **存储** 和 **修改** 呢？可以使用bus 或 vux，以bus为例。

  - 在 "正在加载中" 页面 注册一个待触发的事件。如下，该事件名为"Loading"。

    ```javascript
    updateState() {
        // 注册Loading事件。本质上是向名为Loading的事件中，加入了一个回调函数。
        // 一旦后续有人发送 名为Loading的事件，该回调函数就会被执行。
        this.$bus.$on("Loading", flag => {
            this.isShow = flag;
        })
    }
    ```

  - 在 请求时，将该页面 显示。在 响应时，将该页面隐藏。

    ```javascript
    // 请求拦截
    requestAxios.interceptors.request.use(
        config => { 
            $bus.$emit("Loading", true)
            return config;
        }
    )
    // 响应拦截
    requestAxios.interceptors.response.use(
        res => { 
            $bus.$emit("Loading", false)
            return res;
        }
    )
    ```

## 4. \<cpn>文本\</cpn>，cpn组件内部怎么获取文本？



