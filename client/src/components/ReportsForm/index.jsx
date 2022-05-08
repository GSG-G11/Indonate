import React from 'react';
import {
  Form, Input, Button, message, Typography,
} from 'antd';

import axios from 'axios';
import './style.less';
import Container from '../Container';

const { TextArea } = Input;
const { Title, Paragraph } = Typography;
const { Item } = Form;

function ReportsForm() {
  const [form] = Form.useForm();

  const addReport = async ({ name, email, reportMsg }) => {
    try {
      const { data } = await axios.post('/api/reports', {
        name,
        email,
        message: reportMsg,
      });
      message.success(data.message);
      form.resetFields();
    } catch ({
      response: {
        data: { message: errorMessage },
      },
    }) {
      message.error(errorMessage);
    }
  };
  const onFinish = ({ name, email, reportMsg }) => {
    addReport({ name, email, reportMsg });
  };
  return (
    <Container>
      <div className="reports-form-container">
        <div className="reports-form-side-bar">
          <Title className="contact-us">CONTACT US</Title>
          <Paragraph className="report-form-description">
            Got a question? We&apos;d love to hear from you. Send us a message
            and well respond as soon as possible.
          </Paragraph>
        </div>
        <Form
          form={form}
          name="reports-form"
          onFinish={onFinish}
          labelCol={{ span: 8 }}
          className="reports-form"
        >
          <Item>
            <Item
              name="name"
              noStyle
              rules={[{ required: true, message: 'Full Name is required' }]}
            >
              <Input
                className="report-fullname-input"
                placeholder="Username"
                size="large"
              />
            </Item>
          </Item>
          <Item>
            <Item
              name="email"
              noStyle
              rules={[
                {
                  type: 'email',
                  message: 'Email is not a valid email!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input
                className="report-email-input"
                placeholder="Email"
                size="large"
              />
            </Item>
          </Item>
          <Item
            name="reportMsg"
            rules={[
              { required: true, message: 'You should add message or report.' },
              { min: 10, message: "You can't add less than 10 letters" },
            ]}
          >
            <TextArea rows={6} placeholder="Report" size="large" />
          </Item>
          <Button
            className="submit-report"
            type="primary"
            htmlType="submit"
            size="large"
          >
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default ReportsForm;
