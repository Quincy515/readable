import React from 'react'
import { Icon, Table } from 'antd';
import { connect } from 'react-redux'
import {  voteChange, deletePostAction } from '../actions/posts'
import * as API from '../utils/Api'

class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination: {},
      loading: false,
    }
    // this.loading = this.state.loading
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      loading: true,
      pagination: pager,
    });
    API.fetchPost().then(res => {
      const pagination = {
        ...this.state.pagination
      }
      pagination.total = res.data.length
      this.setState({ loading: false, pagination})
      // console.log('排序',res.data.length)
    })
  }
  componentDidMount() {
    // this.props.fetchAllPosts();
    // console.log(this.props.fetchAllPosts())
  }
  _voteForLink = async (postId, option) => {
    this.props.vote(postId.id, option,()=>{
      window.location.reload()
      // this.props.history.push('/')
    })
  }
  deleteFunc = async (postId) => {
    this.props.deletePost(postId.id, ()=>{
      console.log('deletePost',postId.id)
      window.location.reload()
      // window.location.reload()
    })
  }
  render() {
    // console.log('Props', this.props)
    const { posts } = this.props
    if (!posts){
      // this.loading = true
      return <div>Loading ...</div>
    }
    // console.log('posts', posts)

    const columns = [{
      title: 'Vote',
      width: '5%',
      dataIndex: 'index',
      render: (text, record) => (
        <span>
          <Icon type="like-o" onClick={()=>{
            const id = record.id;
            this._voteForLink({id}, 'upVote')}} style={{cursor: 'pointer'}} />
          <span className="ant-divider" />
          <Icon type="dislike-o" onClick={()=>{
            const id = record.id;
            this._voteForLink({id}, 'downVote')}} style={{cursor: 'pointer'}} />
        </span>
      ),
    }, {
      title: 'Score',
      dataIndex: 'voteScore',
      sorter: (a, b) => a.voteScore - b.voteScore,
      width: '7%',
    }, {
      title: 'Title',
      dataIndex: 'title',
      width: '25%',
    }, {
      title: 'Date',
      dataIndex: 'timestamp',
      width: '13%',
      sorter: (a, b) => a.timestamp - b.timestamp,
      render: text => <span>{(new Date(text)).toLocaleString()}</span>,
    }, {
      title: 'Author',
      dataIndex: 'author',
      width: '10%',
    }, {
      title: 'Comments',
      dataIndex: 'comments'
    },{
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Icon type="edit" onClick={()=>{
            const id = record.id;
            this.deleteFunc({id})}}
            style={{cursor: 'pointer',fontSize: 18, color: '#08c' }} />
          <span className="ant-divider" />
          <Icon type="delete" onClick={()=>{
            console.log('record.id', record.id)
            const id = record.id;
            this.deleteFunc({id})}}
            style={{cursor: 'pointer', fontSize: 18, color: '#08c' }} />
        </span>
      ),
    }];

    return (
      <Table columns={columns}
        rowKey={record => record.id}
        dataSource={this.props.posts}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    )
  }
}
const mapStateToProps = (state, props) => {
  // console.log('state', state)
  // console.log('props', props.posts)
  // 数据格式的在处理 隐藏 deleted 为 true 的 post
  return { posts: state.posts };
}

const mapDispatchToProps = (dispatch) => {
  return{
    // fetchAllPosts: (data) => dispatch(addPost()),
    vote: (postId, option, callback) => dispatch(voteChange(postId, option, callback)),
    deletePost: (postId, callback) => dispatch(deletePostAction(postId, callback)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
