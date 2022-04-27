import React from 'react';
import {
  Card, Button, Typography,
} from 'antd';
import styles from './index.less';
import 'antd/dist/antd.less';

const { Text } = Typography;
const { Meta } = Card;

function Campaign() {
  return (
    <Card
      className="customCard"
      hoverable
      cover={<img alt="card cover" src="https://i.ibb.co/Dftbkqx/135619740-1012632809232481-290318453708399629-n.jpg" />}
    >
      <img className="category" src="https://i.ibb.co/W2Pm8G5/image-3.png" alt="Category" />
      <Meta className={styles.title} title="Give african child a good educations Give african child a good educations" />
      <Text type="secondary">Aellentesque porttitor lacus quis enim varius sed efficitur...</Text>
      <Button type="primary">
        Donate
      </Button>
    </Card>
  );
}

export default Campaign;
