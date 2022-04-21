/* eslint-disable no-console */
import { Sequelize, DataTypes } from 'sequelize';

const {
  NODE_ENV, DB_URL, TEST_DB_URL, DATABASE_URL,
} = process.env;

let dbUrl:string = '';
let sslConnection: boolean | object = false;

if (NODE_ENV === 'test') {
  dbUrl = TEST_DB_URL || '';
  sslConnection = false;
} else if (NODE_ENV === 'production') {
  dbUrl = DATABASE_URL || '';
  sslConnection = { rejectUnauthorized: true };
} else if (NODE_ENV === 'dev') {
  dbUrl = DB_URL || '';
  sslConnection = false;
} else {
  console.log('no environment found');
}

const sequelize = new Sequelize(dbUrl, {
  dialectOptions: { sslConnection },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection successfully.');
  })
  .catch((error: any) => {
    console.error('Connection Failed', error);
  });

sequelize.sync({ force: true });
const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
User.create({ first_name: 'donor' }).then((value: any) => console.log(value));

export default sequelize;
