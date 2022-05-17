import { Table/* , Typography */, Tooltip } from 'antd';
import React from 'react';
import { WhatsAppOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './style.css';
// const { Text } = Typography;
const DonorsForCampaignTable = ({ donors }) => {
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
      render: () => (
        <WhatsAppOutlined style={{
          fontSize: '16px',
          color: '#469D62',
        }}
        />
      ),
    },
  ];
  return (

    <div>
      <Table
        className="nested-table"
        dataSource={donors}
        columns={donorColumns}
        pagination={{ pageSize: 8 }}
        bordered
      />
    </div>
  );
};
DonorsForCampaignTable.propTypes = {
  donors: PropTypes.arrayOf.isRequired,
};
export default DonorsForCampaignTable;
