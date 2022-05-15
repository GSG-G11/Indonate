import React, { useEffect, useState } from 'react';
import {
  Table, Space, Typography, message, Button, Select,
} from 'antd';
import { EditOutlined, WhatsAppOutlined } from '@ant-design/icons';
import axios from 'axios';
import FamilyButton from './FamilyButton';
import FamilyForm from './FamilyForm';
import './style.css';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const Family = () => {
  const [familyData, setFamilyData] = useState([]);
  const [isUpdated, setIsUpdated] = useState(true);
  const [page, setPage] = useState(1);
  const [editedData, setEditedData] = useState({});
  const [visible, setVisible] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data: { data } } = await axios.get(`/api/admin/families?page=${page}`);
        setIsLoading(false);
        setFamilyData(data);
        setIsUpdated(false);
      } catch ({ response: { data: { message: errorMessage } } }) {
        message.error(errorMessage);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isUpdated, page]);

  const getCampaign = async (id) => {
    const { data: { data } } = await axios.get(`/api/admin/family/${id}/campaigns`);
    setCampaigns(data);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Money',
      dataIndex: 'money',
      key: 'money',
      render: (text) => <Paragraph>{text ? `${text}$` : 0}</Paragraph>,
    },
    {
      title: 'Clothes',
      dataIndex: 'clothes',
      key: 'clothes',
      render: (text) => <Paragraph>{text ? `${text} Piece` : 0}</Paragraph>,
    },
    {
      title: 'Food',
      dataIndex: 'food',
      key: 'food',
      render: (text) => <Paragraph>{text ? `${text} Meal` : 0}</Paragraph>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Campaign',
      dataIndex: 'title',
      key: 'title',
      render: (text, { id }) => (
        <Select
          className="select"
          defaultValue="See More"
          onClick={() => getCampaign(id)}
        >
          {campaigns.map(({ title }) => <Option>{title}</Option>)}
        </Select>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, {
        id, name, phone, address,
      }) => (
        <Space size="middle">
          <Button
            type="link"
            key={id}
            icon={<EditOutlined className="edit" />}
            onClick={() => {
              setVisible(true);
              setEditedData({
                id, name, phone, address,
              });
            }}
          />
          <a
            href={`http://wa.me/${phone}`}
            target="_blank"
            aria-label="start chat"
            rel="noreferrer"
          >
            <Button
              type="link"
              icon={<WhatsAppOutlined className="whatsApp" />}
            />
          </a>
        </Space>
      ),
    },
  ];
  const visibleToggle = () => {
    setVisible((prev) => !prev);
  };
  return (
    <>
      <div className="table-container">
        <Title level={2} className="title">Family in needed</Title>
        <FamilyButton isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
      </div>
      <Table
        className="table"
        loading={isLoading}
        columns={columns}
        dataSource={familyData?.families}
        pagination={{
          onChange: (current) => setPage(current),
          current: page,
          total: familyData?.count || 5,
          pageSize: 5,
        }}
      />
      <FamilyForm
        visible={visible}
        setVisible={setVisible}
        onCancel={visibleToggle}
        isUpdated={isUpdated}
        setIsUpdated={setIsUpdated}
        id={editedData?.id}
        name={editedData?.name}
        phone={editedData?.phone}
        address={editedData?.address}
      />
    </>
  );
};

export default Family;
