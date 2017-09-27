import * as API from '../utils/Api'
import * as ActionType from './constants'

// 获取所有分类
export const CategoriesAction = (categories) => {
  return {
    type: ActionType.ALL_CATEGORIES,
    categories,
  }
}

export const CategoriesFunc = () => {
  return dispatch => {
    API.fetchCategories().then(data => dispatch(CategoriesAction(data)))
  }
}

// 获取一个分类下的所有posts
export const CategoryPostsAction = (categoryPosts) => {
  return {
    type: ActionType.CATEGORY_POSTS,
    categoryPosts,
  }
}

export const CategoryPostsFunc = (category) => {
  return dispatch => {
    API.fetchCategoryPosts(category).then(data => dispatch(CategoryPostsAction(data)))
  }
}
