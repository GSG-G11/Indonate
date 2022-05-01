import React from 'react';
import PropType from 'prop-types';
import CampaignCard from '../common/campaignCard';
import './style.css';

function Cards({ campaigns }) {
  return (
    <div className="all-campaines-cards">
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
              <div key={id} className="all-campaines-card">
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

        ) : <div className="noResult">No Result Found</div>}
    </div>
  );
}
Cards.propTypes = {
  campaigns: PropType.instanceOf(Array).isRequired,
};
export default Cards;
