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
} from 'antd';

import axios from 'axios';
import 'antd/dist/antd.min.css';
import './index.css';
import Google from './Google';

const { Title } = Typography;

const {
  Content,
} = Layout;

function Signin() {
  const [userData, setUserData] = useState({ email: '', password: '' });

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
      await axios.post('/api/signin', userData);
    } catch (err) {
      message.error({
        content: err,
        style: {
          marginTop: '20vh',
        },
      });
    }
  };

  return (
    <Layout>
      {/* --- Navbar --- */}
      <Content>
        <Row>
          <Col span={12} className="login_image">
            <Image
              style={{ height: '100vh', width: '100vh' }}
              preview={false}
              src="https://i.postimg.cc/9FMJSScj/login-image.png"
            />
            <Title level={2} style={{ color: 'white' }} className="text_image">Subscribe with us to make yourself a contributor to charity and help people in need.</Title>
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
              <Title style={{ color: '#469D62', marginBottom: '68px' }}>
                Login
              </Title>

              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input name="email" placeholder="Email" onChange={handleInputChange} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  () => passwordValidation(),
                ]}
              >
                <Input.Password name="password" placeholder="Password" onChange={handleInputChange} />
              </Form.Item>

              <Form.Item>
                <Button className="login_button" type="primary" htmlType="submit">
                  Login
                </Button>
                <div className="register_option">
                  <p>Don`t have an account ?</p>
                  <Typography.Link style={{ color: 'green' }}>Signup now</Typography.Link>
                </div>
              </Form.Item>
              <Form.Item wrapperCol={{
                offset: 5,
                span: 32,
              }}
              >
                <Google />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
export default Signin;
