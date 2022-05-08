import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Nav,
  SignUp,
  Signin,
  Review,
  LatestCampaigns,
  HeaderLandingPage,
  ReportsForm,
  OurMission,
} from './components';
import Footer from './components/common/footer';
import { Campaigns, Campaign } from './pages';
import store from './redux/app/store';
import { getUserData } from './redux/feature/user/userSlice';

function App() {
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);
  return (
    <Router>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <HeaderLandingPage />
              <LatestCampaigns />
              <OurMission />
              <Review />
              <ReportsForm />
              <Footer />
            </>
          )}
        />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaign/:id" element={<Campaign />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Signin />} />
      </Routes>
    </Router>
  );
}
export default App;
