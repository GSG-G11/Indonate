import React from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
// import axios from 'axios';
import {
  Card, Button, Typography,
} from 'antd';
import styles from './index.less';
import 'antd/dist/antd.less';

const { Text } = Typography;
const { Meta } = Card;

function Campaign({
  id,
  title,
  description,
  imgSrc,
  categoryIcon,
}) {
  const navigate = useNavigate();

  const goToCampaign = (campaignId) => navigate(`/campaign/${campaignId}`);
  return (
    <Card
      onClick={() => goToCampaign(id)}
      className="customCard"
      hoverable
      cover={<img alt="card cover" src={imgSrc} />}
    >
      <img className="category" alt="Category" src={categoryIcon} />
      <Meta className={styles.title} title={title} />
      <Text type="secondary">{description}</Text>
      <Button
        type="primary"
        onClick={() => console.log(id)}
      >
        Donate
      </Button>
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
};
