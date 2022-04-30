import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, Button, Typography,
} from 'antd';
import styles from './index.less';
import 'antd/dist/antd.less';

const { Text } = Typography;
const { Meta } = Card;

function Campaign({
  title,
  description,
  imgSrc,
  categoryIcon,
}) {
  return (
    <Card
      className="customCard"
      hoverable
      cover={<img alt="card cover" src={imgSrc} />}
    >
      <img className="category" alt="Category" src={categoryIcon} />
      <Meta className={styles.title} title={title} />
      <Text type="secondary">{description}</Text>
      <Button type="primary">
        Donate
      </Button>
    </Card>
  );
}

export default Campaign;

Campaign.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  categoryIcon: PropTypes.string.isRequired,
};
