import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  message,
  Radio,
  Input,
  Segmented,

} from 'antd';
import './style.less';

const { Search } = Input;
const { Group } = Radio;
function Campaigns({ setCategory, setAvailable, setSearch }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  const handleCategoryChange = ({ target: { value } }) => {
    setCategory(value);
  };
  const handleSearchChange = ({ target: { value } }) => {
    setSearch(value);
  };
  const handleAailableChange = (e) => {
    setAvailable(e);
  };
  return (
    <div className="fliter-section">
      <div>
        <Group onChange={handleCategoryChange} defaultValue="List All" buttonStyle="solid">
          {categories.map((item) => <Radio.Button value={item}>{item}</Radio.Button>)}
        </Group>
      </div>

      <Segmented options={['Avilable', 'Not Avilable']} onChange={handleAailableChange} />
      <Search placeholder="input search text" onChange={handleSearchChange} style={{ width: '300px' }} />
    </div>
  );
}
Campaigns.propTypes = {
  setCategory: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  setAvailable: PropTypes.func.isRequired,
};

export default Campaigns;
