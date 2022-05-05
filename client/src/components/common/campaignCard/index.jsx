import React from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
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
  return (
    <Card
      onClick={() => navigate(`/campaign/${id}`)}
      className="customCard"
      hoverable
      cover={<img alt="card cover" src={imgSrc} />}
    >
      <img className="category" alt="Category" src={categoryIcon} />
      <Meta className={styles.title} title={title} />
      <Text type="secondary">{description}</Text>
      <Button
        type="primary"
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
