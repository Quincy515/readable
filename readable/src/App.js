import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Layout from './containers/Layout'
import PostDetail from './containers/PostDetail'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Layout}/>
          <Route exact path='/:category/:post_id' component={PostDetail}/>
        </div>
      </Router>
    );
  }
}

export default App
