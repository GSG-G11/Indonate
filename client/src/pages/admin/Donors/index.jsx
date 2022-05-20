import {
  Table,
  message,
  Popconfirm,
  Typography,
  Dropdown,
  Space,
  Menu,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import {
  DeleteOutlined,
  EditOutlined,
  WhatsAppOutlined,
  DownOutlined,
} from '@ant-design/icons';
import '../style.css';
import { EditDonor } from '../../../components';

const { Title, Text } = Typography;

const DonorsTable = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [rowsCount, setRowsCount] = useState([]);
  const [donorCampaigns, setDonorCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchDonors = async () => {
      const {
        data: {
          data: { donors, count },
        },
      } = await axios.get(`/api/admin/donors/?page=${+page}&limit=${7}`);
      const allDonors = donors.map((obj) => {
        const name = obj.name.charAt(0).toUpperCase() + obj.name.slice(1); // capitlize name
        return {
          key: obj.id,
          ...obj,
          name,
        };
      });
      setRowsCount(count);
      setDataSource(allDonors);
      setIsLoading(false);
    };
    fetchDonors();
    return () => source.cancel();
  }, [page]);

  const getCampaigns = async (donorId) => {
    try {
      const {
        data: {
          data: { campaigns },
        },
      } = await axios.get(`/api/admin/donor/${donorId}/campaigns`);
      setDonorCampaigns(campaigns);
    } catch ({
      response: {
        data: { message: error },
      },
    }) {
      message.error(error);
    }
  };
  const deleteDonor = async (donorId) => {
    try {
      const {
        data: { message: successMessage },
      } = await axios.delete(`/api/admin/donor/${donorId}`);
      setDataSource(dataSource.filter((obj) => obj.id !== donorId));
      message.success(successMessage);
    } catch ({
      response: {
        data: { message: error },
      },
    }) {
      message.error(error);
    }
  };

  const getUpdatedDonor = ({
    id: updateId, name, email, phone, address,
  }) => {
    const data = dataSource.map((ele) => {
      if (ele.id === updateId) {
        return {
          ...ele,
          name,
          email,
          phone,
          address,
        };
      }
      return ele;
    });
    setDataSource(data);
  };
  const menu = (
    <Menu
      items={donorCampaigns.map(({ id, title }) => ({
        label: <Text>{title}</Text>,
        key: id,
        onClick: () => {
          navigate(`/campaign/${id}`);
        },
      }))}
    />
  );

  const columns = [
    {
      title: 'Name',
      align: 'center',
      dataIndex: 'name',
      width: '15%',
    },
    {
      title: 'Phone',
      align: 'center',
      dataIndex: 'phone',
      width: '15%',
    },
    {
      title: 'Donation',
      align: 'center',
      dataIndex: 'donation',
      width: '15%',
      children: [
        {
          title: 'Money',
          dataIndex: 'totalMoney',
          align: 'center',
          width: '10%',
          render: (text) => <span>{text ? `${text}$ ` : 0}</span>,
        },
        {
          title: 'Food',
          dataIndex: 'totalFood',
          align: 'center',
          width: '10%',
          render: (text) => <span>{text ? `${text} Meals` : 0}</span>,
        },
        {
          title: 'Clothes',
          align: 'center',
          dataIndex: 'totalClothes',
          width: '10%',
          render: (text) => <span>{text ? `${text} Pieces` : 0}</span>,
        },
      ],
    },
    {
      title: 'Address',
      align: 'center',
      dataIndex: 'address',
      width: '15%',
    },
    {
      title: 'Campaigns',
      align: 'center',
      dataIndex: 'campaigns',
      width: '15%',
      render: (_, { id }) => (
        <Dropdown
          placement="bottom"
          className="dropdown_campaigns"
          overlay={menu}
          trigger={['click']}
          onClick={() => getCampaigns(id)}
        >
          <Space>
            <Text>View all</Text>
            <DownOutlined />
          </Space>
        </Dropdown>
      ),
    },

    {
      align: 'center',
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Are you sure?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              deleteDonor(record.key);
            }}
          >
            <DeleteOutlined className="icon delete-icon" />
          </Popconfirm>
          <EditOutlined
            className="icon update-icon"
            onClick={() => {
              setVisible(true);
              setSelectedRow(record);
            }}
          />
          <a
            href={`http://wa.me/${record.phone}`}
            target="_blank"
            aria-label="start chat"
            rel="noreferrer"
          >
            <WhatsAppOutlined className="icon whatsapp_icon" />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="header-table">
        <Title className="header-table-title" level={3}>
          Donors
        </Title>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={
          rowsCount > 7 && { total: rowsCount, defaultPageSize: 7 }
        }
        onChange={(e) => {
          setPage(e.current);
        }}
        size="small"
        loading={isLoading}
      />
      <EditDonor
        visible={visible}
        setVisible={setVisible}
        dataSource={selectedRow}
        getUpdatedDonor={getUpdatedDonor}
      />
    </>
  );
};

export default DonorsTable;
