import { NextFunction, Request, Response } from 'express';
import { Campaign, Capon } from '../../../database/models';
import { CustomError, paramsSchema } from '../../../utils';

const postCampaignFamilies = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { params: { id: campaignId } } = req;
    const {
      body: {
        id: familiesId,
        food,
        clothes,
        money,
      },
    } = req;
    await paramsSchema.validateAsync(req.params);
    const result = await Campaign.update({ is_available: false }, { where: { id: campaignId } });
    if (!result[0]) throw new CustomError('Update campaigns failed', 400);
    await Promise.all(JSON.parse(familiesId).map(async (familyId:any) => {
      await Capon.create({
        campaignId, familyId, food, clothes, money,
      });
    }));
    res.json({ message: 'Success' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new CustomError(error.message, 400));
    }
    next(error);
    console.log(error);
  }
};
export default postCampaignFamilies;
