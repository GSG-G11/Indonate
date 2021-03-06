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
  food_target: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clothes_target: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  money_target: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default Campaign;
