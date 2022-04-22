import { Donation } from '../models/index';

const allDonation = [
  {
    food: 10,
    clothes: 10,
    money: 100,
    campaignId: 1,
    donorId: 1,
  },
  {
    food: 20,
    clothes: 20,
    money: 200,
    campaignId: 2,
    donorId: 1,
  },
  {
    food: 30,
    clothes: 30,
    money: 300,
    campaignId: 2,
    donorId: 3,
  },
  {
    food: 40,
    clothes: 40,
    money: 400,
    campaignId: 3,
    donorId: 4,
  },
];
const donationData = async () => {
  await Promise.all(
    allDonation.map(async (donation) => {
      await Donation.create(donation);
    }),
  );
};

export default donationData;
