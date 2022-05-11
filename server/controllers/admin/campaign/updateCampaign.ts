import { NextFunction, Request, Response } from 'express';
import { Campaign } from '../../../database/models';
import { CustomError, paramsSchema } from '../../../utils';
import { campaignSchema } from '../../../utils/validation';

const updateCampaign = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { id } = await paramsSchema.validateAsync(req.params);
    const campaignData = await campaignSchema.validateAsync(req.body);
    const result = await Campaign.update(campaignData, {

      where: { id },
    });
    if (!result[0]) {
      throw new CustomError('Fail to update', 400);
    }
    res.json({ message: 'Success', data: { campaign: campaignData } });
  } catch (error) {
    if (error.name === 'ValidationError') next(new CustomError(error.message, 400));
    next(error);
  }
};
export default updateCampaign;
