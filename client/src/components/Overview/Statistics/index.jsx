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
      const { data: { data, dataToAdmin } } = await axios.get('/api/statistics', { cancelToken: token });
      setStatistics({ ...dataToAdmin, ...data });
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
