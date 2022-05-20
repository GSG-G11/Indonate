import { Request, Response, NextFunction } from 'express';
import { CustomError, paramsSchema } from '../../../utils';
import {
  Campaign,
  Capon,
  Category,
  Donation,
  sequelize,
} from '../../../database/models';

const getCampaignById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = await paramsSchema.validateAsync(req.params);
    const [campaignInfo, current, numOfFamilies]: any = await Promise.all([
      Campaign.findByPk(id, {
        attributes: [
          'id',
          'description',
          'image_link',
          'is_available',
          'food_target',
          'clothes_target',
          'money_target',
          'title',
        ],
        include: {
          model: Category,
          attributes: ['name', 'icon_url'],
        },
      }),
      Donation.findAll({
        where: {
          campaignId: id,
        },
        raw: true,
        attributes: [
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
      }),
      Capon.findAll({
        where: {
          campaignId: id,
        },
        raw: true,
      }),
    ]);

    if (!campaignInfo) throw new CustomError('This campaign dose not exists', 400);
    res.json({
      message: 'Success',
      data: {
        campaignInfo,
        current: {
          current: +current[0].current,
          current_food: +current[0].current_food,
          current_clothes: +current[0].current_clothes,
          current_money: +current[0].current_money,
        },
        families: numOfFamilies.length,
      },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new CustomError(error.details[0].message, 400));
    }
    next(error);
  }
};

export default getCampaignById;
