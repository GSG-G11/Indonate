import { Request, Response, NextFunction } from 'express';
import { Campaign } from '../../database/models';
import { CustomError, querySchema } from '../../utils';

const getCampaigns = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { page = 1 }: any = req.query;
    await querySchema.validateAsync(req.query);
    const { count, rows: campaigns } = await Campaign.findAndCountAll({
      limit: 15,
      offset: (page - 1) * 15,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      order: [['id', 'DESC']],
    });
    res.json({ message: 'Success', data: { campaigns, count } });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new CustomError(error.message, 401));
    }
    next(error);
  }
};
export default getCampaigns;
