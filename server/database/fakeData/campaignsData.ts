import { Campaign } from '../models/index';

const allCampaign = [
  {
    title: 'Helping poor families',
    description: 'This campaign helps save an amount of money that guarantees 50 families for two months',
    target: 50000,
    image_link: 'https://media.voltron.alhurra.com/Drupal/01live-116/styles/sourced/s3/2019-12/AFC8DF4B-8C6D-4968-87B2-CEAFD63DED97.jpg?itok=Y3YypJNm',
    is_available: true,
  },
  {
    title: 'winter clothes collection',
    description: 'This campaign aims to help poor families to heat their homes in the winter by collecting clothes from donors or buying new clothes from financial donations',
    target: 3000,
    image_link: 'http://www.humanitygate.com/thumb/560x292/uploads//images/88e62e08915b10584950106f496140ca.jpg',
    is_available: true,
  },
  {
    title: 'summer clothes collection',
    description: 'This campaign aims to help poor families secure summer clothes by collecting clothes from donors or buying new clothes with financial donations',
    target: 3000,
    image_link: 'http://www.humanitygate.com/thumb/560x292/uploads//images/88e62e08915b10584950106f496140ca.jpg',
    is_available: true,
  },
  {
    title: 'winter clothes collection',
    description: 'This campaign aims to help poor families to warm them in the winter by collecting clothes from donors',
    target: 3000,
    image_link: 'http://www.humanitygate.com/thumb/560x292/uploads//images/88e62e08915b10584950106f496140ca.jpg',
    is_available: true,
  },
  {
    title: 'Million Meals Campaign',
    description: 'This campaign aims to feed needy families by donating meals to feed families or donating money to buy the right amount',
    target: 1000000,
    image_link: 'https://bedounraqaba.net/wp-content/uploads/2224871143260802120-450x300.jpg',
    is_available: true,
  },
];
const campaignsData = async () => {
  await Promise.all(
    allCampaign.map(async (campaign) => {
      await Campaign.create(campaign);
    }),
  );
};

export default campaignsData;
