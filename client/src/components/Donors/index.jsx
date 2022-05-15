import {
  Table, Form, message,
  Popconfirm,
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
    } catch ({
      response: {
        data: { message: error },
      },
    }) {
      message.error(error);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchDonors = async () => {
      const { data: { data: { donors } } } = await axios.get('/api/admin/donors');
      const allDonors = donors.map((obj) => {
        const name = obj.name.charAt(0).toUpperCase() + obj.name.slice(1); // capitlize name
        const totalFood = nullToZero(obj.totalFood); // convert incoming null values to 0
        const totalMoney = nullToZero(obj.totalMoney);
        const totalClothes = nullToZero(obj.totalClothes);
        return {
          key: obj.id, ...obj, name, totalFood, totalMoney, totalClothes,
        };
      }).filter(({ email }) => email !== 'admin@gmail.com'); // remove admin
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
      title: 'address',
      dataIndex: 'address',
      width: '20%',
    },

    {
      title: 'Actions',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => {
            deleteDonor(record.key);
          }}
        >
          <DeleteOutlined />
        </Popconfirm>

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
