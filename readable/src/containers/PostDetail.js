import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  Button,
  Card,
  Layout,
  Menu,
  Breadcrumb,
  Input,
  Tree
} from 'antd'

const {TextArea} = Input;
const {Header, Content, Footer} = Layout
const TreeNode = Tree.TreeNode

class PostDetail extends React.Component {
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }

  render() {
    const {post, select} = this.props
    console.log(post)

    if (!post) {
      // this.loading = true
      return <div>Loading ...</div>
    }
    return (
      <Layout className="layout">
        <Header>
          <div className="logo"/>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{
            lineHeight: '64px',
            fontSize: '20px'
          }}>
            <Menu.Item key="1">Readable[Detail]</Menu.Item>
          </Menu>
        </Header>
        <Content style={{
          padding: '0 50px'
        }}>
          <Breadcrumb style={{
            margin: '12px 0'
          }}>
            <Breadcrumb.Item>
              <Link to='/'>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to='/'>Posts</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>detail</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{
            background: '#fff',
            padding: 24,
            minHeight: 280
          }}>
            {post.map((post) => {
              if (post.id === select) {
                return (
                  <Card style={{
                    fontSize: 20
                  }} key={post.id}>
                    <div>
                      <p>Title: {post.title}</p>
                      <p>Body: {post.body}</p>
                      <p>timestamp: {post.timestamp}</p>
                      <p>Vote score: {post.voteScore}</p>
                      <p>Author: {post.author}</p>
                      <p>comments number:
                      </p>
                    </div>
                  </Card>
                )
              }
            })}
            <div style={{
              margin: '24px 0'
            }}>
              <TextArea rows={6} placeholder="请输入评论..." size="large"/>
              <Button type="primary" ghost style={{
                margin: '24px 0',
                float: 'right'
              }}>comment</Button>
            </div>

            <Tree showLine defaultExpandedKeys={['0-0-0']} onSelect={this.onSelect}>
              <TreeNode title="parent 1" key="0-0">
                <TreeNode title="parent 1-0" key="0-0-0">
                  <TreeNode title="leaf" key="0-0-0-0"/>
                  <TreeNode title="leaf" key="0-0-0-1"/>
                  <TreeNode title="leaf" key="0-0-0-2"/>
                </TreeNode>
                <TreeNode title="parent 1-1" key="0-0-1">
                  <TreeNode title="leaf" key="0-0-1-0"/>
                </TreeNode>
                <TreeNode title="parent 1-2" key="0-0-2">
                  <TreeNode title="leaf" key="0-0-2-0"/>
                  <TreeNode title="leaf" key="0-0-2-1"/>
                </TreeNode>
              </TreeNode>
            </Tree>
          </div>

        </Content>
        <Footer style={{
          textAlign: 'center'
        }}>
          Custer Tian ©2017 Created by Custer Tian
        </Footer>
      </Layout>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('state', state)
  console.log('ownProps', ownProps.match.params.post_id)
  console.log('post', state.posts[ownProps.match.params.post_id])
  return {post: state.posts, select: ownProps.match.params.post_id}
}

export default connect(mapStateToProps)(PostDetail)
