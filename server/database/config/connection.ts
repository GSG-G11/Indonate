import { Sequelize } from 'sequelize';

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
  // eslint-disable-next-line no-console
  console.log('no environment found');
}

const sequelize = new Sequelize(dbUrl, {
  dialectOptions: { sslConnection },
});

export default sequelize;
