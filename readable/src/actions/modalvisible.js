import * as ActionType from './constants'

export function newPost() {
  return {
    type: ActionType.SHOW_NEW_POST_MODAL
  }
}

export function closeNewPostModal() {
  return {
    type: ActionType.CLOSE_NEW_POST_MODAL
  }
}
