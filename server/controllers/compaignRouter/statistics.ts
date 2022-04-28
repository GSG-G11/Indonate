import { Request, Response, NextFunction } from 'express';
import {
  Donation,
  Donor,
  Family,
  sequelize,
} from '../../database/models';

const statistics = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const [families, doners, donations] = await Promise.all([
      Family.count(), Donor.count(),
      Donation.findAll({
        attributes: [[sequelize.fn('SUM', sequelize.col('money')), 'money'],
          [sequelize.fn('SUM', sequelize.col('food')), 'food'],
          [sequelize.fn('SUM', sequelize.col('clothes')), 'clothes']],
      }),
    ]);
    res.json({ message: 'Success', data: { families, doners, donations } });
  } catch (error) {
    next(error);
  }
};

export default statistics;