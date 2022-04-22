import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, message } from 'antd';
import 'antd/dist/antd.css';
import './Signin.css';
import FormInput from '../Input';
import { setUser } from '../../slices/user';

function Signin() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getEmailValue = (rawEmail) => {
    setEmail(rawEmail);
  };

  const getPasswordValue = (rawPassword) => {
    setPassword(rawPassword);
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
    <>
      <FormInput type="email" placeholder="Email" getInputValue={getEmailValue} />
      <FormInput type="password" placeholder="Password" getInputValue={getPasswordValue} />
      <Button type="success" onClick={validateCredentials}>Login</Button>
    </>
  );
}

export default Signin;
