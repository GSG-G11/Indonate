import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import { Campaign, Capon, Family } from '../../../database/models';
import { CustomError, paramsSchema } from '../../../utils';
import { familiesForCampaignSchema } from '../../../utils/validation';

const postCampaignFamilies = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { params: { id: campaignId } } = req;
    const {
      body: {
        ids: familiesIds,
        food,
        clothes,
        money,
      },
    } = req;
    await paramsSchema.validateAsync(req.params);

    const isCampaginExist = await Campaign.count({
      where: { id: campaignId },
    });
    if (!isCampaginExist) throw new CustomError('Campaign does not exits', 400);

    const isCampaginsAvailable = await Campaign.count({
      where: {
        [Op.and]: [{ id: campaignId }, { is_available: true }],
      },
    });
    if (!isCampaginsAvailable) throw new CustomError('Campaign has closed', 400);

    const { ids } = await familiesForCampaignSchema.validateAsync({
      ids: JSON.parse(familiesIds), food, clothes, money,
    }, { convert: true });

    await Promise.all(ids.map(async (familyId:any) => {
      const family = await Family.findByPk(familyId, {
        raw: true,
      });
      if (!family) throw new CustomError('Cannot add families', 400);
    }));

    await Campaign.update(
      { is_available: false },
      { where: { id: campaignId } },
    );

    await Promise.all(ids.map(async (familyId:any) => {
      await Capon.create({
        campaignId, familyId, food, clothes, money,
      });
    }));

    res.json({ message: 'Families added successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new CustomError(error.message, 400));
    }
    next(error);
  }
};
export default postCampaignFamilies;
