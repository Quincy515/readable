import React from 'react'
import { Link } from 'react-router-dom'
import {Card} from 'antd'
import {Layout, Menu, Breadcrumb} from 'antd'
const {Header, Content, Footer} = Layout

class PostDetail extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo"/>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{
            lineHeight: '64px', fontSize: '20px'
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
            <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to='/'>Posts</Link></Breadcrumb.Item>
            <Breadcrumb.Item>detail</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{
            background: '#fff',
            padding: 24,
            minHeight: 280
          }}>
            <Card style={{
              width: 300
            }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
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

export default PostDetail
