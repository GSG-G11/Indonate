import { Category } from '../models/index';

const allCategories = [
  {
    name: 'Food',
  },
  {
    name: 'Money',
  },
  {
    name: 'Clothes',
  },
  {
    name: 'Education',
  },
];
const categoryData = async () => {
  await Promise.all(
    allCategories.map(async (category) => {
      await Category.create(category);
    }),
  );
};

export default categoryData;
