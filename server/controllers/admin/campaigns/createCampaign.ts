import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../../../utils';
import { Campaign } from '../../../database/models';
import { campaignSchema } from '../../../utils/validation';

const createCampaign = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const campaign = await campaignSchema.validateAsync(req.body);
    await Campaign.create(campaign);
    res.status(201).json({ message: 'Campaign added successfully' });
  } catch (e) {
    if (e.name === 'ValidationError') { next(new CustomError(e.message, 400)); }
    next(e);
  }
};
export default createCampaign;
