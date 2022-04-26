import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './app/store';
import { getUserData } from './features/User';
import Nav from './Components';

function App() {
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <h1>Home</h1>
            }
          />
          <Route
            path="/about-us"
            element={
              <h1>about-us</h1>
            }
          />
          <Route
            path="/campaigns"
            element={
              <h1>campaigns</h1>
            }
          />
          <Route
            path="/contact-us"
            element={
              <h1>contact-us</h1>
            }
          />
          <Route
            path="/signUp"
            element={
              <h1>signUp</h1>
            }
          />
          <Route
            path="/login"
            element={
              <h1>login</h1>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
