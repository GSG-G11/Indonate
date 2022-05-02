import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'antd';
import DonationForm from './DonationForm';

function DonationButton({ campaignId }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
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
        onClick={user.isUserAuthorized ? visibleToggle : login}
      >
        Donate
      </Button>
      <DonationForm
        visible={visible}
        onCancel={visibleToggle}
        campaignId={id || campaignId}
        setVisible={setVisible}
      />
    </>
  );
}
DonationButton.propTypes = {
  campaignId: Proptypes.number.isRequired,
};
export default DonationButton;
