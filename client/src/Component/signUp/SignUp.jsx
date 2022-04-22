import React, { useState } from 'react';
import './signUp.css';
// import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import {
  Form, Button, Input,
} from 'antd';

function SignUp() {
  // const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '', email: '', password: '', phone: '',
  });

  const signup = async () => {
    try {
      await axios.post('/api/signup', userInfo);
      // navigate('/');/// home page
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Form
        name="register"
        onFinish={signup}
      >

        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true,
            },
          ]}
        >
          <Input
            placeholder="Name"
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
        </Form.Item>
        <Form.Item
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
            placeholder="Email"
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input
            style={{
              width: '100%',
            }}
            placeholder="Phone Number"
            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}

        >
          <Input.Password
            placeholder="Password"
            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm password" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form>

    </div>
  );
}

export default SignUp;
