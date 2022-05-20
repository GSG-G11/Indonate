import React, {
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import Card from './Card';

const Statistic = () => {
  const [statistics, setStatistics] = useState({});
  useEffect(() => {
    const source = axios.CancelToken.source();
    const { token } = source;
    const fetchData = async () => {
      const { data: { data } } = await axios.get('/api/statistics', { cancelToken: token });
      setStatistics(data);
    };
    fetchData();

    return () => source.cancel();
  }, []);
  return (
    <div className="overview-container">
      <Card statistics={statistics} />
    </div>
  );
};
export default Statistic;
