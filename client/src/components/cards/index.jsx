// import axios from 'axios';
import React from 'react';
import PropType from 'prop-types';
import Card from '../common/campaignCard';
import './style.css';

function Cards({ campaigns }) {
  return (
    <div className="all-campaines-cards">
      {campaigns.map((item) => (
        <div key={item.id} className="all-campaines-card">
          {' '}
          <Card
            title={item.title}
            description={item.description}
            imgSrc={item.image_link}
            categoryIcon={item.icon_url}
          />
        </div>
      ))}
    </div>
  );
}
Cards.propTypes = {
  campaigns: PropType.instanceOf(Array).isRequired,
};
export default Cards;
