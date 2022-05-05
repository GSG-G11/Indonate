import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Nav } from './components';
import { Landing, Campaigns, SingleCampaign, Login, SignUp } from './pages';
import store from './redux/app/store';
import { getUserData } from './redux/feature/user/userSlice';

function App() {
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaign/:id" element={<SingleCampaign />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
export default App;
