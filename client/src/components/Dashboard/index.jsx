import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, Navigate } from 'react-router-dom';

import {
  Layout, Menu, Image,
} from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  MessageOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Donors from '../Donors';
import normalLogo from '../../assets/images/indonate-logo.svg';
import collapsedLogo from '../../assets/images/collapsed-logo.jpg';

import './style.less';

const {
  Header, Sider, Content,
} = Layout;
const { Item } = Menu;

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const [logo, setLogo] = useState(normalLogo);

  const onCollapse = (collapse) => {
    setCollapsed(collapse);
    if (logo === normalLogo) {
      setLogo(collapsedLogo);
    } else {
      setLogo(normalLogo);
    }
  };
  return user.isUserAuthorized && (user.userData?.isAdmin ? (
    <Layout
      className="dashboard-layout"
    >
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Image
          width={logo === normalLogo ? 115 : 26}
          src={logo}
          preview={false}
        />
        <div className="dashboard">
          <Menu
            theme="light"
            defaultSelectedKeys={['1']}
            mode="inline"
          >
            <Item>
              <PieChartOutlined />
              <span>Overview</span>
              <Link to="/admin/overview" />
            </Item>
            <Item>
              <DesktopOutlined />
              <span>Campaigns</span>
              <Link to="/admin/campaigns" />
            </Item>
            <Item>
              <UserOutlined />
              <span>Donors</span>
              <Link to="/admin/donors" element={Donors} />
            </Item>
            <Item>
              <TeamOutlined />
              <span>Family in need</span>
              <Link to="/admin/families" />
            </Item>
            <Item>
              <MessageOutlined />
              <span>Reports</span>
              <Link to="/admin/reports" />
            </Item>
          </Menu>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
        />
        <Content className="dashboard-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  ) : <Navigate to="/" />);
};

export default Dashboard;
