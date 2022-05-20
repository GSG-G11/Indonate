import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Nav,
  Dashboard,
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
  Overview,
} from './pages';
import store from './redux/app/store';
import 'antd/dist/antd.less';
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
        <Route path="/admin" element={<Dashboard />}>
          <Route index element={<Overview />} />
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
