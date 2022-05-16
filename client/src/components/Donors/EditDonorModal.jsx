import {
  Modal,
  Form,
  Input,
  message,
} from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';

const { Item } = Form;

const editDonorModal = ({
  dataSource: {
    id,
    name,
    email,
    phone,
    address,
  },
  visible,
  setVisible,
  getUpdatedDonor,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name,
      email,
      phone,
      address,
    });
  }, [visible]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const { data: { message: successMessage } } = await axios.patch(`/api/admin/donor/${id}`, values);
      getUpdatedDonor({ id, ...values });
      message.success(successMessage);
      setVisible(false);
    } catch ({ response: { data } }) {
      message.error(data.message);
    }
  };

  return (
    <Modal
      title="Edit Donor info"
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={handleSubmit}
      keyboard
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Item>
        <Item
          name="email"
          label="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />

        </Item>
        <Item
          name="phone"
          label="phone"
          rules={[{ required: true, message: 'Please input your phone!' }]}
        >
          <Input />
        </Item>
        <Item
          name="address"
          label="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input />
        </Item>
      </Form>
    </Modal>
  );
};
export default editDonorModal;
