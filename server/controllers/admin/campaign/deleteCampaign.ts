import { Request, Response, NextFunction } from 'express';
import { Campaign } from '../../../database/models';
import { CustomError, paramsSchema } from '../../../utils';

const deleteCampaign = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = await paramsSchema.validateAsync(req.params);
    const deletedCampaign = await Campaign.destroy({
      where: { id },
    });
    if (!deletedCampaign) {
      throw new CustomError("Campaign doesn't exist", 400);
    }
    res.json({ message: 'Campaign deleted successfully' });
    next();
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new CustomError(e.message, 400));
    }
    next(e);
  }
};

export default deleteCampaign;
