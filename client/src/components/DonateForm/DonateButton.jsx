import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';
import DonationForm from './DonationForm';

const { confirm } = Modal;
function DonationButton({ campaignId }) {
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
};
export default DonationButton;
