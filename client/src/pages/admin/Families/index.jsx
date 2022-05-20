import React, { useEffect, useState } from 'react';
import {
  Table,
  Space,
  Typography,
  message,
  Button,
  Select,
  Popconfirm,
  Popover,
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import '../style.css';
import { AddEditFamily, FamilyButton } from '../../../components';

const { Title } = Typography;
const { Option } = Select;

const FamilyTable = () => {
  const [families, setFamilies] = useState([]);
  const [familiesCount, setFamiliesCount] = useState(0);
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
        const {
          data: { data },
        } = await axios.get(`/api/admin/families?page=${page}&limit=8`);
        setIsLoading(false);
        setFamilies(data.families);
        setFamiliesCount(data.count);
        setIsUpdated(false);
      } catch ({
        response: {
          data: { message: errorMessage },
        },
      }) {
        message.error(errorMessage);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isUpdated, page]);
  const handleDeleteFamily = async (id) => {
    try {
      const {
        data: { message: deleteMessage },
      } = await axios.delete(`/api/admin/family/${id}`);
      setFamilies(families.filter((family) => family.id !== id));
      message.success(deleteMessage);
    } catch ({
      response: {
        data: { message: errorMessage },
      },
    }) {
      message.error(errorMessage);
    }
  };
  const getCampaign = async (id) => {
    const {
      data: { data },
    } = await axios.get(`/api/admin/family/${id}/campaigns`);
    setCampaigns(data);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      align: 'center',
      key: 'name',
    },
    {
      title: 'Phone',
      align: 'center',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Capons',
      align: 'center',
      children: [
        {
          title: 'Money',
          align: 'center',
          dataIndex: 'money',
          key: 'money',
          render: (text) => (text ? `${text}$` : 0),
        },
        {
          title: 'Clothes',
          align: 'center',
          dataIndex: 'clothes',
          key: 'clothes',
          render: (text) => (text ? `${text} Piece` : 0),
        },
        {
          title: 'Food',
          align: 'center',
          dataIndex: 'food',
          key: 'food',
          render: (text) => (text ? `${text} Meal` : 0),
        },
      ],
    },
    {
      title: 'Address',
      align: 'center',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Campaign',
      align: 'center',
      dataIndex: 'title',
      key: 'title',
      render: (text, { id }) => (
        <Select
          className="select"
          defaultValue="See More"
          onClick={() => getCampaign(id)}
        >
          {campaigns.map(({ title }) => (
            <Option>{title}</Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (text, {
        id, name, phone, address,
      }) => (
        <Space>
          <Popconfirm
            title="Are you sure？"
            onConfirm={() => {
              handleDeleteFamily(id);
            }}
            okText="Yes"
            cancelText="No"
            okType="danger"
          >
            <Popover content="Delete campaign">
              <DeleteOutlined className="icon delete-icon" />
            </Popover>
          </Popconfirm>
          <Button
            type="link"
            key={id}
            icon={<EditOutlined className="icon update-icon" />}
            onClick={() => {
              setVisible(true);
              setEditedData({
                id,
                name,
                phone,
                address,
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
              icon={<WhatsAppOutlined className="icon whatsapp-icon" />}
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
      <div className="header-table">
        <Title className="header-table-title" level={3}>
          Families
        </Title>
        <FamilyButton isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
      </div>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={families}
        pagination={
          familiesCount > 10 && {
            total: familiesCount,
            defaultPageSize: 10,
          }
        }
        onChange={(e) => {
          setPage(e.current);
        }}
        size="small"
        bordered
      />
      <AddEditFamily
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

export default FamilyTable;
