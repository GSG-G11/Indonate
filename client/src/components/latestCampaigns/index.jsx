import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Button } from 'antd';
import Campaign from '../common/campaignCard';
import './style.less';

const { Title, Text } = Typography;
function latestCampaigns({ campaigns }) {
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/api/campaigns');
        console.log(response);
      } catch (e) {
        console.log('An error occurred');
      }
    };
    getData();
  });
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
      <Button className="more_btn ant-btn-primary ant-btn" type="primary" onClick={() => navigate('/campaigns/')}>See More Campaigns</Button>

    </section>
  );
}

export default latestCampaigns;
