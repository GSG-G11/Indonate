import React from 'react';
import './style.css';
import { Typography } from 'antd';

const { Text } = Typography;
const Header = () => (
  <div className="Header-Image">
    <Text className="text">Campaigns Listing</Text>
    <Text className="text">
      Home/
      <span className="Donation-title">Campaigns</span>
    </Text>
  </div>
);

export default Header;
