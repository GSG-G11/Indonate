import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

const Donation = sequelize.define('donations', {
  food: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  clothes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  money: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

export default Donation;
