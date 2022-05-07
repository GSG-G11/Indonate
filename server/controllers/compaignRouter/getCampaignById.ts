import { Request, Response, NextFunction } from 'express';
import {
  Campaign,
  Capon,
  Category,
  Donation,
  sequelize,
} from '../../database/models';
import { CustomedError } from '../../utils';
import { paramsSchema } from '../../utils/validation';

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
          'target',
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

    if (!campaignInfo) throw new CustomedError('There is no campaign', 400);
    res.status(200).json({
      message: 'Success',
      data: {
        campaignInfo,
        current: +current[0].current,
        families: numOfFamilies.length,
      },
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new CustomedError(error.details[0].message, 400));
    }
    next(error);
  }
};

export default getCampaignById;
