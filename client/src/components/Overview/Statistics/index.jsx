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
      /* const { campaigns, ...rest } = data;
      rest['Available Campaigns'] = 0;
      rest['Not Available Campaigns'] = 0;
      campaigns.forEach(({ is_available: isAvailable, count }) => {
        if (isAvailable) {
          rest['Available Campaigns'] = count;
        } else {
          rest['Not Available Campaigns'] = count;
        }
      }); */
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
