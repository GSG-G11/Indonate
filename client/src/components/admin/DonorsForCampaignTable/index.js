import { Table/* , Typography */ } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { WhatsAppOutlined } from '@ant-design/icons';
import './style.css';
// const { Text } = Typography;
const DonorsForCampaignTable = () => {
  const [donors, setDonors] = useState();
  const donorColumns = [
    { title: 'Name', dataIndex: 'name', ellipsis: false },
    { title: 'Decription', dataIndex: 'description', ellipsis: false },
    { title: 'Food', dataIndex: 'food', ellipsis: false },
    { title: 'Clothes', dataIndex: 'clothes', ellipsis: false },
    { title: 'Money', dataIndex: 'money', ellipsis: false },
    { title: 'Deliver time', dataIndex: 'deliverTime', ellipsis: false },
    { title: 'Location', dataIndex: 'location', ellipsis: false },
    {
      title: 'action', data: 'action', ellipsis: false, render: () => <WhatsAppOutlined className="whatAppIcon" />,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { data: { donors: donorsFromDB } } } = await axios.get('/api/admin/campaign/1/donors');
        donorsFromDB.push({
          id: 9,
          name: 'sara',
          phone: '0599888611',
          food: 10,
          money: 100,
          clothes: 10,
          description: 'Just Donation',
          deliverTime: '2020-02-01T22:00:00.000Z',
          location: 'Gaza',
        }, {
          id: 10,
          name: 'sara',
          phone: '0599888611',
          food: 10,
          money: 100,
          clothes: 10,
          description: 'Just Donation',
          deliverTime: '2020-02-01T22:00:00.000Z',
          location: 'Gaza',
        }, {
          id: 11,
          name: 'sara',
          phone: '0599888611',
          food: 10,
          money: 100,
          clothes: 10,
          description: 'Just Donation',
          deliverTime: '2020-02-01T22:00:00.000Z',
          location: 'Gaza',
        }, {
          id: 3,
          name: 'Farah',
          phone: '0599888611',
          food: 10,
          money: 100,
          clothes: 10,
          description: 'Just Donation',
          deliverTime: '2020-02-01T22:00:00.000Z',
          location: 'Gaza',
        }, {
          id: 4,
          name: 'Raghed',
          phone: '0599888611',
          food: 10,
          money: 100,
          clothes: 10,
          description: 'Just Donation',
          deliverTime: '2020-02-01T22:00:00.000Z',
          location: 'Gaza',
        }, {
          id: 5,
          name: 'Deena',
          phone: '0599888611',
          food: 10,
          money: 100,
          clothes: 10,
          description: 'Just Donation',
          deliverTime: '2020-02-01T22:00:00.000Z',
          location: 'Gaza',
        }, {
          id: 12,
          name: 'hani',
          phone: '0599888611',
          food: 10,
          money: 100,
          clothes: 10,
          description: 'Just Donation',
          deliverTime: '2020-02-01T22:00:00.000Z',
          location: 'Gaza',
        }, {
          id: 13,
          name: 'Monhammed',
          phone: '0599888611',
          food: 10,
          money: 100,
          clothes: 10,
          description: 'Just Donation',
          deliverTime: '2020-02-01T22:00:00.000Z',
          location: 'Gaza',
        }, {
          id: 7,
          name: 'Mayer',
          phone: '0599888611',
          food: 10,
          money: 100,
          clothes: 10,
          description: 'Just Donation',
          deliverTime: '2020-02-01T22:00:00.000Z',
          location: 'Gaza',
        });
        setDonors(donorsFromDB);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(donors);
  return (

    <div className="nested-table-section">
      <Table
        className="nested-table"
        dataSource={donors}
        columns={donorColumns}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default DonorsForCampaignTable;
