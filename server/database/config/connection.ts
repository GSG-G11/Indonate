import { Sequelize } from 'sequelize';

require('env2')('.env');

const {
  NODE_ENV, DB_URL, TEST_DB_URL, DATABASE_URL,
} = process.env;

let dbUrl: string | undefined = '';

if (NODE_ENV === 'test') {
  dbUrl = TEST_DB_URL;
} else if (NODE_ENV === 'production') {
  dbUrl = DATABASE_URL;
} else if (NODE_ENV === 'dev') {
  dbUrl = DB_URL;
} else {
  throw new Error('No environment found');
}
if (!dbUrl) throw new Error('Invalid db url');

const sequelize = new Sequelize(
  dbUrl,
  {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
);

export default sequelize;
