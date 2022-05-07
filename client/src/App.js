import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Nav,
  SignUp,
  Signin,
  Review,
  ReportsForm,
  OurMission,
} from './components';
import Campaign from './pages';
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
              <OurMission />
              <Review />
              <ReportsForm />
            </>
          )}
        />
        <Route path="/campaigns" element={<> </>} />
        <Route path="/campaign/:id" element={<Campaign />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Signin />} />
      </Routes>
    </Router>
  );
}
export default App;
