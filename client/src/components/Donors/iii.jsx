import React, { useState } from 'react';
import {
  Table, Typography, Form, Input,
} from 'antd';
import {
  EditOutlined,
  // DeleteOutlined,
} from '@ant-design/icons';

import './style.less';

const { Title } = Typography;
const { Item } = Form;

const Donors = () => {
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      editable: true,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form>
              <Item
                name="name"
                rules={[{
                  required: true, message: 'Please enter name',
                }]}
              >
                <Input />
              </Item>
            </Form>
          );
        }
        return <p>{text}</p>;
      },
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '15%',
      editable: true,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form>
              <Item
                name="name"
                rules={[{
                  required: true, message: 'Please enter name',
                }]}
              >

                <Input />
              </Item>
            </Form>
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
          dataIndex: 'money',
          width: '10%',
        },
        {
          title: 'Clothes',
          dataIndex: 'clothes',
          width: '10%',
        },
        {
          title: 'Food',
          dataIndex: 'food',
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
            <Form>
              <Item
                name="name"
                rules={[{
                  required: true, message: 'Please enter name',
                }]}
              >

                <Input />
              </Item>
            </Form>
          );
        }
        return <p>{text}</p>;
      },
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '20%',
      render: (_, record) => (
        <div className="icons">
          <EditOutlined
            className="edit_icon"
            onClick={() => {
              setEditingRow(record.key);
              form.setFieldsValue({
                name: record.name,
                phone: record.phone,
                address: record.address,
              });
            }}
          />
          {/* <DeleteOutlined className="delete_icon" onClick={() => console.log('Delete')} /> */}

        </div>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      phone: '0592072633',
      money: '50',
      clothes: '50',
      food: '50',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'John Brown',
      phone: '0592072633',
      money: '50',
      clothes: '50',
      food: '50',
      address: 'New York No. 1 Lake Park',
    },

  ];
  return (
    <section className="dahsboard_donors">
      <Title level={2} type="primary">Donors</Title>
      <Form form={form}>
        <Table className="customTitle" columns={columns} dataSource={data} />
      </Form>
    </section>
  );
};

export default Donors;
