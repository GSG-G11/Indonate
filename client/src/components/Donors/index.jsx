import {
  Table, message,
  Popconfirm,
  Typography, Select,
} from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'; import {
  DeleteOutlined, EditOutlined, WhatsAppOutlined,
} from '@ant-design/icons';
import './style.less';
import EditDonorModal from './EditDonorModal';

const { Title } = Typography;
const { Option } = Select;

const Donors = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [rowsCount, setRowsCount] = useState([]);
  const [donorCampaigns, setDonorCampaigns] = useState([]);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const nullToZero = (value) => {
    if (value === null) {
      return 0;
    }
    return value;
  };
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchDonors = async () => {
      const { data: { data: { donors, count } } } = await axios.get(`/api/admin/donors/?page=${+page}`);
      const allDonors = donors.map((obj) => {
        const name = obj.name.charAt(0).toUpperCase() + obj.name.slice(1); // capitlize name
        const totalFood = nullToZero(obj.totalFood); // convert incoming null values to 0
        const totalMoney = nullToZero(obj.totalMoney);
        const totalClothes = nullToZero(obj.totalClothes);
        return {
          key: obj.id, ...obj, name, totalFood, totalMoney, totalClothes,
        };
      }).filter(({ email }) => email !== 'admin@gmail.com'); // remove admin
      setRowsCount(count);
      setDataSource(allDonors);
    };
    fetchDonors();
    return source.cancel();
  }, []);

  const deleteDonor = async (donorId) => {
    try {
      const { data: { message: successMessage } } = await axios.delete(`/api/admin/donor/${donorId}`);
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
  const getCampaigns = async (donorId) => {
    try {
      const { data: { data: { campaigns } } } = await axios.get(`/api/admin/donor/${donorId}/campaigns`);
      setDonorCampaigns(campaigns);
    } catch ({
      response: {
        data: { message: error },
      },
    }) {
      message.error(error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '15%',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '15%',
    },
    {
      title: 'Donation',
      dataIndex: 'donation',
      width: '15%',
      children: [
        {
          title: 'Money',
          dataIndex: 'totalMoney',
          width: '10%',
          render: (text) => (
            <>
              $
              {' '}
              {text}
            </>
          ),

        },
        {
          title: 'Clothes',
          dataIndex: 'totalClothes',
          width: '10%',
        },
        {
          title: 'Food',
          dataIndex: 'totalFood',
          width: '10%',

        },
      ],
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '15%',
    },
    {
      title: 'Campaigns',
      dataIndex: 'campaigns',
      width: '15%',
      render: (text, { id }) => (
        <Select
          className="select"
          defaultValue="View campaigns"
          onClick={() => getCampaigns(id)}
          onSelect={(campaignId) => navigate(`/campaign/${campaignId}`)}
        >
          {donorCampaigns.map(({ id: campaignId, title }) => (
            <Option
              key={campaignId}
            >
              {title}
            </Option>
          ))}
        </Select>
      ),
    },

    {
      title: 'Actions',
      render: (_, record) => (

        <div className="icons_container">
          <Popconfirm
            title="Are you sure?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              deleteDonor(record.key);
            }}
          >
            <DeleteOutlined className="delete_icon" />
          </Popconfirm>
          <EditOutlined
            className="edit_icon"
            onClick={
              () => {
                setVisible(true);
                setSelectedRow(record);
              }
            }
          />
          <a
            href={`http://wa.me/${record.phone}`}
            target="_blank"
            aria-label="start chat"
            rel="noreferrer"
          >
            <WhatsAppOutlined className="whatsapp_icon" />
          </a>
        </div>

      ),
    },
  ];

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

  return (
    <section className="donors_table">
      <Title>Donors</Title>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          onChange: (current) => setPage(current),
          total: rowsCount,
          defaultPageSize: 8,
        }}
      />
      <EditDonorModal
        visible={visible}
        setVisible={setVisible}
        dataSource={selectedRow}
        getUpdatedDonor={getUpdatedDonor}
      />

    </section>
  );
};

export default Donors;
