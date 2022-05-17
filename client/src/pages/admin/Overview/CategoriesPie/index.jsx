import React, { useState, useEffect }
  from 'react';
import { Pie } from '@ant-design/plots';
import { message } from 'antd';
import axios from 'axios';

const CategoriesPie = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const {
          data: { data: { categories: dbCategories } },
        } = await axios.get('/api/categories');
        setCategories(dbCategories);
      } catch ({
        response: {
          data: { message: errorMessage },
        },
      }) {
        message.error(errorMessage);
      }
    };
    fetchCategories();
  }, []);

  const countCategory = (cats, name) => {
    let count = 0;
    cats.forEach((ele) => {
      if (ele.name === name) count += 1;
      return '';
    });
    return { type: name, value: count };
  };

  const data = categories.map((ele) => countCategory(categories, ele.name));

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
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          // fontSize: 14,
        },
        content: `total ${categories.length}`,
      },
    },
  };
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Pie {...config} />
  );
};

export default CategoriesPie;
