import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Button, message } from 'antd';
import Campaign from '../common/campaignCard';
import './style.less';

const { Title, Text } = Typography;
function latestCampaigns() {
  const [theCampaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const { data: { data: { campaigns } } } = await axios.get('/api/campaigns/?limit=3');
        setCampaigns(campaigns);
        console.log(campaigns);
      } catch ({ response: { data: { message: errorMessage } } }) {
        message.error({
          content: errorMessage,
        });
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
          theCampaigns.map((({
            id,
            title,
            description,
            image_link: imgSrc,
            category: categoryIcon,
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
