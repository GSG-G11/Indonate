import axios from 'axios';
import React, { useEffect } from 'react';
import { message } from 'antd';

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
      h1
    </div>
  );
}

export default Compaigns;
