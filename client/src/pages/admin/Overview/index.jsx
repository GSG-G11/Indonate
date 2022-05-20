import React from 'react';
import {
  TopCampaignsTable,
  TopDonorsTable,
  Statistic,
  CategoriesPie,
  CampaignsDonorsChart,
} from '../../../components';

import './style.css';

const Overview = () => (
  <div className="overview-wrapper">
    <div className="container1-overview">
      <Statistic />
      <CategoriesPie />
      <TopCampaignsTable />
    </div>
    <div className="container2-overview">
      <CampaignsDonorsChart />
      <TopDonorsTable />
    </div>
  </div>
);

export default Overview;
