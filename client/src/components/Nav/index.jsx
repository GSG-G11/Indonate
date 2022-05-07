import React from 'react';
import axios from 'axios';
import { NavLink, useLocation } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/feature/user/userSlice';
import 'antd/dist/antd.css';
import './style.css';

const { Header } = Layout;

function Nav() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logoutFun = async () => {
    await axios.post('/api/logout');
    dispatch(logout());
  };
  const { pathname } = useLocation();

  const commonList = [
    { label: <NavLink to="/"> Home </NavLink> },
    pathname === '/' ? { label: <a href="#our-mission-section"> About Us </a> } : null,
    { label: <NavLink to="/campaigns"> Campaigns</NavLink> },
    pathname === '/' ? { label: <a href="#reports-form-container"> Contact Us</a> } : null,
  ];

  const userItem = [
    { label: <NavLink to="/signUp"><Button className="btn" type="primary">Sign Up</Button></NavLink> },
    { label: <NavLink to="/login" className="btnt"><Button className="btn" type="primary">Login</Button></NavLink> },
  ];
  const guestItem = [
    { label: <NavLink to="/logout" className="btnt"><Button onClick={logoutFun} className="btn" type="primary">Logout</Button></NavLink> },
    { label: <NavLink to="/campaign" className="btnt"><Button className="btn" type="primary">Donate Now</Button></NavLink> },
  ];

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
