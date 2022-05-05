import React from 'react';
import './style.css';
import { Typography } from 'antd';

const { Text } = Typography;
function Header() {
  return (
    <div className="Header-Image">
      <Text className="text">Donation Listing</Text>
      <Text className="text">
        Home/
        {' '}
        <span className="Donation-title">Donation</span>
      </Text>
    </div>
  );
}

export default Header;
