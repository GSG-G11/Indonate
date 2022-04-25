import { Request, Response, NextFunction } from 'express';
import { Campaign } from '../../database/models';
import { CustomedError } from '../../utils';
import { paramsSchema } from '../../utils/validation';

const getCampaignById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await paramsSchema.validateAsync(req.params);
    const { id } = result;
    const campaignInfo = await Campaign.findByPk(id);
    if (!campaignInfo) throw new CustomedError('there is no campaign', 400);
    res.status(200).json({ message: 'campaign information', data: campaignInfo });
  } catch (error) {
    if (error.name === 'ValidationError') next(new CustomedError(error.details[0].message, 400));
    next(error);
  }
};

export default getCampaignById;
