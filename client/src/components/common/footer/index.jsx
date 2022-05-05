import React from 'react';
import './style.less';
import {
  FacebookOutlined,
  TwitterOutlined,
  GoogleOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import indonate from './indonate.svg';

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
      <div>
        <img className="logo" src={indonate} alt="indonate" />

      </div>
    </section>
  );
}

export default Footer;
