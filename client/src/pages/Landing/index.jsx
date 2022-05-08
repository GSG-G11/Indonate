import React from 'react';
import {
  HeaderLandingPage,
  OurMission,
  ReportsForm,
  Review,
} from '../../components';
import Footer from '../../components/common/Footer';

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
