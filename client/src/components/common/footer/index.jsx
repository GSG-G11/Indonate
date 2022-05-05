import React from 'react';
import './style.less';
import {
  FacebookOutlined,
  TwitterOutlined,
  GoogleOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Typography } from 'antd';
import indonate from './logo.svg';

const {
  Text,
} = Typography;

function Footer() {
  return (
    <section className="footer_container">
      <div className="hr_lines">
        <hr className="line" />
        <FacebookOutlined />
        <InstagramOutlined />
        <YoutubeOutlined />
        <TwitterOutlined />
        <GoogleOutlined />
        <hr className="line" />
      </div>
      <div className="logo_container">
        <img className="logo" src={indonate} alt="indonate" />
        <Text>Copyright © 2022 Indonate, Inc.</Text>
      </div>
    </section>
  );
}

export default Footer;
