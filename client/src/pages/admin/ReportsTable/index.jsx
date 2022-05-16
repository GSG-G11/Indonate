import React, {
  useState,
  useEffect,
} from 'react'; import {
  Card,
  Row,
  Typography,
  Comment,
  Pagination,
  message,
  Popconfirm,
} from 'antd';

import {
  DeleteOutlined,
} from '@ant-design/icons';

import axios from 'axios';
import './style.less';

const { Title } = Typography;
const ReportsTable = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [reportsCount, setReportsCount] = useState([]);

  const source = axios.CancelToken.source();
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const {
          data: {
            data: { reports: dbReports, count },
          },
        } = await axios.get(`/api/admin/reports/?page=${page}`);
        const allReports = dbReports.map((obj) => {
          const name = obj.name.charAt(0).toUpperCase() + obj.name.slice(1); // capitlize name
          return {
            key: obj.id, ...obj, name,
          };
        });
        setReports(allReports);
        setReportsCount(count);
        setLoading(false);
      } catch ({
        response: {
          data: { message: errorMessage },
        },
      }) {
        message.error(errorMessage);
      }
    };
    fetchReports();
    return () => {
      source.cancel();
    };
  }, [page]);

  const deleteReport = async (reportId) => {
    try {
      const {
        data: { message: successMsg },
      } = await axios.delete(`/api/admin/report/${reportId}`);

      const filteredReports = reports.filter(({ id }) => id !== reportId);
      setReports(filteredReports);
      message.success(successMsg);
    } catch ({
      response: {
        data: { message: errorMessage },
      },
    }) {
      message.error(errorMessage);
    }
  };
  return (
    <section>
      <Title level={2} className="title">Reports</Title>
      <div className="comments_container">
        <Row className="comments_row">
          {reports.map(({
            id,
            name,
            message: campaignsMsg,
          }) => (
            <Card
              loading={loading}
              key={id}
              className="comment_card"
              bordered={false}
            >
              <Comment
                author={<span>{name}</span>}
                content={(<p>{campaignsMsg}</p>)}
              />
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => deleteReport(id)}
              >
                <DeleteOutlined className="delete_icon" />
              </Popconfirm>
            </Card>
          ))}
          <Pagination
            defaultCurrent={1}
            total={reportsCount}
            onChange={(value) => setPage(value)}
          />
        </Row>
      </div>
    </section>

  );
};

export default ReportsTable;
