import React, { useState, useEffect }
  from 'react';
import { Pie } from '@ant-design/plots';
import { message } from 'antd';
import axios from 'axios';
import './style.css';

const CategoriesPie = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCategories = async () => {
      try {
        const { data: { data: { categories } } } = await axios.get('/api/categories', {
          cancelToken: source.token,
        });
        const countCategories = categories.map(
          ({ name, campaigns }) => ({ type: name, value: campaigns.length }),
        );
        setData(countCategories);
      } catch ({
        response: {
          data: { message: errorMessage },
        },
      }) {
        message.error(errorMessage);
      }
    };
    fetchCategories();
    return () => { source.cancel(); };
  }, []);

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          fontSize: '14px',
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: `total ${data.length}`,
      },
    },
  };
  return (
    <div className="pie-chart-container">
      <Pie {...config} />
    </div>
  );
};

export default CategoriesPie;
