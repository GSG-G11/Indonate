import axios from 'axios';
import React, { useEffect } from 'react';
import { message, Segmented } from 'antd';

function Compaigns() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { data: { categories } } } = await axios('/api/categories');
        console.log(categories);
      } catch ({ response: { data: { message: errorMessage } } }) {
        message.info(errorMessage);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Segmented block options={[123, 456, 'longtext-longtext-longtext-longtext']} />
    </div>
  );
}

export default Compaigns;
