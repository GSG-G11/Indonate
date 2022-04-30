import React from 'react';
import {
  Form, Input, Button, message,
} from 'antd';

import axios from 'axios';
import './style.less';

const { TextArea } = Input;

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
    <div className="reports-form-container">
      <div className="reports-form-side-bar">
        <p className="contact-us">CONTACT US</p>
        <p className="description">
          Got a question? We&apos;d love to hear from you. Send us a message and well
          respond as soon as possible.
        </p>
      </div>
      <Form
        form={form}
        name="reports-form"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        className="reports-form"
      >
        <Form.Item>
          <Form.Item
            name="name"
            noStyle
            rules={[{ required: true, message: 'Fullname is required' }]}
          >
            <Input
              className="report-fullname-input"
              placeholder="Username"
              size="large"
            />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Form.Item
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
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="reportMsg"
          rules={[
            { required: true, message: 'You should add message or report.' },
            { min: 10, message: "You can't add less than 10 letters" },
          ]}
        >
          <TextArea rows={6} placeholder="Report" size="large" />
        </Form.Item>

        <Form.Item label=" " colon={false}>
          <Button
            className="submit-report"
            type="primary"
            htmlType="submit"
            size="large"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ReportsForm;
