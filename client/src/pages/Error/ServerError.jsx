import { Result } from 'antd';
import React from 'react';

const ServerError = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
  />
);

export default ServerError;
