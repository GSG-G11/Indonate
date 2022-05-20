import React from 'react';
import PropType from 'prop-types';
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { CampaignCard } from '../../common';
import './style.css';

const CampaginList = ({ campaigns, loading }) => (
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
            is_available: isAvailable,
          }) => (
            <div key={id} className="all-campaigns-card">
              {' '}
              <CampaignCard
                id={id}
                title={title}
                description={description}
                imgSrc={imgSrc}
                categoryIcon={categoryIcon}
                loading={loading}
                isAvailable={isAvailable}
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
CampaginList.propTypes = {
  campaigns: PropType.instanceOf(Array).isRequired,
  loading: PropType.bool.isRequired,
};
export default CampaginList;
