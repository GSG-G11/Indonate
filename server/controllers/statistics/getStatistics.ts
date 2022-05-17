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
          money: MONEY,
          food: FOODS,
          clothes: CLOTHES,
        }],
      ] :any = await Promise.all([
        Family.count(),
        Donation.findAll({
          attributes: [[sequelize.fn('SUM', sequelize.col('money')), 'money'],
            [sequelize.fn('SUM', sequelize.col('food')), 'food'],
            [sequelize.fn('SUM', sequelize.col('clothes')), 'clothes']],
        }),
      ]);
    const DONORS = await Donor.count();
    const CAMPAIGNS = await Campaign.count();

    res.json({
      message: 'Success',
      data: {
        FAMILIES: families,
        FOODS,
        MONEY,
        CLOTHES,
      },
      dataToAdmin: {
        CAMPAIGNS,
        DONORS,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default getStatistics;
