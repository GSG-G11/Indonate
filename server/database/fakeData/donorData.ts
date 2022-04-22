import { Donor } from '../models/index';

const allDonors = [
  {
    name: 'Ali',
    email: 'Ali@gmail.com',
    password: '123456',
    address: 'Gaza',
    phone: '0599888611',
  },
  {
    name: 'Ahmed',
    email: 'Ahmed@gmail.com',
    password: '123456',
    address: 'Gaza',
    phone: '0599883610',
  },
  {
    name: 'hosam',
    email: 'hosam@gmail.com',
    password: '123456',
    address: 'Gaza',
    phone: '0597988610',
  },
  {
    name: 'sami',
    email: 'sami@gmail.com',
    password: '123456',
    address: 'Gaza',
    phone: '0599848610',
  },
];
const donorData = async () => {
  await Promise.all(
    allDonors.map(async (donor) => {
      await Donor.create(donor);
    }),
  );
};

export default donorData;
