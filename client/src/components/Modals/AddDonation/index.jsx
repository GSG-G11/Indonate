import React, { useState } from 'react';
import moment from 'moment';
import Proptypes from 'prop-types';
import {
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
const { Group, Button } = Radio;
const { Item } = Form;

const AddDonation = ({
  visible,
  onCancel,
  campaignId,
  setVisible,
  setIsUpdated,
}) => {
  const [form] = Form.useForm();
  const [radioValue, setRadioValue] = useState();
  const [msgError, setMsgError] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const onCreate = async (values) => {
    try {
      const donateInfo = {
        ...values,
        deliver_time: selectedDate,
      };
      const { data: { message: successMessage } } = await axios.post(
        `/api/donation/${campaignId}`,
        donateInfo,
      );
      setMsgError('');
      setVisible(false);
      setIsUpdated(true);
      message.success(successMessage);
    } catch ({ response: { data: { message: errorMessage } } }) {
      setMsgError(errorMessage);
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
            <Button value="clothes">Clothes</Button>
            <Button value="food">Food</Button>
            <Button value="money">Money</Button>
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
        <Space direction="vertical">
          <Item
            name="deliver_time"
            label="Deliver Time:"
            rules={[{ required: true, message: 'Please fill this input!' }]}
          >
            <DatePicker
              selected={selectedDate}
              name="deliver_time"
              onChange={(date, dateString) => setSelectedDate(dateString)}
              dateFormat="dd/MM/yyyy"
              disabledDate={(current) => current && current < moment().startOf('day')}
            />
          </Item>
        </Space>
        <Text type="danger">{msgError}</Text>
      </Form>
    </Modal>
  );
};

AddDonation.propTypes = {
  visible: Proptypes.bool.isRequired,
  setIsUpdated: Proptypes.func,
  onCancel: Proptypes.func.isRequired,
  setVisible: Proptypes.func.isRequired,
  campaignId: Proptypes.number.isRequired,
};

export default AddDonation;
