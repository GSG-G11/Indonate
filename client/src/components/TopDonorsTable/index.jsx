import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message, Table } from 'antd';

function TopDonorsTable() {
  const [topDonors, setTopDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getTopDonors = async () => {
      try {
        const {
          data: {
            data: { donors },
          },
        } = await axios.get('/api/admin/donors', {
          params: {
            limit: 3,
            order: 'top',
          },
        });
        setTopDonors(donors);
        setIsLoading(false);
        setErrorMessage('');
      } catch ({
        response: {
          data: { message: error },
        },
      }) {
        setErrorMessage(error);
      }
    };
    getTopDonors();
    return () => {};
  }, []);
  const columns = [
    {
      title: 'Top Donors',
      align: 'center',
      children: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Donations',
          align: 'center',
          children: [
            {
              title: 'Money',
              dataIndex: 'totalMoney',
              key: 'totalMoney',
              render: (value) => (
                <>
                  $
                  {value}
                </>
              ),
            },
            {
              title: 'Money',
              dataIndex: 'totalFood',
              key: 'totalFood',
              render: (value) => (
                <>
                  {value}
                  {' '}
                  Meal
                </>
              ),
            },
            {
              title: 'Money',
              dataIndex: 'totalClothes',
              key: 'totalClothes',
              render: (value) => (
                <>
                  {value}
                  {' '}
                  Piece
                </>
              ),
            },
          ],
        },
      ],
    },
  ];
  return !errorMessage ? (
    <Table
      dataSource={topDonors}
      columns={columns}
      loading={isLoading}
      bordered
      size="small"
      pagination={false}
    />
  ) : (
    message.error(errorMessage)
  );
}

export default TopDonorsTable;
