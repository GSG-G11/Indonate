import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';
import { category, donation, capon } from './index';

const campaign = sequelize.define('campaigns', {
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
campaign.belongsTo(category);
campaign.hasMany(donation);
campaign.hasMany(capon);

export default campaign;
