import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';
import { Donor, Campaign } from './index';

const Donation = sequelize.define('donations', {
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
Donation.belongsTo(Campaign);
Donation.belongsTo(Donor);

export default Donation;
