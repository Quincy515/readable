import React from 'react'
import {connect} from 'react-redux'
import {Modal, Form, Input, Select} from 'antd';

import {closeNewPostModal} from '../actions/modalvisible'
const Option = Select.Option;
const FormItem = Form.Item;
// 展示组件
const NewPostForm = Form.create()((props) => {
  const {categories, visible, onCancel, onCreate, form, confirmLoading} = props;
  const {getFieldDecorator} = form;
  return (
    <Modal
      visible={visible}
      title="Create a new post"
      kText="Create"
      onCancel={onCancel}
      onOk={onCreate}
      confirmLoading={confirmLoading}>
      <Form layout="vertical">
        <FormItem label="Title For Post">
          {getFieldDecorator('title', {
            rules: [
              {
                required: true,
                message: 'Please input the title of post!'
              }
            ]
          })(<Input/>)}
        </FormItem>
        <FormItem label="Post Content">
          {getFieldDecorator('body', {
            rules: [
              {
                required: true,
                message: 'Please input the Post Body!'
              }
            ]
          })(<Input type="textarea"/>)}
        </FormItem>
        <FormItem label="Author">
          {getFieldDecorator('author', {
            rules: [
              {
                required: true,
                message: 'Please input the Author!'
              }
            ]
          })(<Input/>)}
        </FormItem>
        <FormItem label="Category" hasFeedback>
          {getFieldDecorator('select', {
            rules: [
              {
                required: true,
                message: 'Please select your post category!'
              }
            ]
          })(
            <Select placeholder="Please select a category">
              {categories
                &&(categories.categories.map((item) => (
                  <Option key={item.name} value={item.name}>{item.name}</Option>
              )))}
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
});

class AddPost extends React.Component {
  state = {
    confirmLoading: false
  }
  handleOk = () => {
    this.setState({confirmLoading: true});
    setTimeout(() => {
      this.setState({confirmLoading: false});
      this.props.closeModal()
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.props.closeModal()
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  render() {
    const { categories, visible } = this.props
    const {confirmLoading} = this.state
    return (
      <div>
        <NewPostForm
          ref={this.saveFormRef}
          categories={categories}
          visible={visible}
          onCancel={this.handleCancel}
          onCreate={this.handleOk}
          confirmLoading={confirmLoading}/>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  // console.log('state', state.categories['data'].categories)
  return {
    categories: state.categories['data'],
    visible: state.modalvisible.newPostModalVisible,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: (data) => dispatch(closeNewPostModal())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPost)
