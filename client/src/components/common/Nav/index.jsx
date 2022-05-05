import React from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import './style.css';

const { Header } = Layout;
const commonList = [
  { label: <NavLink to="/"> Home </NavLink> },
  { label: <NavLink to="/about-us"> About Us </NavLink> },
  { label: <NavLink to="/campaigns"> Campaigns</NavLink> },
  { label: <NavLink to="/contact-us"> Contact Us</NavLink> },
];
const userItem = [
  { label: <NavLink to="/signup"><Button className="btn" type="primary">Sign Up</Button></NavLink> },
  { label: <NavLink to="/login"><Button className="btn" type="primary">Login</Button></NavLink> },
];
const guestItem = [
  { label: <NavLink to="/logout"><Button className="btn" type="primary">Logout</Button></NavLink> },
  { label: <NavLink to="/campaign"><Button className="btn" type="primary">Donate Now</Button></NavLink> },
];
function Nav() {
  const user = useSelector((state) => state.user);
  return (
    <div className="nav-container">
      <Layout>
        <Header>
          <div className="logo">InDonate</div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={1}
            items={user.isUserAuthorized
              ? [...commonList, ...guestItem]
              : [...commonList, ...userItem]}
          />
        </Header>
      </Layout>
    </div>
  );
}

export default Nav;
