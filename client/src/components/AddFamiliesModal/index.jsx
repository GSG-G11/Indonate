import { message, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function AddFamiliesModal({
  campaignId, visible, setVisible,
}) {
  const navigate = useNavigate();
  const [ids, setIds] = useState([]);
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getAllFamilies = async () => {
      try {
        const {
          data: {
            data: { families: allFamilies },
          },
        } = await axios.get('/api/admin/families', {
          cancelToken: source.token,
        });
        setFamilies(allFamilies);
      } catch ({
        response: {
          data: { message: errorMessage },
        },
        response: { status },
      }) {
        if (status === 500) {
          navigate('/servererror');
        } else {
          message.error(errorMessage);
        }
      }
    };
    getAllFamilies();
    return () => {
      source.cancel();
    };
  }, []);

  const handleCancelModal = () => {
    setVisible(false);
    setIds([]);
  };
  const handleOnSelectChange = (e) => {
    setIds(e);
  };
  const handleOkModal = async (id) => {
    try {
      const {
        data: { message: successMessage },
      } = await axios.post(`/api/admin/campaign/${id}/families`, {
        ids: JSON.stringify(ids.map((strId) => +strId)),
      });
      setVisible(false);
      setIds([]);
      message.success(successMessage);
    } catch ({
      response: {
        data: { message: errorMessage },
      },
      response: { status },
    }) {
      if (status === 500) {
        navigate('/servererror');
      } else {
        message.error(errorMessage);
      }
    }
  };
  return (
    <Modal
      visible={visible}
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
        filterOption={
          (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
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
  campaignId: PropType.number.isRequired,
  setVisible: PropType.func.isRequired,
  visible: PropType.bool.isRequired,
};

export default AddFamiliesModal;
