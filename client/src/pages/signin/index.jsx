import React, { useState } from 'react';
import {
  Form,
  Button,
  Input,
  message,
  Typography,
  Anchor,
  Space,
} from 'antd';
import { useDispatch } from 'react-redux';
import { GoogleOutlined } from '@ant-design/icons';

import axios from 'axios';

import { sign } from '../../redux/feature/user/userSlice';
import '../signup/style.less';

const { Link } = Anchor;
const { Password } = Input;
const { Item } = Form;
const { Title, Text } = Typography;

function Signin() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    email: '', password: '',
  });

  const passwordValidation = () => ({
    validator(_, value) {
      if (value.length >= 6) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('password should have at least 6 character '));
    },
  });

  const handleChange = ({ target: { name, value } }) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

  const login = async () => {
    try {
      const { data: { data } } = await axios.post('/api/login', userInfo);
      dispatch(sign(data));
      message.success(`Welcome back ${data.name}`);
    } catch ({ response: { data: { message: errorMessage } } }) {
      message.error({
        content: errorMessage,
      });
    }
  };

  return (
    <div className="sign-up-container">
      <div className="img-side-sgin-up">

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
            LOGIN
          </Title>
          <Form
            className="Form-sign-up"
            name="register"
            onFinish={login}
          >
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
            <Button className="sign-up-btn" type="primary" htmlType="submit">
              Sign In
            </Button>
            <div className="register_option">
              <Text>Don`t have an account ?</Text>
              <Anchor affix={false}>
                <Link
                  href="/signup"
                  title="Sign up"
                />
              </Anchor>
            </div>
          </Form>
          <Button type="primary" icon={<GoogleOutlined />}>
            Sign in with Google
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default Signin;
