import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  message,
  Radio,
  Input,
  Segmented,

} from 'antd';
import './style.less';

// import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const { Search } = Input;
function Compaigns() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { data: { categories: categoriesFromDB } } } = await axios('/api/categories');
        const categoriesNameArr = ['List All', 'Health2'];
        categoriesFromDB.map((item) => categoriesNameArr.push(item.name));
        setCategories(categoriesNameArr);
      } catch ({ response: { data: { message: errorMessage } } }) {
        message.info(errorMessage);
      }
    };
    fetchData();
  }, []);
  const onChange = (/* { target: { value } } */) => {

  };
  return (
    <div className="fliter-section">
      <div className="category">
        <Radio.Group onChange={onChange} defaultValue="List All" buttonStyle="solid">
          {categories.map((item) => <Radio.Button value={item}>{item}</Radio.Button>)}
        </Radio.Group>
      </div>
      {/* <div>
        Available campaigns:
        {' '}
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
        />
      </div> */}
      {/* <Radio.Group onChange={onChange} defaultValue="avilable" buttonStyle="solid">
        <Radio.Button value="avilable">
          Avilable
        </Radio.Button>
        <Radio.Button value="notavilable">Not avilable</Radio.Button>
    </Radio.Group> */}

      <Segmented options={['avilable', 'Not avilable']} />
      <Search placeholder="input search text" className="search" style={{ width: '300px' }} />
    </div>
  );
}

export default Compaigns;
