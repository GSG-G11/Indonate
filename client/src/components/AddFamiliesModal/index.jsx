import { Modal, Select } from 'antd';
import React from 'react';
import PropType from 'prop-types';
import './style.css';

const { Option } = Select;

function AddFamiliesModal({
  campaignId,
  ids,
  families,
  closeCampaignMode,
  handleCancelModal,
  handleOkModal,
  handleOnSelectChange,
}) {
  return (
    <Modal
      visible={closeCampaignMode}
      onCancel={handleCancelModal}
      onOk={() => {
        handleOkModal(campaignId);
      }}
    >
      <Select
        className="families-select"
        mode="multiple"
        style={{ width: '100%' }}
        value={ids}
        placeholder="Select the families you want to donate to
      "
        onChange={handleOnSelectChange}
        filterOption={(input, option) => option.children.toLowerCase()
          .indexOf(input.toLowerCase()) >= 0}
      >
        {families.map((family) => (
          <Option key={family.id} id={family.id}>
            {family.name}
          </Option>
        ))}
      </Select>
    </Modal>
  );
}

AddFamiliesModal.propTypes = {
  families: PropType.instanceOf(Array).isRequired,
  ids: PropType.instanceOf(Array).isRequired,
  campaignId: PropType.number.isRequired,
  closeCampaignMode: PropType.func.isRequired,
  handleCancelModal: PropType.func.isRequired,
  handleOkModal: PropType.func.isRequired,
  handleOnSelectChange: PropType.func.isRequired,
};

export default AddFamiliesModal;
