import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Nav, SignUp, Signin, LatestCampaigns,
} from './components';
import store from './redux/app/store';
import { getUserData } from './redux/feature/user/userSlice';

function App() {
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);

  const campaigns = [
    {
      id: 0,
      title: 'Give African children a Good Education',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Donec vitae bibendum dolor, at finibus ',
      imgSrc: 'https://i.ibb.co/41n9Vm0/80109080-733561537139611-6782292533398470656-n.jpg',
      categoryIcon: 'https://i.ibb.co/jR5Sb6N/image-3.png',
    },
    {
      id: 1,
      title: 'Give African children a Good Education',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Donec vitae bibendum dolor, at finibus',
      imgSrc: 'https://i.ibb.co/Srxxn5f/88310451-791815414647556-1956604263299809280-n.jpg',
      categoryIcon: 'https://i.ibb.co/jR5Sb6N/image-3.png',
    },
    {
      id: 2,
      title: 'Give African children a Good Education',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Donec vitae bibendum dolor, at finibus ',
      imgSrc: 'https://i.ibb.co/N638K9K/132891950-1005721596590269-2279651605150191597-n.jpg',
      categoryIcon: 'https://i.ibb.co/jR5Sb6N/image-3.png',
    },
  ];

  return (
    <Router>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <LatestCampaigns campaigns={campaigns} />
          }
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
