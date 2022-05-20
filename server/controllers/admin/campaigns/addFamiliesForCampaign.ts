import { NextFunction, Request, Response } from 'express';
import {
  Campaign,
  Capon,
  Donation,
  Family,
  sequelize,
} from '../../../database/models';
import {
  CustomError,
  paramsSchema,
  familiesForCampaignSchema,
} from '../../../utils';

const addFamiliesForCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { id: campaignId },
    } = req;
    const {
      body: { ids },
    } = req;
    await paramsSchema.validateAsync(req.params);
    const isCampaignExist: any = await Campaign.findByPk(campaignId, {
      raw: true,
    });
    if (!isCampaignExist) throw new CustomError('Campaign does not exits', 400);
    else if (!isCampaignExist.is_available) {
      throw new CustomError('Campaign was closed', 400);
    }
    const [currentDonations] = await Donation.findAll({
      where: {
        campaignId,
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
      ],
    });
    const {
      current_food: food,
      current_money: money,
      current_clothes: clothes,
    }: any = currentDonations;
    if (!(food || money || clothes)) {
      throw new CustomError('This campaign does not have donations', 400);
    }

    try {
      JSON.parse(ids);
      if (JSON.parse(ids).length === 0) {
        throw new CustomError('You must add at least one family', 400);
      }
    } catch (error) {
      if (error.name === 'SyntaxError') {
        throw new CustomError('ids must be array of numbers', 400);
      }
      throw new CustomError(error.message, 400);
    }

    const { ids: familiesId } = await familiesForCampaignSchema.validateAsync(
      {
        ids: JSON.parse(ids),
      },
      { convert: true },
    );

    await Promise.all(
      familiesId.map(async (familyId: any) => {
        const family = await Family.findByPk(familyId, {
          raw: true,
        });
        if (!family) throw new CustomError('Cannot add families', 400);
      }),
    );

    await Promise.all(
      familiesId.map(async (familyId: any) => {
        await Capon.create({
          campaignId,
          familyId,
          food: (food / ids.length).toFixed(),
          clothes: (clothes / ids.length).toFixed(),
          money: (money / ids.length).toFixed(),
        });
      }),
    );

    await Campaign.update(
      { is_available: false },
      { where: { id: campaignId } },
    );
    res.json({ message: 'Families added successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new CustomError(error.message, 400));
    }
    next(error);
  }
};
export default addFamiliesForCampaign;
