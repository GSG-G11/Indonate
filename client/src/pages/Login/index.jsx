import React from 'react';
import {
  Typography,
  message,
  Space,
  Anchor,
} from 'antd';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { sign } from '../../redux/feature/user/userSlice';
import '../Signup/index.less';
import SignForm from '../../components/common/SignForm';

const { Link } = Anchor;

const { Title, Text } = Typography;

function Login() {
  const dispatch = useDispatch();

  const login = async ({ email, password }) => {
    const userInfo = { email, password };
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
          <SignForm getUserInfo={login} items="login" />
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
}

export default Login;
