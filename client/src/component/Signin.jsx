import React, { useState } from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './Signin.css';
import FormInput from './Input';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [credentials, setCredentials] = useState({ email, password });
  const getEmailValue = (rawEmail) => {
    setEmail(rawEmail);
  };

  const getPasswordValue = (rawPassword) => {
    setPassword(rawPassword);
  };

  const validateCredentials = () => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) {
      alert('Invalid Email');
    } else if (password.length < 6) {
      alert('Password is short');
    } else {
      setCredentials({ email, password });
      alert(credentials);
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
