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
      const { Campaigns, ...rest } = data;
      rest['Available Campaigns'] = 0;
      rest['Not Available Campaigns'] = 0;
      Campaigns.forEach(({ is_available: isAvailable, count }) => {
        if (isAvailable) {
          rest['Available Campaigns'] = count;
        } else {
          rest['Not Available Campaigns'] = count;
        }
      });
      setStatistics(rest);
    };
    fetchData();

    return () => source.cancel();
  }, []);
  return (
    <div className="overview-container">
      <div>
        <Card statistics={statistics} />
      </div>
      {/* we will remove this div */}
      <div style={{
        background: 'white', width: '312px', height: '314px', marginLeft: '1%', marginRight: '1%',
      }}
      >
        table
      </div>
    </div>
  );
};
export default Statistic;
