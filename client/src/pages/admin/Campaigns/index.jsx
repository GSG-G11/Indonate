/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Table,
  Popconfirm,
  Popover,
  Space,
  message,
  Badge,
  Tooltip,
  Typography,
  Button,
  Dropdown,
  Menu,
} from 'antd';
import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  FileSearchOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  DonorsForCampaignTable,
  AddEditCampaign,
  AddFamiliesForCampaign,
} from '../../../components';
import '../style.css';

const CampaignsTable = () => {
  const { Text, Title } = Typography;
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const [campaignsCount, setCampaignsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isUpdateCampaign, setIsUpdateCampaign] = useState(false);
  const [action, setAction] = useState('');
  const [key, setKey] = useState(0);
  const [campaignId, setCampaignId] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [familiesForCampaign, setFamiliesForCampaign] = useState([]);
  const [campaignData, setCampaignData] = useState({
    title: '',
    description: '',
    categoryId: '',
    food_target: '',
    clothes_target: '',
    money_target: '',
  });

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
        setIsUpdateCampaign(false);
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
  }, [page, isUpdateCampaign, modalVisible]);

  const handleDeleteCampaign = async (id) => {
    try {
      const {
        data: { message: deleteMessage },
      } = await axios.delete(`/api/admin/campaign/${id}`);
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
    setModalVisible(true);
    setCampaignId(id);
    // Handle close campaign code should goes here
  };
  const handleEditCampaign = (record) => {
    setCampaignData(record);
    setVisible(true);
    setAction('Edit');
  };
  const handleAddCampaign = async () => {
    setVisible(true);
    setCampaignData({
      title: '',
      description: '',
      categoryId: '',
      food_target: '',
      clothes_target: '',
      money_target: '',
    });
    setAction('Add');
  };

  const handleGetFamilies = async (id) => {
    try {
      const {
        data: { data },
      } = await axios.get(`/api/admin/campaign/${id}/families`);
      setFamiliesForCampaign(data.families);
    } catch ({
      response: {
        status,
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
      render: (_, { id }) => (
        <Text
          onClick={() => {
            id === key ? setKey(0) : setKey(id);
          }}
        >
          {id === key ? 'View All ▲' : 'View All ▼'}
        </Text>
      ),
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
          render: (value) => (+value ? `${value}$` : value),
        },
        {
          title: 'Food',
          align: 'center',
          dataIndex: 'current_food',
          key: 'current_food',
          render: (value) => (+value ? `${value} Meal` : value),
        },
        {
          title: 'Clothes',
          dataIndex: 'current_clothes',
          align: 'center',
          key: 'current_clothes',
          render: (value) => (+value ? `${value} Piece` : value),
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
            <Dropdown
              overlay={(
                <Menu
                  items={familiesForCampaign.map((family) => ({
                    label: family.name,
                    key: family.id,
                    icon: <UserOutlined />,
                  }))}
                />
              )}
              trigger="click"
              placement="bottom"
            >
              <TeamOutlined
                className="icon families-icon"
                onClick={() => {
                  handleGetFamilies(record.id);
                }}
              />
            </Dropdown>
          ) : (
            <div />
          )}
          {record.is_available ? (
            <Popover content="Edit campaign">
              <EditOutlined
                className="icon update-icon"
                onClick={() => handleEditCampaign(record)}
              />
            </Popover>
          ) : (
            <Badge count="Closed" />
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="header-table">
        <Title className="header-table-title" level={4}>
          Campaigns
        </Title>
        <Button type="primary" onClick={handleAddCampaign}>
          Add Campaign
        </Button>
      </div>

      <Table
        size="small"
        dataSource={campaigns}
        columns={columns}
        bordered
        loading={isLoading}
        rowClassName={(record) => !record.is_available && 'disabled-row'}
        pagination={
          campaignsCount > 7 && { total: campaignsCount, defaultPageSize: 7 }
        }
        onChange={(e) => {
          setPage(e.current);
        }}
        rowKey="id"
        expandable={{
          expandedRowKeys: [key],
          expandedRowRender: () => <DonorsForCampaignTable id={+key} />,
          rowExpandable: (record) => record.id === key,
          expandIcon: () => null,
        }}
      />
      <AddEditCampaign
        visible={visible}
        setVisible={setVisible}
        action={action}
        data={campaignData}
        setIsUpdateCampaign={setIsUpdateCampaign}
      />

      <AddFamiliesForCampaign
        visible={modalVisible}
        setVisible={setModalVisible}
        campaignId={campaignId}
      />
    </>
  );
};

export default CampaignsTable;
