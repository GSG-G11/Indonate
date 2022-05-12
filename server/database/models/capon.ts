import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

const Capon = sequelize.define('capon', {
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

export default Capon;
