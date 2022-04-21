import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';
import { campaign, family } from './index';

const capon = sequelize.define('donations', {
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
capon.belongsTo(campaign);
capon.belongsTo(family);

export default capon;
