import React from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import {
  Card,
  Typography,
  Skeleton,
  Image,
  Avatar,
} from 'antd';
import { DonateButton } from '../../donateForm';
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
  loading,
}) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <Card
        className="customCard"
        hoverable
        cover={!loading && (
          <Image
            preview={false}
            alt="Error img"
            src={imgSrc}
          />
        )}
        onClick={() => navigate(`/campaign/${id}`)}
      >
        <Skeleton loading={loading} avatar active width="200%" height="300px">
          <Meta
            className={styles.title}
            title={title}
            avatar={<Avatar src={categoryIcon} />}
          />
          <Text type="secondary">
            {description.slice(0, 90)}
            {' '}
            know more ...
          </Text>
          <DonateButton campaignId={id} />
        </Skeleton>
      </Card>
    </div>
  );
}

export default Campaign;

Campaign.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  categoryIcon: PropTypes.string.isRequired,
  loading: PropTypes.string.isRequired,
};
