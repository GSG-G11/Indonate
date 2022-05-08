import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Nav } from './components';
import {
  Landing, Campaigns, Campaign, Login, Signup,
} from './pages';
import store from './redux/app/store';
import 'antd/dist/antd.less';
import './App.css';
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
        <Route path="/campaign/:id" element={<Campaign />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
export default App;
