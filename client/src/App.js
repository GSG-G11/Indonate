import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Nav,
  Review,
  LatestCampaigns,
  HeaderLandingPage,
  ReportsForm,
  OurMission,
} from './components';
import {
  Signup, Login, Campaigns, Campaign,
} from './pages';
import Footer from './components/common/footer';
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
        <Route path="/signUp" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
export default App;
