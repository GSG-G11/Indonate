import sequelize from '../config/connection';
import Donor from './donor';
import Family from './family';
import Donation from './donation';
import Report from './report';
import Category from './category';
import Campaign from './campaign';
import Capon from './capon';

Campaign.belongsTo(Category);
Campaign.belongsToMany(Family, { through: Capon });
Family.belongsToMany(Campaign, { through: Capon });
Campaign.belongsToMany(Donor, {
  through: { model: Donation, unique: false },
  constraints: true,
});
Donor.belongsToMany(Campaign, {
  through: { model: Donation, unique: false },
  constraints: true,
});

export {
  Donor,
  Family,
  Donation,
  Report,
  Category,
  Campaign,
  Capon,
  sequelize,
};
