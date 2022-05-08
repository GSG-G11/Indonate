import React from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { Card, Typography } from 'antd';

import styles from './index.less';
import 'antd/dist/antd.less';
import DonationButton from '../../donateForm/DonateButton';

const { Text } = Typography;
const { Meta } = Card;

function Campaign({
  id,
  title,
  description,
  imgSrc,
  categoryIcon,
  isAvailable,
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
        {description.slice(0, 90)}
        {' '}
        know more ...
      </Text>
      <DonationButton campaignId={id} isAvailable={isAvailable} />
    </Card>
  );
}

export default Campaign;

Campaign.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  categoryIcon: PropTypes.string.isRequired,
  isAvailable: PropTypes.bool.isRequired,
};
