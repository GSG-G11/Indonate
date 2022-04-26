import React from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const { Meta } = Card;

function Campaign() {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  );
}

export default Campaign;
