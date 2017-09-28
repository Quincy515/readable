import * as ActionType from '../actions/constants'

const initialState = {
  newPostModalVisible: false,
}
const modalVisibleReducer = (state=initialState, action) => {
  switch (action.type) {
    case ActionType.SHOW_NEW_POST_MODAL:
      return Object.assign({}, state, { newPostModalVisible: true })
    case ActionType.CLOSE_NEW_POST_MODAL:
      return Object.assign({}, state, { newPostModalVisible: false })
    default:
      return state
  }
}
export default modalVisibleReducer
