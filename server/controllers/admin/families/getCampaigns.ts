import { NextFunction, Response, Request } from 'express';
import { Campaign, Family } from '../../../database/models';
import { CustomError, paramsSchema } from '../../../utils';

const getCampagins = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = await paramsSchema.validateAsync(req.params);

    const response = await Family.findAll({
      where: { id },
      attributes: ['id'],
      include: [
        {
          model: Campaign,
          attributes: ['id', 'title'],
          through: { attributes: [] },
        },
      ],
    });
    if (!response.length) {
      throw new CustomError("Family doesn't exist", 400);
    }
    res.json({ message: 'Success', data: response });
  } catch (e) {
    if (e.name === 'ValidationError') {
      next(new CustomError(e.message, 400));
    }
    next(e);
  }
};

export default getCampagins;
