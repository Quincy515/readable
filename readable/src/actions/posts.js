import * as API from '../utils/Api'
import * as ActionType from './constants'

// export const AllPostsAction = () => {
//   const request = API.fetchPost()
//
//   return {type: ActionType.ALL_POSTS, posts: request}
// }

// export const FetchPosts = () => {
//   return dispatch => {
//     API.fetchPost().then(response => {
//       dispatch(AllPostsAction(response.data.assets))
//     })
//   }
// }

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
