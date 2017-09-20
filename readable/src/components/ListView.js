import React from 'react'
import axios from 'axios'

const api = 'http://localhost:3001'
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)
console.log(token)
const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export default class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allpost: []
    }
  }
  componentDidMount() {
    axios({
      method: 'get',
      url: `${api}/posts`,
      headers: {
        ...headers
      }
    }).then(res => {
      this.setState({allpost: res.data})
      console.log(res)
    })
  }
  render() {
    let {allpost} = this.state
    console.log(allpost)
    return (
      <ul>
        {allpost.map((post) => (
          <li key={post.id}>
            <div>
              <p>{'author: ' + post.author}</p>
              <p>Body: {post.body}</p>
              <p>category: {post.category}</p>
              <p>delete: {post.delete}</p>
              <p>id: {post.id}</p>
              <p>{'timestamp: ' + new Date(post.timestamp).toLocaleString()}</p>
              <p>{'title: ' + post.title}</p>
              <p>{'Vote score: ' + post.voteScore}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }
}
