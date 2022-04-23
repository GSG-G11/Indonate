import { React, useState } from 'react';
import {
  Layout, Row, Col,
  Image,
  Form, Button, message,
} from 'antd';

import 'antd/dist/antd.css';
import './Signin.css';

import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/user';
import FormInput from './Input';

const {
  Content,
} = Layout;

function Signin() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getEmailValue = (rawEmail) => {
    setEmail(rawEmail.replace(/\s/g, ''));
  };

  const getPasswordValue = (rawPassword) => {
    setPassword(rawPassword.trim());
  };
  const validateCredentials = () => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) {
      message.warning('Please enter a valid email address');
    } else if (password.length < 6) {
      message.warning('Password must be at least 6 characters');
    } else {
      dispatch(setUser({ email, password }));
      message.success('Welcome back!');
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
              <FormInput type="email" placeholder="Email" getInputValue={getEmailValue} />
              <FormInput type="password" placeholder="Password" getInputValue={getPasswordValue} />
              <Button className="login_button" type="success" onClick={validateCredentials}>Login</Button>
              <div className="register_option">
                <p>Don`t have an account ?</p>
                <a className="register_text" href="/signup">Signup now</a>
              </div>
            </Form>
            <div className="google-btn">
              <div className="google-icon-wrapper">
                <img className="google-icon" alt="" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
              </div>
              <p className="btn-text"><b>Sign in with google</b></p>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Signin;
