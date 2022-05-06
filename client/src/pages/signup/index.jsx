import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';

import axios from 'axios';
import {
  Button,
  message,
  Space,
  Typography,
  Anchor,
} from 'antd';

import { sign } from '../../redux/feature/user/userSlice';
import './style.less';
import SignForm from '../../components/common/SignForm';

const { Link } = Anchor;

const { Title, Text } = Typography;

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const register = async (userInfo) => {
    try {
      const { data: { data } } = await axios.post('/api/signup', userInfo);
      dispatch(sign(data));
      navigate('/');
      message.success(`Welcome ${data.name}`);
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
            REGISTER
          </Title>
          <SignForm getUserInfo={register} type="register" />
          <div className="register_option">
            <Text>Already have an account ?</Text>
            <Anchor affix={false}>
              <Link
                href="/login"
                title="Sign In"
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

export default SignUp;
