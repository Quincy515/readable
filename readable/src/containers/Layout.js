// 展示组件
import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Breadcrumb } from 'antd';

import ListView from '../components/ListView'
import { CategoriesFunc } from '../actions/categories'

const { Header, Content, Footer } = Layout;

class LayoutView extends React.Component {
  componentDidMount(){
    this.props.fetchCategories()
  }
  render() {
    const { categories } = this.props
    // console.log(categories)

    if(categories){
      console.log(categories.categories)
    }

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
            <Menu.Item key="categories">Categories:</Menu.Item>
            {categories
              &&(categories.categories.map((item) => (
              <Menu.Item key={item.name}>{item.name}</Menu.Item>
            )))}
            {/* <Menu.Item key="1">react</Menu.Item>
            <Menu.Item key="2">redux</Menu.Item>
            <Menu.Item key="3">udacity</Menu.Item> */}
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>All Posts</Breadcrumb.Item>
            {/* <Breadcrumb.Item></Breadcrumb.Item> */}
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <h1>All Posts</h1>
            <ListView/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Custer Tian ©2017 Created by Custer Tian
        </Footer>
      </Layout>
    )
  }
}
const mapStateToProps = (state,props) => {
  // console.log(categories.data)
  // console.log('state', state)
  // console.log('props', props)
  return { categories: state.categories['data'] };
}
const mapDispatchToProps = (dispatch) => {
  return{
    fetchCategories: (data) => dispatch(CategoriesFunc()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LayoutView)
