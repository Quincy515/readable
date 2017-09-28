// 展示组件
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Button } from 'antd';

import ListView from '../components/ListView'
import AddPost from '../containers/AddPost'
import { addPost } from '../actions/posts'
import { CategoriesFunc, CategoryPostsFunc } from '../actions/categories'
import { newPost } from '../actions/modalvisible'

const { Header, Content, Footer } = Layout;

class LayoutView extends React.Component {
  constructor(props){
    super(props)
    this.state={
      curCategory: null,
    }
  }
  componentDidMount(){
    this.props.fetchCategories()
    this.props.fetchAllPosts()
  }
  handleClick (e) {
    // console.log(e.key)
    if(e.key){
      if(e.key==='categories'){
        this.props.fetchAllPosts()
        this.setState({ curCategory: 'All Posts'})
      }else{
        this.props.fetchCategoryPosts(e.key)
        this.setState({ curCategory: e.key})
      }
    }
  }
  showModal(e) {
    this.props.newPostModal()
  }
  render() {
    const { categories } = this.props
    // console.log(categories)

    if(categories){
      // console.log(categories.categories)
    }

    return(
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['categories']}
            style={{ lineHeight: '64px' }}
            onClick={this.handleClick.bind(this)}
          >
            <Menu.Item key="categories">Categories:</Menu.Item>
            {categories
              &&(categories.categories.map((item) => (
              <Menu.Item key={item.name}>
                {item.name}
              </Menu.Item>
            )))}
            {/* <Menu.Item key="1">react</Menu.Item>
            <Menu.Item key="2">redux</Menu.Item>
            <Menu.Item key="3">udacity</Menu.Item> */}
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to='/'>Posts</Link></Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Button type="primary" onClick={this.showModal.bind(this)} icon="plus" style={{float: 'right'}} ghost>Add Post</Button>
            {this.props.visible?<AddPost/>:<p></p>}
            {this.state.curCategory?<h1>{this.state.curCategory}</h1>:<h1>All Posts</h1>}
            <ListView posts={this.props.posts}/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Custer Tian ©2017 Created by Custer Tian
        </Footer>
      </Layout>
    )
  }
}
const mapStateToProps = (state, props) => {
  // console.log(categories.data)
  // console.log('state', state.modalvisible.newPostModalVisible)
  // console.log('props', props)
  return {
    posts: state.posts.data,
    categories: state.categories['data'],
    categoryPosts: state.categoryPosts,
    visible: state.modalvisible.newPostModalVisible,
   };
}
const mapDispatchToProps = (dispatch) => {
  return{
    fetchAllPosts: (data) => dispatch(addPost()),

    fetchCategories: (data) => dispatch(CategoriesFunc()),
    fetchCategoryPosts: (category) => dispatch(CategoryPostsFunc(category)),
    newPostModal: (data) => dispatch(newPost()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LayoutView)
