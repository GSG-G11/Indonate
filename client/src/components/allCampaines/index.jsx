import React from 'react';
import { Pagination } from 'antd';
import './style.css';

function AllCampaines() {
  const handleChange = (e) => {
    console.log(e);
  };
  return (
    <div>
      <Pagination
        defaultCurrent={2}
        total={8}
        defaultPageSize={1}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}

export default AllCampaines;
