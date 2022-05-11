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

const {
  Text,
} = Typography;
const Footer = () => (
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
    <div className="info_container">
      <Text>Copyright © 2022 Indonate, Inc.</Text>
    </div>
  </section>
);

export default Footer;
