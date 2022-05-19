import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { Column } from '@ant-design/plots';
import './style.css';

const CampaginsDonorsChart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { data: { campaigns: campaignsData } } } = await axios.get('/api/campaigns');
        const chartData = [];
        campaignsData.map((item) => {
          chartData.push({ campaign: item.title, donors: item.donors.length });
          return false;
        });
        setData(chartData);
      } catch ({ response: { data: { message: errorMessage } } }) {
        message.error(errorMessage);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bar-chart-conatiner">
      <Column
        data={data}
        xField="campaign"
        yField="donors"
        columnStyle={{ radius: [0], width: '5px' }}
        color="#469D62"
        width="20px"
      />
    </div>
  );
};

export default CampaginsDonorsChart;
