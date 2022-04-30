import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Proptypes from 'prop-types';
import {
  Button,
  Modal,
  Form,
  Input,
  Radio,
  InputNumber,
  DatePicker,
  Space,
  message,
  Typography,
} from 'antd';

import axios from 'axios';
import './style.css';

const { Text } = Typography;
const { Group, Button: RButton } = Radio;
const { Item } = Form;

function DonationForm({
  visible, onCancel, campaignId, setVisible,
}) {
  const [form] = Form.useForm();
  const [radioValue, setRadioValue] = useState();
  const [msgError, setMsgError] = useState();
  const [selectedDate, setSelectedDate] = useState('state');
  const onCreate = async (values) => {
    try {
      const donateInfo = {
        ...values, deliver_time: selectedDate,
      };
      const { data } = await axios.post(`/api/donation/${campaignId}`, donateInfo);
      setMsgError('');
      setVisible(false);
      message.success(data.message);
    } catch ({ response: { data } }) {
      setMsgError(data.message);
    }
  };

  const validationForm = async () => {
    const values = await form.validateFields();
    form.resetFields();
    onCreate(onCreate(values));
  };
  const radioType = ({ target: { value } }) => setRadioValue(value);
  return (
    <Modal
      className="modal"
      visible={visible}
      title="Add Donation"
      okText="add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={validationForm}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Item
          name="type"
          label="Type Of Donation :"
          rules={[{ required: true, message: 'Please choose donation type!' }]}
        >
          <Group name="type" onChange={radioType}>
            <RButton value="clothes">Clothes</RButton>
            <RButton value="food">Food</RButton>
            <RButton value="money">Money</RButton>
          </Group>
        </Item>
        <Item
          label="Money count/  Piece of clothes/ Number of meals:"
          name={radioValue}
          rules={[{ required: true, message: 'Please fill this input!' }]}
        >
          <InputNumber min={0} defaultValue={0} name={radioValue} />
        </Item>
        <Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please fill this input!' }]}
        >
          <Input type="textarea" name="description" />
        </Item>
        <Item
          name="location"
          label="Location"
          rules={[{ required: true, message: 'Please fill this input!' }]}
        >
          <Input type="textarea" name="location" />
        </Item>
        <Item
          name="deliver_time"
          label="Deliver Time:"
          rules={[{ required: true, message: 'Please fill this input!' }]}
        >
          <Space name="deliver_time" direction="vertical">
            <DatePicker
              selected={selectedDate}
              name="deliver_time"
              onChange={(date, dateString) => setSelectedDate(dateString)}
              dateFormat="dd/MM/yyyy"
            />
          </Space>
        </Item>
        <Text type="danger">{msgError}</Text>
      </Form>
    </Modal>
  );
}

function DonationButton({ campaignId }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const visibleToggle = () => {
    setVisible((prev) => !prev);
  };
  function warning() {
    navigate('/login');
  }

  return (
    <>
      <Button
        type="primary"
        onClick={user.isUserAuthorized ? visibleToggle : warning}
      >
        Donate
      </Button>
      <DonationForm
        visible={visible}
        onCancel={visibleToggle}
        campaignId={campaignId}
        setVisible={setVisible}
      />
    </>
  );
}
DonationForm.propTypes = {
  visible: Proptypes.bool.isRequired,
  onCancel: Proptypes.func.isRequired,
  setVisible: Proptypes.func.isRequired,
  campaignId: Proptypes.number.isRequired,
};
DonationButton.propTypes = {
  campaignId: Proptypes.number.isRequired,
};

export default DonationButton;
