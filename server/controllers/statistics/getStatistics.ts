import { Request, Response, NextFunction } from 'express';
import {
  Donation,
  Family,
  sequelize,
  Donor,
  Campaign,
} from '../../database/models';

const getStatistics = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const
      [families,
        [{
          money: Money,
          food: Foods,
          clothes: Clothes,
        }],
      ] :any = await Promise.all([
        Family.count(),
        Donation.findAll({
          attributes: [[sequelize.fn('SUM', sequelize.col('money')), 'money'],
            [sequelize.fn('SUM', sequelize.col('food')), 'food'],
            [sequelize.fn('SUM', sequelize.col('clothes')), 'clothes']],
        }),
      ]);
    const [Donors, Campaigns] = await Promise.all([
      Donor.count(),
      Campaign.count({
        group: ['is_available'],
      }),
    ]);
    res.json({
      message: 'Success',
      data: {
        Families: families,
        Foods,
        Money,
        Clothes,
        Campaigns,
        Donors,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default getStatistics;
