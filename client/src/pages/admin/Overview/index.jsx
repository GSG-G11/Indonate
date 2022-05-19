import React from 'react';
import {
  TopCampaignsTable,
  TopDonorsTable,
  Statistic,
  CategoriesPie,
  CampaginsDonorsChart,
} from '../../../components';

const Overview = () => (
  <div>
    <div style={{
      display: 'flex ', width: '100%', height: '52vh',
    }}
    >
      <div style={{ width: '52vw' }}>
        <Statistic />
        <CampaginsDonorsChart />
      </div>
      <div>
        <TopCampaignsTable />
      </div>
    </div>
    <div style={{ display: 'flex' }}>
      <CategoriesPie />
      <TopDonorsTable />

    </div>
  </div>
);

export default Overview;
