import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message, Image } from 'antd';
import QuickChart from 'quickchart-js';

const CampaginsDonorsChart = () => {
  const [image, setImage] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { data: { campaigns: campaignsData } } } = await axios.get('/api/campaigns');
        const Names = [];
        const DonorsNumber = [];
        campaignsData.map((item) => {
          Names.push(item.title);
          DonorsNumber.push(item.donors.length);
          return false;
        });
        const myChart = new QuickChart();
        myChart
          .setConfig({
            type: 'bar',
            data: {
              labels: Names,
              datasets: [
                {
                  label: 'Campaigns-Donors',
                  backgroundColor: '#94e3ad',
                  borderColor: '#469D62',
                  borderWidth: 1,
                  setWidth: '10px',
                  data: DonorsNumber,
                },
              ],
            },

          })
          .setWidth(800)
          .setHeight(400)
          .setBackgroundColor('#fff');
        setImage(myChart.getUrl());
      } catch ({ response: { data: { message: errorMessage } } }) {
        message.error(errorMessage);
      }
    };

    fetchData();
  }, []);
  return (
    <Image
      src={image}
      preview={false}
      style={{ width: '600px' }}
    />

  );
};

export default CampaginsDonorsChart;
