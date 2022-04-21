import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';
import { Campaign, Family } from './index';

const Capon = sequelize.define('capon', {
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
Capon.belongsTo(Campaign);
Capon.belongsTo(Family);

export default Capon;
