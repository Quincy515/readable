import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'antd';
import { closeNewPostModal } from '../actions/modalvisible'

class AddPost extends React.Component {
  state = {
    ModalText: 'Content of the modal',
    confirmLoading: false,
  }
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        confirmLoading: false,
      });
      this.props.closeModal()
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.props.closeModal()
  }
  render() {
    const { confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Modal title="Title"
          visible={this.props.visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state,props) => {
  // console.log('state', state.modalvisible.newPostModalVisible)
  return{ visible: state.modalvisible.newPostModalVisible }
}
const mapDispatchToProps = (dispatch) => {
  return { closeModal: (data) => dispatch(closeNewPostModal()) }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddPost)
