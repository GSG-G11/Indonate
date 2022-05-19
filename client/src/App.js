import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Nav, CampaignsDonorsChart, Statistic,
} from './components';
import {
  Landing,
  Campaign,
  Login,
  Signup,
  Campaigns,
  CampaignsTable,
  ReportsTable,
  DonorsTable,
  ServerError,
  NotFoundError,
  FamilyTable,
} from './pages';
import store from './redux/app/store';
import 'antd/dist/antd.less';
import './App.css';
import { getUserData } from './redux/feature/user/userSlice';
import Dashboard from './components/Dashboard';
import Overview from './pages/admin/Overview';

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
          <Route path="overview" element={<Overview />} />
          <Route index element={<CampaignsDonorsChart />} />
          <Route index element={<Statistic />} />
          <Route path="campaigns" element={<CampaignsTable />} />
          <Route path="donors" element={<DonorsTable />} />
          <Route path="families" element={<FamilyTable />} />
          <Route path="reports" element={<ReportsTable />} />
          <Route path="*" element={<NotFoundError />} />
        </Route>
        <Route path="/servererror" element={<ServerError />} />
        <Route path="*" element={<NotFoundError />} />
      </Routes>
    </>
  );
}
export default App;
