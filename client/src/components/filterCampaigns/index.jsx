import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  message,
  Radio,
  Input,
  Switch,

} from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import './style.less';

const { Search } = Input;
const { Group, Button } = Radio;
function FilterCampaigns({ setCategory, setAvailable, setSearch }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const { token } = source;

    const fetchData = async () => {
      try {
        const { data: { data: { categories: categoriesFromDB } } } = await axios('/api/categories', {
          cancelToken: token,
        });
        const name = categoriesFromDB.map((item) => (item.name));
        setCategories(['List All', ...name]);
      } catch ({ response: { data: { message: errorMessage } } }) {
        message.info(errorMessage);
      }
    };
    fetchData();
    return () => source.cancel();
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
    <div>
      <div className="search-section">
        <Search placeholder="input search text" onChange={handleSearchChange} className="searchInput" />
      </div>
      <div className="fliter-section">

        <div>
          <Group onChange={handleCategoryChange} defaultValue="List All" buttonStyle="solid">
            {categories.map((item) => <Button key={item} value={item}>{item}</Button>)}
          </Group>
        </div>
        <div>
          Available campaigns:
          {' '}
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
            onChange={handleAailableChange}
          />
        </div>

      </div>
    </div>
  );
}
FilterCampaigns.propTypes = {
  setCategory: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  setAvailable: PropTypes.func.isRequired,
};

export default FilterCampaigns;
