import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

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
    allowNull: false,
  },
  is_available: {
    type: DataTypes.BOOLEAN,
  },
});

export default Campaign;
