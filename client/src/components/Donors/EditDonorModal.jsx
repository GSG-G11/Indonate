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
      visible={visible}
      title={id ? 'Update Family' : 'Add Family'}
      okText={id ? 'Update' : 'Add'}
      cancelText="Cancel"
      onCancel={() => setVisible(false)}
      onOk={handleSubmit}
      keyboard
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder="Ex: John doe" />
        </Item>
        <Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Ex: example@example.com" />
        </Item>
        <Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: 'Please input your phone!' }]}
        >
          <Input placeholder="Ex: +972501234567" />
        </Item>
        <Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input placeholder="Ex: Palestine gaza" />
        </Item>
      </Form>
    </Modal>
  );
};
export default editDonorModal;
