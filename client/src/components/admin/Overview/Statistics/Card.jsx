import React from 'react';
import Proptypes from 'prop-types';
import { Statistic, Row, Col } from 'antd';
import './style.css';

const Card = ({ statistics }) => (
  <div className="card-content">
    {Object.keys(statistics).map((item) => (
      <div className="card">
        <Row>
          <Col>
            <center>
              {statistics[item].icon}
            </center>
            <Statistic title={item} value={statistics[item].count} />
          </Col>
        </Row>
      </div>
    ))}
  </div>
);

Card.propTypes = {
  statistics: Proptypes.shape({
    title: Proptypes.string.isRequired,
    value: Proptypes.number.isRequired,
  }).isRequired,
};

export default Card;
