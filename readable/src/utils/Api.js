import axios from 'axios';

const api = 'http://localhost:3001'
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
// console.log('token', token)
const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json',
}

/**
 * GET /categories
 *    USAGE:
 *      Get all of the categories available for the app. List is found in categories.js.
 *      Feel free to extend this list as you desire.
 */
export const fetchCategories = () => {
  return axios ({
    method: 'get',
    url: `${api}/categories`,
    headers: {...headers}
  })
}

/**
 * GET /:category/posts
 *   USAGE:
 *     Get all of the posts for a particular category
 */

export const fetchCategoryPosts = (category) => {
  return axios({
    method: 'get',
    url: `${api}/${category}/posts`,
    headers: {...headers}
  })
}

/**
 * GET /posts
 *    USAGE:
 *      Get all of the posts. Useful for the main page when no category is selected.
 */
export const fetchPost = () => {
  // this.setState({loading: true});
  return axios({
    method: 'get',
    url: `${api}/posts`,
    headers: {
      ...headers
    }
  })
  // .then(res => {
  //   const pagination = {
  //     ...this.state.pagination
  //   }
  //   pagination.total = res.data.length
  //   this.setState({loading: false, data: res.data, pagination})
  //   console.log(res)
  // })
}

/**
 * POST /posts
 *    USAGE:
 *      Add a new post
 *    PARAMS:
 *      id - UUID should be fine, but any unique id will work
 *      timestamp - timestamp in whatever format you like, you can use Date.now() if you like
 *      title - String
 *      body - String
 *      author - String
 *      category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
 */
export const createPost = (value, callback) => {
  const request = axios({
    method:'post',
    url:`${api}/posts`,
    data: value,
    headers:{...headers},
  }).then(()=>callback())
  return request
}

/**
 * POST /posts/:id
 *    USAGE:
 *        Used for voting on a post
 *      PARAMS:
 *        option - String: Either "upVote" or "downVote"
 */
export const VotePost = (postId, option, callback) => {
  const request = axios({
    method: 'post',
    url: `${api}/posts/${postId}`,
    data: {option: option},
    headers: { ...headers }
  }).then(() => callback())
  return request
}
/**
 * DELETE /posts/:id
      USAGE:
        Sets the deleted flag for a post to 'true'.
        Sets the parentDeleted flag for all child comments to 'true'.
 */
export const DeletePost = (postId, callback) => {
  const request = axios ({
    method: 'delete',
    url: `${api}/posts/${postId}`,
    headers: {...headers},
  }).then(()=>callback())
  return request
}
