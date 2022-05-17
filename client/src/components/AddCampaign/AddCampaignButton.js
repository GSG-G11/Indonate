import React from 'react';

import PropTypes from 'prop-types';
import CampaignForm from './AddCampaignForm';

const AddCampaignButton = ({ setIsUpdateCampaign, data, setData }) => (

  <div>
    { setData([])}
    <CampaignForm
      action="Add"
      data={data}
      setIsUpdateCampaign={setIsUpdateCampaign}
    />
  </div>
);

AddCampaignButton.propTypes = {
  setIsUpdateCampaign: PropTypes.func.isRequired,
  data: PropTypes.objectOf.isRequired,
  setData: PropTypes.func.isRequired,
};
export default AddCampaignButton;
