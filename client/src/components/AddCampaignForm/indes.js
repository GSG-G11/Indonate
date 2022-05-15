import React, { useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
} from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';

const { Item } = Form;
const { Option } = Select;
const CollectionCreateForm = ({
  onCancel,
  visible,
  onCreate,
  action,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title={action}
      okText={action}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch(() => {
            message.error('Validate Failed');
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
  const [action, setAction] = useState('');
  const AddCampign = async ({ Title, Description }) => {
    try {
      const { data: { message: successMessage } } = await axios.post('/api/admin/campaigns', {
        title: Title,
        description: Description,
        food_target: 10,
        clothes_target: 10,
        money_target: 1,
        categoryId: 1,
        image_link: 'http://www.humanitygate.com/thumb/560x292/uploads//images/88e62e08915b10584950106f496140ca.jpg',
      });
      message.success(successMessage);
      setVisible(false);
    } catch ({ response: { data: { message: errorMessage } } }) {
      message.error(errorMessage);
    }
  };
  const EditCampign = async ({ Title, Description }) => {
    try {
      const { data: { message: successMessage } } = await axios.patch('/api/admin/campaign/1', {
        title: Title,
        description: Description,
        food_target: 10,
        clothes_target: 10,
        money_target: 1,
        categoryId: 1,
        image_link: 'http://www.humanitygate.com/thumb/560x292/uploads//images/88e62e08915b10584950106f496140ca.jpg',
      });
      message.success(successMessage);
      setVisible(false);
    } catch ({ response: { data: { message: errorMessage } } }) {
      message.error(errorMessage);
    }
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
          setAction('Add');
        }}
      >
        Add Campaign

      </Button>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
          setAction('Edit');
        }}
      >
        edit Campaign

      </Button>
      <CollectionCreateForm
        onCancel={() => setVisible(false)}
        visible={visilbe}
        onCreate={(value) => {
          if (action === 'Add') {
            AddCampign(value);
          } else {
            EditCampign(value);
          }
        }}
        action={action}
      />
    </div>
  );
};
CollectionCreateForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,

};
export default AddCanpaignForm;
