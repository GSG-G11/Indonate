import { React, useState } from 'react';
import {
  Layout,
  Row,
  Col,
  Image,
  Form,
  Button,
  Input,
  message,
  Typography,
  Anchor,
} from 'antd';

import { useDispatch } from 'react-redux';

import { GoogleOutlined } from '@ant-design/icons';

import axios from 'axios';
import 'antd/dist/antd.min.css';
import './index.less';
import { sign } from '../../redux/feature/user/userSlice';

const { Title, Text } = Typography;
const { Item } = Form;
const { Link } = Anchor;
const { Password } = Input;

const {
  Content,
} = Layout;

function Signin() {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const passwordValidation = () => ({
    validator(_, value) {
      if (value.length >= 6) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('password should be at least 6 characters'));
    },
  });

  const login = async () => {
    try {
      const { data: { data } } = await axios.post('/api/login', userData);
      dispatch(sign(data));
      message.success(`Welcome back ${data.name}`);
    } catch ({ response: { data: { message: errorMessage } } }) {
      message.error({
        content: errorMessage,
      });
    }
  };

  return (
    <Layout>
      {/* --- Navbar --- */}
      <Content>
        <Row>
          <Col span={12} className="customHeaderImage login_image">
            <Image
              preview={false}
              src="https://i.postimg.cc/9FMJSScj/login-image.png"
            />
            <Title
              level={2}
              className="text_image"
            >
              Subscribe with us to make yourself a contributor to charity and help people in need.

            </Title>
          </Col>
          <Col span={12} className="form_section">
            <Form
              className="login_form"
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              onFinish={login}
            >
              <Title className="login_title">
                Login
              </Title>

              <Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
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
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </Item>
              <Item>
                <Button className="login_button" type="primary" htmlType="submit">
                  Login
                </Button>
                <div className="register_option">
                  <Text>Don`t have an account ?</Text>
                  <Anchor affix>
                    <Link href="/signup" title="Sign up" />
                  </Anchor>
                </div>
              </Item>
              <Item wrapperCol={{
                offset: 5,
                span: 32,
              }}
              >
                <Button type="primary" icon={<GoogleOutlined />}>
                  Sign in with Google
                </Button>
              </Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
export default Signin;
