import {
  Col,
  Divider,
  Image,
  message,
  Progress,
  Row,
  Statistic,
  Typography,
} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { TeamOutlined } from '@ant-design/icons';
import { DonationButton } from '../../components';

const { Title, Paragraph } = Typography;
function OneCampaign({ id }) {
  const [campaign, setCampaign] = useState({});
  const [current, setCurrent] = useState(0);
  const [target, setTarget] = useState(0);
  const [families, setFamilies] = useState(0);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCampaign = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(`/api/campaign/${id}`, {
          cancelToken: source.token,
        });
        setCampaign(data.campaignInfo);
        setCurrent(data.current);
        setTarget(data.campaignInfo.target);
        setFamilies(data.families);
      } catch ({
        response: {
          data: { message: errorMessage },
        },
      }) {
        message.error({
          content: errorMessage,
        });
      }
    };
    getCampaign();
    return () => {
      source.cancel();
    };
  }, []);
  return (
    <div className="one-campaign-page">
      <div className="main">
        <div className="image-container">
          <Image
            className="campaign-image"
            src={campaign.image_link}
            width="100%"
          />
          <Image id="category-icon" className="category-icon" />
        </div>
        <Title className="campaign-title">
          {campaign.title}
          {' '}
          <span>{campaign.isAvailable}</span>
        </Title>
        <Paragraph className="campaign-description">
          {campaign.description}
        </Paragraph>

        <div className="donation-btn">
          {!campaign.is_available ? (
            <Paragraph className="ended-campaign">Ended</Paragraph>
          ) : (
            <> </>
          )}
          <DonationButton
            isAvailable={campaign.is_available}
            campaignId={+id}
            key={+id}
          />
        </div>
      </div>
      <div className="campaign-statistics">
        <Title className="statistics-title">Statistics</Title>
        <Divider plain />
        <Progress
          className="progress"
          type="circle"
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          percent={((100 * +current) / target).toFixed(2)}
        />
        <Paragraph className="target">
          Target:
          {' '}
          {target}
        </Paragraph>
        <Paragraph className="current">
          Current:
          {' '}
          {current}
        </Paragraph>
        <Divider plain />
        <Row gutter={100}>
          <Col span={30}>
            <Statistic
              title="Beneficiary families"
              value={families}
              prefix={<TeamOutlined />}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
OneCampaign.propTypes = {
  id: PropTypes.number.isRequired,
};

export default OneCampaign;
