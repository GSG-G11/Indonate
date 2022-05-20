import { Request, Response, NextFunction } from 'express';
import { Campaign, Family } from '../../../database/models';
import { CustomError } from '../../../utils';

const getFamiliesForCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findByPk(id);
    if (!campaign) {
      throw new CustomError('This campaign dose not exists', 400);
    } else {
      const families = await Family.findAll({
        attributes: { exclude: ['updatedAt', 'createdAt'] },
        include: {
          model: Campaign,
          where: { id },
          required: true,
          attributes: [],
        },
      });
      res.json({ message: 'Success', data: { families, campaign_id: id } });
    }
  } catch (error) {
    next(error);
  }
};

export default getFamiliesForCampaign;
