import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './Signin.css';
import FormInput from './Input';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getEmailValue = (rawEmail) => {
    setEmail(rawEmail);
  };

  const getPasswordValue = (rawPassword) => {
    console.log(rawPassword);
    setPassword(rawPassword);
  };

  return (
    <>
      <FormInput type="email" placeholder="Email" getInputValue={getEmailValue} emailValue={email} />
      <FormInput type="password" placeholder="Password" getInputValue={getPasswordValue} passwordValue={password} />
    </>
  );
}

export default Signin;
