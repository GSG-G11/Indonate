import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Table, Tooltip, message } from 'antd';
import { WhatsAppOutlined } from '@ant-design/icons';
import './style.css';

const DonorsForCampaignTable = ({ id }) => {
  const [page, setPage] = useState(1);
  const [donors, setDonors] = useState();
  const [donorsCount, setDonorsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const donorColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: false,
    },
    {
      title: 'Decription',
      dataIndex: 'description',
      ellipsis: true,

      render: (description) => (
        <Tooltip
          placement="topLeft"
          title={description}
          color="#fff"
          overlayInnerStyle={{ color: '#000' }}
        >
          {description}
        </Tooltip>
      ),
    },
    {
      title: 'Food',
      dataIndex: 'food',
      ellipsis: false,
    },
    {
      title: 'Clothes',
      dataIndex: 'clothes',
      ellipsis: false,
    },
    {
      title: 'Money',
      dataIndex: 'money',
      ellipsis: false,
    },
    {
      title: 'Deliver time',
      dataIndex: 'deliverTime',
      ellipsis: false,
      render: (time) => (
        time.split('T')[0]
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      ellipsis: true,
      render: (location) => (
        <Tooltip
          placement="topLeft"
          title={location}
          color="#fff"
          overlayInnerStyle={{ color: '#000' }}
        >
          {location}
        </Tooltip>
      ),
    },
    {
      title: 'action',
      data: 'action',
      ellipsis: false,
      render: (record) => (
        <a
          href={`http://wa.me/${record.phone}`}
          target="_blank"
          aria-label="start chat"
          rel="noreferrer"
        >
          <WhatsAppOutlined className="whatsapp_icon" />
        </a>

      ),
    },
  ];

  useEffect(() => {
    const source = axios.CancelToken.source();
    const { token } = source;
    const fetchData = async () => {
      try {
        const { data: { data: { donors: donorsFromDB, count } } } = await axios.get(`/api/admin/campaign/${id}/donors?page=${page}`, {
          cancelToken: token,
        });
        setDonors(donorsFromDB);
        setDonorsCount(count);
        setIsLoading(false);
      } catch ({ response: { data: { message: errorMessage } } }) {
        message.error(errorMessage);
      }
    };
    fetchData();
    return () => source.cancel();
  }, [page]);
  return (

    <div>
      <Table
        className="nested-table"
        dataSource={donors}
        columns={donorColumns}
        bordered
        loading={isLoading}
        pagination={{ total: donorsCount, defaultPageSize: 6 }}
        onChange={(e) => {
          setPage(e.current);
        }}
      />
    </div>
  );
};
DonorsForCampaignTable.propTypes = {
  id: PropTypes.number.isRequired,
};
export default DonorsForCampaignTable;
