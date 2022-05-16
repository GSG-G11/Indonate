import React, { useState } from 'react';
import {
  Button,
} from 'antd';

import CampaignForm from './AddCampaignForm';

const AddCampaignButton = () => {
  const [visilbe, setVisible] = useState(false);

  const DisplayAddModle = async () => {
    setVisible(true);
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={() => { DisplayAddModle(); }}
      >
        Add Campaign
      </Button>

      <CampaignForm
        visible={visilbe}
        action="Add"
        setVisible={setVisible}
        data={{
          title: '',
          describe: '',
          categoryId: '',
          food_target: '',
          clothes_target: '',
          money_target: '',
        }}
      />
    </div>
  );
};

export default AddCampaignButton;
