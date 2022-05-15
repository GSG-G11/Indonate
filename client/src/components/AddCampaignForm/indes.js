import React, { useState } from 'react';
import {
  Button, Modal, Form, Input, Select,
} from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';

const { Item } = Form;
const { Option } = Select;
const CollectionCreateForm = ({ onCancel, visible, onCreate }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="add"
      okText="add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="Campaign"
        initialValues={{
          modifier: 'public',
        }}
        requiredMark={false}
      >

        <Item
          name="Title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of Campagin!',
            },
          ]}
        >
          <Input placeholder="Campaign Title" />
        </Item>
        <Item
          name="Description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'Please input the Description of Campaign',
            },
          ]}
        >
          <Input type="textarea" placeholder="Desciption" />
        </Item>
        <Item
          name="Category"
          label="Category"
          rules={[
            {
              required: true,
              message: 'Please input Catrgory!',
            },
          ]}
        >
          <Select>
            <Option value="Category 1">Category 1</Option>
            <Option value="Category 2">Category 2</Option>
            <Option value="Category 3">Category 3</Option>
          </Select>
        </Item>
      </Form>

    </Modal>
  );
};
const AddCanpaignForm = () => {
  const [visilbe, setVisible] = useState(false);
  const AddCampign = async ({ Title, Description }) => {
    try {
      const { data } = await axios.post('/api/admin/campaigns', {
        title: Title,
        description: Description,
        food_target: 10,
        clothes_target: 10,
        money_target: 1,
        categoryId: 1,
        image_link: 'http://www.humanitygate.com/thumb/560x292/uploads//images/88e62e08915b10584950106f496140ca.jpg',
      });
      console.log(data);
    } catch ({ response: { data: { message: errorMessage } } }) {
      console.log(errorMessage);
    }
  };
  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>Add Campaign</Button>
      <CollectionCreateForm
        onCancel={() => setVisible(false)}
        visible={visilbe}
        onCreate={(value) => {
          AddCampign(value);
        }}
      />
    </div>
  );
};
CollectionCreateForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,

};
export default AddCanpaignForm;
