import { combineReducers } from 'redux'
import Categories from './categories'
import Posts from './posts'
import modalVisibleReducer from './modalvisible'

const rootReducer = combineReducers({
  categories: Categories,
  posts: Posts,
  modalvisible: modalVisibleReducer,
})

export default rootReducer
