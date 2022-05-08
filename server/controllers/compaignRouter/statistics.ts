import { Request, Response, NextFunction } from 'express';
import {
  Donation,
  Family,
  sequelize,
} from '../../database/models';

const statistics = async (req: Request, res: Response, next:NextFunction) => {
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

    res.json({
      message: 'Success',
      data: {
        FAMILIES: families,
        FOODS,
        MONEY,
        CLOTHES,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default statistics;
