import {
  Modal,
  Form,
  Input,
} from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';

const { Item } = Form;

const editDonorModal = ({ dataSource, visible, setVisible }) => {
  const [data, setData] = useState(dataSource);

  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  return (
    <Modal
      title="Edit Donor info"
      visible={visible}
      onOk
      onCancel={() => setVisible(false)}
    >
      {console.log(dataSource)}
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
          <Input
            name="name"
            value={data.name || ''}
            onChange={(e) => handleChange(e)}
          />
        </Item>
        <Item
          label="email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            name="email"
            value={data.email || ''}
            onChange={(e) => handleChange(e)}
          />

        </Item>
        <Item
          label="phone"
          name="phone"
          rules={[{ required: true, message: 'Please input your phone!' }]}
        >
          <Input
            name="phone"
            value={data.phone || ''}
            onChange={(e) => handleChange(e)}
          />
        </Item>
        <Item
          label="address"
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input
            name="address"
            value={data.address || ''}
            onChange={(e) => handleChange(e)}
          />
        </Item>
      </Form>
    </Modal>
  );
};
export default editDonorModal;
