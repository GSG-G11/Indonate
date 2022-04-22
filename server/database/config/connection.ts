import { Sequelize } from 'sequelize';

require('env2')('.env');

const {
  NODE_ENV, DB_URL, TEST_DB_URL, DATABASE_URL,
} = process.env;

let dbUrl:string | undefined = '';
let sslConnection: boolean | object = false;

if (NODE_ENV === 'test') {
  dbUrl = TEST_DB_URL;
  sslConnection = false;
} else if (NODE_ENV === 'production') {
  dbUrl = DATABASE_URL;
  sslConnection = { rejectUnauthorized: true };
} else if (NODE_ENV === 'dev') {
  dbUrl = DB_URL;
  sslConnection = false;
} else {
  throw new Error('No environment found');
}
if (!dbUrl) throw new Error('Invalid db url');

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  dialectOptions: { sslConnection },
});

export default sequelize;
