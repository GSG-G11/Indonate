import React, { useEffect } from 'react';
// import {
//   BrowserRouter as Router, Routes, Route,
// } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Nav } from './components';
import {
  Landing, Campaign, Login, Signup, Campaigns,
} from './pages';
import store from './redux/app/store';
import 'antd/dist/antd.less';
import './App.css';
import { getUserData } from './redux/feature/user/userSlice';
import Dashboard from './components/Dashboard';

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
        <Route path="/admin" element={<Dashboard />}>
          <Route path="overview" element={<h1>overview</h1>} />
          <Route path="campaigns" element={<h1>campaigns</h1>} />
          <Route path="donors" element={<h1>donors</h1>} />
          <Route path="families" element={<h1>families</h1>} />
          <Route path="reports" element={<h1>reports</h1>} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
