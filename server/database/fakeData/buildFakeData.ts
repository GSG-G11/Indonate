/* eslint-disable import/extensions */
import * as campaignModule from './campaigns.json';
import sequelize from '../config/connection';
import * as caponModule from './capons.json';
import * as familyModule from './families.json';
import * as reportModule from './reports.json';
import * as donorModule from './donors.json';
import * as donationModule from './donations.json';
import * as categoryModule from './categories.json';

import {
  Campaign,
  Donor,
  Family,
  Donation,
  Report,
  Category,
  Capon,
} from '../models';

const { campaigns } = campaignModule;
const { capons } = caponModule;
const { families } = familyModule;
const { categories } = categoryModule;
const { messages } = reportModule;
const { donors } = donorModule;
const { donations } = donationModule;

const buildFakeData = async () => {
  await sequelize.sync({ force: true });
  await Promise.all([
    categories.map(async (category: any) => {
      await Category.create(category);
    }),
    messages.map(async (message: any) => {
      await Report.create(message);
    }),
    families.map(async (family: any) => {
      await Family.create(family);
    }),
    donors.map(async (donor: any) => {
      await Donor.create(donor);
    }),

  ]);
  await Promise.all(campaigns.map((campaign: any) => Campaign.create(campaign)));
  await Promise.all([
    capons.map(async (capon: any) => {
      await Capon.create(capon);
    }),
    donations.map(async (donation: any) => {
      await Donation.create(donation);
    }),
  ]);
};
if (process.env.NODE_ENV !== 'test') {
  buildFakeData();
}

export default buildFakeData;
