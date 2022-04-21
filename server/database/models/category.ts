import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

const Category = sequelize.define('categories', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon_url: {
    type: DataTypes.STRING,
  },
});

export default Category;
