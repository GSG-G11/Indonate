import React, { useEffect, useState } from 'react';
import {
  Table,
  Popconfirm,
  Popover,
  Space,
  message,
  Result,
  Button,
  Badge,
} from 'antd';
import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

function CampaignsTable() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const [campaignsCount, setCampaignsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

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
        setErrorMessage('');
      } catch ({
        response: {
          data: { message: error },
        },
      }) {
        setErrorMessage(error);
      }
    };
    getCampaigns();
    return () => {
      source.cancel();
    };
  }, [page]);

  const handleDeleteCampaign = async (id) => {
    try {
      const {
        data: { message: deleteMessage },
      } = await axios.delete(`/api/admin/campaigns/${id}`);
      setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
      message.success(deleteMessage);
    } catch ({
      response: {
        data: { message: error },
      },
    }) {
      message.error(error);
    }
  };

  const handleCloseCampaign = async (id) => {
    console.log(id);
    // Handle close campaign code should goes here
  };

  const handleClick = () => {
    navigate('/admin/campaigns');
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title, record) => (
        <Popover content={title}>
          <Link
            to={`/campaign/${record.id}`}
            className="campaign-table-campaign-title"
          >
            {title.split(' ').slice(0, 2).join(' ')}
            ...
          </Link>
        </Popover>
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
      title: 'Category',
      dataIndex: 'category',
      align: 'center',
      key: 'category',
      render: (category) => <div>{category.name}</div>,
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
          {record.is_available ? (
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
          ) : (
            <div />
          )}
          <TeamOutlined style={{ fontSize: '2.5rem', color: '#008EF2' }} />
          {record.is_available ? (
            <EditOutlined style={{ fontSize: '2.5rem', color: '#469D62' }} />
          ) : (
            <Badge count="Closed" />
          )}
        </Space>
      ),
    },
  ];

  return !errorMessage ? (
    <Table
      dataSource={campaigns}
      columns={columns}
      bordered
      loading={isLoading}
      rowClassName={(record) => !record.is_available && 'disabled-row'}
      pagination={{ total: campaignsCount, defaultPageSize: 8 }}
      onChange={(e) => {
        setPage(e.current);
      }}
    />
  ) : (
    <Result
      status="404"
      title={errorMessage}
      extra={[
        <Button type="primary" key="console" onClick={handleClick} size="large">
          Go to Campaigns table
        </Button>,
      ]}
    />
  );
}

export default CampaignsTable;
