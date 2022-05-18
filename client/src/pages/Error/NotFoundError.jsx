import { Button, Result, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const NotFoundError = () => (
  <Result
    status="404"
    title="404"
    subTitle={<Title>Page Not Found</Title>}
    extra={(
      <Link to="/">
        <Button type="primary">Back Home</Button>
      </Link>
      )}
  />
);

export default NotFoundError;
