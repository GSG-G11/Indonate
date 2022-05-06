import React from 'react';
import {
  Button,
  Typography,
  message,
  Space,
} from 'antd';
import { useDispatch } from 'react-redux';
import { GoogleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { sign } from '../../redux/feature/user/userSlice';
import '../signup/style.less';
import SignForm from '../../components/common/SignForm';

const { Title } = Typography;

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
          <SignForm getUserInfo={login} type="login" />
          <Button type="primary" icon={<GoogleOutlined />}>
            Sign in with Google
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default Signin;
