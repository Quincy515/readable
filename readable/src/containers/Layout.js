// 展示组件
import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

class LayoutView extends React.Component {
  render() {
    return(
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">react</Menu.Item>
            <Menu.Item key="2">redux</Menu.Item>
            <Menu.Item key="3">udacity</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>All Posts</Breadcrumb.Item>
            {/* <Breadcrumb.Item></Breadcrumb.Item> */}
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>All Posts</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    )
  }
}

export default LayoutView
