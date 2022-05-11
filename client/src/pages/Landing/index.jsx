import React from 'react';
import {
  Footer,
  HeaderLandingPage,
  OurMission,
  ReportsForm,
  Review,
  LatestCampaigns,
} from '../../components';

const Landing = () => (
  <>
    <HeaderLandingPage />
    <OurMission />
    <LatestCampaigns />
    <Review />
    <ReportsForm />
    <Footer />
  </>
);

export default Landing;
