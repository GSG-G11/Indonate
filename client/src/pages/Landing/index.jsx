import React from 'react';
import {
  Footer,
  HeaderLandingPage,
  OurMission,
  ReportsForm,
  Review,
  LatestCampaigns,
} from '../../components';

function Landing() {
  return (
    <>
      <HeaderLandingPage />
      <OurMission />
      <LatestCampaigns />
      <Review />
      <ReportsForm />
      <Footer />
    </>
  );
}

export default Landing;
