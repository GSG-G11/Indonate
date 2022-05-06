import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  Button,
  Input,
} from 'antd';

const { Password } = Input;
const { Item } = Form;

function SignForm({ getUserInfo, type }) {
  const [userInfo, setUserInfo] = useState({
    name: '', email: '', password: '', phone: '', address: 'Gaza',
  });

  const passwordValidation = () => ({
    validator(_, value) {
      if (value.length >= 6) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('password should have at least 6 character '));
    },
  });
  const confirmPasswordValidation = (getFieldValue) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The two passwords that you entered do not match!'));
    },
  });

  const handleChange = ({ target: { name, value } }) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

  const sendUserData = () => {
    getUserInfo(userInfo);
  };

  return (
    <Form
      className="Form-sign-up"
      name="register"
      onFinish={sendUserData}
    >
      {type === 'register'
        ? (
          <Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
                whitespace: true,
              },
            ]}
          >
            <Input
              name="name"
              placeholder="Name"
              onChange={(e) => handleChange(e)}
            />
          </Item>
        ) : null}

      <Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input
          name="email"
          placeholder="Email"
          onChange={(e) => handleChange(e)}
        />
      </Item>
      {type === 'register'
        ? (
          <Item
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              placeholder="Phone Number"
              name="phone"
              onChange={(e) => handleChange(e)}
            />
          </Item>
        ) : null}

      <Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          () => passwordValidation(),
        ]}
      >
        <Password
          placeholder="Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
      </Item>
      {type === 'register' ? (
        <Item
          name="confirm"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => confirmPasswordValidation(getFieldValue),
          ]}
        >
          <Password placeholder="Confirm password" />
        </Item>
      ) : null}
      <Button className="sign-up-btn" type="primary" htmlType="submit">
        { type === 'register' ? 'Sign up' : 'Sign in'}
      </Button>
    </Form>
  );
}

export default SignForm;

SignForm.propTypes = {
  getUserInfo: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
