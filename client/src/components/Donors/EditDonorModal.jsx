import {
  Modal,
  Form,
  Input,
} from 'antd';
import 'antd/dist/antd.css';
import React from 'react';

const { Item } = Form;

const editDonorModal = () => (
  <Modal
    title="Edit Donor info"
    visible={false}
    onOk
    onCancel
  >
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish
      onFinishFailed
      autoComplete="off"
    >
      <Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Item>
      <Item
        label="email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Item>
      <Item
        label="phone"
        name="phone"
        rules={[{ required: true, message: 'Please input your phone!' }]}
      >
        <Input />
      </Item>
      <Item
        label="address"
        name="address"
        rules={[{ required: true, message: 'Please input your address!' }]}
      >
        <Input />
      </Item>
    </Form>
  </Modal>
);
export default editDonorModal;
