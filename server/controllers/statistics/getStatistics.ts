import { Request, Response, NextFunction } from 'express';
import {
  Donation,
  Family,
  sequelize,
  Donor,
} from '../../database/models';

const getStatistics = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const
      [families,
        [{
          money,
          food: foods,
          clothes,
        }],
      ] :any = await Promise.all([
        Family.count(),
        Donation.findAll({
          attributes: [[sequelize.fn('SUM', sequelize.col('money')), 'money'],
            [sequelize.fn('SUM', sequelize.col('food')), 'food'],
            [sequelize.fn('SUM', sequelize.col('clothes')), 'clothes']],
        }),
      ]);
    const [donors] = await Promise.all([
      Donor.count(),
    ]);
    res.json({
      message: 'Success',
      data: {
        families,
        foods,
        money,
        clothes,
        donors,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default getStatistics;
