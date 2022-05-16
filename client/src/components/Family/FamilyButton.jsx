import React, { useState } from 'react';
import { Button } from 'antd';
import Proptypes from 'prop-types';
import FamilyForm from './FamilyForm';

const FamilyButton = ({ isUpdated, setIsUpdated }) => {
  const [visible, setVisible] = useState(false);
  const visibleToggle = () => {
    setVisible((prev) => !prev);
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={visibleToggle}
      >
        Add Family
      </Button>
      <FamilyForm
        visible={visible}
        setVisible={setVisible}
        onCancel={visibleToggle}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        id={0}
        name=""
        phone=""
        address=""
      />
    </div>
  );
};

FamilyButton.propTypes = {
  isUpdated: Proptypes.bool.isRequired,
  setIsUpdated: Proptypes.func.isRequired,
};

export default FamilyButton;
