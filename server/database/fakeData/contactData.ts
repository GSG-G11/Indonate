import { Contact } from '../models/index';

const allMessages = [
  {
    name: 'Ahmed',
    email: 'Ahmed@gmail.com',
    message: 'Suggest an idea to donate to unemployed people',
  },
  {
    name: 'Ali',
    email: 'Ali@gmail.com',
    message: 'I like your work very much, but I suggest and hope that it will be on a global level',
  },
  {
    name: 'ameer',
    email: 'ameer@gmail.com',
    message: 'I know a poor family in need of help. I hope to contact me 0594562017',
  },
  {
    name: 'Ossama',
    email: 'Ossama@gmail.com',
    message: 'I am from a poor family and I need help. Please contact me 0598740265',
  },
];
const contactData = async () => {
  await Promise.all(
    allMessages.map(async (message) => {
      await Contact.create(message);
    }),
  );
};

export default contactData;
