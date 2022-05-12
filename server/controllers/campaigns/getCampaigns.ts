import { Request, Response, NextFunction } from 'express';
import { Campaign, Donation, sequelize } from '../../database/models';
import { CustomError, querySchema } from '../../utils';

const getCampaigns = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page = 1 }: any = req.query;
    await querySchema.validateAsync(req.query);
    const { count, rows: campaigns } = await Campaign.findAndCountAll({
      limit: 15,
      offset: (page - 1) * 15,
      group: ['campaigns.id'],
      attributes: [
        'id',
        'title',
        'description',
        'food_target',
        'clothes_target',
        'money_target',
        'image_link',
        'is_available',
        'categoryId',
        [sequelize.fn('SUM', sequelize.col('donations.food')), 'current_food'],
        [
          sequelize.fn('SUM', sequelize.col('donations.money')),
          'current_money',
        ],
        [
          sequelize.fn('SUM', sequelize.col('donations.clothes')),
          'current_clothes',
        ],
      ],
      include: {
        model: Donation,
        required: false,
        duplicating: false,
        attributes: [],
      },
    });
    res.json({ message: 'Success', data: { campaigns, count: count.length } });
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      next(new CustomError(error.message, 401));
    }
    next(error);
  }
};
export default getCampaigns;
