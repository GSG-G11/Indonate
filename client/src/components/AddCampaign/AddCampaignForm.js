import React, { useEffect } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  InputNumber,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './style.css';

const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;
const AddCampaignForm = ({
  onCancel,
  visible,
  onCreate,
  action,
  categories,
  setImage,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ title: 'hello' });
  }, [visible]);

  return (
    <div className="add-edit-Campaign">
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
          requiredMark={false}
        >

          <Item
            name="title"
            label="Campagin Title"
            rules={[
              {
                required: true,
                message: 'Please input the title of Campagin!',
              },
            ]}
          >
            <Input placeholder="Add Campagin Title" />

          </Item>
          <Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input the Description of Campaign',
              },
            ]}
          >
            <TextArea rows={3} placeholder="Add Description" size="large" />
          </Item>

          <Item
            name="categoryId"
            label="Category"
            rules={[
              {
                required: true,
                message: 'Please input Catrgory!',
              },
            ]}
          >
            <Select>
              {categories.map((item) => (
                <Option value={item.id} key={item.id}>{item.name}</Option>
              ))}

            </Select>
          </Item>
          <Upload
            onChange={(info) => setImage(info.file)}
            accept=".png,.jpeg"
            beforeUpload={() => false}
            defaultFileList={[]}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>

          </Upload>
          <div className="target-section">
            Target:
            <div className="target-section-item">
              <Item
                className="target-item"
                name="food_target"
                rules={[
                  {
                    required: true,
                    message: 'Please input the Food Target!',
                  },
                ]}
              >
                <InputNumber placeholder="Food" addonAfter="Meals" />
              </Item>
              <Item
                name="money_target"
                className="target-item"
                rules={[
                  {
                    required: true,
                    message: 'Please input the Money Target!',
                  },
                ]}
              >

                <InputNumber placeholder="Money" addonAfter="$" />
              </Item>
              <Item
                name="clothes_target"
                rules={[
                  {
                    required: true,
                    message: 'Please input the Clothes Target!',
                  },
                ]}
              >
                <InputNumber placeholder="Clothes" addonAfter="Piece" />
              </Item>

            </div>
          </div>

        </Form>

      </Modal>
    </div>
  );
};

AddCampaignForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf.isRequired,
  setImage: PropTypes.func.isRequired,

};

export default AddCampaignForm;
