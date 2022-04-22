import { sequelize } from '../models/index';

const build = () => {
  sequelize.sync({ force: true });
};
if (process.env.NODE_ENV === 'dev') {
  build();
}

export default build;
