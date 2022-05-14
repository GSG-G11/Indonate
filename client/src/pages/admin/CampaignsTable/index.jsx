/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Button, Collapse, Image, Skeleton, Table, Popconfirm,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';

const { Panel } = Collapse;
const { Column } = Table;

function CampaignsTable() {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getCampaigns = async () => {
      try {
        const {
          data: {
            data: { campaigns: campaignsData },
          },
        } = await axios.get('/api/admin/campaigns', {
          cancelToken: source.token,
        });
        setCampaigns(campaignsData);
        setIsLoading(false);
      } catch ({
        response: {
          data: { message: errorMessage },
        },
      }) {
        setIsError(true);
      }
    };
    getCampaigns();
    return () => {
      source.cancel();
    };
  }, []);

  return !isError ? (
    <div className="campaigns-table-container">
      {!isLoading ? (
        <Table dataSource={campaigns}>
          <Column
            title="Image"
            dataIndex="image_link"
            key="image_link"
            render={(link) => (
              <Image
                id="campaign-table-campaign-image"
                src={link}
                width={100}
                height={50}
              />
            )}
          />
          <Column
            title="Title"
            dataIndex="title"
            key="title"
            render={(title, record) => (
              <Link
                to={`/campaign/${record.id}`}
                className="campaign-table-campaign-title"
              >
                {title.split(' ').slice(0, 5).join(' ')}
              </Link>
            )}
          />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
            render={(description) => (
              <Collapse style={{ width: 300 }}>
                <Panel
                  style={{ width: 300 }}
                  header={`${description.split(' ').slice(0, 6).join(' ')} ...`}
                >
                  <p>{description}</p>
                </Panel>
              </Collapse>
            )}
          />
          <Column
            title="Target Money"
            dataIndex="money_target"
            key="money_target"
          />
          <Column
            title="Target Food"
            dataIndex="food_target"
            key="food_target"
          />
          <Column
            title="Target Clothes"
            dataIndex="clothes_target"
            key="clothes_target"
          />
          <Column
            title="Actions"
            dataIndex=""
            key="x"
            render={(_, record) => (
              <>
                <Popconfirm
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined style={{ fontSize: '2rem' }} />
                </Popconfirm>
                <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
                  <DeleteOutlined style={{ fontSize: '2rem' }} />
                </Popconfirm>
              </>
            )}
          />
          <Column title="id" dataIndex="id" key="id" />
        </Table>
      ) : (
        <Skeleton active />
      )}
    </div>
  ) : (
    <div>{isError}</div>
  );
}

export default CampaignsTable;
