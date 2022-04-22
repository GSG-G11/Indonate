import { Capon } from '../models/index';

const allCapon = [
  {
    food: 10,
    clothes: 10,
    money: 100,
    campaignId: 1,
    familyId: 1,
  },
  {
    food: 20,
    clothes: 20,
    money: 200,
    campaignId: 2,
    familyId: 1,
  },
  {
    food: 30,
    clothes: 30,
    money: 300,
    campaignId: 2,
    familyId: 3,
  },
  {
    food: 40,
    clothes: 40,
    money: 400,
    campaignId: 3,
    familyId: 4,
  },
];
const caponData = async () => {
  await Promise.all(
    allCapon.map(async (capon) => {
      await Capon.create(capon);
    }),
  );
};

export default caponData;
