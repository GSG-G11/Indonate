import React, { useEffect, useState } from 'react';
import {
  Table, Space, Typography, message, Button,
} from 'antd';
import { EditOutlined, WhatsAppOutlined } from '@ant-design/icons';
import axios from 'axios';
import FamilyButton from './FamilyButton';
import FamilyForm from './FamilyForm';

const { Title, Paragraph } = Typography;

const Family = () => {
  const [familyData, setFamilyData] = useState([]);
  const [isUpdated, setIsUpdated] = useState(true);
  const [page, setPage] = useState(1);
  const [editedData, setEditedData] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { data } } = await axios.get(`/api/admin/families?page=${page}`);
        setFamilyData(data);
        setIsUpdated(false);
      } catch ({ response: { data: { message: errorMessage } } }) {
        message.error(errorMessage);
      }
    };
    fetchData();
  }, [isUpdated, page]);

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
      render: (text) => <Paragraph>{text || 0}</Paragraph>,
    },
    {
      title: 'Food',
      dataIndex: 'food',
      key: 'food',
      render: (text) => <Paragraph>{text || 0}</Paragraph>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Campaign',
      dataIndex: 'campaign',
      key: 'campaign',
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
            icon={<EditOutlined style={{ color: 'blue', cursor: 'pointer' }} />}
            onClick={() => {
              setVisible(true);
              setEditedData({
                id, name, phone, address,
              });
            }}
          />
          <a href={`http://wa.me/${phone}`} target="_blank" alt="" aria-label="start chat" rel="noreferrer"><Button type="link" icon={<WhatsAppOutlined style={{ color: 'green' }} />} /></a>
        </Space>
      ),
    },
  ];
  const visibleToggle = () => {
    setVisible((prev) => !prev);
  };
  return (
    <>
      <div style={{
        display: 'flex', justifyContent: 'space-between', marginTop: '12px', marginRight: '15px',
      }}
      >
        <Title level={2} style={{ color: '#469D62' }}>Family in needed</Title>
        <FamilyButton isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
      </div>
      <Table
        style={{ marginTop: '20px' }}
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
