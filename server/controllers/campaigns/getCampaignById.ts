import { Request, Response, NextFunction } from 'express';
import { Campaign } from '../../database/models';
import { customError } from '../../utils';
import { paramsSchema } from '../../utils/validation';

const getCampaignById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = await paramsSchema.validateAsync(req.params);
    const campaignInfo = await Campaign.findByPk(id);
    if (!campaignInfo) throw new customError('There is no campaign', 400);
    res.status(200).json({ message: 'Success', data: campaignInfo });
  } catch (error) {
    if (error.name === 'ValidationError') next(new customError(error.details[0].message, 400));
    next(error);
  }
};

export default getCampaignById;
