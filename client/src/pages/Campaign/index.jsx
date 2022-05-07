import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Col,
  Divider,
  Image,
  Progress,
  Row,
  Statistic,
  Typography,
  Result,
  Button,
  Skeleton,
} from 'antd';
import './style.less';
import { TeamOutlined } from '@ant-design/icons';
import { DonationButton } from '../../components';

const { Title, Paragraph } = Typography;

function Campaign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCampaign = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(`/api/campaign/${id}`, {
          cancelToken: source.token,
        });
        setCampaign(data || {});
        setIsLoading(false);
      } catch ({
        response: {
          data: { message: errorMessage },
        },
      }) {
        setError(errorMessage);
      }
    };
    getCampaign();
    return () => {
      source.cancel();
    };
  }, []);

  const handleClick = () => {
    navigate('/campaigns');
  };

  return (
    // <> </>
    !error ? (
      <div className="one-campaign-page">
        <div className="main">
          {!isLoading ? (
            <>
              <div className="image-container">
                <Image
                  className="campaign-image"
                  src={campaign.campaignInfo.image_link}
                  width="100%"
                />
                <Image id="category-icon" className="category-icon" />
              </div>
              <Title className="campaign-title">
                {campaign.campaignInfo.title}
                {' '}
                <span>{campaign.isAvailable}</span>
              </Title>
              <Paragraph className="campaign-description">
                {campaign.campaignInfo.description}
              </Paragraph>

              <div className="donation-btn">
                {!campaign.campaignInfo.is_available ? (
                  <Paragraph className="ended-campaign">Ended</Paragraph>
                ) : (
                  <> </>
                )}
                <DonationButton
                  isAvailable={campaign.campaignInfo.is_available}
                  campaignId={+id}
                  key={+id}
                />
              </div>
            </>
          ) : (
            <Skeleton active />
          )}
        </div>
        <div className="campaign-statistics">
          {!isLoading ? (
            <>
              <Title className="statistics-title">Statistics</Title>
              <Divider plain />
              <Progress
                className="progress"
                type="circle"
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                percent={(
                  (100 * +campaign.current)
                  / campaign.campaignInfo.target
                ).toFixed(2)}
              />
              <Paragraph className="target">
                Target:
                {' '}
                {campaign.campaignInfo.target}
              </Paragraph>
              <Paragraph className="current">
                Current:
                {' '}
                {campaign.current}
              </Paragraph>
              <Divider plain />
              <Row gutter={100}>
                <Col span={30}>
                  <Statistic
                    title="Beneficiary families"
                    value={campaign.families}
                    prefix={<TeamOutlined />}
                  />
                </Col>
              </Row>
            </>
          ) : (
            <Skeleton active />
          )}
        </div>
      </div>
    ) : (
      <Result
        status="404"
        title={error}
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={handleClick}
            size="large"
          >
            Go to Campaigns
          </Button>,
        ]}
      />
    )
  );
}

export default Campaign;
