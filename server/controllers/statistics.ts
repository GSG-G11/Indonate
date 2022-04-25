import { Request, Response } from 'express';
import Family from '../database/models/family';
import Doners from '../database/models/donor';
import Donations from '../database/models/donation';
import { sequelize } from '../database/models';

const statistics = async (req: Request, res: Response) => {
  let counts = {};
  const families = await Family.count();
  const doners = await Doners.count();
  const donations = await Donations.findAll({
    attributes: [[sequelize.fn('SUM', sequelize.col('money')), 'money'],
      [sequelize.fn('SUM', sequelize.col('food')), 'food'],
      [sequelize.fn('SUM', sequelize.col('clothes')), 'clothes']],
  });
  counts = { families, doners, donations };
  res.send(counts);
};

export default statistics;
