import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

const Donation = sequelize.define('donations', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
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
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deliver_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Donation;
