import React from 'react';
import {
  TopCampaignsTable,
  TopDonorsTable,
  Statistic,
  CampaginsDonorsChart,
  CategoriesPie,
} from '../../../components';

const Overview = () => (
  <div>
    <div style={{
      display: 'flex', height: '45vh', paddingTop: '10px', gap: '2vw',
    }}
    >
      <CampaginsDonorsChart />
      <Statistic />
    </div>
    <div style={{ marginRight: '2vw' }}>
      <div style={{
        display: 'flex',
        height: '40vh',

      }}
      >
        <CategoriesPie />
        <TopCampaignsTable />
        <TopDonorsTable />

      </div>
    </div>
  </div>
);

export default Overview;
