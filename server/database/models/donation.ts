import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

const Donation = sequelize.define('donations', {
  food: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  clothes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  money: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default Donation;
