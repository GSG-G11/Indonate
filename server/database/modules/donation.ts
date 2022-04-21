import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';
import { donor, campaign } from './index';

const donation = sequelize.define('donations', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
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
donation.belongsTo(campaign);
donation.belongsTo(donor);

export default donation;
