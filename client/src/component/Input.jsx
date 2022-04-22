import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

function FormInput({
  type, placeholder,
  getInputValue,
}) {
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInput(value);
  };

  useEffect(() => getInputValue(input), [input]);

  return (
    <div>
      <Input className="emailInput" type={type} onChange={handleInputChange} placeholder={placeholder} value={input} maxLength={type !== 'email' ? 12 : 64} />
    </div>
  );
}

export default FormInput;

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  getInputValue: PropTypes.func.isRequired,
};
