import React from 'react';
import { Typography } from 'antd';
import Campaign from '../common/campaignCard';
import './style.less';

const { Title, Text } = Typography;
function latestCampaigns() {
  return (
    <>
      <Title className="header_title" level={2}>
        <Text>
          Latest
        </Text>
        Campaigns
      </Title>
      <div className="cards_layout">
        <Campaign
          title="Give African children a Good Education"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Donec vitae bibendum dolor, at finibus lacus. Nunc non tempus orci, et tincidunt"
          imgSrc="https://i.ibb.co/41n9Vm0/80109080-733561537139611-6782292533398470656-n.jpg"
          categoryIcon="https://i.ibb.co/jR5Sb6N/image-3.png"
        />
        <Campaign
          title="Give African children a Good Education"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Donec vitae bibendum dolor, at finibus lacus. Nunc non tempus orci, et tincidunt"
          imgSrc="https://i.ibb.co/41n9Vm0/80109080-733561537139611-6782292533398470656-n.jpg"
          categoryIcon="https://i.ibb.co/jR5Sb6N/image-3.png"
        />
        <Campaign
          title="Give African children a Good Education"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.
       Donec vitae bibendum dolor, at finibus lacus. Nunc non tempus orci, et tincidunt"
          imgSrc="https://i.ibb.co/41n9Vm0/80109080-733561537139611-6782292533398470656-n.jpg"
          categoryIcon="https://i.ibb.co/jR5Sb6N/image-3.png"
        />
      </div>
    </>
  );
}

export default latestCampaigns;

// title,
//   description,
//   imgSrc,
//   categoryIcon,
