import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';

import axios from 'axios';
import {
  Form,
  Button,
  Input,
  message,
  Space,
  Typography,
} from 'antd';

import { sign } from '../../redux/feature/user/userSlice';
import './style.less';

const { Password } = Input;
const { Item } = Form;
const { Title } = Typography;

function SignUp() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: '', email: '', password: '', phone: '', address: 'Gaza',
  });

  const register = async () => {
    try {
      const { data: { data } } = await axios.post('/api/signup', userInfo);
      dispatch(sign(data));
      // navigate('/');// home page
      message.success(`Welcome ${data.name}`);
    } catch ({ response: { data: { message: errorMessage } } }) {
      message.error({
        content: errorMessage,
      });
    }
  };
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
  return (
    <div className="sign-up-container">
      <div className="img-side-sign-up">
        <Title
          level={3}
        >
          Subscribe with us to make yourself a contributor to charity and help people in need.
        </Title>
      </div>
      <div className="form-conatainer-signup">
        <Space
          className="space-component"
          direction="horizontal"
          align="center"
        >
          <Title
            level={2}
          >
            Sign Up
          </Title>
          <Form
            className="Form-sign-up"
            name="register"
            onFinish={register}
          >
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
            <Button className="sign-up-btn" type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form>
          <Button type="primary" icon={<GoogleOutlined />}>
            Login with Google
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default SignUp;
