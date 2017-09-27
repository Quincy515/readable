import * as ActionType from '../actions/constants'

const reducer = (state=[], action) => {
  switch(action.type){
    case ActionType.ALL_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

export default reducer
