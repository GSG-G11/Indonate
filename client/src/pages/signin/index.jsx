import React from 'react';
import {
  Button,
  Typography,
  message,
  Space,
  Anchor,
} from 'antd';
import { useDispatch } from 'react-redux';
import { GoogleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { sign } from '../../redux/feature/user/userSlice';
import '../signup/index.less';
import SignForm from '../../components/common/SignForm';

const { Link } = Anchor;

const { Title, Text } = Typography;

function Signin() {
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
      <div className="img-side-sgin-up">

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
          <Button type="primary" icon={<GoogleOutlined />}>
            Sign in with Google
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default Signin;
