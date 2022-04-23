import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Form, Button, Input, message, Space, Typography,
} from 'antd';
import { signUp } from '../../feature/userReducer';
import './style.css';

function SignUp() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: '', email: '', password: '', phone: '',
  });

  const Registor = async () => {
    try {
      const response = await axios.post('/api/signup', userInfo);
      const data = response.data.data[0];// user info object
      dispatch(signUp(data));
      // navigate('/');// home page
    } catch (err) {
      message.error({
        content: err,
        style: {
          marginTop: '30vh',
        },
      });
    }
  };

  return (
    <div className="sign-up-container">
      <div className="img-side-sgin-up">
        <Typography.Title level={3} style={{ margin: 0 }}>
          Subsicribe with us to make yourself a contributor to charity and help people in need.
          Subsicribe with us to make yourself a contributor to charity and help people in need.
        </Typography.Title>
      </div>
      <div className="form-conatainer-signup">
        <Space
          direction="vertical"
          style={{
            height: '100%',
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Typography.Title
            level={3}
          >
            Register
          </Typography.Title>
          <Form
            style={{
              width: '30vw',
            }}
            name="register"
            onFinish={Registor}
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
            <Button className="sign-up-btn" type="none" htmlType="submit">
              Sign Up
            </Button>
          </Form>
        </Space>

      </div>
    </div>
  );
}

export default SignUp;
