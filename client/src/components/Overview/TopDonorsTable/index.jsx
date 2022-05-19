import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import './style.css';

const TopDonorsTable = () => {
  const navigate = useNavigate();

  const [topDonors, setTopDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();
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
          cancelToken: source.token,
        });
        setTopDonors(donors);
        setIsLoading(false);
      } catch ({
        response: {
          data: { message: errorMessage },
        },
        response: { status },
      }) {
        if (status && status === 500) {
          navigate('/servererror');
        } else {
          message.error(errorMessage);
        }
      }
    };
    getTopDonors();
    return () => {
      source.cancel();
    };
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
          width: '10vw',
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
  return (
    <div style={{ width: '40vw', height: '190px', marginLeft: '150px' }}>
      <Table
        dataSource={topDonors}
        columns={columns}
        loading={isLoading}
        bordered
        size="small"
        pagination={false}
      />
    </div>
  );
};

export default TopDonorsTable;
