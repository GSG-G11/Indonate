import React, { useEffect, useState } from 'react';
import { Pagination, message } from 'antd';
import axios from 'axios';
import FilterCampaigns from '../FilterCampaigns';
import Cards from '../CampaignList';
import './style.css';

const DisplayCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [available, setAvailable] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const { token } = source;
    const fetchData = async () => {
      try {
        const { data: { data: { campaigns: campaignsFromDB, count } } } = await axios(`/api/campaigns?search=${search}&category=${category}&available=${available}&page=${page}&limit=6`, {
          cancelToken: token,
        });
        setTotalCount(count);
        setCampaigns(campaignsFromDB);
        setLoading(false);
      } catch ({ response: { data: { message: errorMessage } } }) {
        message.error(errorMessage);
      }
    };
    fetchData();
    return () => source.cancel();
  }, [page, available, category, search]);

  const handlePageChange = (e) => {
    setPage(e);
  };

  return (
    <div className="all-campaigns-container">
      <FilterCampaigns
        setCategory={setCategory}
        setAvailable={setAvailable}
        setSearch={setSearch}
      />
      <Cards campaigns={campaigns} loading={loading} />

      { totalCount > 6 ? (

        <Pagination
          className="pagination"
          defaultCurrent={page}
          total={Math.ceil(totalCount / 6)}
          defaultPageSize={1}
          onChange={(e) => handlePageChange(e)}
        />
      ) : null }

    </div>
  );
};

export default DisplayCampaigns;
