import { Request, Response, NextFunction } from 'express';
import Family from '../database/models/family';
import Doners from '../database/models/donor';
import Donations from '../database/models/donation';
import { sequelize } from '../database/models';

const statistics = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const [families, doners, donations] = await Promise.all([
      Family.count(), Doners.count(),
      Donations.findAll({
        attributes: [[sequelize.fn('SUM', sequelize.col('money')), 'money'],
          [sequelize.fn('SUM', sequelize.col('food')), 'food'],
          [sequelize.fn('SUM', sequelize.col('clothes')), 'clothes']],
      }),
    ]);
    res.json({ message: 'Success', statistics: { families, doners, donations } });
  } catch (error) {
    next(error);
  }
};

export default statistics;
