import { Request, Response, NextFunction } from 'express';
import {
  Campaign, Category, Donation, sequelize,
} from '../../database/models';
import { CustomError, querySchema } from '../../utils';

const getCampaigns = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page = 1, limit = 10, order = 'available' }: any = req.query;

    await querySchema.validateAsync(req.query);

    const { count, rows: campaigns } = await Campaign.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      group: ['campaigns.id', 'category.id'],
      attributes: [
        'categoryId',
        'id',
        'title',
        'description',
        'food_target',
        'clothes_target',
        'money_target',
        'image_link',
        'is_available',
        [
          sequelize.fn('SUM', sequelize.literal('COALESCE(food, 0)')),
          'current_food',
        ],
        [
          sequelize.fn('SUM', sequelize.literal('COALESCE(clothes, 0)')),
          'current_clothes',
        ],
        [
          sequelize.fn('SUM', sequelize.literal('COALESCE(money, 0)')),
          'current_money',
        ],
        [
          sequelize.fn(
            'SUM',
            sequelize.literal(
              'COALESCE(food, 0) + COALESCE(clothes, 0) + COALESCE(money, 0)',
            ),
          ),
          'current',
        ],
      ],
      order:
        order.toLowerCase() === 'available'
          ? [['is_available', 'DESC']]
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
      include: [
        {
          model: Donation,
          required: false,
          duplicating: false,
          attributes: [],
        },
        {
          model: Category,
          required: false,
          duplicating: false,
          attributes: ['name'],
        },
      ],
    });
    res.json({ message: 'Success', data: { campaigns, count: count.length } });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new CustomError(error.message, 401));
    }
    next(error);
  }
};
export default getCampaigns;
