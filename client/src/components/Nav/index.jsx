import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import {
  Layout, Menu, Button, message,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/feature/user/userSlice';
import 'antd/dist/antd.css';
import './style.css';

const { Header } = Layout;

function Nav() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logoutFun = async () => {
    try {
      await axios.post('/api/logout');
      dispatch(logout());
    } catch ({ response: { data: { message: errorMessage } } }) {
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
    { label: <NavLink to="/signUp"><Button type="primary">Sign Up</Button></NavLink> },
    { label: <NavLink to="/login"><Button type="primary">Login</Button></NavLink> },
  ];
  const guestItem = [
    { label: <NavLink to="/logout"><Button onClick={logoutFun} className="btn" type="primary">Logout</Button></NavLink> },
    { label: <NavLink to="/campaign"><Button type="primary">Donate Now</Button></NavLink> },
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
