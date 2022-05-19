import React from 'react';
import axios from 'axios';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Layout, Menu, Button, message, Image,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import './style.less';
import logo from '../../../assets/images/indonate-logo.svg';

import { logout } from '../../../redux/feature/user/userSlice';

const { Header } = Layout;

const Nav = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const logoutFun = async () => {
    try {
      await axios.post('/api/logout');
      dispatch(logout());
    } catch ({
      response: {
        data: { message: errorMessage },
      },
    }) {
      message.error({
        content: errorMessage,
      });
    }
  };

  const commonList = [
    { label: <NavLink to="/"> Home </NavLink> },
    { label: <a href="/#our-mission-section"> About Us </a> },
    { label: <NavLink to="/campaigns"> Campaigns</NavLink> },
    { label: <a href="/#reports-form-container"> Contact Us</a> },
  ];

  const userItem = [
    {
      label: (
        <NavLink to="/signup">
          <Button type="primary">Sign Up</Button>
        </NavLink>
      ),
    },
    {
      label: (
        <NavLink to="/login">
          <Button type="primary">Login</Button>
        </NavLink>
      ),
    },
  ];
  const guestItem = [
    {
      label: (
        <NavLink to="/">
          <Button onClick={logoutFun} className="btn" type="primary">
            Logout
          </Button>
        </NavLink>
      ),
    },
    {
      label: user?.userData?.isAdmin
        ? (<NavLink to="/admin"><Button type="primary">Dashboard</Button></NavLink>)
        : (<NavLink to="/campaigns"><Button type="primary">Donate Now</Button></NavLink>),
    },
  ];
  return !pathname.startsWith('/admin') && (
    <div className="nav-container">
      <Layout>
        <Header>
          <Image
            width={120}
            src={logo}
            preview={false}
          />

          <Menu
            mode="horizontal"
            defaultSelectedKeys={1}
            items={
              user.isUserAuthorized
                ? [...commonList, ...guestItem]
                : [...commonList, ...userItem]
            }
          />
        </Header>
      </Layout>
    </div>
  );
};

export default Nav;
