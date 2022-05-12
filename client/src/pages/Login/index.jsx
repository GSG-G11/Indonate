import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Typography,
  message,
  Space,
  Anchor,
  Form,
  Button,
  Input,
} from 'antd';
import { sign } from '../../redux/feature/user/userSlice';
import '../Signup/style.less';

const { Password } = Input;
const { Item } = Form;
const { Link } = Anchor;
const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
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
      navigate('/');
      message.success(`Welcome back ${data.name}`);
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
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',

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
              Login
            </Button>
          </Form>
          <div className="register_option">
            <Text>Don`t have an account ?</Text>
            <Anchor affix={false}>
              <Link
                href="/signup"
                title="Sign Up"
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
export default Login;
