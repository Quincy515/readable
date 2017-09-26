import { createStore } from 'redux'
import reducer from '../reducers/posts'

const configureStore = () => {
  const store = createStore(reducer)
  console.log('store', store)
  return store
}

export default configureStore
