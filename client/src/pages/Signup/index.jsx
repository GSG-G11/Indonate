import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  message,
  Space,
  Typography,
  Anchor,
  Form,
  Input,
  Button,
} from 'antd';
import { sign } from '../../redux/feature/user/userSlice';
import './style.less';

const { Password } = Input;
const { Item } = Form;
const { Link } = Anchor;

const { Title, Text } = Typography;

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const register = async () => {
    try {
      const { data: { data } } = await axios.post('/api/signup', userInfo);
      dispatch(sign(data));
      navigate('/');
      message.success(`Welcome ${data.name}`);
    } catch ({ response: { data: { message: errorMessage } } }) {
      message.error({
        content: errorMessage,
      });
    }
  };

  return (
    <div className="sign-up-container">
      <div className="img-side-sign-up">

        <Title
          className="custom-header-text"
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
            REGISTER
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
                {
                  max: 250,
                  message: 'Value should be less than 250 character',
                },
                {
                  min: 4,
                  message: 'Value should be more than 4 character',
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
              Sign up
            </Button>
          </Form>
          <div className="register_option">
            <Text>Already have an account ?</Text>
            <Anchor affix={false}>
              <Link
                href="/login"
                title="Sign In"
              />
            </Anchor>
          </div>
          <button type="button" className="login-with-google-btn">
            Sign in with Google
          </button>
        </Space>
      </div>
    </div>
  );
};

export default Signup;
