import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import {
  Nav,
  SignUp,
  Signin,
  Review,
  ReportsForm,
  OurMission,
} from './components';
import store from './redux/app/store';
import { getUserData } from './redux/feature/user/userSlice';
import Dashboard from './components/Dashboard';

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
              <OurMission />
              <Review />
              <ReportsForm />
            </>
          )}
        />
        <Route
          path="/campaigns"
          element={
            <h1>campaigns</h1>
            }
        />
        <Route
          path="/campaign/:id"
          element={
            <h1>campaign</h1>
            }
        />
        <Route
          path="/signUp"
          element={
            <SignUp />
            }
        />
        <Route
          path="/login"
          element={(
            <Signin />
          )}
        />
        <Route path="/admin" element={<Dashboard />}>
          <Route path="overview" element={<Review />} />
          <Route path="campaigns" element={<h1>campaigns</h1>} />
          <Route path="donors" element={<h1>donors</h1>} />
          <Route path="families" element={<h1>families</h1>} />
          <Route path="reports" element={<h1>reports</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
