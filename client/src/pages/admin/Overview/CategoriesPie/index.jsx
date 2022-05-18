import React, { useState, useEffect }
  from 'react';
import { Pie } from '@ant-design/plots';
import { message } from 'antd';
import axios from 'axios';

const CategoriesPie = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchCategories = async () => {
      try {
        const { data: { data: { campaigns: dbCampaigns } } } = await axios.get('/api/admin/campaigns', {
          cancelToken: source.token,
        });
        const allCategories = dbCampaigns.map((campaign) => campaign.category);
        setCategories(allCategories);
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

  const countCategory = (cats, name) => {
    let count = 0;
    cats.forEach((ele) => {
      if (ele.name === name) count += 1;
      return '';
    });
    return { type: name, value: count };
  };

  const removeDuplicateObjects = (array) => [...new Set(array.map((s) => JSON.stringify(s)))]
    .map((s) => JSON.parse(s));

  const values = categories.map(
    (item) => countCategory(categories, item.name),
  );

  const data = removeDuplicateObjects(values);

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
        },
        content: `total ${data.length}`,
      },
    },
  };
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Pie {...config} />
  );
};

export default CategoriesPie;
