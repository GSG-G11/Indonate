import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

function Container({ children }) {
  return (
    <div className="container">{children}</div>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
