import React from 'react';
import { Table } from 'antd';
import columns from './tableColumns';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    money: '32 $',
    phone: 97059205,
    clothes: 1000,
    food: 500,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const Donors = async () => (
  <Table columns={columns} dataSource={data} />);

export default Donors;
