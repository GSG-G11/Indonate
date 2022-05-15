import {
  Button, Table, Form, Input,
} from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    const fetchDonors = async () => {
      const { data: { data: { donors } } } = await axios.get('/api/admin/donors');
      const allDonors = donors.map((obj) => {
        const totalFood = nullToZero(obj.totalFood);
        const totalMoney = nullToZero(obj.totalMoney);
        const totalClothes = nullToZero(obj.totalClothes);
        return {
          key: obj.id, ...obj, totalFood, totalMoney, totalClothes,
        };
      });
      setDataSource(allDonors); // remove admin
    };
    fetchDonors();
  }, []);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please enter your name',
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        }
        return <p>{text}</p>;
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '15%',
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please enter your phone',
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        }
        return <p>{text}</p>;
      },
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
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Please enter your address',
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        }
        return <p>{text}</p>;
      },
    },

    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setEditingRow(record.key);
              form.setFieldsValue({
                name: record.name,
                phone: record.phone,
                address: record.address,
              });
            }}
          >
            Edit
          </Button>
          <Button type="link" htmlType="submit">
            Save
          </Button>
        </>
      ),
    },
  ];
  const onFinish = (values) => {
    const updatedDataSource = [...dataSource];
    updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
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
