import sequelize from '../config/connection';
import Donor from './donor';
import Family from './family';
import Donation from './donation';
import Contact from './contact';
import Category from './category';
import Campaign from './campaign';
import Capon from './capon';

Campaign.belongsTo(Category);
Campaign.hasMany(Donation);
Campaign.hasMany(Capon);
Capon.belongsTo(Family);
Donation.belongsTo(Donor);

export {
  Donor,
  Family,
  Donation,
  Contact,
  Category,
  Campaign,
  Capon,
  sequelize,
};
