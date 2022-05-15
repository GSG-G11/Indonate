import {
  Table, Form, message,
} from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios'; import { DeleteOutlined } from '@ant-design/icons';

function Donors() {
  const [dataSource, setDataSource] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();

  const nullToZero = (value) => {
    if (value === null) {
      return 0;
    }
    return value;
  };

  const deleteDonor = async (donorId) => {
    try {
      const { data: { message: successMessage } } = await axios.delete(`/api/admin/donor/${donorId}`);
      setDataSource(dataSource.filter((obj) => obj.id !== donorId));
      message.success(successMessage);
    } catch (e) {
      message.success(e.message);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchDonors = async () => {
      const { data: { data: { donors } } } = await axios.get('/api/admin/donors');
      const allDonors = donors.map((obj) => {
        const totalFood = nullToZero(obj.totalFood);
        const totalMoney = nullToZero(obj.totalMoney);
        const totalClothes = nullToZero(obj.totalClothes);
        return {
          key: obj.id, ...obj, totalFood, totalMoney, totalClothes,
        };
      }).filter((obj) => obj.name !== 'admin'); // remove admin
      setDataSource(allDonors);
    };
    fetchDonors();
    return source.cancel();
  }, []);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '15%',
      render: (text) => <p>{text}</p>,
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
      title: 'address',
      dataIndex: 'address',
      width: '20%',
      editable: true,
      render: (text) => <p>{text}</p>,
    },

    {
      title: 'Actions',
      render: (_, record) => (
        <DeleteOutlined onClick={() => {
          deleteDonor(record.key);
        }}
        />
      ),
    },
  ];

  const onFinish = async (values) => {
    const updatedDataSource = [...dataSource];
    updatedDataSource.splice(editingRow, 1, { key: editingRow, id: editingRow, ...values });
    const response = await axios.patch(`/api/admin/donor/${editingRow}`, values);
    console.log(response);
    setDataSource(updatedDataSource);
    setEditingRow(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Form form={form} onFinish={onFinish}>
          <Table columns={columns} dataSource={dataSource} />
        </Form>
      </header>
    </div>
  );
}

export default Donors;
