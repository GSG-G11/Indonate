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

  useEffect(() => {
    const fetchDonors = async () => {
      const response = await axios.get('/api/admin/doners');
      console.log(response);
    };
    fetchDonors();
    // setDataSource(response);
  }, []);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
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
      title: 'Address',
      dataIndex: 'address',
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="address">
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
