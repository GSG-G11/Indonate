import React, {
  useState,
  useEffect,
} from 'react'; import {
  Card,
  //   Col,
  Row,
  Typography, Comment,
} from 'antd';
import axios from 'axios';
import './style.less';

const { Title } = Typography;
const ReportsTable = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  //   const [reports, setReports] = useState([]);

  //   const [reportsCount, setReportsCount] = useState([]);

  const source = axios.CancelToken.source();
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data: { data: { reports: dbReports, count } } } = await axios.get('/api/admin/reports/?page=1');
        setReports(dbReports);
        setLoading(false);
        // setReportsCount(count);
        console.log(dbReports, count);
      } catch ({
        response: {
        //   status,
          data: { message: errorMessage },
        },
      }) {
        console.log('Error ');
      }
    };
    fetchReports();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <section>
      <Title level={2} className="title">Reports</Title>
      <div className="comments_container">
        <Row className="comments_row">
          {reports.map(({ id, name, message }) => (
            <Card
              loading={loading}
              key={id}
              className="comment_card"
              bordered={false}
            >
              <Comment
                author={<span>{name}</span>}
                content={(
                  <p>
                    {message}
                  </p>
                    )}
              />
            </Card>
          ))}

        </Row>
      </div>
    </section>

  );
};

export default ReportsTable;
