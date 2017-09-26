import React from 'react'
// import axios from 'axios'
// import { Icon, Table } from 'antd';
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost } from '../actions/posts'

// const columns = [{
//   title: 'Vote',
//   width: '5%',
//   dataIndex: 'index',
//   render: (text, record) => (
//     <span>
//       <Icon type="like-o" onClick={()=>_voteForLink()} style={{cursor: 'pointer'}} />
//       <span className="ant-divider" />
//       <Icon type="dislike-o" onClick={()=>_voteForLink()} style={{cursor: 'pointer'}} />
//     </span>
//   ),
// }, {
//   title: 'Score',
//   dataIndex: 'voteScore',
//   sorter: (a, b) => a.voteScore - b.voteScore,
//   width: '7%',
// }, {
//   title: 'Title',
//   dataIndex: 'title',
//   width: '30%',
// }, {
//   title: 'Date',
//   dataIndex: 'timestamp',
//   width: '10%',
//   sorter: (a, b) => a.timestamp - b.timestamp,
// }, {
//   title: 'Author',
//   dataIndex: 'author',
//   width: '10%',
// }, {
//   title: 'Comments',
//   dataIndex: 'comments'
// },{
//   title: 'Action',
//   key: 'action',
//   render: (text, record) => (
//     <span>
//       <Link to="/">Editor</Link>
//       <span className="ant-divider" />
//       <Link to="/">Delete</Link>
//     </span>
//   ),
// }];
// const _voteForLink = async () => {
//   console.log('voteForLink')
// }


class ListView extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     data: [],
  //     pagination: {},
  //     loading: false,
  //   }
  // }
  // handleTableChange = (pagination, filters, sorter) => {
  //   const pager = { ...this.state.pagination };
  //   pager.current = pagination.current;
  //   this.setState({
  //     pagination: pager,
  //   });
  //   this.fetchPost({
  //     results: pagination.pageSize,
  //     page: pagination.current,
  //     sortField: sorter.field,
  //     sortOrder: sorter.order,
  //     ...filters,
  //   });
  // }
  //
  //
  // componentDidMount() {
  //   this.fetchPost()
  // }
  componentDidMount() {
    this.props.addPost();
    // console.log(this.props.fetchAllPosts())
  }
  render() {
    console.log('Props', this.props)
    const { posts } = this.props
    // let {posts} = this.props.data
    console.log('posts', posts)
    return (
      // <Table columns={columns}
      //   rowKey={record => record.id}
      //   dataSource={this.state.data}
      //   pagination={this.state.pagination}
      //   loading={this.state.loading}
      //   onChange={this.handleTableChange}
      // />
      <div>
      <h1>HelloWorld</h1>

      <ul>
        {posts && (posts.map((post) => (
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
        )))}
      </ul>
      </div>
     )
  }
}
// const mapStateToProps = ({posts}) => {
//   return { posts };
// }
const mapStateToProps = (state, props) => {
  console.log('state', state)
  console.log('props', props)
  return { posts: state.data };
}

const mapDispatchToProps = (dispatch) => {
  return{
    fetchAllPosts: (data) => dispatch(addPost())
  }
}

export default connect(mapStateToProps, {addPost})(ListView)
