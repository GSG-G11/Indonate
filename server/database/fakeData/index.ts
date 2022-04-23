import sequelize from '../config/connection';
// eslint-disable-next-line import/extensions
import * as data from './data.json';

import {
  Campaign,
  Donor,
  Family,
  Donation,
  Contact,
  Category,
  Capon,
} from '../models';

const {
  campaigns, capons, categories, messages, donations, donors, families,
} = data;

const buildData = async () => {
  await sequelize.sync({ force: true });

  if (process.env.NODE_ENV === 'dev') {
    await Promise.all([
      campaigns.map(async (campaign: any) => {
        await Campaign.create(campaign);
      }),
      categories.map(async (category: any) => {
        await Category.create(category);
      }),
      messages.map(async (message: any) => {
        await Contact.create(message);
      }),
      families.map(async (family: any) => {
        await Family.create(family);
      }),
      donors.map(async (donor: any) => {
        await Donor.create(donor);
      }),
      donations.map(async (donation: any) => {
        await Donation.create(donation);
      }),
      capons.map(async (capon: any) => {
        await Capon.create(capon);
      }),
    ]);
  }
};
buildData();
