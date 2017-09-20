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
