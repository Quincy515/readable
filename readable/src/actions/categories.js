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
