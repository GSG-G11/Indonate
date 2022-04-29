import React from 'react';
import { Typography, Button } from 'antd';
import Campaign from '../common/campaignCard';
import './style.less';

const { Title, Text } = Typography;
function latestCampaigns() {
  return (
    <section className="layout">
      <Title className="header_title" level={1}>
        <Text>
          Latest
        </Text>
        Campaigns
      </Title>
      <div className="cards">
        <Campaign
          title="Give African children a Good Education"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Donec vitae bibendum dolor, at finibus "
          imgSrc="https://i.ibb.co/41n9Vm0/80109080-733561537139611-6782292533398470656-n.jpg"
          categoryIcon="https://i.ibb.co/jR5Sb6N/image-3.png"
        />
        <Campaign
          title="Give African children a Good Education"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Donec vitae bibendum dolor, at finibus"
          imgSrc="https://i.ibb.co/Srxxn5f/88310451-791815414647556-1956604263299809280-n.jpg"
          categoryIcon="https://i.ibb.co/jR5Sb6N/image-3.png"
        />
        <Campaign
          title="Give African children a Good Education"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Donec vitae bibendum dolor, at finibus "
          imgSrc="https://i.ibb.co/N638K9K/132891950-1005721596590269-2279651605150191597-n.jpg"
          categoryIcon="https://i.ibb.co/jR5Sb6N/image-3.png"
        />
      </div>
      <Button className="more_btn" type="primary">See More Campaigns</Button>
    </section>
  );
}

export default latestCampaigns;
