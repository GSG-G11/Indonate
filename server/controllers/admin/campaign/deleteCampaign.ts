import { Request, Response, NextFunction } from 'express';
import { Campaign, Donation } from '../../../database/models';
import { CustomError, paramsSchema } from '../../../utils';

const deleteCampaign = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = await paramsSchema.validateAsync(req.params);
    const idCampaginExist = await Campaign.findByPk(id, {
      raw: true,
    });
    if (!idCampaginExist) throw new CustomError("Campaign doesn't exist", 400);
    const ifCampaignHaveDonation = await Donation.findAll({
      where: {
        campaignId: id,
      },
    });
    if (ifCampaignHaveDonation.length) throw new CustomError('Can not delete this campagin', 400);
    await Campaign.destroy({
      where: { id },
    });

    res.json({ message: 'Campaign deleted successfully' });
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new CustomError(e.message, 400));
    }
    next(e);
  }
};

export default deleteCampaign;
