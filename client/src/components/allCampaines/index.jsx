import React, { useEffect, useState } from 'react';
import { Pagination, message } from 'antd';
import axios from 'axios';
import Header from '../HeaderAllCampaines/index';
import Cards from '../cards';
import Filter from '../filter';
import './style.css';

function AllCampaines() {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [available, setAvailable] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { campaines: campaignsfromDB } } = await axios(`/api/campaigns?search=${search}&category=${category}&available=${available}&page=${page} &limt=6`);
        setCampaigns(campaignsfromDB);
      } catch ({ response: { dara: { message: errorMessage } } }) {
        message.error({
          content: errorMessage,
        });
      }
    };
    fetchData();
  }, [page, available, category, search]);

  const handlepageChange = (e) => {
    setPage(e);
  };
  return (
    <div>
      <Header />
      <Cards campaigns={campaigns} />
      <Filter setCategory={setCategory} setAvailable={setAvailable} setSearch={setSearch} />
      <Pagination
        defaultCurrent={page}
        total={8}
        defaultPageSize={1}
        onChange={(e) => handlepageChange(e)}
      />
    </div>
  );
}

export default AllCampaines;
