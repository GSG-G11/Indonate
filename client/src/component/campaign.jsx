import React from 'react';
import {
  Card, Button, Typography,
} from 'antd';
import styles from './campaign.less';
import 'antd/dist/antd.less';

const { Text } = Typography;

const { Meta } = Card;

function Campaign() {
  return (
    <div className="center">
      <Card
        className="customCard"
        hoverable
        cover={<img alt="card cover" src="https://i.ibb.co/Dftbkqx/135619740-1012632809232481-290318453708399629-n.jpg" />}
      >
        <Meta className={styles.title} title="Give african child a good educations Give african child a good educations" />
        <Text type="secondary">Aellentesque porttitor lacus quis enim varius sed efficitur...</Text>

        <Button type="primary">
          Donate
        </Button>
      </Card>
      <Card
        className="customCard"
        hoverable
        cover={<img alt="card cover" src="https://i.ibb.co/Dftbkqx/135619740-1012632809232481-290318453708399629-n.jpg" />}
      >
        <Meta className={styles.title} title="Give african child a good educations" />
        <Text type="secondary">Aellentesque porttitor lacus quis enim varius sed efficitur...</Text>

        <Button type="primary">
          Donate
        </Button>
      </Card>
      <Card
        className="customCard"
        hoverable
        cover={<img alt="card cover" src="https://i.ibb.co/Dftbkqx/135619740-1012632809232481-290318453708399629-n.jpg" />}
      >
        <Meta className={styles.title} title="Give african child a good educations Give african child a good educations" />
        <Text type="secondary">Aellentesque porttitor lacus quis enim varius sed efficitur...</Text>

        <Button type="primary">
          Donate
        </Button>
      </Card>

    </div>
  );
}

export default Campaign;
