import React, { useState } from 'react';
import {
  Button,
  message,
} from 'antd';

import axios from 'axios';
import AddCampaignForm from './AddCampaignForm';

const AddCampaignButton = () => {
  const [visilbe, setVisible] = useState(false);
  const [action, setAction] = useState('');
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState();

  const DisplayAddModle = async () => {
    setVisible(true);
    setAction('Add');
    try {
      const { data: { data: { categories: categoriesFromDB } } } = await axios.get('/api/categories');
      setCategories(categoriesFromDB);
    } catch ({ response: { data: { message: errorMessage } } }) {
      message.error(errorMessage);
    }
  };
  const handleAddAndEdit = async (value) => {
    console.log(value);
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 's9kbkcoe');

      const { data: { secure_url: secureUrl } } = await axios.post('https://api.cloudinary.com/v1_1/farahshcoding/image/upload', formData);
      if (action === 'Add') {
        const { data: { message: successMessage } } = await axios.post('/api/admin/campaigns', { ...value, image_link: secureUrl });
        message.success(successMessage);
        setVisible(false);
      } else {
        const { data: { message: successMessage } } = await axios.patch('/api/admin/campaign/1', { ...value, image_link: secureUrl });
        message.success(successMessage);
        setVisible(false);
      }
    } catch ({ response: { data: { message: errorMessage } } }) {
      message.error(errorMessage);
    }
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => { DisplayAddModle(); }}
      >
        Add Campaign
      </Button>

      <AddCampaignForm
        onCancel={() => setVisible(false)}
        visible={visilbe}
        setImage={setImage}
        onCreate={(value) => {
          handleAddAndEdit(value);
        }}
        action={action}
        categories={categories}
      />
    </div>
  );
};

export default AddCampaignButton;
