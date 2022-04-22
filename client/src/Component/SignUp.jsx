import React, { useState } from 'react';
import axios from 'axios';

import {
  Form, Button, Input,
} from 'antd';

function SignUp() {
  const [userInfo, setUserInfo] = useState({
    name: '', email: '', password: '', phone: '',
  });

  const signup = async () => {
    try {
      await axios.post('/api/signup', userInfo);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Form name="login" onFinish={signup}>
        <Form.Item rules={[{
          required: true,
          message: 'Please input your username!',
        }]}
        >
          <Input value={userInfo.name} placeholder="User name" onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
        </Form.Item>
        <Form.Item rules={[
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
            value={userInfo.email}
            placeholder="Email"
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />
        </Form.Item>

        <Form.Item rules={[{
          required: true,
          message: 'Please input your phone number!',
        }]}
        >
          <Input
            value={userInfo.phone}
            placeholder="Phone"
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
            value={userInfo.password}
            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
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
          <Input.Password />
        </Form.Item>
        <Button htmlType="submit">
          sign up
        </Button>
      </Form>

    </div>
  );
}

export default SignUp;
