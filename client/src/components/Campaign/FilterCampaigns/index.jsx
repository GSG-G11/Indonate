import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  message,
  Radio,
  Input,
  Switch,
  Skeleton,

} from 'antd';
import './style.less';

const { Search } = Input;
const { Group, Button } = Radio;

const FilterCampaigns = ({ setCategory, setAvailable, setSearch }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const { token } = source;

    const fetchData = async () => {
      try {
        const { data: { data: { categories: categoriesFromDB } } } = await axios('/api/categories', {
          cancelToken: token,
        });
        const name = categoriesFromDB?.map((item) => (item.name));
        setCategories(['List All', ...name]);
        setLoading(false);
      } catch ({ response: { data: { message: errorMessage } } }) {
        message.error(errorMessage);
      }
    };
    fetchData();
    return () => source.cancel();
  }, []);
  const handleCategoryChange = ({ target: { value } }) => {
    if (value === 'List All') {
      setCategory('');
    } else {
      setCategory(value);
    }
  };
  const handleSearchChange = ({ target: { value } }) => {
    setSearch(value);
  };
  const handleAvailableChange = (e) => {
    setAvailable(e);
  };
  return (
    <div className="categories">
      <div className="search-section">
        <Search placeholder="input search text" size="large" onChange={handleSearchChange} className="search-input" />
      </div>
      <div className="filter-section">
        <div className="filter-radio-container">
          <Group
            onChange={handleCategoryChange}
            defaultValue="List All"
            buttonStyle="solid"
          >
            {categories.map((item) => (
              loading
                ? (
                  <Skeleton.Button loading Button key={item}>
                    <Button key={item} value={item}>{item}</Button>
                  </Skeleton.Button>
                )
                : <Button key={item} value={item}>{item}</Button>

            ))}
          </Group>
        </div>
        <div>
          <b>Available campaigns: </b>
          <Switch
            defaultChecked
            onChange={handleAvailableChange}
          />
        </div>
      </div>
    </div>
  );
};
FilterCampaigns.propTypes = {
  setCategory: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  setAvailable: PropTypes.func.isRequired,
};

export default FilterCampaigns;
