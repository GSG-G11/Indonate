/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Badge, Card, Divider, List, message, Table, Tooltip,
} from 'antd';
import { Link } from 'react-router-dom';
import './style.css';

const {
  Item,
  Item: { Meta },
} = List;
function TopCampaignsTable() {
  const [topCampaigns, setTopCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getTopCampaigns = async () => {
      try {
        const {
          data: {
            data: { campaigns },
          },
        } = await axios.get('/api/admin/campaigns', {
          params: {
            limit: 3,
            order: 'top',
          },
        });
        setTopCampaigns(campaigns);
        setIsLoading(false);
        setErrorMessage('');
      } catch ({
        response: {
          data: { message: error },
        },
      }) {
        setErrorMessage(error);
      }
    };
    getTopCampaigns();
    return () => {};
  }, []);

  return !errorMessage ? (
    <Card
      loading={isLoading}
      title={<center>Top Campaigns</center>}
      id="scrollableDiv"
      style={{
        maxWidth: 300,
      }}
    >
      <List
        dataSource={topCampaigns}
        renderItem={(item) => (
          <Item key={item.id} id={item.id}>
            <Meta
              title={(
                <Link
                  to={`/campaign/${item.id}`}
                  className="campaign-table-campaign-title"
                >
                  {item.title.split(' ').slice(0, 4).join(' ')}
                </Link>
              )}
              description={(
                <p>
                  This campaign was donated by
                  {' '}
                  <span className="donation-data">
                    {item.current_money}
                    $
                  </span>
                  ,
                  {' '}
                  <span className="donation-data">
                    {item.current_food}
                    {' '}
                    meal
                  </span>
                  {' '}
                  of food, and
                  {' '}
                  <span className="donation-data">
                    {item.current_clothes}
                    {' '}
                    Piece
                  </span>
                  {' '}
                  of clothes
                </p>
              )}
            />
            {item.is_available ? (
              <> </>
            ) : (
              <>
                {' '}
                <Badge count="Closed" />
              </>
            )}
          </Item>
        )}
      />
    </Card>
  ) : (
    message.error(errorMessage)
  );
}

export default TopCampaignsTable;
