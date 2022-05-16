import React, { useEffect } from 'react';
import Proptypes from 'prop-types';
import {
  Modal, Form, Input, message,
} from 'antd';
import axios from 'axios';

const { Item } = Form;
const FamilyForm = ({
  visible, onCancel, setVisible, setIsUpdated, id, name, phone, address,
}) => {
  const [form] = Form.useForm();
  const onCreate = async () => {
    try {
      const values = await form.validateFields();
      let data = {};
      if (id) {
        data = await axios.patch(`/api/admin/family/${id}`, values);
      } else {
        data = await axios.post('/api/admin/family', values);
      }
      data = data?.data;
      setIsUpdated(true);
      message.success(data?.message);
      form.resetFields();
    } catch ({ response: { data } }) {
      message.error(data.message);
    }
    setVisible(false);
  };
  useEffect(() => {
    form.setFieldsValue({
      name, phone, address,
    });
  }, [visible]);
  return (
    <Modal
      visible={visible}
      title={id ? 'Update Family' : 'Add Family'}
      okText={id ? 'Update' : 'Add'}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={onCreate}
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
          rules={[{ required: true, message: 'Please fill this input!' }]}
        >
          <Input placeholder="Ex: name" />
        </Item>
        <Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: 'Please fill this input!' }]}
        >
          <Input type="textarea" placeholder="Ex: +972501234567" />
        </Item>
        <Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please fill this input!' }]}
        >
          <Input type="textarea" placeholder="Ex: Gaza" />
        </Item>
      </Form>
    </Modal>
  );
};

FamilyForm.propTypes = {
  visible: Proptypes.bool.isRequired,
  onCancel: Proptypes.func.isRequired,
  setVisible: Proptypes.func.isRequired,
  setIsUpdated: Proptypes.func.isRequired,
  id: Proptypes.number.isRequired,
  name: Proptypes.string.isRequired,
  phone: Proptypes.string.isRequired,
  address: Proptypes.string.isRequired,
};

export default FamilyForm;
