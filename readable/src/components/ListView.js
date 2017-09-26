import React from 'react'
import { Icon, Table } from 'antd';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addPost } from '../actions/posts'
import * as API from '../utils/Api'

const columns = [{
  title: 'Vote',
  width: '5%',
  dataIndex: 'index',
  render: (text, record) => (
    <span>
      <Icon type="like-o" onClick={()=>_voteForLink()} style={{cursor: 'pointer'}} />
      <span className="ant-divider" />
      <Icon type="dislike-o" onClick={()=>_voteForLink()} style={{cursor: 'pointer'}} />
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
  width: '30%',
}, {
  title: 'Date',
  dataIndex: 'timestamp',
  width: '10%',
  sorter: (a, b) => a.timestamp - b.timestamp,
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
      <Link to="/">Editor</Link>
      <span className="ant-divider" />
      <Link to="/">Delete</Link>
    </span>
  ),
}];
const _voteForLink = async () => {
  console.log('voteForLink')
}


class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination: {},
      loading: false,
    }
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    API.fetchPost().then(res => {
      const pagination = {
        ...this.state.pagination
      }
      pagination.total = res.data.length
      this.setState({loading: false, pagination})
      // console.log('排序',res)
    })
  }
  componentDidMount() {
    this.props.fetchAllPosts();
    // console.log(this.props.fetchAllPosts())
  }
  render() {
    // console.log('Props', this.props)
    const { posts } = this.props
    if (!posts){
      return <div>Loading...</div>
    }
    // let {posts} = this.props.data
    // console.log('posts', posts)
    return (
      <Table columns={columns}
        rowKey={record => record.id}
        dataSource={posts}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    )
  }
}
const mapStateToProps = (state, props) => {
  // console.log('state', state)
  // console.log('props', props)
  return { posts: state.data };
}

const mapDispatchToProps = (dispatch) => {
  return{
    fetchAllPosts: (data) => dispatch(addPost())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
