import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button, message,
} from 'antd';
import 'antd/dist/antd.css';
import './Signin.css';
import { setUser } from '../../slices/user';
import FormInput from '../Input';

function Signin() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getEmailValue = (rawEmail) => {
    setEmail(rawEmail.replace(/\s/g, ''));
  };

  const getPasswordValue = (rawPassword) => {
    setPassword(rawPassword.trim());
  };
  const validateCredentials = () => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) {
      message.warning('Please enter a valid email address');
    } else if (password.length < 6) {
      message.warning('Password must be at least 6 characters');
    } else {
      dispatch(setUser({ email, password }));
      message.success('Welcome back!');
    }
  };

  return (
    <div className="login_header">
      <h1 className="login_text">Login</h1>
      <FormInput type="email" placeholder="Email" getInputValue={getEmailValue} />
      <FormInput type="password" placeholder="Password" getInputValue={getPasswordValue} />
      <Button className="login_button" type="success" onClick={validateCredentials}>Login</Button>
      <div className="signup_link">
        <p>Dont have an account</p>
        <p>Signup now</p>
      </div>
      <div className="google-btn">
        <div className="google-icon-wrapper">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt=""
          />
        </div>
        <p className="btn-text"><b>Sign in with google</b></p>
      </div>
    </div>
  );
}

export default Signin;
