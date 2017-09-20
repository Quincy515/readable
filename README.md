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

### 4. 使用 antd 和 CSS Modules 美化评论列表页面

