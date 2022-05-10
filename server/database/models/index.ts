import sequelize from '../config/connection';
import Donor from './donor';
import Family from './family';
import Donation from './donation';
import Contact from './contact';
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
Campaign.hasMany(Donation);
Donation.belongsTo(Campaign);
Donor.hasMany(Donation);
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
