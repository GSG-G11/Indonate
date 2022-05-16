import sequelize from '../config/connection';
import Donor from './donor';
import Family from './family';
import Donation from './donation';
import Report from './report';
import Category from './category';
import Campaign from './campaign';
import Capon from './capon';

Campaign.belongsTo(Category);

Campaign.belongsToMany(Family, {
  through: { model: Capon, unique: false },
  constraints: true,
});
Family.belongsToMany(Campaign, {
  through: { model: Capon, unique: false },
  constraints: true,
});
Campaign.hasMany(Capon);
Capon.belongsTo(Campaign);
Family.hasMany(Capon);
Capon.belongsTo(Family);

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
  Report,
  Category,
  Campaign,
  Capon,
  sequelize,
};
