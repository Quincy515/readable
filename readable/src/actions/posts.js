import * as API from '../utils/Api'
import * as ActionType from './constants'

// 获取所有的 posts
export const setPost = (posts) => {
  return {
    type: ActionType.ALL_POSTS,
    posts,
  }
}

export const addPost = () => {
  return dispatch => {
    API.fetchPost().then(data => dispatch(setPost(data)))
  }
}

// vote 投票
export const voteAction = (postId, option) => {
  return {
    type: ActionType.VOTE,
    postId,
    option,
  }
}
export const voteChange = (postId, option, callback) => {
  console.log(callback)
  return dispatch => {
    API.VotePost(postId, option, callback).then(data => dispatch(voteAction(data)))
  }
}
