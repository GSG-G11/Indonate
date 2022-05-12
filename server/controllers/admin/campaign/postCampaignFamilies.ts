import { NextFunction, Request, Response } from 'express';
import { Campaign } from '../../../database/models';
import { CustomError, paramsSchema } from '../../../utils';

const postCampaignFamilies = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { params: { id: campaignId } } = req;
    await paramsSchema.validateAsync(req.params);
    const result = await Campaign.update({ is_available: false }, { where: { campaignId } });
    if (!result[0]) throw new CustomError('Update campaigns failed', 400);
    res.json(result);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new CustomError(error.message, 400));
    }
    console.log(error);
    next(error);
  }
};
export default postCampaignFamilies;
