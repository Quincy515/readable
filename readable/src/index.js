import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/reducers'

import { Provider } from 'react-redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// console.log(store)

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
