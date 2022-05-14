/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Collapse,
  Table,
  Popconfirm,
  Popover,
  Space,
  message,
  Pagination,
} from 'antd';
import {
  CloseCircleOutlined,
  DeleteOutlined,
  FileSearchOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';

function CampaignsTable() {
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const [campaignsCount, setCampaignsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCampaigns = async () => {
      try {
        const {
          data: {
            data: { campaigns: campaignsData, count },
          },
        } = await axios.get(`/api/admin/campaigns?page=${page}`, {
          cancelToken: source.token,
        });
        setCampaigns(campaignsData);
        setCampaignsCount(count);
        setIsLoading(false);
        setIsError(false);
      } catch ({
        response: {
          data: { message: errorMessage },
        },
      }) {
        message.error(errorMessage);
        setIsError(true);
      }
    };
    getCampaigns();
    return () => {
      source.cancel();
    };
  }, [page]);
  const handleDeleteCampaign = async (id) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
    try {
      const {
        data: { message: deleteMessage },
      } = await axios.delete(`/api/admin/campaigns/${id}`);
      message.success(deleteMessage);
    } catch ({
      response: {
        data: { message: errorMessage },
      },
    }) {
      message.error(errorMessage);
    }
  };
  const handleCloseCampaign = async (id) => {
    try {
      const {
        data: { message: deleteMessage },
      } = await axios.patch(`/api/admin/campaign/${id}`);
      message.success(deleteMessage);
    } catch ({
      response: {
        data: { message: errorMessage },
      },
    }) {
      message.error(errorMessage);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title, record) => (
        <Link
          to={`/campaign/${record.id}`}
          className="campaign-table-campaign-title"
        >
          {title.split(' ').slice(0, 5).join(' ')}
        </Link>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      align: 'center',
      key: 'description',
      render: (description) => (
        <Popover placement="bottom" content={description} trigger="click">
          <FileSearchOutlined style={{ fontSize: '2.5rem' }} />
        </Popover>
      ),
    },
    {
      title: 'Donors',
      dataIndex: '',
      align: 'center',
      key: '',
      render: () => <>View All ▼</>,
    },
    {
      title: 'Target',
      children: [
        {
          title: 'Money',
          align: 'center',
          dataIndex: 'money_target',
          key: 'money_target',
          render: (value) => (
            <>
              {value}
              $
            </>
          ),
        },
        {
          title: 'Food',
          dataIndex: 'food_target',
          align: 'center',
          key: 'food_target',
          render: (value) => (
            <>
              {value}
              {' '}
              Meal
            </>
          ),
        },
        {
          title: 'Clothes',
          align: 'center',
          dataIndex: 'clothes_target',
          key: 'clothes_target',
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
    {
      title: 'Current',
      children: [
        {
          title: 'Money',
          dataIndex: 'current_money',
          align: 'center',
          key: 'current_money',
          render: (value) => (
            <>
              {value}
              $
            </>
          ),
        },
        {
          title: 'Food',
          align: 'center',
          dataIndex: 'current_food',
          key: 'current_food',
          render: (value) => (
            <>
              {value}
              {' '}
              Meal
            </>
          ),
        },
        {
          title: 'Clothes',
          dataIndex: 'current_clothes',
          align: 'center',

          key: 'current_clothes',
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
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Are you sure？"
            onConfirm={() => {
              handleDeleteCampaign(record.id);
            }}
            okText="Yes"
            cancelText="No"
            okType="danger"
          >
            <DeleteOutlined style={{ fontSize: '2.5rem', color: 'red' }} />
          </Popconfirm>
          <Popconfirm
            title="Sure to close?"
            onConfirm={() => {
              handleCloseCampaign(record.id);
            }}
            okText="Yes"
            cancelText="No"
            okType="primary"
          >
            <CloseCircleOutlined style={{ fontSize: '2.5rem' }} />
          </Popconfirm>
          <UserAddOutlined style={{ fontSize: '2.5rem', color: 'green' }} />
        </Space>
      ),
    },
  ];

  return !isError ? (
    <Table
      dataSource={campaigns}
      bordered
      loading={isLoading}
      columns={columns}
      pagination={{ total: campaignsCount, defaultPageSize: 8 }}
      onChange={(e) => {
        setPage(e.current);
      }}
    />
  ) : (
    <div>{isError}</div>
  );
}

export default CampaignsTable;
