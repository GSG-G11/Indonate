import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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

import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style.css';

const { Text } = Typography;

function CollectionCreateForm({
  visible, onCreate, onCancel, setSelectedDate, selectedDate, msgError,
}) {
  const [form] = Form.useForm();
  const [radioValue, setRadioValue] = useState();
  return (
    <Modal
      className="modal"
      visible={visible}
      title="Add Donation"
      okText="add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >

        <Form.Item
          name="type"
          label="Type Of Donation :"
          rules={[{ required: true, message: 'Please choose donation type!' }]}
        >
          <Radio.Group name="type" onChange={({ target: { value } }) => setRadioValue(value)}>
            <Radio.Button value="clothes">Clothes</Radio.Button>
            <Radio.Button value="food">Food</Radio.Button>
            <Radio.Button value="money">Money</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Money count/  Piece of clothes/ Number of meals:"
          name={radioValue}
          rules={[{ required: true, message: 'Please fill this input!' }]}
        >
          <InputNumber min={0} defaultValue={0} name={radioValue} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please fill this input!' }]}
        >
          <Input type="textarea" name="description" />
        </Form.Item>
        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: 'Please fill this input!' }]}
        >
          <Input type="textarea" name="location" />
        </Form.Item>
        <Form.Item
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
        </Form.Item>
        <Text type="danger">{msgError}</Text>
      </Form>
    </Modal>
  );
}

function CollectionsPage() {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(Date.now().toString());
  const [msgError, setMsgError] = useState();
  const { id } = useSelector((state) => state.user.userData);
  const onCreate = async (values) => {
    try {
      const { campaignId } = useParams();
      const donateInfo = {
        ...values, deliver_time: selectedDate, donorId: id,
      };
      const response = await axios.post(`/api/donation/${campaignId}`, donateInfo);
      setVisible(false);
      message.success(response.data.message);
    } catch (error) {
      setMsgError(error.response.data.message);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Donate
      </Button>
      <CollectionCreateForm
        msgError={msgError}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  );
}
CollectionCreateForm.propTypes = {
  visible: Proptypes.bool.isRequired,
  onCancel: Proptypes.func.isRequired,
  onCreate: Proptypes.func.isRequired,
  setSelectedDate: Proptypes.func.isRequired,
  selectedDate: Proptypes.string.isRequired,
  msgError: Proptypes.string.isRequired,
};

export default CollectionsPage;
