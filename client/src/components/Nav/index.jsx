import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/feature/user/userSlice';
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
  { label: <NavLink to="/signUp"><Button className="btn" type="primary">Sign Up</Button></NavLink> },
  { label: <NavLink to="/login"><Button className="btn" type="primary">Login</Button></NavLink> },
];

function Nav() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logoutFun = async () => {
    axios.post('/api/logout');
    dispatch(logout());
  };
  const guestItem = [
    { label: <NavLink to="/logout"><Button onClick={logoutFun} className="btn" type="primary">Logout</Button></NavLink> },
    { label: <NavLink to="/campaign"><Button className="btn" type="primary">Donate Now</Button></NavLink> },
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
