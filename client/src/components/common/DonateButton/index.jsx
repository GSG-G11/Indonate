import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';
import { AddDonation } from '../../Modals';

const { confirm } = Modal;
const DonateButton = ({ campaignId, isAvailable, setIsUpdated }) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const visibleToggle = () => {
    setVisible((prev) => !prev);
  };

  function login() {
    navigate('/login');
  }
  function authConfirm() {
    confirm({
      title: 'You Should login to Donate!',
      okText: 'Login',
      cancelText: 'Cancel',
      onOk: () => login(),
    });
  }
  return (
    <>
      <Button
        type="primary"
        onClick={user.isUserAuthorized ? visibleToggle : authConfirm}
        size="large"
        disabled={!isAvailable}
      >
        Donate
      </Button>
      <AddDonation
        visible={visible}
        onCancel={visibleToggle}
        campaignId={campaignId}
        setIsUpdated={setIsUpdated}
        setVisible={setVisible}
      />
    </>
  );
};
DonateButton.propTypes = {
  campaignId: Proptypes.number.isRequired,
  isAvailable: Proptypes.bool.isRequired,
  setIsUpdated: Proptypes.func,
};
export default DonateButton;
