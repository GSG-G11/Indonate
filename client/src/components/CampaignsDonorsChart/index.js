import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { Column } from '@ant-design/plots';

const CampaignsDonorsChart = () => {
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
    <div style={{
      width: '700px', backgroundColor: '#fff', height: '300px', margin: '10px',
    }}
    >
      <Column
        data={data}
        xField="campaign"
        yField="donors"
        columnStyle={{ radius: [0] }}
        color="#469D62"
      />
    </div>
  );
};

export default CampaignsDonorsChart;
