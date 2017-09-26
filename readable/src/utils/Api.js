import axios from 'axios';

const api = 'http://localhost:3001'
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
console.log(token)
const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json',
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
