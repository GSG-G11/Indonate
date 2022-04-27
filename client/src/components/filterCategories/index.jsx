import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  message, Radio,
} from 'antd';
import './style.less';

function Compaigns() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategories([]);
        const { data: { data: { categories: categoriesFromDB } } } = await axios('/api/categories');
        const categoriesNameArr = ['List All'];
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
    <Radio.Group onChange={onChange} defaultValue="List All" buttonStyle="solid">
      {categories.map((item) => <Radio.Button value={item}>{item}</Radio.Button>)}
    </Radio.Group>
  );
}

export default Compaigns;
