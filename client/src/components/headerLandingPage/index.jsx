import React from 'react';
import { Typography } from 'antd';
import './style.less';

const { Text } = Typography;
function HeaderLandingPage() {
  return (

    <div className="Header-section">
      <div className="description-Header-div">

        <Text className="Header-description">
          Short description for our work, and how we can
          <br />
          {' '}
          affect to People lives
        </Text>
      </div>
      <div className="statistic-section">
        h
      </div>
    </div>

  );
}

export default HeaderLandingPage;
