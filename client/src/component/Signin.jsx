import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './Signin.css';
import FormInput from './Input';

function Signin() {
  const [email, setEmail] = useState('');

  const getInputValue = (rawEmail) => {
    setEmail(rawEmail);
  };

  return (
    <FormInput type="email" placeholder="Email" getInputValue={getInputValue} emailValue={email} />
  );
}

export default Signin;
