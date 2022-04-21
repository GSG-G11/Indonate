import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';
import { Category, Donation, Capon } from './index';

const Campaign = sequelize.define('campaigns', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  target: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image_link: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },

});
Campaign.belongsTo(Category);
Campaign.hasMany(Donation);
Campaign.hasMany(Capon);

export default Campaign;
