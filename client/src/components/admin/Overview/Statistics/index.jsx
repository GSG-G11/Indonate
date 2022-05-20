import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DollarOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  SkinOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Card from './Card';

const Statistic = () => {
  const [statistics, setStatistics] = useState({});
  useEffect(() => {
    const source = axios.CancelToken.source();
    const { token } = source;
    const fetchData = async () => {
      const {
        data: { data },
      } = await axios.get('/api/statistics', { cancelToken: token });
      const object = {
        families: {
          count: data.families,
          icon: <TeamOutlined className="icon families-icon" />,
        },
        clothes: {
          count: data.clothes,
          icon: <SkinOutlined className="icon" style={{ color: 'red' }} />,
        },
        food: {
          count: data.food,
          icon: <ShoppingCartOutlined className="icon" style={{ color: 'orange' }} />,
        },
        money: {
          count: data.money,
          icon: <DollarOutlined className="icon" style={{ color: 'green' }} />,
        },
        campaigns: {
          count: data.campaigns,
          icon: <PieChartOutlined className="icon" style={{ color: 'purple' }} />,
        },
        donors: {
          count: data.donors,
          icon: <UserOutlined className="icon" style={{ color: 'burlywood' }} />,
        },
      };
      setStatistics(object);
    };
    fetchData();

    return () => source.cancel();
  }, []);
  return <Card statistics={statistics} />;
};
export default Statistic;
