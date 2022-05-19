import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from 'antd';
import './style.css';

const { Text } = Typography;
const descriptions = ['Got help from us', 'Collected for families', 'Collected for families ', 'Collected for families '];

const HeaderLandingPage = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const source = axios.CancelToken.source();
    const { token } = source;
    const fetchData = async () => {
      const { data: { data: dataFromDB } } = await axios.get('/api/statistics', { cancelToken: token });
      setData(dataFromDB);
    };
    fetchData();

    return () => source.cancel();
  }, []);

  return (

    <div className="Header-section">
      <div className="description-Header-div">
        <Text className="Header-description">
          The Prophet (pbuh) said,
          O people, promote the greetings, feed
          and perform Salat when others are asleep so that you will enter Jannah safely.
        </Text>
      </div>
      <div className="statistic-section">

        {Object.keys(data).filter((item, index) => index < 4).map((item, index) => (
          <div className="statistic-card" key={item}>
            <Text className="statistic-data">{data[item]}</Text>
            <Text className="statistic-title">{item}</Text>
            <Text className="description-title">{descriptions[index]}</Text>
          </div>

        ))}

      </div>
    </div>
  );
};

export default HeaderLandingPage;
