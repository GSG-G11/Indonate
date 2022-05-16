/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import {
  Table,
  Popconfirm,
  Popover,
  Space,
  message,
  Badge,
  Tooltip,
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
// import { DonorsForCampaignTable } from '../../../components';
import './style.css';

function CampaignsTable() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const [campaignsCount, setCampaignsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // const [donors, setDonors] = useState();
  const [key, setKey] = useState(0);

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
      } catch ({
        response: {
          status,
          data: { message: errorMessage },
        },
      }) {
        if (status === 500) {
          navigate('/'); // It will be edited to navigate into server error page
        }
        message.error(errorMessage);
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
        data: { message: errorMessage },
      },
    }) {
      message.error(errorMessage);
    }
  };

  const handleCloseCampaign = async (id) => {
    console.log(id);
    // Handle close campaign code should goes here
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title, record) => (
        <Tooltip
          title={title}
          color="#FFF"
          overlayInnerStyle={{ color: '#000' }}
        >
          <Link
            to={`/campaign/${record.id}`}
            className="campaign-table-campaign-title"
          >
            {title.split(' ').slice(0, 2).join(' ')}
            ...
          </Link>
        </Tooltip>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      align: 'center',
      key: 'description',
      render: (description) => (
        <Tooltip
          title={description}
          trigger="click"
          color="#FFF"
          overlayInnerStyle={{ color: '#000' }}
        >
          <FileSearchOutlined className="icon description-icon" />
        </Tooltip>
      ),
    },
    {
      title: 'Donors',
      dataIndex: '',
      align: 'center',
      key: '',
      render: (_, record) => <button type="submit" onClick={() => setKey(record.id)}>View All ▼</button>,
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
              $
              {value}
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
            <Popover content="Delete campaign">
              <DeleteOutlined className="icon delete-icon" />
            </Popover>
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
              <Popover content="Close campaign">
                <CloseCircleOutlined className="icon close-icon" />
              </Popover>
            </Popconfirm>
          ) : (
            <div />
          )}
          {!record.is_available ? (
            <Popover content="List all families">
              <TeamOutlined className="icon families-icon" />
            </Popover>
          ) : (
            <div />
          )}
          {record.is_available ? (
            <Popover content="Edit campaign">
              <EditOutlined className="icon update-icon" />
            </Popover>
          ) : (
            <Badge count="Closed" />
          )}
        </Space>
      ),
    },
  ];

  /* const fetchDataD = async ({ id }) => {
    try {
      const { data: { data: { donors: donorsFromDB } } }
       = await axios.get('/api/admin/campaign/1/donors');
      setDonors(donorsFromDB);
    } catch ({ response: { data: { message: errorMessage } } }) {
      message.error(errorMessage);
    }
  }; */
  return (
    <Table
      rowkey="1"
      size="small"
      dataSource={campaigns}
      columns={columns}
      bordered
      loading={isLoading}
      rowClassName={(record) => !record.is_available && 'disabled-row'}
      pagination={{ total: campaignsCount, defaultPageSize: 10 }}
      onChange={(e) => {
        setPage(e.current);
      }}
    // eslint-disable-next-line react/no-unstable-nested-components
      expandable={{
        expandedRowRender: (record) => (

          <p style={{ margin: 0 }}>
            { console.log(record)}
            {record.description}

          </p>

        ),

        rowExpandable: (record) => { if (record.id === key) { return true; } return false; },

      }}
    />
  );
}

export default CampaignsTable;
