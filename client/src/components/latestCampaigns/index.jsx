import React from 'react';
import { Typography, Anchor } from 'antd';
import Campaign from '../common/campaignCard';
import './style.less';

const { Link } = Anchor;
const { Title, Text } = Typography;
function latestCampaigns({ campaigns }) {
  const toCampaignsPage = (e) => {
    e.preventDefault();
    // Navigate to /Campaigns
  };
  return (
    <section className="layout">
      <Title className="header_title" level={1}>
        <Text>
          Latest
        </Text>
        Campaigns
      </Title>
      <div className="cards">
        {
          campaigns.map((({
            id,
            title,
            description,
            imgSrc,
            categoryIcon,
          }) => (
            <Campaign
              key={id}
              id={id}
              title={title}
              description={description}
              imgSrc={imgSrc}
              categoryIcon={categoryIcon}
            />
          )
          ))
        }
      </div>
      <Anchor className="anchor" onClick={toCampaignsPage}>
        <Link href="/campaigns" className="more_btn ant-btn-primary ant-btn" title="See More Campaigns" />
      </Anchor>
    </section>
  );
}

export default latestCampaigns;
