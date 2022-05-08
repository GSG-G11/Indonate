import React from 'react';
import {
  Footer,
  HeaderLandingPage,
  OurMission,
  ReportsForm,
  Review,
} from '../../components';

function Landing() {
  return (
    <>
      <HeaderLandingPage />
      <OurMission />
      <Review />
      <ReportsForm />
      <Footer />
    </>
  );
}

export default Landing;
