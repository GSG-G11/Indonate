import { NextFunction, Request, Response } from 'express';
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
    const updateCampaignResponse = await Campaign.update(
      { is_available: false },
      { where: { id: campaignId } },
    );

    if (!updateCampaignResponse[0]) throw new CustomError('Update campaign failed', 400);

    await familiesForCampaignSchema.validateAsync({
      ids: JSON.parse(familiesIds), food, clothes, money,
    });

    await Promise.all(JSON.parse(familiesIds).map(async (familyId:any) => {
      const family = await Family.findByPk(familyId, {
        raw: true,
      });
      if (!family) throw new CustomError('Cannot add families', 400);
    }));

    await Promise.all(JSON.parse(familiesIds).map(async (familyId:any) => {
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
    console.log(error);
  }
};
export default postCampaignFamilies;
