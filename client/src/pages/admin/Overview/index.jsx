import React from 'react';
import {
  TopCampaignsTable,
  TopDonorsTable,
  Statistic,
  CampaginsDonorsChart,
  CategoriesPie,
} from '../../../components';
import './style.css';

const Overview = () => (
  <div>
    <div className="conatiner1-overview">
      <CampaginsDonorsChart />
      <Statistic />
    </div>
    <div className="conatiner2-overview">
      <CategoriesPie />
      <TopCampaignsTable />
      <TopDonorsTable />

    </div>
  </div>
);

export default Overview;
