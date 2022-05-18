import { NextFunction, Request, Response } from 'express';
import {
  Donation, Donor, sequelize,
} from '../../../database/models';
import { CustomError, querySchema } from '../../../utils';

const getDonors = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { page = 1, limit = 6, order = 'id' } = await querySchema.validateAsync(req.query);
    const { rows: donors, count } = await Donor.findAndCountAll({
      offset: (+page - 1) * +limit,
      limit: +limit,
      include: [{
        model: Donation,
        required: false,
        duplicating: false,
        attributes: [],
      }],

      attributes: [
        'id',
        'name',
        'email',
        'address',
        'phone',
        [sequelize.fn('SUM', sequelize.col('donations.food')), 'totalFood'],
        [sequelize.fn('SUM', sequelize.col('donations.money')), 'totalMoney'],
        [sequelize.fn('SUM', sequelize.col('donations.clothes')), 'totalClothes']],
      group: ['donors.id'],
      order:
      order.toLowerCase() === 'id'
        ? [['id', 'DESC']]
        : order.toLowerCase() === 'top'
          ? [
            [
              sequelize.fn(
                'SUM',
                sequelize.literal(
                  'COALESCE(food, 0) + COALESCE(clothes, 0) + COALESCE(money, 0)',
                ),
              ),
              'DESC',
            ],
          ]
          : [],
    });

    res.json({ message: 'Success', data: { donors, count: count.length } });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new CustomError(error.message, 400));
    }
    next(error);
  }
};
export default getDonors;
