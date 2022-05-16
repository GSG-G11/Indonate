import { Request, Response, NextFunction } from 'express';
import { Campaign, Family } from '../../../database/models';

const getFamiliesForCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const campaign = await Campaign.findByPk(id);
    if (!campaign) {
      res.json({ message: 'This campaign dose not exists' });
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
      if (!families.length) {
        res.json({ message: 'There is no families for this campaign' });
      } else {
        res.json({ message: 'Success', data: { families, campaign_id: id } });
      }
    }
  } catch (error) {
    next(error);
  }
};

export default getFamiliesForCampaign;
