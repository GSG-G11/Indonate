import React, { useState } from 'react';
import {
  Form, Button, Input,
} from 'antd';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [password, SetPassword] = useState('');
  return (
    <div>
      <Form name="login" onFinish={SignUp}>
        <Form.Item rules={[{
          required: true,
          message: 'Please input your username!',
        }]}
        >
          <Input value={username} placeholder="User name" onChange={(e) => setUsername(e.target.value)} />
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
          <Input value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item rules={[{
          required: true,
          message: 'Please input your phone number!',
        }]}
        >
          <Input value={phone} placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
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
          <Input.Password value={password} onChange={(e) => SetPassword(e.target.value)} />
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
