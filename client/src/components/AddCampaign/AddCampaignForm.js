import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  InputNumber,
  Upload,
  Typography,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './style.css';

const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;
const CampaignForm = ({
  visible,
  action,
  setVisible,
  data,
  setIsUpdateCampaign,
}) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [file, setFile] = useState([]);
  const [isValidationError, setIsValidationError] = useState(false);

  const handleUploadImage = async (image) => {
    try {
      setIsValidationError(false);
      setFile([image]);
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 's9kbkcoe');

      const { data: { secure_url: secureUrl } } = await axios.post('https://api.cloudinary.com/v1_1/farahshcoding/image/upload', formData);
      setImageUrl(secureUrl);
    } catch (e) {
      message.error('Upload fail');
    }
  };
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const { data: { data: { categories: categoriesFromDB } } } = await axios.get('/api/categories', {
          cancelToken: source.token,
        });
        setCategories(categoriesFromDB);
      } catch (e) {
        const { response: { data: { message: errorMessage } } } = e;
        message.error(errorMessage);
      }
    };
    fetchData();
    return () => {
      source.cancel();
    };
  }, []);
  useEffect(() => {
    form.setFieldsValue(data);
    setImageUrl(data.image_link);
    setFile([]);
    setIsValidationError(false);
  }, [visible]);

  const handleOnOk = async () => {
    try {
      const value = await form.validateFields();
      if (!file.length && action === 'Add') {
        setIsValidationError(true);
      } else if (action === 'Add') {
        const { data: { message: successMessage } } = await axios.post('/api/admin/campaigns', { ...value, image_link: imageUrl });
        message.success(successMessage);
        setVisible(false);
        setIsUpdateCampaign(true);
      } else {
        const { data: { message: successMessage } } = await axios.patch(`/api/admin/campaign/${data.id}`, { ...value, image_link: imageUrl });
        message.success(successMessage);
        setVisible(false);
        setIsUpdateCampaign(true);
      }
    } catch ({ response: { data: { message: errorMessage } } }) {
      message.error(errorMessage);
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div className="add-edit-Campaign">
      <Modal
        className="campaign-modal"
        visible={visible}
        title={action}
        okText={action}
        cancelText="Cancel"
        onCancel={() => handleCancel()}
        onOk={handleOnOk}
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
            onChange={(info) => handleUploadImage(info.file)}
            accept=".png,.jpeg"
            beforeUpload={() => false}
            defaultFileList={[]}
            fileList={file}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>

          </Upload>
          {isValidationError ? <Text type="danger">Please Select Image! </Text> : null}
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

CampaignForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  action: PropTypes.string.isRequired,
  setVisible: PropTypes.func.isRequired,
  data: PropTypes.objectOf.isRequired,
  setIsUpdateCampaign: PropTypes.func.isRequired,
};

export default CampaignForm;
