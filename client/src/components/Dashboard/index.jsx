import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, Navigate } from 'react-router-dom';
import {
  Layout, Menu,
} from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  MessageOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './style.css';

const {
  Header, Sider, Content,
} = Layout;
const { Item } = Menu;

function Dashboard() {
  const user = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapse) => {
    setCollapsed(collapse);
  };
  return user.isUserAuthorized && (user.userData?.isAdmin ? (
    <Layout
      className="dashboard-layout"
    >
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">InDonate</div>
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
              <Link to="/admin/donors" />
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
}

export default Dashboard;
