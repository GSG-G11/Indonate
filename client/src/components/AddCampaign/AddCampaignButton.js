import React, { useState } from 'react';
import {
  Button,
} from 'antd';

import AddCampaignForm from './AddCampaignForm';

const AddCampaignButton = () => {
  const [visilbe, setVisible] = useState(false);
  const [action, setAction] = useState('');
  const DisplayAddModle = async () => {
    setVisible(true);
    setAction('Add');
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
        action={action}
        setVisible={setVisible}
      />
    </div>
  );
};

export default AddCampaignButton;
