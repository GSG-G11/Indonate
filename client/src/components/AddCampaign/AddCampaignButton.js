import React, { useState } from 'react';
import {
  Button,
} from 'antd';
import PropTypes from 'prop-types';
import CampaignForm from './AddCampaignForm';

const AddCampaignButton = ({ setIsUpdateCampaign, data }) => {
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
        data={data}
        setIsUpdateCampaign={setIsUpdateCampaign}
      />
    </div>
  );
};

AddCampaignButton.propTypes = {
  setIsUpdateCampaign: PropTypes.func.isRequired,
  data: PropTypes.objectOf.isRequired,
};
export default AddCampaignButton;
