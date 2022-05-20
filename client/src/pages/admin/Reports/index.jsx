import React, {
  useState,
  useEffect,
} from 'react'; import {
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

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchReports = async () => {
      try {
        const {
          data: {
            data: { reports: dbReports, count },
          },
        } = await axios.get(`/api/admin/reports/?page=${page}`, {
          cancelToken: source.token,
        });
        setReports(dbReports);
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
    return () => { source.cancel(); };
  }, [page]);

  const deleteReport = async (reportId) => {
    try {
      const { data: { message: successMsg } } = await axios.delete(`/api/admin/report/${reportId}`);
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
    <>
      <div className="header-table">
        <Title className="header-table-title" level={2}>
          Reports
        </Title>
      </div>
      {' '}
      <div className="comments_container">
        <Row className="comments_row">
          {reports.map(({
            id,
            name,
            email,
            message: campaignsMsg,
          }) => (
            <Comment
              loading={loading}
              author={(
                <>
                  <span className="author_name">{name}</span>
                  <span className="author_email">{email}</span>
                </>
              )}
              content={(
                <>
                  <p>{campaignsMsg}</p>
                  <Popconfirm
                    title="Are you sure？"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => deleteReport(id)}
                  >
                    <DeleteOutlined className="delete_icon" />
                  </Popconfirm>
                </>
              )}
            />
          ))}

        </Row>
      </div>
      {reportsCount > 4 && (
      <Pagination
        defaultCurrent={page}
        defaultPageSize={1}
        total={Math.ceil(reportsCount / 4)}
        onChange={(value) => setPage(value)}
      />
      )}
    </>

  );
};

export default ReportsTable;
