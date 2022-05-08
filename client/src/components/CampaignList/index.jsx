import React from 'react';
import PropType from 'prop-types';
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import CampaignCard from '../common/CampaignCard';
import './style.css';

function Cards({ campaigns }) {
  return (
    <div className="all-campaigns-cards">
      {campaigns.length
        ? (
          <>
            {campaigns.map(({
              title,
              id,
              description,
              image_link: imgSrc,
              category: { icon_url: categoryIcon },
            }) => (
              <div key={id} className="all-campaigns-card">
                {' '}
                <CampaignCard
                  id={id}
                  title={title}
                  description={description}
                  imgSrc={imgSrc}
                  categoryIcon={categoryIcon}
                />
              </div>
            ))}
          </>

        ) : (
          <Result
            title="No Result Found!"
            icon={<SmileOutlined />}
          />
        )}
    </div>
  );
}
Cards.propTypes = {
  campaigns: PropType.instanceOf(Array).isRequired,
};
export default Cards;
