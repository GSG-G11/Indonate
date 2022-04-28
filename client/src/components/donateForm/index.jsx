import React, { useState } from 'react';
import Proptypes from 'prop-types';
import {
  Button, Modal, Form, Input, Radio, InputNumber, DatePicker, Space,
} from 'antd';

function CollectionCreateForm({
  visible, onCreate, onCancel, setSelectedDate, selectedDate,
}) {
  const [form] = Form.useForm();
  return (
    <Modal
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
          name="radio"
          label="Type Of Donation :"
        >
          <Radio.Group name="radio">
            <Radio.Button value="clothes">Clothes</Radio.Button>
            <Radio.Button value="food">Food</Radio.Button>
            <Radio.Button value="money">Money</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Money count/  Piece of clothes/ Number of meals:" name="number">
          <InputNumber min={0} defaultValue={0} name="number" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" name="description" />
        </Form.Item>
        <Form.Item name="location" label="Location">
          <Input type="textarea" name="location" />
        </Form.Item>
        <Form.Item name="deliver_time" label="Deliver Time:">
          <Space name="deliver_time" direction="vertical">
            <DatePicker
              selected={selectedDate}
              name="deliver_time"
              onChange={(date, dateString) => setSelectedDate(dateString)}
              dateFormat="dd/MM/yyyy"
            />
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}

function CollectionsPage() {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const onCreate = (values) => {
    const donateInfo = { ...values, deliver_time: selectedDate };
    console.log(donateInfo);
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Donate
      </Button>
      <CollectionCreateForm
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
}
CollectionCreateForm.propTypes = {
  visible: Proptypes.bool.isRequired,
  onCancel: Proptypes.func.isRequired,
  onCreate: Proptypes.func.isRequired,
  setSelectedDate: Proptypes.string.isRequired,
  selectedDate: Proptypes.string.isRequired,
};
CollectionsPage.protoType = {
  selectedDate: Proptypes.string.isRequired,
};

export default CollectionsPage;
