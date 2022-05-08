import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, Typography,
} from 'antd';
import DonationButton from '../../donateForm/DonateButton';
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
  return (
    <Card
      className="customCard"
      hoverable
      cover={<img alt="card cover" src={imgSrc} />}
    >

      <img className="category" alt="Category" src={categoryIcon} />
      <Meta className={styles.title} title={title} />
      <Text type="secondary">
        {description.slice(0, 90) }
        {' '}
        know more ...
      </Text>
      <DonationButton campaignId={id} />
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
