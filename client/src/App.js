import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Result, Typography } from 'antd';
import { Nav, Family, CampaginsDonorsChart, Statistic } from './components';
import {
  Landing,
  Campaign,
  Login,
  Signup,
  Campaigns,
  CampaignsTable,
  ReportsTable,
  DonorsTable,
  NotFoundError,
} from './pages';
import Dashboard from './components/Dashboard';
import store from './redux/app/store';
import 'antd/dist/antd.less';
import './App.css';
import { getUserData } from './redux/feature/user/userSlice';
import Overview from './pages/admin/Overview';

const { Title } = Typography;
function App() {
  const isError = useSelector((state) => state.error.value);
  useEffect(() => {
    store.dispatch(getUserData());
  }, []);
  return !isError ? (
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
          <Route index element={<CampaginsDonorsChart />} />
          <Route index element={<Statistic />} />
          <Route path="campaigns" element={<CampaignsTable />} />
          <Route path="donors" element={<DonorsTable />} />
          <Route path="families" element={<Family />} />
          <Route path="reports" element={<ReportsTable />} />
          <Route path="*" element={<NotFoundError />} />
        </Route>
        <Route path="*" element={<NotFoundError />} />
      </Routes>
    </>
  ) : (
    <Result
      status="500"
      title="500"
      subTitle={<Title>Sorry, something went wrong. Try Again Later</Title>}
    />
  );
}
export default App;
