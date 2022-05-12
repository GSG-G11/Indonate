import React from 'react';
import './style.less';
import { Typography } from 'antd';
import Container from '../Container';

const { Paragraph } = Typography;

const OurMission = () => (
  <Container>
    <section className="our-mission-section" id="our-mission-section">
      <div className="our-mission-image-container">
        <div className="green-background" />
      </div>
      <div className="our-mission-description-container">
        <Paragraph className="title">Our Mission</Paragraph>
        <Paragraph className="our-mission-description">
          Our mission is to help reach people in need and support them in
          providing a better life, be hope for a hungry child or a father who
          cannot educate his children, be hope for those in need.
        </Paragraph>
      </div>
    </section>
  </Container>
);

export default OurMission;
