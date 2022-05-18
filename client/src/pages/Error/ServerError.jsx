import { Result } from 'antd';
import React from 'react';

function ServerError() {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
    />
  );
}

export default ServerError;
