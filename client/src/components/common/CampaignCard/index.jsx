import React from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import {
  Card, Typography,
} from 'antd';
import { DonateButton } from '../../DonateForm';
import styles from './index.less';
import 'antd/dist/antd.less';

const { Text } = Typography;
const { Meta } = Card;

function CampaignCard({
  id,
  title,
  description,
  imgSrc,
  categoryIcon,
}) {
  const navigate = useNavigate();
  return (
    <Card
      className="customCard"
      hoverable
      cover={<img alt="card cover" src={imgSrc} />}
      onClick={() => navigate(`/campaign/${id}`)}
    >

      <img className="category" alt="Category" src={categoryIcon} />
      <Meta className={styles.title} title={title} />
      <Text type="secondary">
        {description.slice(0, 90) }
        {' '}
        know more ...
      </Text>
      <DonateButton campaignId={id} />
    </Card>
  );
}

export default CampaignCard;

CampaignCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  categoryIcon: PropTypes.string.isRequired,
};
