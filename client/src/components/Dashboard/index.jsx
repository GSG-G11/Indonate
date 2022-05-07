import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

const {
  Header, Sider,
} = Layout;

// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }

// const items = [
//   getItem('Overview', '1', <PieChartOutlined />),
//   getItem('Campaigns ', '2', <DesktopOutlined />),
//   getItem('Donors', '3', <UserOutlined />),
//   getItem('Family in need', '4', <TeamOutlined />),
//   getItem('Reports', '5', <MessageOutlined />),
// ];

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('item1');
  const onCollapse = (collapse) => {
    setCollapsed(collapse);
  };

  // eslint-disable-next-line consistent-return
  const componentsSwtich = (key) => {
    switch (key) {
      case '1':
        return (<h1>item1</h1>);
      case '2':
        return (<h1>item2</h1>);
      case '3':
        return (<h3>item3</h3>);
      case '4':
        return (<h3>item4</h3>);
      case '5':
        return (<h3>item5</h3>);
      default:
        break;
    }
  };
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">logo</div>
        <div style={{ display: 'flex' }}>
          <Menu
            selectedKeys={selectedMenuItem}
            theme="light"
            defaultSelectedKeys={['1']}
            mode="inline"
            onClick={(e) => setSelectedMenuItem(e.key)}
          >
            <Menu.Item key="1">
              <PieChartOutlined />
              <span>
                Overview
              </span>
            </Menu.Item>
            <Menu.Item key="2">
              <DesktopOutlined />
              <span>
                Campaigns
              </span>
              <Link to="/admin/campaigns" />
            </Menu.Item>
            <Menu.Item key="3">
              <UserOutlined />
              <span>
                Donors
              </span>
              <Link to="/admin/donors" />
            </Menu.Item>
            <Menu.Item key="4">
              <TeamOutlined />
              <span>
                Family in need
              </span>
              <Link to="/admin/families" />
            </Menu.Item>
            <Menu.Item key="5">
              <MessageOutlined />
              <span>
                Reports
              </span>
              <Link to="/admin/reports" />
            </Menu.Item>
          </Menu>
          <div style={{ margin: '50px' }}>{componentsSwtich(selectedMenuItem)}</div>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
      </Layout>
    </Layout>
  );
}

export default Dashboard;
