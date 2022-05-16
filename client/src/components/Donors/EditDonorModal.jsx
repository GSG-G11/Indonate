import {
  Modal,
  Form,
  Input,
} from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';

const { Item } = Form;

const editDonorModal = ({
  dataSource,
  // onCreate,
  visible,
  setVisible,
}) => {
  const [data, setData] = useState(dataSource);
  const [form] = Form.useForm();
  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    form.setFieldsValue({
      name: dataSource.name,
      email: dataSource.email,
      phone: dataSource.phone,
      address: dataSource.address,
    });
    console.log(dataSource);
  }, [visible]);

  return (
    <Modal
      title="Edit Donor info"
      visible={visible}
      onCancel={() => setVisible(false)}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={(value) => console.log(value)}
        onFieldsChange={() => console.log('Changed')}
        onFinishFailed
        autoComplete="off"
      >
        <Item
          label="Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </Item>
        <Item
          label="email"
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
