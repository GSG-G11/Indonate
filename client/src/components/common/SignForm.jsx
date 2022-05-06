import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  Button,
  Input,
  Typography,
  Anchor,
} from 'antd';

const { Link } = Anchor;
const { Password } = Input;
const { Item } = Form;
const { Text } = Typography;

function SignForm({ getUserInfo }) {
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

  const sendUserData = () => {
    getUserInfo(userInfo);
  };

  return (
    <Form
      className="Form-sign-up"
      name="register"
      onFinish={sendUserData}
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
  );
}

export default SignForm;

SignForm.propTypes = {
  getUserInfo: PropTypes.func.isRequired,
};
