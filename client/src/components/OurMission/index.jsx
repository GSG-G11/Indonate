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
          Our mission is to help reach people in need and support them in providing a better life,
          be hope for a hungry child or a father who cannot educate his children,
          be hope for those in need
        </Paragraph>
      </div>
    </section>
  );
}

export default OurMission;
