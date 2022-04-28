import React from 'react';
import './style.less';
import { Typography } from 'antd';

const { Paragraph } = Typography;

function OurMission() {
  return (
    <section className="our-mission-section">
      <div className="our-mission-image-container">
        <div className="green-background" />
      </div>
      <div className="our-mission-description-container">
        <Paragraph className="title">Our Mission</Paragraph>
        <Paragraph className="description">
          We At Our Company name, we give the best services for users and for
          caregivers to donate their extra money so that we steal the money from
          them.
        </Paragraph>
      </div>
    </section>
  );
}

export default OurMission;
