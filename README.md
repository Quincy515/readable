# readable

Udacity's Redux course

where you will build a content and comment web app.

Users will be able to post content to predefined categories,

comment on their posts and other users' posts,

and vote on posts and comments.

Users will also be able to edit and delete posts and comments.

## 运行

```
# 打开服务器端口
cd api-server
node install
node server
# 打开前端页面
cd readable
node install
npm start
```

## 使用

[create-react-app](https://github.com/facebookincubator/create-react-app)

[antd](https://github.com/ant-design/ant-design)

[react-css-modules](https://github.com/gajus/react-css-modules)

[redux](https://github.com/reactjs/redux)

[react-redux](https://github.com/reactjs/react-redux)

[redux-logger](https://github.com/evgenyrodionov/redux-logger)

[redux-thunk](https://github.com/gaearon/redux-thunk)

[react-router-dom](https://github.com/ReactTraining/react-router)

[axios](https://github.com/mzabriskie/axios)

## 配置

### [antd 按需加载](https://ant.design/docs/react/introduce-cn#按需加载)
```
yarn add antd babel-plugin-import

#File: /readable/config/webpack.config.dev.js

// Process JS with Babel.
{
  test: /\.(js|jsx)$/,
  include: paths.appSrc,
  loader: require.resolve('babel-loader'),
  options: {
    // 改动: 添加 antd 按需加载文件处理插件
    plugins: [
      //['react-html-attrs'],//添加babel-plugin-react-html-attrs组件的插件配置
      // 引入样式为 css
      ['import', { libraryName: 'antd', style: 'css' }],
      // 改动: 引入样式为 less
      //  ['import', { libraryName: 'antd', style: true }],
    ],
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true,
  },
},
```

### exclude 和 include 配置 CSS Modules

安装

```
npm install css-loader style-loader react-css-modules
```

所有局部的样式都放到 src/styles/*.css 统一管理。

其它所有目录包括 第三方组件 中的样式都是全局的。

[修改readable/config/webpack.config.dev.js 添加 exclude\include\modules:true\localIdentName](https://github.com/custertian/readable/commit/44ac211f45e605493bb128b55d785d022579acfa#diff-98e693d57f0f3de077b4cbf1e156492fR201)

```
{
  test: /\.css$/,
  exclude: /src|styles\.css/, //path.resolve(__dirname, 'src/styles'),
  use: [
    require.resolve('style-loader'), {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
      }
    }, {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009'
          })
        ]
      }
    }
  ]
},
{
  test: /\.css$/,
  include: /src|styles\.css/,  // path.resolve(__dirname, 'src/styles'),
  use: [
    require.resolve('style-loader'), {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1, // 改动
        modules: true, // 新增对css modules的支持
        localIdentName: '[name]__[local]__[hash:base64:5]', //
      }
    }, {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          autoprefixer({
            browsers: [
              '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009'
          })
        ]
      }
    }
  ]
},
```

## 思路

### 1. 添加 router 路由

替换 App.js 代码

```
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import ListView from './components/ListView'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={ListView}/>
        </div>
      </Router>
    );
  }
}

export default App
```

### 2. 在 components 文件下新建 ListView.js

```
import React from 'react'

export default class ListView extends React.Component {
  render() {
    return <div>ListView</div>
  }
}
```

### 3. 查看 api-server 文档，从服务器取数据，显示到前端

```
    Welcome to the Udacity Readable API!

    Use an Authorization header to work with your own data:

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})

    The following endpoints are available:

    GET /posts
      USAGE:
        Get all of the posts. Useful for the main page when no category is selected.
```

使用 axios 获取数据

```
axios({
  method: 'get',
  url: 'http://localhost:3001',
  headers: {
    'Accept': 'application/json',
    'Authorization': '1234'
  }
}).then(res => console.log(res))
})
```

查看数据形式：

![](http://ovc37dj11.bkt.clouddn.com/15059088715908.jpg)

这里取data数据用state allpost 接收

```
.then(res => { this.setState({allpost: res.data}) })
```

在页面中用列表显示出来

```
render() {
    let {allpost} = this.state
    return (
      <ul>
        {allpost.map((post) => (
          <li key={post.id}>
            <div>
              <p>{'author: ' + post.author}</p>
              <p>Body: {post.body}</p>
              <p>category: {post.category}</p>
              <p>delete: {post.delete}</p>
              <p>id: {post.id}</p>
              <p>{'timestamp: ' + new Date(post.timestamp).toLocaleString()}</p>
              <p>{'title: ' + post.title}</p>
              <p>{'Vote score: ' + post.voteScore}</p>
            </div>
          </li>
        ))}
      </ul>
    )
}
```
![](http://ovc37dj11.bkt.clouddn.com/15059095812222.jpg)

ListView.js此时全部代码： [这是到这里为止中所做的更改](https://github.com/custertian/readable/commit/44ac211f45e605493bb128b55d785d022579acfa#diff-92a59bcb29677c04419ca01dd4e9b591R1)

```
import React from 'react'
import axios from 'axios'

const api = 'http://localhost:3001'
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
console.log(token)
const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export default class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allpost: []
    }
  }
  componentDidMount() {
    axios({
      method: 'get',
      url: `${api}/posts`,
      headers: {
        ...headers
      }
    }).then(res => {
      this.setState({allpost: res.data})
      console.log(res)
    })
  }
  render() {
    let {allpost} = this.state
    console.log(allpost)
    return (
      <ul>
        {allpost.map((post) => (
          <li key={post.id}>
            <div>
              <p>{'author: ' + post.author}</p>
              <p>Body: {post.body}</p>
              <p>category: {post.category}</p>
              <p>delete: {post.delete}</p>
              <p>id: {post.id}</p>
              <p>{'timestamp: ' + new Date(post.timestamp).toLocaleString()}</p>
              <p>{'title: ' + post.title}</p>
              <p>{'Vote score: ' + post.voteScore}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}
```

### 4. 使用 antd 和 CSS Modules 美化列表页面

![](http://ovc37dj11.bkt.clouddn.com/15059672155808.jpg)

[antd 表格 远程加载数据](https://ant.design/components/table-cn/#components-table-demo-ajax)

```
      <Table columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
```

[Column](https://ant.design/components/table-cn/#Column)

列描述数据对象，是 columns 中的一项，Column 使用相同的 API

```
const columns = [{
  title: 'Vote',
  width: '5%',
  dataIndex: 'index',
  render: (text, record) => (
    <span>
      <Icon type="like-o" onClick={()=>_voteForLink()} style={{cursor: 'pointer'}} />
      <span className="ant-divider" />
      <Icon type="dislike-o" onClick={()=>_voteForLink()} style={{cursor: 'pointer'}} />
    </span>
  ),
}, {
  title: 'Score',
  dataIndex: 'voteScore',
  sorter: (a, b) => a.voteScore - b.voteScore,
  width: '7%',
}, {
  title: 'Title',
  dataIndex: 'title',
  width: '30%',
}, {
  title: 'Date',
  dataIndex: 'timestamp',
  width: '10%',
  sorter: (a, b) => a.timestamp - b.timestamp,
}, {
  title: 'Author',
  dataIndex: 'author',
  width: '10%',
}, {
  title: 'Comments',
  dataIndex: 'comments'
},{
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <Link to="/">Editor</Link>
      <span className="ant-divider" />
      <Link to="/">Delete</Link>
    </span>
  ),
}];
```

[本次修改代码的提交记录](https://github.com/custertian/readable/commit/f17da5cf6d4f0811c383193e4f3dce101cab9e34#diff-92a59bcb29677c04419ca01dd4e9b591L1)

### 5. 拆分 Api.js

先把 API 请求拆分出来。在文件夹 utils 下面新建 Api.js,把 api 相关代码放进来

```
import axios from 'axios';

const api = 'http://localhost:3001'
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
console.log(token)
const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/**
 * GET /posts
 *    USAGE:
 *      Get all of the posts. Useful for the main page when no category is selected.
 */
export const fetchPost = () => {
  this.setState({ loading: true });
  return axios({
    method: 'get',
    url: `${api}/posts`,
    headers: {
      ...headers
    }
  }).then(res => {
    const pagination = { ...this.state.pagination }
    pagination.total = res.data.length
    this.setState({
      loading: false,
      data: res.data,
      pagination,
    })
    console.log(res)
  })
}
```

### 6. Create Actions

发现有很多与 state 和 setState 相关的代码，现在编写 actions

新建 actions 文件夹，创建 posts.js， 

新建一个 ALL_POSTS 常量，是可以将它们传递给 Reducer 函数。

然后创建 actions creators， 它将接收不同属性的对象 数据、分页、等待加载中

```
import * as API from '../utils/Api'
import * as ActionType from './constants'
// export const ALL_POSTS = 'ALL_POSTS'

export const AllPostsAction = (data) => {
  return {
    type: ActionType.ALL_POSTS,
    data,
  }
}

export const FetchPosts = () => {
  return dispatch => {
    API.fetchPost().then(response => {
      dispatch(AllPostsAction(response.data.assets))
    })
  }
}
```

在这里新建了一个文件 constants.js 常量文件，方便

```
export const ALL_POSTS = 'ALL_POSTS'
```

### 7. Create Reducers

reducer 负责创建应用程序的初始状态，之后该状态会保存在 store 中，

[reducer 是一个 JavaScript 函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce_clone)

reducer 接收两个参数，第一个参数是当前状态，reducer 总是要返回一个状态，

第二个参数是派发(dispatch)的 action，此action 用于决定要对状态作出何种变更。

**⚠️注意⚠️**这里说的变更，并不是修改状态，相反，是要复制现有的状态，修改副本

然后返回更新后的副本

```
function reducer (state, action) {
    switch (action.type) {
        case 'SUBMIT_USER' :
            return Object.assign({}, state, {
                user: action.user
            })
    }
}                
```

[Object.assign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

第一个参数是目标对象，后面的参数是（多个）源对象，返回目标对象，

所以我们的应用是返回状态或结构化数据

但是此数据的形状应该是怎么样的呢？ 是否应该是一个对象数组，还是包含一切数据的单个对象

具体的形状取决于功能。

无论状态的形状是什么样的，这是在开始编写reducer之前就应该决定的事情

需要花时间思考应用程序如何使用该数据，以及哪种格式最合适

只有在知道 状态 形状之后，才能构建 reducer 让它以正确的格式返回数据

-------
现在我们有 action，我们来构建 reudcer 来指定我们的状态将如何根据这些 action 而改变

新建一个 reducers 文件夹，创建 posts.js 文件与 actions 的文件名对应，

import 我们的 actions 中创建的常量, 创建一个初始化状态 initialState 对象，

我们的 reducer 函数传入 initialState 和 action 参数，并处理更改状态，

但是不直接修改，而是更新副本。

```
import * as ActionType from './constants'
// import ALL_POSTS from '../actions/posts'

/**
 * reducer 将指定我们 store 的形状，我们将初始状态粘贴到这里
 * 当 dispatch ALL_POSTS action 时，我们的 store 的状态如何变化
 */

const AllPostsReducer = (state=[], action) => {
  const { data } = action

  switch (action.type) {
    case ActionType.ALL_POSTS:
      return {
        ...state, // 对象扩展语法，与之前的状态相同
        data,     // 修改状态
      }
    default:
      return state
  }
}
```

### 8. Create A Redux Store

store 负责多件事情：

* holds the app's state 保存了应用程序的状态
* dispatches actions 派发action
* calls reducers 派发 action 之后调用 reducer 函数
* receives / stores new state 它还负责接收并存储新状态

const immaStore = Redux.createStore(<reducer>)

将 reducer 作为输入，而返回新的 store 对象

immaStore.getState() 返回 store 中的当前状态

immaStore.dispatch(<action object>) 接收action对象并将它传递给 reducer 函数

immaStore.subscribe(<listener function>) 接收listener函数，在状态发生变更时调用

-------

```
npm install redux
```

先安装 redux 包，修改index.js文件

```
# File: readable/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux'
import reducer from './reducers/posts'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
console.log(store)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

```

![](http://ovc37dj11.bkt.clouddn.com/15063036151828.jpg)

查看 store 的属性，

dispatch 用来派发具体动作的

getState 返回Redux store 的当前状态

subscribe 侦听 store 中的变更

-----

使 redux 应用与 redux 开发工具兼容

这样可以在应用程序中可以看到正在发生什么样的操作

我们的状态在根据这些操作发生哪些变化等等

我们要做的是，在 index.js 文件中，向 createStore 传递第二个参数

```
window.__REDUX__DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
```

如果 REDUX_DEVTOOLS_EXTENSION 存在于 window 对象，则直接调用它

它的作用是使我们可以使用 redux 开发工具

![](http://ovc37dj11.bkt.clouddn.com/15063042047875.jpg)

### 9. 结合起来，构建 Redux 应用

现在我们有了 actions、reducer 和 store，现在我们将它们连接到 react 应用，

看看他们是如何协同工作的

1. 在index.js中我们将 store 传递给应用组件，现在应用将接收 store 作为 props
2. 将完善应用组件以及该组件将渲染的UI代码
3. 在组件渲染完成之后，调用 componentDidMount 方法，我们想做的是从 props 抓取 store
4. 然后我们想订阅 redux store 中发生的任何变化，然后在发生任何变化时，我们想做的是调用 setState
5. 我们继续从stroe 中获取 store 将它放入本地组件 state 中，这将导致重新渲染

安装 react-redux，重启服务器

想之前提到的，我们要将 store 传递给 应用组件

但这问题是，如果应用组件有很多组件，且每个都需要 store 怎么办？

无论它们是需要发出任何东西还是需要访问 redux store 

问题是，每当这些子组件需要进行预 redux store相关的操作时

我们都需要将 store 向下传递给所有这些子组件

所以我们可以使用 provider 组件，它位于 react-redux 绑定上

那么我们可以将主要根组件包含在 provider 内

然后我们不将 store 传递给应用，而是将它传递给 provider

那么在将来，每当应用渲染的任何组件或应用本身需要访问 redux store 或发出操作时都能更容易


```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux'
import reducer from './reducers/posts'

import { Provider } from 'react-redux'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
console.log(store)

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
```

### 10. react-redux

Provider 组件为我们提供了一个非常便利的方式，来将 store 传递给所有子组件

但是，我们实际上仍需要一种方式来访问该 store 的 context，

而 react-redux 绑定正好能给我们这样做的 connect 方法

connect 将返回 inccurred 函数

使用connect 我们可以传入 store 状态的特定部分，

以及调度给我们的组件访问 props 的操作

```
ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, document.getElementById('root'));
```

我们将APP 组件包裹在 provider 中并传入 store

任何需要派发或需要从 store 获取状态的组件都可以使用 react redux 的 connect 函数

在我们的ListView.js 中引入 connect 函数，然后就不只是导出 ListView

我们还要导出 connect 并注意我们将调用(invoke)它

它会向我们返回一个全新的函数，然后我们可以传递组件,

用日志记录 this.props

```
import React from 'react'
import { connect } from 'react-redux'

class ListView extends React.Component {
  render() {
    console.log('Props', this.props)
    return (
      <h1>HelloWorld</h1>
    )
  }
}

export default connect()(ListView)
```

![](http://ovc37dj11.bkt.clouddn.com/15063092218508.jpg)

如果需要在一个组件内派发 action，需要做的事连接该组件，然后就可以调用 dispatch 了

#### mapStateToProps

mapStateToProps 函数要做的是将我们的 Redux 状态映射到组件 props

那么此函数将接收我们的状态作为第一个参数，此函数返回的将传递给 ListView 组件

可以稍微调整数据格式

那么在 mapStateToProps 中，它将返回我们想要从 Redux store 获取并传递给组件的状态

我们可以按想要的方式重新格式化数据的形状

将 redux 状态映射到特定组件的 props，我们可以用日志记录我们的应用组件在接收的props

#### mapDispatchToProps

那么我们来导入 action 创建器，这样我们就能看到在 dispatch action时应用是什么样子的

这些都来自我们的 actions 文件

我们创建 mapDispatchToProps 函数，它将 dispatch 方法映射到特定的 props

所以我们将向此方法传递 dispatch，而返回的就像在 mapStateToProps中一样，

将作为 props 传递给我们的组件

```
doThing = () => {
    this.props.dispatch(addRecipe({}))
}
```

```
function mapDispatchToProps(dispatch){
    return {
        selectRecipe: (data) => dispatch(addRecipe(data)),
        remove: (data) => dispatch(removeFromCalendar(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
```

```
doThing = () => {
    this.props.selectRecipe({})
}
```

现在我们的组件 props 上将有一个 selectRecipe 方法和一个 remove 方法

然后当这些函数调用时，它们将自动为我们派发

再次说明，这是一种可选的方法，如果不想用也可以不用

**⚠️注意⚠️** 由于我们在使用 mapDispatchToProps，所以我们不再在组件中接收 dispatch 作为 props

我们在这里接收 selectRecipe 和 remove 将在被调用时自动派发

我们基本上将 action 创建器包裹在 mapDispatchToProps 中的dispatch 内

以使我们的组件更简洁一些。

因为我们现在可以直接调用 this.props 加上 mapDispatchToProps 中的方法就可以了

![](http://ovc37dj11.bkt.clouddn.com/15063268999665.jpg)

可以看到此时已经没有 dispatch 了，而是改变为了 fetchAllPosts

```
# File: src/actions/constants.js

export const ALL_POSTS = 'ALL_POSTS'
```

```
# File: src/utils/Api.js

import axios from 'axios';

const api = 'http://localhost:3001'
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
console.log(token)
const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/**
 * GET /posts
 *    USAGE:
 *      Get all of the posts. Useful for the main page when no category is selected.
 */
export const fetchPost = () => {
  return axios({
    method: 'get',
    url: `${api}/posts`,
    headers: {
      ...headers
    }
  })
}

```

```
# File: src/actions/posts.js

import * as API from '../utils/Api'
import * as ActionType from './constants'

export const setPost = (posts) => {
  return {
    type: ActionType.ALL_POSTS,
    posts,
  }
}

export const addPost = () => {
  return dispatch => {
    API.fetchPost().then(data => dispatch(setPost(data)))
  }
}
```

```
# File: src/reducers/posts.js

import * as ActionType from '../actions/constants'

/**
 * reducer 将指定我们 store 的形状，我们将初始状态粘贴到这里
 * 当 dispatch ALL_POSTS action 时，我们的 store 的状态如何变化
 */

const AllPostsReducer = (state=[], action) => {
  switch (action.type) {
    case ActionType.ALL_POSTS:
      return action.posts
    default:
      return state
  }
}

export default AllPostsReducer

```

```
# File: ListView.js

import React from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions/posts'

class ListView extends React.Component {
  componentDidMount() {
    this.props.addPost();
  }
  render() {
    console.log('Props', this.props)
    const { posts } = this.props
    console.log('posts', posts)
    return (
      <div>
      <ul>
        {posts && (posts.map((post) => (
          <li key={post.id}>
            <div>
              <p>{'author: ' + post.author}</p>
              <p>Body: {post.body}</p>
              <p>category: {post.category}</p>
              <p>delete: {post.delete}</p>
              <p>id: {post.id}</p>
              <p>{'timestamp: ' + new Date(post.timestamp).toLocaleString()}</p>
              <p>{'title: ' + post.title}</p>
              <p>{'Vote score: ' + post.voteScore}</p>
            </div>
          </li>
        )))}
      </ul>
      </div>
     )
  }
}
const mapStateToProps = (state, props) => {
  console.log('state', state)
  console.log('props', props)
  return { posts: state.data };
}
export default connect(mapStateToProps, {addPost})(ListView)
```

mapDispatchToProps 的使用是包裹 action creator 的 dispatch 方法，在组件中直接调用 mapDispatchToProps 方法就可以[此次修改的代码可以查看](https://github.com/custertian/readable/commit/63e3d739f07066436e04a624eb74859c28c6a188)

```
# File: src/App.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ListView from './components/ListView'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={ListView}/>
        </div>
      </Router>
    );
  }
}

export default App
```

```
# File: src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers/posts'

import { Provider } from 'react-redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// console.log(store)

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
```

### 11. antd 美化 + 排序

```
# File: src/components/ListView.js

import React from 'react'
import { Icon, Table } from 'antd';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost } from '../actions/posts'
import * as API from '../utils/Api'

const columns = [{
  title: 'Vote',
  width: '5%',
  dataIndex: 'index',
  render: (text, record) => (
    <span>
      <Icon type="like-o" onClick={()=>_voteForLink()} style={{cursor: 'pointer'}} />
      <span className="ant-divider" />
      <Icon type="dislike-o" onClick={()=>_voteForLink()} style={{cursor: 'pointer'}} />
    </span>
  ),
}, {
  title: 'Score',
  dataIndex: 'voteScore',
  sorter: (a, b) => a.voteScore - b.voteScore,
  width: '7%',
}, {
  title: 'Title',
  dataIndex: 'title',
  width: '30%',
}, {
  title: 'Date',
  dataIndex: 'timestamp',
  width: '10%',
  sorter: (a, b) => a.timestamp - b.timestamp,
}, {
  title: 'Author',
  dataIndex: 'author',
  width: '10%',
}, {
  title: 'Comments',
  dataIndex: 'comments'
},{
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <Link to="/">Editor</Link>
      <span className="ant-divider" />
      <Link to="/">Delete</Link>
    </span>
  ),
}];
const _voteForLink = async () => {
  console.log('voteForLink')
}


class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination: {},
      loading: false,
    }
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    API.fetchPost().then(res => {
      const pagination = {
        ...this.state.pagination
      }
      pagination.total = res.data.length
      this.setState({loading: false, pagination})
    })
  }
  componentDidMount() {
    this.props.fetchAllPosts();
  }
  render() {
    const { posts } = this.props
    if (!posts){
      return <div>Loading...</div>
    }
    return (
      <Table columns={columns}
        rowKey={record => record.id}
        dataSource={posts}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    )
  }
}
const mapStateToProps = (state, props) => {
  return { posts: state.data };
}

const mapDispatchToProps = (dispatch) => {
  return{
    fetchAllPosts: (data) => dispatch(addPost())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
```

**⚠️注意⚠️**这里使用了 API.js 和 setState 因为这里是分页功能

所以这里有两个问题：

1. API 和 setState 的使用
2. loading: true 应该怎么使用

[此次代码的修改](https://github.com/custertian/readable/commit/70b2929ed60ab2405bc05f14e8ac8ddd40bf63a0)

### 12. vote 功能书写

在 API.js 中增加 vote 功能的 api 请求代码：

```
/**
 * POST /posts/:id
 *    USAGE:
 *        Used for voting on a post
 *      PARAMS:
 *        option - String: Either "upVote" or "downVote"
 */
export const VotePost = (postId, option, callback) => {
  axios({
    method: 'post',
    url: `${api}/posts/${postId}`,
    data: {option: option},
    headers: { ...headers }
  }).then(() =>  callback())
}
```

在 actions posts.js 中增加 vote 

```
// vote 投票
export const voteAction = (postId, option) => {
  return {
    type: ActionType.VOTE,
    postId,
    option,
  }
}
export const voteChange = (postId, option, callback) => {
  console.log(callback)
  return dispatch => {
    API.VotePost(postId, option, callback).then(data => dispatch(voteAction(data)))
  }
}
```

在 reducers posts.js 中增加 ActionType.VOTE

```
    case ActionType.VOTE:
      console.log('$$ reducer posts')
      const newState = { ...state }
      if(action.option==='upVote'){
        newState[action.postId]['voteScore'] = ++newState[action.postId]['voteScore']
      }else if(action.option==='downVote'){
        newState[action.postId]['voteScore'] = --newState[action.postId]['voteScore']
      }
      return newState
```

最后在 ListView.js 中连接 reducers 和 actions

```
import React from 'react'
import { Icon, Table } from 'antd';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost, voteChange } from '../actions/posts'
import * as API from '../utils/Api'

class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination: {},
      loading: false,
    }
    // this.loading = this.state.loading
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      loading: true,
      pagination: pager,
    });
    API.fetchPost().then(res => {
      const pagination = {
        ...this.state.pagination
      }
      pagination.total = res.data.length
      this.setState({ loading: false, pagination})
      // console.log('排序',res.data.length)
    })
  }
  componentDidMount() {
    this.props.fetchAllPosts();
    // console.log(this.props.fetchAllPosts())
  }
  _voteForLink = async (postId, option) => {
    this.props.vote(postId.id, option,()=>{
      window.location.reload()
      // this.props.history.push('/')
    })
  }
  render() {
    // console.log('Props', this.props)
    const { posts } = this.props
    if (!posts){
      // this.loading = true
      return <div>Loading ...</div>
    }
    console.log('posts', posts)

    const columns = [{
      title: 'Vote',
      width: '5%',
      dataIndex: 'index',
      render: (text, record) => (
        <span>
          <Icon type="like-o" onClick={()=>{
            const id = record.id;
            this._voteForLink({id}, 'upVote')}} style={{cursor: 'pointer'}} />
          <span className="ant-divider" />
          <Icon type="dislike-o" onClick={()=>{
            const id = record.id;
            this._voteForLink({id}, 'downVote')}} style={{cursor: 'pointer'}} />
        </span>
      ),
    }, {
      title: 'Score',
      dataIndex: 'voteScore',
      sorter: (a, b) => a.voteScore - b.voteScore,
      width: '7%',
    }, {
      title: 'Title',
      dataIndex: 'title',
      width: '30%',
    }, {
      title: 'Date',
      dataIndex: 'timestamp',
      width: '10%',
      sorter: (a, b) => a.timestamp - b.timestamp,
      render: text => <span>{(new Date(text)).toLocaleString()}</span>,
    }, {
      title: 'Author',
      dataIndex: 'author',
      width: '10%',
    }, {
      title: 'Comments',
      dataIndex: 'comments'
    },{
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to="/">Editor</Link>
          <span className="ant-divider" />
          <Link to="/">Delete</Link>
        </span>
      ),
    }];

    return (
      <Table columns={columns}
        rowKey={record => record.id}
        dataSource={posts}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    )
  }
}
const mapStateToProps = (state, props) => {
  // console.log('state', state)
  // console.log('props', props)
  return { posts: state.data };
}

const mapDispatchToProps = (dispatch) => {
  return{
    fetchAllPosts: (data) => dispatch(addPost()),
    vote: (postId, option, callback) => dispatch(voteChange(postId, option, callback)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
```

[此次修改的代码 提交记录]()


