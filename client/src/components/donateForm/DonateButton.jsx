import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import DonationForm from './DonationForm';

function DonationButton({ campaignId, isAvailable }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const visibleToggle = () => {
    setVisible((prev) => !prev);
  };
  function login() {
    navigate('/login');
  }

  return (
    <>
      <Button
        type="primary"
        size="large"
        disabled={!isAvailable}
        onClick={user.isUserAuthorized ? visibleToggle : login}
      >
        Donate
      </Button>
      <DonationForm
        visible={visible}
        onCancel={visibleToggle}
        campaignId={campaignId}
        setVisible={setVisible}
      />
    </>
  );
}
DonationButton.propTypes = {
  campaignId: Proptypes.number.isRequired,
  isAvailable: Proptypes.bool.isRequired,
};
export default DonationButton;
