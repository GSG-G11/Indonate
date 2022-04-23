/* eslint-disable import/extensions */
import sequelize from '../config/connection';
import * as allCampaignModule from './campaignData.json';
import * as caponModule from './caponData.json';
import * as familyModule from './familyData.json';
import * as contactModule from './contactData.json';
import * as donorModule from './donorData.json';
import * as donationModule from './donationData.json';
import * as categoryModule from './categoryData.json';

import {
  Campaign,
  Donor,
  Family,
  Donation,
  Contact,
  Category,
  Capon,
} from '../models';

const { data: allCampaign } = allCampaignModule;
const { data: allCapon } = caponModule;
const { data: allFamilies } = familyModule;
const { data: categories } = categoryModule;
const { data: allMessages } = contactModule;
const { data: allDonors } = donorModule;
const { data: allDonation } = donationModule;

const buildFakeData = async () => {
  await sequelize.sync({ force: true });
  if (process.env.NODE_ENV === 'test') {
    await Promise.all([
      allCampaign.map(async (campaign: any) => {
        await Campaign.create(campaign);
      }),
      categories.map(async (category: any) => {
        await Category.create(category);
      }),
      allMessages.map(async (message: any) => {
        await Contact.create(message);
      }),
      allFamilies.map(async (family: any) => {
        await Family.create(family);
      }),
      ...allDonors.map(async (donor: any) => {
        await Donor.create(donor);
      }),
      ...allDonation.map(async (donation: any) => {
        await Donation.create(donation);
      }),
      allCapon.map(async (capon: any) => {
        await Capon.create(capon);
      }),
    ]);
  }
};
buildFakeData();
