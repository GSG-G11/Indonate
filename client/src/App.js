import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Nav, SignUp, Signin, Review, OurMission,
} from './components';
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
          element={
            <Signin />
            }
        />
      </Routes>
    </Router>
  );
}
export default App;
