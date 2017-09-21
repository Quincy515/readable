import React from 'react'
import axios from 'axios'
import { Icon, Table } from 'antd';
import { Link } from 'react-router-dom'

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
      data: [],
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
    this.fetchPost({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  fetchPost = () => {
    this.setState({ loading: true });
    return axios({
      method: 'get',
      url: `${api}/posts`,
      headers: {
        ...headers
      }
    }).then(res => {
      const pagination = { ...this.state.pagination }
      pagination.total = res.data.length
      this.setState({
        loading: false,
        data: res.data,
        pagination,
      })
      console.log(res)
    })
  }

  componentDidMount() {
    this.fetchPost()
  }
  render() {
    return (
      <Table columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    )
  }
}
