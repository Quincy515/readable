import { combineReducers } from 'redux'
import Categories from './categories'
import Posts from './posts'

const rootReducer = combineReducers({
  categories: Categories,
  posts: Posts,
})

export default rootReducer
