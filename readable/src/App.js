import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Layout from './containers/Layout'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Layout}/>
        </div>
      </Router>
    );
  }
}

export default App
