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
} from 'antd';

import axios from 'axios';
import 'antd/dist/antd.css';
import './index.css';

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

  const handleSubmit = async () => {
    try {
      // Post data here
      await axios.post('/api/signin', userData);
      message.success('Welcome back!');
    } catch (e) {
      message.warning('Try again');
    }
  };

  return (
    <Layout>
      {/* --- Navbar --- */}
      <Content>
        <Row
          justify="end"
        >
          <Col span={12} className="login_image">
            <Image
              style={{ height: '100vh', width: '100vh' }}
              preview={false}
              src="https://i.postimg.cc/9FMJSScj/login-image.png"
            />
            <h1 className="text_image">
              Subscribe with us to make yourself a contributor to charity and help people in need.
            </h1>
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
            >
              <h1 className="login_text">Login</h1>

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
                ]}
              >
                <Input.Password name="password" placeholder="Password" onChange={handleInputChange} />
              </Form.Item>

              <Form.Item>
                <Button className="login_button" type="primary" htmlType="submit" onClick={handleSubmit}>
                  Login
                </Button>
                <div className="register_option">
                  <p>Don`t have an account ?</p>
                  <a className="register_text" href="/signup">Signup now</a>
                </div>
              </Form.Item>
              <Form.Item wrapperCol={{
                offset: 5,
                span: 32,
              }}
              >
                <div className="google-btn">
                  <div className="google-icon-wrapper">
                    <img className="google-icon" alt="" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                  </div>
                  <p className="btn-text"><b>Sign in with Google</b></p>
                </div>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
export default Signin;
