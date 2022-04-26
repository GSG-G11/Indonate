import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import './Nav.css';

import { Layout, Menu, Button } from 'antd';

const { Header } = Layout;
const items = [
  { label: <NavLink to="/" style={{ color: 'black' }}> Home </NavLink> },
  { label: <NavLink to="/about-us" style={{ color: 'black' }}> About Us </NavLink> },
  { label: <NavLink to="/campaigns" style={{ color: 'black' }}> Campaigns</NavLink> },
  { label: <NavLink to="/contact-us" style={{ color: 'black' }}> Contact Us</NavLink> },
  { label: (<NavLink to="/signUp"><Button className="btn" type="primary">Sign Up</Button></NavLink>) },
  { label: (<NavLink to="/login"><Button className="btn" type="primary">Login</Button></NavLink>) },
];
const items2 = [
  { label: <NavLink to="/" style={{ color: 'black' }}> Home </NavLink> },
  { label: <NavLink to="/about-us" style={{ color: 'black' }}> About Us </NavLink> },
  { label: <NavLink to="/campaigns" style={{ color: 'black' }}> Campaigns</NavLink> },
  { label: <NavLink to="/contact-us" style={{ color: 'black' }}> Contact Us</NavLink> },
  { label: (<NavLink to="/logout"><Button className="btn" type="primary">Logout</Button></NavLink>) },
  { label: (<NavLink to="/campaign"><Button className="btn" type="primary">Donate Now</Button></NavLink>) },
];
function Nav() {
  const user = useSelector((state) => state.user);
  return (
    <Layout className="layout">
      <Header>
        <h2 className="logo">InDonate</h2>
        <div style={{ display: 'flex' }}>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={1}
            items={user.isUserAuthorized ? items2 : items}
          />
        </div>
      </Header>
    </Layout>
  );
}

export default Nav;
