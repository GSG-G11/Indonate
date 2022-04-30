import React, { useState } from 'react';
import {
  Radio,
  Input,
  Switch,

} from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import './style.less';

const { Search } = Input;
const { Group, Button } = Radio;
function FilterCampaigns() {
  const [categories, setCategories] = useState([]);
  setCategories();
  return (
    <div>
      <div className="search-section">
        <Search placeholder="input search text" className="searchInput" />
      </div>
      <div className="fliter-section">

        <div>
          <Group defaultValue="List All" buttonStyle="solid">
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
          />
        </div>

      </div>
    </div>
  );
}

export default FilterCampaigns;
